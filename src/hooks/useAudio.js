// src/hooks/useAudio.js
// Custom React hook for component audio playback integration

import { useState, useEffect, useCallback } from 'react';
import { narrate, stopNarration, setAudioMuted } from '../utils/audio.js';

export function useAudio(initialMuted = false) {
  const [muted, setMuted] = useState(initialMuted);

  useEffect(() => {
    setAudioMuted(muted);
  }, [muted]);

  const toggleAudio = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  const playNarration = useCallback((segments, onComplete) => {
    if (!muted) {
      narrate(segments, onComplete);
    } else if (onComplete) {
      onComplete();
    }
  }, [muted]);

  const stop = useCallback(() => {
    stopNarration();
  }, []);

  return {
    muted,
    toggleAudio,
    playNarration,
    stop
  };
}
