import { NextResponse } from 'next/server';
import { continueChat, type BookStep } from '@/lib/chat';
import type { Locale } from '@/i18n/routing';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body || typeof body !== 'object' || !('text' in body) || typeof body.text !== 'string') {
    return NextResponse.json({ error: 'Invalid text' }, { status: 400 });
  }

  const text = body.text.trim();
  if (text.length < 1 || text.length > 400) {
    return NextResponse.json({ error: 'Invalid text' }, { status: 400 });
  }

  const raw = 'locale' in body && typeof body.locale === 'string' ? body.locale : 'en';
  const locale: Locale = raw === 'fr' ? 'fr' : 'en';
  const stepRaw = 'bookStep' in body && typeof body.bookStep === 'string' ? body.bookStep : 'idle';
  const step: BookStep =
    stepRaw === 'reason' || stepRaw === 'attached' ? stepRaw : 'idle';
  const reason =
    'bookReason' in body && typeof body.bookReason === 'string' ? body.bookReason.slice(0, 400) : '';

  return NextResponse.json(continueChat(text, locale, { step, reason }));
}
