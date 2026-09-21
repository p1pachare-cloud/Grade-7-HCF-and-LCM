// src/utils/hcfLcmMath.js
// Whole-Number HCF (Greatest Common Factor) & LCM (Lowest Common Multiple) Math Engine

// Euclidean algorithm for Greatest Common Factor (HCF / GCF)
export const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
};

// Lowest Common Multiple (LCM) via Euclidean identity: LCM(a, b) = (a * b) / HCF(a, b)
export const lcm = (a, b) => {
  if (a === 0 || b === 0) return 0;
  return (Math.abs(a) / gcd(a, b)) * Math.abs(b);
};

export const gcdAll = (xs) => {
  if (!xs || xs.length === 0) return 1;
  return xs.reduce(gcd);
};

export const lcmAll = (xs) => {
  if (!xs || xs.length === 0) return 1;
  return xs.reduce(lcm);
};

// Returns all positive factors of n in ascending order
export function getFactors(n) {
  n = Math.abs(n);
  const factors = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i * i !== n) {
        factors.push(n / i);
      }
    }
  }
  return factors.sort((a, b) => a - b);
}

// Returns first `count` multiples of n
export function getMultiples(n, count = 10) {
  const multiples = [];
  for (let i = 1; i <= count; i++) {
    multiples.push(n * i);
  }
  return multiples;
}

// Returns common factors of two or three numbers
export function getCommonFactors(a, b, c = null) {
  const fA = new Set(getFactors(a));
  const fB = getFactors(b);
  let common = fB.filter((x) => fA.has(x));
  if (c != null) {
    const fC = new Set(getFactors(c));
    common = common.filter((x) => fC.has(x));
  }
  return common.sort((x, y) => x - y);
}

// Returns prime factors of n in ascending order (e.g. 12 -> [2, 2, 3], 18 -> [2, 3, 3])
export function getPrimeFactors(n) {
  n = Math.abs(n);
  const primes = [];
  let d = 2;
  while (n >= 2) {
    if (n % d === 0) {
      primes.push(d);
      n = n / d;
    } else {
      d++;
    }
  }
  return primes;
}

// Generates factor tree nodes for interactive visual factor trees
export function getFactorTree(n) {
  const primes = getPrimeFactors(n);
  if (primes.length <= 1) {
    return { val: n, value: n, isPrime: true };
  }
  
  // Pick smallest prime factor
  const p = primes[0];
  const remainder = n / p;
  return {
    val: n,
    value: n,
    left: { val: p, value: p, isPrime: true },
    right: getFactorTree(remainder)
  };
}

// Checks product check identity for 2 numbers: HCF(a, b) * LCM(a, b) === a * b
export function verifyProductIdentity(a, b) {
  const h = gcd(a, b);
  const l = lcm(a, b);
  const prod = a * b;
  return {
    a,
    b,
    hcf: h,
    lcm: l,
    product: prod,
    productNumbers: prod,
    hcfTimesLcm: h * l,
    productHcfLcm: h * l,
    isValid: h * l === prod
  };
}

// Checks if two numbers are coprime (HCF = 1)
export const isCoprime = (a, b) => gcd(a, b) === 1;

// Division ladder method calculator
export function getDivisionLadder(a, b) {
  let nums = [];
  if (Array.isArray(a)) {
    nums = [...a];
  } else {
    nums = [a, b];
  }

  let x = nums[0];
  let y = nums[1];
  const steps = [];
  let currentDivisor = 2;

  while (currentDivisor <= Math.min(x, y)) {
    if (x % currentDivisor === 0 && y % currentDivisor === 0) {
      steps.push({
        divisor: currentDivisor,
        aBefore: x,
        bBefore: y,
        aAfter: x / currentDivisor,
        bAfter: y / currentDivisor
      });
      x = x / currentDivisor;
      y = y / currentDivisor;
    } else {
      currentDivisor++;
    }
  }

  const hcfVal = steps.reduce((prod, s) => prod * s.divisor, 1);
  const lcmVal = hcfVal * x * y;

  return {
    originalA: nums[0],
    originalB: nums[1],
    steps,
    remainderA: x,
    remainderB: y,
    remainders: [x, y],
    sideDivisors: steps.map((s) => s.divisor),
    hcf: hcfVal,
    lcm: lcmVal
  };
}

