import Image from 'next/image';
import { Link } from '@/i18n/navigation';

type Props = {
  id?: string;
  title: string;
  price?: string | null;
  body?: string | null;
  photo?: string | null;
  href?: string;
};

export function DishCard({ id, title, price, body, photo, href }: Props) {
  const inner = (
    <>
      {photo ? (
        <div className="relative h-48">
          <Image
            src={photo}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover"
          />
          {price ? (
            <span className="absolute right-3 bottom-3 z-10 bg-[#12203a]/82 px-2.5 py-1 font-heading text-lg tracking-wide text-gold">
              {price}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="relative z-10 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="min-w-0 text-lg font-medium normal-case tracking-normal">{title}</h3>
          {price ? (
            <span className="font-heading shrink-0 text-xl tracking-wide text-accent">{price}</span>
          ) : null}
        </div>
        {body ? <p className="mt-2 text-sm text-muted">{body}</p> : null}
      </div>
    </>
  );

  const className = 'stitch-card block h-full overflow-hidden hover:border-accent';

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
