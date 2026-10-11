import { useBooking } from '../context/BookingContext';
import { firm, whatsappLink } from '../data/content';
import Icon from '../components/Icon';
import { Button, Container } from '../components/ui';
import { PageHead } from '../components/Sections';
import officeInterior from '../assets/images/office-interior.jpg';

const channels = [
  { icon: 'phone', label: 'Call the office', value: firm.phoneDisplay, href: firm.phoneHref, note: 'Mon–Sat during office hours' },
  { icon: 'whatsapp', label: 'WhatsApp', value: 'Message us on WhatsApp', href: whatsappLink(), note: 'Share documents and questions any time', external: true },
  { icon: 'mail', label: 'Email', value: firm.email, href: `mailto:${firm.email}`, note: 'For documents and detailed queries' },
  { icon: 'pin', label: 'Visit us', value: firm.addressShort, href: firm.mapsUrl, note: 'Near City Court, get directions', external: true },
];

export default function Contact() {
  const { openBooking } = useBooking();

  return (
    <>
      <PageHead title="Contact us" sub="Call, message or drop by. We usually reply within one working day." />

      <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
        <div>
          <ul className="border-t border-[var(--color-line)]">
            {channels.map((c) => (
              <li key={c.label} className="border-b border-[var(--color-line)]">
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}
                  className="group flex items-center gap-4 py-5"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-wash)] text-[var(--color-cobalt)] transition-colors group-hover:bg-[var(--color-cobalt)] group-hover:text-white">
                    <Icon name={c.icon} className="h-5.5 w-5.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="tnum block truncate text-[17px] font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-cobalt)]">{c.value}</span>
                    <span className="block text-sm text-[var(--color-ink-soft)]">{c.note}</span>
                    <span className="sr-only">{c.label}</span>
                  </span>
                  <Icon name="chevron" className="h-5 w-5 shrink-0 text-[var(--color-ink-soft)] transition-transform group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <h2 className="flex items-center gap-2.5 text-2xl">
              <Icon name="clock" className="h-6 w-6 text-[var(--color-cobalt)]" />
              Office hours
            </h2>
            <dl className="mt-4 rounded-[24px] bg-[var(--color-wash)] px-5">
              {firm.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 border-b border-[var(--color-line)] py-4 text-[16px] last:border-b-0">
                  <dt>{h.days}</dt>
                  <dd className={`tnum font-semibold ${h.time === 'Closed' ? 'text-[var(--color-ink-soft)]' : ''}`}>{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
              Extended hours in July, September and October for return-filing season.
            </p>
          </div>
        </div>

        <div className="grid content-start gap-6">
          <div className="overflow-hidden rounded-[28px] bg-[var(--color-wash)] ring-1 ring-[var(--color-line)]">
            <iframe
              title="Map showing M. Aggarwal & Co. on Residency Road, Jaipur"
              src={firm.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-64 w-full border-0 sm:h-80"
            />
            <a
              href={firm.mapsUrl}
              target="_blank"
              rel="noopener"
              className="flex min-h-13 items-center justify-between gap-3 px-5 py-3 text-[15px] font-semibold text-[var(--color-cobalt)]"
            >
              <span>
                {firm.addressLines[0]}, {firm.addressLines[1]}
              </span>
              <Icon name="arrow" className="h-4.5 w-4.5 shrink-0" />
            </a>
          </div>

          <img
            src={officeInterior}
            alt="Inside the M. Aggarwal & Co. office"
            loading="lazy"
            className="aspect-[3/2] w-full rounded-[28px] object-cover"
          />

          <div className="rounded-[28px] bg-[var(--color-cobalt)] p-6 text-white sm:p-8">
            <h2 className="text-[28px]">Prefer a proper sit-down?</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-[var(--color-on-cobalt)]">
              Book a free 20-minute consultation by phone, video or at the office. It takes under a minute.
            </p>
            <Button variant="light" onClick={() => openBooking(null)} className="mt-6 w-full sm:w-auto">
              Book a free consultation
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
