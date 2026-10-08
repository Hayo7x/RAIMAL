"""Presentation layer for the local RAIMAL experience."""
from __future__ import annotations

import streamlit as st


def apply_style() -> None:
    st.markdown("""<style>
    .block-container{max-width:1380px;padding-top:2rem;padding-bottom:3rem}
    h1,h2,h3{letter-spacing:-.035em} h1{font-weight:650!important}
    [data-testid="stSidebar"]{border-right:1px solid #d8dfd4}
    [data-testid="stMetric"]{background:#fffef9;border:1px solid #dbe0d4;border-radius:14px;padding:18px}
    [data-testid="stMetricLabel"]{color:#596c60}
    [data-testid="stVerticalBlockBorderWrapper"]{border-radius:14px}
    .brand{display:flex;align-items:center;gap:12px;font-size:22px;font-weight:750;letter-spacing:-1px}
    .brand-icon{display:grid;place-items:center;background:#244d3e;color:#ddecad;width:40px;height:40px;border-radius:50%;font-size:30px}
    .brand small{font-size:10px;letter-spacing:2px;font-weight:500;color:#65776a}
    .eyebrow{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#526e58;font-weight:700;margin:28px 0 20px}
    .hero-title{font-size:clamp(46px,5.7vw,80px);line-height:1.04;letter-spacing:-4px;font-weight:650;margin:0 0 24px;color:#203e31}
    .hero-title em{font-family:Georgia,serif;font-weight:400;color:#66804a}
    .lead{font-size:18px;line-height:1.7;color:#59695d;max-width:490px;margin-bottom:26px}
    .field-art{background:#203f32;border-radius:24px;overflow:hidden;position:relative;padding:24px;color:#f4f3d9}
    .art-label{font-size:10px;letter-spacing:2px;display:flex;justify-content:space-between;color:#d9e5bf}
    .field-art svg{width:100%;height:auto;display:block}
    .art-foot{border-top:1px solid #65816a;padding-top:16px;display:flex;justify-content:space-between;font-size:12px}
    .ribbon{display:flex;flex-wrap:wrap;gap:24px;padding:23px 0;border-top:1px solid #d5dbcf;border-bottom:1px solid #d5dbcf;margin:36px 0;color:#62705f;font-size:13px}
    .ribbon strong{color:#284c39;font-size:20px;margin-right:8px}
    .step{border-top:1px solid #bfcbb8;padding:20px 8px 20px 0}
    .step-number{font:italic 27px Georgia;color:#819168}
    .step h3{font-size:23px;margin:18px 0 12px}.step p{color:#617060;font-size:15px;line-height:1.7}
    .closing{background:#e8edde;border-radius:18px;padding:32px;margin:26px 0 18px}
    .closing h2{font-size:32px;margin:0 0 12px}.closing p{color:#5b6c57;margin:0}
    .footer{border-top:1px solid #d5dbcf;margin-top:45px;padding-top:20px;display:flex;justify-content:space-between;font-size:12px;color:#6c7869}
    @media(max-width:640px){.block-container{padding:1rem}.hero-title{letter-spacing:-2px}.lead{font-size:16px}.footer{gap:16px}.field-art{padding:18px}}
    </style>""", unsafe_allow_html=True)


def brand() -> None:
    st.markdown('<div class="brand"><span class="brand-icon">◎</span><span>RAIMAL</span></div>', unsafe_allow_html=True)


def landing() -> None:
    left, right = st.columns([1.05, 1], gap="large")
    with left:
        st.markdown('''<div class="eyebrow">From crop patterns to field questions</div>
        <div class="hero-title">Every circle<br>tells a story.<br><em>Know where<br>to look.</em></div>
        <p class="lead">A clearer starting point for center-pivot maintenance. Review unusual crop patterns, follow the evidence, and give every field inspection a purpose.</p>''', unsafe_allow_html=True)
        st.button("Explore the inspection demo  →", type="primary", on_click=go_to_desk, use_container_width=True)
        st.caption("Interactive local prototype · Synthetic observations")
    with right:
        st.markdown('''<div class="field-art"><div class="art-label"><span>P-07 / FIELD STUDY</span><span>ILLUSTRATIVE</span></div>
        <svg viewBox="0 0 500 470" role="img" aria-label="Illustrative circular irrigation field with a highlighted inspection sector. This is a schematic, not satellite imagery.">
        <defs><pattern id="rows" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(32)"><rect width="8" height="8" fill="#718353"/><path d="M0 0V8" stroke="#9aa46c" stroke-width="3"/></pattern></defs>
        <path d="M10 95H490M10 375H490M90 25V445M410 25V445" stroke="#3a5943" fill="none"/>
        <circle cx="250" cy="235" r="190" fill="url(#rows)"/>
        <circle cx="250" cy="235" r="201" fill="none" stroke="#9aa977" stroke-dasharray="3 7"/>
        <path d="M250 235L414.5 140A190 190 0 0 1 440 235Z" fill="#d4b66c" opacity=".85"/>
        <g fill="none" stroke="#d6dfac" opacity=".4"><circle cx="250" cy="235" r="95"/><circle cx="250" cy="235" r="134"/><circle cx="250" cy="235" r="165"/><path d="M250 45V425M60 235H440M85 140L415 330M155 70L345 400M85 330L415 140M155 400L345 70"/></g>
        <path d="M250 235L375 95" stroke="#eef0cc" stroke-width="3"/><circle cx="250" cy="235" r="7" fill="#f5f4d4"/>
        <circle cx="389" cy="199" r="8" fill="#203f32" stroke="#f7da87" stroke-width="3"/>
        <path d="M389 199L412 285H478" stroke="#f6dc95" fill="none"/>
        <rect x="315" y="288" width="170" height="55" rx="8" fill="#f2edd8"/>
        <text x="329" y="311" fill="#294533" font-size="12" font-family="sans-serif">A question, not a diagnosis.</text><text x="329" y="329" fill="#687355" font-size="10" font-family="sans-serif">Inspect the pattern. Verify the cause.</text>
        <text x="246" y="22" fill="#d9e5bf" font-size="12" font-family="sans-serif">N</text>
        </svg><div class="art-foot"><span>48 zones. One field of view.</span><span>SCHEMATIC ↗</span></div></div>''', unsafe_allow_html=True)
    st.markdown('''<div class="ribbon"><span><strong>12</strong> angular sectors</span><span><strong>4</strong> radial bands</span><span><strong>10</strong> synthetic observation dates</span><span>One traceable inspection workflow</span></div>
    <div class="eyebrow">The workflow</div>''', unsafe_allow_html=True)
    st.header("Less searching. More informed checking.")
    for col, number, title, description in zip(st.columns(3, gap="large"), ["01", "02", "03"], ["See the pattern", "Review the evidence", "Close the loop"], ["Explore the field by sector and distance from its center. Find where the vegetation pattern differs from its peers.", "Check coverage, history, and persistence before opening an inspection task. Insufficient evidence stays visible.", "Take a specific question to the field. Record a finding, a measurement, and the next action alongside the replay date."]):
        with col:
            st.markdown(f'<div class="step"><span class="step-number">{number}</span><h3>{title}</h3><p>{description}</p></div>', unsafe_allow_html=True)
    st.markdown('''<div class="closing"><h2>Built to support human judgment.</h2><p>An unusual crop pattern can have several explanations: soil, crop variation, management, or water delivery. RAIMAL helps frame the inspection question; a person verifies the cause.</p></div>''', unsafe_allow_html=True)
    with st.expander("What can I try in this prototype?"):
        st.write("Replay 10 synthetic dates, adjust the coverage gate, review ranked zones, record a demo inspection, and export evidence. The current prototype does not process real satellite imagery and has no validated field performance or water-saving results.")
    st.markdown('<div class="footer"><span>RAIMAL</span><span>From observation to a better question.</span></div>', unsafe_allow_html=True)


def go_to_desk() -> None:
    st.session_state["page"] = "Inspection desk"
