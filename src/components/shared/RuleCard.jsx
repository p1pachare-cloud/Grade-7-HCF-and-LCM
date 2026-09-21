// src/components/shared/RuleCard.jsx
// Collectible Guild Rule Card popup overlay component for HCF & LCM

import React from 'react';
import { Shield, Sparkles, X } from 'lucide-react';

export default function RuleCard({ isOpen = false, onClose, className = '' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 p-6 rounded-3xl border-2 border-amber-400 shadow-2xl ${className}`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge Shield Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mb-2 shadow-glow">
            <Shield className="w-8 h-8 text-amber-400" />
          </div>
          <h3 className="text-xl font-extrabold text-amber-400 flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> Global Guild Rule Card
          </h3>
          <p className="text-xs text-slate-400">Keep these HCF & LCM rules in your toolkit!</p>
        </div>

        {/* Rule 1: HCF */}
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-blue-500/40 mb-3">
          <div className="text-xs font-bold text-blue-400 mb-1">RULE 1 — HCF (GREATEST COMMON FACTOR)</div>
          <div className="text-sm font-extrabold text-slate-100 text-center">
            HCF = <span className="text-blue-300">Product of shared prime factors</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 text-center">
            "The largest equal group size or cut with 0 remainder."
          </div>
        </div>

        {/* Rule 2: LCM */}
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-rose-500/40 mb-3">
          <div className="text-xs font-bold text-rose-400 mb-1">RULE 2 — LCM (LOWEST COMMON MULTIPLE)</div>
          <div className="text-sm font-extrabold text-slate-100 text-center">
            LCM = <span className="text-rose-300">Product of all prime factors</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 text-center">
            "The first time two repeating signals or events sync together."
          </div>
        </div>

        {/* Product Identity */}
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-purple-500/40 mb-4">
          <div className="text-xs font-bold text-purple-400 mb-1">RULE 3 — PRODUCT IDENTITY (2 NUMBERS)</div>
          <div className="text-base font-extrabold text-amber-300 text-center">
            HCF(a, b) × LCM(a, b) = a × b
          </div>
        </div>

        {/* Golden Reminder */}
        <div className="bg-amber-950/40 border border-amber-500/40 p-3 rounded-xl text-center text-xs font-bold text-amber-300">
          💡 Coprime Rule: If HCF = 1, then LCM = a × b!
        </div>
      </div>
    </div>
  );
}
