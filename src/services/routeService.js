import { mockRoutes, routeMetadata } from '../data/mockRouteData';

export const routeService = {
  getRoutes: async (search = '') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data = [...mockRoutes];
        if (search) {
          const s = search.toLowerCase();
          data = data.filter(r => 
            r.origin.toLowerCase().includes(s) || 
            r.destination.toLowerCase().includes(s) || 
            r.commodity.toLowerCase().includes(s)
          );
        }
        resolve({
          data,
          primaryRoute: mockRoutes[0],
          metadata: routeMetadata
        });
      }, 150);
    });
  }
};
