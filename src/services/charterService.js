import { defaultCharterPlan, charterMetadata } from '../data/mockCharterData';

export const charterService = {
  getCharterPlan: async (inputParams = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const qty = parseFloat(inputParams.cargoRequirementMT) || 600000;
        const voyages = parseInt(inputParams.numberOfVoyages) || Math.ceil(qty / 75000);
        const vessel = inputParams.preferredVessel || "Panamax (75,000 DWT)";
        const duration = inputParams.contractDuration || "6 Months";

        const spotRateAvg = 27.20;
        const coaRate = 23.95;
        const spotTotal = qty * spotRateAvg;
        const coaTotal = qty * coaRate;
        const savings = spotTotal - coaTotal;

        const updatedPlan = {
          ...defaultCharterPlan,
          cargoRequirementMT: qty,
          numberOfVoyages: voyages,
          preferredVessel: vessel,
          contractDuration: duration,
          recommendation: {
            ...defaultCharterPlan.recommendation,
            recommendedVoyages: voyages,
            recommendedVesselClass: vessel.split(" ")[0],
            spotRateAvgForecastUSD: spotRateAvg,
            contractRateAgreedUSD: coaRate,
            totalContractCostUSD: coaTotal,
            estimatedSavingVsSpotUSD: savings,
            savingPercentage: Number(((savings / spotTotal) * 100).toFixed(2))
          }
        };

        resolve({
          data: updatedPlan,
          metadata: charterMetadata
        });
      }, 250);
    });
  }
};
