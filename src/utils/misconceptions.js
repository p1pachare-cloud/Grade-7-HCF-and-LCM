// src/utils/misconceptions.js
// Catalog of whole-number HCF & LCM misconceptions M1-M9 with tailored feedback

export const MISCONCEPTIONS = {
  M1: {
    id: 'M1',
    title: 'Given product as LCM',
    feedbackLine: 'The product of two numbers is a common multiple, but divide by the HCF to find the LOWEST common multiple!',
    hintText: 'Remember the rule: LCM(a, b) = (a × b) ÷ HCF(a, b).'
  },
  M2: {
    id: 'M2',
    title: 'Confused HCF with LCM',
    feedbackLine: 'Check the size! The HCF is a factor (divisor), so it must be less than or equal to the smaller number.',
    hintText: 'HCF is a factor (≤ smaller number), LCM is a multiple (≥ larger number).'
  },
  M3: {
    id: 'M3',
    title: 'Confused LCM with HCF',
    feedbackLine: 'The LCM is a multiple (product), so it must be greater than or equal to the larger number!',
    hintText: 'List multiples for LCM (products), list factors for HCF (divisors).'
  },
  M4: {
    id: 'M4',
    title: 'Missed common prime factor in Venn overlap',
    feedbackLine: 'Check all prime factor trees! Did you include every shared prime factor in the HCF overlap?',
    hintText: 'HCF is the product of ALL shared prime factors in the Venn overlap.'
  },
  M5: {
    id: 'M5',
    title: 'Coprime HCF misconception',
    feedbackLine: 'When two numbers share no common prime factors (coprime), their HCF is always 1!',
    hintText: 'If two numbers are coprime, HCF = 1 and LCM = a × b.'
  },
  M6: {
    id: 'M6',
    title: 'Attempted 3-number product check',
    feedbackLine: 'Careful! The identity HCF × LCM = product holds ONLY for 2 numbers, not 3 or more!',
    hintText: 'For 3 numbers, use prime factorisation or division ladder to find HCF and LCM.'
  },
  M7: {
    id: 'M7',
    title: 'Partial common factor taken',
    feedbackLine: 'You found a common factor, but is it the GREATEST common factor?',
    hintText: 'Keep dividing by common prime factors until the remainders share no common factors.'
  },
  M8: {
    id: 'M8',
    title: 'One number is a multiple of the other',
    feedbackLine: 'When number B is a multiple of number A, HCF = A and LCM = B!',
    hintText: 'Example: for 12 and 36, HCF is 12 and LCM is 36.'
  },
  M9: {
    id: 'M9',
    title: 'Selected equal grouping size with leftover remainder',
    feedbackLine: 'That group size leaves items left over! Pick a number that divides every group exactly with 0 remainder.',
    hintText: 'Zero remainder means the group size must be a factor of both item counts.'
  }
};
