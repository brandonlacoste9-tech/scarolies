import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { DishCard } from '@/components/DishCard';
import { bookUrl, housePicks, locations } from '@/content/house';
import { photoForItem } from '@/content/menuPhotos';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const lang = locale as Locale;
  const desk = locations[0];
  const reserve = bookUrl(lang);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy">
        <div className="relative min-h-[min(78vh,46rem)]">
          <Image
            src="/hero.jpg"
            alt={t('heroAlt')}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_48%]"
          />
          <div
            className="absolute inset-0 z-[2] bg-gradient-to-r from-[#0c1628]/90 via-[#12203a]/42 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0c1628]/50 via-transparent to-[#0c1628]/20"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto flex min-h-[min(78vh,46rem)] max-w-[1280px] flex-col justify-end px-6 pb-16 pt-28">
            <div className="stitch leather max-w-xl p-6 md:p-8">
              <div className="relative z-10">
                <p className="text-[0.72rem] tracking-[0.28em] text-gold uppercase">{t('kicker')}</p>
                <h1 className="mt-4 font-heading text-[3.2rem] leading-[0.92] font-medium text-paper md:text-[5.2rem]">
                  {t('title')}
                </h1>
                <p className="mt-5 text-lg font-light text-paper/90">{t('lead')}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={reserve} target="_blank" rel="noreferrer" className="btn btn-gold">
                    {t('ctaCall')}
                  </a>
                  <Link href="/menu" className="btn btn-frost">
                    {t('ctaMenu')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-wash">
        <div className="mx-auto max-w-[1280px] px-6 py-12 md:py-16">
          <p className="text-[0.72rem] tracking-[0.28em] text-muted uppercase">{t('placeKicker')}</p>
          <h2 className="mt-2 text-3xl font-medium md:text-5xl">{t('placeTitle')}</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">{t('placeLead')}</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {locations.map((site) => (
              <li key={site.id} className="stitch-card p-5">
                <p className="relative z-10 text-[0.72rem] tracking-[0.2em] text-muted uppercase">
                  {site.area[lang]}
                </p>
                <h3 className="relative z-10 mt-1 text-xl font-medium">{site.name[lang]}</h3>
                <p className="relative z-10 mt-3 text-sm">
                  {site.addressLines[lang].map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="block">{site.postal}</span>
                </p>
                <a href={site.phoneHref} className="relative z-10 mt-2 block text-accent">
                  {site.phone}
                </a>
                <p className="relative z-10 mt-3 text-sm text-muted">{site.hoursShort[lang]}</p>
              </li>
            ))}
            <li className="stitch-card overflow-hidden">
              <div className="relative h-full min-h-48">
                <Image
                  src="/gallery/1.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </li>
          </ul>
          <Link href="/locations" className="mt-8 inline-block text-sm tracking-[0.12em] uppercase">
            {t('placeMap')} →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-16 md:py-20">
        <p className="text-[0.72rem] tracking-[0.28em] text-muted uppercase">{t('svcKicker')}</p>
        <h2 className="mt-3 text-4xl font-medium md:text-6xl">{t('svcTitle')}</h2>
        <p className="mt-6 max-w-2xl text-lg text-muted">{t('svcLead')}</p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {housePicks.map((item) => {
            const photo = photoForItem(item.id);
            const price = 'price' in item && item.price ? item.price : null;
            const body = 'body' in item && item.body ? item.body[lang] : null;
            return (
              <li key={item.id}>
                <DishCard
                  title={item.title[lang]}
                  price={price}
                  body={body}
                  photo={photo}
                  href={`/menu#${item.id}`}
                />
              </li>
            );
          })}
        </ul>
        <Link href="/menu" className="mt-8 inline-block text-sm tracking-[0.12em] uppercase">
          {t('svcMore')} →
        </Link>
      </section>

      <section className="leather stitch">
        <div className="relative z-10 mx-auto max-w-[1080px] px-6 py-20">
          <h2 className="text-4xl font-medium md:text-6xl">{t('aboutTitle')}</h2>
          <p className="mt-6 max-w-2xl text-lg font-light text-paper/85">{t('aboutLead')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="btn btn-frost">
              {t('aboutCta')}
            </Link>
            <a href={desk.phoneHref} className="btn btn-frost">
              {desk.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
