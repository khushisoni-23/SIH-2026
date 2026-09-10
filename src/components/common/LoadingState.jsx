import React from 'react';
import { Compass } from 'lucide-react';

export const LoadingState = ({ message = "Fetching maritime intelligence data..." }) => {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
        <Compass className="w-6 h-6 text-cyan-400 absolute top-3 left-3 animate-pulse" />
      </div>
      <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">{message}</p>
    </div>
  );
};
