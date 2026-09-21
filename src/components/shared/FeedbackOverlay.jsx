// src/components/shared/FeedbackOverlay.jsx
// Visual feedback banner overlay component

import React from 'react';
import { CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

export default function FeedbackOverlay({ status, text, onAction, actionLabel = 'Continue', className = '' }) {
  if (!status) return null;

  const isCorrect = status === 'correct';
  const isNudge = status === 'notLowest';

  const styles = isCorrect
    ? { bg: 'bg-emerald-950/90 border-emerald-500', text: 'text-emerald-200', icon: CheckCircle }
    : isNudge
    ? { bg: 'bg-amber-950/90 border-amber-500', text: 'text-amber-200', icon: HelpCircle }
    : { bg: 'bg-rose-950/90 border-rose-500', text: 'text-rose-200', icon: AlertCircle };

  const IconComponent = styles.icon;

  return (
    <div className={`p-4 rounded-2xl border-2 ${styles.bg} backdrop-blur-md shadow-2xl flex items-center justify-between gap-4 animate-bounceIn ${className}`}>
      <div className="flex items-center gap-3">
        <IconComponent className={`w-7 h-7 flex-shrink-0 ${styles.text}`} />
        <span className={`text-sm font-semibold ${styles.text}`}>{text}</span>
      </div>

      {onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 rounded-xl font-bold bg-white text-slate-950 hover:bg-slate-200 transition-colors flex-shrink-0 text-xs shadow-md"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
