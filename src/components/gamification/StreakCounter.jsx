// src/components/gamification/StreakCounter.jsx
// Streak fire counter widget component

import React from 'react';
import { Flame } from 'lucide-react';

export default function StreakCounter({ streak = 0, className = '' }) {
  if (streak === 0) return null;

  return (
    <div className={`flex items-center gap-1 bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 rounded-2xl shadow-sm ${className}`}>
      <Flame className="w-4 h-4 text-rose-500 fill-rose-500 animate-bounce" />
      <span className="text-xs font-extrabold text-rose-400">{streak} Streak!</span>
    </div>
  );
}
