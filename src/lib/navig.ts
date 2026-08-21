export type Attachment = 'yes' | 'no';
export type BookPath = 'emergency' | 'portal' | 'gap' | 'cancel' | 'pregnancy' | 'gamf' | 'contact';
export type Orientation = { path: BookPath; speak: { en: string; fr: string } };

export function reasonResolvesWithoutAttachment(_reason: string): boolean {
  return false;
}

export function orient(_reason: string, _attached: Attachment): Orientation {
  return {
    path: 'contact',
    speak: {
      en: 'Reserve on TB Dine, or call (514) 694-8611.',
      fr: 'Réservez sur TB Dine, ou téléphonez au (514) 694-8611.',
    },
  };
}
