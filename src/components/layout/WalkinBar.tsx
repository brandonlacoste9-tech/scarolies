'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { openMaitre } from '@/components/OpenMaitre';
import { locations } from '@/content/house';

export function WalkinBar() {
  const hours = useTranslations('hours');
  const nav = useTranslations('nav');
  const desk = locations[0];
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    function onVis(event: Event) {
      setChatOpen(Boolean((event as CustomEvent<{ open?: boolean }>).detail?.open));
    }
    window.addEventListener('scarolies:chat-visibility', onVis);
    return () => window.removeEventListener('scarolies:chat-visibility', onVis);
  }, []);

  if (chatOpen) return null;

  return (
    <div className="leather stitch fixed inset-x-0 bottom-0 z-40">
      <div className="relative z-10 mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-4 py-2 md:px-6">
        <p className="min-w-0 truncate text-[0.62rem] tracking-[0.06em] text-paper/90 sm:text-[0.68rem]">
          {hours('banner')}
        </p>
        <span className="flex shrink-0 gap-4">
          <button
            type="button"
            onClick={() => openMaitre(true)}
            className="text-[0.72rem] font-medium tracking-[0.08em] text-gold uppercase underline-offset-2 hover:underline"
          >
            {nav('book')}
          </button>
          <a
            href={desk.phoneHref}
            className="text-[0.72rem] font-medium tracking-[0.08em] text-gold uppercase underline-offset-2 hover:underline"
          >
            {nav('call')}
          </a>
        </span>
      </div>
    </div>
  );
}
