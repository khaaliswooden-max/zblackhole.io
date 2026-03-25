'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { clearActivePlayer, registerActivePlayer } from './audioRegistry';

type AudioPlayerProps = {
  src: string;
  label?: string;
};

export default function AudioPlayer({ src, label = 'Listen' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  const pauseSelf = useCallback(() => {
    const el = audioRef.current;
    if (el) {
      el.pause();
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    return () => clearActivePlayer(pauseSelf);
  }, [pauseSelf]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el || error) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      clearActivePlayer(pauseSelf);
      return;
    }
    registerActivePlayer(pauseSelf);
    el.play().catch(() => {
      setError(true);
      setPlaying(false);
      clearActivePlayer(pauseSelf);
    });
    setPlaying(true);
  };

  return (
    <div className="flex items-center gap-2">
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        className="sr-only"
        aria-hidden
        onEnded={() => {
          setPlaying(false);
          clearActivePlayer(pauseSelf);
        }}
        onError={() => {
          setError(true);
          setPlaying(false);
          clearActivePlayer(pauseSelf);
        }}
      />
      <button
        type="button"
        onClick={toggle}
        disabled={error}
        className="audio-play-btn flex items-center justify-center"
        style={{
          width: 28,
          height: 28,
          border: '1px solid var(--line)',
          borderRadius: 0,
          background: 'var(--bg)',
          color: 'var(--fg-dim)',
          cursor: error ? 'not-allowed' : 'pointer',
          transition: 'color 150ms ease',
        }}
        aria-label={error ? 'Audio pending upload' : playing ? 'Pause' : label}
        aria-pressed={error ? undefined : playing ? 'true' : 'false'}
      >
        {error ? (
          <span className="text-[8px] leading-none font-mono uppercase" style={{ color: 'var(--fg-muted)' }}>
            —
          </span>
        ) : playing ? (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
            <rect x="1" y="1" width="3" height="8" />
            <rect x="6" y="1" width="3" height="8" />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
            <path d="M2 1 L9 5 L2 9 Z" />
          </svg>
        )}
      </button>
      <span className="font-mono text-[10px] uppercase" style={{ color: 'var(--fg-muted)' }}>
        {error ? 'Audio pending upload' : label}
      </span>
    </div>
  );
}
