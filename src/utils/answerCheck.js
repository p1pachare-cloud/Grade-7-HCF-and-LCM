// src/utils/answerCheck.js
// Evaluation engine for integer input, MCQ, true/false and ordering formats

export function checkNumberAnswer(input, q) {
  if (input == null || input === '') return { status: 'invalid' };
  const val = parseInt(input, 10);
  if (isNaN(val)) return { status: 'invalid' };

  if (val === q.answer) {
    return { status: 'correct' };
  }
  return { status: 'wrong' };
}

export function checkOrderingAnswer(userItems, correctItems) {
  if (!userItems || userItems.length !== correctItems.length) return false;
  return userItems.every((item, i) => item === correctItems[i]);
}
