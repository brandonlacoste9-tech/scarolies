'use client';

import { useLocale, useTranslations } from 'next-intl';
import { bookUrl, locations } from '@/content/house';

export function WalkinBar() {
  const hours = useTranslations('hours');
  const nav = useTranslations('nav');
  const locale = useLocale();
  const desk = locations[0];

  return (
    <div className="leather stitch fixed inset-x-0 bottom-0 z-40">
      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col gap-1 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <p className="text-[0.62rem] tracking-[0.06em] text-paper/90 sm:text-[0.68rem]">{hours('banner')}</p>
        <span className="flex gap-4">
          <a
            href={bookUrl(locale)}
            target="_blank"
            rel="noreferrer"
            className="text-[0.72rem] font-medium tracking-[0.08em] text-gold uppercase underline-offset-2 hover:underline"
          >
            {nav('book')}
          </a>
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
