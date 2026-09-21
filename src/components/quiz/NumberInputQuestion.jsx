// src/components/quiz/NumberInputQuestion.jsx
// Single integer input box component

import React from 'react';

export default function NumberInputQuestion({
  value = '',
  onChange,
  onSubmit,
  disabled = false,
  className = ''
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <input
        type="text"
        inputMode="numeric"
        placeholder="Type number..."
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ''))}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="w-56 h-16 text-center text-3xl font-black bg-slate-900 border-2 border-blue-500 rounded-2xl text-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-500/40 shadow-inner disabled:opacity-50"
        aria-label="Enter numerical answer"
      />
    </div>
  );
}
