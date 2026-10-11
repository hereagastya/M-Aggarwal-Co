import { Link } from 'react-router-dom';
import Icon from './Icon';
import { useReveal } from '../hooks/useReveal';

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100';

const variants = {
  primary:
    'bg-[var(--color-cobalt)] text-white shadow-[0_6px_16px_-6px_oklch(0.43_0.17_264/0.55)] hover:bg-[var(--color-cobalt-deep)]',
  secondary:
    'bg-[var(--color-glaze)] text-[var(--color-cobalt)] ring-1 ring-inset ring-[var(--color-cobalt)]/30 hover:ring-[var(--color-cobalt)] hover:bg-[var(--color-wash)]',
  call:
    'bg-[var(--color-turq)] text-[var(--color-ink)] shadow-[0_6px_16px_-6px_oklch(0.72_0.105_205/0.7)] hover:bg-[var(--color-turq-pale)]',
  whatsapp: 'bg-[var(--color-ink)] text-white hover:bg-[var(--color-cobalt-deep)]',
  light: 'bg-[var(--color-glaze)] text-[var(--color-cobalt)] hover:bg-[var(--color-wash)]',
  ghostLight:
    'text-white ring-1 ring-inset ring-white/35 hover:ring-white hover:bg-white/8',
};

export function Button({ variant = 'primary', to, href, className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}

export function TextLink({ to, children, className = '' }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-1.5 font-semibold text-[var(--color-cobalt)] underline decoration-[var(--color-turq)] decoration-2 underline-offset-[6px] hover:decoration-[var(--color-cobalt)] ${className}`}
    >
      {children}
      <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Rise({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const [ref, visible] = useReveal(0.12);
  return (
    <Tag
      ref={ref}
      className={`rise ${visible ? 'in' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : undefined }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
