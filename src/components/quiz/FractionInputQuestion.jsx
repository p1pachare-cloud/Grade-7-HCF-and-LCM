// src/components/quiz/FractionInputQuestion.jsx
// Stacked fraction input question component

import React from 'react';
import FractionInput from '../shared/FractionInput.jsx';

export default function FractionInputQuestion({
  value,
  onChange,
  onSubmit,
  allowImproper = false,
  disabled = false,
  className = ''
}) {
  return (
    <div className={`flex justify-center ${className}`}>
      <FractionInput
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        allowMixed={allowImproper}
        disabled={disabled}
      />
    </div>
  );
}
