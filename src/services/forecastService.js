import { defaultForecastResult, forecastMetadata } from '../data/mockForecastData';

export const forecastService = {
  generateForecast: async (formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const qty = parseFloat(formData.cargoQuantity) || 100000;
        const origin = formData.origin || 'Australia (Hay Point)';
        const destination = formData.destination || 'Paradip';
        const commodity = formData.cargoType || 'Coking Coal';
        const duration = formData.contractDuration || '3 Months';

        // Dynamic rate estimation logic based on user input
        let baseRate = 24.80;
        if (origin.includes('USA')) baseRate = 46.50;
        else if (origin.includes('Indonesia')) baseRate = 14.60;
        else if (origin.includes('Mozambique')) baseRate = 21.80;

        if (destination.includes('Haldia')) baseRate += 5.50; // shallow lighterage premium

        const rate30 = Number((baseRate * 1.097).toFixed(2));
        const rate60 = Number((baseRate * 1.173).toFixed(2));
        const rate90 = Number((baseRate * 1.064).toFixed(2));

        const updatedResult = {
          ...defaultForecastResult,
          cargoType: commodity,
          cargoQuantity: qty,
          origin,
          destination,
          contractDuration: duration,
          currentRate: baseRate,
          predictedRate30D: rate30,
          predictedRate60D: rate60,
          predictedRate90D: rate90,
          rateChangePct30D: Number(((rate30 - baseRate) / baseRate * 100).toFixed(2)),
          chartData: [
            { period: "Current", actual: baseRate, predictedML: baseRate, baselineLinear: baseRate, upperCI: baseRate, lowerCI: baseRate },
            { period: "Week 1", actual: null, predictedML: Number((baseRate * 1.025).toFixed(2)), baselineLinear: Number((baseRate * 1.01).toFixed(2)), upperCI: Number((baseRate * 1.04).toFixed(2)), lowerCI: Number((baseRate * 1.005).toFixed(2)) },
            { period: "Week 2", actual: null, predictedML: Number((baseRate * 1.05).toFixed(2)), baselineLinear: Number((baseRate * 1.02).toFixed(2)), upperCI: Number((baseRate * 1.07).toFixed(2)), lowerCI: Number((baseRate * 1.02).toFixed(2)) },
            { period: "Month 1 (30D)", actual: null, predictedML: rate30, baselineLinear: Number((baseRate * 1.04).toFixed(2)), upperCI: Number((rate30 * 1.03).toFixed(2)), lowerCI: Number((rate30 * 0.97).toFixed(2)) },
            { period: "Month 2 (60D)", actual: null, predictedML: rate60, baselineLinear: Number((baseRate * 1.06).toFixed(2)), upperCI: Number((rate60 * 1.04).toFixed(2)), lowerCI: Number((rate60 * 0.96).toFixed(2)) },
            { period: "Month 3 (90D)", actual: null, predictedML: rate90, baselineLinear: Number((baseRate * 1.07).toFixed(2)), upperCI: Number((rate90 * 1.05).toFixed(2)), lowerCI: Number((rate90 * 0.95).toFixed(2)) }
          ]
        };

        resolve({
          data: updatedResult,
          metadata: forecastMetadata
        });
      }, 350);
    });
  }
};
