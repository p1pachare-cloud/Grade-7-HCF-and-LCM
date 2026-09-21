// src/components/simulations/BeatSyncStation.jsx (Event Sync Station for LCM)

import React, { useState, useEffect } from 'react';
import BeatTrack from '../shared/BeatTrack.jsx';
import SyncTimeline from '../shared/SyncTimeline.jsx';
import Mascot from '../shared/Mascot.jsx';
import { eventSyncPlan } from '../../utils/sim.js';
import { useSyncClock } from '../../hooks/useSyncClock.js';
import { Play, Pause, RefreshCw, Trophy, Zap } from 'lucide-react';

export default function BeatSyncStation({ onStationComplete, className = '' }) {
  const [round, setRound] = useState(0);
  const [intervals, setIntervals] = useState([12, 18]);
  const [plan, setPlan] = useState({ L: 36, counts: [3, 2] });
  const [markerPos, setMarkerPos] = useState(36);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [roundComplete, setRoundComplete] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const maxTime = plan.L + 12;

  const { time, reset } = useSyncClock({
    maxTime,
    speed,
    playing,
    onComplete: () => setPlaying(false)
  });

  useEffect(() => {
    let inv;
    if (round === 0) inv = [12, 18];
    else if (round === 1) inv = [15, 20];
    else inv = [12, 16, 24];

    setIntervals(inv);
    const sp = eventSyncPlan(inv);
    setPlan(sp);
    setMarkerPos(sp.L);
    setPlaying(false);
    setRoundComplete(false);
    setFeedback(null);
    reset();
  }, [round]);

  const handlePlayToggle = () => {
    if (!playing) {
      if (time >= maxTime) reset();
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  const handleCheckPrediction = () => {
    if (markerPos == null) return;

    if (markerPos === plan.L) {
      setRoundComplete(true);
      setFeedback({ type: 'success', text: `🎉 Spot on! All signals trigger together for the first time at LCM = ${plan.L} seconds!` });
    } else {
      setFeedback({ type: 'wrong', text: `Not quite! Watch the playback animation to see where all signals flash together (at ${plan.L} s).` });
      setPlaying(true);
    }
  };

  const handleNextRound = () => {
    if (round < 2) {
      setRound(round + 1);
    } else if (onStationComplete) {
      onStationComplete();
    }
  };

  // Presets for marker
  const presets = [12, 18, 24, 30, 36, 48, 60];

  return (
    <div className={`p-6 bg-slate-900/90 rounded-3xl border border-slate-700 shadow-2xl max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-rose-400 flex items-center gap-2">
            <Zap className="w-5 h-5 text-rose-400" /> Station B — Event Sync Deck (LCM)
          </h2>
          <p className="text-xs text-slate-400">Round {round + 1} of 3 • Predict when all repeating signals trigger together for the first time (LCM)</p>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`w-3.5 h-3.5 rounded-full transition-all ${i === round ? 'bg-rose-500 scale-110 shadow-glow' : i < round ? 'bg-emerald-400' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>

      <Mascot mood={roundComplete ? 'happy' : 'curious'} text={feedback?.text || "Drag or select your prediction marker to guess when both signals hit together!"} className="mb-6" />

      {/* Signal Tracks */}
      <div className="space-y-4 mb-6 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        {intervals.map((inv, i) => (
          <BeatTrack
            key={i}
            period={inv}
            name={['Diego Signal A', 'Aisha Signal B', 'Mei Signal C'][i]}
            time={time}
            maxTime={maxTime}
            color={['blue', 'rose', 'emerald'][i]}
          />
        ))}
      </div>

      {/* Timeline */}
      <SyncTimeline
        maxTime={maxTime}
        currentTime={time}
        markerPos={markerPos}
        onMarkerChange={setMarkerPos}
        className="mb-4"
      />

      {/* Quick Presets */}
      <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-300 mr-2">Quick Presets:</span>
        {presets.map((pr, i) => {
          const isSelected = markerPos === pr;
          return (
            <button
              key={i}
              onClick={() => setMarkerPos(pr)}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-rose-500 border-rose-400 text-white shadow-glow'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
            >
              {pr} s
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlayToggle}
            className="px-5 py-2.5 rounded-xl font-extrabold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-2 cursor-pointer"
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {playing ? 'Pause' : '▶ Play Animation'}
          </button>
          <button
            onClick={reset}
            className="p-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 cursor-pointer"
            title="Reset timer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Speed */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <span>Speed:</span>
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-3 py-1 rounded-lg border text-xs font-bold cursor-pointer ${
                speed === s ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
            >
              {s}×
            </button>
          ))}
        </div>

        <button
          onClick={handleCheckPrediction}
          disabled={roundComplete}
          className={`px-6 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer ${
            roundComplete ? 'bg-emerald-600 text-white' : 'bg-rose-500 hover:bg-rose-400 text-white shadow-md'
          }`}
        >
          <Trophy className="w-4 h-4" /> Check Prediction (LCM)!
        </button>
      </div>

      {/* Beats Counter Table if Round Complete */}
      {roundComplete && (
        <div className="mb-6 p-4 bg-slate-950/90 rounded-2xl border border-emerald-500/40 animate-fadeIn">
          <div className="text-xs font-bold text-emerald-400 mb-2">Signal Counts at First Coincidence:</div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-200">
            {intervals.map((inv, i) => (
              <div key={i} className="bg-slate-800 p-2 rounded-xl border border-slate-700">
                <div className="text-slate-400 font-normal">{['Signal A', 'Signal B', 'Signal C'][i]}</div>
                <div className="text-amber-400 text-base">{plan.counts[i]} triggers</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Round Transition */}
      {roundComplete && (
        <div className="flex justify-end">
          <button
            onClick={handleNextRound}
            className="px-8 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-sm shadow-lg flex items-center gap-2 animate-bounceIn cursor-pointer"
          >
            {round < 2 ? 'Next Round →' : 'Complete Station B ✔'}
          </button>
        </div>
      )}
    </div>
  );
}
