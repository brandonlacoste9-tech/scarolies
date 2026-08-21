import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { bookUrl, locations } from '@/content/house';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'locations' });
  return { title: t('title') };
}

export default async function LocationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('locations');
  const lang = locale as Locale;
  const reserve = bookUrl(lang);

  return (
    <section className="mx-auto max-w-[960px] px-6 py-16 md:py-24">
      <p className="text-[0.72rem] tracking-[0.28em] text-muted uppercase">{t('kicker')}</p>
      <h1 className="mt-3 text-5xl font-medium md:text-7xl">{t('title')}.</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{t('lead')}</p>
      <div className="mt-14 grid gap-8">
        {locations.map((site) => (
          <article key={site.id} className="stitch-card p-8">
            <p className="relative z-10 text-sm text-muted">{site.area[lang]}</p>
            <h2 className="relative z-10 mt-2 text-3xl font-medium">{site.name[lang]}</h2>
            <p className="relative z-10 mt-4">
              {site.addressLines[lang].map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              {site.postal ? <span className="block">{site.postal}</span> : null}
            </p>
            <a href={site.phoneHref} className="relative z-10 mt-4 block text-accent">
              {site.phone}
            </a>
            <p className="relative z-10 mt-6 text-sm">
              <span className="block text-muted">{t('visit')}</span>
              {site.visitHours[lang]}
            </p>
            <p className="relative z-10 mt-3 text-sm">
              <span className="block text-muted">{t('phoneHours')}</span>
              {site.phoneHours[lang]}
            </p>
            <div className="relative z-10 mt-6 flex flex-wrap gap-4">
              <a href={reserve} target="_blank" rel="noreferrer" className="text-sm tracking-[0.12em] uppercase">
                TB Dine
              </a>
              <a href={site.mapUrl} className="text-sm tracking-[0.12em] uppercase">
                {t('maps')}
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted">{t('note')}</p>
    </section>
  );
}
