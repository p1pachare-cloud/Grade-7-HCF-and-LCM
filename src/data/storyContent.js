// src/data/storyContent.js
// Story Panels Content Data for whole-number HCF & LCM

export const STORY_PANELS = [
  {
    id: 1,
    title: 'Meet the Global Math Guild 🔍',
    subtitle: 'Connecting 11 Friends Across the World',
    emoji: '🔍',
    image: './assets/story/panel1.png',
    imageAlt: 'Global Math Guild Members around the world',
    text: 'John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, and Priya form the Global Math Guild — solving everyday HCF and LCM mysteries in cities around the world!',
    takeaway: '💡 11 Explorers around the world solving HCF & LCM mysteries together!',
    hasCapsule: false,
    mapInteractive: true
  },
  {
    id: 2,
    title: "Priya's Flags & Common Factors 🚩",
    subtitle: 'Understanding Factors & HCF',
    emoji: '🚩',
    image: './assets/story/panel2.png',
    imageAlt: 'Priya grouping red and blue flags in Mumbai',
    text: 'Priya in Mumbai has 12 red flags and 18 blue flags. Factors of 12 are 1, 2, 3, 4, 6, 12. Factors of 18 are 1, 2, 3, 6, 9, 18. The common factors are 1, 2, 3, and 6.',
    takeaway: '💡 HCF(12, 18) = 6 — Largest equal group size with zero remainder!',
    hasCapsule: false
  },
  {
    id: 3,
    title: "Diego's Lamps & Common Multiples 💡",
    subtitle: 'Understanding Multiples & LCM',
    emoji: '💡',
    image: './assets/story/panel3.png',
    imageAlt: 'Diego watching signal lamps in Buenos Aires',
    text: 'Diego in Buenos Aires watches two signal lamps blinking every 12 seconds and every 18 seconds. Multiples of 12 are 12, 24, 36, 48... Multiples of 18 are 18, 36, 54, 72...',
    takeaway: '💡 LCM(12, 18) = 36s — First time repeating signals flash together!',
    hasCapsule: false
  },
  {
    id: 4,
    title: "Mike's Prime Factor Trees 🌲",
    subtitle: 'Breaking Numbers Down to Primes',
    emoji: '🌲',
    image: './assets/story/panel4.png',
    imageAlt: 'Mike building factor trees in New York',
    text: 'Mike in New York builds factor trees to find prime factorisations. 12 splits into 2 × 2 × 3. 18 splits into 2 × 3 × 3. Every composite number can be uniquely expressed as a product of prime numbers!',
    takeaway: '💡 Prime Tree: Every composite number is built from prime building blocks!',
    hasCapsule: false
  },
  {
    id: 5,
    title: "Sofia's Prime Venn Overlap ⭕",
    subtitle: 'HCF & LCM from Prime Factors',
    emoji: '⭕',
    image: './assets/story/panel5.png',
    imageAlt: 'Sofia organizing prime factors in a Venn diagram in Madrid',
    text: 'Sofia in Madrid places prime factors into a Venn diagram. Shared prime factors in the overlap are 2 and 3. HCF = 2 × 3 = 6. For LCM, multiply all prime factors: 2 × 2 × 3 × 3 = 36!',
    takeaway: '💡 Venn Method: Shared primes product = HCF (6); All primes product = LCM (36)!',
    hasCapsule: false
  },
  {
    id: 6,
    title: 'Aisha & Carlos’s Division Ladder 🪜',
    subtitle: 'The Division Ladder Method',
    emoji: '🪜',
    image: './assets/story/panel6.png',
    imageAlt: 'Aisha and Carlos solving division ladder in Cairo and Mexico City',
    text: 'Aisha in Cairo and Carlos in Mexico City use the division ladder method for 24 and 36. Divide both by 2, then 2, then 3. HCF is the product of side divisors (2 × 2 × 3 = 12). LCM is side divisors times bottom remainders (12 × 2 × 3 = 72)!',
    takeaway: '💡 Ladder Method: Side product = HCF (12); Side × Bottom = LCM (72)!',
    hasCapsule: false
  },
  {
    id: 7,
    title: 'The Guild Rule Card Unlocked! 🏅',
    subtitle: 'Golden Rules for HCF and LCM',
    emoji: '🏅',
    image: './assets/story/panel7.png',
    imageAlt: 'Global Guild Rule Card for HCF and LCM',
    text: 'Here is the Guild master rule. For any two numbers: HCF × LCM = product of the two numbers! Use HCF for equal packing and grouping. Use LCM for repeating events that sync together!',
    takeaway: '💡 Master Identity: HCF × LCM = a × b for any two numbers!',
    hasCapsule: false,
    showRuleCard: true
  }
];
