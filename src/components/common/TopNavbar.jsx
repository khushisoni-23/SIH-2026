import React, { useState } from 'react';
import { Menu, Search, Bell, Sun, Moon, Globe, ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { NotificationDrawer } from './NotificationDrawer';

export const TopNavbar = ({ onOpenMobile }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fullName = user?.fullName || 'Khushi Soni';
  const designation = user?.designation || 'Logistics Manager';
  const organization = user?.organization || 'SAIL Logistics Division';
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'KS';

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <>
      <header
        className="h-14 sticky top-0 z-30 px-4 lg:px-5 flex items-center justify-between gap-3 transition-colors"
        style={{
          background: 'var(--color-bg-navbar)',
          borderBottom: '1px solid var(--color-border)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Left: Mobile menu + Search bar */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <button
            onClick={onOpenMobile}
            className="lg:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            style={{ color: 'var(--color-text-secondary)' }}
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>

          {/* Search bar with explicit non-overlapping padding */}
          <div className="relative w-full max-w-sm hidden sm:block">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: 'var(--color-text-muted)' }}
            />
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.5rem', paddingRight: '1rem' }}
              className="w-full py-1.5 rounded-lg text-xs font-medium outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Last Updated Timestamp */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
            <span>{t('common.lastUpdated')}</span>
            <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{dateStr}, {timeStr}</span>
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => { setIsLangOpen(!isLangOpen); setIsProfileOpen(false); }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:bg-black/5 dark:hover:bg-white/10 border border-slate-200 dark:border-slate-800"
              style={{ color: 'var(--color-text-secondary)' }}
              title="Switch Language"
            >
              <Globe size={14} className="text-cyan-500" />
              <span>{language === 'en' ? 'EN' : 'हि'}</span>
              <ChevronDown size={12} />
            </button>

            {isLangOpen && (
              <div
                className="absolute right-0 mt-1 w-36 rounded-lg shadow-xl z-50 p-1 animate-fade-in"
                style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}
              >
                <button
                  onClick={() => { changeLanguage('en'); setIsLangOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-md transition-colors flex items-center justify-between ${
                    language === 'en' ? 'font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                  style={{ color: language === 'en' ? undefined : 'var(--color-text-secondary)' }}
                >
                  <span>🇬🇧 English</span>
                  {language === 'en' && <span className="text-[10px]">✓</span>}
                </button>
                <button
                  onClick={() => { changeLanguage('hi'); setIsLangOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-md transition-colors flex items-center justify-between ${
                    language === 'hi' ? 'font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                  style={{ color: language === 'hi' ? undefined : 'var(--color-text-secondary)' }}
                >
                  <span>🇮🇳 हिन्दी</span>
                  {language === 'hi' && <span className="text-[10px]">✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle (Sun/Moon) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-all hover:bg-black/5 dark:hover:bg-white/10 border border-slate-200 dark:border-slate-800"
            style={{ color: 'var(--color-text-secondary)' }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun size={16} className="text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon size={16} className="text-cyan-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/10 border border-slate-200 dark:border-slate-800"
            style={{ color: 'var(--color-text-secondary)' }}
            title="Alerts"
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
              4
            </span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => { setIsProfileOpen(!isProfileOpen); setIsLangOpen(false); }}
              className="flex items-center gap-2 px-2 py-1 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md shrink-0">
                {initials}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>{fullName}</div>
                <div className="text-[10px] font-medium" style={{ color: 'var(--color-text-tertiary)' }}>{designation}</div>
              </div>
              <ChevronDown size={13} style={{ color: 'var(--color-text-muted)' }} className="hidden sm:block" />
            </button>

            {isProfileOpen && (
              <div
                className="absolute right-0 mt-1 w-52 rounded-lg shadow-xl z-50 p-1.5 animate-fade-in"
                style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}
              >
                <div className="px-3 py-2 mb-1" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <div className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>{fullName}</div>
                  <div className="text-[10px] font-medium" style={{ color: 'var(--color-text-tertiary)' }}>{organization}</div>
                </div>
                <button
                  onClick={() => { navigate('/settings'); setIsProfileOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs rounded-md flex items-center gap-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <Settings size={14} className="text-cyan-500" />
                  <span>{t('nav.settings')}</span>
                </button>
                <button
                  onClick={() => { logout(); navigate('/login'); setIsProfileOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs rounded-md flex items-center gap-2 transition-colors text-rose-500 hover:bg-rose-500/10"
                >
                  <LogOut size={14} />
                  <span>{t('nav.logout')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
};
