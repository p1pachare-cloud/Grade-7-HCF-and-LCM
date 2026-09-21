// src/utils/questionGenerator.js
// Whole-Number HCF & LCM Procedural Question Generator with PRNG and Euclid Validation

import {
  gcd, lcm, gcdAll, lcmAll, getFactors, getMultiples,
  getCommonFactors, getPrimeFactors, isCoprime, getDivisionLadder
} from './hcfLcmMath.js';

export const NAMES = [
  ['John', 'London'], ['Mike', 'New York'], ['Sarah', 'Sydney'], ['Emma', 'Toronto'],
  ['Liam', 'Dublin'], ['Sofia', 'Madrid'], ['Noah', 'Berlin'], ['Aisha', 'Cairo'],
  ['Carlos', 'Mexico City'], ['Yuki', 'Tokyo'], ['Priya', 'Mumbai'], ['Fatima', 'Dubai'],
  ['Diego', 'Buenos Aires'], ['Chloe', 'Paris'], ['Ravi', 'Singapore'], ['Amara', 'Lagos'],
  ['Mei', 'Shanghai'], ['Lars', 'Stockholm']
];

export function makeRng(seed) {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (lo, hi) => lo + Math.floor(next() * (hi - lo + 1));
  const pick = (xs) => xs[int(0, xs.length - 1)];
  const shuffle = (xs) => {
    const r = [...xs];
    for (let i = r.length - 1; i > 0; i--) {
      const j = int(0, i);
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  };
  return { next, int, pick, shuffle };
}

const showN = (n) => String(n);
const nearN = (r, c) => () => Math.max(1, c + r.pick([-3, -2, -1, 1, 2, 3]) * r.pick([1, 2]));

function mcq(r, correct, tagged, show, filler) {
  const seen = new Set([show(correct)]);
  const opts = [{ v: correct, tag: 'correct' }];
  for (const [v, tag] of tagged) {
    if (v == null) continue;
    const s = show(v);
    if (!seen.has(s)) {
      seen.add(s);
      opts.push({ v, tag });
    }
    if (opts.length === 4) break;
  }
  while (opts.length < 4) {
    const v = filler();
    const s = show(v);
    if (!seen.has(s)) {
      seen.add(s);
      opts.push({ v, tag: 'near' });
    }
  }
  return r.shuffle(opts);
}

export const GENERATORS = {
  // QT1: List factors or multiples
  list_factors_multiples(r, diff) {
    const n = diff === 1 ? r.int(12, 36) : diff === 2 ? r.int(36, 72) : r.int(72, 120);
    const askFactors = r.next() < 0.5;
    if (askFactors) {
      const factors = getFactors(n);
      const count = factors.length;
      return {
        type: 'list_factors_multiples',
        diff,
        format: 'numberInput',
        stem: `How many factors does the number ${n} have?`,
        answer: count,
        targetNumber: n,
        factors,
        key: `fact|${n}`
      };
    } else {
      const k = r.int(3, 7);
      const ans = n * k;
      return {
        type: 'list_factors_multiples',
        diff,
        format: 'numberInput',
        stem: `What is the ${k}th multiple of ${n}?`,
        answer: ans,
        targetNumber: n,
        k,
        key: `mult|${n}|${k}`
      };
    }
  },

  // QT2: Factor tree completion
  factor_tree_completion(r, diff) {
    const n = diff === 1 ? r.pick([12, 18, 20, 24, 28, 30]) : diff === 2 ? r.pick([36, 40, 48, 54, 60]) : r.pick([72, 84, 90, 96, 108, 120]);
    const primes = getPrimeFactors(n);
    const missingPrime = r.pick(primes);
    return {
      type: 'factor_tree_completion',
      diff,
      format: 'numberInput',
      stem: `In the prime factorisation tree for ${n} = ${primes.filter(p => p !== missingPrime).join(' × ')} × __, what is the missing prime factor?`,
      answer: missingPrime,
      targetNumber: n,
      primes,
      key: `ftree|${n}|${missingPrime}`
    };
  },

  // QT3: HCF by Prime Factorisation
  hcf_prime_factors(r, diff) {
    const [lo, hi] = { 1: [12, 40], 2: [24, 80], 3: [48, 150] }[diff];
    let a, b, H, L;
    let guard = 0;
    do {
      const g = r.int(2, diff === 1 ? 8 : 15);
      const m = r.int(2, 10);
      const n = r.int(2, 10);
      if (gcd(m, n) === 1 && m !== n) {
        a = g * m;
        b = g * n;
        H = gcd(a, b);
        L = lcm(a, b);
      }
      guard++;
    } while ((!a || a < lo || b > hi || a > hi) && guard < 100);

    if (!a) { a = 12; b = 18; H = 6; L = 36; }

    const pA = getPrimeFactors(a).join(' × ');
    const pB = getPrimeFactors(b).join(' × ');
    const opts = mcq(
      r, H,
      [
        [L, 'M2'],
        [Math.abs(a - b) || null, 'M2'],
        [Math.floor(H / 2) || null, 'M7']
      ],
      showN,
      nearN(r, H)
    );

    return {
      type: 'hcf_prime_factors',
      diff,
      format: 'mcq',
      stem: `Given prime factorisations ${a} = ${pA} and ${b} = ${pB}, find the HCF of ${a} and ${b}.`,
      answer: H,
      options: opts,
      a, b, H, L,
      key: `hcfp|${a}|${b}`
    };
  },

  // QT4: LCM by Prime Factorisation
  lcm_prime_factors(r, diff) {
    const [lo, hi] = { 1: [12, 40], 2: [20, 60], 3: [36, 90] }[diff];
    let a, b, H, L;
    let guard = 0;
    do {
      const g = r.int(2, diff === 1 ? 6 : 10);
      const m = r.int(2, 8);
      const n = r.int(2, 8);
      if (gcd(m, n) === 1 && m !== n) {
        a = g * m;
        b = g * n;
        H = gcd(a, b);
        L = lcm(a, b);
      }
      guard++;
    } while ((!a || a < lo || b > hi || L > 360) && guard < 100);

    if (!a) { a = 12; b = 18; H = 6; L = 36; }

    const pA = getPrimeFactors(a).join(' × ');
    const pB = getPrimeFactors(b).join(' × ');
    const opts = mcq(
      r, L,
      [
        [a * b, 'M1'],
        [H, 'M3'],
        [a + b, 'M1']
      ],
      showN,
      nearN(r, L)
    );

    return {
      type: 'lcm_prime_factors',
      diff,
      format: 'mcq',
      stem: `Given prime factorisations ${a} = ${pA} and ${b} = ${pB}, find the LCM of ${a} and ${b}.`,
      answer: L,
      options: opts,
      a, b, H, L,
      key: `lcmp|${a}|${b}`
    };
  },

  // QT5: Division Ladder HCF
  ladder_division_hcf(r, diff) {
    const a = diff === 1 ? r.int(16, 36) : diff === 2 ? r.int(36, 72) : r.int(60, 120);
    const b = diff === 1 ? r.int(24, 48) : diff === 2 ? r.int(48, 96) : r.int(90, 150);
    if (a === b) return GENERATORS.ladder_division_hcf(r, diff);

    const H = gcd(a, b);
    const ladder = getDivisionLadder(a, b);

    return {
      type: 'ladder_division_hcf',
      diff,
      format: 'numberInput',
      stem: `Use the division ladder method to find the HCF of ${a} and ${b}.`,
      answer: H,
      ladder,
      a, b,
      key: `ladh|${a}|${b}`
    };
  },

  // QT6: Division Ladder LCM
  ladder_division_lcm(r, diff) {
    const a = diff === 1 ? r.int(12, 30) : diff === 2 ? r.int(24, 50) : r.int(40, 80);
    const b = diff === 1 ? r.int(15, 36) : diff === 2 ? r.int(30, 60) : r.int(50, 100);
    if (a === b || lcm(a, b) > 360) return GENERATORS.ladder_division_lcm(r, diff);

    const L = lcm(a, b);
    const ladder = getDivisionLadder(a, b);

    return {
      type: 'ladder_division_lcm',
      diff,
      format: 'numberInput',
      stem: `Use the division ladder method to find the LCM of ${a} and ${b}.`,
      answer: L,
      ladder,
      a, b,
      key: `ladl|${a}|${b}`
    };
  },

  // QT7: Coprime and Multiple Cases
  coprime_and_multiples(r, diff) {
    const isCoprimeCase = r.next() < 0.5;
    if (isCoprimeCase) {
      let a, b;
      do {
        a = r.int(7, 25);
        b = r.int(8, 25);
      } while (!isCoprime(a, b) || a === b);

      const askHcf = r.next() < 0.5;
      return {
        type: 'coprime_and_multiples',
        diff,
        format: 'numberInput',
        stem: askHcf
          ? `The numbers ${a} and ${b} are coprime. What is their HCF?`
          : `The numbers ${a} and ${b} are coprime. What is their LCM?`,
        answer: askHcf ? 1 : a * b,
        isCoprime: true,
        a, b,
        key: `cop|${a}|${b}|${askHcf}`
      };
    } else {
      const a = r.int(6, 20);
      const k = r.int(2, 6);
      const b = a * k; // b is a multiple of a
      const askHcf = r.next() < 0.5;

      return {
        type: 'coprime_and_multiples',
        diff,
        format: 'numberInput',
        stem: askHcf
          ? `Because ${b} is a multiple of ${a}, what is the HCF of ${a} and ${b}?`
          : `Because ${b} is a multiple of ${a}, what is the LCM of ${a} and ${b}?`,
        answer: askHcf ? a : b,
        isMultiple: true,
        a, b,
        key: `multcase|${a}|${b}|${askHcf}`
      };
    }
  },

  // QT8: HCF or LCM of 3 Numbers
  hcf_lcm_three_numbers(r, diff) {
    const g = r.int(2, diff === 1 ? 4 : 8);
    const a = g * r.pick([2, 3]);
    const b = g * r.pick([4, 5]);
    const c = g * r.pick([6, 7]);
    if (new Set([a, b, c]).size < 3) return GENERATORS.hcf_lcm_three_numbers(r, diff);

    const askHcf = r.next() < 0.5;
    const H = gcdAll([a, b, c]);
    const L = lcmAll([a, b, c]);

    if (L > 360) return GENERATORS.hcf_lcm_three_numbers(r, diff);

    const opts = mcq(
      r, askHcf ? H : L,
      [
        [askHcf ? L : H, askHcf ? 'M2' : 'M3'],
        [askHcf ? a : a * b * c, 'M6'],
        [askHcf ? Math.floor(H / 2) || null : L * 2, 'M7']
      ],
      showN,
      nearN(r, askHcf ? H : L)
    );

    return {
      type: 'hcf_lcm_three_numbers',
      diff,
      format: 'mcq',
      stem: askHcf
        ? `Find the HCF of the three numbers ${a}, ${b}, and ${c}.`
        : `Find the LCM of the three numbers ${a}, ${b}, and ${c}.`,
      answer: askHcf ? H : L,
      options: opts,
      a, b, c, H, L,
      key: `three|${a}|${b}|${c}|${askHcf}`
    };
  },

  // QT9: HCF x LCM = Product Identity
  product_check_identity(r, diff) {
    const g = r.int(3, 12);
    const m = r.int(2, 8);
    const n = r.int(3, 9);
    if (gcd(m, n) !== 1) return GENERATORS.product_check_identity(r, diff);

    const a = g * m;
    const b = g * n;
    const H = gcd(a, b);
    const L = lcm(a, b);
    const prod = a * b;

    const askLcm = r.next() < 0.5;
    return {
      type: 'product_check_identity',
      diff,
      format: 'numberInput',
      stem: askLcm
        ? `Two numbers have a product of ${prod} and an HCF of ${H}. Use HCF × LCM = Product to find their LCM.`
        : `Two numbers have a product of ${prod} and an LCM of ${L}. Use HCF × LCM = Product to find their HCF.`,
      answer: askLcm ? L : H,
      prod, H, L, a, b,
      key: `prod|${prod}|${askLcm}`
    };
  },

  // QT10: Real-world Word Problems
  word_problems(r, diff) {
    const isHcfWordProblem = r.next() < 0.5;
    const [nm] = r.pick(NAMES);

    if (isHcfWordProblem) { // Equal Grouping / Cutting
      const g = r.int(4, 16);
      const m = r.int(2, 6);
      const n = r.int(3, 7);
      if (gcd(m, n) !== 1) return GENERATORS.word_problems(r, diff);

      const a = g * m;
      const b = g * n;
      const H = gcd(a, b);
      const item = r.pick(['red beads', 'blue tiles', 'marbles', 'flags', 'stamps']);

      return {
        type: 'word_problems',
        diff,
        format: 'numberInput',
        stem: `${nm} has ${a} ${item} of one type and ${b} of another. ${nm} wants to pack them into identical gift boxes with none left over. What is the greatest number of items ${nm} can put in each box?`,
        answer: H,
        isHcf: true,
        a, b, H,
        key: `w_hcf|${a}|${b}`
      };
    } else { // Repeating Events Sync
      const g = r.int(2, 6);
      const m = r.int(2, 6);
      const n = r.int(3, 7);
      if (gcd(m, n) !== 1) return GENERATORS.word_problems(r, diff);

      const a = g * m;
      const b = g * n;
      const L = lcm(a, b);
      if (L > 200) return GENERATORS.word_problems(r, diff);

      const ctx = r.pick([
        { u: 'seconds', t: 'two signal lights blink' },
        { u: 'minutes', t: 'two city buses arrive' },
        { u: 'seconds', t: 'two bells ring' }
      ]);

      return {
        type: 'word_problems',
        diff,
        format: 'numberInput',
        stem: `${nm} observes that ${ctx.t} every ${a} ${ctx.u} and every ${b} ${ctx.u}. If they start together, after how many ${ctx.u} will they trigger together again for the first time?`,
        answer: L,
        isLcm: true,
        a, b, L,
        key: `w_lcm|${a}|${b}`
      };
    }
  }
};
