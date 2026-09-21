// src/components/gamification/WorldMap.jsx
// 10-City Horizontal World Map Component with Lock Icons & Stars

import React from 'react';
import { WORLD_METADATA } from '../../data/worlds.js';
import StarRating from './StarRating.jsx';
import { Lock, CheckCircle, MapPin } from 'lucide-react';
import { calcStarsForWorld } from '../../utils/scoring.js';

export default function WorldMap({
  currentWorld = 0,
  worldScores = [],
  onSelectWorld,
  className = ''
}) {
  return (
    <div className={`w-full bg-slate-900/90 p-5 rounded-3xl border border-slate-700 shadow-2xl ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm font-extrabold text-blue-400">
          <MapPin className="w-5 h-5" /> World Harmony Festival Tour (10 Cities)
        </div>
        <span className="text-xs text-slate-400">Scroll to explore worlds →</span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 pt-2 px-1 scrollbar-thin">
        {WORLD_METADATA.map((w, idx) => {
          const score = worldScores[idx];
          const isUnlocked = idx === 0 || (worldScores[idx - 1] != null && worldScores[idx - 1] >= 6);
          const isCurrent = currentWorld === idx;
          const stars = score != null ? calcStarsForWorld(score) : 0;

          return (
            <button
              key={w.id}
              onClick={() => isUnlocked && onSelectWorld && onSelectWorld(idx)}
              disabled={!isUnlocked}
              className={`flex-shrink-0 w-48 p-4 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden flex flex-col justify-between h-36 ${
                isCurrent
                  ? 'bg-slate-800 border-blue-400 shadow-glow scale-102 ring-2 ring-blue-400/40'
                  : isUnlocked
                  ? 'bg-slate-900/80 border-slate-700 hover:border-slate-500 hover:bg-slate-850'
                  : 'bg-slate-950/60 border-slate-850 opacity-40 cursor-not-allowed'
              }`}
            >
              {/* City Accent Stripe */}
              <div
                style={{ backgroundColor: w.accentColor }}
                className="absolute top-0 left-0 right-0 h-1.5"
              />

              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">World {w.id}</span>
                  <h4 className="text-sm font-extrabold text-slate-100 truncate">{w.city}</h4>
                </div>

                {!isUnlocked ? (
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center">
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                ) : score != null && score >= 6 ? (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                ) : null}
              </div>

              {/* Character & Backdrop */}
              <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>{w.character}</span>
                <span className="text-[10px] text-slate-400">{w.backdrop}</span>
              </div>

              {/* Stars & Score */}
              <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
                <StarRating stars={stars} size="sm" />
                <span className="text-xs font-bold text-amber-400">
                  {score != null ? `${score}/10` : isUnlocked ? 'Ready' : 'Locked'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
