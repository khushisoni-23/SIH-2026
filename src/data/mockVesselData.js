// Standard International Dry Bulk Carrier Specs & Compatibility Metrics
// Source: Baltic & International Maritime Council (BIMCO) & Clarksons Shipping Intelligence

export const vesselMetadata = {
  dataSource: "BIMCO Dry Bulk Chartering Standards & Clarksons Fleet Metrics",
  lastUpdated: "10 Sep 2026",
  dataStatus: "ENTERPRISE_FLEET_BENCHMARKS"
};

export const mockVessels = [
  {
    id: "handysize",
    class: "Handysize",
    capacityDWT: 35000,
    cargoCapacityRange: "25,000 - 38,000 MT",
    draftMeters: 10.2,
    loaMeters: 180,
    beamMeters: 28,
    dailyCharterRateUSD: 14200,
    estimatedFreightUSDMT: 31.50,
    fuelConsumptionMTDay: 18.5,
    speedKnots: 13.0,
    portCompatibility: "Universal Access (Includes shallow riverine ports like Haldia)",
    idleTimeRisk: "Low (0.5 - 1.0 Day)",
    suitabilityScore: 68,
    isRecommended: false,
    reasons: [
      "✓ Fits all East Coast Indian ports including Haldia & Sagar",
      "✓ Gear-fitted with onboard cranes for ports with poor shore cranes",
      "✗ Higher per-ton freight cost due to lack of scale economies",
      "✗ Sub-optimal for 100,000+ MT bulk coking coal procurement"
    ]
  },
  {
    id: "supramax",
    class: "Supramax / Ultramax",
    capacityDWT: 58000,
    cargoCapacityRange: "50,000 - 62,000 MT",
    draftMeters: 12.8,
    loaMeters: 199,
    beamMeters: 32.2,
    dailyCharterRateUSD: 18500,
    estimatedFreightUSDMT: 26.80,
    fuelConsumptionMTDay: 24.0,
    speedKnots: 13.5,
    portCompatibility: "Compatible with Paradip, Vizag, Gangavaram, Gopalpur, Dhamra",
    idleTimeRisk: "Low (1.0 - 1.5 Days)",
    suitabilityScore: 84,
    isRecommended: false,
    reasons: [
      "✓ Excellent flexibility across mid-draft Indian ports",
      "✓ Onboard gear allows fast discharging in non-mechanized berths",
      "✓ Competitive freight rate for medium shipment sizes",
      "! Slightly higher cost $/MT compared to Panamax on long voyages"
    ]
  },
  {
    id: "panamax",
    class: "Panamax / Kamsarmax",
    capacityDWT: 75000,
    cargoCapacityRange: "70,000 - 85,000 MT",
    draftMeters: 14.5,
    loaMeters: 229,
    beamMeters: 32.3,
    dailyCharterRateUSD: 21800,
    estimatedFreightUSDMT: 24.80,
    fuelConsumptionMTDay: 29.5,
    speedKnots: 14.0,
    portCompatibility: "Optimized for Paradip, Vizag, Gangavaram, Dhamra",
    idleTimeRisk: "Moderate (1.5 - 2.5 Days)",
    suitabilityScore: 92,
    isRecommended: true,
    recommendationTag: "BEST MATCH FOR COAL / STEEL IMPORTS",
    reasons: [
      "✓ Perfect cargo capacity fit (75k-85k MT) for SAIL / steel plant batches",
      "✓ Draft fully compatible with Paradip (18m), Vizag (17.5m) and Dhamra (18m)",
      "✓ Lowest overall voyage cost $/MT on Australia-East Coast India route",
      "✓ High berth availability at mechanized coal import terminals",
      "✓ Lower estimated idle time & demurrage exposure"
    ]
  },
  {
    id: "capesize",
    class: "Capesize",
    capacityDWT: 18000,
    cargoCapacityRange: "150,000 - 200,000 MT",
    draftMeters: 18.2,
    loaMeters: 292,
    beamMeters: 45.0,
    dailyCharterRateUSD: 29500,
    estimatedFreightUSDMT: 22.10,
    fuelConsumptionMTDay: 46.0,
    speedKnots: 14.5,
    portCompatibility: "Restricted to deep-draft berths (Paradip, Gangavaram, Dhamra)",
    idleTimeRisk: "High (3.5 - 5.0 Days)",
    suitabilityScore: 76,
    isRecommended: false,
    reasons: [
      "✓ Unbeatable freight economy ($22.10/MT) for massive volume parcels",
      "✗ Requires deep draft (18.2m+) - draft constrained at high tide in some berths",
      "✗ Requires lighterage or top-off for Haldia & shallow river ports",
      "✗ Higher queueing at Capesize mechanized berths causing demurrage risk"
    ]
  }
];
