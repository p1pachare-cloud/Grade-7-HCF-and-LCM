// src/components/shared/FractionInput.jsx
// Number input box component for numerical answers

import React from 'react';

export default function FractionInput({
  value = '',
  onChange,
  onSubmit,
  disabled = false,
  className = ''
}) {
  const val = typeof value === 'object' ? value.n || '' : value;

  const handleChange = (e) => {
    const clean = e.target.value.replace(/[^0-9]/g, '');
    if (onChange) onChange(clean);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <input
        type="text"
        inputMode="numeric"
        placeholder="Enter answer..."
        value={val}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="w-56 h-16 text-center text-3xl font-black bg-slate-900 border-2 border-cyan-500/60 rounded-2xl text-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 disabled:opacity-50 shadow-inner"
        aria-label="Enter numerical answer"
      />
    </div>
  );
}
