// src/hooks/useSyncClock.js
// Animation clock hook for Station B beat synchronization

import { useState, useEffect, useRef, useCallback } from 'react';

export function useSyncClock({ maxTime, speed = 1, playing = false, onComplete }) {
  const [time, setTime] = useState(0);
  const animationFrameRef = useRef(null);
  const lastTimestampRef = useRef(null);

  const reset = useCallback(() => {
    setTime(0);
    lastTimestampRef.current = null;
  }, []);

  useEffect(() => {
    if (!playing) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      lastTimestampRef.current = null;
      return;
    }

    const tick = (timestamp) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }
      const deltaSeconds = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      setTime((prevTime) => {
        const nextTime = prevTime + deltaSeconds * speed;
        if (maxTime && nextTime >= maxTime) {
          if (onComplete) onComplete();
          return maxTime;
        }
        return nextTime;
      });

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [playing, maxTime, speed, onComplete]);

  return { time, reset, setTime };
}
