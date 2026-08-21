'use client';

import type { ReactNode } from 'react';

export function openMaitre(book = false) {
  window.dispatchEvent(new CustomEvent('scarolies:open-chat', { detail: { book } }));
}

export function OpenMaitreButton({
  children,
  book = false,
  className,
}: {
  children: ReactNode;
  book?: boolean;
  className?: string;
}) {
  return (
    <button type="button" className={className} onClick={() => openMaitre(book)}>
      {children}
    </button>
  );
}
