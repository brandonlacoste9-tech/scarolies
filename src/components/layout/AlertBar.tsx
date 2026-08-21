import { getLocale } from 'next-intl/server';
import ops from '@/content/ops.json';
import type { Locale } from '@/i18n/routing';

export async function AlertBar() {
  if (!ops.alert.enabled) return null;
  const locale = (await getLocale()) as Locale;
  const text = locale === 'fr' ? ops.alert.fr : ops.alert.en;
  if (!text) return null;

  return (
    <p className="bg-accent px-4 py-2 text-center text-[0.72rem] text-paper">{text}</p>
  );
}
