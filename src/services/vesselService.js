import { mockVessels, vesselMetadata } from '../data/mockVesselData';

export const vesselService = {
  getVessels: async (params = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = mockVessels.map(v => ({ ...v }));
        
        // Dynamic re-calculation of suitability based on input cargo parameters
        if (params.cargoQuantity) {
          const qty = parseFloat(params.cargoQuantity);
          results = results.map(v => {
            let baseScore = v.suitabilityScore;
            let isRec = v.isRecommended;

            if (qty >= 70000 && qty <= 90000 && v.id === 'panamax') {
              baseScore = 96;
              isRec = true;
            } else if (qty > 100000 && v.id === 'capesize') {
              baseScore = 94;
              isRec = true;
            } else if (qty <= 40000 && v.id === 'handysize') {
              baseScore = 90;
              isRec = true;
            } else if (qty > 40000 && qty < 70000 && v.id === 'supramax') {
              baseScore = 92;
              isRec = true;
            } else if (v.id === 'panamax' && (qty < 70000 || qty > 90000)) {
              isRec = false;
            }

            return {
              ...v,
              suitabilityScore: baseScore,
              isRecommended: isRec
            };
          });
        }

        resolve({
          data: results,
          recommendedVessel: results.find(v => v.isRecommended) || results[2],
          metadata: vesselMetadata
        });
      }, 200);
    });
  }
};
