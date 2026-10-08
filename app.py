from __future__ import annotations
import json
import pandas as pd
import plotly.express as px
import streamlit as st
from src.pivotwatch.demo import build_demo_data
from src.pivotwatch.engine import analyze
from src.pivotwatch.storage import init_db, list_inspections, save_inspection
from src.pivotwatch.ui import apply_style, brand, landing

st.set_page_config(page_title="RAIMAL | From pattern to purpose", page_icon="◉", layout="wide")
apply_style()
nav_left, nav_right = st.columns([1, 1])
with nav_left:
    brand()
with nav_right:
    page = st.radio("Navigation", ["Overview", "Inspection desk"], horizontal=True, key="page", label_visibility="collapsed")
st.divider()
if page == "Overview":
    landing()
    st.stop()

init_db()
observations = build_demo_data()
st.caption("WORKSPACE / P-07 / HISTORICAL REPLAY")
st.title("Your field, in focus.")
st.write("Review the pattern. Check the evidence. Decide what to inspect.")
st.info("Synthetic demo · This field and its observations are illustrative. No verified satellite imagery or fault labels; not for operational dispatch.", icon="ⓘ")

with st.sidebar:
    st.header("Replay settings")
    st.caption("Change the observation date to see how evidence develops.")
    available_dates = sorted(observations.date.unique())
    replay_day = st.selectbox("Historical replay date", available_dates, index=len(available_dates)-1, format_func=lambda value: pd.Timestamp(value).strftime("%d %b %Y"))
    valid_pct = st.slider("Minimum valid pixel coverage", 50, 100, 80, 5)
    st.divider()
    st.markdown("**Demo field**  \nP-07 · Wadi Al-Dawasir (illustrative)  \nPotato context: unverified  \n12 sectors · 4 radial bands")

qualified = observations[observations.date.le(pd.Timestamp(replay_day)) & observations.valid_coverage.ge(valid_pct/100)]
if qualified.empty:
    st.warning("No observations meet this coverage requirement. Lower the minimum valid pixel coverage in Replay settings to continue. No inspection recommendation can be made from this selection.")
    st.stop()
result = analyze(observations, pd.Timestamp(replay_day), min_coverage=valid_pct/100)
zones, tasks = result.zones, result.tasks
latest = observations[observations.date.eq(pd.Timestamp(replay_day))]
st.caption(f"Replay as of {pd.Timestamp(replay_day).strftime('%d %B %Y')} · Run `{result.run_id}` · Model: Isolation Forest + explicit evidence gates · Not a fault probability")
metrics = st.columns(4)
metrics[0].metric("Inspection candidates", len(tasks))
metrics[1].metric("Zones assessed", len(zones))
metrics[2].metric("Usable coverage", f"{latest.valid_coverage.mean():.0%}")
metrics[3].metric("Observations in history", observations[observations.date.le(pd.Timestamp(replay_day))].date.nunique())

left, right = st.columns([1.15, 1])
with left:
    st.subheader("01 / Field pattern")
    map_df = zones.copy()
    map_df["sector_angle"] = (map_df.sector * 30 + 15) % 360
    fig = px.scatter_polar(map_df, r="ring_mid_m", theta="sector_angle", color="status", size="anomaly_score", hover_name="zone_id", hover_data={"ndvi":":.2f", "peer_deficit":":.2f", "coverage":":.0%", "status":True}, color_discrete_map={"inspect":"#ef6548", "pending":"#f4bd50", "normal":"#4f9b83", "withheld":"#a6adb4"})
    fig.update_layout(height=460, paper_bgcolor="rgba(0,0,0,0)", font_color="#294533", polar=dict(bgcolor="#eeeee2", angularaxis=dict(direction="clockwise", rotation=90, tickvals=list(range(0,360,30)), ticktext=["N","30°","60°","E","120°","150°","S","210°","240°","W","300°","330°"]), radialaxis=dict(range=[0,400], title="Distance from center (m)")), legend_title="Evidence status", margin=dict(l=35,r=35,t=25,b=25))
    st.plotly_chart(fig, use_container_width=True)
    st.caption("Illustrative pivot radius 400 m. Colors show software gate status, not equipment health.")

with right:
    st.subheader("02 / Inspection queue")
    if tasks.empty:
        st.info("No inspection task passed the evidence gates for this replay date.")
    for _, task in tasks.iterrows():
        with st.container(border=True):
            st.markdown(f"**{task.zone_id} · {task.sector_name}, {task.ring_label}**")
            st.write(f"{task.radius_start_m:.0f}–{task.radius_end_m:.0f} m from pivot center · {task.status_label}")
            st.write(f"Evidence: {task.observation_count} distinct dates · {task.valid_coverage:.0%} valid pixels · peer deficit {task.peer_deficit:.2f}")
            st.write(f"**Check:** {task.question}")
            st.caption("Possible explanations include crop variation, management, soil, or water delivery. Cause is unconfirmed.")

st.divider()
st.subheader("03 / Follow the evidence")
st.caption("Compare vegetation index over the replay history. A decline alone does not identify a cause.")
history = observations[observations.date.le(pd.Timestamp(replay_day))]
flagged_zones = [z for _, task in tasks.iterrows() for z in task.zone_id.split(", ")] if not tasks.empty else []
timeline = history[history.zone_id.isin(flagged_zones)]
if timeline.empty:
    timeline = history.groupby("date",as_index=False).agg(ndvi=("ndvi","median"))
    fig2 = px.line(timeline,x="date",y="ndvi",markers=True,title="Field median NDVI over time")
else:
    fig2 = px.line(timeline,x="date",y="ndvi",color="zone_id",markers=True,title="Candidate zone NDVI over time")
fig2.update_layout(height=300,paper_bgcolor="rgba(0,0,0,0)",plot_bgcolor="#f0f1e8",font_color="#294533",yaxis_title="NDVI",xaxis_title="Observation date",legend_title="Zone")
st.plotly_chart(fig2,use_container_width=True)

st.divider()
st.subheader("04 / Record a field check")
st.caption("Demo findings stay on this machine and remain separate from model evidence.")
if tasks.empty:
    st.caption("Choose a replay date with a candidate to record a demo inspection.")
else:
    choices = [z for _, task in tasks.iterrows() for z in task.zone_id.split(", ")]
    with st.form("inspection_form"):
        choice=st.selectbox("Task zone",choices)
        finding=st.selectbox("Finding",["Not inspected","Water delivery issue observed","No equipment issue observed","Crop or soil variation suspected","Explained by management","Inconclusive"])
        measurement=st.text_input("Measurement and unit (optional)",placeholder="e.g. 180 kPa")
        action=st.text_area("Action or follow-up",placeholder="What should the team do next?")
        submitted=st.form_submit_button("Save inspection record",type="primary")
    if submitted:
        save_inspection({"task_id":f"{result.run_id}:{choice}","zone_id":choice,"replay_date":str(pd.Timestamp(replay_day).date()),"finding":finding,"measurement":measurement,"action":action,"is_synthetic":True})
        st.success("Saved locally and labeled as a synthetic demo record.")

records=list_inspections()
if records:
    st.subheader("Saved records")
    st.dataframe(pd.DataFrame(records),use_container_width=True,hide_index=True)

st.divider()
st.subheader("Take the evidence with you")
bundle={"synthetic_demo":True,"run_id":result.run_id,"analysis_date":str(pd.Timestamp(replay_day).date()),"model":result.model_name,"threshold":result.threshold,"gates":result.gates,"tasks":tasks.to_dict(orient="records"),"limitations":["Synthetic observations; no real satellite raster was processed.","Anomaly scores are rankings, not probabilities or fault diagnoses.","No field performance is validated."]}
cols=st.columns(2)
cols[0].download_button("Download task CSV",tasks.to_csv(index=False).encode("utf-8"),file_name=f"raimal-{result.run_id}.csv",mime="text/csv",disabled=tasks.empty)
cols[1].download_button("Download evidence JSON",json.dumps(bundle,indent=2,default=str).encode("utf-8"),file_name=f"raimal-{result.run_id}.json",mime="application/json")
with st.expander("What this MVP does and does not prove"):
    st.markdown("""**Demonstrates:** dated observations, spatial anomaly ranking, quality and persistence gates, a technician inspection question, local record keeping, and reproducible exports.\n\n**Does not demonstrate:** Sentinel-2 download or raster processing, a verified field boundary or crop calendar, a confirmed irrigation fault, diagnostic accuracy, time savings, water savings, or yield protection. Synthetic pattern perturbations exercise the workflow only.""")
