import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  TrendingUp,
  CloudLightning,
  Ship,
  Layers,
  Search,
  RefreshCw,
  Anchor,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
  DollarSign,
  Activity,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { LoadingState } from '../components/common/LoadingState';
import { alertService } from '../services/alertService';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export const RiskAlerts = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isLight = theme === 'light';

  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState({});
  const [actionSuccess, setActionSuccess] = useState(null);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await alertService.getAlerts();
      if (res && res.data) {
        setAlerts(res.data);
      }
    } catch (err) {
      console.warn("Alerts API call failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleAcknowledge = (id) => {
    setAcknowledgedAlerts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExecuteAction = (alertTitle, action) => {
    setActionSuccess(`Action initiated: "${action}" for ${alertTitle}`);
    setTimeout(() => {
      setActionSuccess(null);
    }, 4000);
  };

  // Severity color mappings
  const getSeverityStyle = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
      case 'high':
        return {
          bg: isLight ? 'bg-rose-50' : 'bg-rose-950/20',
          border: isLight ? 'border-rose-300' : 'border-rose-500/40',
          accent: 'border-l-rose-500',
          badgeBg: isLight ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          text: 'text-rose-500',
          icon: AlertTriangle,
          glow: 'hover:shadow-rose-500/10'
        };
      case 'medium':
        return {
          bg: isLight ? 'bg-amber-50/70' : 'bg-amber-950/20',
          border: isLight ? 'border-amber-300' : 'border-amber-500/40',
          accent: 'border-l-amber-500',
          badgeBg: isLight ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          text: 'text-amber-500',
          icon: CloudLightning,
          glow: 'hover:shadow-amber-500/10'
        };
      default: // Low / Info
        return {
          bg: isLight ? 'bg-cyan-50/60' : 'bg-cyan-950/20',
          border: isLight ? 'border-cyan-300' : 'border-cyan-500/40',
          accent: 'border-l-cyan-500',
          badgeBg: isLight ? 'bg-cyan-100 text-cyan-800 border-cyan-300' : 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
          text: 'text-cyan-500',
          icon: ShieldCheck,
          glow: 'hover:shadow-cyan-500/10'
        };
    }
  };

  // Category Icon helper
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Freight Volatility':
        return TrendingUp;
      case 'Port Congestion':
        return Anchor;
      case 'Weather Disruption':
        return CloudLightning;
      case 'Vessel Availability':
        return Ship;
      case 'Commodity Price':
        return DollarSign;
      default:
        return AlertCircle;
    }
  };

  // Filtered alerts
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.affectedRoutePort.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity = 
      selectedSeverity === 'All' || 
      alert.severity.toLowerCase() === selectedSeverity.toLowerCase();

    const matchesCategory = 
      selectedCategory === 'All' || 
      alert.category === selectedCategory;

    return matchesSearch && matchesSeverity && matchesCategory;
  });

  const criticalCount = alerts.filter(a => a.severity === 'High').length;
  const mediumCount = alerts.filter(a => a.severity === 'Medium').length;
  const lowCount = alerts.filter(a => a.severity === 'Low').length;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Toast Notification for Playbook Execution */}
      {actionSuccess && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl bg-emerald-600 text-white font-semibold text-xs flex items-center gap-3 border border-emerald-400 animate-fade-in">
          <CheckCircle2 size={18} className="shrink-0 text-white" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* 1. TOP SENTINEL BANNER */}
      <div 
        className="preserve-dark relative rounded-2xl overflow-hidden shadow-xl border border-white/10 p-6 lg:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5"
        style={{ background: 'linear-gradient(135deg, #09152b 0%, #0d2144 50%, #081224 100%)' }}
      >
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-400">
              REAL-TIME MARITIME RISK SENTINEL
            </span>
            <span className="text-slate-400 text-xs">• 24/7 Live Feed</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Risk &amp; Disruption Intelligence Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Automated disruption detection across international shipping corridors, tidal chokepoints, and demurrage exposure playbooks for SAIL bulk procurement.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10 shrink-0">
          <button
            onClick={fetchAlerts}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Refresh Feeds</span>
          </button>
          <DataSourceBadge source="IMD, NOAA & Baltic Exchange Sentinel" lastUpdated="10 Sep 2026, 09:15" />
        </div>
      </div>

      {/* 2. FOUR KPI SUMMARY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Critical Disruptions */}
        <div className={`p-5 rounded-2xl border transition-all hover:shadow-lg ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              High / Critical Risks
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {criticalCount} Active
            </span>
            <span className="text-[10px] font-bold text-rose-500 px-1.5 py-0.5 rounded bg-rose-500/10">
              Immediate Action
            </span>
          </div>
          <p className={`text-xs mt-1.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Rate spike &amp; Gangavaram conveyor delay
          </p>
        </div>

        {/* KPI 2: Cost Exposure at Risk */}
        <div className={`p-5 rounded-2xl border transition-all hover:shadow-lg ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Estimated Cost Exposure
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-500">
              $245,000
            </span>
            <span className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Potential
            </span>
          </div>
          <p className={`text-xs mt-1.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Demurrage &amp; spot rate escalation risk
          </p>
        </div>

        {/* KPI 3: Weather & Swell Sentinels */}
        <div className={`p-5 rounded-2xl border transition-all hover:shadow-lg ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Weather Sentinels
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <CloudLightning size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {mediumCount} Weather Alert
            </span>
          </div>
          <p className={`text-xs mt-1.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Bay of Bengal Sandheads anchorage swell
          </p>
        </div>

        {/* KPI 4: Automated Mitigation Coverage */}
        <div className={`p-5 rounded-2xl border transition-all hover:shadow-lg ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Mitigation Playbooks
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-500">
              100% Coverage
            </span>
          </div>
          <p className={`text-xs mt-1.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Automated reroute &amp; COA strategies ready
          </p>
        </div>

      </div>

      {/* 3. SEARCH & FILTER CONTROLS BAR */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
          <input
            type="text"
            placeholder="Search alerts, ports, routes, vessels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '2.5rem', paddingRight: '1rem' }}
            className={`w-full py-2 rounded-xl text-xs font-semibold outline-none border transition-all ${isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500' : 'bg-slate-950/80 border-slate-800 text-slate-100 focus:border-cyan-500'}`}
          />
        </div>

        {/* Severity Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className={`text-xs font-bold uppercase tracking-wider mr-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Severity:
          </span>
          {[
            { label: 'All', count: alerts.length },
            { label: 'High', count: criticalCount, color: 'text-rose-500' },
            { label: 'Medium', count: mediumCount, color: 'text-amber-500' },
            { label: 'Low', count: lowCount, color: 'text-cyan-500' },
          ].map((s) => (
            <button
              key={s.label}
              onClick={() => setSelectedSeverity(s.label)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                selectedSeverity === s.label
                  ? 'bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-600/20'
                  : isLight
                  ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                  : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <span>{s.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedSeverity === s.label ? 'bg-white/20 text-white' : isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-800 text-slate-300'}`}>
                {s.count}
              </span>
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`w-full md:w-auto px-3.5 py-2 rounded-xl text-xs font-semibold outline-none border cursor-pointer ${isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-slate-950/80 border-slate-800 text-slate-200'}`}
          >
            <option value="All">All Categories</option>
            <option value="Freight Volatility">Freight Volatility</option>
            <option value="Port Congestion">Port Congestion</option>
            <option value="Weather Disruption">Weather Disruption</option>
            <option value="Vessel Availability">Vessel Availability</option>
            <option value="Commodity Price">Commodity Price</option>
          </select>
        </div>

      </div>

      {/* 4. ALERTS LIST */}
      {loading ? (
        <LoadingState message="Processing Real-Time Maritime Risk Stream..." />
      ) : filteredAlerts.length === 0 ? (
        <div className={`p-12 text-center rounded-2xl border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
          <ShieldCheck size={48} className="mx-auto text-emerald-500 mb-3" />
          <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>No Active Disruption Alerts Found</h3>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>All corridors and ports are currently operating within nominal parameters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => {
            const style = getSeverityStyle(alert.severity);
            const CatIcon = getCategoryIcon(alert.category);
            const isAck = acknowledgedAlerts[alert.id];

            return (
              <div
                key={alert.id}
                className={`rounded-2xl border border-l-4 p-5 sm:p-6 transition-all duration-300 ${style.accent} ${style.glow} hover:shadow-xl ${
                  isLight 
                    ? (isAck ? 'bg-slate-50/70 border-slate-200 opacity-75' : 'bg-white border-slate-200/90') 
                    : (isAck ? 'bg-slate-950/50 border-slate-800 opacity-75' : 'bg-slate-900/90 border-slate-800')
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Alert Content (Left 8 cols) */}
                  <div className="lg:col-span-8 space-y-3">
                    
                    {/* Header Pills */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border flex items-center gap-1 ${style.badgeBg}`}>
                        <CatIcon size={12} />
                        <span>{alert.severityBadge || alert.severity}</span>
                      </span>

                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border ${isLight ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                        {alert.category}
                      </span>

                      <span className={`text-xs flex items-center gap-1 font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        <Clock size={12} />
                        {alert.timestamp} • {alert.date}
                      </span>

                      {isAck && (
                        <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1 ml-auto">
                          <Check size={12} /> Acknowledged
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {alert.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      {alert.description}
                    </p>

                    {/* Affected Route/Port */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${isLight ? 'bg-cyan-50/80 text-cyan-800 border-cyan-200' : 'bg-cyan-950/40 text-cyan-300 border-cyan-800/60'}`}>
                        <MapPin size={13} className="text-cyan-500 shrink-0" />
                        <span>Affected Corridor: <strong>{alert.affectedRoutePort}</strong></span>
                      </div>
                    </div>

                  </div>

                  {/* Mitigation Action Playbook Box (Right 4 cols) */}
                  <div className="lg:col-span-4">
                    <div className={`rounded-2xl p-4 sm:p-5 border space-y-3 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'}`}>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                          <ShieldCheck size={15} />
                          <span>Action Playbook</span>
                        </div>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                          AI Verified
                        </span>
                      </div>

                      <p className={`text-xs leading-relaxed font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        {alert.actionRecommended}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => handleExecuteAction(alert.title, alert.actionRecommended)}
                          className="flex-1 py-2 px-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95"
                        >
                          <Zap size={13} />
                          <span>Execute Action</span>
                        </button>
                        
                        <button
                          onClick={() => handleAcknowledge(alert.id)}
                          title="Acknowledge Alert"
                          className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
                            isAck
                              ? 'bg-emerald-500 text-white border-emerald-500'
                              : isLight
                              ? 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                              : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                          }`}
                        >
                          <Check size={14} />
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. EAST COAST PORT DISRUPTION MATRIX & CHOKEPOINT SENTINEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        
        {/* East Coast Port Risk Matrix (7 cols) */}
        <div className={`lg:col-span-7 rounded-2xl p-6 border ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Anchor size={18} className="text-cyan-500" />
              <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                East Coast Port Infrastructure &amp; Congestion Status
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-400">
              5 Ports Monitored
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800 text-slate-400'}`}>
                  <th className="py-2.5">Port Terminal</th>
                  <th className="py-2.5">Safe Draft</th>
                  <th className="py-2.5">Anchorage Queue</th>
                  <th className="py-2.5">Risk Level</th>
                  <th className="py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {[
                  { port: "Paradip Deep Draft (INPRT)", draft: "17.1m", queue: "6 Ships (~2.5d)", risk: "Low", status: "Nominal", color: "text-emerald-400" },
                  { port: "Gangavaram Port (INGGV)", draft: "18.5m", queue: "9 Ships (~4.8d)", risk: "High", status: "Conveyor Maint.", color: "text-rose-400" },
                  { port: "Haldia Dock Complex (INHAL)", draft: "11.5m", queue: "5 Ships (~3.2d)", risk: "Medium", status: "Lighterage Swell", color: "text-amber-400" },
                  { port: "Dhamra Port (INDHM)", draft: "18.0m", queue: "3 Ships (~1.1d)", risk: "Low", status: "Optimal Clearing", color: "text-emerald-400" },
                  { port: "Visakhapatnam (INVTZ)", draft: "16.5m", queue: "4 Ships (~1.8d)", risk: "Low", status: "Nominal", color: "text-emerald-400" }
                ].map((p, idx) => (
                  <tr key={idx} className={isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-800/50'}>
                    <td className={`py-3 font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{p.port}</td>
                    <td className={`py-3 font-mono ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{p.draft}</td>
                    <td className={`py-3 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{p.queue}</td>
                    <td className="py-3">
                      <span className={`font-bold ${p.color}`}>{p.risk}</span>
                    </td>
                    <td className={`py-3 text-right font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chokepoint & Weather Sentinel (5 cols) */}
        <div className={`lg:col-span-5 rounded-2xl p-6 border flex flex-col justify-between ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CloudLightning size={18} className="text-amber-500" />
              <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Maritime Weather &amp; Chokepoint Sentinel
              </h3>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 ${isLight ? 'bg-amber-50/60 border-amber-200' : 'bg-amber-950/20 border-amber-900/40'}`}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-500">Bay of Bengal Depression</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">72h Forecast</span>
              </div>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Significant wave height 3.8m at Sandheads anchorage. Recommend shifting Capesize discharge to Dhamra deep berths.
              </p>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 ${isLight ? 'bg-cyan-50/60 border-cyan-200' : 'bg-cyan-950/20 border-cyan-900/40'}`}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-cyan-500">Malacca Strait Vessel Traffic</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400">Normal Transit</span>
              </div>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Traffic flow steady. Average transit speed 12.4 kts with no reported navigational hazards.
              </p>
            </div>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`w-full mt-4 py-2.5 text-xs font-bold rounded-xl border transition-all ${isLight ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300' : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border-slate-800'}`}
          >
            Back to Active Alerts
          </button>
        </div>

      </div>

    </div>
  );
};
