// src/components/gamification/BadgePanel.jsx
// Badge panel overview grid component

import React from 'react';
import { BADGES } from '../../utils/badgeEngine.js';
import { Award, Lock } from 'lucide-react';

export default function BadgePanel({ unlockedBadges = [], className = '' }) {
  return (
    <div className={`p-6 bg-slate-900/90 rounded-3xl border border-slate-700 shadow-xl ${className}`}>
      <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm mb-4">
        <Award className="w-5 h-5" /> Guild Master Badges ({unlockedBadges.length} / {BADGES.length})
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {BADGES.map((b) => {
          const isUnlocked = unlockedBadges.includes(b.id);

          return (
            <div
              key={b.id}
              className={`p-3 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center ${
                isUnlocked
                  ? 'bg-slate-800/90 border-amber-500/50 shadow-md'
                  : 'bg-slate-950/60 border-slate-800 opacity-50'
              }`}
            >
              <div className="text-3xl mb-1 relative">
                {b.icon}
                {!isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950/70 rounded-full">
                    <Lock className="w-4 h-4 text-slate-400" />
                  </div>
                )}
              </div>
              <span className={`text-xs font-bold ${isUnlocked ? 'text-amber-300' : 'text-slate-500'}`}>
                {b.title}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 line-clamp-2">{b.desc}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
