# LinkedIn Post Drafts — Project 001A: MNDWI Water Mapping, Prayagraj

*These drafts are heavily focused on the visual impact of your images and your detailed QGIS workflow. Choose the one that best fits your style.*

---

## 🌟 Draft 1: The "Visual & QGIS Workflow" Post (High Visibility)
*(Attach all 4 images: 3-Year Grid first, then 2024, 2025, 2026 individual panels)*

I’ve spent the last few weeks mapping the Triveni Sangam from space. Here is the 3-year story of the Ganga-Yamuna confluence told through pixels and polygons. 🛰️💧

📍 **Location:** Prayagraj (25.4358°N, 81.8463°E)
📅 **Timeframe:** 2024 – 2026 (Pre vs. Post-monsoon)

**The Pattern We Can't Ignore:**
Over just three years, the summer dry-season baseline has plummeted by **90.7%** (from 9.37 sq km in 2024 to 0.87 sq km in 2026) within a 5km radius. Yet, as the baseline drops, the river's immediate monsoon recovery surge is becoming significantly sharper (+308% onset surge in 2026 alone).

🛠️ **The Geospatial Workflow:**
I built the raw data in **Google Earth Engine** using a strict <5% cloud-filtered median composite of Sentinel-2 L2A imagery to extract the MNDWI index.

But the real magic happened in **QGIS 3.34**. I built a master project file containing:
- Clean raster-to-vector polygonizations for precise geometry.
- 4-class temporal change maps (New Water, Lost Water, Permanent Water, Dry).
- Granular area statistics using QGIS's vector geometry tools for absolute accuracy.

The imagery speaks for itself. It’s a fascinating look at localized hydrological variance using open data. 

I've made the full methodology, GEE scripts, my QGIS Master Project (.qgz), and all raw GeoTIFFs/GeoPackages completely open-source.

🔗 **GitHub (Data, Code, & QGIS Project):** https://github.com/virahitvin8/MNDWI-Water-Mapping-Prayagraj-2024-2026-

*This is Project 001A in the MISSION400 series. More to come.*

#GeoAI #RemoteSensing #GIS #EarthObservation #WaterResources #Sentinel2 #GoogleEarthEngine #QGIS #SpatialAnalysis #Prayagraj #ClimateData #OpenData #MNDWI #SpaceTech

---

## 🔬 Draft 2: The "GIS Specialist" Post (Focused on the Technical GIS Aspect)
*(Attach the 3-Year Grid image + maybe a screenshot of your QGIS environment if you have one)*

Ever wonder how much a river's extent changes in 3 years? Let's process the data. 🌍🛰️

For Project 001A, I analyzed the surface water extent at the Ganga-Yamuna confluence (2024-2026). Here is the complete open-source pipeline I used to track a massive 90.7% drop in the pre-monsoon baseline.

1️⃣ **Cloud Pipeline (Google Earth Engine):**
Pulled `COPERNICUS/S2_SR_HARMONIZED` (Sentinel-2 L2A). Applied a QA60 per-pixel cloud mask and a scene-level <5% filter. Generated median composites and ran the MNDWI index (B3, B11) to isolate surface water.

2️⃣ **Local Pipeline (QGIS 3.34):**
I exported the raw 10m GeoTIFFs into my local QGIS environment. The master project involved:
- **Raster Conversion:** Polygonizing the MNDWI masks.
- **Geoprocessing:** Filtering and extracting area geometry (EPSG:32644).
- **Change Detection:** Layering the 2024/2025/2026 pre and post layers to visualize the exact geometry of water loss and recovery.

📊 **The Insight:** While the summer baseline is shrinking, the immediate monsoon recovery is acting like a whiplash—surging +308% during the 2026 onset compared to the dry base.

I've uploaded the entire repository to GitHub—including my `MNDWI_Prayagraj_Master.qgz` QGIS project, the raw TIFs, vector packages, and GEE scripts.

🔗 **Explore the Repo:** https://github.com/virahitvin8/MNDWI-Water-Mapping-Prayagraj-2024-2026-

#DataScience #RemoteSensing #QGIS #GoogleEarthEngine #GeoSpatial #GIS #SatelliteImagery #Python #Sentinel2 #Copernicus #Hydrology #EarthObservation #OpenSource #SpatialData

---

## 🌍 Draft 3: The "Short & Image-Heavy" Post (Maximum Visual Engagement)
*(Attach all 4 images: 3-Year Grid first, then 2024, 2025, 2026 individual panels)*

A 90.7% drop in the pre-monsoon surface water baseline. A +308% immediate recovery surge. 🛰️📉

This is the Triveni Sangam in Prayagraj over the last 3 years (2024-2026), mapped using 10m-resolution Sentinel-2 satellite data.

The pattern is stark: the summer dry baseline is getting lower, but the monsoon response is getting sharper. 

I processed the imagery in Google Earth Engine and ran the precise vector geometry and change-detection mapping locally in QGIS 3.34.

All my work—from the GEE scripts down to the master QGIS `.qgz` project file and raw data—is now open-source on GitHub. Dive in and reproduce it yourself! 👇

🔗 **GitHub:** https://github.com/virahitvin8/MNDWI-Water-Mapping-Prayagraj-2024-2026-

#SpaceTech #EarthObservation #GIS #QGIS #RemoteSensing #Prayagraj #WaterManagement #GoogleEarthEngine #GeoSpatial #ClimateData #Sentinel2
