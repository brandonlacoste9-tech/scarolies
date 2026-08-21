import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { DamaskFrame } from '@/components/layout/DamaskFrame';
import { bookUrl, locations } from '@/content/house';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'clinic' });
  return { title: t('title') };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('clinic');
  const desk = locations[0];
  const reserve = bookUrl(locale);

  return (
    <DamaskFrame innerClassName="mx-auto max-w-[760px] px-6 py-16 md:px-10 md:py-24">
      <div>
      <p className="text-[0.72rem] tracking-[0.28em] text-muted uppercase">{t('kicker')}</p>
      <h1 className="mt-3 text-5xl font-medium md:text-7xl">{t('title')}.</h1>
      <p className="mt-6 text-lg text-muted">{t('lead')}</p>
      <p className="mt-6 text-lg">{t('tech')}</p>
      <figure className="stitch-card mt-10 p-4">
        <Image
          src="/hero.jpg"
          alt={t('techCaption')}
          width={1200}
          height={800}
          className="relative z-10 h-auto w-full"
          sizes="(max-width: 760px) 100vw, 760px"
          priority
        />
        <figcaption className="relative z-10 mt-3 text-sm text-muted">{t('techCaption')}</figcaption>
      </figure>
      <figure className="stitch-card mt-6 p-4">
        <Image
          src="/gallery/21.jpg"
          alt=""
          width={1200}
          height={800}
          className="relative z-10 h-auto w-full"
          sizes="(max-width: 760px) 100vw, 760px"
        />
      </figure>
      <div className="mt-10 flex flex-wrap gap-6">
        <Link href="/locations" className="text-sm tracking-[0.12em] uppercase">
          {t('locationCta')}
        </Link>
        <a href={reserve} target="_blank" rel="noreferrer" className="text-sm tracking-[0.12em] uppercase">
          TB Dine
        </a>
        <a href={desk.phoneHref}>{desk.phone}</a>
      </div>
      </div>
    </DamaskFrame>
  );
}
