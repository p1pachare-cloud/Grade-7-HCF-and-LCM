// src/components/phases/WonderPhase.jsx
// Phase 1: Wonder Hook Component (Priya's Gift Packing & Diego's Signal Sync)

import React, { useEffect } from 'react';
import Mascot from '../shared/Mascot.jsx';
import RibbonBar from '../shared/RibbonBar.jsx';
import BeatTrack from '../shared/BeatTrack.jsx';
import { Sparkles, ArrowRight, Volume2 } from 'lucide-react';
import { getWonderNarration } from '../../utils/narration.js';

export default function WonderPhase({ onNext, playNarration, className = '' }) {
  useEffect(() => {
    if (playNarration) {
      playNarration(getWonderNarration());
    }
  }, [playNarration]);

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${className}`}>
      {/* Wonder Card */}
      <div className="bg-slate-900/90 p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-6">
        <div className="flex items-center gap-2 text-amber-400 font-black text-base uppercase tracking-wider">
          <Sparkles className="w-6 h-6" /> Phase 1 — Wonder
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
          The Tokyo Item Packing & Cairo Signal Sync Mystery 🧩
        </h2>

        <Mascot
          mood="thinking"
          text="Priya has 24 pencils and 36 notebooks. What is the largest number of equal gift packs she can make with none left over? And when will Diego's signals (every 12s and 18s) flash at the same time?"
          className="my-4 text-base sm:text-lg font-bold"
        />

        {/* Visual Hook Displays */}
        <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
          <RibbonBar itemCount={24} color="blue" label="Priya's Pencils (24 items)" />
          <RibbonBar itemCount={36} color="rose" label="Priya's Notebooks (36 items)" />
          <div className="border-t border-slate-800 pt-4">
            <BeatTrack intervalSec={12} name="Signal Beacon A (12s)" time={0} maxTime={45} color="blue" />
            <BeatTrack intervalSec={18} name="Signal Beacon B (18s)" time={0} maxTime={45} color="rose" className="mt-2" />
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <p className="text-sm font-bold text-slate-300">Explore equal grouping and repeating intervals!</p>

          <button
            onClick={onNext}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg shadow-glow hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            Let's Discover! <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

