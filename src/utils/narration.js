// src/utils/narration.js
// Narration scripts for each phase using segment helpers (paragraphs & questions ONLY)

import { say, ask, cheer, emphasize, think, celebrate, instruct } from './audio.js';
import { toSpeech } from './toSpeech.js';

export function getIntroNarration() {
  return [
    say("Hello, Guild Member! Ready to master H C F and L C M?")
  ];
}

export function getWonderNarration() {
  return [
    think("Priya in Mumbai has 24 red items and 36 blue items."),
    ask("What is the largest group size she can pack with none left over?"),
    ask("And if Diego's signal lamps blink every 12 seconds and every 18 seconds, when do they blink together for the first time?"),
    cheer("Let's discover how H C F and L C M help us solve both puzzles!")
  ];
}

export function getStoryPanelNarration(panelIndex) {
  switch (panelIndex) {
    case 0:
      return [
        say("John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, and Priya are the Global Math Guild. Every Friday they meet on a video call to build wonders for the World Harmony Festival.")
      ];
    case 1:
      return [
        say("Priya has 12 red flags and 18 blue flags. The factors of 12 are 1, 2, 3, 4, 6, and 12. The factors of 18 are 1, 2, 3, 6, 9, and 18. The common factors are 1, 2, 3, and 6."),
        emphasize("The greatest common factor is 6. So Priya can make at most 6 equal groups with 2 red flags and 3 blue flags in each group!")
      ];
    case 2:
      return [
        say("Diego watches two signal lamps that blink every 12 seconds and every 18 seconds. Multiples of 12 are 12, 24, 36, 48, 60. Multiples of 18 are 18, 36, 54, 72."),
        emphasize("The lowest common multiple is 36. Both lamps blink together for the first time after 36 seconds!")
      ];
    case 3:
      return [
        say("To find the prime factorisation, split numbers into prime factor trees. 12 equals 2 times 2 times 3. 18 equals 2 times 3 times 3. The shared prime factors are 2 and 3."),
        emphasize("Multiply the shared prime factors 2 times 3 to get the H C F, which equals 6!")
      ];
    case 4:
      return [
        say("To find the L C M using prime factorisation, multiply all prime factors, counting the shared prime factors only once."),
        emphasize("2 times 2 times 3 times 3 equals 36. That is the L C M!")
      ];
    case 5:
      return [
        say("The division ladder method lets us divide both numbers by common prime factors step by step. Divide 24 and 36 by 2 to get 12 and 18, then by 2 to get 6 and 9, then by 3 to get 2 and 3."),
        emphasize("The product of the side divisors gives the H C F, 12! The product of side divisors and bottom remainders gives the L C M, 72!")
      ];
    case 6:
      return [
        emphasize("Here is the Guild rule. For any two numbers, H C F times L C M equals the product of the two numbers! Use H C F for equal grouping and cutting problems, and L C M for repeating events that sync together.")
      ];
    default:
      return [];
  }
}

export function getStationIntroNarration(stationIndex) {
  switch (stationIndex) {
    case 0:
      return [instruct("Choose a pack size and test if it divides all item groups with zero remainder. Can you find the greatest pack size?")];
    case 1:
      return [instruct("Select or drag your marker to predict when both signals sync together. Then press play to verify!")];
    case 2:
      return [instruct("Work through the 5-step ladder to build factor trees and division ladder steps!")];
    default:
      return [];
  }
}

export function getQuestionNarration(question) {
  if (!question) return [];
  const text = question.spoken || toSpeech(question.stem);
  return [ask(text)];
}

export function getReflectNarration() {
  return [
    think("What an adventure! Can you tell me how you know when to use H C F and when to use L C M?")
  ];
}
