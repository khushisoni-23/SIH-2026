// Enterprise Alerts & Risk Intelligence Stream

export const alertMetadata = {
  dataSource: "Real-time Shipping Disruption Tracker & Port Authority Advisories",
  lastUpdated: "10 Sep 2026, 09:15 IST"
};

export const mockAlerts = [
  {
    id: "alert-001",
    severity: "High", // High | Medium | Low
    severityBadge: "CRITICAL",
    category: "Freight Volatility",
    title: "Australia → India Route Rate Spike Warning",
    description: "Baltic Panamax Index (BPI) jumped +4.2% today following increased capesize/panamax iron ore demand to East Asia. Australia to Paradip rates expected to hit $27.20/MT within 21 days.",
    affectedRoutePort: "Australia → Paradip / Vizag",
    timestamp: "12 mins ago",
    date: "10 Sep 2026",
    actionRecommended: "Lock in 3-month Contract of Affreightment (COA) immediately before spot rates appreciate further.",
    isUnread: true
  },
  {
    id: "alert-002",
    severity: "High",
    severityBadge: "HIGH RISK",
    category: "Port Congestion",
    title: "Gangavaram Port Conveyor Breakdown - Waiting Delay",
    description: "Unloader conveyor belt system at Berth 3 undergoing emergency maintenance. Average vessel anchorage waiting time increased from 2.5 days to 4.8 days.",
    affectedRoutePort: "Gangavaram Port (INGGV)",
    timestamp: "45 mins ago",
    date: "10 Sep 2026",
    actionRecommended: "Reroute incoming Supramax vessel 'MV Eastern Glory' (55,000 MT Coking Coal) to Dhamra Port to avoid demurrage costs (~$28,000/day).",
    isUnread: true
  },
  {
    id: "alert-003",
    severity: "Medium",
    severityBadge: "WARNING",
    category: "Weather Disruption",
    title: "Monsoon Depression in Bay of Bengal",
    description: "IMD weather advisory predicts heavy swells (3.5m - 4.2m) near Sagar Island & Sandheads anchorage over the next 72 hours. Offshore lighterage operations temporarily suspended.",
    affectedRoutePort: "Sagar / Sandheads Anchorage (INSGR)",
    timestamp: "2 hours ago",
    date: "10 Sep 2026",
    actionRecommended: "Instruct lighterage barges to shelter in Haldia dock creek; notify charterers of potential 48h force majeure delay.",
    isUnread: false
  },
  {
    id: "alert-004",
    severity: "Medium",
    severityBadge: "MODERATE",
    category: "Vessel Availability",
    title: "Panamax Fleet Shortage in Indian Ocean Basin",
    description: "Prompt Panamax vessel tonnage availability dropped by 18% in the Singapore/Strait of Malacca area as grain charters divert tonnage to South America.",
    affectedRoutePort: "Singapore Strait / Indian Ocean Basin",
    timestamp: "4 hours ago",
    date: "10 Sep 2026",
    actionRecommended: "Advance laycan windows by 5 days or evaluate Supramax substitution for upcoming 60,000 MT parcel.",
    isUnread: false
  },
  {
    id: "alert-005",
    severity: "Low",
    severityBadge: "INFO",
    category: "Commodity Price",
    title: "Australian Coking Coal Benchmark Adjustment",
    description: "Platts Premium Hard Coking Coal FOB Australia index settled at $245.50/MT (+$3.20/MT week-on-week). Supply tightness reported at Hay Point terminal.",
    affectedRoutePort: "Hay Point Terminal, Queensland",
    timestamp: "6 hours ago",
    date: "10 Sep 2026",
    actionRecommended: "Monitor CIF Paradip delivered cost metrics to re-align Q4 procurement budget allocations.",
    isUnread: false
  }
];
