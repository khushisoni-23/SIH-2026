import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Ship, Lock, Mail, ShieldCheck, ArrowRight, Eye, EyeOff,
  Sparkles, CheckCircle2, User, Briefcase, Building2, Phone,
  UserPlus
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Signup = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [form, setForm] = useState({
    fullName: '',
    organization: 'Steel Authority of India Limited (SAIL)',
    designation: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.includes('@')) e.email = 'Enter a valid email';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  const inputClass = `w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold outline-none border transition-all ${
    isLight
      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-cyan-500 placeholder-slate-400'
      : 'bg-slate-950/80 border-slate-800 text-slate-100 focus:border-cyan-500 placeholder-slate-600'
  }`;

  const labelClass = `block text-xs font-bold uppercase tracking-wider mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 lg:p-8 font-sans transition-colors duration-300 ${isLight ? 'bg-[#f4f7fb] text-slate-900' : 'bg-[#030712] text-slate-100'}`}>
      <div className={`w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl border shadow-2xl overflow-hidden ${isLight ? 'bg-white border-slate-200' : 'bg-[#09152b] border-slate-800'}`}>

        {/* Left Side: Brand Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0a1936] via-[#0d2249] to-[#061024] p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800 text-white">
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo */}
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

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300 font-semibold mb-5">
              <ShieldCheck size={14} />
              SIH 2026 Enterprise Procurement System
            </div>

            <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-3">
              Join FreightSense Enterprise
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
              Register as an authorized procurement officer for SAIL or Ministry of Steel to access full AI-powered vessel chartering and freight forecasting capabilities.
            </p>
          </div>

          {/* Feature Bullets */}
          <div className="relative z-10 space-y-3 my-6">
            {[
              { icon: CheckCircle2, color: 'text-emerald-400', text: '94.2% freight rate forecast accuracy' },
              { icon: CheckCircle2, color: 'text-cyan-400',    text: 'Real-time East Coast port draft intelligence' },
              { icon: CheckCircle2, color: 'text-blue-400',    text: 'Automated Spot vs. COA charter allocation' },
              { icon: CheckCircle2, color: 'text-amber-400',   text: 'Live AIS tracking across 142+ vessels' },
            ].map(({ icon: Icon, color, text }) => (
              <div key={text} className="flex items-center gap-2.5 text-xs text-slate-300">
                <Icon size={15} className={`${color} shrink-0`} />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400">
            <span>SAIL Logistics · Ministry of Steel</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              System Online
            </span>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className={`lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between ${isLight ? 'bg-white' : 'bg-[#09152b]'}`}>
          <div>
            <div className="mb-6">
              <h3 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Create Enterprise Account
              </h3>
              <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Register with your official SAIL or Ministry of Steel credentials.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Full Name + Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <div className="relative">
                    <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={e => update('fullName', e.target.value)}
                      placeholder="e.g. Khushi Soni"
                      style={{ paddingLeft: '2.5rem' }}
                      className={inputClass}
                    />
                    {errors.fullName && <p className="text-rose-400 text-[10px] mt-1">{errors.fullName}</p>}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Designation & Role</label>
                  <div className="relative">
                    <Briefcase className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                    <input
                      type="text"
                      value={form.designation}
                      onChange={e => update('designation', e.target.value)}
                      placeholder="e.g. Senior Logistics Manager"
                      style={{ paddingLeft: '2.5rem' }}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Organization */}
              <div>
                <label className={labelClass}>Organization / Ministry Unit</label>
                <div className="relative">
                  <Building2 className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                  <input
                    type="text"
                    value={form.organization}
                    onChange={e => update('organization', e.target.value)}
                    placeholder="Steel Authority of India Limited"
                    style={{ paddingLeft: '2.5rem' }}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Row 3: Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Official Email</label>
                  <div className="relative">
                    <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="user@sail.gov.in"
                      style={{ paddingLeft: '2.5rem' }}
                      className={inputClass}
                    />
                    {errors.email && <p className="text-rose-400 text-[10px] mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Contact Number</label>
                  <div className="relative">
                    <Phone className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      style={{ paddingLeft: '2.5rem' }}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Password + Confirm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Create Passphrase</label>
                  <div className="relative">
                    <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={form.password}
                      onChange={e => update('password', e.target.value)}
                      placeholder="Min. 8 characters"
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400 hover:text-slate-600' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    {errors.password && <p className="text-rose-400 text-[10px] mt-1">{errors.password}</p>}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Confirm Passphrase</label>
                  <div className="relative">
                    <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      required
                      value={form.confirmPassword}
                      onChange={e => update('confirmPassword', e.target.value)}
                      placeholder="Re-enter passphrase"
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400 hover:text-slate-600' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    {errors.confirmPassword && <p className="text-rose-400 text-[10px] mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 mt-2"
              >
                {isLoading ? (
                  <span>Creating Account...</span>
                ) : (
                  <>
                    <UserPlus size={14} />
                    <span>Create Enterprise Account</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className={`mt-6 pt-4 border-t text-center text-xs ${isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800 text-slate-400'}`}>
            Already have access?{' '}
            <Link to="/login" className="text-cyan-600 dark:text-cyan-400 font-semibold no-underline hover:underline">
              Sign In →
            </Link>
            <span className="mx-2">·</span>
            <Link to="/" className="text-slate-500 dark:text-slate-500 font-medium no-underline hover:underline">
              ← Back to Landing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
