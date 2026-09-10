import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Sliders,
  RefreshCw,
  Database,
  ShieldCheck,
  CheckCircle2,
  Save
} from 'lucide-react';
import { DataSourceBadge } from '../components/common/DataSourceBadge';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 m-0">
            <SettingsIcon className="text-cyan-400" size={20} />
            System Settings & Enterprise Configuration
          </h2>
          <p className="text-xs text-slate-400 m-0 mt-0.5">
            Configure profile credentials, threshold alert triggers, data sync rates and API endpoints
          </p>
        </div>
        <DataSourceBadge source="SAIL Enterprise Config" lastUpdated="10 Sep 2026" />
      </div>

      {/* Tabs */}
      <div className="glass-card rounded-xl p-2 border border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
        {[
          { id: 'profile', label: 'User Profile & Role', icon: User },
          { id: 'notifications', label: 'Notification Alerts', icon: Bell },
          { id: 'dashboard', label: 'Dashboard & Currency', icon: Sliders },
          { id: 'datasource', label: 'Data Source Endpoints', icon: Database }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>Enterprise configuration saved successfully!</span>
        </div>
      )}

      {/* Tab Content */}
      <form onSubmit={handleSave} className="glass-card rounded-xl p-6 border border-slate-800 space-y-6">
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-2">
              Procurement Officer Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Designation & Role</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Organization Unit</label>
                <input
                  type="text"
                  value={profile.organization}
                  onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-2">
              Alert Triggers & Thresholds
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                <div>
                  <div className="font-semibold text-slate-200">Freight Rate Spike Alert</div>
                  <div className="text-slate-400 text-[11px]">Notify when 30-day forecast rate increases by threshold</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={notifications.rateSpikeThresholdPct}
                    onChange={(e) => setNotifications({ ...notifications, rateSpikeThresholdPct: parseFloat(e.target.value) })}
                    className="w-16 py-1 px-2 bg-slate-800 border border-slate-700 rounded text-center text-cyan-300 font-mono text-xs"
                    step="0.5"
                  />
                  <span className="text-slate-400 font-bold">%</span>
                </div>
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                <div>
                  <div className="font-semibold text-slate-200">Port Anchorage Congestion Threshold</div>
                  <div className="text-slate-400 text-[11px]">Alert when anchorage wait days exceeds threshold</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={notifications.portDelayThresholdDays}
                    onChange={(e) => setNotifications({ ...notifications, portDelayThresholdDays: parseFloat(e.target.value) })}
                    className="w-16 py-1 px-2 bg-slate-800 border border-slate-700 rounded text-center text-amber-300 font-mono text-xs"
                    step="0.5"
                  />
                  <span className="text-slate-400 font-bold">Days</span>
                </div>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-2">
              Dashboard Defaults
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Trade Route</label>
                <select
                  value={dashboard.defaultRoute}
                  onChange={(e) => setDashboard({ ...dashboard, defaultRoute: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option>Australia → Paradip</option>
                  <option>Australia → Vizag</option>
                  <option>Indonesia → Paradip</option>
                  <option>USA → Paradip</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Currency Unit</label>
                <select
                  value={dashboard.defaultCurrency}
                  onChange={(e) => setDashboard({ ...dashboard, defaultCurrency: e.target.value })}
                  className="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
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
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-2">
              API Endpoint Integration Status
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-200">Baltic Exchange Dry Index Feed</div>
                  <div className="text-[11px] text-slate-400">Endpoint: https://api.balticexchange.com/v1/dry-index</div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">
                  CONNECTED (MOCK API)
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-200">Indian Port Association (IPA) API</div>
                  <div className="text-[11px] text-slate-400">Endpoint: https://ipa.gov.in/api/v2/port-telemetry</div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">
                  CONNECTED (MOCK API)
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-200">SIH 2026 ML Forecasting API</div>
                  <div className="text-[11px] text-slate-400">Endpoint: http://localhost:8000/api/v1/forecast</div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded">
                  FRONTEND READY FOR FASTAPI
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="py-2.5 px-6 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs rounded-lg shadow-md flex items-center gap-1.5 transition-all"
          >
            <Save size={14} />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
