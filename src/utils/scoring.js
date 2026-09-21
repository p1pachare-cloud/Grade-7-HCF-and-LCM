// src/utils/scoring.js
// XP and Star calculation engine

export function calcXP(attemptCount, hintsUsed, streak) {
  let baseXP = 10;
  if (attemptCount === 2) baseXP = 7;
  else if (attemptCount >= 3 || hintsUsed > 0) baseXP = 5;

  const streakBonus = streak >= 5 ? 5 : 0;
  return baseXP + streakBonus;
}

export function calcStarsForWorld(score) {
  if (score >= 9) return 3;
  if (score >= 8) return 2;
  if (score >= 6) return 1;
  return 0;
}

export function calcTotalStars(worldScores) {
  return worldScores.reduce((sum, score) => {
    if (score == null) return sum;
    return sum + calcStarsForWorld(score);
  }, 0);
}
