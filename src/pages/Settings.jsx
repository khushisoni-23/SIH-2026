import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Sliders,
  Database,
  CheckCircle2,
  Save
} from 'lucide-react';
import { DataSourceBadge } from '../components/common/DataSourceBadge';
import { useLanguage } from '../context/LanguageContext';

export const Settings = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [profile, setProfile] = useState({
    name: 'S. L. Manager',
    title: 'Senior Manager (Bulk Procurement & Logistics)',
    organization: 'Steel Authority of India Limited (SAIL)',
    email: 'p.sharma@sail.gov.in',
    phone: '+91 98765 43210'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    rateSpikeThresholdPct: 5.0,
    portDelayThresholdDays: 3.0,
    weatherAlerts: true
  });

  const [dashboard, setDashboard] = useState({
    defaultRoute: 'Australia → Paradip',
    defaultCurrency: 'USD ($)',
    refreshFrequency: '15 Minutes (Simulated Live Feed)',
    autoRefresh: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const labelStyle = {
    color: 'var(--color-text-primary)',
    letterSpacing: '0.04em'
  };

  const hintStyle = { color: 'var(--color-text-secondary)' };
  const mutedStyle = { color: 'var(--color-text-muted)' };

  const inputStyle = {
    background: 'var(--color-bg-input)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text-primary)'
  };

  const surfaceStyle = {
    background: 'var(--color-bg-elevated)',
    border: '1px solid var(--color-border)'
  };

  return (
    <div className="space-y-6">
      <div
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-xl"
        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
      >
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2 m-0" style={{ color: 'var(--color-text-primary)' }}>
            <SettingsIcon className="text-cyan-500" size={20} />
            {t('settings.title')}
          </h2>
          <p className="text-xs m-0 mt-1" style={hintStyle}>
            {t('settings.subtitle')}
          </p>
        </div>
        <DataSourceBadge source="SAIL Enterprise Config" lastUpdated="10 Sep 2026" />
      </div>

      <div
        className="rounded-xl p-2 flex items-center gap-1 overflow-x-auto text-xs"
        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
      >
        {[
          { id: 'profile', label: t('settings.profileRole'), icon: User },
          { id: 'notifications', label: t('settings.notificationAlerts'), icon: Bell },
          { id: 'dashboard', label: t('settings.dashboardCurrency'), icon: Sliders },
          { id: 'datasource', label: t('settings.dataEndpoints'), icon: Database }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all whitespace-nowrap"
              style={
                active
                  ? { background: 'rgba(6, 182, 212, 0.14)', color: 'var(--color-accent-primary)', border: '1px solid rgba(6, 182, 212, 0.35)' }
                  : { color: 'var(--color-text-secondary)', border: '1px solid transparent' }
              }
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl text-xs font-semibold flex items-center gap-2" style={{ background: 'var(--color-badge-green-bg)', color: 'var(--color-badge-green-text)', border: '1px solid var(--color-badge-green-border)' }}>
          <CheckCircle2 size={16} />
          <span>{t('settings.savedSuccess')}</span>
        </div>
      )}

      <form
        onSubmit={handleSave}
        className="rounded-xl p-6 space-y-6"
        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}
      >
        {activeTab === 'profile' && (
          <div className="space-y-5">
            <div className="flex items-center gap-5 p-4 rounded-xl" style={surfaceStyle}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-cyan-500/20 shrink-0">
                {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base font-black" style={{ color: 'var(--color-text-primary)' }}>{profile.name || 'Unnamed User'}</div>
                <div className="text-xs font-semibold mt-0.5 truncate text-cyan-600 dark:text-cyan-400">{profile.title || 'No designation set'}</div>
                <div className="text-xs mt-0.5 truncate" style={hintStyle}>{profile.organization}</div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 justify-end" style={{ color: 'var(--color-positive)' }}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  {t('settings.activeAccount')}
                </div>
                <div className="text-[10px] mt-1" style={mutedStyle}>{t('settings.enterpriseAccess')}</div>
              </div>
            </div>

            <h3 className="text-sm font-bold uppercase tracking-wider pb-2.5" style={{ color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border)' }}>
              {t('settings.officerProfile')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { key: 'name', label: t('settings.name'), type: 'text' },
                { key: 'title', label: t('settings.designationRole'), type: 'text' },
                { key: 'organization', label: t('settings.organizationUnit'), type: 'text' },
                { key: 'email', label: t('settings.officialEmail'), type: 'email' },
                { key: 'phone', label: t('settings.mobileContact'), type: 'text' }
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-bold uppercase mb-1.5" style={labelStyle}>{field.label}</label>
                  <input
                    type={field.type}
                    value={profile[field.key]}
                    onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold focus:outline-none transition-colors"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--color-accent-primary)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--color-border)'; }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider pb-2" style={{ color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border)' }}>
              {t('settings.alertTriggers')}
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between gap-4 p-4 rounded-lg text-xs" style={surfaceStyle}>
                <div>
                  <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{t('settings.rateSpike')}</div>
                  <div className="text-[11px] mt-0.5" style={hintStyle}>{t('settings.rateSpikeHint')}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="number"
                    value={notifications.rateSpikeThresholdPct}
                    onChange={(e) => setNotifications({ ...notifications, rateSpikeThresholdPct: parseFloat(e.target.value) })}
                    className="w-16 py-1.5 px-2 rounded text-center font-mono text-xs"
                    style={inputStyle}
                    step="0.5"
                  />
                  <span className="font-bold" style={hintStyle}>%</span>
                </div>
              </label>

              <label className="flex items-center justify-between gap-4 p-4 rounded-lg text-xs" style={surfaceStyle}>
                <div>
                  <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{t('settings.portCongestion')}</div>
                  <div className="text-[11px] mt-0.5" style={hintStyle}>{t('settings.portCongestionHint')}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="number"
                    value={notifications.portDelayThresholdDays}
                    onChange={(e) => setNotifications({ ...notifications, portDelayThresholdDays: parseFloat(e.target.value) })}
                    className="w-16 py-1.5 px-2 rounded text-center font-mono text-xs"
                    style={inputStyle}
                    step="0.5"
                  />
                  <span className="font-bold" style={hintStyle}>Days</span>
                </div>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider pb-2" style={{ color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border)' }}>
              {t('settings.dashboardDefaults')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={labelStyle}>{t('settings.primaryRoute')}</label>
                <select
                  value={dashboard.defaultRoute}
                  onChange={(e) => setDashboard({ ...dashboard, defaultRoute: e.target.value })}
                  className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold focus:outline-none"
                  style={inputStyle}
                >
                  <option>Australia → Paradip</option>
                  <option>Australia → Vizag</option>
                  <option>Indonesia → Paradip</option>
                  <option>USA → Paradip</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={labelStyle}>{t('settings.currencyUnit')}</label>
                <select
                  value={dashboard.defaultCurrency}
                  onChange={(e) => setDashboard({ ...dashboard, defaultCurrency: e.target.value })}
                  className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold focus:outline-none"
                  style={inputStyle}
                >
                  <option>USD ($)</option>
                  <option>INR (₹)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'datasource' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider pb-2" style={{ color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border)' }}>
              {t('settings.apiStatus')}
            </h3>

            <div className="space-y-2 text-xs">
              {[
                { name: 'Baltic Exchange Dry Index Feed', endpoint: 'https://api.balticexchange.com/v1/dry-index', status: 'CONNECTED (MOCK API)' },
                { name: 'Indian Port Association (IPA) API', endpoint: 'https://ipa.gov.in/api/v2/port-telemetry', status: 'CONNECTED (MOCK API)' },
                { name: 'SIH 2026 ML Forecasting API', endpoint: 'http://localhost:8000/api/v1/forecast', status: 'FRONTEND READY FOR FASTAPI' }
              ].map((api) => (
                <div key={api.name} className="p-3 rounded-lg flex items-center justify-between gap-3 card-hover" style={surfaceStyle}>
                  <div className="min-w-0">
                    <div className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{api.name}</div>
                    <div className="text-[11px] truncate" style={hintStyle}>Endpoint: {api.endpoint}</div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded shrink-0" style={{ background: 'var(--color-badge-green-bg)', color: 'var(--color-badge-green-text)', border: '1px solid var(--color-badge-green-border)' }}>
                    {api.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 flex justify-end" style={{ borderTop: '1px solid var(--color-border)' }}>
          <button
            type="submit"
            className="py-2.5 px-6 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs rounded-lg shadow-md flex items-center gap-1.5 transition-all"
          >
            <Save size={14} />
            <span>{t('settings.savePreferences')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
