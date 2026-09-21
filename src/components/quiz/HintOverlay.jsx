// src/components/quiz/HintOverlay.jsx
// 2-Tier hint overlay and worked solution component

import React from 'react';
import RuleCard from '../shared/RuleCard.jsx';
import Frac from '../shared/Frac.jsx';
import { Lightbulb, Eye, BookOpen, X } from 'lucide-react';

export default function HintOverlay({
  question,
  hintsUsed = 0,
  onClose,
  onOpenRuleCard,
  className = ''
}) {
  if (hintsUsed === 0 || !question) return null;

  return (
    <div className={`bg-slate-900/95 border-2 border-amber-500/50 p-5 rounded-3xl shadow-2xl backdrop-blur-md animate-fadeIn ${className}`}>
      <div className="flex justify-between items-center mb-3 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
          <Lightbulb className="w-5 h-5" /> Hint {hintsUsed} of 2
        </div>
        <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tier 1: Concept Nudge */}
      {hintsUsed >= 1 && (
        <div className="text-xs text-slate-200 mb-3 leading-relaxed">
          <strong className="text-amber-300 block mb-1">Concept Nudge:</strong>
          {question.type.includes('hcf')
            ? 'For HCF, find the largest factor that divides all numbers without a remainder. Use common prime factors or the side divisors in the ladder method!'
            : question.type.includes('lcm')
            ? 'For LCM, find the smallest multiple shared by all numbers. Remember: LCM(a, b) = (a × b) / HCF(a, b)!'
            : 'Factorise numbers into prime trees or list multiples to locate shared values.'}
        </div>
      )}

      {/* Tier 2: Visual Grid & Rule Card Trigger */}
      {hintsUsed >= 2 && (
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <div className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
            <Eye className="w-4 h-4" /> Guild Rule Card:
          </div>

          <button
            onClick={onOpenRuleCard}
            className="w-full py-2 bg-amber-500/20 border border-amber-400/50 text-amber-300 rounded-xl font-bold text-xs hover:bg-amber-500/30 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> Open Collectible Guild Rule Card
          </button>
        </div>
      )}
    </div>
  );
}
