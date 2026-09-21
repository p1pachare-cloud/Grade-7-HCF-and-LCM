// src/components/shared/PrimeVenn.jsx
// Capsule 1 Interactive Venn Diagram for prime factors

import React from 'react';

export default function PrimeVenn({
  leftNum = 12,
  rightNum = 18,
  leftOnly = [2],
  overlap = [2, 3],
  rightOnly = [3],
  className = ''
}) {
  return (
    <div className={`p-6 bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl ${className}`}>
      <div className="text-center font-bold text-slate-200 mb-4">
        Prime Factor Venn Diagram ({leftNum} & {rightNum})
      </div>

      <div className="relative w-full h-56 flex items-center justify-center">
        {/* Left Circle - 12 */}
        <div className="absolute left-6 w-44 h-44 rounded-full border-4 border-blue-500 bg-blue-500/10 flex flex-col items-center justify-center p-4">
          <span className="absolute top-2 left-6 text-xs font-bold text-blue-400">Factors of {leftNum}</span>
          <div className="flex flex-wrap gap-2 justify-center">
            {leftOnly.map((val, idx) => (
              <span key={idx} className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                {val}
              </span>
            ))}
          </div>
        </div>

        {/* Right Circle - 18 */}
        <div className="absolute right-6 w-44 h-44 rounded-full border-4 border-rose-500 bg-rose-500/10 flex flex-col items-center justify-center p-4">
          <span className="absolute top-2 right-6 text-xs font-bold text-rose-400">Factors of {rightNum}</span>
          <div className="flex flex-wrap gap-2 justify-center">
            {rightOnly.map((val, idx) => (
              <span key={idx} className="w-8 h-8 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                {val}
              </span>
            ))}
          </div>
        </div>

        {/* Overlap Center */}
        <div className="z-10 flex flex-col items-center justify-center bg-slate-800/80 px-4 py-2 rounded-2xl border border-amber-400/50 shadow-lg">
          <span className="text-[11px] font-bold text-amber-400 mb-1">Shared (HCF)</span>
          <div className="flex gap-2">
            {overlap.map((val, idx) => (
              <span key={idx} className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-md">
                {val}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800 text-xs">
        <div className="bg-slate-800/80 p-3 rounded-xl border border-amber-500/30">
          <span className="font-bold text-amber-400 block mb-1">HCF (Product of Overlap):</span>
          <span>{overlap.join(' × ')} = <strong className="text-white text-sm">{overlap.reduce((a, b) => a * b, 1)}</strong></span>
        </div>
        <div className="bg-slate-800/80 p-3 rounded-xl border border-indigo-500/30">
          <span className="font-bold text-indigo-400 block mb-1">LCM (Product of All Factors):</span>
          <span>{[...leftOnly, ...overlap, ...rightOnly].join(' × ')} = <strong className="text-white text-sm">{[...leftOnly, ...overlap, ...rightOnly].reduce((a, b) => a * b, 1)}</strong></span>
        </div>
      </div>
    </div>
  );
}
