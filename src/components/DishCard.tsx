import { Link } from '@/i18n/navigation';

type Props = {
  id?: string;
  title: string;
  price?: string | null;
  body?: string | null;
  href?: string;
};

export function DishCard({ id, title, price, body, href }: Props) {
  const inner = (
    <div className="relative z-10 p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="min-w-0 text-lg font-medium normal-case tracking-normal">{title}</h3>
        {price ? (
          <span className="font-heading shrink-0 text-xl tracking-wide text-gold">{price}</span>
        ) : null}
      </div>
      {body ? <p className="mt-2 text-sm text-muted">{body}</p> : null}
    </div>
  );

  const className = 'stitch-card block h-full hover:border-gold';

  if (href) {
    return (
      <Link id={id} href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <article id={id} className={className}>
      {inner}
    </article>
  );
}
