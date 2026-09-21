// src/components/quiz/OrderingQuestion.jsx
// Drag and tap-to-swap fraction ordering component

import React, { useState } from 'react';
import Frac from '../shared/Frac.jsx';
import { ArrowLeftRight } from 'lucide-react';

export default function OrderingQuestion({
  items = [],
  onChange,
  disabled = false,
  className = ''
}) {
  const [tiles, setTiles] = useState(items);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleTileClick = (index) => {
    if (disabled) return;
    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else {
      // Swap tiles
      const updated = [...tiles];
      [updated[selectedIndex], updated[index]] = [updated[index], updated[selectedIndex]];
      setTiles(updated);
      setSelectedIndex(null);
      if (onChange) onChange(updated);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-xs font-semibold text-slate-400 text-center flex items-center justify-center gap-1.5">
        <ArrowLeftRight className="w-4 h-4 text-amber-400" /> Tap any two tiles to swap their positions:
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {tiles.map((item, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => handleTileClick(idx)}
              disabled={disabled}
              className={`px-5 py-3 rounded-2xl border-2 font-bold text-lg transition-all duration-200 shadow-md ${
                isSelected
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200 scale-105 shadow-glow'
                  : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-500'
              }`}
            >
              {typeof item === 'object' && item.n != null ? (
                <Frac n={item.n} d={item.d} size="md" />
              ) : (
                String(item)
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
