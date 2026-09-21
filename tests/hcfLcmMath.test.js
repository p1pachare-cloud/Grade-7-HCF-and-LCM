// tests/hcfLcmMath.test.js
import { describe, it, expect } from 'vitest';
import {
  gcd, lcm, getFactors, getMultiples, getCommonFactors,
  getPrimeFactors, getFactorTree, getDivisionLadder, verifyProductIdentity, isCoprime
} from '../src/utils/hcfLcmMath.js';
import { toSpeech } from '../src/utils/toSpeech.js';
import { buildSession } from '../src/utils/session.js';

describe('Whole-Number HCF & LCM Math Engine', () => {
  it('correctly calculates gcd and lcm', () => {
    expect(gcd(12, 18)).toBe(6);
    expect(lcm(12, 18)).toBe(36);
    expect(gcd(24, 36)).toBe(12);
    expect(lcm(24, 36)).toBe(72);
  });

  it('correctly identifies factors and multiples', () => {
    expect(getFactors(12)).toEqual([1, 2, 3, 4, 6, 12]);
    expect(getMultiples(4, 5)).toEqual([4, 8, 12, 16, 20]);
    expect(getCommonFactors(12, 18)).toEqual([1, 2, 3, 6]);
  });

  it('correctly calculates prime factors and factor trees', () => {
    expect(getPrimeFactors(24)).toEqual([2, 2, 2, 3]);
    expect(getPrimeFactors(36)).toEqual([2, 2, 3, 3]);
    const tree = getFactorTree(24);
    expect(tree.val).toBe(24);
    expect(tree.left).toBeDefined();
    expect(tree.right).toBeDefined();
  });

  it('correctly builds division ladder', () => {
    const ladder = getDivisionLadder([24, 36]);
    expect(ladder.hcf).toBe(12);
    expect(ladder.lcm).toBe(72);
    expect(ladder.remainders).toEqual([2, 3]);
  });

  it('verifies product identity HCF * LCM = a * b', () => {
    const check = verifyProductIdentity(12, 18);
    expect(check.hcf).toBe(6);
    expect(check.lcm).toBe(36);
    expect(check.product).toBe(216);
    expect(check.hcfTimesLcm).toBe(216);
    expect(check.isValid).toBe(true);
  });

  it('correctly identifies coprime numbers', () => {
    expect(isCoprime(8, 15)).toBe(true);
    expect(isCoprime(12, 18)).toBe(false);
  });
});

describe('toSpeech Converter', () => {
  it('converts acronyms and math expressions to spoken text', () => {
    expect(toSpeech('HCF of 24 and 36')).toBe('H C F of 24 and 36');
    expect(toSpeech('LCM of 12 and 18')).toBe('L C M of 12 and 18');
  });
});

describe('Session & Question Generator', () => {
  it('builds a full 100-question session across 10 worlds with 0 duplicate keys', () => {
    const session = buildSession(12345);
    expect(session.worlds.length).toBe(10);
    const allKeys = session.worlds.flatMap((w) => w.map((q) => q.key));
    expect(allKeys.length).toBe(100);
    const uniqueKeys = new Set(allKeys);
    expect(uniqueKeys.size).toBe(100);
  });
});
