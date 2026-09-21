// src/components/shared/Frac.jsx
// Math expression renderer for numbers and math symbols

import React from 'react';

export default function Frac({ n, d, whole = null, className = '', size = 'md' }) {
  if (d && d !== 1) {
    return <span className={`font-bold ${className}`}>{n}/{d}</span>;
  }
  return <span className={`font-bold ${className}`}>{n}</span>;
}
