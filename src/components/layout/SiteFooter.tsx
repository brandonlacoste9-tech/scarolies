import { getLocale, getTranslations } from 'next-intl/server';
import { house, locations } from '@/content/house';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

export async function SiteFooter() {
  const t = await getTranslations('footer');
  const nav = await getTranslations('nav');
  const locale = (await getLocale()) as Locale;
  const site = locations[0];

  return (
    <footer className="leather stitch mt-auto pb-16 text-paper">
      <div className="relative z-10 mx-auto grid max-w-[1280px] gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <p className="text-[0.58rem] tracking-[0.28em] text-gold uppercase">Ristorante</p>
          <p className="wordmark mt-1 text-2xl text-paper">{house.shortName}</p>
          <p className="mt-3 text-sm text-paper/70">{t('line')}</p>
        </div>
        <address className="not-italic text-sm leading-relaxed text-paper/80">
          <span className="mb-4 block">
            <span className="block text-paper">{site.name[locale]}</span>
            {site.addressLines[locale].map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block">{site.postal}</span>
            <a href={site.phoneHref} className="text-gold hover:text-paper">
              {site.phone}
            </a>
            <a href={house.emailHref} className="mt-1 block text-gold hover:text-paper">
              {house.email}
            </a>
          </span>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.72rem] tracking-[0.16em] uppercase">
            <Link href="/menu">{nav('menu')}</Link>
            <Link href="/locations">{nav('locations')}</Link>
            <Link href="/contact">{nav('contact')}</Link>
            <a href={house.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>
        </address>
      </div>
    </footer>
  );
}
