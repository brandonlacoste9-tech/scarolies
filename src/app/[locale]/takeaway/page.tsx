import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { DishCard } from '@/components/DishCard';
import { locations, menu } from '@/content/house';
import { photoForItem } from '@/content/menuPhotos';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'walkin' });
  return { title: t('title') };
}

export default async function TakeawayPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('walkin');
  const lang = locale as Locale;
  const desk = locations[0];
  const family = menu.find((section) => section.id === 'family');

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16 md:py-24">
      <p className="text-[0.72rem] tracking-[0.28em] text-muted uppercase">{t('kicker')}</p>
      <h1 className="mt-3 text-5xl font-medium text-ink md:text-7xl">{t('title')}.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{t('lead')}</p>
      <p className="mt-6 text-ink">{t('hours')}</p>
      <p className="mt-3 text-sm text-muted">{t('hoursConflict')}</p>

      <div className="mt-10 flex flex-wrap gap-3">
        <a href={desk.phoneHref} className="btn btn-solid">
          {desk.phone}
        </a>
        <Link href="/menu#family" className="btn btn-ghost">
          {t('formCta')}
        </Link>
      </div>

      {family ? (
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {family.items.map((item) => {
            const photo = photoForItem(item.id, 'family');
            const price = 'price' in item && item.price ? item.price : null;
            const body = 'body' in item && item.body ? item.body[lang] : null;
            return (
              <li key={item.id}>
                <DishCard title={item.title[lang]} price={price} body={body} photo={photo} />
              </li>
            );
          })}
        </ul>
      ) : null}

      <h2 className="mt-16 text-3xl text-ink">{t('listTitle')}</h2>
      <ul className="mt-5 list-disc space-y-2 pl-5 text-ink">
        <li>{t('item1')}</li>
        <li>{t('item2')}</li>
        <li>{t('item3')}</li>
        <li>{t('item4')}</li>
      </ul>

      <p className="mt-10 text-lg leading-relaxed text-muted">{t('familyLead')}</p>
      <p className="mt-6 text-lg leading-relaxed text-ink">{t('urgent')}</p>

      <div className="mt-10 flex flex-wrap gap-6">
        <Link href="/locations" className="text-sm tracking-[0.12em] uppercase">
          {t('back')}
        </Link>
        <Link href="/contact" className="text-sm tracking-[0.12em] uppercase">
          {t('contact')}
        </Link>
      </div>
    </section>
  );
}
