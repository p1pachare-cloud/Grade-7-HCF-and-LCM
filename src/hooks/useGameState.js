// src/hooks/useGameState.js
// Global application state hook and reducer logic

import { useReducer, useEffect } from 'react';
import { buildSession, buildWorld } from '../utils/session.js';
import { calcXP, calcTotalStars } from '../utils/scoring.js';
import { checkBadges } from '../utils/badgeEngine.js';
import { useLocalStorage } from './useLocalStorage.js';

export const ACTIONS = {
  SET_PHASE: 'SET_PHASE',
  NEXT_STORY_PANEL: 'NEXT_STORY_PANEL',
  PREV_STORY_PANEL: 'PREV_STORY_PANEL',
  COMPLETE_CAPSULE: 'COMPLETE_CAPSULE',
  ADVANCE_SIM_STATION: 'ADVANCE_SIM_STATION',
  STATION_ROUND_RESULT: 'STATION_ROUND_RESULT',
  COMPLETE_SIM_STATION: 'COMPLETE_SIM_STATION',
  START_SESSION: 'START_SESSION',
  RETRY_WORLD: 'RETRY_WORLD',
  ANSWER_CORRECT: 'ANSWER_CORRECT',
  ANSWER_INCORRECT: 'ANSWER_INCORRECT',
  SHOW_NUDGE: 'SHOW_NUDGE',
  USE_HINT: 'USE_HINT',
  NEXT_QUESTION: 'NEXT_QUESTION',
  SELECT_WORLD: 'SELECT_WORLD',
  TOGGLE_AUDIO: 'TOGGLE_AUDIO',
  RESET_SESSION: 'RESET_SESSION',
  RESTORE_STATE: 'RESTORE_STATE'
};

const initialState = {
  phase: 'intro', // 'intro'|'wonder'|'story'|'simulate'|'play'|'reflect'|'results'
  storyPanel: 0,
  capsulesDone: [true, true, true, true, true],
  currentSimStation: 0,
  simStationsComplete: [false, false, false],
  simRound: 0,
  stationAFirstTry: [null, null, null],
  stationAZeroWaste: false,

  seed: null,
  worlds: [],
  currentWorld: 0,
  currentQuestion: 0,
  worldScores: Array(10).fill(null),
  worldAttempts: Array(10).fill(0),
  attemptCount: 0,
  hintsUsed: 0,
  nudgeUsed: false,

  xp: 0,
  totalStars: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],
  syncCorrect: 0,

  phaseComplete: {
    wonder: false,
    story: false,
    simulate: false,
    play: false,
    reflect: false
  },

  audioEnabled: true
};

function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_PHASE: {
      const targetPhase = action.payload;

      let updatedPhaseComplete = { ...state.phaseComplete };
      if (state.phase === 'wonder') updatedPhaseComplete.wonder = true;
      if (state.phase === 'story') updatedPhaseComplete.story = true;
      if (state.phase === 'simulate') updatedPhaseComplete.simulate = true;
      if (state.phase === 'play') updatedPhaseComplete.play = true;

      const newState = {
        ...state,
        phase: targetPhase,
        phaseComplete: updatedPhaseComplete
      };
      return {
        ...newState,
        badges: checkBadges(newState)
      };
    }

    case ACTIONS.NEXT_STORY_PANEL:
      return {
        ...state,
        storyPanel: Math.min(6, state.storyPanel + 1)
      };

    case ACTIONS.PREV_STORY_PANEL:
      return {
        ...state,
        storyPanel: Math.max(0, state.storyPanel - 1)
      };

    case ACTIONS.COMPLETE_CAPSULE: {
      const index = action.payload;
      const updatedCapsules = state.capsulesDone.map((v, i) => (i === index ? true : v));
      const allDone = updatedCapsules.every(Boolean);
      const updatedPhaseComplete = { ...state.phaseComplete, story: allDone ? true : state.phaseComplete.story };
      const newState = {
        ...state,
        capsulesDone: updatedCapsules,
        phaseComplete: updatedPhaseComplete
      };
      return {
        ...newState,
        badges: checkBadges(newState)
      };
    }

    case ACTIONS.STATION_ROUND_RESULT: {
      const { station, round, firstTry } = action.payload;
      if (station === 0) {
        const updatedFirstTry = [...state.stationAFirstTry];
        updatedFirstTry[round] = firstTry;
        const zeroWaste = updatedFirstTry.every((v) => v === true);
        const newState = {
          ...state,
          stationAFirstTry: updatedFirstTry,
          stationAZeroWaste: zeroWaste
        };
        return {
          ...newState,
          badges: checkBadges(newState)
        };
      }
      return state;
    }

    case ACTIONS.COMPLETE_SIM_STATION: {
      const stationIdx = action.payload;
      const updatedStations = state.simStationsComplete.map((v, i) => (i === stationIdx ? true : v));
      const newState = {
        ...state,
        simStationsComplete: updatedStations,
        currentSimStation: Math.min(2, stationIdx + 1)
      };
      return {
        ...newState,
        badges: checkBadges(newState)
      };
    }

    case ACTIONS.START_SESSION: {
      if (state.worlds.length > 0 && state.seed) return state;
      const session = buildSession();
      return {
        ...state,
        seed: session.seed,
        worlds: session.worlds
      };
    }

    case ACTIONS.RETRY_WORLD: {
      const wIdx = action.payload;
      const rng = { next: () => Math.random(), int: (a, b) => a + Math.floor(Math.random() * (b - a + 1)), pick: (xs) => xs[Math.floor(Math.random() * xs.length)], shuffle: (xs) => [...xs].sort(() => Math.random() - 0.5) };
      const freshWorld = buildWorld(wIdx, rng);
      const updatedWorlds = [...state.worlds];
      updatedWorlds[wIdx] = freshWorld;
      const updatedAttempts = [...state.worldAttempts];
      updatedAttempts[wIdx] += 1;
      const updatedScores = [...state.worldScores];
      updatedScores[wIdx] = null;
      return {
        ...state,
        worlds: updatedWorlds,
        worldAttempts: updatedAttempts,
        worldScores: updatedScores,
        currentQuestion: 0,
        attemptCount: 0,
        hintsUsed: 0,
        nudgeUsed: false
      };
    }

    case ACTIONS.ANSWER_CORRECT: {
      const currentQ = state.worlds[state.currentWorld]?.[state.currentQuestion];
      const xpEarned = calcXP(state.attemptCount + 1, state.hintsUsed, state.streak);
      const newStreak = state.streak + 1;
      const scores = [...state.worldScores];
      scores[state.currentWorld] = (scores[state.currentWorld] ?? 0) + 1;

      const isSyncQuestion = currentQ && (currentQ.type === 'lcm_prime' || currentQ.type === 'lcm_ladder' || currentQ.type === 'word_cycle');
      const newState = {
        ...state,
        xp: state.xp + xpEarned,
        streak: newStreak,
        maxStreak: Math.max(state.maxStreak, newStreak),
        worldScores: scores,
        totalStars: calcTotalStars(scores),
        syncCorrect: state.syncCorrect + (isSyncQuestion ? 1 : 0),
        hintsUsed: 0,
        attemptCount: 0,
        nudgeUsed: false
      };
      return {
        ...newState,
        badges: checkBadges(newState)
      };
    }

    case ACTIONS.ANSWER_INCORRECT:
      return {
        ...state,
        streak: 0,
        attemptCount: state.attemptCount + 1
      };

    case ACTIONS.SHOW_NUDGE:
      return {
        ...state,
        nudgeUsed: true
      };

    case ACTIONS.USE_HINT:
      return {
        ...state,
        hintsUsed: state.hintsUsed + 1
      };

    case ACTIONS.NEXT_QUESTION: {
      const nextQ = state.currentQuestion + 1;
      if (nextQ < 10) {
        return {
          ...state,
          currentQuestion: nextQ,
          attemptCount: 0,
          hintsUsed: 0,
          nudgeUsed: false
        };
      }
      return state;
    }

    case ACTIONS.SELECT_WORLD:
      return {
        ...state,
        currentWorld: action.payload,
        currentQuestion: 0,
        attemptCount: 0,
        hintsUsed: 0,
        nudgeUsed: false
      };

    case ACTIONS.TOGGLE_AUDIO:
      return {
        ...state,
        audioEnabled: !state.audioEnabled
      };

    case ACTIONS.RESTORE_STATE:
      return {
        ...state,
        ...action.payload
      };

    case ACTIONS.RESET_SESSION: {
      const freshSession = buildSession();
      return {
        ...initialState,
        seed: freshSession.seed,
        worlds: freshSession.worlds
      };
    }

    default:
      return state;
  }
}

export function useGameState() {
  const [savedState, setSavedState] = useLocalStorage('intellia_grade7_hcf_lcm_v2_state', null);
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    if (savedState && savedState.seed) {
      dispatch({ type: ACTIONS.RESTORE_STATE, payload: savedState });
    } else {
      dispatch({ type: ACTIONS.START_SESSION });
    }
  }, []);

  useEffect(() => {
    if (state.seed) {
      setSavedState(state);
    }
  }, [state, setSavedState]);

  return [state, dispatch];
}
