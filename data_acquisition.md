# RAIMAL data acquisition guide

Sources checked 7 October 2026. [Architecture](architecture.md) · [Model decision](model_selection.md).

**Acquire Sentinel-2 L2A imagery first, then obtain or manually verify pivot boundaries. Crop operations and confirmed maintenance findings require a farm or research partner.** This search did not identify a ready-to-use public Saudi pivot-fault dataset with dated, geolocated physical-fault labels.

## Prioritized sources

| Priority / data | Where and how | Role and limitation |
|---|---|---|
| P0: Sentinel-2 surface reflectance | [Microsoft Planetary Computer](https://planetarycomputer.microsoft.com/docs/): public STAC at `https://planetarycomputer.microsoft.com/api/stac/v1`, collection `sentinel-2-l2a`; sign asset links using `planetary_computer.sign` | Primary historical demo imagery. Catalogue requires no account; asset tokens are available without registration. Cache local subsets because tokens expire and requests can be throttled. [Access documentation](https://planetarycomputer.microsoft.com/docs/concepts/sas/). |
| P0: Official imagery fallback | [Copernicus Browser](https://browser.dataspace.copernicus.eu/) and [CDSE STAC documentation](https://documentation.dataspace.copernicus.eu/APIs/STAC.html) | Select L2A surface reflectance and the same acquisition history. Catalogue and download authentication differ; set up the required download account before the event. Sentinel data are available free, including commercial use, subject to the applicable data terms and attribution. [Mission/data page](https://dataspace.copernicus.eu/data-collections/copernicus-sentinel-missions/sentinel-2). |
| P0: Pivot boundaries and centers | Operator GeoJSON/KML/GIS export; otherwise manually trace circles against dated imagery and review them | Store derivation and verification status. A visible circular field does not establish its owner, crop or current operation. Manual demo geometry is acceptable if labeled. |
| P0: Crop calendar and field operations | Operator field register: planting, crop, harvest, treatment, irrigation and equipment changes, dates and affected areas | Essential to interpret change. Unknown potato identity or planting date remains unknown; use an exploratory demo if unconfirmed. |
| P1: Confirmed inspection labels | Technician maintenance logs plus new geolocated inspections; agronomist reviews alternative causes | The dataset needed for actual fault-related validation and later supervised training. No public substitute established here. |
| P1: Weather context | [NASA POWER Daily API](https://power.larc.nasa.gov/docs/services/api/temporal/daily/) | Request daily temperature, precipitation, humidity and wind once per region/window. Regional context only; it cannot explain differences between nearby pivot sectors. |
| P2: HLS v2 imagery | [NASA HLS data access](https://hls.gsfc.nasa.gov/data-access-and-tools/), through Earthdata Search or supported clients with Earthdata login | Separate 30 m input branch for the optional Prithvi demonstration. Retain HLS quality flags and band metadata. Do not replace the core 10 m localization with upsampled HLS. |
| P2: Evapotranspiration context | [FAO WaPOR data](https://www.fao.org/in-action/remote-sensing-for-water-productivity/wapor-data/) and [access tools](https://www.fao.org/in-action/remote-sensing-for-water-productivity/wapor-data-access/en) | Version 3 offers global 300 m and Africa/Near East 100 m products. Verify the exact variable, period and selected AOI. Saudi 20 m coverage was not established. Use as context, not sector fault labels or measured pump volumes. |
| Research: irrigation-method labels | [IrrMap repository](https://github.com/Nibir088/IrrMap) and [data files](https://huggingface.co/Nibir/IrrMap/tree/main) | US irrigation classification data from Arizona, Utah, Washington and Colorado. Useful for an irrigation-method experiment; no Saudi fault ground truth. The hosting page reports about 369 GB, so select a subset. Check code and underlying data licenses separately before reuse; a clear blanket license was not established in this review. |

## A real catalogue query succeeded

An anonymous Planetary Computer catalogue query returned these records for an exploratory Wadi Al-Dawasir regional box, WGS84 `[44.65, 20.15, 45.25, 20.65]`, covering 1 January–30 April 2025. The box is a discovery region, not a verified farm boundary.

| STAC item ID | Acquisition, UTC | Scene cloud cover |
|---|---|---:|
| `S2B_MSIL2A_20250429T072619_R049_T38QNH_20250429T083156` | 29 April 2025, 07:26:19 | 0% |
| `S2B_MSIL2A_20250429T072619_R049_T38QMH_20250429T083156` | 29 April 2025, 07:26:19 | 0% |
| `S2A_MSIL2A_20250426T073021_R049_T38QNH_20250426T113812` | 26 April 2025, 07:30:21 | 0.000003% |

The responses advertise B02/B03/B04/B08/SCL and the optional B8A/B11/B12 assets. **Only catalogue metadata access was exercised.** Raster download, farm-level cloud quality, crop identity, seasonal coverage and a real anomaly remain unverified. The two 29 April tiles are one temporal observation when they overlap a field.

Reproduce discovery using the [same catalogue request](https://planetarycomputer.microsoft.com/api/stac/v1/search?collections=sentinel-2-l2a&bbox=44.65,20.15,45.25,20.65&datetime=2025-01-01T00:00:00Z/2025-04-30T23:59:59Z&limit=3). Pagination and a field-specific search are required for a complete time series. The 2025 window is a discovery example, not a verified potato growth season.

## Acquisition recipe

1. Inspect the regional imagery, select 3–5 visible pivots and draw exact field polygons and centers. Prefer a partner-confirmed potato cohort; otherwise label crop/context unknown and keep outputs exploratory.
2. Choose one verified growth season. Search enough time to obtain 12–20 valid dates if available; a 3–4 month initial window is a planning choice, not a guarantee.
3. Query intersecting L2A scenes and paginate. Use scene cloud percentage only as a coarse filter; quality is decided from pixels within each field. Select one provider for the run so reflectance handling stays consistent.
4. Save the returned STAC item JSON before signing asset URLs. Sign when downloading; store stable source identifiers rather than expiring signed URLs in public evidence exports.
5. Download windows covering each field plus a small processing margin. Core bands are B04/B08/SCL, with B02/B03 for display. Retain metadata needed for scale/offset and source attribution. Avoid downloading entire Sentinel tiles for a few fields.
6. Run the quality and geometry pipeline in [architecture.md](architecture.md). Count distinct usable acquisitions for each cell and preserve rejected dates with reasons. Expand the window or cohort if history is inadequate.
7. Freeze a historical replay dataset, development/calibration/evaluation split and manifest before selecting the showcased output. Save the clean source data separately from synthetic demo fixtures.

Illustrative discovery code to implement with pinned package versions:

```python
from pystac_client import Client

catalog = Client.open("https://planetarycomputer.microsoft.com/api/stac/v1")
items = list(catalog.search(
    collections=["sentinel-2-l2a"],
    bbox=[44.65, 20.15, 45.25, 20.65],
    datetime="2025-01-01/2025-04-30",
).items())
# Save metadata, select a verified field, sign assets and read raster windows.
# A returned STAC item is not yet a usable field observation.
```

For optional weather, use POWER's daily point endpoint with `community=AG`, explicit longitude/latitude, start/end, `format=JSON` and `time-standard=UTC`. Candidate parameters are `T2M`, `T2M_MAX`, `PRECTOTCORR`, `RH2M`, `WS2M`. Preserve response units, source and missing-value metadata. The provider describes meteorological inputs at roughly 0.5° × 0.625°, so reuse one regional response for nearby pivots. [NASA request guidance](https://power.larc.nasa.gov/docs/tutorials/service-data-request/api/).

Storage planning: a 1 km square at 10 m has 10,000 pixel locations. Four float32 bands across 20 dates are about 3.2 MB of uncompressed numeric values per field, before masks, metadata, margins and duplicates. Actual downloads and dependencies will be larger; this calculation only shows why windowed caching is reasonable.

## Acquire the missing labels

Approach an operator or irrigation service company for a small retrospective export and prospective inspections. University researchers who conducted Saudi pivot studies are another potential source, subject to data availability and permission; no agreement is implied. [Saudi Sentinel time-series study](https://www.mdpi.com/2072-4292/14/5/1205).

Request a field ID, geolocated affected area, observation/inspection time, crop stage, operation history, suspected cause, measured pressure/flow with units, verified finding, repair/action, and resolution evidence. Remove personal identifiers from the modeling export. Keep source permission and reuse scope attached to each contribution.

Use three distinct label fields: `observed_pattern` (ring/sector/whole-field change), `confirmed_cause` (equipment, soil/crop, management, other, unknown), and `actionability` (actionable, non-actionable, inconclusive). Satellite visual interpretation can support the first field; it cannot supply the second by itself. Do not convert an uninspected field into a healthy label.

Sample both alerted and unalerted zones, retain inconclusive cases, and keep fields/seasons grouped in evaluation. This prevents a dataset consisting only of the model's own selected anomalies. The existing solution's proposed field-validation targets remain targets until these inspections occur.

## What the team can claim now

Public catalogue access has been demonstrated for a candidate Saudi region. Suitable source documentation and candidate model cards have been located. A complete usable crop time series, downloaded demo dataset, confirmed farm relationship, trained model and fault benchmark have not yet been established.
