// src/components/shared/BeatTrack.jsx
// Station B Event Track visual rendering for whole-number intervals

import React from 'react';

export default function BeatTrack({ period, name = '', time = 0, maxTime = 60, color = 'blue', className = '' }) {
  const periodVal = typeof period === 'object' ? (period.n / period.d || 12) : period;
  const currentEvents = Math.floor(time / periodVal);
  const isFlashing = time > 0 && Math.abs(time % periodVal) < 1;

  const colorStyles = {
    blue: { bg: 'bg-blue-600', flash: 'bg-blue-400 shadow-blue-400' },
    rose: { bg: 'bg-rose-600', flash: 'bg-rose-400 shadow-rose-400' },
    emerald: { bg: 'bg-emerald-600', flash: 'bg-emerald-400 shadow-emerald-400' }
  }[color] || { bg: 'bg-blue-600', flash: 'bg-blue-400' };

  return (
    <div className={`w-full flex items-center gap-3 ${className}`}>
      {/* Track Label */}
      <div className="w-32 flex-shrink-0 bg-slate-800 p-2 rounded-xl border border-slate-700 flex flex-col items-center">
        <span className="text-xs font-bold text-slate-200">{name} ⚡</span>
        <span className="text-[11px] text-amber-400 font-bold">Every {periodVal} s</span>
      </div>

      {/* Track Line */}
      <div className="flex-1 relative h-10 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden flex items-center px-2">
        {/* Ticks at each interval */}
        {Array.from({ length: Math.floor(maxTime / periodVal) }).map((_, i) => {
          const beatTime = (i + 1) * periodVal;
          const leftPercent = (beatTime / maxTime) * 100;
          return (
            <div
              key={i}
              style={{ left: `${leftPercent}%` }}
              className="absolute top-0 bottom-0 w-0.5 bg-slate-600 flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-slate-400" />
            </div>
          );
        })}

        {/* Counter Indicator */}
        <div className="ml-auto text-xs font-bold text-slate-300 z-10">
          Events: <span className="text-amber-400">{currentEvents}</span>
        </div>

        {/* Active Flash Overlay */}
        {isFlashing && (
          <div className={`absolute inset-0 ${colorStyles.flash} opacity-40 animate-pulse shadow-lg`} />
        )}
      </div>
    </div>
  );
}
