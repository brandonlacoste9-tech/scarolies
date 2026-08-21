'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const STORAGE_KEY = 'scarolies-ambiance';
const SRC = '/audio/italia-ambiance.mp3';
const ROOM_VOLUME = 0.28;

export function AmbiancePlayer() {
  const t = useTranslations('music');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const mutedRef = useRef(false);
  const [on, setOn] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = ROOM_VOLUME;

    if (window.localStorage.getItem(STORAGE_KEY) === '0') {
      mutedRef.current = true;
      setOn(false);
      return;
    }

    async function start() {
      if (mutedRef.current || !audioRef.current) return;
      try {
        await audioRef.current.play();
      } catch {
        /* browsers block until a gesture; keep armed */
      }
      if (mutedRef.current) {
        audioRef.current?.pause();
        return;
      }
      setOn(true);
    }

    void start();

    function onGesture(event: Event) {
      if (mutedRef.current) return;
      const target = event.target;
      if (target instanceof Node && buttonRef.current?.contains(target)) return;
      void start();
    }

    function onMaitre(event: Event) {
      const player = audioRef.current;
      if (!player) return;
      const speaking = Boolean((event as CustomEvent<{ speaking?: boolean }>).detail?.speaking);
      if (speaking) {
        player.volume = 0;
        player.pause();
        return;
      }
      player.volume = ROOM_VOLUME;
      if (!mutedRef.current) {
        void player.play().catch(() => undefined);
      }
    }

    window.addEventListener('pointerdown', onGesture);
    window.addEventListener('keydown', onGesture);
    window.addEventListener('scarolies:maitre-speaking', onMaitre);
    return () => {
      window.removeEventListener('pointerdown', onGesture);
      window.removeEventListener('keydown', onGesture);
      window.removeEventListener('scarolies:maitre-speaking', onMaitre);
    };
  }, []);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (on) {
      mutedRef.current = true;
      audio.pause();
      setOn(false);
      window.localStorage.setItem(STORAGE_KEY, '0');
      return;
    }
    mutedRef.current = false;
    try {
      await audio.play();
      if (mutedRef.current) {
        audio.pause();
        return;
      }
      setOn(true);
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      setOn(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} src={SRC} loop preload="auto" className="hidden" />
      <button
        ref={buttonRef}
        type="button"
        onClick={() => void toggle()}
        aria-pressed={on}
        aria-label={on ? t('off') : t('on')}
        className="fixed bottom-24 left-4 z-40 border-2 border-gold bg-paper/95 px-3 py-2 text-sm tracking-wide text-ink md:left-6"
      >
        <span className="mr-2 text-gold" aria-hidden="true">
          {on ? '♪' : '♭'}
        </span>
        {on ? t('playing') : t('idle')}
      </button>
    </>
  );
}
