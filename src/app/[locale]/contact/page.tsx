import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { bookUrl, house, locations } from '@/content/house';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('title') };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const lang = locale as Locale;
  const site = locations[0];
  const reserve = bookUrl(lang);
  const vip = lang === 'fr' ? house.vipFr : house.vipEn;

  return (
    <section className="mx-auto max-w-[760px] px-6 py-16 md:py-24">
      <p className="text-[0.72rem] tracking-[0.28em] text-muted uppercase">{t('kicker')}</p>
      <h1 className="mt-3 text-5xl font-medium md:text-7xl">{t('title')}.</h1>
      <article className="stitch-card mt-12 p-6">
        <h2 className="relative z-10 text-3xl font-medium">{site.name[lang]}</h2>
        <p className="relative z-10 mt-3">
          {site.addressLines[lang].map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block">{site.postal}</span>
        </p>
        <a href={site.phoneHref} className="relative z-10 mt-3 block text-accent">
          {site.phone}
        </a>
        <a href={house.emailHref} className="relative z-10 mt-1 block text-accent">
          {house.email}
        </a>
        <p className="relative z-10 mt-2 text-sm text-muted">{site.visitHours[lang]}</p>
        <a href={site.mapUrl} className="relative z-10 mt-2 inline-block text-sm">
          {t('map')}
        </a>
      </article>
      <h2 className="mt-14 text-3xl font-medium">{t('emailTitle')}</h2>
      <p className="mt-3 text-sm text-muted">{t('emailNote')}</p>
      <div className="mt-10 flex flex-wrap gap-6">
        <a href={reserve} target="_blank" rel="noreferrer" className="text-sm tracking-[0.12em] uppercase">
          {t('bookCta')} →
        </a>
        <a href={vip} className="text-sm tracking-[0.12em] uppercase">
          {lang === 'fr' ? 'Liste VIP (site actuel)' : 'VIP list (live site)'} →
        </a>
        <Link href="/appointment" className="text-sm tracking-[0.12em] uppercase">
          {lang === 'fr' ? 'Une table' : 'A table'}
        </Link>
      </div>
    </section>
  );
}
