import React, { useState, useEffect } from 'react';
import { X, Bell, AlertTriangle, Info, ShieldAlert, CheckCircle, Loader2 } from 'lucide-react';
import { alertService } from '../../services/alertService';

export const NotificationDrawer = ({ isOpen, onClose }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      alertService.getAlerts()
        .then(res => {
          setAlerts(res.alerts || res || []);
        })
        .catch(err => {
          console.error("Failed to fetch notifications:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f172a] border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-cyan-400" />
              <h3 className="font-semibold text-slate-100 text-sm">System Alerts & Notifications</h3>
              <span className="px-2 py-0.5 text-xs bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full font-semibold">
                {alerts.length} Active
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            >
              <X size={18} />
            </button>
          </div>

          {/* Alert List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-48 gap-3 text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
                <span className="text-xs">Fetching alerts from MongoDB...</span>
              </div>
            ) : alerts.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No active system alerts.
              </div>
            ) : (
              alerts.map((alert, idx) => (
                <div
                  key={alert.id || alert._id || idx}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                        alert.severity === 'High'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : alert.severity === 'Medium'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      }`}
                    >
                      {alert.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{alert.timestamp || 'Recent'}</span>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-200">{alert.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{alert.description}</p>

                  {alert.actionRecommended && (
                    <div className="pt-2 border-t border-slate-800/80 flex items-start gap-1.5 text-[11px] text-cyan-400">
                      <CheckCircle size={13} className="shrink-0 mt-0.5 text-cyan-400" />
                      <span><strong>Action:</strong> {alert.actionRecommended}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-800 bg-slate-900/50 text-center">
            <span className="text-[11px] text-slate-400">
              Connected to Live Maritime Advisory Stream • SIH 2026 DSS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
