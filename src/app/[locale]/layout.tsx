import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Cormorant_Garamond, Source_Sans_3 } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { LetsChat } from '@/components/chat/LetsChat';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { AlertBar } from '@/components/layout/AlertBar';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { WalkinBar } from '@/components/layout/WalkinBar';
import { routing } from '@/i18n/routing';

const heading = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
});

const body = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: {
      default: t('site'),
      template: `%s · ${t('site')}`,
    },
    description: t('description'),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${heading.variable} ${body.variable}`}>
      <body className="relative flex min-h-dvh flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="relative z-10 flex min-h-dvh flex-col">
            <SiteHeader />
            <AlertBar />
            <main id="content" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <SiteFooter />
            <WalkinBar />
            <LetsChat />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
