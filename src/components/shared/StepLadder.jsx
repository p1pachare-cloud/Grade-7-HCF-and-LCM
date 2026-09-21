// src/components/shared/StepLadder.jsx
// Station C 5-Step Ladder tracker component for whole-number HCF & LCM

import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const STEPS = [
  { id: 0, label: '1. FACTORS', desc: 'Find all factor divisors' },
  { id: 1, label: '2. PRIMES', desc: 'Build prime factor tree' },
  { id: 2, label: '3. OVERLAP', desc: 'Venn shared primes' },
  { id: 3, label: '4. LADDER', desc: 'Division ladder method' },
  { id: 4, label: '5. VERIFY', desc: 'Check HCF × LCM = a × b' }
];

export default function StepLadder({ currentStep = 0, completedSteps = [], className = '' }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {STEPS.map((step) => {
        const isDone = completedSteps.includes(step.id);
        const isCurrent = currentStep === step.id;

        return (
          <div
            key={step.id}
            className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-300 ${
              isDone
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                : isCurrent
                ? 'bg-blue-950/60 border-blue-400 text-blue-200 shadow-lg scale-102'
                : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
            }`}
          >
            {isDone ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-slate-600 flex-shrink-0" />
            )}
            <div>
              <div className="text-xs font-bold">{step.label}</div>
              <div className="text-[10px] opacity-80">{step.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
