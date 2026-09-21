// src/App.jsx
// Root Application Component with cyber space gradient background and floating tokens

import React, { useState } from 'react';
import ProgressMap from './components/ProgressMap.jsx';
import RuleCard from './components/shared/RuleCard.jsx';
import IntroScreen from './components/IntroScreen.jsx';
import WonderPhase from './components/phases/WonderPhase.jsx';
import StoryPhase from './components/phases/StoryPhase.jsx';
import SimulatePhase from './components/phases/SimulatePhase.jsx';
import PlayPhase from './components/phases/PlayPhase.jsx';
import ReflectPhase from './components/phases/ReflectPhase.jsx';
import { useGameState, ACTIONS } from './hooks/useGameState.js';
import { useAudio } from './hooks/useAudio.js';
import './App.css';

const FLOATING_TOKENS = [
  { text: '12', left: '8%', top: '15%', delay: '0s' },
  { text: 'HCF', left: '85%', top: '20%', delay: '2s' },
  { text: '18', left: '78%', top: '65%', delay: '4s' },
  { text: 'LCM', left: '12%', top: '75%', delay: '1s' },
  { text: '36', left: '92%', top: '45%', delay: '3s' },
  { text: 'LCD', left: '5%', top: '45%', delay: '5s' },
  { text: '24', left: '70%', top: '85%', delay: '2.5s' },
  { text: '6', left: '25%', top: '88%', delay: '3.5s' },
];

export default function App() {
  const [state, dispatch] = useGameState();
  const { muted, toggleAudio, playNarration } = useAudio(!state.audioEnabled);
  const [showRuleCard, setShowRuleCard] = useState(false);

  const handleSelectPhase = (phaseId) => {
    dispatch({ type: ACTIONS.SET_PHASE, payload: phaseId });
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* Background Floating Math Tokens Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {FLOATING_TOKENS.map((tok, idx) => (
          <div
            key={idx}
            style={{ left: tok.left, top: tok.top, animationDelay: tok.delay }}
            className="absolute text-cyan-400/20 font-black text-xl sm:text-3xl animate-floatSlow select-none blur-[0.5px]"
          >
            {tok.text}
          </div>
        ))}
      </div>

      {/* Top Navigation Progress Tracker (shown during lesson phases) */}
      {state.phase !== 'intro' && (
        <ProgressMap
          currentPhase={state.phase}
          phaseComplete={state.phaseComplete}
          onSelectPhase={handleSelectPhase}
          xp={state.xp}
          streak={state.streak}
          totalStars={state.totalStars}
          audioMuted={muted}
          onToggleAudio={toggleAudio}
          onOpenRuleCard={() => setShowRuleCard(true)}
          badges={state.badges}
        />
      )}

      {/* Collectible Guild Rule Card Modal */}
      <RuleCard
        isOpen={showRuleCard}
        onClose={() => setShowRuleCard(false)}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        {state.phase === 'intro' && (
          <IntroScreen
            onStart={(targetPhase) => dispatch({ type: ACTIONS.SET_PHASE, payload: typeof targetPhase === 'string' ? targetPhase : 'wonder' })}
            audioMuted={muted}
            onToggleAudio={toggleAudio}
          />
        )}

        {state.phase === 'wonder' && (
          <WonderPhase
            onNext={() => dispatch({ type: ACTIONS.SET_PHASE, payload: 'story' })}
            playNarration={playNarration}
          />
        )}

        {state.phase === 'story' && (
          <StoryPhase
            storyPanel={state.storyPanel}
            capsulesDone={state.capsulesDone}
            onNextPanel={() => dispatch({ type: ACTIONS.NEXT_STORY_PANEL })}
            onPrevPanel={() => dispatch({ type: ACTIONS.PREV_STORY_PANEL })}
            onCompleteCapsule={(index) => dispatch({ type: ACTIONS.COMPLETE_CAPSULE, payload: index })}
            onFinishStory={() => dispatch({ type: ACTIONS.SET_PHASE, payload: 'simulate' })}
            playNarration={playNarration}
            onOpenRuleCard={() => setShowRuleCard(true)}
          />
        )}

        {state.phase === 'simulate' && (
          <SimulatePhase
            currentStation={state.currentSimStation}
            stationsComplete={state.simStationsComplete}
            onSelectStation={(idx) => dispatch({ type: ACTIONS.ADVANCE_SIM_STATION, payload: idx })}
            onStationComplete={(idx) => dispatch({ type: ACTIONS.COMPLETE_SIM_STATION, payload: idx })}
            onStationRoundResult={(res) => dispatch({ type: ACTIONS.STATION_ROUND_RESULT, payload: res })}
            onFinishSimulate={() => dispatch({ type: ACTIONS.SET_PHASE, payload: 'play' })}
            playNarration={playNarration}
          />
        )}

        {state.phase === 'play' && (
          <PlayPhase
            worlds={state.worlds}
            currentWorld={state.currentWorld}
            currentQuestion={state.currentQuestion}
            worldScores={state.worldScores}
            attemptCount={state.attemptCount}
            hintsUsed={state.hintsUsed}
            xp={state.xp}
            streak={state.streak}
            onSelectWorld={(wIdx) => dispatch({ type: ACTIONS.SELECT_WORLD, payload: wIdx })}
            onAnswerCorrect={() => dispatch({ type: ACTIONS.ANSWER_CORRECT })}
            onAnswerIncorrect={() => dispatch({ type: ACTIONS.ANSWER_INCORRECT })}
            onShowNudge={() => dispatch({ type: ACTIONS.SHOW_NUDGE })}
            onUseHint={() => dispatch({ type: ACTIONS.USE_HINT })}
            onNextQuestion={() => dispatch({ type: ACTIONS.NEXT_QUESTION })}
            onRetryWorld={(wIdx) => dispatch({ type: ACTIONS.RETRY_WORLD, payload: wIdx })}
            onOpenRuleCard={() => setShowRuleCard(true)}
            playNarration={playNarration}
          />
        )}

        {(state.phase === 'reflect' || state.phase === 'results') && (
          <ReflectPhase
            badges={state.badges}
            xp={state.xp}
            totalStars={state.totalStars}
            playNarration={playNarration}
            onResetSession={() => dispatch({ type: ACTIONS.RESET_SESSION })}
          />
        )}
      </main>

      {/* Footer Branding Line */}
      <footer className="w-full bg-slate-950/90 border-t border-slate-800/80 px-4 py-3 text-center text-xs text-slate-500 relative z-10 backdrop-blur-md">
        Intellia — Think. Explore. Become. • Grade 7 Global Mathematics Curriculum
      </footer>
    </div>
  );
}
