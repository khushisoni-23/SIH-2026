import React from 'react';
import { Database, Clock, Server } from 'lucide-react';

export const DataSourceBadge = ({ 
  source = 'Express API (MongoDB)', 
  lastUpdated = 'Live DB', 
  dataStatus = 'DEMO',
  className = '' 
}) => {
  return (
    <div className={`inline-flex items-center gap-2 px-2.5 py-1 bg-slate-900/60 border border-slate-700/60 rounded-md text-[11px] text-slate-400 ${className}`}>
      <span className="inline-flex items-center gap-1 text-cyan-400 font-medium">
        <Server size={11} />
        {source}
      </span>
      {dataStatus && (
        <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
          dataStatus === 'DEMO' 
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
        }`}>
          {dataStatus}
        </span>
      )}
      <span className="text-slate-600">•</span>
      <span className="inline-flex items-center gap-1 text-slate-400">
        <Clock size={11} />
        {lastUpdated}
      </span>
    </div>
  );
};

