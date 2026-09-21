// src/components/phases/SimulatePhase.jsx
// Phase 3: Simulate Phase Component (3 Simulation Stations)

import React, { useEffect } from 'react';
import RibbonCutterStation from '../simulations/RibbonCutterStation.jsx';
import BeatSyncStation from '../simulations/BeatSyncStation.jsx';
import FormulaForgeStation from '../simulations/FormulaForgeStation.jsx';
import { getStationIntroNarration } from '../../utils/narration.js';
import { Layers, Clock, Hammer, CheckCircle, ArrowRight } from 'lucide-react';

const STATIONS = [
  { id: 0, label: 'Station A — Equal Item Grouping', icon: Layers, color: 'blue' },
  { id: 1, label: 'Station B — Event Sync', icon: Clock, color: 'rose' },
  { id: 2, label: 'Station C — Factor Tree & Ladder', icon: Hammer, color: 'amber' }
];

export default function SimulatePhase({
  currentStation = 0,
  stationsComplete = [],
  onSelectStation,
  onStationComplete,
  onStationRoundResult,
  onFinishSimulate,
  playNarration,
  className = ''
}) {
  useEffect(() => {
    if (playNarration) {
      playNarration(getStationIntroNarration(currentStation));
    }
  }, [currentStation, playNarration]);

  const renderActiveStation = () => {
    switch (currentStation) {
      case 0:
        return (
          <RibbonCutterStation
            onStationComplete={() => onStationComplete(0)}
            onRoundResult={onStationRoundResult}
          />
        );
      case 1:
        return (
          <BeatSyncStation
            onStationComplete={() => onStationComplete(1)}
          />
        );
      case 2:
        return (
          <FormulaForgeStation
            onStationComplete={() => onStationComplete(2)}
          />
        );
      default:
        return null;
    }
  };

  const allStationsDone = stationsComplete.every(Boolean);

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${className}`}>
      {/* Station Navigation Tabs */}
      <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2">
        {STATIONS.map((st) => {
          const IconComp = st.icon;
          const isActive = currentStation === st.id;
          const isDone = stationsComplete[st.id];

          return (
            <button
              key={st.id}
              onClick={() => onSelectStation(st.id)}
              className={`flex-1 min-w-[180px] p-3.5 rounded-2xl border-2 font-extrabold text-xs flex items-center justify-between transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-slate-800 border-blue-400 text-white shadow-glow scale-102'
                  : isDone
                  ? 'bg-slate-900 border-emerald-500/50 text-emerald-300'
                  : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <IconComp className="w-4 h-4" />
                <span className="truncate">{st.label}</span>
              </div>
              {isDone && <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Active Station Component */}
      {renderActiveStation()}

      {/* Bottom Transition Gate */}
      {allStationsDone && (
        <div className="bg-emerald-950/80 border-2 border-emerald-500 p-6 rounded-3xl text-center space-y-4 shadow-2xl animate-bounceIn">
          <h3 className="text-xl font-extrabold text-emerald-300">🎉 All 3 Simulation Stations Completed!</h3>
          <p className="text-xs text-slate-200 max-w-lg mx-auto">
            You discovered the equal item grouping HCF rule, repeating event sync LCM rule, and forged factor trees & division ladders in Station C! You are ready for IntelliPlay practice!
          </p>
          <button
            onClick={onFinishSimulate}
            className="px-8 py-4 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-base rounded-2xl shadow-lg flex items-center gap-2 mx-auto cursor-pointer"
          >
            Unlock Play Phase <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

