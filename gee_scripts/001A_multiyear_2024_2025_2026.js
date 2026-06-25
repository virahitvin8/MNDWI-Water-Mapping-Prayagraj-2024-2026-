/**
 * Project 001A — MNDWI Water Body Mapping: Prayagraj
 * Multi-Year Analysis (2024–2026) | Ganga-Yamuna Confluence
 *
 * Author: N. Akshit Vinay
 * Run this in the Google Earth Engine Code Editor:
 * https://code.earthengine.google.com
 *
 * What this script does:
 *  1. Defines a 5 km buffer AOI around the Sangam (Triveni Sangam).
 *  2. Builds a < 5% cloud-filtered Sentinel-2 L2A median composite for
 *     each analysis window (pre-monsoon / post-monsoon / onset).
 *  3. Computes MNDWI = (Green - SWIR1) / (Green + SWIR1) using bands B3 and B11.
 *  4. Thresholds MNDWI > 0 to get a binary water mask.
 *  5. Sums pixel area over the water mask to get water extent in km².
 *  6. Prints each year's stats to the Console and exports GeoTIFFs to Drive.
 *
 * Re-run note: GEE composites are dynamic — collection contents can shift
 * slightly (e.g. late-arriving scenes) so re-running may give marginally
 * different values than the ones recorded in stats/water_area_prayagraj.csv.
 * That CSV reflects the console output at the time this analysis was run.
 */

// ---------------------------------------------------------------------
// 1. STUDY AREA
// ---------------------------------------------------------------------
var sangam = ee.Geometry.Point([81.8463, 25.4358]); // Triveni Sangam, Prayagraj
var aoi = sangam.buffer(5000); // 5 km radius buffer (~78.5 sq km)

Map.centerObject(aoi, 12);
Map.addLayer(aoi, {color: 'yellow'}, 'AOI - 5km buffer');

// ---------------------------------------------------------------------
// 2. CLOUD MASK (QA60 bits 10 and 11)
// ---------------------------------------------------------------------
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);
}

// ---------------------------------------------------------------------
// 3. COMPOSITE BUILDER
// ---------------------------------------------------------------------
function buildComposite(startDate, endDate) {
  return ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(aoi)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
    .map(maskS2clouds)
    .median()
    .clip(aoi);
}

// ---------------------------------------------------------------------
// 4. MNDWI + WATER AREA CALCULATION
// ---------------------------------------------------------------------
function computeWaterArea(composite, label) {
  var mndwi = composite.normalizedDifference(['B3', 'B11']).rename('MNDWI');
  var waterMask = mndwi.gt(0).selfMask();

  var pixelAreaImg = ee.Image.pixelArea();
  var areaImage = pixelAreaImg.updateMask(waterMask);

  var stats = areaImage.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: aoi,
    scale: 10,
    maxPixels: 1e9
  });

  var areaKm2 = ee.Number(stats.get('area')).divide(1e6);
  print(label + ' water area (sq km):', areaKm2);

  return {mndwi: mndwi, waterMask: waterMask, areaKm2: areaKm2};
}

// ---------------------------------------------------------------------
// 5. DEFINE ANALYSIS WINDOWS
// ---------------------------------------------------------------------
var periods = {
  pre2024:  {start: '2024-05-01', end: '2024-05-31', label: '2024 Pre-Monsoon (May)'},
  post2024: {start: '2024-10-01', end: '2024-10-31', label: '2024 Post-Monsoon (Oct)'},
  pre2025:  {start: '2025-05-01', end: '2025-05-31', label: '2025 Pre-Monsoon (May)'},
  post2025: {start: '2025-10-01', end: '2025-10-31', label: '2025 Post-Monsoon (Oct)'},
  pre2026:  {start: '2026-05-01', end: '2026-05-31', label: '2026 Pre-Monsoon (May)'},
  onset2026:{start: '2026-06-01', end: '2026-06-24', label: '2026 Monsoon Onset (1-24 Jun)'}
};

// ---------------------------------------------------------------------
// 6. RUN ANALYSIS FOR EACH PERIOD
// ---------------------------------------------------------------------
var results = {};
Object.keys(periods).forEach(function(key) {
  var p = periods[key];
  var composite = buildComposite(p.start, p.end);
  results[key] = computeWaterArea(composite, p.label);

  Map.addLayer(
    results[key].waterMask,
    {palette: ['00BFFF']},
    p.label + ' - water mask',
    false // layer hidden by default; toggle on in Layers panel
  );
});

// ---------------------------------------------------------------------
// 7. CHANGE DETECTION (example: 2024 pre vs post)
// ---------------------------------------------------------------------
var changeMap2024 = results.pre2024.waterMask.unmask(0).multiply(2)
  .add(results.post2024.waterMask.unmask(0))
  .rename('change_class_2024');
// 0 = always dry, 1 = new water (post only), 2 = water lost (pre only), 3 = always water
Map.addLayer(changeMap2024, {min: 0, max: 3, palette: ['white', 'cyan', 'orange', 'blue']},
  '2024 Change Map (pre x2 + post)', false);

// ---------------------------------------------------------------------
// 8. EXPORTS — run these manually from the Tasks tab after the script runs
// ---------------------------------------------------------------------
Object.keys(periods).forEach(function(key) {
  Export.image.toDrive({
    image: results[key].mndwi,
    description: '001A_MNDWI_' + key,
    folder: 'GEE_001A_Prayagraj_MultiYear',
    region: aoi,
    scale: 10,
    crs: 'EPSG:32644', // WGS 84 / UTM Zone 44N
    maxPixels: 1e9
  });
});
