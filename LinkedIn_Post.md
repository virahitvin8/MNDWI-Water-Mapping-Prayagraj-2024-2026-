# LinkedIn Posts — Project 001A: MNDWI Water Mapping, Prayagraj (2024–2026)

*Here are three variations of the LinkedIn post, tailored for different audiences. They include high-visibility hashtags and a structured layout.*

---

## 🌟 Option 1: The "Visual Impact" Post (Best for General & GIS Audiences)
*(Attach all 4 images: 3-Year Grid first, then 2024, 2025, 2026 individual panels)*

I mapped the Sangam from space, three years running. Here's what changed. 🛰️💧

📍 **Location:** Triveni Sangam, Prayagraj (25.4358°N, 81.8463°E)
📅 **Timeframe:** 2024 – 2026 (Pre-monsoon vs. Post-monsoon)
☁️ **Data Quality:** Strict <5% cloud filter on every scene

The results reveal a stark contrast in the river's behaviour:

📉 **THE BASELINE DROP (Pre-Monsoon, May)**
- 2024: 9.37 sq km
- 2025: 3.08 sq km
- 2026: 0.87 sq km
*That’s a **90.7% drop** in pre-monsoon surface water in this 5km radius over three years.*

🌊 **THE MONSOON RESPONSE (Onset/Peak)**
- 2024 Peak: -0.82% change vs pre-monsoon
- 2025 Peak: +170.65% recovery
- 2026 Onset (Jun 1-24): +308.88% immediate surge

**The Pattern:** The summer baseline keeps getting drier, but the monsoon response gets sharper. Each year, the river is recovering from a significantly lower starting point—and rebounding with greater intensity.

*Caveat: This is a 5km-radius AOI over three monsoon cycles. It’s a real, measured, localized pattern, not a 30-year climate trend. Worth tracking further.*

🛠️ **Methodology:** MNDWI on Sentinel-2 L2A (10m resolution) using Google Earth Engine & QGIS 3.34.
📂 **Open Science:** Full GEE scripts, raw datasets, vectors, and methodology notes are fully open-source.

🔗 **Explore the Data & Code:** https://github.com/virahitvin8/MNDWI-Water-Mapping-Prayagraj-2024-2026-

*This is Project 001A in an ongoing series applying free satellite data to Indian water bodies and agricultural land.*

#GeoAI #RemoteSensing #GIS #EarthObservation #WaterResources #Sentinel2 #GoogleEarthEngine #QGIS #Prayagraj #ClimateTech #OpenData #MNDWI #SpaceTech #Sustainability

---

## 🔬 Option 2: The "Technical Deep-Dive" Post (Best for Data Scientists & Remote Sensing Experts)
*(Attach the 3-Year Grid image)*

How much does a river's baseline change in 3 years? Let's look at the data. 🌍🛰️

For Project 001A, I analyzed the surface water extent at the Ganga-Yamuna confluence in Prayagraj (2024-2026) using Sentinel-2 L2A imagery. 

Using a strict <5% cloud-filtered median composite, I applied the Modified Normalized Difference Water Index (MNDWI) to track the Pre vs. Post-monsoon cycles.

📊 **Key Findings (5km-radius AOI):**
1️⃣ **Depleting Baseline:** The pre-monsoon (May) water extent dropped from 9.37 km² in 2024 to just 0.87 km² in 2026. A massive 90.7% decline.
2️⃣ **Intensified Recovery:** As the baseline drops, the monsoon surge is becoming sharper. The 2026 onset (June 1-24) alone saw a +308% surge compared to its dry baseline.

⚙️ **The Tech Stack:**
- **Source:** `COPERNICUS/S2_SR_HARMONIZED`
- **Masking:** QA60 bit 10/11 cloud mask applied per-pixel
- **Processing:** Google Earth Engine (GEE)
- **Vectorization & Area Calc:** QGIS 3.34 (EPSG:32644)

While a 3-year window in a localized 5km AOI isn't enough to declare a macro-climate shift, it highlights a measurable, high-variance local hydrology pattern that warrants further monitoring alongside CWC gauge data.

All code (GEE scripts), raw rasters (.tif), and vectors (.gpkg) are open-source and ready for reproduction.

🔗 **GitHub Repository:** https://github.com/virahitvin8/MNDWI-Water-Mapping-Prayagraj-2024-2026-

#DataScience #RemoteSensing #GoogleEarthEngine #GeoSpatial #GIS #SatelliteImagery #Python #Sentinel2 #Copernicus #Hydrology #EarthObservation #QGIS #OpenSource 

---

## 🌍 Option 3: The "Short & Punchy" Post (Best for Quick Engagement)
*(Attach the 3-Year Grid image)*

The Triveni Sangam in Prayagraj is changing. 🛰️📉

Using Sentinel-2 satellite data and Google Earth Engine, I mapped the Ganga-Yamuna confluence over the last 3 years (2024-2026). 

The pre-monsoon dry baseline has shrunk by **90.7%** (9.37 sq km down to 0.87 sq km) in this 5km radius. At the same time, the immediate monsoon recovery surge is getting significantly sharper.

It's a fascinating look at localized hydrological variance using 10m-resolution open space data. 

I've made the full methodology, GEE scripts, QGIS files, and raw data completely open-source. Reproduce the results yourself below! 👇

🔗 **GitHub (Data & Code):** https://github.com/virahitvin8/MNDWI-Water-Mapping-Prayagraj-2024-2026-

#SpaceTech #EarthObservation #GIS #RemoteSensing #Prayagraj #WaterManagement #GoogleEarthEngine #GeoSpatial #ClimateData #Sentinel2
