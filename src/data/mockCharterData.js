// Enterprise Charter Strategy & Contract Planning Dataset
// Optimizes Spot vs Contract of Affreightment (COA) / Medium-Term Voyage Charters

export const charterMetadata = {
  dataSource: "SAIL Bulk Procurement Strategy Guidelines & Baltic COA Benchmarks",
  lastUpdated: "10 Sep 2026",
  dataStatus: "STRATEGY_OPTIMIZER_ACTIVE"
};

export const defaultCharterPlan = {
  cargoRequirementMT: 600000,
  annualTargetMT: 1200000,
  origin: "Australia (Hay Point)",
  destination: "Paradip Port",
  contractDuration: "6 Months",
  numberOfVoyages: 8,
  preferredVessel: "Panamax (75,000 DWT)",
  recommendation: {
    contractType: "Medium-Term COA (Contract of Affreightment)",
    recommendedVoyages: 8,
    recommendedVesselClass: "Panamax",
    spotRateAvgForecastUSD: 27.20,
    contractRateAgreedUSD: 23.95,
    estimatedCostPerMTUSD: 23.95,
    totalContractCostUSD: 14370000,
    estimatedSavingVsSpotUSD: 1950000, // $1.95M savings
    savingPercentage: 11.95,
    demurrageExposureReductionPct: 65,
    marketEntryWindow: "Enter contract within next 7 days (Before 17 Sep 2026)"
  },
  voyageTimeline: [
    { voyageNo: 1, laycanStart: "01 Oct 2026", laycanEnd: "05 Oct 2026", loadingPort: "Hay Point", dischargePort: "Paradip", status: "Scheduled", cargoMT: 75000 },
    { voyageNo: 2, laycanStart: "22 Oct 2026", laycanEnd: "26 Oct 2026", loadingPort: "Hay Point", dischargePort: "Paradip", status: "Scheduled", cargoMT: 75000 },
    { voyageNo: 3, laycanStart: "12 Nov 2026", laycanEnd: "16 Nov 2026", loadingPort: "Hay Point", dischargePort: "Paradip", status: "Planned", cargoMT: 75000 },
    { voyageNo: 4, laycanStart: "03 Dec 2026", laycanEnd: "07 Dec 2026", loadingPort: "Hay Point", dischargePort: "Paradip", status: "Planned", cargoMT: 75000 },
    { voyageNo: 5, laycanStart: "24 Dec 2026", laycanEnd: "28 Dec 2026", loadingPort: "Hay Point", dischargePort: "Paradip", status: "Draft", cargoMT: 75000 },
    { voyageNo: 6, laycanStart: "15 Jan 2027", laycanEnd: "19 Jan 2027", loadingPort: "Hay Point", dischargePort: "Paradip", status: "Draft", cargoMT: 75000 },
    { voyageNo: 7, laycanStart: "05 Feb 2027", laycanEnd: "09 Feb 2027", loadingPort: "Hay Point", dischargePort: "Paradip", status: "Draft", cargoMT: 75000 },
    { voyageNo: 8, laycanStart: "26 Feb 2027", laycanEnd: "02 Mar 2027", loadingPort: "Hay Point", dischargePort: "Paradip", status: "Draft", cargoMT: 75000 }
  ]
};
