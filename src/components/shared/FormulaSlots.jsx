// src/components/shared/FormulaSlots.jsx
// Station C Formula & Division Ladder slots component

import React from 'react';

export default function FormulaSlots({
  questionType = 'HCF',
  topOp = 'Side Divisors',
  bottomOp = 'Remainders',
  topValue = '',
  bottomValue = '',
  onTopChange,
  onBottomChange,
  className = ''
}) {
  return (
    <div className={`p-6 bg-slate-900/90 rounded-3xl border border-slate-700 shadow-2xl ${className}`}>
      <div className="text-center font-bold text-amber-400 mb-4">
        {questionType} Calculation Forge
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-4 text-base font-bold text-slate-200">
          <span>{questionType} =</span>
          <div className="flex flex-col items-center bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-inner">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-blue-400">{topOp}:</span>
              <input
                type="text"
                value={topValue}
                onChange={(e) => onTopChange && onTopChange(e.target.value)}
                placeholder="value"
                className="w-20 h-10 text-center font-bold bg-slate-900 border border-blue-500 rounded-xl text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {bottomOp && (
              <>
                <div className="w-full h-0.5 bg-slate-600"></div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-bold text-indigo-400">{bottomOp}:</span>
                  <input
                    type="text"
                    value={bottomValue}
                    onChange={(e) => onBottomChange && onBottomChange(e.target.value)}
                    placeholder="value"
                    className="w-20 h-10 text-center font-bold bg-slate-900 border border-indigo-500 rounded-xl text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
