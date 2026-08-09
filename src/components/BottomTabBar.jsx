import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function BottomTabBar() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex h-16 border-t md:hidden"
      style={{
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(16px)',
        borderColor: 'var(--color-cream-border-light)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.to === '/'}
          className="flex flex-1 flex-col items-center justify-center gap-1"
        >
          {({ isActive }) => (
            <>
              <div
                className="h-0.5 w-4 rounded-full"
                style={{ background: isActive ? 'var(--color-primary)' : 'var(--color-muted)' }}
              />
              <div
                className="text-[10.5px] font-semibold"
                style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-muted)' }}
              >
                {t.label}
              </div>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
