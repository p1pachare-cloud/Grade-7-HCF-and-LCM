// src/utils/sim.js
// Simulation math helpers for Item Grouping (HCF), Event Sync (LCM), & Division Ladder

import { gcd, lcm, getCommonFactors, getDivisionLadder, getPrimeFactors } from './hcfLcmMath.js';

// Station A: Item Grouping/Packing (HCF)
export function packItems(itemCount, packSize) {
  const packs = Math.floor(itemCount / packSize);
  const remainder = itemCount % packSize;
  return { packs, remainder, exact: remainder === 0 };
}

export function packAllItems(itemCounts, packSize) {
  return itemCounts.map((count) => packItems(count, packSize));
}

export const zeroRemainderAll = (itemCounts, packSize) =>
  packAllItems(itemCounts, packSize).every((p) => p.exact);

// Candidates dial for Station A: true HCF, valid smaller zero-remainder pack sizes, and invalid sizes
export function buildPackingCandidates(r, itemCounts) {
  const H = itemCounts.reduce((acc, c) => gcd(acc, c));
  const validCommon = getCommonFactors(itemCounts[0], itemCounts[1], itemCounts[2] || null);

  const candidates = new Set([H]);
  validCommon.forEach((v) => candidates.add(v));

  // Add a few near misses
  for (const delta of [-2, -1, 1, 2, 3]) {
    const val = H + delta;
    if (val > 1 && val <= Math.min(...itemCounts)) {
      candidates.add(val);
    }
  }

  while (candidates.size < 6) {
    const val = r.int(2, Math.min(...itemCounts));
    candidates.add(val);
  }

  return Array.from(candidates).sort((a, b) => a - b);
}

// Station B: Event Sync (LCM)
export function eventSyncPlan(intervals) {
  const L = intervals.reduce((acc, i) => lcm(acc, i));
  return {
    L,
    counts: intervals.map((inv) => L / inv)
  };
}
