import React from 'react';
import { FilterX } from 'lucide-react';

export const EmptyState = ({ title = "No matching records found", description = "Try adjusting your filters or search query to see results.", onReset }) => {
  return (
    <div className="w-full py-12 px-4 rounded-xl border border-dashed border-slate-800 bg-slate-900/40 flex flex-col items-center justify-center text-center space-y-3">
      <div className="p-3 rounded-full bg-slate-800/80 text-slate-400">
        <FilterX size={24} />
      </div>
      <h4 className="text-sm font-semibold text-slate-200">{title}</h4>
      <p className="text-xs text-slate-400 max-w-sm">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-2 px-3 py-1.5 text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-all"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );
};
