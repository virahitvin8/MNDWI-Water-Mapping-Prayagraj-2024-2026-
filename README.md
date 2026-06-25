<div align="center">

# 🌊 Project 001A — MNDWI Water Mapping: Prayagraj
### Multi-Year Surface Water Analysis (2024–2026) | Ganga-Yamuna Confluence

[![License: MIT](https://img.shields.io/badge/Code-MIT-blue.svg)](LICENSE)
[![Data: CC BY 4.0](https://img.shields.io/badge/Data-CC%20BY%204.0-green.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Sentinel-2 L2A](https://img.shields.io/badge/Satellite-Sentinel--2%20L2A-orange.svg)](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED)
[![Platform: GEE](https://img.shields.io/badge/Platform-Google%20Earth%20Engine-yellow.svg)](https://earthengine.google.com/)
[![Tool: QGIS 3.34](https://img.shields.io/badge/GIS-QGIS%203.34-brightgreen.svg)](https://qgis.org/)
[![Resolution: 10m](https://img.shields.io/badge/Resolution-10m-lightblue.svg)]()
[![Cloud Filter: <5%](https://img.shields.io/badge/Cloud%20Filter-%3C5%25-white.svg)]()

*Satellite-based surface water extent tracking at the Sangam (Triveni Sangam), Prayagraj, using Sentinel-2 imagery and the Modified Normalized Difference Water Index (MNDWI). Part of an ongoing open series mapping Indian water bodies with free, open satellite data.*

</div>

---

## 🗺️ Maps

### 3-Year Comparison Grid

![MNDWI Prayagraj 3-Year Grid](maps/001A_MNDWI_Prayagraj_3Year_Grid.png)

---

### Year-by-Year Panels

| 2024 | 2025 | 2026 |
|:---:|:---:|:---:|
| ![2024](maps/001A_MNDWI_Prayagraj_2024.png) | ![2025](maps/001A_MNDWI_Prayagraj_2025.png) | ![2026](maps/001A_MNDWI_Prayagraj_2026.png) |

---

## 📊 Results

| Year | Pre-Monsoon (sq km) | Post-Monsoon (sq km) | Δ (%) | Window |
|------|:-------------------:|:----------------------:|:------:|--------|
| 2024 | 9.3708 | 9.2937 | -0.82% | May vs Oct (SW monsoon peak) |
| 2025 | 3.0834 | 8.3452 | +170.65% | May vs Oct (SW monsoon peak) |
| 2026* | 0.8725 | 3.5675 | +308.88% | May vs Jun 1–24 (onset only) |

> **\*2026 note:** The post-monsoon column for 2026 shows a partial monsoon-onset reading through June 24, 2026 — *not* a full seasonal peak. It is not directly comparable to the Oct 2024/2025 peak figures and should be read as an early-season signal only.

**Year-on-year pre-monsoon baseline change:**
- 9.37 → 3.08 sq km (2024→2025): **-67.1%**
- 3.08 → 0.87 sq km (2025→2026): **-71.7%**
- 9.37 → 0.87 sq km (2024→2026): **-90.7% total decline**

All figures are direct output from `reduceRegion`/pixel-area sums in the GEE script — not estimates. See [⚠️ Notes on Interpretation](#️-notes-on-interpretation) before drawing conclusions from a single AOI/3-year window.

---

## 📍 Study Area

| Parameter | Value |
|---|---|
| **Location** | Sangam (Triveni Sangam), Prayagraj, Uttar Pradesh |
| **Coordinates** | 25.4358°N, 81.8463°E |
| **AOI** | 5 km radius buffer (~78.5 sq km) |
| **CRS** | WGS 84 / UTM Zone 44N (EPSG:32644) |
| **Monsoon Type** | Southwest Monsoon (Jun–Sep) |

---

## 🛰️ Data Sources

| Parameter | Value |
|---|---|
| Satellite | Sentinel-2 Level-2A |
| GEE Collection | `COPERNICUS/S2_SR_HARMONIZED` |
| Spatial Resolution | 10 m |
| Cloud Filter | < 5% scene-level (`CLOUDY_PIXEL_PERCENTAGE`) + per-pixel QA60 mask |
| Spectral Index | MNDWI = normalizedDifference(B3, B11) |
| Water Threshold | MNDWI > 0 |
| Export Scale | 10 m |
| Provider | ESA / Copernicus (CC BY 4.0) |

---

## 🔬 Methodology

```text
1.  Define AOI: 5 km buffer around 25.4358°N, 81.8463°E (Triveni Sangam)
2.  Filter Sentinel-2 L2A: bounds + cloud cover < 5%
3.  Apply per-pixel QA60 cloud mask (bits 10 and 11)
4.  Create median composite per analysis window
5.  MNDWI = normalizedDifference(['B3', 'B11'])   // Green−SWIR1 / Green+SWIR1
6.  Water mask: MNDWI > 0 → binary raster (1 = water, 0 = land)
7.  Change map: preWater × 2 + postWater (4-class output)
8.  Water area: pixelArea × waterMask → reduceRegion → sum → ÷ 1e6 → km²
9.  Export GeoTIFF (10 m, EPSG:32644) via Export.image.toDrive
10. Vectorize in QGIS 3.34 → Polygonize → filter → area calculation
```

**Analysis Windows:**

| Period | Dates | Rationale |
|---|---|---|
| Pre-Monsoon | May 1–31 (each year) | Dry season baseline — minimal flow, no monsoon signal |
| Post-Monsoon | Oct 1–31 (2024, 2025) | SW monsoon seasonal peak |
| Monsoon Onset | Jun 1–24, 2026 | Partial — 2026 Oct data not yet available |

---

## 📁 Repository Structure

```
project_001A/
├── gee_scripts/
│   └── 001A_multiyear_2024_2025_2026.js   # Full GEE script — reproduces all numbers
├── stats/
│   └── water_area_prayagraj.csv            # All years, raw stats output
├── maps/
│   ├── 001A_MNDWI_Prayagraj_3Year_Grid.png  # 3-year side-by-side comparison
│   ├── 001A_MNDWI_Prayagraj_2024.png         # 2024 pre vs post panel
│   ├── 001A_MNDWI_Prayagraj_2025.png         # 2025 pre vs post panel
│   └── 001A_MNDWI_Prayagraj_2026.png         # 2026 pre vs onset panel
└── README.md
```

---

## 🚀 Reproduce

```bash
# 1. Open Google Earth Engine Code Editor
#    https://code.earthengine.google.com

# 2. New Script → paste contents of:
#    gee_scripts/001A_multiyear_2024_2025_2026.js

# 3. Click Run → Console tab → read off each period's water area (sq km)

# 4. Tasks tab → run the export tasks
#    Export folder: GEE_001A_Prayagraj_MultiYear

# 5. Download GeoTIFFs from Google Drive

# 6. Open in QGIS 3.34+ → Polygonize → style → export map layout
```

> **Re-run note:** GEE composites are dynamic — collection contents can shift slightly (e.g. late-arriving scenes), so re-running may give marginally different values from those recorded in `stats/water_area_prayagraj.csv`. That CSV reflects the console output at the time this analysis was run.

---

## ⚠️ Notes on Interpretation

- **AOI scope:** A single 5 km-radius AOI captures a short stretch of river, not the full Ganga-Yamuna system. Local readings shouldn't be generalized to basin-wide water availability without more sites.
- **Time series length:** A 3-year sample is short for climate-trend claims. The pre-monsoon decline shown here is a **real, measured pattern** in this AOI across these three years — but three data points don't establish a long-term trend on their own. More years and cross-checking against river gauge / CWC data would be needed before treating it as a multi-year drying trend.
- **Threshold sensitivity:** MNDWI > 0 is a simple, widely used cutoff but can misclassify wet sand, shadow, or turbid water at margins. Visually spot-check the water masks against the optical composite before using figures beyond illustrative/educational purposes.
- **2026 incompleteness:** The 2026 figure is an onset-window reading (Jun 1–24), not a seasonal peak, and is not apples-to-apples with the Oct 2024/2025 peak figures.

---

## 📜 License

| Component | License |
|---|---|
| Code (`gee_scripts/`) | [MIT](LICENSE) |
| Satellite data | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — ESA/Copernicus |
| Maps & outputs | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

---

## 👤 Author

**N. Akshit Vinay** — Part of an ongoing open geospatial series mapping Indian water bodies and land surfaces with free satellite data and open-source GIS tools.

*Project 001A in the MISSION400 series.*

---

<div align="center">

*Open data · Open tools · Reproducible science*

</div>
