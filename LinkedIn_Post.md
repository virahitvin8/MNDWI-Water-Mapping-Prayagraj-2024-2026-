I’ve spent the last few days mapping the Triveni Sangam from space. Here is the 3-year story of the Ganga-Yamuna confluence told through pixels and polygons. 🛰️💧

📍 Location: Prayagraj (25.4358°N, 81.8463°E) 📅 Timeframe: 2024 – 2026 (Pre vs. Post-monsoon)

The Pattern We Can't Ignore: Over just three years, the summer dry-season baseline has plummeted by 90.7% (from 9.37 sq km in 2024 to 0.87 sq km in 2026) within a 5km radius. Yet, as the baseline drops, the river's immediate monsoon recovery surge is becoming significantly sharper (+308% onset surge in 2026 alone).

🛠️ The Geospatial Workflow: 1️⃣ Cloud Pipeline (Google Earth Engine): Pulled Sentinel-2 L2A imagery. Applied a strict QA60 per-pixel cloud mask and a scene-level <5% filter. Generated median composites and ran the MNDWI index to isolate surface water.

2️⃣ Local Pipeline (QGIS 3.34): I exported the raw 10m GeoTIFFs into my local QGIS environment. My master project involved:

Raster Conversion: Polygonizing the MNDWI masks.
Geoprocessing: Filtering and extracting precise area geometry (EPSG:32644).
Change Detection: Layering the 2024/2025/2026 pre and post layers to visualize the exact geometry of water loss and recovery.
The imagery speaks for itself. It’s a fascinating look at localized hydrological variance using open data.

I've made the full methodology, GEE scripts, my QGIS Master Project (.qgz), and all raw GeoTIFFs/GeoPackages completely open-source.

🔗 Explore the Data, Code, & QGIS Project: https://github.com/virahitvin8/MNDWI-Water-Mapping-Prayagraj-2024-2026-

This is Project 001A in the MISSION400 series. More to come.

#GeoAI #RemoteSensing #GIS #EarthObservation #WaterResources #Sentinel2 #GoogleEarthEngine #QGIS #SpatialAnalysis #Prayagraj #ClimateData #OpenData #MNDWI #SpaceTech #DataScience