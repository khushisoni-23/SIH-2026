import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, Ship, Anchor, AlertTriangle, DollarSign, Activity,
  ArrowRight, Compass, MapPin, ExternalLink, ShieldCheck, CheckCircle2,
  Clock, Layers, Sparkles, Navigation, AlertCircle, RefreshCw, ChevronRight, Check
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceLine
} from 'recharts';

import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { freightService } from '../services/freightService';
import { portService } from '../services/portService';
import { alertService } from '../services/alertService';
import { routeService } from '../services/routeService';
import { LoadingState } from '../components/common/LoadingState';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { theme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [freightSummary, setFreightSummary] = useState(null);
  const [timeframe, setTimeframe] = useState('30D');
  const [marketIntel, setMarketIntel] = useState(null);
  const [portsList, setPortsList] = useState([]);
  const [alertsList, setAlertsList] = useState([]);
  const [primaryRoute, setPrimaryRoute] = useState(null);

  // Time series dataset with custom annotation for Panamax sweet spot
  const chartDataMap = {
    '7D': [
      { date: '04 Sep', historical: 24.2, forecast: null },
      { date: '05 Sep', historical: 24.4, forecast: null },
      { date: '06 Sep', historical: 24.1, forecast: null },
      { date: '07 Sep', historical: 24.5, forecast: null },
      { date: '08 Sep', historical: 24.7, forecast: null },
      { date: '09 Sep', historical: 24.6, forecast: null },
      { date: '10 Sep', historical: 24.8, forecast: 24.8 },
      { date: '11 Sep', historical: null, forecast: 25.1 },
      { date: '12 Sep', historical: null, forecast: 25.4 },
    ],
    '30D': [
      { date: '12 Aug', historical: 21.8, forecast: null },
      { date: '19 Aug', historical: 22.4, forecast: null },
      { date: '26 Aug', historical: 23.1, forecast: null },
      { date: '02 Sep', historical: 22.8, forecast: null },
      { date: '06 Sep', historical: 23.6, forecast: null },
      { date: '10 Sep', historical: 24.8, forecast: 24.8 },
      { date: '15 Sep', historical: null, forecast: 24.2 },
      { date: '20 Sep', historical: null, forecast: 23.8 }, // Sweet Spot for Panamax
      { date: '25 Sep', historical: null, forecast: 25.4 },
      { date: '30 Sep', historical: null, forecast: 26.6 },
      { date: '05 Oct', historical: null, forecast: 27.4 },
    ],
    '60D': [
      { date: 'Jul 15', historical: 19.5, forecast: null },
      { date: 'Aug 01', historical: 21.0, forecast: null },
      { date: 'Aug 15', historical: 22.4, forecast: null },
      { date: 'Sep 01', historical: 23.8, forecast: null },
      { date: 'Sep 10', historical: 24.8, forecast: 24.8 },
      { date: 'Sep 25', historical: null, forecast: 24.0 },
      { date: 'Oct 10', historical: null, forecast: 26.5 },
      { date: 'Oct 25', historical: null, forecast: 28.2 },
      { date: 'Nov 10', historical: null, forecast: 29.4 },
    ],
    '90D': [
      { date: 'Jun 15', historical: 18.2, forecast: null },
      { date: 'Jul 15', historical: 19.8, forecast: null },
      { date: 'Aug 15', historical: 22.4, forecast: null },
      { date: 'Sep 10', historical: 24.8, forecast: 24.8 },
      { date: 'Oct 10', historical: null, forecast: 26.2 },
      { date: 'Nov 10', historical: null, forecast: 28.8 },
      { date: 'Dec 10', historical: null, forecast: 30.5 },
    ]
  };

  const [timeSeriesData, setTimeSeriesData] = useState(chartDataMap['30D']);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      const [sumRes, intelRes, portsRes, alertsRes, routesRes] = await Promise.all([
        freightService.getCurrentSummary(),
        freightService.getMarketIntelligence(),
        portService.getAllPorts(),
        alertService.getAlerts(),
        routeService.getRoutes()
      ]);

      setFreightSummary(sumRes.data);
      setMarketIntel(intelRes.data);
      setPortsList(portsRes.data);
      setAlertsList(alertsRes.data);
      setPrimaryRoute(routesRes.primaryRoute);
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const handleTimeframeChange = (tf) => {
    setTimeframe(tf);
    setTimeSeriesData(chartDataMap[tf] || chartDataMap['30D']);
  };

  if (loading) {
    return <LoadingState message="Loading Maritime Telemetry & Intelligence..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      
      {/* ===== 1. HERO BANNER (MATCHING REFERENCE IMAGE) ===== */}
      <div className="preserve-dark relative rounded-2xl overflow-hidden shadow-xl border border-white/10" style={{ background: 'linear-gradient(135deg, #09152b 0%, #0d2144 50%, #081224 100%)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[240px]">
          
          {/* Left Text Info (7 cols) */}
          <div className="lg:col-span-7 p-6 lg:p-8 space-y-3 z-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
              <span>Welcome back, <strong className="text-white">Khushi Soni</strong> 👋</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-slate-300">SAIL Maritime Logistics</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Freight Intelligence Dashboard
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Event-based Intelligent vessel chartering and bulk cargo procurement from overseas to East Coast of India.
            </p>

            {/* Badges strip */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                SAIL STEEL PLANTS
              </span>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                COKING COAL & IRON ORE
              </span>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                EAST COAST CORRIDOR
              </span>
            </div>
          </div>

          {/* Right Ship Image (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-[260px] overflow-hidden img-zoom-container group">
            <img
              src="/images/hero-ship.jpg"
              alt="Bulk Carrier Vessel Sailing under Sunset Sky"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle gradient overlay to blend into the card */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#09152b] via-transparent to-transparent lg:block hidden pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09152b] via-transparent to-transparent lg:hidden block pointer-events-none" />
            
            {/* Floating Tag */}
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white shadow-lg">
              ⚓ Capesize 180K DWT • En Route to Paradip
            </div>
          </div>

        </div>
      </div>

      {/* ===== 2. FIVE KPI CARDS ROW (MATCHING REFERENCE IMAGE) ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* KPI 1: Current Freight Rate */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 shadow-md hover:border-cyan-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Current Freight Rate</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-white">$24.8<span className="text-xs font-medium text-slate-400"> / MT</span></div>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1 font-bold text-emerald-400">
              <TrendingUp size={13} /> +2.5%
            </span>
            <span className="text-slate-500 font-mono">Australia → Paradip</span>
          </div>
        </div>

        {/* KPI 2: 30-Day Forecast */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 shadow-md hover:border-blue-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">30-Day Forecast</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-white">$27.4<span className="text-xs font-medium text-slate-400"> / MT</span></div>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1 font-bold text-amber-400">
              <TrendingUp size={13} /> +9.7%
            </span>
            <span className="text-slate-500 font-mono">Rate Escalation</span>
          </div>
        </div>

        {/* KPI 3: Recommended Vessel */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 shadow-md hover:border-emerald-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Recommended Vessel</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Ship size={16} />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-white">Panamax</div>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Suit Level: 94%
            </span>
            <span className="text-slate-500">75k DWT</span>
          </div>
        </div>

        {/* KPI 4: Market Volatility */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 shadow-md hover:border-rose-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">MARKET VOLATILITY</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <Activity size={16} />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-rose-400">High</div>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Vessels: <strong className="text-amber-300">12.13%</strong></span>
            <span className="text-rose-400 font-bold">Tight Supply</span>
          </div>
        </div>

        {/* KPI 5: Estimated Cost Saving */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 shadow-md hover:border-teal-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Estimated Cost</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-emerald-400">$182K</div>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1 font-bold text-emerald-400">
              <TrendingUp size={13} /> +12.3%
            </span>
            <span className="text-slate-500">COA vs Spot</span>
          </div>
        </div>

      </div>

      {/* ===== 3. MIDDLE SECTION: FREIGHT RATE TREND & MARKET INTELLIGENCE ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Freight Rate Trend with Sweet Spot Tag */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-cyan-400" />
                <h3 className="text-base font-bold text-white m-0">Freight Rate Trend</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Historical Spot Rates vs. 30-Day AI Predicted Rates (Australia to Paradip)
              </p>
            </div>

            {/* Timeframe Filter Buttons */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 self-start sm:self-auto">
              {['7D', '30D', '60D', '90D'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => handleTimeframeChange(tf)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    timeframe === tf
                      ? 'bg-cyan-500 text-white shadow-sm font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Area Chart with Floating Annotation */}
          <div className="relative w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis domain={['auto', 'auto']} stroke="#64748b" fontSize={11} unit=" $" tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#091224', borderColor: '#334155', borderRadius: '10px', fontSize: '12px' }}
                  formatter={(val, name) => [`$${val} / MT`, name === 'historical' ? 'Historical Rate' : 'AI Forecast Rate']}
                />
                <Area
                  type="monotone"
                  dataKey="historical"
                  name="Historical Rate"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorHistorical)"
                />
                <Area
                  type="monotone"
                  dataKey="forecast"
                  name="Forecasted Rate"
                  stroke="#38bdf8"
                  strokeWidth={2.5}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#colorForecast)"
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Custom Interactive Floating Tag matching Reference Image: "Best Time: Secure Panamax" */}
            <div className="absolute top-12 left-1/2 -translate-x-12 px-3 py-1.5 rounded-lg bg-slate-950/95 border border-cyan-400 text-center shadow-xl shadow-cyan-950/50 pointer-events-none hidden sm:block animate-bounce-slow">
              <div className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">Optimal Window</div>
              <div className="text-xs font-black text-white">Best Time: Secure Panamax</div>
              <div className="text-[9px] text-slate-400">Rate Dip: $23.8 / MT</div>
            </div>
          </div>

          {/* Chart Footer with Data Source */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Historical Rate (Baltic Exchange) &nbsp;|&nbsp;
              <span className="w-2 h-2 rounded-full bg-sky-400 border border-dashed"></span>
              LSTM ML Ensemble Forecast
            </span>
            <button
              onClick={() => navigate('/forecast')}
              className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
            >
              <span>Detailed Forecast Workspace</span>
              <ArrowRight size={13} />
            </button>
          </div>

        </div>

        {/* Right Column (4 cols): Market Intelligence */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
          
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-cyan-400" />
                <h3 className="text-base font-bold text-white m-0">Market Intelligence</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Bullish Trend
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-3 font-medium">
              Freight rates are expected to rise over the next 30 days due to Pacific fleet tightening and seasonal steel demand.
            </p>

            {/* Status rows matching Reference Image */}
            <div className="space-y-2.5 my-4">
              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="text-slate-300 font-semibold">Demand</span>
                </div>
                <span className="font-bold text-emerald-400">High ▾</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span className="text-slate-300 font-semibold">Vessel Supply</span>
                </div>
                <span className="font-bold text-amber-400">Moderate / Tight ▾</span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="text-slate-300 font-semibold">Market Volatility</span>
                </div>
                <span className="font-bold text-rose-400">High ▾</span>
              </div>
            </div>

            {/* Light Emerald Recommendation Box matching Reference Image */}
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5">
              <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>Executive AI Recommendations</span>
              </div>
              <p className="text-[11px] text-slate-200 leading-relaxed m-0">
                • <strong>Market timing:</strong> Enter the market now for mid-term voyage contracts.<br />
                • <strong>Vessel specific:</strong> Secure <strong>Panamax</strong> for given cargo size (75,000 MT) before Q4 rate escalation.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Bunker VLSFO: <strong className="text-slate-200">$612 / MT</strong></span>
            <button
              onClick={() => navigate('/charter')}
              className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
            >
              <span>Open Charter Planning</span>
              <ArrowRight size={12} />
            </button>
          </div>

        </div>

      </div>

      {/* ===== 4. BOTTOM SECTION: ROUTE SNAPSHOT, PORT STATUS & LATEST ALERTS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Card 1: Route Snapshot (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Navigation size={17} className="text-cyan-400" />
                <h3 className="text-sm font-bold text-white m-0">Route Snapshot</h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                4,320 NM
              </span>
            </div>

            <div className="mt-3">
              <div className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>Hay Point (AU)</span>
                <ArrowRight size={13} className="text-cyan-400" />
                <span>Paradip (IN)</span>
              </div>

              {/* Visual Vessel Card with Sea Photo */}
              <div className="relative mt-3 rounded-xl overflow-hidden h-36 border border-white/10 group">
                <img
                  src="/images/capesize.jpg"
                  alt="Vessel cruising on water"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                {/* Overlay details */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-bold text-cyan-300">
                  12.8 knots / ETA: 4d 18h
                </div>

                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-bold">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                    Draft 17.4m (Safe)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/70 text-slate-200 border border-white/10">
                    Demurrage Risk: <strong className="text-cyan-400">Low</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/routes')}
            className="w-full py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-cyan-600 hover:text-white text-slate-300 border border-slate-800 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Analyze All Corridors</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Card 2: Port Status (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Anchor size={17} className="text-cyan-400" />
                <h3 className="text-sm font-bold text-white m-0">Port Status (East Coast)</h3>
              </div>
              <button
                onClick={() => navigate('/ports')}
                className="text-[11px] text-cyan-400 hover:underline font-semibold"
              >
                View All
              </button>
            </div>

            {/* Ports Table matching reference image */}
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-[11px] text-slate-300">
                <thead className="text-slate-400 uppercase text-[9px] border-b border-slate-800/80">
                  <tr>
                    <th className="py-1.5">Port Name</th>
                    <th className="py-1.5">Draft</th>
                    <th className="py-1.5 text-right">Wait / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {[
                    { name: 'Port Hedland', draft: '19.0m', wait: '1.2d', status: 'Optimal', color: 'emerald' },
                    { name: 'Hay Point', draft: '18.5m', wait: '1.5d', status: 'Optimal', color: 'emerald' },
                    { name: 'Gangavaram', draft: '18.5m', wait: '1.8d', status: 'Optimal', color: 'emerald' },
                    { name: 'Visag', draft: '18.1m', wait: '2.0d', status: 'Moderate', color: 'amber' },
                    { name: 'Paradip', draft: '17.5m', wait: '2.5d', status: 'Moderate', color: 'amber' },
                    { name: 'Haldia', draft: '8.5m', wait: '3.8d', status: 'Restricted', color: 'rose' },
                  ].map(p => (
                    <tr key={p.name} className="hover:bg-slate-800/30">
                      <td className="py-1.5 font-semibold text-slate-200">{p.name}</td>
                      <td className="py-1.5 font-mono text-cyan-300">{p.draft}</td>
                      <td className="py-1.5 text-right">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          p.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-300' :
                          p.color === 'amber' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {p.wait} ({p.status})
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
            <span>Tidal Windows: Active</span>
            <span className="text-emerald-400">● 6 Ports Live</span>
          </div>
        </div>

        {/* Card 3: Latest Alerts (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle size={17} className="text-amber-400" />
                <h3 className="text-sm font-bold text-white m-0">Latest Alerts</h3>
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                3 New Alerts
              </span>
            </div>

            {/* Alerts Feed */}
            <div className="space-y-2.5 mt-3">
              
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-rose-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    High Market Volatility
                  </span>
                  <span className="text-[9px] text-slate-500">Today, 10:45</span>
                </div>
                <p className="text-[11px] text-slate-300 m-0">
                  Pacific dry bulk rate surge (+8.4%) driven by Singapore VLSFO bunker spikes.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-cyan-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    Optimal Charter Window
                  </span>
                  <span className="text-[9px] text-slate-500">Yesterday</span>
                </div>
                <p className="text-[11px] text-slate-300 m-0">
                  Apr 28 - May 04 timing window for Hay Point → Paradip coking coal parcels.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    Freight Rate Surge
                  </span>
                  <span className="text-[9px] text-slate-500">08 Sep</span>
                </div>
                <p className="text-[11px] text-slate-300 m-0">
                  Panamax daily charter rate up +3.2% across Indian Ocean routes.
                </p>
              </div>

            </div>
          </div>

          <button
            onClick={() => navigate('/risk')}
            className="w-full py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-rose-600 hover:text-white text-slate-300 border border-slate-800 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Open Risk & Alerts Center</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>

    </div>
  );
};
