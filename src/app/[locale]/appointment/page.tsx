import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { bookUrl, bookingDoors, house, locations } from '@/content/house';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'appointments' });
  return { title: t('title') };
}

export default async function AppointmentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('appointments');
  const lang = locale as Locale;
  const site = locations[0];
  const reserve = bookUrl(lang);

  return (
    <>
      <section className="leather stitch text-paper">
        <div className="relative z-10 mx-auto max-w-[1080px] px-6 py-16 md:py-20">
          <h1 className="font-heading text-6xl font-medium md:text-8xl">{t('title')}.</h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-paper/80">{t('lead')}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1080px] gap-6 px-6 py-16 md:grid-cols-2">
        <article className="stitch-card p-8">
          <h2 className="relative z-10 text-3xl font-medium">TB Dine</h2>
          <p className="relative z-10 mt-4 text-muted">{site.visitHours[lang]}</p>
          <a href={reserve} target="_blank" rel="noreferrer" className="btn btn-solid relative z-10 mt-8">
            {lang === 'fr' ? 'Réserver sur TB Dine' : 'Reserve on TB Dine'}
          </a>
        </article>
        <article className="stitch-card p-8">
          <h2 className="relative z-10 text-3xl font-medium">{site.name[lang]}</h2>
          <p className="relative z-10 mt-4 text-muted">{site.phoneHours[lang]}</p>
          <a href={site.phoneHref} className="btn btn-solid relative z-10 mt-8">
            {site.phone}
          </a>
        </article>
        {bookingDoors
          .filter((d) => d.id === 'takeaway' || d.id === 'menu')
          .map((door) => {
            const ctaClass = 'btn btn-solid relative z-10 mt-8';
            return (
              <article key={door.id} className="stitch-card p-8">
                <h2 className="relative z-10 text-3xl font-medium">{door.title[lang]}</h2>
                <p className="relative z-10 mt-4 text-muted">{door.body[lang]}</p>
                <Link href={door.href} className={ctaClass}>
                  {door.cta[lang]}
                </Link>
              </article>
            );
          })}
      </section>
      <p className="mx-auto max-w-[760px] px-6 pb-8 text-sm text-muted">{t('hoursNote')}</p>
      <section className="px-6 py-10">
        <div className="leather stitch mx-auto max-w-[760px] px-8 py-10 text-center text-paper">
          <p className="relative z-10 text-lg">{t('urgentLead')}</p>
        </div>
      </section>
      <p className="mx-auto max-w-[760px] px-6 pb-16 text-center text-sm text-muted">
        {t('emailNote')}{' '}
        <a href={house.emailHref} className="text-accent">
          {house.email}
        </a>
      </p>
    </>
  );
}
