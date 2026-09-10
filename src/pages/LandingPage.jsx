import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Ship, TrendingUp, Shield, Anchor, Navigation, FileCheck2,
  BarChart3, AlertTriangle, ArrowRight, CheckCircle2,
  MapPin, ChevronRight, Zap, Award, ChevronDown,
  Sparkles, HelpCircle, Layers, Sun, Moon, BarChart2,
  Database, RefreshCw, Compass, Gauge, Clock, DollarSign,
  LogIn, UserCheck, Activity, UserPlus, Menu, X
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { language, changeLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    const onPointerDown = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const moduleLinks = [
    { label: t("nav.dashboard"), href: "/dashboard" },
    { label: t("nav.freightForecast"), href: "/forecast" },
    { label: t("nav.vesselRecommendation"), href: "/vessels" },
    { label: t("nav.portIntelligence"), href: "/ports" },
    { label: t("nav.routeAnalysis"), href: "/routes" },
    { label: t("nav.charterPlanning"), href: "/charter" },
    { label: t("nav.marketData"), href: "/market-data" },
    { label: t("nav.riskAlerts"), href: "/risk" },
    { label: t("nav.settings"), href: "/settings" },
  ];
  const primaryLinks = moduleLinks.slice(0, 5);
  const moreLinks = moduleLinks.slice(5);

  // Mini Interactive Voyage Simulator State
  const [origin, setOrigin] = useState("hedland");
  const [dest, setDest] = useState("paradip");
  const [cargoType, setCargoType] = useState("coking_coal");
  const [vesselClass, setVesselClass] = useState("capesize");

  const cardClass = isLight 
    ? "bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all" 
    : "bg-slate-900/80 border border-slate-800/80 shadow-lg hover:border-cyan-500/40 transition-all";

  const subCardClass = isLight
    ? "bg-slate-50 border border-slate-200 text-slate-800"
    : "bg-slate-950/60 border border-slate-800 text-slate-200";

  // Live Ticker Data
  const tickers = [
    { label: "BDI Index", value: "1,842", change: "+2.4%", up: true },
    { label: "C3 Tubarao → Qingdao", value: "$24.80/MT", change: "-0.5%", up: false },
    { label: "C5 W.Aus → Qingdao", value: "$9.45/MT", change: "+1.1%", up: true },
    { label: "Singapore VLSFO", value: "$612.50/MT", change: "+0.8%", up: true },
    { label: "Paradip Port Draft", value: "17.1m Safe", change: "Berth Q: 6", up: true },
    { label: "Vizag Port Dwell", value: "1.8 Days", change: "-12% YoY", up: true },
  ];

  // Route Simulation Calculation Engine
  const routeCalculations = {
    "hedland-paradip": { dist: 3820, capeRate: 11.20, panamaxRate: 13.80, days: 12.5, savings: 142000, strategy: "3M COA Lock-in" },
    "hedland-vizag": { dist: 3740, capeRate: 10.90, panamaxRate: 13.40, days: 12.1, savings: 138000, strategy: "3M COA Lock-in" },
    "hedland-haldia": { dist: 4010, capeRate: 12.80, panamaxRate: 15.20, days: 13.2, savings: 124000, strategy: "Spot Charter" },
    "hedland-dhamra": { dist: 3860, capeRate: 11.40, panamaxRate: 14.10, days: 12.7, savings: 145000, strategy: "3M COA Lock-in" },

    "tubarao-paradip": { dist: 8940, capeRate: 24.50, panamaxRate: 28.20, days: 28.5, savings: 210000, strategy: "6M COA Lock-in" },
    "tubarao-vizag": { dist: 8850, capeRate: 24.10, panamaxRate: 27.90, days: 28.0, savings: 205000, strategy: "6M COA Lock-in" },
    "tubarao-haldia": { dist: 9150, capeRate: 26.30, panamaxRate: 30.10, days: 29.5, savings: 185000, strategy: "Spot Charter" },
    "tubarao-dhamra": { dist: 8980, capeRate: 24.70, panamaxRate: 28.50, days: 28.8, savings: 215000, strategy: "6M COA Lock-in" },

    "richardsbay-paradip": { dist: 4420, capeRate: 14.80, panamaxRate: 17.20, days: 14.5, savings: 118000, strategy: "Index-Linked Spot" },
    "richardsbay-vizag": { dist: 4320, capeRate: 14.40, panamaxRate: 16.80, days: 14.1, savings: 115000, strategy: "Index-Linked Spot" },
    "richardsbay-haldia": { dist: 4620, capeRate: 16.10, panamaxRate: 18.90, days: 15.2, savings: 102000, strategy: "Spot Charter" },
    "richardsbay-dhamra": { dist: 4450, capeRate: 14.90, panamaxRate: 17.40, days: 14.7, savings: 120000, strategy: "Index-Linked Spot" },

    "vancouver-paradip": { dist: 9400, capeRate: 26.80, panamaxRate: 31.50, days: 30.2, savings: 235000, strategy: "3M COA Lock-in" },
    "vancouver-vizag": { dist: 9320, capeRate: 26.40, panamaxRate: 31.00, days: 29.8, savings: 228000, strategy: "3M COA Lock-in" },
    "vancouver-haldia": { dist: 9600, capeRate: 28.50, panamaxRate: 33.20, days: 31.0, savings: 210000, strategy: "Spot Charter" },
    "vancouver-dhamra": { dist: 9440, capeRate: 27.00, panamaxRate: 31.80, days: 30.5, savings: 240000, strategy: "3M COA Lock-in" },
  };

  const currentCalcKey = `${origin}-${dest}`;
  const currentSim = routeCalculations[currentCalcKey] || routeCalculations["hedland-paradip"];
  const estimatedRate = vesselClass === "capesize" ? currentSim.capeRate : (vesselClass === "panamax" ? currentSim.panamaxRate : currentSim.panamaxRate + 2.4);

  const fleetShowcase = [
    {
      name: "Capesize Bulker",
      dwt: "160,000 - 210,000 DWT",
      draft: "17.0m - 18.5m",
      cargo: "Coking Coal & Iron Ore Fines",
      ports: "Paradip Deep Draft, Dhamra, Gangavaram",
      image: "/images/capesize.jpg",
      status: "Optimal for Australia & Brazil Corridors"
    },
    {
      name: "Panamax / Kamsarmax",
      dwt: "75,000 - 85,000 DWT",
      draft: "13.5m - 14.5m",
      cargo: "Thermal Coal, Coking Coal, Flux",
      ports: "Paradip, Vizag, Haldia (Lightered), Ennore",
      image: "/images/panamax.jpg",
      status: "Versatile East Coast Clearance"
    },
    {
      name: "Supramax / Ultramax",
      dwt: "50,000 - 65,000 DWT",
      draft: "11.5m - 12.8m",
      cargo: "Limestone, Dolomite, Met Coke",
      ports: "Haldia Dock, Vizag Inner, Kolkata",
      image: "/images/supramax.jpg",
      status: "Geared with Cranes for Shallow Ports"
    }
  ];

  const stats = [
    { value: "14.2M+ MT", label: "Cargo Volume Analysed", sub: "Annual SAIL Corridors" },
    { value: "7 Major", label: "East Coast Ports", sub: "Paradip, Vizag, Haldia, Dhamra" },
    { value: "94.2%", label: "Forecast Accuracy", sub: "LSTM + Transformer Ensemble" },
    { value: "$182K+", label: "Avg. Savings / Voyage", sub: "Vs. Unoptimised Spot Charters" },
    { value: "38.6%", label: "Demurrage Cost Cut", sub: "Tidal Draft & Berth Optimisation" },
    { value: "24/7", label: "Live AIS Monitoring", sub: "142 Vessels in Active Tracking" }
  ];

  const flowSteps = [
    { icon: Database, color: "#06b6d4", title: t("landing.flow1"), sub: t("landing.flow1s") },
    { icon: TrendingUp, color: "#3b82f6", title: t("landing.flow2"), sub: t("landing.flow2s") },
    { icon: Anchor, color: "#10b981", title: t("landing.flow3"), sub: t("landing.flow3s") },
    { icon: Shield, color: "#8b5cf6", title: t("landing.flow4"), sub: t("landing.flow4s") },
    { icon: FileCheck2, color: "#f59e0b", title: t("landing.flow5"), sub: t("landing.flow5s") },
  ];

  const features = [
    { icon: BarChart3, color: "#06b6d4", title: t("landing.featForecast"), desc: t("landing.featForecastDesc"), link: "/forecast" },
    { icon: Ship, color: "#3b82f6", title: t("landing.featVessel"), desc: t("landing.featVesselDesc"), link: "/vessels" },
    { icon: Anchor, color: "#10b981", title: t("landing.featPort"), desc: t("landing.featPortDesc"), link: "/ports" },
    { icon: Navigation, color: "#8b5cf6", title: t("landing.featRoute"), desc: t("landing.featRouteDesc"), link: "/routes" },
    { icon: AlertTriangle, color: "#ef4444", title: t("landing.featRisk"), desc: t("landing.featRiskDesc"), link: "/risk" },
    { icon: FileCheck2, color: "#f59e0b", title: t("landing.featCharter"), desc: t("landing.featCharterDesc"), link: "/charter" },
  ];

  const faqs = [
    { q: t("landing.faq1q"), a: t("landing.faq1a") },
    { q: t("landing.faq2q"), a: t("landing.faq2a") },
    { q: t("landing.faq3q"), a: t("landing.faq3a") },
    { q: t("landing.faq4q"), a: t("landing.faq4a") },
    { q: t("landing.faq5q"), a: t("landing.faq5a") },
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isLight ? "bg-[#f4f7fb] text-slate-900" : "bg-[#030712] text-slate-100"}`}>

      {/* STICKY TOP NAVBAR */}
      <nav className={`sticky top-0 z-50 min-h-16 py-2.5 px-4 lg:px-8 flex items-center gap-3 backdrop-blur-xl border-b ${isLight ? "bg-white/95 border-slate-200/90" : "bg-[#030712]/90 border-slate-800/80"}`}>
        <Link to="/" className="flex items-center gap-2.5 no-underline group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Ship className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className={`font-black text-sm tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>FreightSense</span>
              <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded border uppercase tracking-wider ${isLight ? "bg-cyan-50 text-cyan-700 border-cyan-300" : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"}`}>
                {t("landing.enterpriseAi")}
              </span>
            </div>
            <span className={`block text-[9px] font-semibold uppercase tracking-wider ${isLight ? "text-cyan-700" : "text-cyan-400"}`}>
              {t("landing.platformSub")}
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex flex-1 items-center justify-evenly min-w-0 px-2">
          {primaryLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`no-underline text-[11px] font-semibold whitespace-nowrap px-1.5 py-1 rounded-md transition-colors ${isLight ? "text-slate-600 hover:text-cyan-700 hover:bg-cyan-50" : "text-slate-300 hover:text-cyan-300 hover:bg-white/5"}`}
            >
              {l.label}
            </Link>
          ))}
          <div className="relative" ref={moreRef}>
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className={`flex items-center gap-1 text-[11px] font-semibold whitespace-nowrap px-2 py-1 rounded-md transition-colors ${isLight ? "text-slate-600 hover:text-cyan-700 hover:bg-cyan-50" : "text-slate-300 hover:text-cyan-300 hover:bg-white/5"}`}
            >
              {t("landing.more")}
              <ChevronDown size={12} className={moreOpen ? "rotate-180" : ""} />
            </button>
            {moreOpen && (
              <div className={`absolute right-0 mt-1 w-52 rounded-xl border shadow-xl z-50 p-1 ${isLight ? "bg-white border-slate-200" : "bg-slate-900 border-slate-700"}`}>
                {moreLinks.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setMoreOpen(false)}
                    className={`block no-underline text-[11px] font-semibold px-3 py-2 rounded-lg ${isLight ? "text-slate-700 hover:bg-cyan-50 hover:text-cyan-700" : "text-slate-200 hover:bg-slate-800 hover:text-cyan-300"}`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto shrink-0">
          <div className={`flex rounded-lg overflow-hidden border text-[11px] font-bold ${isLight ? "border-slate-300" : "border-slate-700"}`} role="group" aria-label="Language">
            <button
              type="button"
              onClick={() => changeLanguage("en")}
              title="Switch to English"
              className={`px-2.5 py-1.5 transition-all ${language === "en" ? "bg-cyan-600 text-white" : isLight ? "text-slate-600 hover:bg-slate-100" : "text-slate-400 hover:bg-slate-800"}`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => changeLanguage("hi")}
              title="हिन्दी में बदलें"
              className={`px-2.5 py-1.5 transition-all ${language === "hi" ? "bg-cyan-600 text-white" : isLight ? "text-slate-600 hover:bg-slate-100" : "text-slate-400 hover:bg-slate-800"}`}
              style={{ borderLeft: isLight ? "1px solid #cbd5e1" : "1px solid rgba(255,255,255,0.12)" }}
            >
              हिन्दी
            </button>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
            className={`p-2 rounded-lg border transition-all hover:scale-105 ${isLight ? "border-slate-300 text-slate-700 hover:bg-slate-100" : "border-slate-700 text-slate-300 hover:bg-slate-800"}`}
          >
            {isLight ? <Moon size={14} /> : <Sun size={14} className="text-amber-400" />}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className={`hidden sm:flex px-3.5 py-2 text-[11px] font-bold rounded-lg border items-center gap-1.5 transition-all hover:scale-[1.02] ${isLight ? "border-slate-300 text-slate-700 hover:border-cyan-500 hover:text-cyan-700 bg-white" : "border-slate-700 text-slate-300 hover:border-cyan-500 hover:text-cyan-300 bg-transparent"}`}
          >
            <LogIn size={13} />
            <span>{t("common.login")}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="hidden sm:flex px-3.5 py-2 text-[11px] font-bold bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg shadow-lg shadow-cyan-600/25 items-center gap-1.5 transition-all hover:scale-[1.02]"
          >
            <UserPlus size={13} />
            <span>{t("common.signup")}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className={`lg:hidden p-2 rounded-lg border ${isLight ? "border-slate-300 text-slate-700" : "border-slate-700 text-slate-200"}`}
            aria-label={t("landing.menu")}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className={`lg:hidden border-b px-4 py-3 space-y-1 ${isLight ? "bg-white border-slate-200" : "bg-[#050b18] border-slate-800"}`}>
          {moduleLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={() => setMobileOpen(false)}
              className={`block no-underline text-sm font-semibold px-3 py-2.5 rounded-lg ${isLight ? "text-slate-700 hover:bg-cyan-50" : "text-slate-200 hover:bg-slate-800"}`}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={() => { setMobileOpen(false); navigate("/login"); }} className={`flex-1 py-2.5 text-xs font-bold rounded-lg border ${isLight ? "border-slate-300" : "border-slate-700"}`}>
              {t("common.login")}
            </button>
            <button type="button" onClick={() => { setMobileOpen(false); navigate("/signup"); }} className="flex-1 py-2.5 text-xs font-bold rounded-lg bg-cyan-600 text-white">
              {t("common.signup")}
            </button>
          </div>
        </div>
      )}

      {/* HERO SECTION — CLEAN CINEMATIC SHIP VISUAL (NO CLUTTERED OVERLAYS) */}
      <section className={`relative overflow-hidden ${isLight ? "bg-gradient-to-b from-white via-slate-50/50 to-[#f4f7fb]" : "bg-[#030712]"}`}>
        {!isLight && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[140px]" />
            <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[140px]" />
          </div>
        )}
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center py-14 lg:py-20">
            
            {/* Left Column */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6">
              <div className={`inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full text-xs font-bold border ${isLight ? "bg-cyan-50 text-cyan-800 border-cyan-200" : "bg-cyan-500/10 text-cyan-300 border-cyan-500/25"}`}>
                <Shield size={13} className="text-cyan-500" />
                <span>{t("landing.heroBadge")}</span>
              </div>

              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                {t("landing.heroLead")}{" "}
                <span className="bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 bg-clip-text text-transparent">
                  {t("landing.heroAccent")}
                </span>
              </h1>

              <p className={`text-sm sm:text-base leading-relaxed max-w-xl ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                {t("landing.heroDesc")}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {/* Primary CTA: Login */}
                <button 
                  onClick={() => navigate("/login")} 
                  className="px-6 py-3.5 text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-xl shadow-cyan-500/30 flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <LogIn size={16} />
                  <span>{t("landing.loginToPlatform")}</span>
                  <ArrowRight size={15} />
                </button>

                {/* Secondary CTA: Sign Up */}
                <button 
                  onClick={() => navigate("/signup")} 
                  className={`px-6 py-3.5 text-sm font-semibold rounded-xl border flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 ${
                    isLight
                      ? "bg-white text-slate-800 border-slate-300 hover:border-cyan-500 hover:text-cyan-700 shadow-sm"
                      : "bg-slate-900/90 text-slate-200 border-slate-700 hover:border-cyan-500 hover:bg-slate-800"
                  }`}
                >
                  <UserPlus size={16} className="text-cyan-400" />
                  <span>{t("landing.createAccount")}</span>
                </button>

                <a 
                  href="#simulator" 
                  className={`px-5 py-3.5 text-sm font-semibold rounded-xl border flex items-center gap-2 transition-all ${isLight ? "bg-slate-50 text-slate-700 border-slate-200 hover:border-cyan-400 shadow-sm" : "bg-slate-900/60 text-slate-300 border-slate-800 hover:border-cyan-500/60 hover:bg-slate-800"}`}
                >
                  <Compass size={16} className="text-cyan-400" />
                  <span>{t("landing.trySimulator")}</span>
                </a>
              </div>

              {/* Key Impact Metric Badges */}
              <div className={`grid grid-cols-3 gap-4 pt-6 border-t ${isLight ? "border-slate-200" : "border-slate-800"}`}>
                <div>
                  <div className={`text-xl sm:text-2xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>14.2M MT</div>
                  <div className={`text-xs font-semibold mt-0.5 ${isLight ? "text-slate-500" : "text-slate-400"}`}>{t("landing.annualCargo")}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-cyan-500">38.6% Cut</div>
                  <div className={`text-xs font-semibold mt-0.5 ${isLight ? "text-slate-500" : "text-slate-400"}`}>{t("landing.demurrageCut")}</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-emerald-500">$182K+</div>
                  <div className={`text-xs font-semibold mt-0.5 ${isLight ? "text-slate-500" : "text-slate-400"}`}>{t("landing.avgSavings")}</div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Cinematic Vessel Showcase (No Overlays) */}
            <div className="lg:col-span-6 xl:col-span-5 relative">
              <div className={`rounded-3xl overflow-hidden border shadow-2xl transition-all duration-300 hover:shadow-cyan-500/10 ${isLight ? "border-slate-200 bg-white" : "border-slate-800 bg-slate-900"}`}>
                
                {/* Cinematic Image Frame — clean, no overlapping text */}
                <div className="relative h-80 sm:h-96 lg:h-[400px] bg-slate-950 img-zoom-container group overflow-hidden">
                  <img 
                    src="/images/hero-ship.jpg" 
                    alt="Capesize bulk carrier vessel sailing under open sky" 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                  />
                  {/* Subtle bottom gradient only — no text overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Live status pill — minimal & non-obtrusive */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-emerald-400/30 text-white text-[11px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{t("landing.liveAis")}</span>
                  </div>
                </div>

                {/* Clean Supporting Telemetry Bar Below Image */}
                <div className={`p-4 grid grid-cols-3 gap-3 text-center text-xs border-t ${isLight ? "bg-slate-50 text-slate-800 border-slate-200" : "bg-slate-950 text-slate-200 border-slate-800"}`}>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">{t("landing.loadedDraft")}</div>
                    <div className="text-xs font-black text-emerald-500 mt-0.5">17.2m Safe</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">{t("landing.optimalWindow")}</div>
                    <div className="text-xs font-black text-cyan-500 mt-0.5">14 - 18 Oct</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">{t("landing.strategy")}</div>
                    <div className="text-xs font-black text-blue-500 mt-0.5">3M COA Lock</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LIVE AIS SENTINEL & BENCHMARK STREAM (MOVED DOWN BELOW HERO SECTION) */}
      <section className={`py-4 px-6 lg:px-12 border-t border-b ${isLight ? "bg-white border-slate-200" : "bg-[#050b18] border-slate-800"}`}>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className={`text-xs font-black uppercase tracking-wider ${isLight ? "text-cyan-700" : "text-cyan-400"}`}>
              {t("landing.liveStream")}
            </span>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap flex-1 justify-start md:justify-end text-xs" style={{ scrollbarWidth: "none" }}>
            {tickers.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 shrink-0">
                <span className={isLight ? "text-slate-500 font-medium" : "text-slate-400 font-medium"}>{item.label}:</span>
                <span className={`font-bold ${isLight ? "text-slate-900" : "text-white"}`}>{item.value}</span>
                {item.change && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${item.up ? (isLight ? "bg-emerald-50 text-emerald-700" : "bg-emerald-500/15 text-emerald-400") : (isLight ? "bg-rose-50 text-rose-700" : "bg-rose-500/15 text-rose-400")}`}>
                    {item.change}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className={`py-12 border-b ${isLight ? "bg-white border-slate-200" : "bg-[#030712] border-slate-800"}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center space-y-1">
                <div className={`text-2xl lg:text-3xl font-black ${i % 2 === 0 ? "text-cyan-500" : (isLight ? "text-slate-900" : "text-white")}`}>
                  {s.value}
                </div>
                <div className={`text-xs font-bold ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                  {s.label}
                </div>
                <div className={`text-[11px] ${isLight ? "text-slate-500" : "text-slate-500"}`}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE VOYAGE SIMULATOR (Hands-On Feature for Judges) */}
      <section id="simulator" className={`py-20 border-b ${isLight ? "bg-[#f8fafc] border-slate-200" : "bg-[#050b18] border-slate-800"}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${isLight ? "bg-cyan-50 text-cyan-800 border-cyan-200" : "bg-cyan-500/10 text-cyan-300 border-cyan-500/25"}`}>
              <Compass size={13} className="text-cyan-500" />
              <span>{t("landing.simulatorBadge")}</span>
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>
              {t("landing.simulatorTitle")}
            </h2>
            <p className={`text-sm ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              {t("landing.simulatorDesc")}
            </p>
          </div>

          <div className={`rounded-3xl p-6 lg:p-8 ${cardClass}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Controls Form */}
              <div className="lg:col-span-7 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                      {t("landing.originPort")}
                    </label>
                    <select 
                      value={origin} 
                      onChange={(e) => setOrigin(e.target.value)}
                      className={`w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border outline-none cursor-pointer ${subCardClass}`}
                    >
                      <option value="hedland">Port Hedland, Australia (Iron Ore / Coal)</option>
                      <option value="tubarao">Tubarao / Ponta da Madeira, Brazil (Iron Ore)</option>
                      <option value="richardsbay">Richards Bay, South Africa (Thermal / Coking)</option>
                      <option value="vancouver">Roberts Bank, Vancouver Canada (Met Coal)</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                      {t("landing.destPort")}
                    </label>
                    <select 
                      value={dest} 
                      onChange={(e) => setDest(e.target.value)}
                      className={`w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border outline-none cursor-pointer ${subCardClass}`}
                    >
                      <option value="paradip">Paradip Port (Draft 17.1m - Rourkela / Bhilai)</option>
                      <option value="vizag">Visakhapatnam Port (Draft 16.5m - RINL / SAIL)</option>
                      <option value="dhamra">Dhamra Port (Draft 18.0m - Bokaro / Durgapur)</option>
                      <option value="haldia">Haldia Dock (Draft 11.5m - Lightered Parcels)</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                      {t("landing.cargoType")}
                    </label>
                    <select 
                      value={cargoType} 
                      onChange={(e) => setCargoType(e.target.value)}
                      className={`w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border outline-none cursor-pointer ${subCardClass}`}
                    >
                      <option value="coking_coal">Premium Coking Coal (Blast Furnace)</option>
                      <option value="iron_ore">High-Grade Iron Ore Fines / Pellets</option>
                      <option value="limestone">Limestone / Metallurgical Flux</option>
                      <option value="thermal_coal">Thermal Coal (Power Plants)</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                      {t("landing.vesselClass")}
                    </label>
                    <select 
                      value={vesselClass} 
                      onChange={(e) => setVesselClass(e.target.value)}
                      className={`w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border outline-none cursor-pointer ${subCardClass}`}
                    >
                      <option value="capesize">Capesize (160,000 - 180,000 DWT)</option>
                      <option value="panamax">Panamax / Kamsarmax (75,000 - 82,000 DWT)</option>
                      <option value="supramax">Supramax (55,000 - 64,000 DWT)</option>
                    </select>
                  </div>
                </div>

                <div className={`p-4 rounded-xl flex items-center justify-between text-xs ${isLight ? "bg-blue-50 text-blue-900 border border-blue-200" : "bg-blue-950/30 text-blue-200 border border-blue-900/50"}`}>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-blue-500 shrink-0" />
                    <span>{t("landing.selectedRoute")} <strong>{currentSim.dist.toLocaleString()} Nautical Miles</strong> via standard deep-water passage.</span>
                  </div>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">~{currentSim.days} {t("landing.daysTransit")}</span>
                </div>
              </div>

              {/* Instant Output Summary Card */}
              <div className="lg:col-span-5">
                <div className={`rounded-2xl p-6 border space-y-4 ${isLight ? "bg-gradient-to-br from-cyan-50/70 to-blue-50/70 border-cyan-200" : "bg-gradient-to-br from-cyan-950/40 via-slate-900 to-blue-950/40 border-cyan-800/60"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      {t("landing.aiRec")}
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-cyan-500 text-white">
                      {t("landing.confidence")}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs text-slate-500 dark:text-slate-400">{t("landing.forecastedRate")}</div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>
                        ${estimatedRate.toFixed(2)}
                      </span>
                      <span className="text-xs font-bold text-slate-500">{t("landing.perMt")}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className={`p-3 rounded-xl border ${isLight ? "bg-white border-slate-200" : "bg-slate-900/90 border-slate-800"}`}>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">{t("landing.charterStrategy")}</div>
                      <div className="text-xs font-black text-cyan-500 mt-0.5">{currentSim.strategy}</div>
                    </div>
                    <div className={`p-3 rounded-xl border ${isLight ? "bg-white border-slate-200" : "bg-slate-900/90 border-slate-800"}`}>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">{t("landing.estSavings")}</div>
                      <div className="text-xs font-black text-emerald-500 mt-0.5">+${currentSim.savings.toLocaleString()}</div>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate("/login")}
                    className="w-full py-3 text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <span>{t("landing.openCharter")}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CORE INTELLIGENCE MODULES (6 Features) */}
      <section id="features" className={`py-20 border-b ${isLight ? "bg-white border-slate-200" : "bg-[#030712] border-slate-800"}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${isLight ? "bg-cyan-50 text-cyan-800 border-cyan-200" : "bg-cyan-500/10 text-cyan-300 border-cyan-500/25"}`}>
              <Award size={13} className="text-cyan-500" />
              <span>{t("landing.suiteBadge")}</span>
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>
              {t("landing.suiteTitle")}
            </h2>
            <p className={`text-sm ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              {t("landing.suiteDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div 
                  key={f.title} 
                  className={`rounded-2xl p-6 group cursor-pointer flex flex-col justify-between hover:-translate-y-1 hover:scale-[1.015] ${cardClass}`}
                  onClick={() => navigate(f.link)}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: `${f.color}15`, border: `1.5px solid ${f.color}35` }}>
                      <Icon size={24} style={{ color: f.color }} />
                    </div>
                    <h3 className={`text-base font-bold mb-2 group-hover:text-cyan-500 transition-colors ${isLight ? "text-slate-900" : "text-white"}`}>
                      {f.title}
                    </h3>
                    <p className={`text-xs leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                      {f.desc}
                    </p>
                  </div>

                  <div className={`mt-5 pt-4 border-t flex items-center justify-between ${isLight ? "border-slate-100" : "border-slate-800"}`}>
                    <span className={`text-[11px] font-bold ${isLight ? "text-cyan-700" : "text-cyan-400"}`}>
                      {t("landing.exploreModule")}
                    </span>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center group-hover:translate-x-1 transition-transform" style={{ background: `${f.color}15` }}>
                      <ArrowRight size={13} style={{ color: f.color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FLEET SECTION WITH INTERACTIVE HOVER EFFECTS & DETAILS */}
      <section id="fleet" className={`py-20 border-b ${isLight ? "bg-[#f4f7fb] border-slate-200" : "bg-[#050b18] border-slate-800"}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${isLight ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-emerald-500/10 text-emerald-300 border-emerald-500/25"}`}>
              <Ship size={13} className="text-emerald-500" />
              <span>{t("landing.fleetBadge")}</span>
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>
              {t("landing.fleetTitle")}
            </h2>
            <p className={`text-sm ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              {t("landing.fleetDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fleetShowcase.map((v) => (
              <div 
                key={v.name} 
                className={`rounded-3xl overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-cyan-500/50 ${cardClass}`}
                onClick={() => navigate('/vessels')}
              >
                {/* Cinematic Image with Smooth Zoom */}
                <div className="relative h-56 bg-slate-950 img-zoom-container overflow-hidden">
                  <img 
                    src={v.image} 
                    alt={v.name} 
                    className="w-full h-full object-cover brightness-95 group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                  
                  {/* Clean Non-Obtrusive Tag */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md text-xs font-extrabold text-cyan-400 border border-cyan-400/30 shadow-md">
                    {v.dwt}
                  </div>
                  
                  <div className="absolute bottom-3 left-4 text-white font-black text-lg">
                    {v.name}
                  </div>
                </div>

                {/* Specs and Compatibility Details */}
                <div className="p-6 space-y-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-semibold">Loaded Draft Req:</span>
                    <span className={`font-bold ${isLight ? "text-slate-900" : "text-white"}`}>{v.draft}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-semibold">Primary Cargo:</span>
                    <span className={`font-bold text-right ${isLight ? "text-slate-900" : "text-white"}`}>{v.cargo}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-semibold">Cleared Indian Ports:</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400 text-right">{v.ports}</span>
                  </div>

                  <div className={`mt-4 pt-3 border-t text-xs font-bold flex items-center justify-between ${isLight ? "border-slate-200 text-emerald-700" : "border-slate-800 text-emerald-400"}`}>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="shrink-0" />
                      <span>{v.status}</span>
                    </div>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS / ARCHITECTURE PIPELINE */}
      <section id="flow" className={`py-20 border-b ${isLight ? "bg-white border-slate-200" : "bg-[#030712] border-slate-800"}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${isLight ? "bg-blue-50 text-blue-800 border-blue-200" : "bg-blue-500/10 text-blue-300 border-blue-500/25"}`}>
              <Layers size={13} className="text-blue-500" />
              <span>{t("landing.architecture")}</span>
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>
              {t("landing.flowHeading")}
            </h2>
            <p className={`text-sm ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              {t("landing.flowDesc")}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-0">
            {flowSteps.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === flowSteps.length - 1;
              return (
                <React.Fragment key={step.title}>
                  <div className={`flex-1 rounded-2xl p-6 flex flex-col gap-3 text-center items-center ${cardClass}`}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto" style={{ background: `${step.color}15`, border: `2px solid ${step.color}35` }}>
                      <Icon size={22} style={{ color: step.color }} />
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${isLight ? "text-slate-900" : "text-white"}`}>{step.title}</div>
                      <div className={`text-xs mt-1.5 leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>{step.sub}</div>
                    </div>
                    <div className="w-7 h-7 rounded-full text-white text-xs font-black flex items-center justify-center mt-auto" style={{ background: step.color }}>
                      {idx + 1}
                    </div>
                  </div>
                  {!isLast && (
                    <div className="flex items-center justify-center px-1 py-3 lg:py-0 shrink-0">
                      <ChevronRight size={22} className={`rotate-90 lg:rotate-0 ${isLight ? "text-slate-300" : "text-slate-700"}`} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Banner Call-To-Action */}
          <div className="mt-14 rounded-3xl p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 shadow-xl text-white">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {t("landing.ctaTitle")}
              </h3>
              <p className="text-sm text-cyan-100 max-w-xl">
                {t("landing.ctaDesc")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => navigate("/login")} 
                className="px-6 py-3.5 text-sm font-bold bg-white text-cyan-800 hover:bg-cyan-50 rounded-xl shadow-lg transition-all flex items-center gap-2 whitespace-nowrap hover:scale-105 active:scale-95"
              >
                <LogIn size={16} />
                <span>{t("common.login")}</span>
                <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => navigate("/signup")} 
                className="px-6 py-3.5 text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/60 rounded-xl shadow-lg transition-all flex items-center gap-2 whitespace-nowrap hover:scale-105 active:scale-95"
              >
                <UserPlus size={16} />
                <span>{t("common.signup")}</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className={`py-20 border-b ${isLight ? "bg-[#f4f7fb] border-slate-200" : "bg-[#030712] border-slate-800"}`}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-12 space-y-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${isLight ? "bg-amber-50 text-amber-800 border-amber-200" : "bg-amber-500/10 text-amber-300 border-amber-500/25"}`}>
              <HelpCircle size={13} className="text-amber-500" />
              <span>{t("landing.faqBadge")}</span>
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black ${isLight ? "text-slate-900" : "text-white"}`}>
              {t("landing.faqHeading")}
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`rounded-2xl border overflow-hidden transition-all ${openFaq === i ? (isLight ? "border-cyan-400 shadow-md" : "border-cyan-500/60") : (isLight ? "border-slate-200" : "border-slate-800")} ${cardClass}`}
              >
                <button 
                  className="w-full flex items-center justify-between gap-4 p-5 text-left" 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className={`text-sm font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
                    {faq.q}
                  </span>
                  <ChevronDown size={18} className={`shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180 text-cyan-500" : isLight ? "text-slate-400" : "text-slate-500"}`} />
                </button>
                {openFaq === i && (
                  <div className={`px-5 pb-5 text-xs sm:text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-12 ${isLight ? "bg-white text-slate-700" : "bg-[#030712] text-slate-300"}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <Ship className="w-5 h-5 text-white" />
                </div>
                <span className={`font-black text-base ${isLight ? "text-slate-900" : "text-white"}`}>
                  FreightSense
                </span>
              </div>
              <p className={`text-xs leading-relaxed max-w-sm ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                Enterprise maritime intelligence for overseas bulk cargo procurement and optimized vessel chartering. Built for SAIL and Ministry of Steel requirements.
              </p>
              <div className="text-[11px] font-semibold text-slate-400">
                SIH 2026 Innovation Platform · <span className="text-emerald-500 font-bold">System Online &amp; Synchronized</span>
              </div>
            </div>

            <div>
              <h4 className={`text-xs font-black uppercase tracking-wider mb-3 ${isLight ? "text-slate-900" : "text-white"}`}>
                {t("landing.platformEngines")}
              </h4>
              <ul className="space-y-2">
                {[
                  { label: t("nav.freightForecast"), href: "/forecast" },
                  { label: t("nav.vesselRecommendation"), href: "/vessels" },
                  { label: t("nav.portIntelligence"), href: "/ports" },
                  { label: t("nav.routeAnalysis"), href: "/routes" },
                  { label: t("nav.riskAlerts"), href: "/risk" },
                  { label: t("nav.charterPlanning"), href: "/charter" }
                ].map(l => (
                  <li key={l.href}>
                    <Link to={l.href} className={`text-xs no-underline transition-colors ${isLight ? "text-slate-600 hover:text-cyan-600" : "text-slate-400 hover:text-cyan-400"}`}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`text-xs font-black uppercase tracking-wider mb-3 ${isLight ? "text-slate-900" : "text-white"}`}>
                {t("landing.stakeholders")}
              </h4>
              <ul className="space-y-2">
                {[
                  "Steel Authority of India (SAIL)",
                  "Ministry of Steel, Govt of India",
                  "Paradip & Vizag Port Trusts",
                  "Baltic Exchange (BDI/Platts)",
                  "NOAA & IMD Maritime Feeds"
                ].map(s => (
                  <li key={s} className={`text-xs flex items-center gap-2 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                    <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] ${isLight ? "border-slate-200 text-slate-500" : "border-slate-800 text-slate-500"}`}>
            <span>{t("landing.footerNote")}</span>
            <button 
              onClick={toggleTheme} 
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-[11px] font-semibold transition-colors ${isLight ? "border-slate-300 text-slate-700 hover:bg-slate-100" : "border-slate-700 text-slate-300 hover:bg-slate-800"}`}
            >
              {isLight ? <Moon size={12} /> : <Sun size={12} className="text-amber-400" />}
              <span>{isLight ? "Dark Mode" : "Light Mode"}</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
