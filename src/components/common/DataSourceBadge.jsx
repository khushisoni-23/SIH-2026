import React from 'react';
import { Database, Clock } from 'lucide-react';

export const DataSourceBadge = ({ source = 'Historical Dataset', lastUpdated = '10 Sep 2026', className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 px-2.5 py-1 bg-slate-900/60 border border-slate-700/60 rounded-md text-[11px] text-slate-400 ${className}`}>
      <span className="inline-flex items-center gap-1 text-cyan-400 font-medium">
        <Database size={11} />
        {source}
      </span>
      <span className="text-slate-600">•</span>
      <span className="inline-flex items-center gap-1 text-slate-400">
        <Clock size={11} />
        {lastUpdated}
      </span>
    </div>
  );
};
