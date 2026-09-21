// src/components/ProgressMap.jsx
// 6-Phase Progress Navigation Bar matching exact reference UI (grade-6-angles-in-quadrilaterals style)

import React from 'react';
import { Volume2, VolumeX, Shield, Zap, Award, Check, Sparkles, HelpCircle, BookOpen, FlaskConical, Gamepad2, HeartHandshake } from 'lucide-react';

const PHASES = [
  { id: 'intro', label: 'Intro', icon: Sparkles, step: 0 },
  { id: 'wonder', label: '1. Wonder', icon: HelpCircle, step: 1 },
  { id: 'story', label: '2. Story', icon: BookOpen, step: 2 },
  { id: 'simulate', label: '3. Simulate', icon: FlaskConical, step: 3 },
  { id: 'play', label: '4. Practice', icon: Gamepad2, step: 4 },
  { id: 'reflect', label: '5. Reflect', icon: HeartHandshake, step: 5 }
];

export default function ProgressMap({
  currentPhase = 'intro',
  phaseComplete = {},
  onSelectPhase,
  xp = 0,
  streak = 0,
  totalStars = 0,
  audioMuted = false,
  onToggleAudio,
  onOpenRuleCard,
  badges = [],
  className = ''
}) {
  return (
    <header className={`w-full bg-slate-950/80 border-b border-slate-800/80 px-4 py-3 sticky top-0 z-50 backdrop-blur-xl ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-glow-cyan">
            G
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-gradient-cyan tracking-tight">
              Global Math Guild
            </h1>
            <p className="text-xs font-bold text-slate-300">HCF & LCM • Grade 7</p>
          </div>
        </div>

        {/* Phase Navigation Pills */}
        <nav className="flex items-center gap-1.5 sm:gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner overflow-x-auto">
          {PHASES.map((p) => {
            const isActive = currentPhase === p.id;
            const isDone = phaseComplete[p.id] || (p.id === 'intro' && currentPhase !== 'intro');
            const IconComponent = p.icon;

            return (
              <button
                key={p.id}
                onClick={() => onSelectPhase && onSelectPhase(p.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 border border-cyan-400 text-cyan-300 shadow-glow-cyan scale-102'
                    : isDone
                    ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40'
                    : 'bg-slate-900/60 border border-slate-800/80 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                {isDone ? (
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                )}
                <span>{p.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Top Right Badges & Controls */}
        <div className="flex items-center gap-2">
          {/* XP Badge */}
          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl text-xs font-bold text-amber-300">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{xp} XP</span>
          </div>

          {/* Level Pill */}
          <div className="hidden sm:flex items-center gap-1 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-xl text-xs font-bold text-purple-300">
            <span>Lvl 1</span>
          </div>

          {/* Badge Count */}
          <div className="hidden sm:flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-xl text-xs font-bold text-indigo-300">
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span>{badges.length}/8</span>
          </div>

          {/* Guild Rule Card Trigger */}
          <button
            onClick={onOpenRuleCard}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-400 border border-amber-500/40 transition-colors shadow-sm"
            title="Open Guild Rule Card"
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Audio Mute Button */}
          <button
            onClick={onToggleAudio}
            className={`p-2 rounded-xl transition-colors border ${
              audioMuted
                ? 'bg-rose-950/60 border-rose-800 text-rose-400'
                : 'bg-slate-800/80 border-slate-700 text-cyan-400 hover:bg-slate-700'
            }`}
            title={audioMuted ? 'Unmute Narration' : 'Mute Narration'}
          >
            {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
