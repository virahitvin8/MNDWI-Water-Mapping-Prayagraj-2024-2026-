# Data Directory Overview

The `data/` folder contains all raw and processed artefacts that underpin the analysis presented in this repository. It is organised to make it easy to reproduce the results or to explore the intermediate products.

```
project_001A/
├── data/
│   ├── geotiffs_mndwi/   # MNDWI GeoTIFFs exported from Google Earth Engine (pre‑, post‑ and change rasters)
│   │   ├── 001A_2024_Prayagraj_Pre_MNDWI.tif
│   │   ├── 001A_2024_Prayagraj_Post_MNDWI.tif
│   │   ├── 001A_2025_Prayagraj_Pre_MNDWI.tif
│   │   ├── 001A_2025_Prayagraj_Post_MNDWI.tif
│   │   ├── 001A_2026_Prayagraj_Pre_MNDWI.tif
│   │   └── 001A_2026_Prayagraj_Post_MNDWI.tif
│   ├── geotiffs_water/   # Water‑mask rasters derived from the MNDWI layers (binary masks)
│   │   ├── water_pre_2024.tif
│   │   ├── water_post_2024.tif
│   │   ├── water_pre_2025.tif
│   │   ├── water_post_2025.tif
│   │   ├── water_pre_2026.tif
│   │   └── water_post_2026_jun.tif
│   ├── vectors/          # Vectorised water polygons (GeoPackage format) for each period
│   │   ├── PRE2024.gpkg
│   │   ├── POST2024.gpkg
│   │   ├── PRE2025.gpkg
│   │   ├── POST2025.gpkg
│   │   ├── PRE2026.gpkg
│   │   ├── POST2026.gpkg
│   │   ├── water_pre_2024.gpkg
│   │   ├── water_post_2024.gpkg
│   │   ├── water_pre_2025.gpkg
│   │   ├── water_post_2025.gpkg
│   │   ├── water_pre_2026.gpkg
│   │   └── water_post_2026_jun.gpkg
│   └── stats_raw.csv     # Exact copy of the "STATS REPORT" produced by the processing chain
```

### How to use the data

* **MNDWI GeoTIFFs** – Load in any GIS (QGIS, ArcGIS) to visualise the raw index values. The script `gee_scripts/001A_multiyear_2024_2025_2026.js` reproduces them.
* **Water‑mask GeoTIFFs** – Binary rasters (`1 = water`). Useful for quick area calculations or for creating change maps.
* **Vector GeoPackages** – Polygonised water extents. Each file contains a single layer with geometry and an `area_km2` attribute that matches the numbers reported in the README.
* **stats_raw.csv** – The original stats table (exact copy of the `STATS REPORT` file) for reference or for feeding into a spreadsheet.

All raster files are 10 m resolution, EPSG:32644, and were produced with a strict **< 5 % cloud filter**. The vector files were generated in QGIS 3.34 using the `Raster → Conversion → Polygonize` tool and subsequently filtered to retain only water features.
