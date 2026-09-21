// src/utils/audio.js
// Audio playback engine with queue management and ElevenLabs integration

import { audioMap } from './audioMap.js';
import { STYLE_SETTINGS, VOICE_ID, MODEL_ID } from './styleSettings.js';

let currentAudio = null;
let currentQueueSymbol = null;
let isAudioMuted = false;

export function setAudioMuted(muted) {
  isAudioMuted = muted;
  if (muted) {
    stopNarration();
  }
}

export function say(text) { return { text, style: 'statement' }; }
export function ask(text) { return { text, style: 'question' }; }
export function cheer(text) { return { text, style: 'encouragement' }; }
export function emphasize(text) { return { text, style: 'emphasis' }; }
export function think(text) { return { text, style: 'thinking' }; }
export function celebrate(text) { return { text, style: 'celebration' }; }
export function instruct(text) { return { text, style: 'instruction' }; }

export async function getAudioUrl(text, style = 'statement') {
  if (!text) return null;

  // 1. Check static pre-generated audioMap
  if (audioMap[text]) {
    return audioMap[text];
  }

  // 2. Dynamic fallback via API proxy or Web Speech synth fallback
  const apiKey = import.meta.env?.VITE_ELEVENLABS_API_KEY;
  if (apiKey) {
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text,
          model_id: MODEL_ID,
          voice_settings: STYLE_SETTINGS[style] || STYLE_SETTINGS.statement
        })
      });

      if (response.ok) {
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      }
    } catch (err) {
      console.warn('ElevenLabs API request failed, falling back to silent/synth mode', err);
    }
  }

  return null;
}

export function stopNarration() {
  currentQueueSymbol = null;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

export async function narrate(segments, onComplete) {
  stopNarration();
  if (isAudioMuted || !segments || segments.length === 0) {
    if (onComplete) onComplete();
    return;
  }

  const queueSymbol = Symbol('queue');
  currentQueueSymbol = queueSymbol;

  for (let i = 0; i < segments.length; i++) {
    if (currentQueueSymbol !== queueSymbol) break;

    const segment = segments[i];
    const url = await getAudioUrl(segment.text, segment.style);

    if (currentQueueSymbol !== queueSymbol) break;

    // Preload next segment eager
    if (i + 1 < segments.length) {
      getAudioUrl(segments[i + 1].text, segments[i + 1].style);
    }

    if (url) {
      await new Promise((resolve) => {
        const audio = new Audio(url);
        currentAudio = audio;

        audio.onended = () => {
          if (currentAudio === audio) currentAudio = null;
          resolve();
        };

        audio.onerror = () => {
          if (currentAudio === audio) currentAudio = null;
          resolve();
        };

        audio.play().catch(() => resolve());
      });
    } else {
      // Fallback pause between un-narrated text chunks
      await new Promise((res) => setTimeout(res, 600));
    }
  }

  if (currentQueueSymbol === queueSymbol && onComplete) {
    onComplete();
  }
}
