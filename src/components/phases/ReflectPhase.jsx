// src/components/phases/ReflectPhase.jsx
// Phase 5: Reflect Phase Component (Journal, Gearo Reflection & Badge Summary)

import React, { useState, useEffect } from 'react';
import Mascot from '../shared/Mascot.jsx';
import BadgePanel from '../gamification/BadgePanel.jsx';
import XPTracker from '../gamification/XPTracker.jsx';
import StarRating from '../gamification/StarRating.jsx';
import { getReflectNarration } from '../../utils/narration.js';
import { Award, Share2, CheckCircle, Sparkles, Send } from 'lucide-react';

export default function ReflectPhase({
  badges = [],
  xp = 0,
  totalStars = 0,
  playNarration,
  onResetSession,
  className = ''
}) {
  const [reflectionText, setReflectionText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (playNarration) {
      playNarration(getReflectNarration());
    }
  }, [playNarration]);

  const handleSubmitJournal = (e) => {
    e.preventDefault();
    if (reflectionText.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${className}`}>
      {/* Reflect Container */}
      <div className="bg-slate-900/90 p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-6">
        <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm uppercase tracking-wider">
          <Sparkles className="w-5 h-5" /> Phase 5 — Reflect & Share
        </div>

        <h2 className="text-3xl font-extrabold text-white">Your HCF & LCM Guild Journey Complete! 🌍</h2>

        <Mascot
          mood="celebrating"
          text="What an adventure! Can you tell me how you know when to use the HCF and when to use the LCM?"
        />

        {/* Reflection Journal */}
        <form onSubmit={handleSubmitJournal} className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
          <label className="block text-xs font-bold text-slate-200">
            Explain to Gearo: How do you decide whether a real-world problem needs HCF or LCM?
          </label>
          <textarea
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="Type your explanation here... (e.g. HCF is for equal cuts with no waste, LCM is for when drum beats sync up!)"
            rows="4"
            className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400">Share your thoughts with your teacher or classmates!</span>
            <button
              type="submit"
              disabled={!reflectionText.trim() || submitted}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> {submitted ? '✔ Saved to Journal' : 'Save Reflection'}
            </button>
          </div>
        </form>

        {/* Final Progress Summary Card */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 text-2xl font-extrabold">
              🏆
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Guild Master Summary</h3>
              <p className="text-xs text-slate-400">Total Stars: {totalStars} • Total Badges: {badges.length} / 8</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <XPTracker xp={xp} />
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" /> Print / Save Report
            </button>
          </div>
        </div>

        {/* Badges Earned */}
        <BadgePanel unlockedBadges={badges} />

        {/* Restart / Replay option */}
        <div className="pt-4 border-t border-slate-800 text-center">
          <button
            onClick={onResetSession}
            className="text-xs font-semibold text-slate-400 hover:text-slate-200 underline"
          >
            Reset session and start a new journey
          </button>
        </div>
      </div>
    </div>
  );
}
