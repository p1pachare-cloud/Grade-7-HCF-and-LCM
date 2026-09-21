# Product Requirements Document (PRD)

## HCF & LCM Using Fractions — Simplify, Share, Sync | Grade 7 Math

### Intellia SG | Global Grade 7 Mathematics Curriculum

---

## 1. Executive Summary

This document defines the product requirements for **"Global Fraction Guild — HCF & LCM with Fractions"**, an interactive, gamified, simulation-based lesson module for **Grade 7 students (age 12–13)**. The module teaches how the **Highest Common Factor (HCF / GCF)** and **Lowest Common Multiple (LCM)** work with fractions:

1. Using the HCF to **simplify** fractions to lowest terms
2. Using the LCM of denominators (the **LCD**) to **compare, add and subtract** unlike fractions
3. Finding the **HCF of fractions** — `HCF(numerators) ÷ LCM(denominators)`
4. Finding the **LCM of fractions** — `LCM(numerators) ÷ HCF(denominators)`
5. Applying both ideas to real-world **"cut it evenly"** and **"when do they sync?"** problems

The module is a standalone **React 18 (Vite + Tailwind)** web application. Its UI, layout, phase flow, component inventory and interaction patterns **strictly mirror** the reference product:

- Reference site: **<https://grade5-time-intervals.vercel.app/>**
- Reference repository: **<https://github.com/p1pachare-cloud/Grade5-Time-Intervals>** (the same repo also resolves under `Intellia-SG/Grade5-Time-Intervals`)

The module is uploaded to the Intellia course area, matching the page template at:

```
https://intelliasg.com/courses/grade-3-math
```

> **Hosting note:** The course URL above is the upload target the product owner specified and is the visual/structural template the page must match. Because this lesson is Grade 7, the embed path is kept configurable (`base` in `vite.config.js`). If a Grade 7 course path is created later, the proposed slug is `/courses/grade-7-math/lessons/hcf-lcm-fractions/`.

Audio narration follows the **ElevenLabs pipeline** in the provided `audio_generation_pipeline.md` — Voice **Alice** (`Xb7hH8MSUJpSbSDYk0k2`), model `eleven_multilingual_v2`, the same per-style voice-settings table, the same hybrid *pre-generation + dynamic fallback* architecture, and the same rule that **only paragraph text and questions are narrated — never titles or headings**.

The learning journey follows Intellia's proven **6-phase model** (INTRO → WONDER → STORY → SIMULATE → PLAY → REFLECT), with a strict **learn-first, practise-second** design: concepts are taught through the story and interactive **Learn Capsules**, then explored in three simulation stations, and only then tested in **100 randomly generated practice questions**.

The story features a multicultural friend group — **John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, Priya** (plus Fatima, Diego, Chloe, Ravi, Amara, Mei and Lars in word problems) — who form the **Global Fraction Guild** and build attractions for the **World Harmony Festival** across ten world cities.

---

## 2. Product Vision & Goals

**Vision** — To make HCF and LCM feel like real building tools rather than memorised procedures. A 12–13 year old should *see* why the HCF is the longest piece that fits every ribbon exactly, *hear* why the LCM is the moment two drum beats meet, and *own* the rule for fractions because they discovered it in a simulation first.

**Goals**

| Goal | Metric |
| ---- | ------ |
| Learning completion | ≥ 85% of students complete all 6 phases |
| Learn-first compliance | 100% of students pass through all 5 Learn Capsules before Simulate unlocks |
| Simulation interaction rate | ≥ 95% complete all 3 stations |
| Practice engagement | ≥ 90% attempt ≥ 10 practice questions |
| Score achievement | Average Play score ≥ 70% on first attempt |
| Session duration | Average engagement ≥ 25 minutes (resumable across sessions) |
| Rule mastery | ≥ 75% correct on "HCF/LCM of fractions" questions (Worlds 6–7) after the simulations |
| Misconception reduction | ≥ 30% fewer "used the wrong rule" errors in Worlds 8–10 compared with Worlds 6–7 |
| Randomization integrity | 0 repeated questions within a session; ≤ 5% overlap with the previous two sessions |
| Curriculum alignment | 100% of content maps to a topic-related objective in Section 4 |

---

## 3. Target Users

**Primary: Grade 7 students (age 12–13)**

- Comfortable with fractions, multiplication tables, and simple factor lists; ready for structure and generalisation
- Learn best when they *discover* a rule in a simulation before being handed the formula
- Motivated by streaks, badges, world maps, and social/global storylines
- Global classroom context — familiar with travel, festivals, music, and international cities

**Secondary: Teachers & parents**

- Assign as classwork, homework, or revision/enrichment
- Expect alignment with recognised global standards and clear evidence of misconceptions (the feedback engine names them)

---

## 3A. Syllabus Scope Filter (topic-related content only)

Global syllabi (Common Core, Singapore MOE, UK National Curriculum, Australian Curriculum, CBSE/ICSE) were reviewed and **only content directly related to this topic** was retained.

| Included in v1.0 | Excluded from v1.0 |
| ---------------- | ------------------ |
| Factors, multiples, primes, prime factorisation (as tools) | Algebraic HCF/LCM (polynomials) |
| HCF and LCM of 2–3 whole numbers | Ratio, proportion, rates |
| Equivalent fractions; simplifying with the HCF | Decimals and percentages |
| LCD; comparing and ordering fractions with the LCD | Negative fractions / rational-number operations |
| Adding and subtracting unlike fractions with the LCD | Multiplying/dividing fractions (used **only** to verify divisibility and the product check) |
| HCF and LCM of 2–3 fractions (lowest terms) | Mixed-number arithmetic (mixed numbers are accepted as answer *formats* only) |
| Product check: HCF × LCM = product of two fractions | HCF/LCM by the Euclidean algorithm (may appear as an optional hint only) |
| Real-world "equal cuts" and "sync" problems | Time-zone or calendar problems |

---

## 4. Curriculum Alignment — Global Grade 7 Mathematics

**Topic:** HCF and LCM Using Fractions
**Programme:** Intellia Grade 7 Math — Number: Factors, Multiples & Fractions

**Source references (cross-mapped by topic; topic-related strands only):**

| Framework | Grade band | Topic-related content mapped |
| --------- | ---------- | ---------------------------- |
| U.S. Common Core | Grades 4–7 | 4.NF.A.1 equivalent fractions · 5.NF.A.1 add/subtract unlike fractions via equivalent fractions · 6.NS.B.4 GCF and LCM of whole numbers · 7.NS.A.1 extension of fraction operations |
| Singapore MOE | Primary 5–6 → Secondary 1 | Fractions (P5–P6); primes, prime factorisation, HCF and LCM (Sec 1) |
| UK National Curriculum | KS3 (Year 7) | Prime numbers, common factors/multiples, HCF, LCM, prime factorisation; using common factors to simplify fractions; using common multiples to express fractions in the same denomination |
| Australian Curriculum | Years 6–7 | Factors and multiples; add/subtract fractions with unrelated denominators; comparing and ordering fractions |
| CBSE / NCERT & ICSE | Classes 6–8 | Playing with Numbers (factors, multiples, HCF, LCM); Fractions; HCF/LCM of fractions as a common extension topic |

> **Validation note:** Framework descriptors above are cited at topic level from public sources. The curriculum lead must confirm exact standard codes before publishing, particularly for the Australian Curriculum (version-dependent codes) and CBSE/ICSE (chapter titles vary by edition).

**Learning Objectives Covered**

| LO | Description |
| -- | ----------- |
| LO1 | Find the HCF and LCM of two or three whole numbers using prime factorisation |
| LO2 | Simplify a fraction to lowest terms by dividing numerator and denominator by their HCF |
| LO3 | Find the LCD (LCM of denominators) and write equivalent fractions over it |
| LO4 | Compare and order unlike fractions using the LCD |
| LO5 | Add and subtract unlike fractions using the LCD; give the answer in lowest terms |
| LO6 | Find the HCF of two or three fractions: `HCF(numerators) ÷ LCM(denominators)` |
| LO7 | Find the LCM of two or three fractions: `LCM(numerators) ÷ HCF(denominators)` |
| LO8 | Interpret the HCF of fractions as the longest unit that measures each quantity exactly, and the LCM as the first common multiple |
| LO9 | Verify results: divisibility check and `HCF × LCM = product` for **two** fractions |
| LO10 | Solve multi-step real-world problems (equal cuts, tiling, repeating events) with fractional quantities |

**Concrete → Pictorial → Abstract (CPA) Progression**

- **Concrete:** Ribbons are physically cut; drum beats are heard and seen (Stations A and B)
- **Pictorial:** Common-denominator grids, fraction bars, number lines and the *Prime Venn* (Learn Capsules; hint overlays)
- **Abstract:** The rules `HCF = HCF(tops) ÷ LCM(bottoms)` and `LCM = LCM(tops) ÷ HCF(bottoms)` (Station C and Play)

**Number Ranges**

- **Easy:** Denominators from {2, 3, 4, 5, 6, 8, 10}; whole numbers 12–60; LCD ≤ 24
- **Medium:** Denominators from {3, 4, 5, 6, 8, 9, 10, 12, 15}; whole numbers 24–120; LCD ≤ 60
- **Hard:** Denominators up to 24; whole numbers 60–360; LCD ≤ 120; three fractions; **"trap" items** in which one fraction is shown *not* in lowest terms
- All fractions used by the HCF/LCM-of-fractions rules are **generated in lowest terms** unless the item is an explicit trap

**Vocabulary Focus:** *factor, multiple, prime, prime factorisation, HCF (GCF), LCM, common denominator, LCD, lowest terms, simplify, equivalent fraction, numerator, denominator, divisible, exactly, leftover (remainder)*

---

## 4A. Math Foundations (Teacher Reference)

### 4A.1 The two rules (fractions must be in lowest terms first)

```
HCF( a/b , c/d ) = HCF(a, c) ÷ LCM(b, d)
LCM( a/b , c/d ) = LCM(a, c) ÷ HCF(b, d)
```

Both extend to three or more fractions in the same way.

### 4A.2 Why they work (the reasoning students discover in the stations)

Write every fraction over the common denominator `D = LCM(b, d)`. Then `a/b = A/D` and `c/d = C/D`, so the fractions are just counts of the tiny unit `1/D`. The longest length that fits both exactly is `HCF(A, C)` copies of `1/D`; the first shared multiple is `LCM(A, C)` copies of `1/D`. Because `a/b` and `c/d` are in lowest terms, this collapses to the two rules above.

**Bonus fact for teachers:** if every input fraction is in lowest terms, the HCF and LCM produced by the rules are **automatically in lowest terms**.

### 4A.3 Worked examples (all values verified)

| Fractions | HCF | LCM | Check |
| --------- | --- | --- | ----- |
| 3/4 and 5/6 | HCF(3,5) ÷ LCM(4,6) = **1/12** | LCM(3,5) ÷ HCF(4,6) = **15/2** | 3/4 = 9 × 1/12; 5/6 = 10 × 1/12; 15/2 = 10 × 3/4 = 9 × 5/6 |
| 2/3 and 4/5 | HCF(2,4) ÷ LCM(3,5) = **2/15** | LCM(2,4) ÷ HCF(3,5) = **4** | 4 = 6 × 2/3 = 5 × 4/5 |
| 3/2 and 9/4 | HCF(3,9) ÷ LCM(2,4) = **3/4** | LCM(3,9) ÷ HCF(2,4) = **9/2** | 3/2 = 2 × 3/4; 9/4 = 3 × 3/4; 9/2 = 3 × 3/2 = 2 × 9/4 |
| 2/3, 4/9, 8/27 | 2 ÷ 27 = **2/27** | 8 ÷ 3 = **8/3** | 2/3 = 9 × 2/27; 4/9 = 6 × 2/27; 8/27 = 4 × 2/27 |
| 3/2, 9/4, 15/8 | 3 ÷ 8 = **3/8** | LCM(3,9,15) ÷ HCF(2,4,8) = **45/2** | 3/2 = 4 × 3/8; 9/4 = 6 × 3/8; 15/8 = 5 × 3/8 |
| 12 and 18 (whole) | **6** | **36** | 6 × 36 = 12 × 18 = 216 |

### 4A.4 The product check — and its limit

For **exactly two** fractions: `HCF × LCM = (first fraction) × (second fraction)`.
Example: `1/12 × 15/2 = 15/24 = 5/8 = 3/4 × 5/6`. ✔
This identity **does not hold for three or more numbers** (in whole numbers as well as fractions). Station C and World 8 explicitly use this as a "True or False" trap.

### 4A.5 Misconception catalogue (drives the distractors and the feedback text)

| ID | Misconception | Example (3/4 & 5/6) | Feedback voice-line theme |
| -- | ------------- | ------------------- | ------------------------- |
| M1 | HCF: took HCF of the bottoms too | 1/2 | "For the HCF, the bottoms use the *LCM* — the pieces must get *smaller*." |
| M2 | LCM: took LCM of the bottoms too | 15/12 | "For the LCM, the bottoms use the *HCF* — the meeting time must get *bigger*." |
| M3 | Used the LCM rule for an HCF question (or vice-versa) | 15/2 for HCF | "Check the size: an HCF can never be bigger than the fractions you started with." |
| M4 | Did not simplify first (trap items) | e.g. 6/8 left as 6/8 | "Are all your fractions in lowest terms? Simplify first!" |
| M5 | Added tops and bottoms | 1/4 + 1/6 = 2/10 | "Fractions add over a *common* denominator. Find the LCD first." |
| M6 | Partial simplification (divided by a common factor that is not the greatest) | 12/18 → 6/9 | "You divided by 2. Can you divide by something bigger?" |
| M7 | Whole-number LCM given as the product | LCM(12,18) = 216 | "The product is *a* common multiple — find the *lowest* one." |
| M8 | Confused HCF with LCM (whole numbers) | HCF(12,18) = 36 | "The HCF is a factor: it must be ≤ the smaller number." |
| M9 | Treated "no waste" as any common piece, not the longest | 1/24 instead of 1/12 | "Right — that fits! Can you find a longer piece that also fits?" |

---

## 5. The 6-Phase Learner Journey (Intellia Model)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ INTRO SCREEN → Progress Map (6-step visual tracker, top bar)               │
│ Welcome: "Hello, Guild Member! Ready to master HCF and LCM with            │
│ fractions? 🌍🧩"  Lesson badge (locked). 6 glowing phase dots visible.     │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1 — WONDER (≈1–2 min)                                                │
│ Hook: "Yuki in Tokyo has two ribbons — 3/4 metre and 5/6 metre. She wants  │
│ to cut both into equal pieces with nothing left over. What is the longest  │
│ piece she can cut?"                                                        │
│ Visual: two ribbons unroll on a number line; scissors hover; Gearo puzzled │
│ → "Let's discover how HCF and LCM work with fractions!"                    │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 2 — STORY + LEARN (≈6–8 min) — "The Global Fraction Guild"           │
│ 7 illustrated story panels, 5 with an interactive Learn Capsule (§7).      │
│ Learning happens FIRST: whole-number HCF/LCM → simplify → LCD →            │
│ HCF of fractions → LCM of fractions → Guild Rule Card.                     │
│ (Panel 5 closes the Wonder hook: Yuki's answer is 1/12 metre.)             │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 3 — SIMULATE (≈8–10 min)                                             │
│ 3 randomized interactive stations — all 3 required to advance              │
│ A — Ribbon Cutter Lab (Concrete → HCF of fractions)                        │
│ B — Beat Sync Drum Deck (Concrete/Pictorial → LCM of fractions)            │
│ C — Formula Forge (Abstract → rules, verification, spot-the-mistake)       │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 4 — PLAY (≈12–15 min)                                                │
│ IntelliPlay™: 100 randomly generated questions across 10 world cities      │
│ 10 questions per world; world unlocks at ≥ 6/10 correct                    │
│ Stars (1–3), XP, badges, streak fire; encouragement-first feedback         │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 5 — REFLECT (≈2 min)                                                 │
│ Journal: "Which rule surprised you most? Explain to Gearo how you know     │
│ which rule to use." · Lesson-complete badge · XP/badge summary             │
│ → "Share with your teacher!" (screenshot / export)                         │
└────────────────────────────────────────────────────────────────────────────┘
```

**Navigation rules**

- Linear unlock: each phase unlocks the next. Completed phases are revisitable via the top-bar dots or the tablet+ sidebar.
- **Learn-first gate:** SIMULATE unlocks only after all 5 Learn Capsules are completed.
- **Practice gate:** PLAY unlocks only after all 3 stations are completed.
- Progress persists in `localStorage` for 24 hours (resume banner on return).

---

## 6. Phase 1 — Wonder (Detailed)

- **Hook (narrated, style `thinking`)**: Yuki's ribbon puzzle (above). Two ribbon bars animate onto a number line; a countdown of "thinking dots" appears above Gearo.
- **Second hook line (style `question`)**: "And if Aisha and Carlos drum every three quarters and five sixths of a second, when do their drums hit together?"
- **Close (style `encouragement`)**: "Let's discover how HCF and LCM help us solve both puzzles!"
- **Interaction:** none required; a "Let's go!" button advances. Students may tap either ribbon to hear a short tick sound that visualises its length.
- **Open loop:** the hook's answer is *not* shown here. It is revealed in Story Panels 5 and 6.

---

## 7. Phase 2 — Story + Learn (Detailed)

**World background:** a world map with pins on each character's city. Panels slide in with staggered animation; each Learn Capsule slides up as a card *inside* the panel and must be completed to continue.

### Panel scripts (on-screen text; the narrated version is the deterministic spoken form — see §11.5)

| # | Panel | Narrated text (style) | Learn Capsule |
| - | ----- | --------------------- | ------------- |
| 1 | **The Guild** | "John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, and Priya are the Global Fraction Guild. They live in eleven cities, and every Friday they meet on a video call to build wonders for the World Harmony Festival." (`statement`) | — (map with 11 pins; tap a pin to hear the person's greeting) |
| 2 | **Priya's Flags (whole-number HCF & LCM)** | "Priya in Mumbai has 12 red flags and 18 blue flags. Every group must have the same number of each colour, with none left over. The biggest number of groups is the HCF of 12 and 18, which is 6." / "Diego in Buenos Aires has two lamps that blink every 12 seconds and every 18 seconds. They blink together for the first time after 36 seconds. That is the LCM." (`statement`, then `emphasis` on "HCF" and "LCM") | **Capsule 1 — Prime Venn:** tap primes to split 12 and 18 into factor trees; shared primes go in the overlap. HCF = product of the overlap (2 × 3 = 6). LCM = product of everything, overlap counted once (2 × 2 × 3 × 3 = 36). Check: 6 × 36 = 12 × 18. |
| 3 | **Mike's Pizza (simplify)** | "Mike in New York ate 12 of the 18 slices of his pizza. Divide the top and the bottom by their HCF, 6. Mike ate two thirds of the pizza, and two thirds is in lowest terms." (`statement`) | **Capsule 2 — Simplify with the HCF:** a fraction bar of 18 slices regroups into 3 big slices as the student taps "÷ 6". Prompt: "Could you divide by something bigger?" (fails: no more common factor). |
| 4 | **Sofia's Paint (LCD)** | "Sofia in Madrid mixes one quarter of a tin of blue paint with one sixth of a tin of yellow paint. Quarters and sixths are different sizes, so she needs the LCM of 4 and 6, which is 12. Three twelfths plus two twelfths makes five twelfths." (`statement`) | **Capsule 3 — LCD Slider:** two fraction bars (1/4, 1/6) are re-cut into twelfths by dragging a slider through 6, 8, **12**; the bars line up only at 12. Then add: 3/12 + 2/12 = 5/12. |
| 5 | **Yuki's Ribbons (HCF of fractions)** | "Yuki in Tokyo cuts her ribbons into equal pieces. Over twelfths, the ribbons are nine twelfths and ten twelfths. The longest piece that fits both is the HCF of 9 and 10, which is 1, so each piece is one twelfth of a metre. That is nine pieces and ten pieces." (`emphasis` at "one twelfth of a metre") | **Capsule 4 — Three ways, one answer:** (a) common-denominator grid, (b) the rule `HCF(3,5) ÷ LCM(4,6)`, (c) a mini ribbon-cut animation. All three arrive at 1/12. *Closes the Wonder hook.* |
| 6 | **Aisha & Carlos's Drums (LCM of fractions)** | "Aisha in Cairo drums every three quarters of a second. Carlos in Mexico City drums every five sixths of a second. Over twelfths, that is nine twelfths and ten twelfths. Their drums meet after fifteen halves of a second, which is seven and a half seconds. Aisha drums ten times and Carlos drums nine times." (`statement`) | **Capsule 5 — Meet-Up Timeline:** two beat tracks tick on a timeline; the first time both flash gold is at 15/2 s. Rule shown: `LCM(3,5) ÷ HCF(4,6) = 15/2`. |
| 7 | **The Guild Rule Card** | "Here is the Guild rule. For the HCF of fractions, take the HCF of the tops over the LCM of the bottoms. For the LCM of fractions, take the LCM of the tops over the HCF of the bottoms. Always simplify first!" (`emphasis`) | **Rule Card unlock:** a collectible card is added to the toolkit (shown in every Play hint overlay). Completes the story phase. |

**Capsule completion rule:** each capsule has 1–2 embedded micro-checks (one tap or one number entry). Wrong answers show a hint and allow retry; a capsule completes on a correct answer or after the hint has been fully revealed.

---

## 8. Phase 3 — Simulation Design (Detailed)

All simulation rounds use **randomized parameters** within fixed constraints (they are never the same numbers as the story examples).

### 8.1 Station A — "Ribbon Cutter Lab" (Concrete → HCF of fractions)

**Visual**

- 2–3 ribbon bars drawn to scale over a shared number line (metres)
- A **cut-length dial** listing 8 candidate fractions (includes the true HCF, one or two shorter lengths that also fit exactly, and 3–4 near-misses that leave waste)
- A "Show the twelfths grid" toggle (common-denominator overlay; the denominator adapts to the round)

**Interaction**

- Student picks a cut length → presses **✂ Cut**. Scissors animate along each ribbon; pieces appear as coloured segments; any leftover is a red hatched stub labelled with its length.
- **Zero-waste cuts** are logged on a "Zero-Waste Wall" (e.g., ✔ 1/24 m, ✔ 1/12 m). The prompt: "Can you find a *longer* piece that still fits?"
- The round completes when the student presses **"This is the longest!"** on the true HCF. Choosing a shorter zero-waste length triggers M9 feedback ("That fits — but can you go longer?").

**Feedback**

- Correct → Gearo celebrates; piece counts are shown (e.g., "9 pieces and 10 pieces").
- Waste → gentle shake + the leftover stub is measured aloud ("You have one twelfth left over. Try a smaller piece.").

**Rounds (random within constraints)**

- **Round 1:** two ribbons; HCF is a unit fraction (e.g., 1/2 m and 3/4 m → 1/4 m)
- **Round 2:** two ribbons; HCF is **not** a unit fraction (e.g., 3/2 m and 9/4 m → 3/4 m)
- **Round 3:** three ribbons (e.g., 3/2, 9/4, 15/8 m → 3/8 m)

### 8.2 Station B — "Beat Sync Drum Deck" (Concrete → Pictorial → LCM of fractions)

**Visual**

- 2–3 drum tracks on a shared time axis (seconds) with ticks at the round's common denominator
- Each drum is a colour-coded character (e.g., Aisha 🥁, Carlos 🥁, Mei 🥁) with a beat-interval label
- A draggable **prediction marker** and a **▶ Play** control (0.5× / 1× / 2×)

**Interaction**

1. Student drags the marker to where they predict *all* drums hit together for the first time.
2. Student presses **Play**; beats flash on each track; every time all drums coincide, a gold burst appears.
3. If the prediction is correct, the marker locks and a "beats counter" table fills (e.g., Aisha 10 beats · Carlos 9 beats).
4. If not, the sim plays to the actual first coincidence and highlights the gap.

**Rounds**

- **Round 1:** two drums, easy (e.g., 1/2 s and 3/4 s → 3/2 s)
- **Round 2:** two drums, medium (e.g., 3/4 s and 5/6 s → 15/2 s)
- **Round 3:** three drums, hard (e.g., 1/2, 3/4, 5/6 s → 15/2 s; beats 15, 10, 9)

**Accessibility:** tap-to-place (no drag) marker positions; audio + visual + haptic-style flash for beats; speed control.

### 8.3 Station C — "Formula Forge" (Abstract)

**Layout — the 5-step ladder**

1. **Simplify** each fraction (tap the ones already in lowest terms)
2. **Tops:** drag the numerators into the `HCF( )` and `LCM( )` slots and compute both
3. **Bottoms:** drag the denominators into the `LCM( )` and `HCF( )` slots and compute both
4. **Assemble:** choose which pair builds the answer (HCF question → tops-HCF over bottoms-LCM; LCM question → tops-LCM over bottoms-HCF)
5. **Verify:** divisibility check (each original ÷ HCF is a whole number / LCM ÷ each original is a whole number); for two fractions also the product check

**Rounds**

- **Round 1 (guided HCF):** all five steps labelled; answer 2 fractions
- **Round 2 (guided LCM):** steps 1 and 5 unlabelled; answer 2 fractions
- **Round 3 (Spot the Mistake):** a worked solution with **one wrong line** (chosen from M1–M4); the student taps the wrong line, then fixes it. Includes one trap where a fraction was not simplified first.

**Completion:** all rounds finished within three attempts each; after the third attempt the worked solution is shown and the round still counts as complete (no penalty), but the *Zero Waste* badge condition is tracked separately in Station A.

---

## 9. Phase 4 — Play: Randomized Question Engine

### 9.1 Randomization philosophy — *every question is random*

There is **no fixed question list**. Each question is **procedurally generated** from a parameterised template when the world loads, using a session-seeded random generator. Numbers, names, cities, contexts, option order and distractors all vary. Each generated question is validated by an **independent solver** before it is shown (§9.6).

### 9.2 Ten question types

| ID | Type | Example (illustrative) | LO |
| -- | ---- | ---------------------- | -- |
| QT1 | HCF of whole numbers (context) | Liam has 42 red beads and 98 blue beads… greatest number of bracelets? | LO1 |
| QT2 | Simplify a fraction with the HCF | Use the HCF to simplify 44/80 | LO2 |
| QT3 | LCM of whole numbers (context) | Squares every 30 cm and every 55 cm — when do they line up? | LO1 |
| QT4 | Compare/order with the LCD | What is the LCD of 3/4 and 5/6? / Order 1/4, 17/12, 11/6 | LO3, LO4 |
| QT5 | Add/subtract unlike fractions (lowest terms) | Use the LCD to work out 8/15 − 7/20 | LO5 |
| QT6 | HCF of fractions (2–3 fractions; traps at hard) | Find the HCF of 13/8, 7/4, 2/8 (trap: 2/8 is not in lowest terms) | LO6 |
| QT7 | LCM of fractions (2–3 fractions) | Find the LCM of 3/4 and 5/6 | LO7 |
| QT8 | Verify & relate (T/F claim; use HCF × LCM = product to find the missing value) | For 3/4 and 5/6 the HCF is 1/12. Find the LCM. | LO8, LO9 |
| QT9 | Word problem — equal pieces (HCF) | Priya has three planks … how many pieces altogether? | LO10 |
| QT10 | Word problem — repeating events (LCM) | Lamps flash every 3/4 and 5/6 seconds. When are they together again? | LO10 |

### 9.3 Answer formats

| Format | Used by | Input |
| ------ | ------- | ----- |
| `mcq` | QT1, QT3, QT6/7 (easy–medium) | 4 options, misconception-tagged distractors |
| `numberInput` | QT4 (LCD), QT9/QT10 (counts) | number pad |
| `fractionInput` | QT2, QT5, QT6/7 (hard), QT8, QT9/10 | stacked numerator/denominator boxes + optional whole-number box for mixed numbers |
| `ordering` | QT4 (medium–hard) | drag tiles (tap-to-swap fallback) |
| `trueFalse` | QT8 | two large buttons |

**Answer-acceptance rules for `fractionInput`:**

- **Equivalent but not in lowest terms** → *"Right value — now write it in lowest terms."* This nudge is shown **once** without consuming an attempt.
- **Improper fraction or equivalent mixed number** accepted where the item allows improper answers (`allowImproper`).
- Decimals are **not** accepted for fraction answers; a friendly prompt asks for a fraction.

### 9.4 World map & blueprint (10 worlds × 10 questions = 100)

Each world has **7 focus questions** (the world's skill) + **3 spiral-review questions** drawn at random from earlier worlds' types. World 1 has 10 focus questions.

| World | City & name | Focus (QT) | Difficulty ramp (Q1→Q10) | E / M / H |
| ----- | ----------- | ---------- | ------------------------ | --------- |
| 1 | **London Ribbon Workshop** | QT1 HCF (whole) | 1 1 1 1 1 1 1 2 2 2 | 7 / 3 / 0 |
| 2 | **New York Pizza Parlour** | QT2 Simplify | 1 1 1 1 1 1 2 2 2 2 | 6 / 4 / 0 |
| 3 | **Sydney Harbour Tiles** | QT3 LCM (whole) | 1 1 1 1 1 2 2 2 2 3 | 5 / 4 / 1 |
| 4 | **Madrid Market Mosaic** | QT4 LCD, compare & order | 1 1 1 1 2 2 2 2 3 3 | 4 / 4 / 2 |
| 5 | **Tokyo Lantern Lane** | QT5 Add/subtract | 1 1 1 2 2 2 2 2 3 3 | 3 / 5 / 2 |
| 6 | **Cairo Spice Bazaar** | QT6 HCF of fractions | 1 1 2 2 2 2 2 3 3 3 | 2 / 5 / 3 |
| 7 | **Mumbai Drum Parade** | QT7 LCM of fractions | 1 1 2 2 2 2 3 3 3 3 | 2 / 4 / 4 |
| 8 | **Rio Carnival Gears** | QT8 Verify & relate | 1 1 2 2 2 2 3 3 3 3 | 2 / 4 / 4 |
| 9 | **Nairobi Sunrise Market** | QT9 Equal-pieces problems | 1 1 2 2 2 3 3 3 3 3 | 2 / 3 / 5 |
| 10 | **Reykjavik Northern Lights Finale** | QT10 Sync problems + multi-step | 1 1 2 2 2 2 3 3 3 3 | 2 / 4 / 4 |
| | **Totals** | | | **35 / 40 / 25** |

**Unlock gate:** ≥ 6/10 correct to unlock the next world (1★ minimum).
**Stars:** 6–7 → ⭐ · 8 → ⭐⭐ · 9–10 → ⭐⭐⭐. **3★ unlocks a hidden "Guild Master Bonus"** of 3 extra hard multi-step questions.
**Retry:** a world can be replayed; a retry always generates a **fresh set** (never the same questions).

### 9.5 Randomization rules

| # | Rule |
| - | ---- |
| R1 | Question parameters come from a seeded PRNG; the session seed comes from `crypto.getRandomValues`. A `?seed=` URL param reproduces a session for QA/debugging. |
| R2 | **No duplicates within a session** (canonical question key). |
| R3 | The last **200** question keys from prior sessions are remembered locally; new questions avoid them where the parameter space allows (soft guarantee, hard fallback to allow reuse). |
| R4 | Option order is shuffled for every MCQ; the correct option's position is uniformly distributed (tested). |
| R5 | Names, cities and contexts are random; the same name never appears in two consecutive questions. |
| R6 | Difficulty follows the world's ramp; spiral questions inherit the difficulty of the slot they fill. |
| R7 | Numbers follow the difficulty ranges in Section 4. Results are size-capped so answers stay student-friendly. |
| R8 | Every item is **self-checked** by an independent solver before display; failures regenerate silently. |
| R9 | Station rounds (Section 8) are randomized under the same principles. |

### 9.6 Distractors, hints and explanations

- **Distractors are misconception-tagged** (M1–M9). When a student picks one, the feedback names the specific idea to revisit.
- **Hint 1 (concept nudge):** e.g., "Are your fractions in lowest terms? Which rule uses the LCM of the bottoms?"
- **Hint 2 (visual):** animated common-denominator grid, ribbon-cut or beat timeline for *that* question's numbers; the Guild Rule Card opens.
- **After 3 attempts:** a step-by-step worked solution is revealed and read aloud; the student moves on with no penalty.

### 9.7 Word-problem templates

**Equal pieces (QT9)**
> "[Name] has [2–3] pieces of [ribbon / rope / wooden plank / pipe] measuring [f₁] metres and [f₂] metres. [Name] cuts them all into equal pieces that are as long as possible, with none left over. How long is each piece? / How many pieces altogether?"

**Repeating events (QT10)**
> "[Name] watches [2–3] [lamps flash / buses leave the station / gears complete a turn] every [f₁] and [f₂] [seconds / hours / minutes] and they start together. After how many [units] are they together again for the first time? / How many times does the first one act before then?"

**Multi-step chains (World 10, hard)**
> "First find the longest piece, then use it to work out how many pieces there are in total." / "First find when they next meet, then find how many times each acts."

---

## 10. Gamification Design

### 10.1 Reward System

- **Stars (⭐):** earned per world (1–3 by score)
- **XP:** 10 XP correct on the first try · 7 XP on the second · 5 XP when a hint was used
- **Streak 🔥:** consecutive correct answers
- **Streak bonus:** +5 XP per correct answer when streak ≥ 5
- No negative scoring, ever.

### 10.2 Badges

- 🏅 **Guild Apprentice** — complete Wonder + Story/Learn
- 🥈 **Gear Builder** — complete all 3 Simulation stations
- 🥇 **Common Ground Champion** — score ≥ 80% (80/100) in Play
- 💎 **Perfect Fit** — 10/10 in any world
- 🔥 **Streak Star** — streak of 10 correct answers
- 🌍 **Global Guild Master** — complete all 6 phases
- 🎯 **Zero Waste** — find the true HCF on the first "This is the longest!" in every Station A round
- 🥁 **Rhythm Sync** — answer 5 LCM-of-fractions or sync problems (QT7/QT10) correctly

### 10.3 Feedback Mechanics

**✅ Correct** — bounce animation, Gearo happy, celebration audio, XP floats up, streak increments.
**❌ Attempt 1** — gentle shake, misconception-specific line, Hint 1.
**❌ Attempt 2** — stronger shake, Hint 2 with visual, Guild Rule Card opens.
**❌ Attempt 3** — full animated explanation, read aloud; no penalty.
Encouragement-first tone throughout.

### 10.4 Mascot — **Gearo**, the friendly gear-shaped fraction robot

- **Mood states:** idle · curious · happy · thinking · celebrating · encouraging
- **Appears in:** Wonder hook, Story panels, Simulation feedback, Play feedback, Reflect
- **Character idea:** two interlocking gears — one labelled HCF (small, careful), one labelled LCM (large, expansive) — that mesh when a question is solved. Same art direction, sizes and animation states as the reference product's mascot.

---

## 11. Audio & Narration Design

Fully aligned with `audio_generation_pipeline.md`.

### 11.1 Pipeline summary

- **Provider:** ElevenLabs only (no Web Speech API fallback, matching the reference)
- **Voice:** Alice (Clear, Engaging Educator) — `Xb7hH8MSUJpSbSDYk0k2`
- **Model:** `eleven_multilingual_v2`
- **Pre-generation:** `scripts/generate_audio.js` → static `.mp3` in `public/assets/audio/`, `src/utils/audioMap.js` auto-generated, 500 ms rate-limit between calls
- **Dynamic fallback:** anything not pre-generated (i.e., **all randomly generated practice questions**) is requested on demand through a serverless proxy `/api/elevenlabs`
- **Cleanup:** `scripts/clean_audio.js` deletes orphaned `.mp3` files
- **Engine:** `say()`, `ask()`, `cheer()`, `emphasize()`, `think()`, `celebrate()`, `instruct()` helpers; `narrate(segments)` with a `currentQueue` symbol; `stopNarration()`; eager preload of segment *i + 1*

### 11.2 Content policy — Paragraphs & Questions ONLY

> **IMPORTANT:** Audio is generated only for paragraph/story text and question text. Titles, headings, world names, station names and section labels are **never** narrated.

### 11.3 Speech styles (from the provided pipeline)

| Style | Stability | Similarity Boost | Style | Speaker Boost | Use |
| ----- | --------- | ---------------- | ----- | ------------- | --- |
| `celebration` | 0.12 | 0.45 | 0.75 | ✅ | Badge unlock, world complete |
| `encouragement` | 0.16 | 0.50 | 0.65 | ✅ | Correct-answer feedback, gentle retries |
| `question` | 0.20 | 0.55 | 0.55 | ✅ | Practice questions |
| `emphasis` | 0.16 | 0.50 | 0.60 | ✅ | Key vocabulary, rules |
| `thinking` | 0.24 | 0.60 | 0.35 | ✅ | Mascot thinking moments, hooks |
| `statement` / `instruction` | 0.20 | 0.55 | 0.50 | ✅ | Story narration, instructions |

### 11.4 Script examples

**Wonder — `thinking` / `question`**
> "Yuki in Tokyo has two ribbons. One is three quarters of a metre long and the other is five sixths of a metre long."
> "She wants to cut both into equal pieces with nothing left over. What is the longest piece she can cut?"

**Station A instruction — `instruction`**
> "Choose a cut length and press cut. Can you find the longest piece that fits every ribbon exactly?"

**Station B instruction — `instruction`**
> "Drag the marker to where you think all the drums hit together. Then press play to check!"

**Play feedback — `celebration` / `encouragement`**
> "Perfect! You found the rule and used it like a Guild master!"
> "Not quite. Check the bottoms. Which rule uses the LCM of the bottoms?"

**Reflect — `thinking`**
> "What an adventure! Can you tell me how you know when to use the HCF and when to use the LCM?"

### 11.5 Parity rule for math text (deliberate clarification of the "1:1 parity" rule)

Math on screen (`3/4`, `12/18`, `HCF`) cannot be read correctly by a text-to-speech engine as-is. To preserve *strict 1:1 parity* without garbled speech:

- Every narrated block has **one source of truth**: the on-screen `display` string, with fractions written as tokens (`{3/4}`).
- The **spoken string** is produced by a single deterministic function, `toSpeech(display)` — `{3/4}` → "three quarters", `{5/6}` → "five sixths", `HCF` → "H C F", digits → words.
- The **spoken string is the audio-map key** and the text stored in `narration.js` / `generate_audio.js`.
- An automated **parity test** asserts, for every narrated UI string, `toSpeech(uiText) === narration.js text`. Any UI change that is not mirrored fails CI.

### 11.6 Audio for randomly generated questions

Because questions are random, their audio cannot all be pre-generated. The strategy:

1. **Pre-generate all fixed narration** (~90–110 phrases: hook, story, Learn Capsules, station instructions, feedback lines, badges, reflect).
2. **Dynamic-generate practice-question audio** on demand via `/api/elevenlabs`, keyed by the *spoken text*.
3. **Cache** each result in memory and IndexedDB so repeats and replays cost nothing.
4. **Eager preload** the next question's audio while the current question is being answered.
5. **Budget guard:** a per-session cap on dynamic requests (default 150) and a visible 🔇 chip if audio is unavailable — the lesson always works silently.
6. The ElevenLabs API key is never shipped in the client bundle; only the serverless proxy holds it. (`VITE_ELEVENLABS_API_KEY` in `.env.local` is used **only** by the offline Node scripts.)

---

## 12. UX & Visual Design Requirements

### 12.1 UI Parity Contract (strict)

The reference product is **<https://grade5-time-intervals.vercel.app/>** and its repository **<https://github.com/p1pachare-cloud/Grade5-Time-Intervals>**. The new module must be structurally identical to it. Implementation must **copy design tokens and shared components from the repository**, not redefine them.

| Area | Must match the reference |
| ---- | ------------------------ |
| Stack | React 18, Vite 5, Tailwind CSS 3.4, lucide-react (same `package.json` shape) |
| Layout | Top bar (Intellia logo · lesson title · 6-phase dot tracker) · main area · bottom bar (XP · stars · streak · phase arrows) · tablet+ vertical phase sidebar |
| Phases | intro → wonder → story → simulate → play → reflect → results |
| Component inventory | `IntroScreen`, `ProgressMap`, five phase components, three station components, `QuestionRenderer` + per-type question components, `HintOverlay`, `XPTracker`, `StarRating`, `BadgePanel`, `StreakCounter`, `WorldMap`, `Mascot`, `FeedbackOverlay` |
| Interaction | Drag with tap-tap fallback; large tap targets; overlay feedback; horizontal-scroll world map with lock icons |
| Animation | Same keyframes: `bounceIn`, `shake`, `floatUp`, `pulseGlow`, `celebrate`, `slideInUp`, `timelineFill` |
| Colour & type | Tokens from the repo's `tailwind.config.js` / `App.css`: brand blue primary, gold for rewards, coral for wrong-answer states, white cards, soft shadows, rounded playful typeface |
| Brand line | "Intellia — Think. Explore. Become." |

**Parity review gate (required before release):** side-by-side screenshots of every phase at 1280 px, 768 px and 375 px against the reference; component-inventory diff; keyframe diff. Only the *new* components below may differ.

### 12.2 New visual components (in the reference's visual language)

| Component | Purpose |
| --------- | ------- |
| `Frac` | Stacked accessible fraction (`role="math"`, `aria-label="three quarters"`) |
| `FractionBar` | Bars divided into equal parts, re-cuttable to any denominator |
| `CommonGrid` | Overlay that re-expresses fractions over a shared denominator |
| `RibbonBar` + `CutOverlay` | Station A ribbons, scissors animation, leftover stub |
| `BeatTrack` + `SyncTimeline` | Station B drums, coincidence bursts, prediction marker |
| `PrimeVenn` + `FactorTree` | Learn Capsule 1 |
| `FormulaSlots` + `StepLadder` | Station C |
| `FractionInput` | Stacked numerator/denominator entry with optional whole-number box |
| `RuleCard` | The collectible Guild Rule Card (opens from hints) |

### 12.3 Visual theme & illustrations

- Cartoon, globally inclusive characters and landmark backdrops per world: Tower Bridge/London, Statue of Liberty/New York, Sydney Opera House, Madrid Plaza, Tokyo lanterns, Cairo bazaar, Mumbai drum parade, Rio carnival gears, Nairobi sunrise market, Reykjavik aurora
- Each world has its own accent colour on the world map
- Fraction colour coding is **consistent across the whole app** (e.g., first fraction = blue, second = coral, third = green) so students can track each fraction from story to station to hint

### 12.4 Accessibility

- Touch targets ≥ 44 × 44 px; keyboard operable (Tab + Enter / Space)
- WCAG AA contrast; never rely on colour alone (patterns for waste/fit)
- Screen-reader labels for fractions, rules and all simulation states
- All drag interactions have tap-tap or keyboard alternatives
- No mandatory time pressure; optional timer in Play only
- Reduced-motion mode replaces sweeps with fades

### 12.5 Responsive design

Primary desktop (1024 px+) and tablet (768 px+); mobile (375 px+) uses a stacked single-column layout. Station B collapses to one track per row with a sticky marker bar.

---

## 13. Global Content Guidelines

- **Names:** John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, Priya, Fatima, Diego, Chloe, Ravi, Amara, Mei, Lars
- **Cities:** London, New York, Sydney, Toronto, Dublin, Madrid, Berlin, Cairo, Mexico City, Tokyo, Mumbai, Dubai, Buenos Aires, Paris, Singapore, Lagos, Shanghai, Stockholm (plus the ten world cities in §9.4)
- **Contexts:** ribbons, ropes, planks, pipes, tiles, beads, flags, lanterns, drums, buses, gears, lamps, paint, pizza
- **Units:** metres, centimetres, seconds, minutes, hours (metric and neutral; no currency or culture-specific measures)
- **Tone:** encouraging, curious, respectful; no stereotypes; the whole group solves problems together
- **Notation:** fractions are always shown stacked; "HCF (GCF)" is shown on first use so US/UK/India/SG students all recognise the term

---

## 14. Success Criteria (v1.0)

| Criterion | Target |
| --------- | ------ |
| All 5 Learn Capsules functional and gate Simulate | ✅ Required |
| All 3 simulation stations functional, randomized | ✅ Required |
| All 6 phases navigable end-to-end | ✅ Required |
| 100 questions generated per session, 0 duplicates | ✅ Required |
| Independent-solver check passes for all generated items | ✅ Required |
| Gamification (XP, stars, 8 badges) working | ✅ Required |
| World map, 10-world progression and retry-with-fresh-set logic | ✅ Required |
| ElevenLabs audio for all fixed narration; dynamic audio for questions | ✅ Required |
| `toSpeech` parity test passes in CI | ✅ Required |
| UI parity review gate passed against the reference product | ✅ Required |
| Mobile / tablet / desktop responsive | ✅ Required |
| WCAG AA accessible | ✅ Required |
| Loads in < 3 seconds (production build) | ✅ Required |
| Hosted at the specified Intellia course page | ✅ Required |

---

## 15. Out of Scope (v1.0)

- Teacher dashboard and backend analytics
- Student login / cross-device persistence
- Multiplayer or class competition
- Parent progress e-mails; printable worksheets
- Algebraic HCF/LCM, decimals, percentages, negative fractions
- Web Speech API fallback (kept out to match the reference audio pipeline)

---

## 16. Risks & Open Questions

| # | Item | Mitigation |
| - | ---- | ---------- |
| 1 | The reference site is a client-rendered SPA and its `src/` tree could not be inspected while drafting this document. The UI Parity Contract was derived from the reference repository's PRD, TRD, `package.json` and `index.html`. | Before development starts, diff `tailwind.config.js`, `App.css` and the component tree in the repository against §12 and update this table. |
| 2 | Upload target says *grade-3-math* while the module is Grade 7. | Keep `base` configurable; confirm the final route with the platform owner. |
| 3 | Dynamic TTS for random questions adds latency and API cost. | Cache + eager preload + per-session budget; fixed narration is pre-generated. |
| 4 | Standard codes in §4 are cited at topic level. | Curriculum lead validation before publish. |
| 5 | HCF/LCM-of-fractions is taught as an extension in some systems and is new in others. | Learn-first capsules re-derive it from common denominators; vocabulary panel explains HCF = GCF. |
| 6 | Reference repository moved between the `p1pachare-cloud` and `Intellia-SG` owners. | Confirm the canonical repository and update links. |

---

**Document Version:** 1.0 | September 2026
**Product:** Intellia — Grade 7 Math, HCF & LCM Using Fractions
**Lesson Title:** Global Fraction Guild — HCF & LCM with Fractions
**Curriculum:** Global Grade 7 Mathematics (Common Core, Singapore MOE, UK NC, Australian Curriculum, CBSE/ICSE cross-aligned, topic-related strands only)
**Reference UI:** <https://grade5-time-intervals.vercel.app/>
**Reference Repo:** <https://github.com/p1pachare-cloud/Grade5-Time-Intervals>
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`, `eleven_multilingual_v2`) — per `audio_generation_pipeline.md`
**Upload Target:** <https://intelliasg.com/courses/grade-3-math>
