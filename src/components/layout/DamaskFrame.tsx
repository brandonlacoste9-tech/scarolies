import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  innerClassName?: string;
};

export function DamaskFrame({
  children,
  innerClassName = 'mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-24',
}: Props) {
  return (
    <div className="menu-damask">
      <section className="menu-damask-well">
        <div className={`relative ${innerClassName}`}>{children}</div>
      </section>
    </div>
  );
}
