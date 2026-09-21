// src/components/shared/SyncTimeline.jsx
// Station B timeline axis with draggable/clickable prediction marker for integer seconds

import React from 'react';

export default function SyncTimeline({
  maxTime = 60,
  currentTime = 0,
  markerPos = null,
  onMarkerChange,
  className = ''
}) {
  const tickCount = 12;
  const markerVal = typeof markerPos === 'object' ? (markerPos ? markerPos.n || markerPos.value || 36 : null) : markerPos;

  const handleTimelineClick = (e) => {
    if (!onMarkerChange) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const rawVal = Math.round(ratio * maxTime);
    onMarkerChange(rawVal);
  };

  return (
    <div className={`w-full bg-slate-900 p-4 rounded-2xl border border-slate-700 ${className}`}>
      <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
        <span>0 s</span>
        <span>Timeline Axis (Seconds)</span>
        <span>{maxTime} s</span>
      </div>

      {/* Main Track Bar */}
      <div
        onClick={handleTimelineClick}
        className="relative h-12 bg-slate-800 rounded-xl border border-slate-700 cursor-pointer overflow-visible flex items-center px-2 shadow-inner"
      >
        {/* Ticks */}
        {Array.from({ length: tickCount + 1 }).map((_, i) => {
          const leftPercent = (i / tickCount) * 100;
          return (
            <div
              key={i}
              style={{ left: `${leftPercent}%` }}
              className="absolute top-0 bottom-0 w-0.5 bg-slate-700"
            />
          );
        })}

        {/* Current Time Playhead */}
        {currentTime > 0 && (
          <div
            style={{ left: `${(currentTime / maxTime) * 100}%` }}
            className="absolute top-0 bottom-0 w-1 bg-amber-400 z-20 shadow-glow"
          />
        )}

        {/* Prediction Marker Flag */}
        {markerVal != null && (
          <div
            style={{ left: `${(markerVal / maxTime) * 100}%` }}
            className="absolute -top-3 transform -translate-x-1/2 flex flex-col items-center z-30 transition-all duration-200"
          >
            <div className="bg-amber-500 text-slate-950 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full shadow-lg border border-amber-300">
              {markerVal} s
            </div>
            <div className="w-0.5 h-10 bg-amber-400"></div>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-slate-400 mt-2">
        Tap anywhere on the timeline to place your prediction marker!
      </div>
    </div>
  );
}
