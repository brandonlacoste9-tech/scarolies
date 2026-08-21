'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { LocaleSwitch } from '@/components/layout/LocaleSwitch';
import { OpenMaitreButton, openMaitre } from '@/components/OpenMaitre';
import { bookUrl, house, locations } from '@/content/house';
import { Link, usePathname } from '@/i18n/navigation';

const navItems = [
  { href: '/menu', key: 'menu' },
  { href: '/takeaway', key: 'takeaway' },
  { href: '/locations', key: 'locations' },
  { href: '/about', key: 'clinic' },
  { href: '/contact', key: 'contact' },
] as const;

export function SiteHeader() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const desk = locations[0];
  const reserve = bookUrl(locale);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={open ? 'sticky top-0 z-[70]' : 'sticky top-0 z-30'}>
      <div className="leather stitch text-paper">
        <div className="relative z-10 mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-2 px-4 py-2 text-[0.68rem] md:px-6">
          <span className="tracking-[0.14em] text-gold uppercase">
            {locale === 'fr' ? 'Pointe-Claire · Italien' : 'Pointe-Claire · Italian'}
          </span>
          <span className="flex flex-wrap items-center gap-x-4">
            <a href={desk.phoneHref} className="hover:text-gold">
              {desk.phone}
            </a>
            <a href={reserve} target="_blank" rel="noreferrer" className="hover:text-gold">
              TB Dine
            </a>
          </span>
        </div>
      </div>
      <header className="border-b border-line bg-paper text-ink">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-sm"
        >
          {t('skip')}
        </a>
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-4 py-3 md:px-6">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">{t('menu')}</span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span className="block h-px bg-ink" />
              <span className="block h-px bg-ink" />
              <span className="block h-px bg-ink" />
            </span>
          </button>

          <Link href="/" className="flex min-w-0 flex-1 items-center md:flex-none">
            <Image
              src="/logo.png"
              alt={house.name}
              width={280}
              height={72}
              className="h-11 w-auto md:h-12"
              priority
            />
          </Link>

          <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-x-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  pathname === item.href
                    ? 'text-[0.72rem] tracking-[0.16em] text-accent uppercase'
                    : 'text-[0.72rem] tracking-[0.16em] text-ink/70 uppercase hover:text-ink'
                }
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3 md:gap-5">
            <OpenMaitreButton
              book
              className="inline-flex h-11 items-center bg-navy px-3 text-[0.68rem] tracking-[0.16em] text-paper uppercase md:px-4"
            >
              {t('book')}
            </OpenMaitreButton>
            <div className="hidden md:block">
              <LocaleSwitch tone="light" />
            </div>
          </div>
        </div>

        {open ? (
          <div
            id="mobile-nav"
            className="fixed inset-0 z-[60] flex flex-col bg-paper text-ink md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t('menu')}
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <Link href="/" onClick={() => setOpen(false)}>
                <Image src="/logo.png" alt={house.name} width={280} height={72} className="h-10 w-auto" />
              </Link>
              <button
                type="button"
                className="inline-flex h-11 items-center px-2 text-sm tracking-[0.16em] uppercase"
                onClick={() => setOpen(false)}
              >
                {t('close')}
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 px-6 pt-8" aria-label="Primary">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-line py-4 font-heading text-3xl font-light tracking-wide"
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-6">
              <button
                type="button"
                className="inline-flex h-11 items-center bg-navy px-4 text-[0.72rem] tracking-[0.16em] text-paper uppercase"
                onClick={() => {
                  setOpen(false);
                  openMaitre(true);
                }}
              >
                {t('book')}
              </button>
              <LocaleSwitch tone="light" />
            </div>
          </div>
        ) : null}
      </header>
    </div>
  );
}
