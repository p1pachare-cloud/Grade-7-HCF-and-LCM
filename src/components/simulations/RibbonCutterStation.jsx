// src/components/simulations/RibbonCutterStation.jsx (Item Grouping / Packing Station for HCF)

import React, { useState, useEffect } from 'react';
import RibbonBar from '../shared/RibbonBar.jsx';
import Mascot from '../shared/Mascot.jsx';
import { zeroRemainderAll, buildPackingCandidates } from '../../utils/sim.js';
import { gcdAll } from '../../utils/hcfLcmMath.js';
import { makeRng } from '../../utils/questionGenerator.js';
import { Box, Trophy, CheckCircle, ArrowRight } from 'lucide-react';

export default function RibbonCutterStation({ onStationComplete, onRoundResult, className = '' }) {
  const [round, setRound] = useState(0);
  const [itemCounts, setItemCounts] = useState([24, 36]);
  const [candidates, setCandidates] = useState([2, 3, 4, 6, 8, 12]);
  const [selectedPackSize, setSelectedPackSize] = useState(6);
  const [isPacked, setIsPacked] = useState(true);
  const [zeroRemainderWall, setZeroRemainderWall] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [roundComplete, setRoundComplete] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const rng = makeRng(200 + round * 55);
    let sample;
    if (round === 0) sample = [24, 36];
    else if (round === 1) sample = [30, 45];
    else sample = [24, 36, 48];

    setItemCounts(sample);
    const c = buildPackingCandidates(rng, sample);
    setCandidates(c);
    setSelectedPackSize(c[0] || 6);
    setIsPacked(true);
    setRoundComplete(false);
    setFeedback(null);
    setAttempts(0);
  }, [round]);

  const handleSelectCandidate = (size) => {
    setSelectedPackSize(size);
    setIsPacked(true);
    setFeedback(null);
  };

  const handleCheckGreatest = () => {
    if (!selectedPackSize) return;
    setIsPacked(true);
    const trueHcf = gcdAll(itemCounts);
    const isFirstTry = attempts === 0;
    setAttempts((prev) => prev + 1);

    if (selectedPackSize === trueHcf) {
      setRoundComplete(true);
      if (!zeroRemainderWall.includes(selectedPackSize)) {
        setZeroRemainderWall((prev) => [...prev, selectedPackSize]);
      }
      setFeedback({ type: 'success', text: `🎉 Excellent! You found the true HCF (${trueHcf}) — the greatest pack size with zero remainder!` });
      if (onRoundResult) onRoundResult({ station: 0, round, firstTry: isFirstTry });
    } else if (zeroRemainderAll(itemCounts, selectedPackSize)) {
      if (!zeroRemainderWall.includes(selectedPackSize)) {
        setZeroRemainderWall((prev) => [...prev, selectedPackSize]);
      }
      setFeedback({ type: 'nudge', text: 'That pack size fits with no remainder — but can you find a GREATER pack size that also fits?' });
    } else {
      setFeedback({ type: 'waste', text: 'This pack size leaves items left over! Pick a size that divides every group evenly.' });
    }
  };

  const handleNextRound = () => {
    if (round < 2) {
      setRound(round + 1);
    } else if (onStationComplete) {
      onStationComplete();
    }
  };

  return (
    <div className={`p-6 bg-slate-900/90 rounded-3xl border border-slate-700 shadow-2xl max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-cyan-400 flex items-center gap-2">
            <Box className="w-5 h-5 text-cyan-400" /> Station A — Equal Item Grouping Lab (HCF)
          </h2>
          <p className="text-xs text-slate-400">Round {round + 1} of 3 • Find the greatest group size that packs all items with 0 remainder</p>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`w-3.5 h-3.5 rounded-full transition-all ${i === round ? 'bg-cyan-400 scale-110 shadow-glow-cyan' : i < round ? 'bg-emerald-400' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>

      <Mascot mood={roundComplete ? 'happy' : 'thinking'} text={feedback?.text || "Select a pack size from the dial to test if it divides all item groups evenly!"} className="mb-6" />

      {/* Item Groups Display */}
      <div className="space-y-4 mb-6 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        {itemCounts.map((count, i) => (
          <RibbonBar
            key={i}
            ribbon={count}
            cutLength={selectedPackSize}
            color={['blue', 'rose', 'emerald'][i]}
            label={`Item Group ${i + 1}`}
          />
        ))}
      </div>

      {/* Candidate Pack Sizes Dial */}
      <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700 mb-6">
        <label className="block text-xs font-bold text-slate-300 mb-3">
          Select Candidate Group / Pack Size:
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 mb-4">
          {candidates.map((size, i) => {
            const isSelected = selectedPackSize === size;
            return (
              <button
                key={i}
                onClick={() => handleSelectCandidate(size)}
                className={`py-2.5 px-2 rounded-xl text-sm font-extrabold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-600 border-cyan-400 text-white shadow-glow-cyan scale-105'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                {size} per box
              </button>
            );
          })}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleCheckGreatest}
            disabled={roundComplete}
            className={`px-7 py-3 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer ${
              roundComplete
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
            }`}
          >
            <Trophy className="w-4 h-4" /> This is the Greatest (HCF)!
          </button>
        </div>
      </div>

      {/* Zero Remainder Log Wall */}
      {zeroRemainderWall.length > 0 && (
        <div className="mb-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
          <div className="text-xs font-bold text-emerald-400 mb-2">Logged Zero-Remainder Pack Sizes:</div>
          <div className="flex flex-wrap gap-2">
            {zeroRemainderWall.map((size, i) => (
              <span key={i} className="px-3 py-1 bg-emerald-950 border border-emerald-500/40 rounded-lg text-xs font-bold text-emerald-300">
                ✔ {size} per box
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Round Complete Transition */}
      {roundComplete && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNextRound}
            className="px-8 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-sm shadow-lg flex items-center gap-2 animate-bounceIn cursor-pointer"
          >
            {round < 2 ? 'Next Round →' : 'Complete Station A ✔'}
          </button>
        </div>
      )}
    </div>
  );
}
