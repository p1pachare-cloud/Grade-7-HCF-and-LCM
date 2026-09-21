// src/components/shared/FactorTree.jsx
// Capsule 1 Factor Tree visualization component

import React from 'react';

export default function FactorTree({ num = 12, tree = { root: 12, left: 2, right: 6, rightChildren: [2, 3] }, className = '' }) {
  return (
    <div className={`p-4 bg-slate-900 rounded-2xl border border-slate-700 text-center ${className}`}>
      <div className="text-xs font-bold text-slate-400 mb-3">Factor Tree for {num}</div>
      <div className="flex flex-col items-center gap-2">
        {/* Root */}
        <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-indigo-400 text-white font-bold flex items-center justify-center">
          {tree.root}
        </div>

        {/* Level 1 branches */}
        <div className="flex gap-8 items-center relative">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
            {tree.left}
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 text-white font-bold flex items-center justify-center text-xs">
            {tree.right}
          </div>
        </div>

        {/* Level 2 branches if present */}
        {tree.rightChildren && (
          <div className="flex gap-4 items-center pl-12">
            {tree.rightChildren.map((child, i) => (
              <div key={i} className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                {child}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
