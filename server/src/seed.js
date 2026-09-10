/**
 * FreightSense Database Seeder
 * ============================
 * Seeds MongoDB with all existing demo/sample data from the original frontend mock files.
 * Every record is tagged with dataStatus: "DEMO" so the UI can clearly distinguish
 * DEMO data from user-submitted data.
 *
 * Run once: node src/seed.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');

const Vessel = require('./models/Vessel');
const Port = require('./models/Port');
const Route = require('./models/Route');
const Alert = require('./models/Alert');
const FreightData = require('./models/FreightData');
const MarketData = require('./models/MarketData');

// ──────────────────────────────────────────────
// DEMO DATA — migrated from src/data/mock*.js
// ──────────────────────────────────────────────

const vessels = [
  {
    id: 'handysize', class: 'Handysize', capacityDWT: 35000,
    cargoCapacityRange: '25,000 - 38,000 MT', draftMeters: 10.2, loaMeters: 180, beamMeters: 28,
    dailyCharterRateUSD: 14200, estimatedFreightUSDMT: 31.50, fuelConsumptionMTDay: 18.5,
    speedKnots: 13.0, portCompatibility: 'Universal Access (Includes shallow riverine ports like Haldia)',
    idleTimeRisk: 'Low (0.5 - 1.0 Day)', suitabilityScore: 68, isRecommended: false,
    reasons: [
      '✓ Fits all East Coast Indian ports including Haldia & Sagar',
      '✓ Gear-fitted with onboard cranes for ports with poor shore cranes',
      '✗ Higher per-ton freight cost due to lack of scale economies',
      '✗ Sub-optimal for 100,000+ MT bulk coking coal procurement',
    ], dataStatus: 'DEMO',
  },
  {
    id: 'supramax', class: 'Supramax / Ultramax', capacityDWT: 58000,
    cargoCapacityRange: '50,000 - 62,000 MT', draftMeters: 12.8, loaMeters: 199, beamMeters: 32.2,
    dailyCharterRateUSD: 18500, estimatedFreightUSDMT: 26.80, fuelConsumptionMTDay: 24.0,
    speedKnots: 13.5, portCompatibility: 'Compatible with Paradip, Vizag, Gangavaram, Gopalpur, Dhamra',
    idleTimeRisk: 'Low (1.0 - 1.5 Days)', suitabilityScore: 84, isRecommended: false,
    reasons: [
      '✓ Excellent flexibility across mid-draft Indian ports',
      '✓ Onboard gear allows fast discharging in non-mechanized berths',
      '✓ Competitive freight rate for medium shipment sizes',
      '! Slightly higher cost $/MT compared to Panamax on long voyages',
    ], dataStatus: 'DEMO',
  },
  {
    id: 'panamax', class: 'Panamax / Kamsarmax', capacityDWT: 75000,
    cargoCapacityRange: '70,000 - 85,000 MT', draftMeters: 14.5, loaMeters: 229, beamMeters: 32.3,
    dailyCharterRateUSD: 21800, estimatedFreightUSDMT: 24.80, fuelConsumptionMTDay: 29.5,
    speedKnots: 14.0, portCompatibility: 'Optimized for Paradip, Vizag, Gangavaram, Dhamra',
    idleTimeRisk: 'Moderate (1.5 - 2.5 Days)', suitabilityScore: 92, isRecommended: true,
    recommendationTag: 'BEST MATCH FOR COAL / STEEL IMPORTS',
    reasons: [
      '✓ Perfect cargo capacity fit (75k-85k MT) for SAIL / steel plant batches',
      '✓ Draft fully compatible with Paradip (18m), Vizag (17.5m) and Dhamra (18m)',
      '✓ Lowest overall voyage cost $/MT on Australia-East Coast India route',
      '✓ High berth availability at mechanized coal import terminals',
      '✓ Lower estimated idle time & demurrage exposure',
    ], dataStatus: 'DEMO',
  },
  {
    id: 'capesize', class: 'Capesize', capacityDWT: 180000,
    cargoCapacityRange: '150,000 - 200,000 MT', draftMeters: 18.2, loaMeters: 292, beamMeters: 45.0,
    dailyCharterRateUSD: 29500, estimatedFreightUSDMT: 22.10, fuelConsumptionMTDay: 46.0,
    speedKnots: 14.5, portCompatibility: 'Restricted to deep-draft berths (Paradip, Gangavaram, Dhamra)',
    idleTimeRisk: 'High (3.5 - 5.0 Days)', suitabilityScore: 76, isRecommended: false,
    reasons: [
      '✓ Unbeatable freight economy ($22.10/MT) for massive volume parcels',
      '✗ Requires deep draft (18.2m+) - draft constrained at high tide in some berths',
      '✗ Requires lighterage or top-off for Haldia & shallow river ports',
      '✗ Higher queueing at Capesize mechanized berths causing demurrage risk',
    ], dataStatus: 'DEMO',
  },
];

const ports = [
  { id: 'paradip', name: 'Paradip Port', state: 'Odisha', code: 'INPRT1', maxDraft: 18.0, maxLOA: 295, maxBeam: 45, handlingCapacityTPD: 75000, currentCongestion: 'Medium', avgWaitTimeDays: 3.2, avgTurnaroundHrs: 48, status: 'Operational', operationalBerths: 16, activeVesselsAtAnchorage: 14, demurrageRatePerDayUSD: 24500, cargoTypes: ['Coking Coal', 'Thermal Coal', 'Iron Ore', 'Limestone'], dataNote: 'Deep draft capability allows Capesize and Panamax loading without lighterage.', dataStatus: 'DEMO' },
  { id: 'vizag', name: 'Visakhapatnam (Vizag) Port', state: 'Andhra Pradesh', code: 'INVTZ1', maxDraft: 17.5, maxLOA: 280, maxBeam: 43, handlingCapacityTPD: 68000, currentCongestion: 'Low', avgWaitTimeDays: 1.1, avgTurnaroundHrs: 32, status: 'Operational', operationalBerths: 22, activeVesselsAtAnchorage: 6, demurrageRatePerDayUSD: 22000, cargoTypes: ['Coking Coal', 'Iron Ore', 'Fertilizer', 'Manganese'], dataNote: 'Outer harbor permits Cape-size vessels up to 200,000 DWT.', dataStatus: 'DEMO' },
  { id: 'gangavaram', name: 'Gangavaram Port', state: 'Andhra Pradesh', code: 'INGGV1', maxDraft: 18.5, maxLOA: 300, maxBeam: 48, handlingCapacityTPD: 82000, currentCongestion: 'High', avgWaitTimeDays: 4.8, avgTurnaroundHrs: 64, status: 'Delayed', operationalBerths: 9, activeVesselsAtAnchorage: 19, demurrageRatePerDayUSD: 28000, cargoTypes: ['Coking Coal', 'Thermal Coal', 'Bauxite'], dataNote: 'Deepest port on East Coast; currently experiencing conveyor belt maintenance slowdown.', dataStatus: 'DEMO' },
  { id: 'gopalpur', name: 'Gopalpur Port', state: 'Odisha', code: 'INGPR1', maxDraft: 14.5, maxLOA: 225, maxBeam: 32.5, handlingCapacityTPD: 35000, currentCongestion: 'Low', avgWaitTimeDays: 0.8, avgTurnaroundHrs: 28, status: 'Operational', operationalBerths: 4, activeVesselsAtAnchorage: 2, demurrageRatePerDayUSD: 18500, cargoTypes: ['Thermal Coal', 'Ilmenite', 'Limestone'], dataNote: 'Ideal for Supramax & Handysize vessels; fast turnarounds for medium drafts.', dataStatus: 'DEMO' },
  { id: 'dhamra', name: 'Dhamra Port', state: 'Odisha', code: 'INDHM1', maxDraft: 18.0, maxLOA: 290, maxBeam: 45, handlingCapacityTPD: 85000, currentCongestion: 'Medium', avgWaitTimeDays: 2.4, avgTurnaroundHrs: 40, status: 'Operational', operationalBerths: 6, activeVesselsAtAnchorage: 9, demurrageRatePerDayUSD: 25000, cargoTypes: ['Coking Coal', 'Thermal Coal', 'Limestone', 'Gypsum'], dataNote: 'Fully automated rapid unloader berth; high handling rate.', dataStatus: 'DEMO' },
  { id: 'sagar', name: 'Sagar / Sandheads Anchorage', state: 'West Bengal', code: 'INSGR1', maxDraft: 10.5, maxLOA: 240, maxBeam: 36, handlingCapacityTPD: 22000, currentCongestion: 'High', avgWaitTimeDays: 5.2, avgTurnaroundHrs: 96, status: 'Restricted', operationalBerths: 0, activeVesselsAtAnchorage: 11, demurrageRatePerDayUSD: 21000, cargoTypes: ['Coking Coal', 'Thermal Coal'], dataNote: 'Offshore transshipment & lighterage point prior to Haldia entry.', dataStatus: 'DEMO' },
  { id: 'haldia', name: 'Haldia Dock Complex (SMPT)', state: 'West Bengal', code: 'INHAL1', maxDraft: 8.5, maxLOA: 190, maxBeam: 30, handlingCapacityTPD: 28000, currentCongestion: 'High', avgWaitTimeDays: 4.5, avgTurnaroundHrs: 72, status: 'Delayed', operationalBerths: 12, activeVesselsAtAnchorage: 8, demurrageRatePerDayUSD: 19000, cargoTypes: ['Coking Coal', 'Limestone', 'Petcoke'], dataNote: 'Draft restrictions require mandatory prior lighterage at Sandheads/Sagar for heavy vessels.', dataStatus: 'DEMO' },
];

const routes = [
  {
    id: "aus-pdp",
    origin: "Hay Point / Gladstone, Australia",
    originCode: "AUHPT",
    destination: "Paradip, India",
    destinationCode: "INPRT",
    distanceNM: 4320,
    transitTimeDays: 12.5,
    currentFreightUSD: 24.80,
    forecastFreightUSD: 27.20,
    portCongestion: "Medium (3.2d wait)",
    recommendedVessel: "Panamax",
    recommendedVesselClass: "Panamax",
    riskScore: 34,
    riskLevel: "Low",
    weatherDelayRiskPct: 12,
    bunkerFuelCostUSD: 191800,
    totalVoyageCostUSD: 1860000,
    commodity: "Hard Coking Coal",
    chokepoints: ["Lombok Strait", "Sunda Strait"],
    isPrimaryRoute: true,
    dataStatus: "DEMO"
  },
  {
    id: "aus-vtz",
    origin: "Newcastle, Australia",
    originCode: "AUNTL",
    destination: "Visakhapatnam (Vizag), India",
    destinationCode: "INVTZ",
    distanceNM: 4580,
    transitTimeDays: 13.2,
    currentFreightUSD: 25.40,
    forecastFreightUSD: 27.80,
    portCongestion: "Low (1.1d wait)",
    recommendedVessel: "Panamax",
    recommendedVesselClass: "Panamax",
    riskScore: 28,
    riskLevel: "Low",
    weatherDelayRiskPct: 10,
    bunkerFuelCostUSD: 202500,
    totalVoyageCostUSD: 1905000,
    commodity: "PCI Coal",
    chokepoints: ["Malacca Strait"],
    isPrimaryRoute: false,
    dataStatus: "DEMO"
  },
  {
    id: "idn-pdp",
    origin: "Samarinda / Kalsel, Indonesia",
    originCode: "IDSMR",
    destination: "Paradip, India",
    destinationCode: "INPRT",
    distanceNM: 2450,
    transitTimeDays: 7.2,
    currentFreightUSD: 14.60,
    forecastFreightUSD: 16.10,
    portCongestion: "Medium (3.2d wait)",
    recommendedVessel: "Supramax",
    recommendedVesselClass: "Supramax",
    riskScore: 48,
    riskLevel: "Medium",
    weatherDelayRiskPct: 25,
    bunkerFuelCostUSD: 90000,
    totalVoyageCostUSD: 1095000,
    commodity: "Thermal Coal",
    chokepoints: ["Malacca Strait"],
    isPrimaryRoute: false,
    dataStatus: "DEMO"
  },
  {
    id: "idn-dhm",
    origin: "Banjarmasin, Indonesia",
    originCode: "IDBDJ",
    destination: "Dhamra, India",
    destinationCode: "INDHM",
    distanceNM: 2380,
    transitTimeDays: 7.0,
    currentFreightUSD: 14.20,
    forecastFreightUSD: 15.60,
    portCongestion: "Medium (2.4d wait)",
    recommendedVessel: "Supramax / Panamax",
    recommendedVesselClass: "Supramax",
    riskScore: 42,
    riskLevel: "Medium",
    weatherDelayRiskPct: 22,
    bunkerFuelCostUSD: 87500,
    totalVoyageCostUSD: 1065000,
    commodity: "Low Rank Thermal Coal",
    chokepoints: ["Sunda Strait"],
    isPrimaryRoute: false,
    dataStatus: "DEMO"
  },
  {
    id: "usa-pdp",
    origin: "Baltimore / Hampton Roads, USA",
    originCode: "USBTM",
    destination: "Paradip, India",
    destinationCode: "INPRT",
    distanceNM: 9850,
    transitTimeDays: 28.5,
    currentFreightUSD: 46.50,
    forecastFreightUSD: 51.20,
    portCongestion: "Medium (3.2d wait)",
    recommendedVessel: "Capesize / Panamax",
    recommendedVesselClass: "Capesize",
    riskScore: 65,
    riskLevel: "High",
    weatherDelayRiskPct: 35,
    bunkerFuelCostUSD: 435000,
    totalVoyageCostUSD: 3480000,
    commodity: "High Vol Coking Coal",
    chokepoints: ["Cape of Good Hope", "Gibraltar Strait"],
    isPrimaryRoute: false,
    dataStatus: "DEMO"
  },
  {
    id: "moz-ggv",
    origin: "Nacala / Beira, Mozambique",
    originCode: "MZNCL",
    destination: "Gangavaram, India",
    destinationCode: "INGGV",
    distanceNM: 3720,
    transitTimeDays: 11.0,
    currentFreightUSD: 21.80,
    forecastFreightUSD: 23.90,
    portCongestion: "High (4.8d wait)",
    recommendedVessel: "Panamax",
    recommendedVesselClass: "Panamax",
    riskScore: 58,
    riskLevel: "Medium",
    weatherDelayRiskPct: 30,
    bunkerFuelCostUSD: 168000,
    totalVoyageCostUSD: 1635000,
    commodity: "Coking Coal",
    chokepoints: ["Mozambique Channel"],
    isPrimaryRoute: false,
    dataStatus: "DEMO"
  }
];

const alerts = [
  { severity: 'High', severityBadge: 'CRITICAL', category: 'Freight Volatility', title: 'Australia → India Route Rate Spike Warning', description: 'Baltic Panamax Index (BPI) jumped +4.2% today following increased capesize/panamax iron ore demand to East Asia. Australia to Paradip rates expected to hit $27.20/MT within 21 days.', affectedRoutePort: 'Australia → Paradip / Vizag', timestamp: '12 mins ago', date: '10 Sep 2026', actionRecommended: 'Lock in 3-month Contract of Affreightment (COA) immediately before spot rates appreciate further.', isUnread: true, dataStatus: 'DEMO' },
  { severity: 'High', severityBadge: 'HIGH RISK', category: 'Port Congestion', title: 'Gangavaram Port Conveyor Breakdown - Waiting Delay', description: 'Unloader conveyor belt system at Berth 3 undergoing emergency maintenance. Average vessel anchorage waiting time increased from 2.5 days to 4.8 days.', affectedRoutePort: 'Gangavaram Port (INGGV)', timestamp: '45 mins ago', date: '10 Sep 2026', actionRecommended: "Reroute incoming Supramax vessel 'MV Eastern Glory' (55,000 MT Coking Coal) to Dhamra Port to avoid demurrage costs (~$28,000/day).", isUnread: true, dataStatus: 'DEMO' },
  { severity: 'Medium', severityBadge: 'WARNING', category: 'Weather Disruption', title: 'Monsoon Depression in Bay of Bengal', description: 'IMD weather advisory predicts heavy swells (3.5m - 4.2m) near Sagar Island & Sandheads anchorage over the next 72 hours. Offshore lighterage operations temporarily suspended.', affectedRoutePort: 'Sagar / Sandheads Anchorage (INSGR)', timestamp: '2 hours ago', date: '10 Sep 2026', actionRecommended: 'Instruct lighterage barges to shelter in Haldia dock creek; notify charterers of potential 48h force majeure delay.', isUnread: false, dataStatus: 'DEMO' },
  { severity: 'Medium', severityBadge: 'MODERATE', category: 'Vessel Availability', title: 'Panamax Fleet Shortage in Indian Ocean Basin', description: 'Prompt Panamax vessel tonnage availability dropped by 18% in the Singapore/Strait of Malacca area as grain charters divert tonnage to South America.', affectedRoutePort: 'Singapore Strait / Indian Ocean Basin', timestamp: '4 hours ago', date: '10 Sep 2026', actionRecommended: 'Advance laycan windows by 5 days or evaluate Supramax substitution for upcoming 60,000 MT parcel.', isUnread: false, dataStatus: 'DEMO' },
  { severity: 'Low', severityBadge: 'INFO', category: 'Commodity Price', title: 'Australian Coking Coal Benchmark Adjustment', description: 'Platts Premium Hard Coking Coal FOB Australia index settled at $245.50/MT (+$3.20/MT week-on-week). Supply tightness reported at Hay Point terminal.', affectedRoutePort: 'Hay Point Terminal, Queensland', timestamp: '6 hours ago', date: '10 Sep 2026', actionRecommended: 'Monitor CIF Paradip delivered cost metrics to re-align Q4 procurement budget allocations.', isUnread: false, dataStatus: 'DEMO' },
];

const freightDataRecords = [
  {
    label: 'Australia → Paradip (Panamax)', routeCode: 'AUS_PARADIP_PANAMAX', vesselClass: 'Panamax',
    currentRateUSDMT: 24.80, changePercent: 9.68, trend: 'up',
    timeseries: [
      { date: '15 Aug', rate: 22.40 }, { date: '22 Aug', rate: 23.10 },
      { date: '29 Aug', rate: 23.85 }, { date: '05 Sep', rate: 24.20 },
      { date: '10 Sep', rate: 24.80 }, { date: '17 Sep', rate: 25.60 },
      { date: '24 Sep', rate: 26.40 }, { date: '01 Oct', rate: 26.90 },
      { date: '10 Oct', rate: 27.20 },
    ], dataStatus: 'DEMO',
  },
  {
    label: 'Indonesia → Paradip (Supramax)', routeCode: 'IDN_PARADIP_SUPRAMAX', vesselClass: 'Supramax',
    currentRateUSDMT: 14.60, changePercent: 3.55, trend: 'up',
    timeseries: [
      { date: '15 Aug', rate: 12.80 }, { date: '22 Aug', rate: 13.20 },
      { date: '29 Aug', rate: 13.50 }, { date: '05 Sep', rate: 14.10 },
      { date: '10 Sep', rate: 14.60 },
    ], dataStatus: 'DEMO',
  },
];

const marketDataRecord = {
  indexName: 'Baltic Dry Index (BDI) & Sub-Indices',
  currentValue: 1940, changePercent: 4.3, trend: 'up',
  trendData: [
    { month: '2023-Q1', bpi: 1380, bci: 1420, bsi: 1100 },
    { month: '2023-Q2', bpi: 1510, bci: 1680, bsi: 1220 },
    { month: '2023-Q3', bpi: 1440, bci: 1550, bsi: 1180 },
    { month: '2023-Q4', bpi: 1920, bci: 2210, bsi: 1480 },
    { month: '2024-Q1', bpi: 1690, bci: 1840, bsi: 1320 },
    { month: '2024-Q2', bpi: 1810, bci: 2050, bsi: 1410 },
    { month: '2024-Q3', bpi: 1730, bci: 1910, bsi: 1360 },
    { month: '2024-Q4', bpi: 2180, bci: 2580, bsi: 1650 },
    { month: '2025-Q1', bpi: 1590, bci: 1720, bsi: 1260 },
    { month: '2025-Q2', bpi: 1780, bci: 1980, bsi: 1390 },
    { month: '2025-Q3', bpi: 1880, bci: 2140, bsi: 1460 },
    { month: '2025-Q4', bpi: 2120, bci: 2490, bsi: 1610 },
    { month: '2026-Q1', bpi: 1710, bci: 1890, bsi: 1340 },
    { month: '2026-Q2', bpi: 1890, bci: 2160, bsi: 1490 },
    { month: '2026-Q3', bpi: 2010, bci: 2320, bsi: 1580 },
  ],
  historicalRecords: [
    { date: '02 Sep 2026', route: 'Hay Point → Paradip', vesselType: 'Panamax', rateUSDMT: 24.60, voyageDays: 13 },
    { date: '28 Aug 2026', route: 'Newcastle → Vizag', vesselType: 'Panamax', rateUSDMT: 25.10, voyageDays: 14 },
    { date: '22 Aug 2026', route: 'Samarinda → Paradip', vesselType: 'Supramax', rateUSDMT: 14.30, voyageDays: 8 },
    { date: '15 Aug 2026', route: 'Baltimore → Paradip', vesselType: 'Capesize', rateUSDMT: 45.20, voyageDays: 29 },
    { date: '08 Aug 2026', route: 'Nacala → Gangavaram', vesselType: 'Panamax', rateUSDMT: 21.40, voyageDays: 12 },
    { date: '01 Aug 2026', route: 'Hay Point → Dhamra', vesselType: 'Panamax', rateUSDMT: 23.90, voyageDays: 13 },
    { date: '25 Jul 2026', route: 'Banjarmasin → Gopalpur', vesselType: 'Supramax', rateUSDMT: 13.80, voyageDays: 8 },
    { date: '18 Jul 2026', route: 'Gladstone → Haldia', vesselType: 'Handysize', rateUSDMT: 30.80, voyageDays: 14 },
  ],
  dataStatus: 'DEMO',
};

// ──────────────────────────────────────────────
// SEED FUNCTION
// ──────────────────────────────────────────────
const seed = async () => {
  try {
    console.log('🔌  Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅  Connected\n');

    // Clear existing data
    await Promise.all([
      Vessel.deleteMany({}),
      Port.deleteMany({}),
      Route.deleteMany({}),
      Alert.deleteMany({}),
      FreightData.deleteMany({}),
      MarketData.deleteMany({}),
    ]);
    console.log('🗑️   Cleared existing DEMO collections\n');

    // Insert fresh DEMO data
    await Vessel.insertMany(vessels);
    console.log(`✅  Seeded ${vessels.length} vessels`);

    await Port.insertMany(ports);
    console.log(`✅  Seeded ${ports.length} ports`);

    await Route.insertMany(routes);
    console.log(`✅  Seeded ${routes.length} routes`);

    await Alert.insertMany(alerts);
    console.log(`✅  Seeded ${alerts.length} alerts`);

    await FreightData.insertMany(freightDataRecords);
    console.log(`✅  Seeded ${freightDataRecords.length} freight data records`);

    await MarketData.create(marketDataRecord);
    console.log('✅  Seeded market data\n');

    console.log('🎉  Database seeded successfully!');
    console.log('   All records are tagged dataStatus: "DEMO"');
    console.log('   User-submitted data (charter plans, forecasts, signups) will be tagged dataStatus: "USER"\n');
    process.exit(0);
  } catch (err) {
    console.error('❌  Seeding failed:', err.message);
    process.exit(1);
  }
};

seed();
