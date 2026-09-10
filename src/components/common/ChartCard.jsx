import React from 'react';
import { DataSourceBadge } from './DataSourceBadge';

export const ChartCard = ({
  title,
  subtitle,
  children,
  filters,
  activeFilter,
  onFilterChange,
  source,
  lastUpdated,
  actions
}) => {
  return (
    <div className="glass-card card-hover rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">{title}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {filters && (
            <div className="inline-flex p-1 bg-slate-900/90 border border-slate-800 rounded-lg text-xs">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => onFilterChange && onFilterChange(f)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    activeFilter === f
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
          {actions}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full min-h-[300px] flex-1">
        {children}
      </div>

      {/* Bottom Source Bar */}
      {(source || lastUpdated) && (
        <div className="pt-3 mt-4 border-t border-slate-800/80 flex items-center justify-between">
          <DataSourceBadge source={source || 'Baltic & Open Maritime Data'} lastUpdated={lastUpdated || '10 Sep 2026'} />
          <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest">Ensemble ML Forecast</span>
        </div>
      )}
    </div>
  );
};
