import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { firm, whatsappLink } from '../data/content';
import { Mark, VineRule } from './Motifs';
import Icon from './Icon';
import { Button } from './ui';

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About us' },
  { to: '/contact', label: 'Contact' },
];

export function Brand({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${firm.name}, home`}>
      <Mark className="h-9 w-9 shrink-0" />
      <span className="leading-none">
        <span className={`block font-[family-name:var(--font-display)] text-[17px] ${light ? 'text-white' : 'text-[var(--color-ink)]'}`}>
          M. Aggarwal &amp; Co.
        </span>
        <span className={`mt-1 block text-[11px] font-semibold tracking-[0.08em] uppercase ${light ? 'text-[var(--color-on-cobalt)]' : 'text-[var(--color-ink-soft)]'}`}>
          Chartered Accountants
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const { openBooking } = useBooking();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b bg-[var(--color-glaze)]/95 backdrop-blur-md transition-colors duration-300 supports-[backdrop-filter]:bg-[var(--color-glaze)]/85 ${
          scrolled ? 'border-[var(--color-line)]' : 'border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 lg:h-[72px]">
          <Brand />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                    isActive
                      ? 'bg-[var(--color-wash)] text-[var(--color-cobalt)]'
                      : 'text-[var(--color-ink-soft)] hover:text-[var(--color-cobalt)]'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a href={firm.phoneHref} className="tnum flex items-center gap-2 text-[15px] font-semibold text-[var(--color-ink)] hover:text-[var(--color-cobalt)]">
              <Icon name="phone" className="h-4.5 w-4.5 text-[var(--color-cobalt)]" />
              {firm.phoneDisplay}
            </a>
            <Button onClick={() => openBooking(null)} className="min-h-11 px-5">
              Book a consultation
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-ink)] hover:bg-[var(--color-wash)] lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Icon name="menu" className="h-6 w-6" />
          </button>
        </div>
      </header>

      {open && <MobileMenu onClose={() => setOpen(false)} onBook={() => { setOpen(false); openBooking(null); }} />}
    </>
  );
}

function MobileMenu({ onClose, onBook }) {
  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="anim-fade absolute inset-0 bg-[var(--color-ink)]/40" onClick={onClose} />
      <div className="anim-sheet absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col overflow-y-auto rounded-t-[28px] bg-[var(--color-glaze)] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between px-5 pt-5">
          <Brand />
          <button
            type="button"
            onClick={onClose}
            className="-mr-1 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-wash)] text-[var(--color-ink)]"
            aria-label="Close menu"
            autoFocus
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>
        <VineRule className="mt-5 opacity-60" />
        <nav className="px-5 py-3" aria-label="Mobile">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `flex items-center justify-between border-b border-[var(--color-line)] py-4 font-[family-name:var(--font-display)] text-[26px] ${
                  isActive ? 'text-[var(--color-cobalt)]' : 'text-[var(--color-ink)]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-turq)]" />
                  ) : (
                    <Icon name="chevron" className="h-5 w-5 text-[var(--color-ink-soft)]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="grid gap-3 px-5 pt-3">
          <Button onClick={onBook} className="w-full">Book a free consultation</Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="call" href={firm.phoneHref}>
              <Icon name="phone" className="h-4.5 w-4.5" /> Call
            </Button>
            <Button variant="whatsapp" href={whatsappLink()} target="_blank" rel="noopener">
              <Icon name="whatsapp" className="h-5 w-5" /> WhatsApp
            </Button>
          </div>
          <p className="pt-2 text-center text-sm text-[var(--color-ink-soft)]">
            Mon–Fri 10 am–7 pm · Sat 10 am–4 pm
          </p>
        </div>
      </div>
    </div>
  );
}
