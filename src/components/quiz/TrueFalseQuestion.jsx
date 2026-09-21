// src/components/quiz/TrueFalseQuestion.jsx
// True / False big buttons component

import React from 'react';
import { Check, X } from 'lucide-react';

export default function TrueFalseQuestion({
  selectedValue = null,
  onSelect,
  disabled = false,
  className = ''
}) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      <button
        onClick={() => !disabled && onSelect(true)}
        disabled={disabled}
        className={`p-5 rounded-2xl border-2 font-extrabold text-lg flex items-center justify-center gap-3 transition-all ${
          selectedValue === true
            ? 'bg-emerald-600/30 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/50 scale-102'
            : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-500'
        }`}
      >
        <Check className="w-6 h-6 text-emerald-400" /> True
      </button>

      <button
        onClick={() => !disabled && onSelect(false)}
        disabled={disabled}
        className={`p-5 rounded-2xl border-2 font-extrabold text-lg flex items-center justify-center gap-3 transition-all ${
          selectedValue === false
            ? 'bg-rose-600/30 border-rose-400 text-rose-300 ring-2 ring-rose-400/50 scale-102'
            : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-500'
        }`}
      >
        <X className="w-6 h-6 text-rose-400" /> False
      </button>
    </div>
  );
}
