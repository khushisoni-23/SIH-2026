import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { DataSourceBadge } from './DataSourceBadge';

export const KpiCard = ({
  title,
  value,
  change,
  changeType = 'neutral', // 'positive' | 'negative' | 'neutral'
  subtitle,
  icon: Icon,
  source,
  lastUpdated,
  badgeText
}) => {
  const getTrendIcon = () => {
    if (changeType === 'positive') return <TrendingUp size={14} className="text-emerald-400" />;
    if (changeType === 'negative') return <TrendingDown size={14} className="text-rose-400" />;
    return <Minus size={14} className="text-slate-400" />;
  };

  const getTrendColor = () => {
    if (changeType === 'positive') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (changeType === 'negative') return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    return 'text-slate-400 bg-slate-800 border-slate-700';
  };

  return (
    <div className="glass-card glass-card-hover rounded-xl p-5 border border-slate-800 flex flex-col justify-between relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-all duration-300 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</span>
          {Icon && (
            <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-cyan-400">
              <Icon size={18} />
            </div>
          )}
        </div>

        <div className="flex items-baseline justify-between gap-2 mb-1">
          <div className="text-2xl lg:text-3xl font-bold text-slate-50 tracking-tight">{value}</div>
          {change && (
            <div className={`flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>{change}</span>
            </div>
          )}
        </div>

        {subtitle && (
          <p className="text-xs text-slate-400 font-normal mb-3">{subtitle}</p>
        )}

        {badgeText && (
          <span className="inline-block px-2 py-0.5 text-[11px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded mb-2">
            {badgeText}
          </span>
        )}
      </div>

      {(source || lastUpdated) && (
        <div className="pt-3 mt-2 border-t border-slate-800/80">
          <DataSourceBadge source={source || 'System Data'} lastUpdated={lastUpdated || '10 Sep 2026'} />
        </div>
      )}
    </div>
  );
};
