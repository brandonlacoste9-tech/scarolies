'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { continueChat, emailNote, openingChat, type BookStep, type ChatLink } from '@/lib/chat';
import { getSpeechRecognitionCtor, speechLang } from '@/lib/speech-input';
import { locations } from '@/content/house';
import {
  pickFemaleBrowserVoice,
  planVoicePlayback,
  speechUtteranceLang,
} from '@/lib/voice-playback';
import type { Locale } from '@/i18n/routing';

type Line = { from: 'clinic' | 'guest'; text: string; links?: ChatLink[] };

function duckMusic(speaking: boolean) {
  window.dispatchEvent(new CustomEvent('scarolies:maitre-speaking', { detail: { speaking } }));
}

export function LetsChat() {
  const locale = useLocale() as Locale;
  const t = useTranslations('chat');
  const hello = openingChat(locale);
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([{ from: 'clinic', text: hello }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [micReady, setMicReady] = useState(false);
  const [bookStep, setBookStep] = useState<BookStep>('idle');
  const [bookReason, setBookReason] = useState('');
  const greetedRef = useRef(false);
  const endRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const pendingUrlRef = useRef<string | null>(null);
  const speakTokenRef = useRef(0);

  useEffect(() => {
    setMicReady(Boolean(getSpeechRecognitionCtor()));
  }, []);

  const askRef = useRef<(text: string) => Promise<void>>(async () => {});

  useEffect(() => {
    function onOpen(event: Event) {
      const book = Boolean((event as CustomEvent<{ book?: boolean }>).detail?.book);
      setOpen(true);
      window.dispatchEvent(new CustomEvent('scarolies:chat-visibility', { detail: { open: true } }));
      if (book) {
        greetedRef.current = true;
        queueMicrotask(() => {
          void askRef.current(t('bookPrompt'));
        });
        return;
      }
      if (!greetedRef.current) {
        greetedRef.current = true;
        void speak(hello);
      }
    }
    window.addEventListener('scarolies:open-chat', onOpen);
    return () => window.removeEventListener('scarolies:open-chat', onOpen);
  }, [hello, t]);

  useEffect(() => {
    function flush() {
      const url = pendingUrlRef.current;
      if (!url) return;
      pendingUrlRef.current = null;
      window.speechSynthesis?.cancel();
      const token = speakTokenRef.current;
      void playUrl(url, token).catch(() => {
        pendingUrlRef.current = url;
      });
    }
    window.addEventListener('pointerdown', flush);
    window.addEventListener('keydown', flush);
    return () => {
      window.removeEventListener('pointerdown', flush);
      window.removeEventListener('keydown', flush);
    };
  }, []);

  useEffect(() => {
    setLines([{ from: 'clinic', text: hello }]);
    greetedRef.current = false;
    setBookStep('idle');
    setBookReason('');
  }, [hello]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [lines, open]);

  useEffect(() => {
    return () => {
      speakTokenRef.current += 1;
      audioRef.current?.pause();
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      duckMusic(false);
    };
  }, []);

  function speakBrowser(text: string, token: number) {
    if (!window.speechSynthesis) {
      duckMusic(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = speechUtteranceLang(locale);
    utter.rate = 0.96;
    const voice = pickFemaleBrowserVoice(locale);
    if (voice) utter.voice = voice;
    utter.onend = () => {
      if (token === speakTokenRef.current) duckMusic(false);
    };
    utter.onerror = () => {
      if (token === speakTokenRef.current) duckMusic(false);
    };
    window.speechSynthesis.speak(utter);
    if (token !== speakTokenRef.current) window.speechSynthesis.cancel();
  }

  async function playUrl(url: string, token: number) {
    audioRef.current?.pause();
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.volume = 1;
    audioRef.current = audio;
    audio.onended = () => {
      if (token === speakTokenRef.current) duckMusic(false);
    };
    await audio.play();
    if (token !== speakTokenRef.current) audio.pause();
  }

  async function speak(text: string) {
    const token = ++speakTokenRef.current;
    pendingUrlRef.current = null;
    window.speechSynthesis?.cancel();
    audioRef.current?.pause();
    duckMusic(true);
    try {
      const res = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, locale }),
      });
      if (!res.ok) throw new Error('voice');
      const blob = await res.blob();
      if (!blob.size || blob.type.includes('json') || blob.type.includes('text')) {
        throw new Error('voice');
      }
      if (token !== speakTokenRef.current) return;
      const prevUrl = objectUrlRef.current;
      const url = URL.createObjectURL(blob);
      objectUrlRef.current = url;
      try {
        await playUrl(url, token);
      } catch (error) {
        const name = error instanceof Error ? error.name : 'play';
        if (planVoicePlayback({ receivedAudio: true, playError: name }) === 'wait-for-gesture') {
          pendingUrlRef.current = url;
          return;
        }
        throw error;
      }
      if (prevUrl) URL.revokeObjectURL(prevUrl);
    } catch {
      if (token !== speakTokenRef.current) return;
      if (planVoicePlayback({ receivedAudio: false }) !== 'browser-tts') {
        duckMusic(false);
        return;
      }
      speakBrowser(text, token);
    }
  }

  async function openDesk() {
    setOpen(true);
    window.dispatchEvent(new CustomEvent('scarolies:chat-visibility', { detail: { open: true } }));
    if (greetedRef.current) return;
    greetedRef.current = true;
    await speak(hello);
  }

  function closeDesk() {
    setOpen(false);
    window.dispatchEvent(new CustomEvent('scarolies:chat-visibility', { detail: { open: false } }));
    speakTokenRef.current += 1;
    pendingUrlRef.current = null;
    window.speechSynthesis?.cancel();
    audioRef.current?.pause();
    duckMusic(false);
    setBookStep('idle');
    setBookReason('');
  }

  async function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setInput('');
    setLines((prev) => [...prev, { from: 'guest', text: trimmed }]);
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: trimmed,
          locale,
          bookStep,
          bookReason,
        }),
      });
      const data = (await res.json()) as {
        reply?: string;
        step?: BookStep;
        reason?: string;
        links?: ChatLink[];
      };
      const local = continueChat(trimmed, locale, { step: bookStep, reason: bookReason });
      const reply = data.reply?.trim() || local.reply;
      const nextStep = data.step ?? local.step;
      const nextReason = data.reason ?? local.reason;
      const links = data.links?.length ? data.links : local.links;
      setBookStep(nextStep);
      setBookReason(nextReason);
      setLines((prev) => [...prev, { from: 'clinic', text: reply, links }]);
      await speak(reply);
    } catch {
      const local = continueChat(trimmed, locale, { step: bookStep, reason: bookReason });
      setBookStep(local.step);
      setBookReason(local.reason);
      setLines((prev) => [...prev, { from: 'clinic', text: local.reply, links: local.links }]);
      await speak(local.reply);
    } finally {
      setBusy(false);
    }
  }

  askRef.current = ask;

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void ask(input);
  }

  function listen() {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor || listening) return;
    const recog = new Ctor();
    recog.lang = speechLang(locale);
    recog.interimResults = false;
    recog.continuous = false;
    recog.onresult = (event) => {
      const said = event.results[0]?.[0]?.transcript?.trim();
      if (said) void ask(said);
    };
    recog.onerror = () => setListening(false);
    recog.onend = () => setListening(false);
    setListening(true);
    recog.start();
  }

  const lastGuest = [...lines].reverse().find((line) => line.from === 'guest')?.text;
  const noteHref = lastGuest ? emailNote(lastGuest) : locations[0].phoneHref;

  return (
    <>
      {open ? (
        <section
          className="fixed right-4 bottom-20 z-50 flex max-h-[min(32rem,70dvh)] w-[min(calc(100vw-2rem),22rem)] flex-col overflow-hidden rounded-xl bg-paper shadow-[0_16px_40px_rgba(1,2,5,0.18)] md:bottom-24"
          aria-label={t('title')}
        >
          <header className="flex items-start justify-between gap-3 bg-navy px-4 py-3 text-paper">
            <div>
              <h2 className="font-heading text-xl leading-none tracking-wide uppercase">{t('title')}</h2>
              <p className="mt-1 text-xs text-paper/55">{t('status')}</p>
            </div>
            <button type="button" onClick={closeDesk} className="text-sm text-gold">
              {t('close')}
            </button>
          </header>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {lines.map((line, i) => (
              <div
                key={`${line.from}-${i}`}
                className={
                  line.from === 'clinic'
                    ? 'max-w-[92%] rounded-2xl rounded-tl-sm bg-wash px-3 py-2 text-sm leading-relaxed text-ink'
                    : 'ml-auto max-w-[92%] rounded-lg bg-navy px-3 py-2 text-right text-sm leading-relaxed text-paper'
                }
              >
                <p>{line.text}</p>
                {line.links?.length ? (
                  <span className="mt-2 flex flex-wrap gap-2">
                    {line.links.map((link) => (
                      <a
                        key={`${link.href}-${link.label}`}
                        href={link.href}
                        className="rounded-md bg-navy px-2 py-1 text-xs text-paper"
                      >
                        {link.label}
                      </a>
                    ))}
                  </span>
                ) : null}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-line px-4 py-2 text-xs text-muted">
            {bookStep === 'idle' ? (
              <button type="button" onClick={() => void ask(t('bookPrompt'))} className="text-navy">
                {t('book')}
              </button>
            ) : null}
            <a href={locations[0].phoneHref}>{locations[0].phone}</a>
            {lastGuest ? <a href={noteHref}>{t('emailNote')}</a> : null}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2 border-t border-line px-3 py-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                bookStep === 'reason'
                  ? t('placeholderReason')
                  : bookStep === 'attached'
                    ? t('placeholderAttached')
                    : t('placeholder')
              }
              className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
              aria-label={t('placeholder')}
            />
            {micReady ? (
              <button
                type="button"
                onClick={listen}
                className="text-sm text-muted"
                aria-pressed={listening}
              >
                {listening ? t('listening') : t('mic')}
              </button>
            ) : null}
            <button type="submit" disabled={busy} className="text-sm text-ink">
              {t('send')}
            </button>
          </form>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => void openDesk()}
          className="fixed right-4 bottom-[4.75rem] z-40 flex items-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm text-paper md:bottom-24"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          </svg>
          {t('open')}
        </button>
      )}
    </>
  );
}
