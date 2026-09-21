// src/components/shared/Mascot.jsx
// Gearo mascot component with 6 mood states and interlocking gear animations

import React from 'react';
import { Settings, Sparkles, Smile, HelpCircle, Trophy, Lightbulb } from 'lucide-react';

const MOOD_CONFIG = {
  idle: {
    bg: 'bg-blue-600',
    border: 'border-blue-400',
    icon: Settings,
    spin: false,
    text: "Hi! I'm Gearo. Let's build together!",
    eyeState: 'o_o'
  },
  curious: {
    bg: 'bg-purple-600',
    border: 'border-purple-400',
    icon: HelpCircle,
    spin: false,
    text: "Hmm... how can we split these evenly?",
    eyeState: 'O_o'
  },
  happy: {
    bg: 'bg-emerald-600',
    border: 'border-emerald-400',
    icon: Smile,
    spin: true,
    text: "Great job! The gears fit perfectly!",
    eyeState: '^_^'
  },
  thinking: {
    bg: 'bg-indigo-600',
    border: 'border-indigo-400',
    icon: Lightbulb,
    spin: false,
    text: "Let's find the greatest common factor...",
    eyeState: '-_-'
  },
  celebrating: {
    bg: 'bg-amber-500',
    border: 'border-amber-300',
    icon: Trophy,
    spin: true,
    text: "Awesome! You unlocked a new badge!",
    eyeState: '*_*'
  },
  encouraging: {
    bg: 'bg-rose-600',
    border: 'border-rose-400',
    icon: Sparkles,
    spin: false,
    text: "Don't worry! Try breaking down the factors again.",
    eyeState: 'u_u'
  }
};

export default function Mascot({ mood = 'idle', text = null, size = 'md', className = '' }) {
  const config = MOOD_CONFIG[mood] || MOOD_CONFIG.idle;
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-24 h-24 text-base'
  }[size] || 'w-16 h-16 text-sm';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Gear Robot Body */}
      <div className="relative flex-shrink-0">
        {/* Main HCF Gear */}
        <div
          className={`${sizeClasses} ${config.bg} border-2 ${config.border} rounded-full flex items-center justify-center shadow-lg relative z-10 transition-transform duration-300 ${
            config.spin ? 'animate-gear-spin' : ''
          }`}
        >
          {/* Interlocking Teeth Visuals */}
          <div className="absolute -top-1 w-2 h-2 bg-white/40 rounded-sm"></div>
          <div className="absolute -bottom-1 w-2 h-2 bg-white/40 rounded-sm"></div>
          <div className="absolute -left-1 w-2 h-2 bg-white/40 rounded-sm"></div>
          <div className="absolute -right-1 w-2 h-2 bg-white/40 rounded-sm"></div>

          <IconComponent className="w-1/2 h-1/2 text-white animate-pulse-slow" />
        </div>

        {/* Secondary LCM Gear */}
        <div
          className={`absolute -bottom-2 -right-2 w-2/3 h-2/3 bg-slate-700 border border-slate-500 rounded-full flex items-center justify-center ${
            config.spin ? 'animate-gear-spin-reverse' : ''
          }`}
        >
          <span className="text-[10px] font-bold text-amber-400">LCM</span>
        </div>
      </div>

      {/* Speech Bubble */}
      <div className="bg-slate-800 border border-slate-700 text-slate-100 px-4 py-2 rounded-2xl rounded-tl-none shadow-md max-w-xs text-sm font-medium animate-fadeIn">
        {text || config.text}
      </div>
    </div>
  );
}
