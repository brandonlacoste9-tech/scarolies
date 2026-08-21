import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { DishCard } from '@/components/DishCard';
import { DamaskFrame } from '@/components/layout/DamaskFrame';
import { bookUrl, house, locations, menu } from '@/content/house';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return { title: t('title') };
}

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('services');
  const lang = locale as Locale;
  const desk = locations[0];
  const reserve = bookUrl(lang);

  return (
    <DamaskFrame>
      <div>
          <p className="text-[0.72rem] tracking-[0.28em] text-muted uppercase">{t('kicker')}</p>
          <h1 className="mt-3 text-5xl font-medium md:text-7xl">{t('title')}.</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{t('lead')}</p>
          <nav className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[0.72rem] tracking-[0.12em] uppercase">
            {menu.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="text-accent hover:text-ink">
                {section.title[lang]}
              </a>
            ))}
          </nav>

          {menu.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-40">
              <h2 className="mt-16 border-b border-line pb-3 text-3xl font-medium">{section.title[lang]}</h2>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => {
                  const price = 'price' in item && item.price ? item.price : null;
                  const body = 'body' in item && item.body ? item.body[lang] : null;
                  return (
                    <li key={item.id} id={item.id} className="scroll-mt-40">
                      <DishCard title={item.title[lang]} price={price} body={body} />
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <p className="mt-10 text-sm text-muted">{t('tax')}</p>
          <p className="mt-3 text-sm text-muted">{t('pdfNote')}</p>
          <div className="mt-10 flex flex-wrap gap-6">
            <a href={reserve} target="_blank" rel="noreferrer" className="text-sm tracking-[0.12em] uppercase">
              {t('book')} →
            </a>
            <a href={house.winePdf} target="_blank" rel="noreferrer" className="text-sm tracking-[0.12em] uppercase">
              {t('pdf')} →
            </a>
            <a href={desk.phoneHref} className="text-sm tracking-[0.12em] uppercase">
              {desk.phone}
            </a>
            <Link href="/takeaway" className="text-sm tracking-[0.12em] uppercase">
              {lang === 'fr' ? 'Repas familial' : 'Family plates'}
            </Link>
          </div>
      </div>
    </DamaskFrame>
  );
}
