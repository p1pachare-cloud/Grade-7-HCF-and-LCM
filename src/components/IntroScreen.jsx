// src/components/IntroScreen.jsx
// Home screen matching exact reference layout (grade2-numbers-to-200 / grade-6-angles style)

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const PHASE_CARDS = [
  {
    id: 'wonder',
    title: 'Wonder',
    subtitle: 'A math mystery!',
    emoji: '🧐'
  },
  {
    id: 'story',
    title: 'Story',
    subtitle: 'The Global Guild',
    emoji: '📖'
  },
  {
    id: 'simulate',
    title: 'Simulate',
    subtitle: '3 Station Sandbox',
    emoji: '🧪'
  },
  {
    id: 'play',
    title: 'Practice',
    subtitle: '100 challenges',
    emoji: '🎮'
  },
  {
    id: 'reflect',
    title: 'Reflect',
    subtitle: 'Quiz & review',
    emoji: '📓'
  }
];

export default function IntroScreen({ onStart, audioMuted, onToggleAudio, className = '' }) {
  return (
    <div className={`min-h-[88vh] flex flex-col items-center justify-center relative px-4 py-8 ${className}`}>
      {/* Top Right Standalone Audio Button matching reference screenshot */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={onToggleAudio}
          className="w-11 h-11 rounded-full bg-slate-900/90 border border-amber-400/40 text-amber-400 flex items-center justify-center shadow-lg hover:bg-slate-800 transition-transform active:scale-95 cursor-pointer"
          title={audioMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {audioMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Center Content Container */}
      <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-6 z-10">
        
        {/* Grade Badge Pill */}
        <div className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full bg-indigo-900/60 border border-indigo-400/50 text-indigo-200 text-sm font-black shadow-md">
          <span>✨ Grade 7 Math</span>
        </div>

        {/* Main Title & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-5xl sm:text-7xl font-black text-amber-400 tracking-tight drop-shadow-[0_0_30px_rgba(251,191,36,0.7)]">
            HCF & LCM
          </h1>
          <h2 className="text-xl sm:text-3xl font-extrabold text-rose-400 tracking-wide">
            Highest Common Factor & Lowest Common Multiple!
          </h2>
        </div>

        {/* Description Pill Box */}
        <div className="bg-slate-900/90 border border-slate-700/80 px-8 py-4 rounded-2xl max-w-2xl text-base sm:text-lg font-bold text-slate-100 shadow-xl backdrop-blur-md">
          Let's master factors, multiples, prime trees, division ladders, and finding the HCF and LCM! 🧩
        </div>

        {/* 5 Phase Cards Horizontal Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 w-full pt-4">
          {PHASE_CARDS.map((card) => (
            <button
              key={card.id}
              onClick={() => onStart && onStart(card.id)}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 hover:border-amber-400/60 hover:bg-slate-800/90 transition-all duration-200 shadow-lg flex flex-col items-center text-center group cursor-pointer hover:scale-105"
            >
              <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">{card.emoji}</span>
              <span className="text-base font-black text-white mb-0.5">{card.title}</span>
              <span className="text-xs text-slate-300 font-bold">{card.subtitle}</span>
            </button>
          ))}
        </div>

        {/* Big Yellow CTA Button */}
        <div className="pt-4">
          <button
            onClick={() => onStart && onStart('wonder')}
            className="px-12 py-5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xl shadow-[0_0_35px_rgba(251,191,36,0.8)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5"
          >
            <span>🚀</span> Begin Your Journey!
          </button>
        </div>

        {/* Bottom Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-sm font-bold text-slate-200">
          <div className="px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 flex items-center gap-2 shadow-sm">
            <span>🎯</span> 100 Questions
          </div>
          <div className="px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 flex items-center gap-2 shadow-sm">
            <span>🧩</span> HCF & LCM
          </div>
          <div className="px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 flex items-center gap-2 shadow-sm">
            <span>🏆</span> Badges & XP
          </div>
        </div>

      </div>
    </div>
  );
}
