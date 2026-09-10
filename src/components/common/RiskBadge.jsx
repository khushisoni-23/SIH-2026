import React from 'react';

export const RiskBadge = ({ level }) => {
  const lvl = level?.toLowerCase();
  let colorClass = 'bg-slate-700/50 text-slate-300 border-slate-600';

  if (lvl === 'critical' || lvl === 'high') {
    colorClass = 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-semibold';
  } else if (lvl === 'medium' || lvl === 'moderate') {
    colorClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-medium';
  } else if (lvl === 'low' || lvl === 'safe') {
    colorClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-medium';
  }

  return (
    <span className={`inline-block px-2.5 py-0.5 text-xs rounded border tracking-wide uppercase ${colorClass}`}>
      {level}
    </span>
  );
};
