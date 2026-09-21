// src/components/simulations/FormulaForgeStation.jsx
// Station C: Formula Forge (Abstract -> 5-step ladder & Spot the Mistake)

import React, { useState, useEffect } from 'react';
import StepLadder from '../shared/StepLadder.jsx';
import FormulaSlots from '../shared/FormulaSlots.jsx';
import Mascot from '../shared/Mascot.jsx';
import { Hammer, Trophy, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export default function FormulaForgeStation({ onStationComplete, className = '' }) {
  const [round, setRound] = useState(0); // 0 = Prime Factor Tree, 1 = Division Ladder, 2 = Spot the Mistake
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const [topVal, setTopVal] = useState('');
  const [bottomVal, setBottomVal] = useState('');
  const [feedback, setFeedback] = useState(null);

  // Round 3 Spot the mistake state
  const [selectedMistakeLine, setSelectedMistakeLine] = useState(null);
  const [mistakeFixed, setMistakeFixed] = useState(false);

  useEffect(() => {
    setCurrentStep(round === 0 ? 0 : round === 1 ? 3 : 4);
    setTopVal('');
    setBottomVal('');
    setFeedback(null);
    setSelectedMistakeLine(null);
    setMistakeFixed(false);
  }, [round]);

  const handleVerifyStep = () => {
    setFeedback(null);

    if (round === 0) {
      // Round 0: Prime Factor Tree for 24 and 36
      // 24 = 2^3 * 3^1, 36 = 2^2 * 3^2
      // Target: HCF = 12, LCM = 72
      if (topVal.trim() === '12' && bottomVal.trim() === '72') {
        const newSteps = Array.from(new Set([...completedSteps, 0, 1, 2]));
        setCompletedSteps(newSteps);
        setFeedback({ type: 'success', text: '🎉 Perfect! HCF(24, 36) = 12 (common prime factors) and LCM(24, 36) = 72!' });
      } else {
        setFeedback({
          type: 'error',
          text: 'Check prime powers! HCF = 2² × 3¹ = 12. LCM = 2³ × 3² = 72.'
        });
      }
    } else if (round === 1) {
      // Round 1: Division Ladder Method for 24 & 36
      // Side divisors: 2, 2, 3 -> HCF = 12. Remainders: 2, 3. LCM = 12 * 2 * 3 = 72.
      if (topVal.trim() === '12' && bottomVal.trim() === '72') {
        const newSteps = Array.from(new Set([...completedSteps, 0, 1, 2, 3, 4]));
        setCompletedSteps(newSteps);
        setFeedback({ type: 'success', text: '🎉 Excellent! Side divisors product = 12 (HCF), and Side × Bottom = 72 (LCM)!' });
      } else {
        setFeedback({
          type: 'error',
          text: 'Check the ladder: Side product (HCF) = 2×2×3 = 12. Full product (LCM) = 12×2×3 = 72.'
        });
      }
    }
  };

  const handleSpotMistake = (lineIdx) => {
    setSelectedMistakeLine(lineIdx);
    if (lineIdx === 3) {
      // Line 4 (index 3) is faulty: multiplied bottom remainders into HCF!
      setMistakeFixed(true);
      const newSteps = Array.from(new Set([...completedSteps, 0, 1, 2, 3, 4]));
      setCompletedSteps(newSteps);
      setFeedback({
        type: 'success',
        text: '✔ Correct! HCF is ONLY the product of side divisors (2 × 2 × 3 = 12). Bottom remainders are only multiplied for LCM!'
      });
    } else {
      setFeedback({
        type: 'error',
        text: 'Look closely at Line 4! Did Gearo multiply the bottom remainders (2 and 3) into the HCF by mistake?'
      });
    }
  };

  const handleNextRound = () => {
    if (round < 2) {
      setRound(round + 1);
    } else if (onStationComplete) {
      onStationComplete();
    }
  };

  const isRoundComplete = (round < 2 && (completedSteps.includes(2) || completedSteps.includes(4))) || (round === 2 && mistakeFixed);

  return (
    <div className={`p-6 bg-slate-900/90 rounded-3xl border border-slate-700 shadow-2xl max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-amber-400 flex items-center gap-2">
            <Hammer className="w-5 h-5 text-amber-400" /> Station C — Prime Tree & Division Ladder Forge
          </h2>
          <p className="text-xs text-slate-400">
            {round === 0 && 'Round 1 of 3 • Forge HCF & LCM for 24 & 36 using Prime Factor Trees'}
            {round === 1 && 'Round 2 of 3 • Forge HCF & LCM for 24 & 36 using the Division Ladder'}
            {round === 2 && 'Round 3 of 3 • Spot the Mistake & Fix the Trap!'}
          </p>
        </div>
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`w-3.5 h-3.5 rounded-full transition-all ${i === round ? 'bg-amber-400 scale-110 shadow-glow' : i < round ? 'bg-emerald-400' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>

      <Mascot mood={isRoundComplete ? 'happy' : 'thinking'} text={feedback?.text || "Work through the factor methods to calculate HCF and LCM!"} className="mb-6" />

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Left 5-step ladder */}
        <StepLadder currentStep={isRoundComplete ? 4 : currentStep} completedSteps={completedSteps} className="md:col-span-1" />

        {/* Right Active Workspace */}
        <div className="md:col-span-2 space-y-4">
          {round < 2 ? (
            <>
              <FormulaSlots
                questionType={round === 0 ? 'Prime Factor Method' : 'Ladder Method'}
                topOp="HCF Value"
                bottomOp="LCM Value"
                topValue={topVal}
                bottomValue={bottomVal}
                onTopChange={setTopVal}
                onBottomChange={setBottomVal}
              />

              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700 text-xs text-slate-300">
                <strong>Hint:</strong> {round === 0 ? '24 = 2³ × 3¹, 36 = 2² × 3². HCF = 2² × 3 = 12. LCM = 2³ × 3² = 72.' : 'Side divisors = 2, 2, 3 (Product HCF = 12). Bottom remainders = 2, 3 (LCM = 12 × 2 × 3 = 72).'}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleVerifyStep}
                  disabled={isRoundComplete}
                  className={`px-6 py-3 rounded-xl font-extrabold text-xs flex items-center gap-2 cursor-pointer transition-all ${
                    isRoundComplete
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" /> {isRoundComplete ? '✔ Verified!' : 'Forge & Verify'}
                </button>
              </div>
            </>
          ) : (
            /* Round 3: Spot the Mistake */
            <div className="bg-slate-800 p-6 rounded-3xl border border-rose-500/40 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-400" /> Tap the Faulty Step in Gearo's Ladder Method for (24, 36):
              </div>

              <div className="space-y-2 text-xs font-semibold">
                <div
                  onClick={() => handleSpotMistake(0)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${selectedMistakeLine === 0 ? 'bg-slate-700 border-slate-500' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
                >
                  Line 1: Divide 24 and 36 by 2 → [12, 18] (Side divisor = 2) ✔
                </div>
                <div
                  onClick={() => handleSpotMistake(1)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${selectedMistakeLine === 1 ? 'bg-slate-700 border-slate-500' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
                >
                  Line 2: Divide 12 and 18 by 2 → [6, 9] (Side divisor = 2) ✔
                </div>
                <div
                  onClick={() => handleSpotMistake(2)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${selectedMistakeLine === 2 ? 'bg-slate-700 border-slate-500' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
                >
                  Line 3: Divide 6 and 9 by 3 → [2, 3] (Side divisor = 3) ✔
                </div>
                <div
                  onClick={() => handleSpotMistake(3)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedMistakeLine === 3
                      ? 'bg-rose-950 border-rose-500 text-rose-200 font-bold shadow-glow'
                      : 'bg-slate-900 border-slate-700 hover:border-rose-400'
                  }`}
                >
                  Line 4: Gearo says: HCF = 2 × 2 × 3 × 2 × 3 = 72 ❌ (FAULTY! Multiplied remainders into HCF!)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Round Transition */}
      {isRoundComplete && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleNextRound}
            className="px-8 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-sm shadow-lg flex items-center gap-2 animate-bounceIn cursor-pointer"
          >
            {round < 2 ? 'Next Round →' : 'Complete Station C ✔'}
          </button>
        </div>
      )}
    </div>
  );
}

