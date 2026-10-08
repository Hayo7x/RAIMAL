from pathlib import Path
from reportlab.pdfgen import canvas
from pypdf import PdfReader
import json
root=Path(__file__).resolve().parents[2]
build=root/'tmp/presentation-build'
out=root/'presentation/RAIMAL-pitch.pdf'
images=sorted(build.glob('slide-??.png'))
assert len(images)==13
c=canvas.Canvas(str(out),pagesize=(960,540),pageCompression=1)
c.setTitle('RAIMAL | The next field check')
c.setAuthor('RAIMAL')
c.setSubject('Eight-slide pitch and five Q&A backups. Rendered from the finalized PowerPoint.')
for i,image in enumerate(images):
    c.bookmarkPage(f'slide-{i+1}')
    c.addOutlineEntry(f'Slide {i+1}'+(' (Q&A)' if i>=8 else ''),f'slide-{i+1}',level=0)
    c.drawImage(str(image),0,0,width=960,height=540)
    c.showPage()
c.save()
reader=PdfReader(str(out))
assert len(reader.pages)==13
assert all(float(p.mediabox.width)==960 and float(p.mediabox.height)==540 for p in reader.pages)
print(f'PDF: {len(reader.pages)} pages, {out.stat().st_size:,} bytes')
