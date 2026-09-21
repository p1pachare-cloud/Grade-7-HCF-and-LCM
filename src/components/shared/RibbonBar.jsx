// src/components/shared/RibbonBar.jsx
// Station A Item Packing visualizer component (HCF grouping)

import React from 'react';
import { packItems } from '../../utils/sim.js';
import { Box, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function RibbonBar({ ribbon: itemCountObj, cutLength: packSizeObj = null, color = 'blue', label = '', className = '' }) {
  const itemCount = typeof itemCountObj === 'object' ? (itemCountObj.n || itemCountObj.count || 24) : itemCountObj;
  const packSize = packSizeObj ? (typeof packSizeObj === 'object' ? packSizeObj.n || packSizeObj.size || 6 : packSizeObj) : null;

  const packResult = packSize ? packItems(itemCount, packSize) : null;

  const colorStyles = {
    blue: 'bg-blue-600 border-blue-400',
    rose: 'bg-rose-600 border-rose-400',
    emerald: 'bg-emerald-600 border-emerald-400',
    amber: 'bg-amber-600 border-amber-400'
  }[color] || 'bg-blue-600 border-blue-400';

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-1">
        <span>{label}</span>
        <span>Total items: <strong className="text-amber-400">{itemCount}</strong></span>
      </div>

      <div className="relative h-12 w-full bg-slate-900 rounded-xl border-2 border-slate-700 overflow-hidden flex items-center shadow-inner p-1">
        {!packResult ? (
          <div className={`h-full w-full ${colorStyles} rounded-lg flex items-center justify-center font-extrabold text-white text-sm shadow-sm`}>
            {itemCount} items
          </div>
        ) : (
          <div className="flex h-full w-full gap-1">
            {/* Equal Packs */}
            {Array.from({ length: packResult.packs }).map((_, i) => (
              <div
                key={i}
                className={`h-full flex-1 rounded-lg ${colorStyles} flex items-center justify-center text-xs font-extrabold text-white shadow-sm`}
              >
                <Box className="w-3.5 h-3.5 mr-1" />
                {packSize}
              </div>
            ))}

            {/* Remainder Items if any */}
            {!packResult.exact && (
              <div className="h-full bg-rose-950/80 border-2 border-rose-500 rounded-lg flex items-center justify-center text-xs font-bold text-rose-300 px-2 min-w-[50px] animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5 mr-1 text-rose-400" />
                {packResult.remainder} left
              </div>
            )}
          </div>
        )}
      </div>

      {packResult && (
        <div className="flex justify-between items-center text-[11px] mt-1 text-slate-400">
          <span>Packs formed: <strong className="text-amber-400">{packResult.packs}</strong></span>
          {packResult.exact ? (
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Zero remainder!
            </span>
          ) : (
            <span className="text-rose-400 font-semibold">Remainder: {packResult.remainder} items left over</span>
          )}
        </div>
      )}
    </div>
  );
}
