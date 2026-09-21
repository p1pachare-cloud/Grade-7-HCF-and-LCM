// src/components/quiz/McqQuestion.jsx
// Multiple Choice Question renderer component

import React from 'react';
import Frac from '../shared/Frac.jsx';

export default function McqQuestion({
  question,
  selectedOption,
  onSelectOption,
  disabled = false,
  className = ''
}) {
  if (!question || !question.options) return null;

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3.5 ${className}`}>
      {question.options.map((opt, idx) => {
        const isSelected = selectedOption === opt.v || (selectedOption && selectedOption.n && opt.v.n && selectedOption.n === opt.v.n && selectedOption.d === opt.v.d);

        return (
          <button
            key={idx}
            onClick={() => !disabled && onSelectOption(opt)}
            disabled={disabled}
            className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center justify-between shadow-md ${
              isSelected
                ? 'bg-blue-600/30 border-blue-400 text-white ring-2 ring-blue-400/50 scale-102'
                : 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:border-slate-500 hover:bg-slate-800'
            } disabled:opacity-60 cursor-pointer`}
          >
            <div className="flex items-center gap-3.5">
              <span className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-black flex items-center justify-center text-sm sm:text-base shadow-sm">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-lg sm:text-xl font-black text-white">
                {typeof opt.v === 'object' && opt.v.n != null ? (
                  <Frac n={opt.v.n} d={opt.v.d} />
                ) : (
                  String(opt.v)
                )}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
