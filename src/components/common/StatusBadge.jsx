import React from 'react';

export const StatusBadge = ({ status, size = 'md' }) => {
  const getStyles = () => {
    switch (status?.toLowerCase()) {
      case 'operational':
      case 'low':
      case 'safe':
      case 'recommended':
      case 'scheduled':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'medium':
      case 'delayed':
      case 'warning':
      case 'planned':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'high':
      case 'critical':
      case 'restricted':
      case 'high risk':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
  };

  const pad = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${getStyles()} ${pad}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {status}
    </span>
  );
};
