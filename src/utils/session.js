// src/utils/session.js
// Session builder for 10 world cities x 10 procedural whole-number HCF & LCM questions

import { makeRng, GENERATORS, NAMES } from './questionGenerator.js';
import { toSpeech } from './toSpeech.js';

export const WORLDS = [
  { id: 1,  city: 'London',       name: 'London Factors & Multiples Workshop',   focus: 'list_factors_multiples',  ramp: [1,1,1,1,1,1,1,2,2,2] },
  { id: 2,  city: 'New York',     name: 'New York Prime Tree Studio',           focus: 'factor_tree_completion',  ramp: [1,1,1,1,1,1,2,2,2,2] },
  { id: 3,  city: 'Sydney',       name: 'Sydney Harbour HCF Station',           focus: 'hcf_prime_factors',       ramp: [1,1,1,1,1,2,2,2,2,3] },
  { id: 4,  city: 'Madrid',       name: 'Madrid LCM Mosaic',                    focus: 'lcm_prime_factors',       ramp: [1,1,1,1,2,2,2,2,3,3] },
  { id: 5,  city: 'Tokyo',        name: 'Tokyo Ladder HCF Forge',               focus: 'ladder_division_hcf',     ramp: [1,1,1,2,2,2,2,2,3,3] },
  { id: 6,  city: 'Cairo',        name: 'Cairo Ladder LCM Bazaar',              focus: 'ladder_division_lcm',     ramp: [1,1,2,2,2,2,2,3,3,3] },
  { id: 7,  city: 'Mumbai',       name: 'Mumbai Coprime Parade',                focus: 'coprime_and_multiples',   ramp: [1,1,2,2,2,2,3,3,3,3] },
  { id: 8,  city: 'Rio',          name: 'Rio 3-Number Carnival',                focus: 'hcf_lcm_three_numbers',   ramp: [1,1,2,2,2,2,3,3,3,3] },
  { id: 9,  city: 'Nairobi',      name: 'Nairobi Product Identity Market',      focus: 'product_check_identity',  ramp: [1,1,2,2,2,3,3,3,3,3] },
  { id: 10, city: 'Reykjavik',    name: 'Reykjavik HCF & LCM Finale',           focus: 'word_problems',           ramp: [1,1,2,2,2,2,3,3,3,3] },
];

const TYPES = WORLDS.map((w) => w.focus);

export const sessionSeed = () => crypto.getRandomValues(new Uint32Array(1))[0];

export function buildWorld(worldIndex, rng, usedKeys = new Set(), priorKeys = new Set()) {
  const w = WORLDS[worldIndex];
  const earlier = TYPES.slice(0, Math.max(worldIndex, 1));
  const spiralSlots = new Set(worldIndex === 0 ? [] : rng.shuffle([...Array(10).keys()].slice(2)).slice(0, 3));
  const out = [];
  let lastName = null;

  for (let i = 0; i < 10; i++) {
    const type = spiralSlots.has(i) ? rng.pick(earlier) : w.focus;
    const diff = w.ramp[i];
    let q;
    let attempts = 0;

    do {
      q = GENERATORS[type](rng, diff);
      attempts++;
    } while (
      (usedKeys.has(q.key) || (attempts < 25 && priorKeys.has(q.key)) || (q.stem.startsWith(lastName ?? '\0'))) &&
      attempts < 60
    );

    usedKeys.add(q.key);
    lastName = NAMES.find(([n]) => q.stem.startsWith(n))?.[0] ?? null;

    out.push({
      ...q,
      id: `W${w.id}Q${i + 1}`,
      world: worldIndex,
      spiral: spiralSlots.has(i),
      spoken: toSpeech(q.stem)
    });
  }

  return out;
}

export function buildSession(seed = sessionSeed(), priorKeys = new Set()) {
  const rng = makeRng(seed);
  const used = new Set();
  return {
    seed,
    worlds: WORLDS.map((_, i) => buildWorld(i, rng, used, priorKeys))
  };
}
