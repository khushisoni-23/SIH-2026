// Historical Freight Rate & Shipping Market Analytics Dataset (2022 - 2026)
// Sources: Baltic Exchange Indexes, Clarksons Ocean Shipping Database, Port Customs Filings

export const marketMetadata = {
  dataSource: "Baltic Exchange Daily Indices & Public Customs Import Manifests",
  coveragePeriod: "Jan 2022 - Sep 2026",
  lastUpdated: "10 Sep 2026"
};

export const historicalIndexTrends = [
  { yearMonth: "2023-Q1", BDI: 1250, BPI: 1380, BCI: 1420, BSI: 1100, AusIndiaFreight: 18.20, IdnIndiaFreight: 11.50 },
  { yearMonth: "2023-Q2", BDI: 1420, BPI: 1510, BCI: 1680, BSI: 1220, AusIndiaFreight: 19.80, IdnIndiaFreight: 12.40 },
  { yearMonth: "2023-Q3", BDI: 1350, BPI: 1440, BCI: 1550, BSI: 1180, AusIndiaFreight: 19.10, IdnIndiaFreight: 12.00 },
  { yearMonth: "2023-Q4", BDI: 1850, BPI: 1920, BCI: 2210, BSI: 1480, AusIndiaFreight: 23.50, IdnIndiaFreight: 14.80 },
  { yearMonth: "2024-Q1", BDI: 1580, BPI: 1690, BCI: 1840, BSI: 1320, AusIndiaFreight: 21.40, IdnIndiaFreight: 13.20 },
  { yearMonth: "2024-Q2", BDI: 1720, BPI: 1810, BCI: 2050, BSI: 1410, AusIndiaFreight: 22.90, IdnIndiaFreight: 13.90 },
  { yearMonth: "2024-Q3", BDI: 1640, BPI: 1730, BCI: 1910, BSI: 1360, AusIndiaFreight: 22.10, IdnIndiaFreight: 13.50 },
  { yearMonth: "2024-Q4", BDI: 2100, BPI: 2180, BCI: 2580, BSI: 1650, AusIndiaFreight: 26.80, IdnIndiaFreight: 16.20 },
  { yearMonth: "2025-Q1", BDI: 1490, BPI: 1590, BCI: 1720, BSI: 1260, AusIndiaFreight: 20.80, IdnIndiaFreight: 12.80 },
  { yearMonth: "2025-Q2", BDI: 1680, BPI: 1780, BCI: 1980, BSI: 1390, AusIndiaFreight: 22.50, IdnIndiaFreight: 13.70 },
  { yearMonth: "2025-Q3", BDI: 1790, BPI: 1880, BCI: 2140, BSI: 1460, AusIndiaFreight: 23.60, IdnIndiaFreight: 14.40 },
  { yearMonth: "2025-Q4", BDI: 2050, BPI: 2120, BCI: 2490, BSI: 1610, AusIndiaFreight: 25.90, IdnIndiaFreight: 15.80 },
  { yearMonth: "2026-Q1", BDI: 1620, BPI: 1710, BCI: 1890, BSI: 1340, AusIndiaFreight: 21.80, IdnIndiaFreight: 13.10 },
  { yearMonth: "2026-Q2", BDI: 1810, BPI: 1890, BCI: 2160, BSI: 1490, AusIndiaFreight: 23.80, IdnIndiaFreight: 14.30 },
  { yearMonth: "2026-Q3 (Current)", BDI: 1940, BPI: 2010, BCI: 2320, BSI: 1580, AusIndiaFreight: 24.80, IdnIndiaFreight: 14.60 }
];

export const historicalRecordsTable = [
  { id: "REC-2026-089", date: "02 Sep 2026", route: "Hay Point → Paradip", vesselType: "Panamax", quantityMT: 75000, freightUSD: 24.60, bdi: 1928, supplier: "BHP Billiton" },
  { id: "REC-2026-088", date: "28 Aug 2026", route: "Newcastle → Vizag", vesselType: "Panamax", quantityMT: 78000, freightUSD: 25.10, bdi: 1870, supplier: "Glencore" },
  { id: "REC-2026-087", date: "22 Aug 2026", route: "Samarinda → Paradip", vesselType: "Supramax", quantityMT: 55000, freightUSD: 14.30, bdi: 1810, supplier: "Bumi Resources" },
  { id: "REC-2026-086", date: "15 Aug 2026", route: "Baltimore → Paradip", vesselType: "Capesize", quantityMT: 150000, freightUSD: 45.20, bdi: 1750, supplier: "Alpha Metallurgical" },
  { id: "REC-2026-085", date: "08 Aug 2026", route: "Nacala → Gangavaram", vesselType: "Panamax", quantityMT: 72000, freightUSD: 21.40, bdi: 1710, supplier: "Vulcan Energy" },
  { id: "REC-2026-084", date: "01 Aug 2026", route: "Hay Point → Dhamra", vesselType: "Panamax", quantityMT: 80000, freightUSD: 23.90, bdi: 1680, supplier: "Anglo American" },
  { id: "REC-2026-083", date: "25 Jul 2026", route: "Banjarmasin → Gopalpur", vesselType: "Supramax", quantityMT: 50000, freightUSD: 13.80, bdi: 1720, supplier: "Adaro Energy" },
  { id: "REC-2026-082", date: "18 Jul 2026", route: "Gladstone → Haldia", vesselType: "Handysize", quantityMT: 32000, freightUSD: 30.80, bdi: 1740, supplier: "Peabody Energy" }
];
