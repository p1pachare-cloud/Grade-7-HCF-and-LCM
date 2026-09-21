// src/utils/badgeEngine.js
// Badge definitions and unlock criteria checking engine for HCF & LCM

export const BADGES = [
  { id: 'apprentice', title: 'Guild Apprentice', icon: '🏅', desc: 'Complete Wonder + Story/Learn phases' },
  { id: 'gear_builder', title: 'Ladder & Tree Builder', icon: '🥈', desc: 'Complete all 3 Simulation stations' },
  { id: 'champion', title: 'HCF & LCM Champion', icon: '🥇', desc: 'Score ≥ 80% total in Practice mode' },
  { id: 'perfect_fit', title: 'Perfect 10', icon: '💎', desc: 'Score 10/10 in any world' },
  { id: 'streak_star', title: 'Streak Master', icon: '🔥', desc: 'Achieve a streak of 10 correct answers' },
  { id: 'master', title: 'Global Guild Master', icon: '🌍', desc: 'Complete all 6 learning phases' },
  { id: 'zero_waste', title: 'Zero Remainder', icon: '🎯', desc: 'Find the true HCF on first try in Station A' },
  { id: 'rhythm_sync', title: 'Sync Master', icon: '🥁', desc: 'Answer 5 LCM sync or word problems correctly' }
];

export function checkBadges(state) {
  const newBadges = [...state.badges];

  const unlock = (id) => {
    if (!newBadges.includes(id)) {
      newBadges.push(id);
    }
  };

  // Apprentice
  if (state.phaseComplete.wonder && state.phaseComplete.story) {
    unlock('apprentice');
  }

  // Gear Builder
  if (state.simStationsComplete.every(Boolean)) {
    unlock('gear_builder');
  }

  // Perfect Fit
  if (state.worldScores.some((score) => score === 10)) {
    unlock('perfect_fit');
  }

  // Streak Star
  if (state.maxStreak >= 10) {
    unlock('streak_star');
  }

  // Rhythm Sync
  if (state.syncCorrect >= 5) {
    unlock('rhythm_sync');
  }

  // Zero Waste
  if (state.stationAZeroWaste) {
    unlock('zero_waste');
  }

  // Champion
  const totalCorrect = state.worldScores.reduce((a, b) => a + (b || 0), 0);
  if (totalCorrect >= 80) {
    unlock('champion');
  }

  // Global Guild Master
  if (Object.values(state.phaseComplete).every(Boolean)) {
    unlock('master');
  }

  return newBadges;
}
