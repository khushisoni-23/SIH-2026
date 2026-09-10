import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, TrendingUp, Ship, Anchor, Navigation,
  AlertTriangle, FileCheck2, BarChart3, Settings, LogOut,
  ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Sidebar = ({ isCollapsed, toggleSidebar, isMobileOpen, closeMobile }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navItems = [
    { name: t('nav.dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.freightForecast'), path: '/forecast', icon: TrendingUp },
    { name: t('nav.vesselRecommendation'), path: '/vessels', icon: Ship },
    { name: t('nav.portIntelligence'), path: '/ports', icon: Anchor },
    { name: t('nav.routeAnalysis'), path: '/routes', icon: Navigation },
    { name: t('nav.charterPlanning'), path: '/charter', icon: FileCheck2 },
    { name: t('nav.marketData'), path: '/market-data', icon: BarChart3 },
    { name: t('nav.riskAlerts'), path: '/risk', icon: AlertTriangle, badge: '4' },
  ];

  const handleLogout = () => {
    closeMobile();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{ background: 'linear-gradient(180deg, rgba(13, 23, 38, 0.98) 0%, rgba(9, 18, 29, 0.98) 100%)' }}
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col transition-all duration-300 border-r shadow-2xl shadow-slate-950/30 ${
          isCollapsed ? 'w-[72px]' : 'w-60'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b sidebar-border" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.18), rgba(15, 23, 42, 0))' }}>
          <NavLink to="/" className="flex items-center gap-2.5 overflow-hidden" onClick={closeMobile}>
            <div className="w-9 h-9 rounded-xl border border-cyan-300/40 bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 ring-1 ring-white/10 shrink-0">
              <Ship className="w-5 h-5 drop-shadow-[0_1px_1px_rgba(15,23,42,0.6)]" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm text-white tracking-wide leading-tight">FreightSense</span>
                <span className="text-[9px] text-cyan-400/80 font-medium tracking-widest uppercase truncate">
                  Smarter Chartering
                </span>
              </div>
            )}
          </NavLink>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title={isCollapsed ? "Expand" : "Collapse"}
            >
              {isCollapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
            </button>
            <button
              onClick={closeMobile}
              className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/15 text-white shadow-md shadow-blue-900/30 border border-cyan-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/8'
                  }`
                }
              >
                <Icon size={17} className="shrink-0" />
                {!isCollapsed && (
                  <span className="truncate flex-1">{item.name}</span>
                )}
                {item.badge && (
                  <span className={`text-[9px] font-bold rounded-full bg-rose-500 text-white min-w-[18px] h-[18px] flex items-center justify-center ${
                    isCollapsed ? 'absolute -top-0.5 -right-0.5' : ''
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-slate-900 text-white text-xs rounded-md shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none z-[60] whitespace-nowrap border border-slate-700">
                    {item.name}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-2.5 border-t space-y-0.5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <NavLink
            to="/settings"
            onClick={closeMobile}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/15 text-white shadow-md border border-cyan-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/8'
              }`
            }
          >
            <Settings size={17} className="shrink-0" />
            {!isCollapsed && <span>{t('nav.settings')}</span>}
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-rose-400 hover:bg-rose-500/10 transition-all duration-200"
          >
            <LogOut size={17} className="shrink-0" />
            {!isCollapsed && <span>{t('nav.logout')}</span>}
          </button>
        </div>

        {/* Bottom Watermark */}
        {!isCollapsed && (
          <div className="px-4 py-3 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <p className="text-[10px] text-slate-500 leading-relaxed italic">
              Better Insights.<br />
              Smarter Chartering.<br />
              A Stronger Tomorrow.
            </p>
          </div>
        )}
      </aside>
    </>
  );
};
