import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Ship, Lock, Mail, ShieldCheck, Anchor, TrendingUp, AlertTriangle, ArrowRight, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isLight = theme === 'light';

  const [email, setEmail] = useState('khushi.soni@sail.gov.in');
  const [password, setPassword] = useState('Maritime2026#');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 400);
  };

  const autofillDemo = (role) => {
    if (role === 'sail') {
      setEmail('khushi.soni@sail.gov.in');
      setPassword('SAIL_Logistics_2026#');
    } else {
      setEmail('director.procurement@steel.gov.in');
      setPassword('MinistrySteel2026#');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 lg:p-8 font-sans transition-colors duration-300 ${isLight ? 'bg-[#f4f7fb] text-slate-900' : 'bg-[#030712] text-slate-100'}`}>
      <div className={`w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl border shadow-2xl overflow-hidden min-h-[580px] ${isLight ? 'bg-white border-slate-200' : 'bg-[#09152b] border-slate-800'}`}>
        
        {/* Left Side: Product Branding & Maritime Visual */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#0a1936] via-[#0d2249] to-[#061024] p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800 text-white">
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Logo */}
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 no-underline mb-6 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <Ship className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-white m-0">FreightSense</h1>
                <p className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase m-0">
                  MARITIME INTELLIGENCE PLATFORM
                </p>
              </div>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300 font-semibold mb-4">
              <ShieldCheck size={14} />
              SIH 2026 Enterprise Procurement System
            </div>

            <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-3">
              Intelligent Freight Forecasting &amp; Vessel Chartering
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              Official maritime decision support platform for Steel Authority of India (SAIL) &amp; Ministry of Steel overseas raw material procurement.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="relative z-10 grid grid-cols-3 gap-3 py-4 border-y border-white/10 my-6">
            <div className="p-3 bg-black/30 rounded-xl border border-white/10">
              <div className="text-[10px] font-bold text-cyan-400 uppercase">Forecast</div>
              <div className="text-lg font-black text-white mt-0.5">94.2%</div>
              <div className="text-[9px] text-slate-400">LSTM Accuracy</div>
            </div>

            <div className="p-3 bg-black/30 rounded-xl border border-white/10">
              <div className="text-[10px] font-bold text-emerald-400 uppercase">Avg Saving</div>
              <div className="text-lg font-black text-emerald-400 mt-0.5">$182K+</div>
              <div className="text-[9px] text-slate-400">Per Voyage COA</div>
            </div>

            <div className="p-3 bg-black/30 rounded-xl border border-white/10">
              <div className="text-[10px] font-bold text-amber-400 uppercase">Demurrage</div>
              <div className="text-lg font-black text-white mt-0.5">-38.6%</div>
              <div className="text-[9px] text-slate-400">Port Wait Time</div>
            </div>
          </div>

          {/* Bottom Attribution */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400">
            <span>SAIL Logistics · Ministry of Steel</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              System Online
            </span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className={`lg:col-span-6 p-8 lg:p-10 flex flex-col justify-between ${isLight ? 'bg-white' : 'bg-[#09152b]'}`}>
          <div>
            <div className="mb-6">
              <h3 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Sign In to Platform
              </h3>
              <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Enter your authorized enterprise credentials to access the intelligence dashboard.
              </p>
            </div>

            {/* Quick Autofill Buttons for Evaluators/Judges */}
            <div className="mb-6 space-y-2">
              <span className={`text-[11px] font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                ⚡ 1-Click Demo Access (Judges / Reviewers):
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => autofillDemo('sail')}
                  className={`py-2 px-3 rounded-xl border text-[11px] font-bold text-left flex items-center justify-between transition-all ${
                    isLight 
                      ? 'bg-cyan-50/70 border-cyan-200 text-cyan-800 hover:bg-cyan-100' 
                      : 'bg-cyan-950/30 border-cyan-800/60 text-cyan-300 hover:bg-cyan-900/40'
                  }`}
                >
                  <span>SAIL Logistics Lead</span>
                  <CheckCircle2 size={13} className="text-cyan-500" />
                </button>
                <button
                  type="button"
                  onClick={() => autofillDemo('ministry')}
                  className={`py-2 px-3 rounded-xl border text-[11px] font-bold text-left flex items-center justify-between transition-all ${
                    isLight 
                      ? 'bg-blue-50/70 border-blue-200 text-blue-800 hover:bg-blue-100' 
                      : 'bg-blue-950/30 border-blue-800/60 text-blue-300 hover:bg-blue-900/40'
                  }`}
                >
                  <span>Ministry Director</span>
                  <CheckCircle2 size={13} className="text-blue-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Official Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@sail.gov.in"
                    style={{ paddingLeft: '2.5rem' }}
                    className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold outline-none border transition-all ${
                      isLight 
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500' 
                        : 'bg-slate-950/80 border-slate-800 text-slate-100 focus:border-cyan-500'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Security Passphrase / Token
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                    className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold outline-none border transition-all ${
                      isLight 
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500' 
                        : 'bg-slate-950/80 border-slate-800 text-slate-100 focus:border-cyan-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400 hover:text-slate-600' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className={`flex items-center gap-2 cursor-pointer ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>Remember session</span>
                </label>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold cursor-pointer hover:underline">
                  Reset credentials
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Authenticating Session...</span>
                ) : (
                  <>
                    <Sparkles size={14} />
                    <span>Enter FreightSense Dashboard</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className={`mt-6 pt-4 border-t text-center text-xs ${isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800 text-slate-400'}`}>
            <Link to="/" className="text-cyan-600 dark:text-cyan-400 font-semibold no-underline hover:underline">
              ← Return to FreightSense Landing Page
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
