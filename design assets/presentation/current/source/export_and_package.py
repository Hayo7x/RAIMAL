from pathlib import Path
import shutil, json, hashlib, zipfile, posixpath
from xml.etree import ElementTree as ET
from reportlab.pdfgen import canvas
from pypdf import PdfReader

root=Path(__file__).resolve().parents[2]
build=root/'tmp/presentation-final-build'
out=root/'presentation'
archive=out/'archive'
archive.mkdir(exist_ok=True)
def copy(a,b):
    b.parent.mkdir(parents=True,exist_ok=True)
    shutil.copy2(a,b)
def move(a,b):
    assert a.resolve().is_relative_to(root) and b.resolve().is_relative_to(root)
    b.parent.mkdir(parents=True,exist_ok=True)
    if a.exists() and not b.exists():shutil.move(str(a),str(b))

move(out/'RAIMAL-pitch.pptx',archive/'RAIMAL-initial.pptx')
move(out/'RAIMAL-pitch.pdf',archive/'RAIMAL-initial.pdf')
move(out/'RAIMAL-visual-pitch.pptx',archive/'RAIMAL-visual-draft.pptx')
copy(out/'RAIMAL-preview-v6.pptx' if (out/'RAIMAL-preview-v6.pptx').exists() else build/'RAIMAL-preview-v6.pptx',out/'RAIMAL-pitch.pptx')
for version in [3,4,5,6]:
    move(out/f'RAIMAL-preview-v{version}.pptx',build/f'RAIMAL-preview-v{version}.pptx')
for name in ['apho.html','apio-0.png','apio-1.png']:
    move(out/'assets/events'/name,root/'tmp/event-logos'/('download-'+name))

images=sorted(build.glob('slide-??.png'))
assert len(images)==12
pdf=out/'RAIMAL-pitch.pdf'
c=canvas.Canvas(str(pdf),pagesize=(960,540),pageCompression=1)
c.setTitle('RAIMAL | The next field check')
c.setAuthor('RAIMAL')
c.setSubject('12-slide visual pitch with real Sentinel-2 analysis and team credentials')
for i,img in enumerate(images):
    c.bookmarkPage(f'slide-{i+1}')
    c.addOutlineEntry(f'Slide {i+1}',f'slide-{i+1}',level=0)
    c.drawImage(str(img),0,0,width=960,height=540)
    c.showPage()
c.save()
assert len(PdfReader(str(pdf)).pages)==12
with zipfile.ZipFile(out/'RAIMAL-pitch.pptx') as z:
    slides=[n for n in z.namelist() if n.startswith('ppt/slides/slide') and n.endswith('.xml')]
    assert len(slides)==12
    logo_hashes={hashlib.sha256((out/'assets'/x).read_bytes()).hexdigest() for x in ['RAIMAL-logo-final.png','kfupm/LOGO-01.png']}
    for name in slides:
        rels=ET.fromstring(z.read('ppt/slides/_rels/'+Path(name).name+'.rels'))
        image_hashes=set()
        for rel in rels:
            if rel.attrib['Type'].endswith('/image'):
                target=posixpath.normpath(posixpath.join('ppt/slides',rel.attrib['Target'])).lstrip('/')
                image_hashes.add(hashlib.sha256(z.read(target)).hexdigest())
        assert logo_hashes.issubset(image_hashes), name
    assert len([n for n in z.namelist() if '/charts/chart' in n and n.endswith('.xml')])==3

lib=root/'design assets/presentation'
current=lib/'current'
copy(out/'RAIMAL-pitch.pptx',current/'RAIMAL-pitch.pptx')
copy(out/'RAIMAL-pitch.pdf',current/'RAIMAL-pitch.pdf')
copy(out/'speaker-notes-final.md',current/'speaker-notes.md')
copy(out/'presentation-plan-final.md',current/'presentation-plan.md')
copy(build/'build.mjs',current/'source/build.mjs')
copy(root/'tmp/real-sentinel/analyze_real.py',current/'source/analyze_real.py')
copy(build/'export_and_package.py',current/'source/export_and_package.py')
copy(build/'word-counts.json',current/'source/word-counts.json')
for f in images:copy(f,current/'previews'/f.name)
for f in (out/'assets').rglob('*'):
    if f.is_file():copy(f,lib/'original-assets'/f.relative_to(out/'assets'))
with zipfile.ZipFile(out/'RAIMAL-pitch.pptx') as z:
    for name in z.namelist():
        if not name.endswith('/') and (name.startswith(('ppt/media/','ppt/embeddings/','ppt/theme/')) or '/charts/' in name):
            f=current/'powerpoint-parts'/name
            f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(z.read(name))
manifest=[]
for f in sorted(lib.rglob('*')):
    if f.is_file() and f.name!='manifest.json':
        manifest.append({'path':f.relative_to(lib).as_posix(),'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()})
(lib/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(json.dumps({'slides':12,'pdf_bytes':pdf.stat().st_size,'pptx_bytes':(out/'RAIMAL-pitch.pptx').stat().st_size,'both_logos':'verified on every slide','native_charts':3,'asset_files':len(manifest)},indent=2))
