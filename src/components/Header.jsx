import { NavLink } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { openBooking } = useBooking();

  return (
    <header
      className="sticky top-0 z-50 hidden w-full md:block"
      style={{ background: 'oklch(0.16 0.03 220 / 0.92)', backdropFilter: 'blur(14px)' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        <NavLink to="/" className="font-serif text-lg font-bold text-white">
          M. Aggarwal &amp; Co.
        </NavLink>
        <nav className="flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${isActive ? 'text-white' : 'text-white/60 hover:text-white/90'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => openBooking(null)}
          className="rounded-lg px-5 py-2.5 text-sm font-bold cursor-pointer border-none"
          style={{
            background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-deep))',
            color: 'var(--color-gold-text)',
          }}
        >
          Book Consultation
        </button>
      </div>
    </header>
  );
}
