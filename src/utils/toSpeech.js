// src/utils/toSpeech.js
// Converts display math text into spoken words for ElevenLabs TTS generation and audio keys

export function toSpeech(displayStr) {
  if (!displayStr) return '';
  
  let result = displayStr;

  // Convert acronyms to spoken letter tokens
  result = result.replace(/\bHCF\b/g, 'H C F');
  result = result.replace(/\bLCM\b/g, 'L C M');
  result = result.replace(/\bGCF\b/g, 'G C F');

  // Replace math operator signs with spoken words
  result = result.replace(/ ÷ /g, ' divided by ');
  result = result.replace(/ × /g, ' times ');
  result = result.replace(/ \+ /g, ' plus ');
  result = result.replace(/ − /g, ' minus ');
  result = result.replace(/ = /g, ' equals ');

  return result;
}
