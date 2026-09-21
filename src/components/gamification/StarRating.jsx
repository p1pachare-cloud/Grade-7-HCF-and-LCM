// src/components/gamification/StarRating.jsx
// Star rating renderer component (1-3 stars)

import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ stars = 0, maxStars = 3, size = 'sm', className = '' }) {
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }[size] || 'w-4 h-4';

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: maxStars }).map((_, i) => (
        <Star
          key={i}
          className={`${iconSizes} transition-all duration-300 ${
            i < stars
              ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]'
              : 'text-slate-700 fill-slate-800'
          }`}
        />
      ))}
    </div>
  );
}
