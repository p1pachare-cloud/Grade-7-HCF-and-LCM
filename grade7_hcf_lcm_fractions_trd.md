# Technical Requirements Document (TRD)

## HCF & LCM Using Fractions — Simplify, Share, Sync | Grade 7 Math

### Intellia SG | Global Grade 7 Mathematics Curriculum

---

## 1. Technical Overview

This document specifies the architecture, component design, state management, data models, math and question engines, simulation logic, gamification, audio pipeline, and quality standards for **"Global Fraction Guild — HCF & LCM with Fractions"**, an interactive lesson module for Grade 7 Math.

The module is a **React 18 application (Vite 5 + JSX + Tailwind 3.4 + lucide-react)**, structured identically to the reference repository **<https://github.com/p1pachare-cloud/Grade5-Time-Intervals>** and styled to strictly match **<https://grade5-time-intervals.vercel.app/>**. It is uploaded to the Intellia course area matching **<https://intelliasg.com/courses/grade-3-math>** (route configurable — see §16).

Three design decisions shape this TRD:

1. **Exact rational arithmetic everywhere.** Every value (ribbon lengths, beat periods, answers) is a `{n, d}` pair of integers. Floating point is used *only* for pixels and the animation clock — never for math or answer checking.
2. **Procedural question generation with an independent solver.** There is no fixed question bank. Every question is generated from a template, then re-solved by a second, different method before it is shown.
3. **Spoken text is derived, not hand-written.** A deterministic `toSpeech()` function turns on-screen math into TTS-safe words; its output is the audio-map key. This preserves the reference pipeline's strict 1:1 parity rule for mathematical text.

Audio uses **ElevenLabs exclusively** (no Web Speech API), implementing the pipeline in `audio_generation_pipeline.md`.

> **Reference implementation status:** The six utility modules included in full below — `fractionMath.js`, `questionGenerator.js`, `session.js`, `answerCheck.js`, `sim.js` and `toSpeech.js` — were executed in Node 22 while writing this document, together with the property tests summarised in §6.7 and §15. Everything else (reducer snippets, React components, audio engine, serverless proxy, `selfCheck`) is specification-level and has **not** been run.

---

## 2. Technology Stack

| Layer | Technology | Rationale |
| ----- | ---------- | --------- |
| UI framework | React 18 (JSX), Vite 5 | Same as the reference `package.json` |
| Styling | Tailwind CSS 3.4 + PostCSS + Autoprefixer | Same as the reference |
| Icons | lucide-react | Same as the reference |
| State | `useReducer` + `useState`; custom hooks | Sufficient for a single module |
| Math | Vanilla JS integer arithmetic (`fractionMath.js`) | No floats; no dependency |
| Randomness | Seeded `mulberry32` PRNG; seed from `crypto.getRandomValues` | Reproducible QA sessions |
| Animation | CSS keyframes + `requestAnimationFrame` for Station B | Same keyframes as the reference |
| Diagrams | Inline SVG React components | Fraction bars, ribbons, timelines |
| Drag & drop | HTML5 drag events + tap-tap fallback | Same interaction pattern as the reference |
| Persistence | `localStorage` (progress, 24 h) + IndexedDB (audio cache) | No backend |
| Audio (primary) | ElevenLabs — Alice, `eleven_multilingual_v2` | Per `audio_generation_pipeline.md` |
| Audio (playback) | HTML5 `Audio` | Browser-native |
| Serverless | Vercel function `api/elevenlabs.js` | Keeps the API key out of the client |
| Testing | Vitest, React Testing Library, jsdom, Playwright (smoke) | Unit + property + UI + e2e |
| Build tool | Vite | Matches the reference |

**Proposed `package.json`** (same shape as the reference; only dev tooling added):

```json
{
  "name": "grade7-hcf-lcm-fractions",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "audio:generate": "node scripts/generate_audio.js",
    "audio:clean": "node scripts/clean_audio.js"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@testing-library/react": "^14.2.0",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "jsdom": "^24.0.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.6",
    "vitest": "^1.4.0"
  }
}
```

---

## 3. Project Structure (mirrors the reference repository)

```
grade7-hcf-lcm-fractions/
├── public/
│   └── assets/
│       ├── audio/                          # Pre-generated .mp3 (ElevenLabs), slugified names
│       └── images/                         # mascot-*.svg (Gearo), world backdrops, city pins
├── src/
│   ├── main.jsx
│   ├── App.jsx                             # Root; global state (useReducer)
│   ├── App.css                             # Global styles + keyframes (copied from reference)
│   ├── components/
│   │   ├── IntroScreen.jsx
│   │   ├── ProgressMap.jsx                 # 6-phase dot tracker (top bar)
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx
│   │   │   ├── StoryPhase.jsx              # 7 panels + 5 Learn Capsules
│   │   │   ├── SimulatePhase.jsx
│   │   │   ├── PlayPhase.jsx               # IntelliPlay quiz engine
│   │   │   └── ReflectPhase.jsx
│   │   ├── capsules/
│   │   │   ├── PrimeVennCapsule.jsx        # Capsule 1
│   │   │   ├── SimplifyCapsule.jsx         # Capsule 2
│   │   │   ├── LcdSliderCapsule.jsx        # Capsule 3
│   │   │   ├── ThreeWaysCapsule.jsx        # Capsule 4 (HCF of fractions)
│   │   │   └── MeetUpCapsule.jsx           # Capsule 5 (LCM of fractions)
│   │   ├── simulations/
│   │   │   ├── RibbonCutterStation.jsx     # Station A
│   │   │   ├── BeatSyncStation.jsx         # Station B
│   │   │   └── FormulaForgeStation.jsx     # Station C
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx        # Dispatcher by q.format
│   │   │   ├── McqQuestion.jsx
│   │   │   ├── NumberInputQuestion.jsx
│   │   │   ├── FractionInputQuestion.jsx
│   │   │   ├── OrderingQuestion.jsx
│   │   │   ├── TrueFalseQuestion.jsx
│   │   │   └── HintOverlay.jsx             # Hint 1, Hint 2 (visual), worked solution
│   │   ├── gamification/
│   │   │   ├── XPTracker.jsx
│   │   │   ├── StarRating.jsx
│   │   │   ├── BadgePanel.jsx
│   │   │   ├── StreakCounter.jsx
│   │   │   └── WorldMap.jsx                # 10-city horizontal map with locks
│   │   └── shared/
│   │       ├── Mascot.jsx                  # Gearo (6 moods)
│   │       ├── Frac.jsx                    # Accessible stacked fraction
│   │       ├── FractionBar.jsx
│   │       ├── CommonGrid.jsx
│   │       ├── RibbonBar.jsx
│   │       ├── BeatTrack.jsx
│   │       ├── SyncTimeline.jsx
│   │       ├── PrimeVenn.jsx
│   │       ├── FactorTree.jsx
│   │       ├── FormulaSlots.jsx
│   │       ├── StepLadder.jsx
│   │       ├── FractionInput.jsx           # numerator / denominator / optional whole
│   │       ├── RuleCard.jsx                # Guild Rule Card
│   │       └── FeedbackOverlay.jsx
│   ├── data/
│   │   ├── worlds.js                       # World blueprints (§6.3)
│   │   ├── storyContent.js                 # Panel text (display form with {n/d} tokens)
│   │   ├── capsuleContent.js               # Capsule micro-checks
│   │   └── misconceptions.js               # M1–M9 → feedback line + hint id
│   ├── hooks/
│   │   ├── useAudio.js
│   │   ├── useGameState.js
│   │   ├── useLocalStorage.js              # 24 h progress resume
│   │   └── useSyncClock.js                 # Station B animation clock
│   └── utils/
│       ├── audio.js                        # Playback engine (segment helpers, narrate, preload)
│       ├── audioMap.js                     # AUTO-GENERATED: spoken text → .mp3 path
│       ├── audioCache.js                   # IndexedDB cache for dynamic audio
│       ├── narration.js                    # Phase scripts using segment helpers
│       ├── styleSettings.js                # STYLE_SETTINGS (§8.2) — shared by scripts, engine and proxy
│       ├── toSpeech.js                     # Display → spoken text (§8.3)
│       ├── fractionMath.js                 # Exact rational engine (§5)
│       ├── questionGenerator.js            # 10 template generators (§6.2)
│       ├── session.js                      # World blueprints + session builder (§6.3)
│       ├── answerCheck.js                  # Fraction answer rules (§6.4)
│       ├── sim.js                          # Station A/B pure logic (§7)
│       ├── scoring.js                      # XP + stars
│       └── badgeEngine.js
├── scripts/
│   ├── generate_audio.js                   # Offline ElevenLabs pre-generation
│   └── clean_audio.js                      # Remove orphaned .mp3
├── api/
│   └── elevenlabs.js                       # Serverless proxy (key stays server-side)
├── tests/                                  # Vitest (unit, property, parity)
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js                      # COPIED from the reference — do not re-theme
├── vite.config.js
├── vercel.json
└── .gitignore
```

---

## 4. Application State Architecture

### 4.1 Global state (`App.jsx` — `useReducer`)

```js
const initialState = {
  // Navigation
  phase: 'intro',                // 'intro'|'wonder'|'story'|'simulate'|'play'|'reflect'|'results'
  storyPanel: 0,                 // 0–6 (7 panels)
  capsulesDone: [false, false, false, false, false],   // Learn Capsules 1–5
  currentSimStation: 0,          // 0=RibbonCutter, 1=BeatSync, 2=FormulaForge
  simStationsComplete: [false, false, false],
  simRound: 0,                   // 0–2 within a station
  stationAFirstTry: [null, null, null],  // Zero Waste badge tracking (true/false per round)

  // Play
  seed: null,                    // session seed (uint32)
  worlds: [],                    // 10 arrays of 10 generated Question objects
  currentWorld: 0,               // 0–9
  currentQuestion: 0,            // 0–9 within the world
  worldScores: Array(10).fill(null),   // correct count per world (null = not played)
  worldAttempts: Array(10).fill(0),    // retries (each retry regenerates the world)
  attemptCount: 0,               // attempts on the current question (max 3)
  hintsUsed: 0,
  nudgeUsed: false,              // "right value, not lowest terms" nudge already shown

  // Gamification
  xp: 0, totalStars: 0, streak: 0, maxStreak: 0,
  badges: [],
  syncCorrect: 0,                // QT7 + QT10 correct (Rhythm Sync)
  stationAZeroWaste: false,
  bonusUnlocked: Array(10).fill(false),

  // Progress
  phaseComplete: { wonder: false, story: false, simulate: false, play: false, reflect: false },
  sessionId: crypto.randomUUID(),

  // Settings
  audioEnabled: true,
  musicEnabled: false,
};
```

### 4.2 Reducer action types

```js
const ACTIONS = {
  SET_PHASE: 'SET_PHASE',
  NEXT_STORY_PANEL: 'NEXT_STORY_PANEL',
  COMPLETE_CAPSULE: 'COMPLETE_CAPSULE',          // payload: index 0–4
  ADVANCE_SIM_STATION: 'ADVANCE_SIM_STATION',
  STATION_ROUND_RESULT: 'STATION_ROUND_RESULT',  // payload: { station, round, firstTry }
  COMPLETE_SIM_STATION: 'COMPLETE_SIM_STATION',
  START_SESSION: 'START_SESSION',                // builds all 10 worlds from the seed
  RETRY_WORLD: 'RETRY_WORLD',                    // regenerates that world with fresh keys
  ANSWER_CORRECT: 'ANSWER_CORRECT',
  ANSWER_INCORRECT: 'ANSWER_INCORRECT',
  SHOW_NUDGE: 'SHOW_NUDGE',                      // equivalent-but-not-lowest-terms (no attempt used)
  USE_HINT: 'USE_HINT',
  NEXT_QUESTION: 'NEXT_QUESTION',
  FINISH_WORLD: 'FINISH_WORLD',
  UNLOCK_BADGE: 'UNLOCK_BADGE',
  COMPLETE_PHASE: 'COMPLETE_PHASE',
  TOGGLE_AUDIO: 'TOGGLE_AUDIO',
  TOGGLE_MUSIC: 'TOGGLE_MUSIC',
  RESTORE_SESSION: 'RESTORE_SESSION',
  RESET_SESSION: 'RESET_SESSION',
};
```

### 4.3 Key reducer logic

```js
case ACTIONS.ANSWER_CORRECT: {
  const q = state.worlds[state.currentWorld][state.currentQuestion];
  const xpEarned = calcXP(state.attemptCount + 1, state.hintsUsed, state.streak);
  const newStreak = state.streak + 1;
  const scores = [...state.worldScores];
  scores[state.currentWorld] = (scores[state.currentWorld] ?? 0) + 1;
  return {
    ...state,
    xp: state.xp + xpEarned,
    streak: newStreak,
    maxStreak: Math.max(state.maxStreak, newStreak),
    worldScores: scores,
    totalStars: calcTotalStars(scores),
    syncCorrect: state.syncCorrect + (q.type === 'lcm_fractions' || q.type === 'word_cycle' ? 1 : 0),
    hintsUsed: 0, attemptCount: 0, nudgeUsed: false,
  };
}

case ACTIONS.ANSWER_INCORRECT:
  return { ...state, streak: 0, attemptCount: state.attemptCount + 1 };

case ACTIONS.SHOW_NUDGE:            // right value, not in lowest terms — first time only, free
  return { ...state, nudgeUsed: true };

case ACTIONS.COMPLETE_CAPSULE: {
  const capsulesDone = state.capsulesDone.map((v, i) => (i === action.payload ? true : v));
  return { ...state, capsulesDone };
}
```

**Gates (enforced in the reducer, not only in the UI):**

- `SET_PHASE → 'simulate'` is rejected unless `capsulesDone.every(Boolean)`.
- `SET_PHASE → 'play'` is rejected unless `simStationsComplete.every(Boolean)`.
- `START_SESSION` is dispatched once when entering Play (or after `RESET_SESSION`).

---

## 5. Fraction Math Engine (`utils/fractionMath.js`)

All arithmetic uses **integer `{n, d}` pairs kept in lowest terms with positive denominators**. Nothing in the app converts to decimals for computation or comparison.

The two rules implemented below are proved (and property-tested) in §15:

```
HCF( a/b , c/d , … ) = HCF(a, c, …) ÷ LCM(b, d, …)     — all fractions in lowest terms
LCM( a/b , c/d , … ) = LCM(a, c, …) ÷ HCF(b, d, …)     — all fractions in lowest terms
```

`viaCommonDenominator()` is the **independent second method** (write over `D = LCM(denominators)`, then take HCF/LCM of the numerators). It powers the generator self-check (§6.5), the Station A/B visuals, and the tests.

```js
// src/utils/fractionMath.js
export const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
export const lcm = (a, b) => (a / gcd(a, b)) * b;
export const gcdAll = (xs) => xs.reduce(gcd);
export const lcmAll = (xs) => xs.reduce(lcm);

export const frac = (n, d = 1) => {
  if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0) throw new Error('bad fraction');
  const g = gcd(n, d) || 1, s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
};
export const isLowestTerms = ({ n, d }) => gcd(n, d) === 1;
export const eq = (a, b) => a.n * b.d === b.n * a.d;
export const add = (a, b) => frac(a.n * b.d + b.n * a.d, a.d * b.d);
export const sub = (a, b) => frac(a.n * b.d - b.n * a.d, a.d * b.d);
export const mul = (a, b) => frac(a.n * b.n, a.d * b.d);
export const div = (a, b) => frac(a.n * b.d, a.d * b.n);
export const cmp = (a, b) => a.n * b.d - b.n * a.d;

// Rule 1: HCF of fractions = HCF(numerators) / LCM(denominators)   (all in lowest terms)
export function hcfFractions(fs) {
  const r = fs.map((f) => frac(f.n, f.d));
  return frac(gcdAll(r.map((f) => f.n)), lcmAll(r.map((f) => f.d)));
}
// Rule 2: LCM of fractions = LCM(numerators) / HCF(denominators)   (all in lowest terms)
export function lcmFractions(fs) {
  const r = fs.map((f) => frac(f.n, f.d));
  return frac(lcmAll(r.map((f) => f.n)), gcdAll(r.map((f) => f.d)));
}
// Independent cross-check via common denominator (used in tests + Station A/B visuals)
export function viaCommonDenominator(fs) {
  const r = fs.map((f) => frac(f.n, f.d));
  const D = lcmAll(r.map((f) => f.d));
  const N = r.map((f) => (f.n * D) / f.d);
  return { D, N, hcf: frac(gcdAll(N), D), lcm: frac(lcmAll(N), D) };
}
export const timesFits = (multiple, unit) => { const q = div(multiple, unit); return q.d === 1 ? q.n : null; };
```

**Why a result is always in lowest terms** (useful for reviewers): if a prime `p` divided both `HCF(numerators)` and `LCM(denominators)`, it would divide every numerator and some denominator `dⱼ`, so `p | nⱼ` and `p | dⱼ` — contradicting `nⱼ/dⱼ` being in lowest terms. The LCM rule is symmetric.

---

## 6. Question Engine

### 6.1 Question schema

```ts
type QuestionType =
  | 'hcf_whole'          // QT1
  | 'simplify_fraction'  // QT2
  | 'lcm_whole'          // QT3
  | 'compare_fractions'  // QT4 (LCD value at diff 1; ordering at diff 2–3)
  | 'add_sub_unlike'     // QT5
  | 'hcf_fractions'      // QT6
  | 'lcm_fractions'      // QT7
  | 'relationship'       // QT8 (T/F claim or missing HCF/LCM)
  | 'word_cut'           // QT9
  | 'word_cycle';        // QT10

type Format = 'mcq' | 'numberInput' | 'fractionInput' | 'ordering' | 'trueFalse';
type Frac = { n: number; d: number };            // lowest terms, d > 0

interface Question {
  id: string;                 // "W6Q4"
  type: QuestionType;
  world: number;              // 0–9
  diff: 1 | 2 | 3;
  spiral: boolean;            // true for the 3 review items per world (worlds 2–10)
  format: Format;

  stem: string;               // DISPLAY text with {n/d} fraction tokens
  spoken: string;             // toSpeech(stem) — the audio-map key

  answer: Frac | number | boolean | Frac[];        // Frac[] for ordering
  options?: { v: Frac | number; tag: string }[];    // mcq: tag = 'correct' | misconception id | 'near'
  items?: Frac[];             // ordering: shuffled tiles
  fractions?: Frac[];         // lowest-terms operands (used by hints / visuals)
  shown?: Frac[];             // operands as displayed (differs when `trap` is true)
  trap?: boolean;             // one operand shown NOT in lowest terms

  requireLowest?: boolean;    // fractionInput: nudge if not in lowest terms
  allowImproper?: boolean;    // fractionInput: improper fraction or mixed number accepted

  key: string;                // canonical key for de-duplication (§6.3)
}
```

Hints, explanations and misconception feedback are **derived at render time** from `type`, the operands and the chosen distractor's `tag` (see `data/misconceptions.js`); they are never stored in the question object, so they can never drift from the numbers.

### 6.2 Generators (`utils/questionGenerator.js`)

Ten template generators — one per question type — share a PRNG, difficulty tables (`DENS`, `LCM_CAP`, `RES_CAP`), a `fractionSet()` sampler that returns friendly numbers with shared denominator factors, and an `mcq()` builder that guarantees **exactly four unique options, one correct, with misconception-tagged distractors**.

Key design points:

- **Friendly numbers:** denominators come from small pools per difficulty; results are size-capped (`RES_CAP`), pieces ≤ 60, cycle counts ≤ 40.
- **Trap items (difficulty 3, HCF/LCM of fractions):** one operand is *displayed* as an unsimplified multiple (e.g., `2/8`); the answer is computed from the simplified operand. The distractor `notSimplifiedFirst` is what a student gets by applying the rule to the unsimplified numbers (M4).
- **Distractor tags** map 1:1 to the PRD's misconception catalogue (M1–M9), so the feedback line names the exact idea to revisit.
- **Bounded retry:** generators recurse with the same PRNG when a candidate violates a cap, so output stays deterministic for a given seed.

```js
// src/utils/questionGenerator.js
import { gcd, lcm, gcdAll, lcmAll, frac, add, sub, cmp, eq, hcfFractions, lcmFractions, isLowestTerms } from './fractionMath.js';

export const NAMES = [['John','London'],['Mike','New York'],['Sarah','Sydney'],['Emma','Toronto'],['Liam','Dublin'],['Sofia','Madrid'],['Noah','Berlin'],['Aisha','Cairo'],['Carlos','Mexico City'],['Yuki','Tokyo'],['Priya','Mumbai'],['Fatima','Dubai'],['Diego','Buenos Aires'],['Chloe','Paris'],['Ravi','Singapore'],['Amara','Lagos'],['Mei','Shanghai'],['Lars','Stockholm']];

export function makeRng(seed) {
  let a = seed >>> 0;
  const next = () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const int = (lo, hi) => lo + Math.floor(next() * (hi - lo + 1));
  const pick = (xs) => xs[int(0, xs.length - 1)];
  const shuffle = (xs) => { const r = [...xs]; for (let i = r.length - 1; i > 0; i--) { const j = int(0, i); [r[i], r[j]] = [r[j], r[i]]; } return r; };
  return { next, int, pick, shuffle };
}

const S = (f) => `{${f.n}/${f.d}}`;             // fraction display token
const fkey = (f) => `${f.n}/${f.d}`;
const DENS = { 1: [2, 3, 4, 5, 6, 8, 10], 2: [3, 4, 5, 6, 8, 9, 10, 12, 15], 3: [4, 5, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 24] };
const LCM_CAP = { 1: 24, 2: 60, 3: 120 };
const RES_CAP = { 1: 36, 2: 80, 3: 150 };   // keeps answer numerators/denominators student-friendly
function fractionSet(r, diff, k, { lo = 1 / 6, hi = 3 } = {}) {   // k distinct lowest-terms fractions with friendly numbers
  for (let tries = 0; tries < 500; tries++) {
    const fs = [];
    while (fs.length < k) {
      const d = r.pick(DENS[diff]), n = r.int(1, Math.min(2 * d, 20)), v = n / d;
      if (gcd(n, d) === 1 && n !== d && v >= lo && v <= hi && !fs.some((x) => eq(x, { n, d }))) fs.push({ n, d });
    }
    const Lf = lcmFractions(fs), Hf = hcfFractions(fs);
    if (lcmAll(fs.map((f) => f.d)) <= LCM_CAP[diff] && gcdAll(fs.map((f) => f.d)) >= (diff === 1 ? 1 : 2) && Lf.n <= RES_CAP[diff] && Hf.d <= LCM_CAP[diff]) return fs;   // shared factor => richer HCF/LCM
  } throw new Error('fractionSet failed');
}
const lowestFrac = (r, diff, maxN = 15) => { for (;;) { const d = r.pick(DENS[diff]), n = r.int(1, Math.min(maxN, d * 2)); if (gcd(n, d) === 1 && n !== d) return { n, d }; } };
// Unique-options builder: correct answer + misconception-tagged distractors, always 4 unique options
function mcq(r, correct, tagged, show, filler) {
  const seen = new Set([show(correct)]), opts = [{ v: correct, tag: 'correct' }];
  for (const [v, tag] of tagged) { if (v == null) continue; const s = show(v); if (!seen.has(s)) { seen.add(s); opts.push({ v, tag }); } if (opts.length === 4) break; }
  while (opts.length < 4) { const v = filler(); const s = show(v); if (!seen.has(s)) { seen.add(s); opts.push({ v, tag: 'near' }); } }
  return r.shuffle(opts);
}
const showF = (f) => S(f), showN = (n) => String(n);
const nearN = (r, c) => () => Math.max(1, c + r.pick([-2, -1, 1, 2, 3]) * r.pick([1, 2]));
const nearF = (r, c) => () => frac(Math.max(1, c.n + r.pick([-2, -1, 1, 2])), c.d + r.pick([0, 0, 1, 2]));

export const GENERATORS = {
  hcf_whole(r, diff) {
    const [lo, hi] = { 1: [12, 60], 2: [24, 120], 3: [60, 360] }[diff]; let a, b, g;
    do { g = r.int(2, diff === 1 ? 12 : 20); const m = r.int(2, 12), n = r.int(2, 12); if (gcd(m, n) === 1 && m !== n) { a = g * m; b = g * n; } } while (!a || a < lo || b > hi || a > hi);
    const H = gcd(a, b), L = lcm(a, b), fs = [...new Set([...Array(H).keys()].map((i) => i + 1).filter((x) => H % x === 0 && x !== H))];
    const [nm] = r.pick(NAMES);
    const opts = mcq(r, H, [[L, 'lcm'], [Math.abs(a - b) || null, 'difference'], [fs.length ? r.pick(fs) : null, 'notGreatest'], [Math.floor(H / 2) || null, 'half']], showN, nearN(r, H));
    return { type: 'hcf_whole', diff, format: 'mcq', stem: `${nm} has ${a} red beads and ${b} blue beads. Every bracelet must have the same number of red beads and the same number of blue beads, with none left over. What is the greatest number of bracelets ${nm} can make?`, answer: H, options: opts, key: `hcfw|${a}|${b}` };
  },
  simplify_fraction(r, diff) {
    const p = lowestFrac(r, diff, 15); const g = r.int(2, diff === 1 ? 5 : diff === 2 ? 9 : 14);
    const big = { n: p.n * g, d: p.d * g }; const primes = [2, 3, 5, 7, 11, 13].filter((x) => g % x === 0 && g / x > 1);
    const partial = primes.length ? (() => { const f = r.pick(primes), k = g / f; return { n: p.n * k, d: p.d * k }; })() : null;
    return { type: 'simplify_fraction', diff, format: 'fractionInput', stem: `Use the HCF of the numerator and denominator to simplify ${S(big)} to its lowest terms.`, answer: p, requireLowest: true, partial, hcf: g, key: `simp|${fkey(big)}` };
  },
  lcm_whole(r, diff) {
    const [lo, hi] = { 1: [4, 24], 2: [8, 60], 3: [12, 120] }[diff]; let a, b;
    do { const g = r.int(1, diff === 1 ? 4 : 8), m = r.int(2, 12), n = r.int(2, 12); if (gcd(m, n) === 1 && m !== n) { a = g * m; b = g * n; } } while (!a || a < lo || b > hi || a > hi || lcm(a, b) > 360);
    const L = lcm(a, b), H = gcd(a, b); const [nm] = r.pick(NAMES);
    const opts = mcq(r, L, [[a * b, 'product'], [H, 'hcf'], [a + b, 'sum'], [Math.max(a, b), 'larger']], showN, nearN(r, L));
    return { type: 'lcm_whole', diff, format: 'mcq', stem: `${nm} tiles a path with squares every ${a} centimetres on one side and every ${b} centimetres on the other. After how many centimetres do the two patterns line up for the first time?`, answer: L, options: opts, key: `lcmw|${a}|${b}` };
  },
  compare_fractions(r, diff) {
    if (diff === 1) { const fs = fractionSet(r, 1, 2), D = lcm(fs[0].d, fs[1].d);
      return { type: 'compare_fractions', diff, format: 'numberInput', stem: `What is the LCD (lowest common denominator) of ${S(fs[0])} and ${S(fs[1])}?`, answer: D, key: `lcd|${fkey(fs[0])}|${fkey(fs[1])}` }; }
    const fs = fractionSet(r, diff, 3), sorted = [...fs].sort(cmp);
    return { type: 'compare_fractions', diff, format: 'ordering', stem: `Write each fraction over the LCD, then order ${fs.map(S).join(', ')} from least to greatest.`, items: r.shuffle(fs), answer: sorted, key: `ord|${fs.map(fkey).sort().join('|')}` };
  },
  add_sub_unlike(r, diff) {
    for (;;) { let a = lowestFrac(r, diff, 9), b = lowestFrac(r, diff, 9); if (diff === 1) b = { n: r.pick([1, 3, 5]), d: a.d * r.pick([2, 3]) }; if (!isLowestTerms(b) || eq(a, b)) continue;
      const subtract = r.next() < 0.5; if (subtract && cmp(a, b) < 0) [a, b] = [b, a]; if (a.d === b.d) continue;
      const ans = subtract ? sub(a, b) : add(a, b); if (ans.n <= 0 || ans.d > 120) continue;
      const wrong = subtract ? frac(Math.abs(a.n - b.n), a.d + b.d) : frac(a.n + b.n, a.d + b.d);
      const unsimp = { n: (subtract ? a.n * b.d - b.n * a.d : a.n * b.d + b.n * a.d), d: a.d * b.d };
      return { type: 'add_sub_unlike', diff, format: 'fractionInput', stem: `Use the LCD to work out ${S(a)} ${subtract ? '−' : '+'} ${S(b)}. Give your answer in lowest terms.`, answer: ans, requireLowest: true, wrong, unsimp, allowImproper: true, key: `as|${fkey(a)}|${subtract ? 'm' : 'p'}|${fkey(b)}` }; }
  },
  hcf_fractions(r, diff) {
    const k = diff === 3 ? 3 : 2, fs = fractionSet(r, diff, k), H = hcfFractions(fs), L = lcmFractions(fs);
    const hh = frac(gcdAll(fs.map((f) => f.n)), gcdAll(fs.map((f) => f.d))), ll = frac(lcmAll(fs.map((f) => f.n)), lcmAll(fs.map((f) => f.d)));
    const trap = diff === 3 && r.next() < 0.5, ti = r.int(0, k - 1), g = r.pick([2, 3]);
    const shown = fs.map((f, i) => (trap && i === ti ? { n: f.n * g, d: f.d * g } : f));
    const raw = frac(gcdAll(shown.map((f) => f.n)), lcmAll(shown.map((f) => f.d)));   // forgot to simplify first
    const opts = mcq(r, H, [[trap ? raw : null, 'notSimplifiedFirst'], [hh, 'hcfOverHcf'], [ll, 'lcmOverLcm'], [L, 'usedLcmRule'], [frac(H.n, H.d * 2), 'half']], showF, nearF(r, H));
    return { type: 'hcf_fractions', diff, format: diff === 3 ? 'fractionInput' : 'mcq', stem: `Find the HCF of ${shown.map(S).join(', ')}.`, fractions: fs, shown, trap, answer: H, options: opts, requireLowest: true, key: `hcff|${shown.map(fkey).sort().join('|')}` };
  },
  lcm_fractions(r, diff) {
    const k = diff === 3 ? 3 : 2, fs = fractionSet(r, diff, k), H = hcfFractions(fs), L = lcmFractions(fs);
    const hh = frac(gcdAll(fs.map((f) => f.n)), gcdAll(fs.map((f) => f.d))), ll = frac(lcmAll(fs.map((f) => f.n)), lcmAll(fs.map((f) => f.d)));
    const opts = mcq(r, L, [[ll, 'lcmOverLcm'], [hh, 'hcfOverHcf'], [H, 'usedHcfRule'], [frac(L.n * 2, L.d), 'double']], showF, nearF(r, L));
    return { type: 'lcm_fractions', diff, format: diff === 3 ? 'fractionInput' : 'mcq', stem: `Find the LCM of ${fs.map(S).join(', ')}.`, fractions: fs, answer: L, options: opts, requireLowest: true, allowImproper: true, key: `lcmf|${fs.map(fkey).sort().join('|')}` };
  },
  relationship(r, diff) {
    const fs = fractionSet(r, Math.max(diff, 2), 2), H = hcfFractions(fs), L = lcmFractions(fs);
    if (diff === 1 || r.next() < 0.5) { // True/False on a claimed HCF
      const claimTrue = r.next() < 0.5, claim = claimTrue ? H : frac(gcdAll(fs.map((f) => f.n)), gcdAll(fs.map((f) => f.d))); const truth = eq(claim, H);
      return { type: 'relationship', diff, format: 'trueFalse', stem: `True or false: the HCF of ${S(fs[0])} and ${S(fs[1])} is ${S(claim)}.`, answer: truth, fractions: fs, key: `rel-tf|${fs.map(fkey).join('|')}|${fkey(claim)}` };
    }
    const missingL = r.next() < 0.5;
    return { type: 'relationship', diff, format: 'fractionInput', stem: missingL ? `For ${S(fs[0])} and ${S(fs[1])}, the HCF is ${S(H)}. Use HCF × LCM = product of the two fractions to find the LCM.` : `For ${S(fs[0])} and ${S(fs[1])}, the LCM is ${S(L)}. Use HCF × LCM = product of the two fractions to find the HCF.`, answer: missingL ? L : H, requireLowest: true, allowImproper: true, fractions: fs, key: `rel-m|${fs.map(fkey).join('|')}|${missingL}` };
  },
  word_cut(r, diff) {
    const k = diff === 3 ? 3 : 2, fs = fractionSet(r, Math.min(diff + 1, 3), k, { lo: 1 / 4, hi: 3 });
    const H = hcfFractions(fs), pieces = fs.map((f) => f.n * H.d / (f.d * H.n)), total = pieces.reduce((x, y) => x + y, 0); const [nm] = r.pick(NAMES), item = r.pick(['ribbon', 'rope', 'wooden plank', 'pipe']);
    if (total > 60) return GENERATORS.word_cut(r, diff);
    const askPieces = diff >= 2 && r.next() < 0.5;
    return { type: 'word_cut', diff, format: askPieces ? 'numberInput' : 'fractionInput', stem: `${nm} has ${k} pieces of ${item} measuring ${fs.map((f) => `${S(f)} metres`).join(k === 2 ? ' and ' : ', ')}. ${nm} cuts them all into equal pieces that are as long as possible, with none left over. ${askPieces ? 'How many pieces does ' + nm + ' get altogether?' : 'How long is each piece, in metres?'}`, answer: askPieces ? total : H, requireLowest: true, fractions: fs, H, pieces, key: `cut|${fs.map(fkey).sort().join('|')}|${askPieces}` };
  },
  word_cycle(r, diff) {
    const k = diff === 3 ? 3 : 2, fs = fractionSet(r, Math.min(diff + 1, 3), k, { lo: 1 / 2, hi: 3 }), L = lcmFractions(fs), [nm] = r.pick(NAMES);
    const ctx = r.pick([{ u: 'seconds', t: 'lamps flash', w: 'every' }, { u: 'hours', t: 'buses leave the station', w: 'every' }, { u: 'minutes', t: 'gears complete a turn', w: 'every' }]);
    if (L.n / L.d > 60) return GENERATORS.word_cycle(r, diff);
    const counts = fs.map((f) => L.n * f.d / (L.d * f.n)); if (Math.max(...counts) > 40) return GENERATORS.word_cycle(r, diff);
    const askCount = diff >= 2 && r.next() < 0.4;
    return { type: 'word_cycle', diff, format: askCount ? 'numberInput' : 'fractionInput', stem: `${nm} watches ${k} ${ctx.t} ${ctx.w} ${fs.map((f) => S(f)).join(k === 2 ? ' and ' : ', ')} ${ctx.u} and they start together. ${askCount ? 'How many times does the first one act before they are together again?' : 'After how many ' + ctx.u + ' are they together again for the first time?'}`, answer: askCount ? counts[0] : L, requireLowest: true, allowImproper: true, fractions: fs, L, counts, key: `cyc|${fs.map(fkey).join('|')}|${askCount}` };
  },
};
```

### 6.3 World blueprints & session builder (`utils/session.js`)

Each world has **7 focus + 3 spiral** questions (world 1: 10 focus). Spiral slots are never Q1–Q2. Difficulty follows the world's ramp, which yields **35 easy / 40 medium / 25 hard** per session.

**De-duplication:** `usedKeys` (this session) is a hard constraint; `priorKeys` (the last 200 keys stored locally) is a soft constraint tried for up to 25 attempts per question. The same character name is never used in two consecutive questions.

**Retry with fresh questions:** `RETRY_WORLD` calls `buildWorld(index, rng, usedKeys, priorKeys)` again with the *same* `usedKeys` set, so a replayed world never repeats earlier questions.

```js
// src/utils/session.js
import { makeRng, GENERATORS, NAMES } from './questionGenerator.js';
import { toSpeech } from './toSpeech.js';

export const WORLDS = [
  { id: 1,  city: 'London',       focus: 'hcf_whole',         ramp: [1,1,1,1,1,1,1,2,2,2] },
  { id: 2,  city: 'New York',     focus: 'simplify_fraction', ramp: [1,1,1,1,1,1,2,2,2,2] },
  { id: 3,  city: 'Sydney',       focus: 'lcm_whole',         ramp: [1,1,1,1,1,2,2,2,2,3] },
  { id: 4,  city: 'Madrid',       focus: 'compare_fractions', ramp: [1,1,1,1,2,2,2,2,3,3] },
  { id: 5,  city: 'Tokyo',        focus: 'add_sub_unlike',    ramp: [1,1,1,2,2,2,2,2,3,3] },
  { id: 6,  city: 'Cairo',        focus: 'hcf_fractions',     ramp: [1,1,2,2,2,2,2,3,3,3] },
  { id: 7,  city: 'Mumbai',       focus: 'lcm_fractions',     ramp: [1,1,2,2,2,2,3,3,3,3] },
  { id: 8,  city: 'Rio',          focus: 'relationship',      ramp: [1,1,2,2,2,2,3,3,3,3] },
  { id: 9,  city: 'Nairobi',      focus: 'word_cut',          ramp: [1,1,2,2,2,3,3,3,3,3] },
  { id: 10, city: 'Reykjavik',    focus: 'word_cycle',        ramp: [1,1,2,2,2,2,3,3,3,3] },
];
const TYPES = WORLDS.map((w) => w.focus);
export const sessionSeed = () => crypto.getRandomValues(new Uint32Array(1))[0];

// Build one world: 7 focus + 3 spiral (World 1: 10 focus). Never repeats a key (this session) and avoids prior sessions when it can.
export function buildWorld(worldIndex, rng, usedKeys = new Set(), priorKeys = new Set()) {
  const w = WORLDS[worldIndex];
  const earlier = TYPES.slice(0, Math.max(worldIndex, 1));
  const spiralSlots = new Set(worldIndex === 0 ? [] : rng.shuffle([...Array(10).keys()].slice(2)).slice(0, 3)); // never Q1-Q2
  const out = []; let lastName = null;
  for (let i = 0; i < 10; i++) {
    const type = spiralSlots.has(i) ? rng.pick(earlier) : w.focus, diff = w.ramp[i];
    let q, attempts = 0;
    do { q = GENERATORS[type](rng, diff); attempts++; }
    while ((usedKeys.has(q.key) || (attempts < 25 && priorKeys.has(q.key)) || (q.stem.startsWith(lastName ?? '\0'))) && attempts < 60);
    usedKeys.add(q.key); lastName = NAMES.find(([n]) => q.stem.startsWith(n))?.[0] ?? null;
    out.push({ ...q, id: `W${w.id}Q${i + 1}`, world: worldIndex, spiral: spiralSlots.has(i), spoken: toSpeech(q.stem) });
  }
  return out;
}
export function buildSession(seed = sessionSeed(), priorKeys = new Set()) {
  const rng = makeRng(seed), used = new Set();
  return { seed, worlds: WORLDS.map((_, i) => buildWorld(i, rng, used, priorKeys)) };
}
```

### 6.4 Answer checking (`utils/answerCheck.js`)

Implements the PRD's acceptance rules: equivalent-but-not-lowest-terms returns `notLowest` (a free, one-time nudge — the reducer dispatches `SHOW_NUDGE`, not `ANSWER_INCORRECT`), mixed numbers are converted exactly, a blank denominator means a whole number, and decimals cannot be entered at all.

```js
// src/utils/answerCheck.js
import { gcd, frac, eq } from './fractionMath.js';

// input: { whole?: number|null, n: number, d?: number|null }  (blank denominator = whole number)
export function checkFractionAnswer(input, q) {
  const d = input.d ?? 1, w = input.whole ?? 0, n = input.n;
  if (![n, d, w].every(Number.isInteger) || d <= 0 || n < 0 || w < 0) return { status: 'invalid' };
  const usedMixed = w > 0;
  if (usedMixed && n >= d) return { status: 'badMixed' };
  const value = frac(w * d + n, d);
  if (!eq(value, q.answer)) return { status: 'wrong' };
  if (q.requireLowest && n > 0 && gcd(n, d) !== 1) return { status: 'notLowest' };  // right value, wrong form: nudge once, no attempt used
  if (q.requireLowest && n === 0 && d !== 1) return { status: 'notLowest' };
  if (usedMixed && !q.allowImproper) return { status: 'wrongFormat' };
  return { status: 'correct' };
}
```

For `mcq`, `trueFalse` and `numberInput`, checking is a strict equality on the selected/typed value. For `ordering`, the submitted array is compared item by item using `eq()`.

### 6.5 Independent-solver self-check (R8)

In production, `buildWorld` should call a `selfCheck(q)` before adding a question to a world (specified below; the offline tests in §15 exercise the same checks for most types, but this runtime hook is **not** part of the executed reference code):

| Type | Independent check |
| ---- | ----------------- |
| `hcf_fractions`, `lcm_fractions`, `word_cut`, `word_cycle`, `relationship` | `viaCommonDenominator(q.fractions)` must equal `q.answer` (or the derived count) |
| `simplify_fraction` | `gcd(answer.n, answer.d) === 1` and `answer × hcf === displayed fraction` |
| `add_sub_unlike` | Recompute with `a.n*b.d ± b.n*a.d` over `a.d*b.d`, simplify, compare |
| `hcf_whole`, `lcm_whole` | Recompute by brute force (largest common divisor / first common multiple) |
| `compare_fractions` | Cross-multiplication sort must equal the LCD-based sort |
| any `mcq` | Exactly one option tagged `correct`; 4 distinct display strings |

A failure regenerates silently (max 5 tries) and logs a `console.warn` in dev.

### 6.6 Difficulty parameters

| Diff | Whole numbers | Denominator pool | LCD cap | Result cap | Fractions per item |
| ---- | ------------- | ---------------- | ------- | ---------- | ------------------ |
| 1 | 12–60 | 2, 3, 4, 5, 6, 8, 10 | 24 | 36 | 2 |
| 2 | 24–120 | 3, 4, 5, 6, 8, 9, 10, 12, 15 | 60 | 80 | 2 |
| 3 | 60–360 | 4, 5, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 24 | 120 | 150 | 2–3, traps |

### 6.7 Measured behaviour of the reference implementation

Measured with Node 22 on the code in this document:

| Check | Result |
| ----- | ------ |
| Invariants over 3,000 draws per type: 4 unique options with exactly one correct; HCF/LCM answers cross-checked by the common-denominator method; operands in lowest terms; integer piece/cycle counts; no `undefined`/`NaN` in stems | **0 failures** |
| Distinct question keys in 3,000 draws (all difficulties combined) | 424 (`lcm_whole`) up to 2,316 (`relationship`); `simplify_fraction` 828, `hcf_whole` 1,042, the rest 1,607–2,096 |
| Sessions built (300) | 100 questions each, **0 duplicates**, difficulty totals exactly **35 / 40 / 25**, spiral count **0 (world 1) / 3 (worlds 2–10)** |
| Overlap between two independently seeded sessions | **≈ 1.3 of 100** questions on average |
| Overlap with a remembered previous session (prior-key avoidance on) | **0.00** in 200 trials |
| Correct-option position (A/B/C/D) | 24.8% / 25.3% / 24.8% / 25.1% |
| Time to build one full 100-question session | **≈ 2.7 ms** |

`lcm_whole` has the smallest parameter space (424 distinct variants seen in 3,000 draws, i.e. close to saturation), which is why prior-key avoidance is a *soft* constraint with a fallback.

---

## 7. Simulation Logic & Component Specs

### 7.1 Pure logic (`utils/sim.js`)

```js
// src/utils/sim.js
import { frac, mul, div, sub, eq, cmp, lcmFractions, hcfFractions, timesFits } from './fractionMath.js';

// ---- Station A: exact ribbon cutting (no floating point, ever) ----
export function cutRibbon(ribbon, piece) {
  const q = div(ribbon, piece), pieces = Math.floor(q.n / q.d);
  const leftover = sub(ribbon, mul(piece, frac(pieces, 1)));
  return { pieces, leftover, exact: leftover.n === 0 };
}
export const cutAll = (ribbons, piece) => ribbons.map((r) => cutRibbon(r, piece));
export const zeroWaste = (ribbons, piece) => cutAll(ribbons, piece).every((c) => c.exact);

// 8 dial candidates: the true HCF, 1-2 shorter zero-waste sizes, and near-misses that leave waste
export function buildCutCandidates(r, ribbons) {
  const H = hcfFractions(ribbons), pool = [];
  for (const m of [frac(2, 1), frac(3, 1), frac(3, 2), frac(4, 1), frac(2, 3), frac(3, 4), frac(5, 2)]) pool.push(mul(H, m));
  for (const k of [2, 3, 4]) pool.push(frac(H.n, H.d * k));
  for (let q = 2; q <= 24; q++) pool.push(frac(1, q));
  const uniq = pool.filter((p, i) => !eq(p, H) && pool.findIndex((x) => eq(x, p)) === i);
  const fit = r.shuffle(uniq.filter((p) => zeroWaste(ribbons, p))).slice(0, 2);
  const waste = r.shuffle(uniq.filter((p) => !zeroWaste(ribbons, p))).slice(0, 7 - fit.length);
  return r.shuffle([H, ...fit, ...waste]).sort(cmp);
}

// ---- Station B: exact sync plan; the animation clock is float, the events are rational ----
export function syncPlan(periods) {
  const L = lcmFractions(periods);
  return { L, counts: periods.map((p) => timesFits(L, p)) };
}
```

- `cutRibbon` / `cutAll` use exact division; `leftover.n === 0` is the *only* definition of "no waste".
- `buildCutCandidates` guarantees the dial contains the **true HCF**, 1–2 shorter zero-waste lengths (the M9 teachable moment), and near-misses that leave waste. Zero-waste status is *computed*, not assumed.
- `syncPlan` gives the first meeting time `L` and the beat count for each drum (e.g., `[3/4, 5/6]` → `L = 15/2`, counts `[10, 9]`).

### 7.2 Station A — `RibbonCutterStation.jsx`

```
state: { round, ribbons: Frac[], candidates: Frac[], selected, cutResult[], zeroWasteWall: Frac[],
         attemptsThisRound, firstTryLongest: boolean }
```

| Event | Behaviour |
| ----- | --------- |
| Select length + **Cut** | `cutAll(ribbons, selected)` → animate scissors (CSS), draw pieces, show leftover stub if `!exact` |
| Zero-waste cut | Append to `zeroWasteWall` (sorted, de-duplicated); prompt "Can you find a longer piece?" |
| **This is the longest!** | If `eq(selected, HCF)` → round complete; else if zero-waste → M9 feedback; else waste feedback |
| Round complete | Dispatch `STATION_ROUND_RESULT { station: 0, round, firstTry }` — `firstTry` is true only if the *first* "longest" press was correct |
| All 3 rounds | `stationAZeroWaste = stationAFirstTry.every(Boolean)`; dispatch `COMPLETE_SIM_STATION 0` |

Round parameters come from `GENERATORS.hcf_fractions` constrained to: R1 unit-fraction HCF, R2 non-unit HCF, R3 three ribbons. Retry until the constraint holds (bounded loop).

### 7.3 Station B — `BeatSyncStation.jsx`

```
state: { round, periods: Frac[], plan: {L, counts}, markerPos: Frac | null, playing, speed, t }
```

- Time axis ticks are drawn at `1 / lcmAll(denominators)` seconds. The prediction marker snaps to ticks (keyboard: ← → move by one tick).
- The **animation clock is float** (`requestAnimationFrame`), but all *events* (beats and coincidences) are precomputed as exact fractions and converted to pixels only when drawing:

```js
// hooks/useSyncClock.js (spec)
// t: float seconds; speed 0.5 | 1 | 2; stops at plan.L (+ small hold) then fires onDone().
// beatsAt(period) = every k·period (k ≥ 1) up to L → flash BeatTrack(period) when |t − k·period| < ε
// gold burst when t crosses plan.L
```

- **Prediction check:** `eq(markerPos, plan.L)`. Correct → marker locks, "beats table" fills from `plan.counts`. Incorrect → the sim plays to the true `L`, highlighting the gap between the marker and `L`.
- Round parameters: R1 two drums, easy; R2 two drums, medium; R3 three drums, hard (all from `GENERATORS.lcm_fractions`, constraint-checked).

### 7.4 Station C — `FormulaForgeStation.jsx`

The 5-step ladder is a small state machine:

```
SIMPLIFY → TOPS → BOTTOMS → ASSEMBLE → VERIFY → done
```

| Step | Input | Validation |
| ---- | ----- | ---------- |
| SIMPLIFY | Tap fractions already in lowest terms | `isLowestTerms` per operand |
| TOPS | Drag numerators into `HCF( )` / `LCM( )`; type both results | `gcdAll(nums)`, `lcmAll(nums)` |
| BOTTOMS | Drag denominators; type both results | `lcmAll(dens)`, `gcdAll(dens)` |
| ASSEMBLE | Choose which top/bottom pair builds the answer | HCF question → `gcdAll(nums) / lcmAll(dens)`; LCM question → `lcmAll(nums) / gcdAll(dens)` |
| VERIFY | Divisibility check; for two fractions also `HCF × LCM = product` | `timesFits()` for each operand; `eq(mul(H, L), mul(f1, f2))` |

- **Round 3 (Spot the Mistake):** a worked solution is generated from a correct solve with **one injected error** chosen from {M1, M2, M3, M4}; the student taps the faulty line, then types the corrected line.
- **Three-fraction guard:** if the round uses 3 fractions, the *product check* is replaced by a True/False on "HCF × LCM = product of the three?" (always false).

### 7.5 Learn Capsules (Story phase)

| # | Component | Interaction | Micro-check (completes the capsule) |
| - | --------- | ----------- | ----------------------------------- |
| 1 | `PrimeVennCapsule` | Tap prime buttons to split 12 and 18; drag shared primes to the overlap | "What is the HCF of 12 and 18?" (6) |
| 2 | `SimplifyCapsule` | Tap **÷ 6** to regroup 12/18 into 2/3; try **÷ 2** to see it is not the greatest | "Simplify 8/12" (2/3) |
| 3 | `LcdSliderCapsule` | Slider re-cuts 1/4 and 1/6 into 6ths, 8ths, **12ths** — bars align only at 12 | "What is the LCD of 1/3 and 1/4?" (12) |
| 4 | `ThreeWaysCapsule` | Toggle (a) grid · (b) rule · (c) ribbon-cut; all show 1/12 | "How many pieces is 5/6 m?" (10) |
| 5 | `MeetUpCapsule` | Two beat tracks; press **Play** to find the first gold flash at 15/2 s | "How many beats does Carlos drum?" (9) |

Capsule numbers (12 and 18, 3/4 and 5/6, 1/4 and 1/6) are **fixed** (they belong to the story); everything from Simulate onward is randomized.

---

## 8. Audio Pipeline (ElevenLabs — per `audio_generation_pipeline.md`)

### 8.1 Voice configuration

- **Voice:** Alice (Clear, Engaging Educator) — `Xb7hH8MSUJpSbSDYk0k2`
- **Model:** `eleven_multilingual_v2`
- **Offline scripts** read `VITE_ELEVENLABS_API_KEY` from `.env.local`
- **Client dynamic requests** go to `/api/elevenlabs` (server-held `ELEVENLABS_API_KEY`); the client bundle never contains a key

### 8.2 Speech style settings (`src/utils/styleSettings.js`)

```js
export const STYLE_SETTINGS = {
  celebration:   { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question:      { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis:      { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking:      { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement:     { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction:   { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};
```

### 8.3 `toSpeech()` — display text → spoken text

Fractions on screen are written as tokens (`{3/4}`) and rendered by `<Frac>`. `toSpeech()` converts them (and digits, acronyms and operators) to words **deterministically**. Its output is what `narration.js`, `generate_audio.js` and `audioMap.js` use.

```js
// src/utils/toSpeech.js
const ONES = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
export function words(n) {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : '');
  if (n < 1000) return ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + words(n % 100) : '');
  return words(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + words(n % 1000) : '');
}
const ORD_IRREG = { one: 'first', two: 'second', three: 'third', five: 'fifth', eight: 'eighth', nine: 'ninth', twelve: 'twelfth' };
export function ordinalWords(d) {
  const w = words(d), parts = w.split(/([ -])/), last = parts.pop();
  const o = ORD_IRREG[last] ?? (last.endsWith('y') ? last.slice(0, -1) + 'ieth' : last + 'th');
  return parts.join('') + o;
}
export function fractionWords(n, d) {
  if (d === 1) return words(n);
  if (d === 2) return n === 1 ? 'one half' : `${words(n)} halves`;
  if (d === 4) return n === 1 ? 'one quarter' : `${words(n)} quarters`;
  return `${words(n)} ${ordinalWords(d)}${n === 1 ? '' : 's'}`;
}
// Deterministic display -> spoken text. The RESULT is the audioMap key (single source of truth).
export function toSpeech(display) {
  return display
    .replace(/\{(\d+)\/(\d+)\}/g, (_, n, d) => fractionWords(+n, +d))
    .replace(/\bHCF\b/g, 'H C F').replace(/\bLCM\b/g, 'L C M').replace(/\bLCD\b/g, 'L C D')
    .replace(/×/g, ' times ').replace(/÷/g, ' divided by ').replace(/=/g, ' equals ')
    .replace(/\+/g, ' plus ').replace(/−/g, ' minus ')
    .replace(/\b\d+\b/g, (m) => words(+m))
    .replace(/\s{2,}/g, ' ').trim();
}
```

Examples (verified): `{3/4}` → "three quarters" · `{5/6}` → "five sixths" · `{1/12}` → "one twelfth" · `{15/2}` → "fifteen halves" · `{2/1}` → "two" · `HCF` → "H C F" · `44/80` displayed as `{44/80}` → "forty-four eightieths".

### 8.4 Fixed-narration inventory (pre-generated)

| Group | Approx. phrases | Style(s) |
| ----- | --------------- | -------- |
| Intro | 2 | `statement`, `encouragement` |
| Wonder hook | 4 | `thinking`, `question`, `encouragement` |
| Story panels (7) | ~16 | `statement`, `emphasis` |
| Learn Capsule prompts & micro-check feedback | ~10 | `instruction`, `encouragement` |
| Station instructions, round intros, feedback | ~20 | `instruction`, `question`, `celebration`, `encouragement` |
| Play generic feedback (correct ×4, retry ×3, hint prompts, explanation intro) | ~11 | `celebration`, `encouragement`, `thinking` |
| Misconception feedback lines M1–M9 | 9 | `encouragement` |
| Badge unlocks (8) | 8 | `celebration` |
| World complete / unlock / stars | ~4 | `celebration` |
| Reflect | ~3 | `thinking`, `celebration` |
| **Total** | **≈ 90** | |

**Titles, headings, world names and station names are never included** (Content Policy).

```js
// scripts/generate_audio.js — phrases (excerpt; each `text` is a toSpeech() result)
const phrases = [
  // Wonder
  { text: 'Yuki in Tokyo has two ribbons. One is three quarters of a metre long and the other is five sixths of a metre long.', style: 'thinking' },
  { text: 'She wants to cut both into equal pieces with nothing left over. What is the longest piece she can cut?', style: 'question' },
  { text: 'Let\'s discover how H C F and L C M help us solve both puzzles!', style: 'encouragement' },
  // Story
  { text: 'Mike in New York ate twelve of the eighteen slices of his pizza. Divide the top and the bottom by their H C F, six. Mike ate two thirds of the pizza, and two thirds is in lowest terms.', style: 'statement' },
  { text: 'Here is the Guild rule. For the H C F of fractions, take the H C F of the tops over the L C M of the bottoms. For the L C M of fractions, take the L C M of the tops over the H C F of the bottoms. Always simplify first!', style: 'emphasis' },
  // Station A
  { text: 'Choose a cut length and press cut. Can you find the longest piece that fits every ribbon exactly?', style: 'instruction' },
  // Feedback / misconceptions
  { text: 'That fits, but can you find a longer piece that also fits?', style: 'encouragement' },
  { text: 'For the L C M, the bottoms use the H C F. The meeting time must get bigger!', style: 'encouragement' },
  // Badges
  { text: 'Badge unlocked! Gear Builder! You completed all three stations!', style: 'celebration' },
];
```

**Script behaviour** (per the provided pipeline): applies per-style settings; calls the ElevenLabs TTS endpoint with `VITE_ELEVENLABS_API_KEY`; saves slugified `.mp3` files to `public/assets/audio/` (e.g., `audio_yuki_in_tokyo_has_two_ribbons_0.mp3`); **rewrites `src/utils/audioMap.js`**; waits **500 ms** between calls; skips phrases whose file already exists unless `--force`.

### 8.5 Audio engine (`src/utils/audio.js`)

```js
import { audioMap } from './audioMap';
import { STYLE_SETTINGS } from './styleSettings';
import { audioCache } from './audioCache';          // IndexedDB + in-memory Map

// Segment helpers
export const say       = (text) => ({ text, style: 'statement' });
export const ask       = (text) => ({ text, style: 'question' });
export const cheer     = (text) => ({ text, style: 'encouragement' });
export const emphasize = (text) => ({ text, style: 'emphasis' });
export const think     = (text) => ({ text, style: 'thinking' });
export const celebrate = (text) => ({ text, style: 'celebration' });
export const instruct  = (text) => ({ text, style: 'instruction' });

let dynamicRequests = 0;
const MAX_DYNAMIC = 150;                                 // per-session budget guard

export async function getAudioUrl(text, style = 'statement') {
  if (audioMap[text]) return audioMap[text];              // 1. pre-generated static asset
  const key = `${style}::${text}`;
  const cached = await audioCache.get(key);               // 2. memory / IndexedDB
  if (cached) return cached;
  if (dynamicRequests >= MAX_DYNAMIC) return null;        // 3. budget exhausted → silent
  dynamicRequests++;
  try {
    const res = await fetch('/api/elevenlabs', {          // 4. serverless proxy
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, style }),
    });
    if (!res.ok) return null;
    const url = URL.createObjectURL(await res.blob());
    await audioCache.set(key, url);
    return url;
  } catch { return null; }                                // never block the lesson
}

let currentQueue = null;
let currentAudio = null;
let currentResolve = null;                                 // lets stopNarration() release a pending segment
let tail = Promise.resolve();

async function play(segments, { onSegmentStart } = {}) {
  const queue = Symbol('queue');
  currentQueue = queue;                                   // a newer queue cancels this one
  for (let i = 0; i < segments.length; i++) {
    if (currentQueue !== queue) return;
    const { text, style } = segments[i];
    const url = await getAudioUrl(text, style);
    if (!url) continue;
    if (i + 1 < segments.length) getAudioUrl(segments[i + 1].text, segments[i + 1].style); // eager preload
    if (currentQueue !== queue) return;
    onSegmentStart?.(i);
    await new Promise((resolve) => {
      currentResolve = resolve;
      currentAudio = new Audio(url);
      currentAudio.onended = resolve;
      currentAudio.onerror = resolve;                     // silent fail — never block UX
      currentAudio.play().catch(resolve);
    });
  }
}

// Same call shape as the provided pipeline document: narrate(segments, true)
// interrupt = true → stop whatever is playing and start now; false → wait for the current queue.
export function narrate(segments, interrupt = true, opts = {}) {
  if (interrupt) stopNarration();
  tail = interrupt ? play(segments, opts) : tail.then(() => play(segments, opts));
  return tail;
}

export function stopNarration() {
  currentQueue = null;
  currentAudio?.pause(); currentAudio = null;
  currentResolve?.(); currentResolve = null;
}

// Preload helper used by PlayPhase: warm the next question's audio while the student answers
export const preloadQuestion = (q) => getAudioUrl(q.spoken, 'question');
```

**Usage in components** (unchanged from the reference pattern):

```jsx
useEffect(() => {
  if (audioEnabled) narrate(reflectNarration(), true);
  return () => stopNarration();
}, [audioEnabled]);
```

### 8.6 Serverless proxy (`api/elevenlabs.js`)

```js
import { STYLE_SETTINGS } from '../src/utils/styleSettings.js';

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const ALLOWED = ['https://intelliasg.com', 'https://www.intelliasg.com'];   // + preview domains via env

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const origin = req.headers.origin;
  if (origin && !ALLOWED.includes(origin) && !origin.endsWith('.vercel.app')) return res.status(403).end();

  const { text, style } = req.body ?? {};
  if (typeof text !== 'string' || text.length === 0 || text.length > 600) return res.status(400).json({ error: 'bad text' });
  const settings = STYLE_SETTINGS[style] ?? STYLE_SETTINGS.statement;

  const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2', voice_settings: settings }),
  });
  if (!r.ok) return res.status(502).json({ error: 'tts_failed' });
  res.setHeader('Content-Type', 'audio/mpeg');
  res.send(Buffer.from(await r.arrayBuffer()));
}
```

Add basic per-IP rate limiting (e.g., Vercel KV or Upstash) before go-live; the per-session client cap is a courtesy, not a security control.

### 8.7 Audio cache (`utils/audioCache.js`)

- Two tiers: in-memory `Map` and IndexedDB (`intellia_hcf_lcm_audio`, object store `clips`, key = `${style}::${spokenText}`, value = `Blob`).
- On read from IndexedDB, create an object URL once and store it in the Map.
- Evict the oldest entries beyond 300 clips (≈ 15–20 MB).
- If IndexedDB is unavailable (private mode), fall back to memory only.

### 8.8 Audio cleanup (`scripts/clean_audio.js`)

- Import `audioMap.js`; list all `.mp3` in `public/assets/audio/`; delete any file not referenced by the map. Run after any phrase change.

### 8.9 Parity rules & CI check

> **CRITICAL:** Every narrated on-screen string must satisfy `toSpeech(displayText) === narration text` exactly.

`tests/audioParity.test.js`:

1. Walk `storyContent.js`, `capsuleContent.js`, station scripts and feedback tables; compute `toSpeech(display)` for every narrated block.
2. Assert each result exists as a key in `audioMap` (or is on an explicit allow-list of *dynamic-only* strings — i.e., generated practice questions).
3. Assert no key in `audioMap` is orphaned (not used by any narrated block).
4. Assert no narrated block is a title/heading (blocks carry a `role: 'paragraph' | 'question' | 'title'`; only the first two may be narrated).

Any UI text change requires: update `phrases` → `npm run audio:generate` → update `narration.js` → optionally `npm run audio:clean`.

---

## 9. Gamification Implementation

### 9.1 XP

```js
export function calcXP(attemptNumber, hintsUsed, streak) {
  const base = attemptNumber === 1 ? 10 : hintsUsed > 0 ? 5 : 7;
  const streakBonus = streak >= 5 ? 5 : 0;
  return base + streakBonus;
}
```

### 9.2 Stars, unlock gate, bonus (consistent with the PRD)

```js
export const calcStars = (correct) => (correct >= 9 ? 3 : correct >= 8 ? 2 : correct >= 6 ? 1 : 0);
export const canUnlockWorld = (score) => score !== null && score >= 6;       // 6/10 gate
export const calcTotalStars = (scores) => scores.reduce((s, x) => s + (x === null ? 0 : calcStars(x)), 0);
export const bonusUnlocked = (score) => calcStars(score) === 3;              // Guild Master Bonus (3 extra hard questions)
```

> The reference product's PRD (≥ 6/10 to unlock) and TRD (≥ 5) disagree; this module uses **6/10 everywhere**.

### 9.3 Badge engine

```js
export const BADGES = [
  { id: 'guild_apprentice', label: '🏅 Guild Apprentice', description: 'Complete Wonder and Story/Learn',
    condition: (s) => s.phaseComplete.wonder && s.phaseComplete.story },
  { id: 'gear_builder', label: '🥈 Gear Builder', description: 'Complete all 3 Simulation stations',
    condition: (s) => s.simStationsComplete.every(Boolean) },
  { id: 'common_ground_champion', label: '🥇 Common Ground Champion', description: 'Score 80% or more in Play',
    condition: (s) => s.worldScores.reduce((t, x) => t + (x ?? 0), 0) >= 80 },
  { id: 'perfect_fit', label: '💎 Perfect Fit', description: 'Score 10/10 in any world',
    condition: (s) => s.worldScores.some((x) => x === 10) },
  { id: 'streak_star', label: '🔥 Streak Star', description: 'Get 10 correct answers in a row',
    condition: (s) => s.maxStreak >= 10 },
  { id: 'global_guild_master', label: '🌍 Global Guild Master', description: 'Complete all 6 phases',
    condition: (s) => Object.values(s.phaseComplete).every(Boolean) },
  { id: 'zero_waste', label: '🎯 Zero Waste', description: 'Find the longest piece first time in every ribbon round',
    condition: (s) => s.stationAZeroWaste === true },
  { id: 'rhythm_sync', label: '🥁 Rhythm Sync', description: 'Solve 5 LCM-of-fractions or sync problems',
    condition: (s) => s.syncCorrect >= 5 },
];

export const checkBadges = (state) =>
  BADGES.filter((b) => !state.badges.includes(b.id) && b.condition(state)).map((b) => b.id);
```

On unlock, the badge toast appears and `celebrate('Badge unlocked! …')` (a pre-generated phrase) is narrated.

---

## 10. Persistence

```js
const SESSION_KEY = 'intellia_hcf_lcm_fractions_v1';
const SEEN_KEY    = 'intellia_hcf_lcm_fractions_seen_v1';   // ring buffer of the last 200 question keys
```

- **Progress resume (24 h):** persist `phase`, `storyPanel`, `capsulesDone`, `simStationsComplete`, `seed`, `currentWorld`, `currentQuestion`, `worldScores`, `xp`, `streak`, `maxStreak`, `badges`, `phaseComplete`, `syncCorrect`, `stationAZeroWaste`, `timestamp`. On restore, **rebuild the worlds from `seed`** (deterministic) instead of storing 100 questions.
- **Seen keys:** on session start, load `SEEN_KEY` into `priorKeys`; on world completion append that world's keys; keep the last 200.
- All `localStorage` access is wrapped in `try/catch` (private-mode safe); the module works without persistence.
- **Retries and resume:** a retried world is regenerated with a *derived* seed `hash(seed, worldIndex, retryCount)` so it is also reproducible on resume; store `worldAttempts`.

---

## 11. CSS, Animation & Design Tokens

- **Do not re-theme.** `tailwind.config.js`, `App.css` and the `public/assets/images` mascot style are copied from the reference repository. New components use the existing tokens (brand blue, gold, coral, white cards, soft shadows).
- Keyframes reused as-is: `bounceIn`, `shake`, `floatUp`, `pulseGlow`, `celebrate`, `slideInUp`, `timelineFill`.
- New animation utilities (added in the same style):

```css
@keyframes scissorsCut  { from { transform: translateX(0) rotate(-6deg); } to { transform: translateX(var(--cut-x)) rotate(0); } }
@keyframes wastePulse   { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
@keyframes goldBurst    { 0% { transform: scale(.4); opacity: 1; } 100% { transform: scale(2.2); opacity: 0; } }
@keyframes gearMesh     { from { transform: rotate(0); } to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { * { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
```

- **Fraction colour coding (app-wide):** fraction 1 = brand blue, fraction 2 = coral, fraction 3 = green; the same colour follows a fraction from story to station to hint overlay.
- Waste/fit is never colour-only: leftover stubs use diagonal hatching and a text label.

---

## 12. Component Prop Contracts

| Component | Props | Returns |
| --------- | ----- | ------- |
| `Frac` | `{ n, d, size?, color? }` | Stacked fraction, `role="math"`, `aria-label` from `fractionWords()` |
| `FractionBar` | `{ parts, total, color?, cuts? }` | SVG bar divided into equal parts |
| `CommonGrid` | `{ fractions, denominator, animated? }` | Overlay re-expressing fractions over a shared denominator |
| `RibbonBar` | `{ length, pieces?, leftover?, scale }` | SVG ribbon with segments and hatched leftover |
| `BeatTrack` | `{ period, until, color, flashAt? }` | One drum track with tick marks |
| `SyncTimeline` | `{ periods, plan, markerPos, onMarker, t }` | Multi-track timeline with prediction marker |
| `FractionInput` | `{ value, onChange, onSubmit, allowMixed? }` | Stacked numerator/denominator boxes (+ optional whole box) |
| `QuestionRenderer` | `{ question, onResult, hints }` | Format-specific question component |
| `HintOverlay` | `{ question, level, misconceptionTag? }` | Hint 1 text, Hint 2 visual, worked solution |
| `RuleCard` | `{ open, onClose }` | The Guild Rule Card |
| `FeedbackOverlay` | `{ isCorrect, line, xpEarned, onContinue }` | Animated modal (`bounceIn` / `shake`) |
| `WorldMap` | `{ worldScores, currentWorld, onSelectWorld }` | Horizontal scroll list with stars and lock icons |
| `BadgePanel` | `{ badges, newBadgeId? }` | Badge grid + unlock toast |
| `Mascot` | `{ mood }` | Gearo SVG with CSS mood animation |

---

## 13. Performance Requirements

| Metric | Target |
| ------ | ------ |
| Initial load | < 2 s (Vite production build) |
| First meaningful paint | < 1 s |
| Session generation (100 questions) | < 50 ms (measured ≈ 3 ms) |
| Animation frame rate | 60 fps (Station B on a mid-range tablet) |
| Bundle size (gzipped) | < 600 KB (excluding audio) |
| Lighthouse Performance / Accessibility | ≥ 90 / ≥ 90 |
| Pre-generated audio time-to-first-byte | ~0 ms (static asset) |
| Dynamic audio time-to-first-byte | < 2 s; next question preloaded while the student answers |

---

## 14. Browser & Device Support

| Environment | Support |
| ----------- | ------- |
| Chrome 110+, Edge 110+, Firefox 110+ (desktop) | Full |
| Safari 15+ (Mac / iPad / iOS) | Full (audio starts after first tap — handled by the Intro "Begin" button) |
| Android Chrome | Full |
| IE 11 | Not supported |

Primary test devices: Desktop Chrome (1280 px+) and tablet (768 px, touch).

---

## 15. Quality & Testing Standards

**Math engine (`tests/fractionMath.test.js`)** — the property test executed while writing this document:

```js
// tests/fractionMath.test.js  (executed with plain Node here; runs unchanged under Vitest)
import * as F from './fractionMath.js';
const f = (n,d)=>F.frac(n,d);
let fails = 0;
const ok = (c, m) => { if(!c){fails++; console.log('FAIL', m);} };
// hand examples used in the docs
const A=[f(3,4),f(5,6)];
let h=F.hcfFractions(A), l=F.lcmFractions(A);
console.log('3/4,5/6 HCF',h,'LCM',l, 'product check', F.eq(F.mul(h,l),F.mul(A[0],A[1])));
const B=[f(2,3),f(4,5)]; console.log('2/3,4/5', F.hcfFractions(B), F.lcmFractions(B));
const C=[f(2,3),f(4,9),f(8,27)]; console.log('2/3,4/9,8/27', F.hcfFractions(C), F.lcmFractions(C));
const D=[f(3,2),f(9,4)]; console.log('3/2,9/4', F.hcfFractions(D), F.lcmFractions(D));
console.log('12,18', F.gcd(12,18), F.lcm(12,18));
console.log('12/18', F.frac(12,18));
console.log('1/4+1/6', F.add(f(1,4),f(1,6)));
// fuzz: formula vs common-denominator method, divisibility, minimality, product identity, lowest terms
function rnd(a,b){return a+Math.floor(Math.random()*(b-a+1));}
for (let t=0;t<20000;t++){
  const k=rnd(2,3); const fs=[];
  while(fs.length<k){ const d=rnd(2,24), n=rnd(1,30); if(F.gcd(n,d)===1) fs.push({n,d}); }
  const H=F.hcfFractions(fs), L=F.lcmFractions(fs), X=F.viaCommonDenominator(fs);
  ok(F.eq(H,X.hcf)&&F.eq(L,X.lcm),'formula vs cd '+JSON.stringify(fs));
  ok(F.isLowestTerms(H)&&F.isLowestTerms(L),'lowest terms '+JSON.stringify(fs));
  ok(fs.every(x=>F.timesFits(x,H)!==null),'H divides');
  ok(fs.every(x=>F.timesFits(L,x)!==null),'L multiple');
  // minimality: no larger unit fraction-multiple; test candidate h*(m/1)? check H*(1+small) can't work: any working h' must be H/j
  for (const j of [2,3]) ok(!fs.every(x=>F.timesFits(x,F.mul(H,f(j,1)))!==null),'H maximal x'+j);
  // minimality of L: L/j not a common multiple
  for (const j of [2,3]) ok(!fs.every(x=>F.timesFits(F.div(L,f(j,1)),x)!==null),'L minimal /'+j);
  if(k===2) ok(F.eq(F.mul(H,L),F.mul(fs[0],fs[1])),'product identity '+JSON.stringify(fs));
}
console.log('fuzz fails:',fails);
```

Additional unit / property tests required:

| Area | Tests |
| ---- | ----- |
| `hcfFractions` / `lcmFractions` | Fuzz ≥ 20,000 random 2–3 fraction sets: equals `viaCommonDenominator`; results in lowest terms; divides/multiple exactly; maximality/minimality; product identity for exactly two fractions |
| `toSpeech` | Table-driven: every denominator 2–24, numerators 1–3, `{n/1}`, acronyms, operators, numbers to 999 |
| Generators | ≥ 3,000 draws per type × 3 difficulties: unique options, one correct, independent-solver equality, integer piece/cycle counts, no `undefined`/`NaN` in stems |
| Session builder | ≥ 300 sessions: 100 questions, 0 duplicate keys, 35/40/25 difficulty, spiral count, focus types, no consecutive repeated names |
| Randomization | No two sessions identical; correct-option position uniform (χ² test); overlap with a remembered session = 0 when avoidance is on |
| Answer checker | `correct`, `notLowest`, `wrong`, `badMixed`, `invalid`; whole-number answers with blank denominator |
| Station A logic | Zero-waste set computed, HCF always present, no zero-waste candidate longer than the HCF |
| Station B logic | `syncPlan` counts are integers; `L` equals the first coincidence by brute-force enumeration |
| Reducer | Gates (capsules → simulate, stations → play), XP, streak, star and badge transitions, retry regenerates a fresh world |
| Audio parity | §8.9 |
| Components (RTL) | `Frac` accessible name, `FractionInput` keyboard flow, drag + tap-tap parity, `HintOverlay` levels |
| Accessibility | Lighthouse + axe automated pass; manual keyboard-only pass across all 6 phases; screen-reader spot check on fractions and stations |
| UI parity | Screenshot diff vs the reference at 1280 / 768 / 375 px; component-inventory and keyframe diff |
| E2E smoke (Playwright) | Intro → Reflect with seeded session (`?seed=`) in each viewport; resume after reload; audio disabled path; audio API failure path |

---

## 16. Build, Hosting & Environment

**Environment variables**

| Variable | Used by | Purpose |
| -------- | ------- | ------- |
| `VITE_ELEVENLABS_API_KEY` | `scripts/generate_audio.js` (`.env.local`, **never committed**) | Offline pre-generation |
| `ELEVENLABS_API_KEY` | `api/elevenlabs.js` (Vercel project secret) | Dynamic question audio |
| `VITE_BASE_PATH` | `vite.config.js` | Route the app is served from (default `/`) |

**`vite.config.js`**

```js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
  test: { environment: 'jsdom' },
});
```

**Hosting.** Two supported modes (confirm with the platform owner):

1. **Static bundle** under the Intellia course area at the configured base path.
2. **Standalone Vercel app embedded by iframe** on the target page. In this mode `vercel.json` must allow framing by the Intellia domain:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Security-Policy", "value": "frame-ancestors 'self' https://intelliasg.com https://www.intelliasg.com" }
      ]
    }
  ]
}
```

Target page: <https://intelliasg.com/courses/grade-3-math> (as specified). If a Grade 7 route is created, proposed slug: `/courses/grade-7-math/lessons/hcf-lcm-fractions/`.

**Repository hygiene:** `.env.local` in `.gitignore`; audio files committed (static assets); `audioMap.js` committed (auto-generated header comment).

---

## 17. Delivery Plan (suggested)

| Milestone | Scope | Exit criteria |
| --------- | ----- | ------------- |
| M0 — Parity baseline | Fork the reference structure; diff tokens/components against §12 of the PRD | Parity table signed off |
| M1 — Engines | `fractionMath`, `questionGenerator`, `session`, `answerCheck`, `sim`, `toSpeech` + all property tests | CI green; results match §6.7 |
| M2 — Learn | Story panels + 5 Learn Capsules; gates | Learn-first gate enforced in reducer |
| M3 — Simulate | Stations A, B, C incl. randomized rounds | Manual QA on desktop/tablet/mobile |
| M4 — Play | Question renderer, hints, feedback, world map, retry-with-fresh-set | 100-question session end-to-end |
| M5 — Audio | Pre-generation, dynamic proxy, cache, parity CI | All fixed narration plays; dynamic audio with budget guard |
| M6 — Polish & release | A11y, performance, screenshot parity, hosting | Section 14 of the PRD (success criteria) all ✅ |

---

**Document Version:** 1.0 | September 2026
**Product:** Intellia — Grade 7 Math, HCF & LCM Using Fractions
**Reference UI:** <https://grade5-time-intervals.vercel.app/>
**Reference Repo:** <https://github.com/p1pachare-cloud/Grade5-Time-Intervals>
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`, `eleven_multilingual_v2`) — per `audio_generation_pipeline.md`
**Upload Target:** <https://intelliasg.com/courses/grade-3-math>
