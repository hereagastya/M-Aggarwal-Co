import { Link } from 'react-router-dom';
import { firm, services, whatsappLink } from '../data/content';
import { Brand, navLinks } from './Header';
import { VineRule } from './Motifs';
import Icon from './Icon';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-on-cobalt)]">
      <VineRule tone="light" className="opacity-40" />
      <div className="mx-auto max-w-6xl px-5 pb-32 pt-12 sm:px-8 lg:pb-12 lg:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="col-span-2 lg:col-span-1">
            <Brand light />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed">
              Tax, GST, audit and advisory for families and growing businesses in Jaipur, since {firm.since}.
            </p>
          </div>

          <FooterCol title="Firm">
            {navLinks.map((l) => (
              <FooterLink key={l.to} to={l.to}>{l.label}</FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Services">
            {services.map((s) => (
              <FooterLink key={s.code} to={`/services#${s.code}`}>{s.title.replace(' & Planning', '').replace(' & Returns', '')}</FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Visit or write" className="col-span-2 lg:col-span-1">
            <address className="not-italic text-[15px] leading-relaxed">
              {firm.addressLines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </address>
            <a href={firm.phoneHref} className="tnum mt-3 flex items-center gap-2 text-[15px] text-white hover:text-[var(--color-turq)]">
              <Icon name="phone" className="h-4 w-4" /> {firm.phoneDisplay}
            </a>
            <a href={`mailto:${firm.email}`} className="flex items-center gap-2 text-[15px] text-white hover:text-[var(--color-turq)]">
              <Icon name="mail" className="h-4 w-4" /> {firm.email}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="flex items-center gap-2 text-[15px] text-white hover:text-[var(--color-turq)]">
              <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp us
            </a>
          </FooterCol>
        </div>

        <div className="mt-12 border-t border-white/12 pt-6 text-[13px] leading-relaxed text-[var(--color-on-cobalt)]/80">
          <p className="max-w-3xl">
            Disclaimer: As per the rules of the Institute of Chartered Accountants of India, chartered accountants are
            not permitted to solicit work or advertise. This website is meant for information only and does not
            constitute an advertisement or professional advice.
          </p>
          <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:justify-between">
            <span>© {year} {firm.name}, Chartered Accountants</span>
            <span className="tnum">ICAI Firm Registration No. {firm.frn}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className = '' }) {
  return (
    <div className={className}>
      <h2 className="mb-4 font-[family-name:var(--font-sans)] text-[13px] font-semibold tracking-[0.08em] text-[var(--color-turq)] uppercase">
        {title}
      </h2>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link to={to} className="text-[15px] text-white/90 hover:text-[var(--color-turq)]">
      {children}
    </Link>
  );
}
