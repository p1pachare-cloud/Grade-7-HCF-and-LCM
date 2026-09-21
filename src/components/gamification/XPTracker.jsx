// src/components/gamification/XPTracker.jsx
// XP progress tracker widget component

import React from 'react';
import { Zap } from 'lucide-react';

export default function XPTracker({ xp = 0, className = '' }) {
  return (
    <div className={`flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-2xl shadow-sm ${className}`}>
      <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
      <span className="text-xs font-extrabold text-amber-300">{xp} XP</span>
    </div>
  );
}
