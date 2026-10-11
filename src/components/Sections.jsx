import { useId, useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { credentials, faqs, whatsappLink } from '../data/content';
import { Rosette, VineRule } from './Motifs';
import Icon from './Icon';
import { Button, Container, Rise } from './ui';

export function SectionHeading({ title, sub, light = false, className = '' }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <h2 className={`text-[32px] sm:text-[40px] lg:text-5xl ${light ? 'text-white' : 'text-[var(--color-ink)]'}`}>{title}</h2>
      {sub && (
        <p className={`mt-3 text-[17px] leading-relaxed ${light ? 'text-[var(--color-on-cobalt)]' : 'text-[var(--color-ink-soft)]'}`}>{sub}</p>
      )}
    </div>
  );
}

export function PageHead({ title, sub, children }) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-wash)]">
      <Rosette className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 opacity-90 sm:-right-10 sm:h-80 sm:w-80 lg:right-[6%] lg:top-1/2 lg:h-[360px] lg:w-[360px] lg:-translate-y-1/2" />
      <Container className="relative pb-10 pt-40 sm:pt-44 lg:py-24">
        <div className="max-w-xl lg:max-w-3xl">
          <h1 className="text-[44px] sm:text-6xl lg:text-7xl">{title}</h1>
          {sub && <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-ink-soft)] sm:text-lg">{sub}</p>}
          {children}
        </div>
      </Container>
      <VineRule className="opacity-70" />
    </section>
  );
}

export function Stations({ steps, numbered = true }) {
  return (
    <ol className="relative grid gap-0 lg:grid-flow-col lg:auto-cols-fr lg:gap-8">
      {steps.map((s, i) => (
        <Rise as="li" key={s.title} delay={i * 80} className="relative flex gap-5 lg:block">
          {/* the line the stations hang on */}
          <span
            aria-hidden="true"
            className={`absolute left-[21px] top-12 bottom-0 w-px bg-[var(--color-turq)] lg:left-14 lg:right-[-2rem] lg:top-[21px] lg:bottom-auto lg:h-px lg:w-auto ${
              i === steps.length - 1 ? 'hidden' : ''
            }`}
          />
          <span className="relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-glaze)] font-[family-name:var(--font-display)] text-lg text-[var(--color-cobalt)] ring-2 ring-[var(--color-cobalt)]">
            {numbered ? i + 1 : <span className="h-3 w-3 rounded-full bg-[var(--color-turq)]" />}
          </span>
          <div className="pb-9 lg:pb-0 lg:pt-5">
            {s.kicker && <p className="tnum font-semibold text-[var(--color-cobalt)]">{s.kicker}</p>}
            <h3 className="font-[family-name:var(--font-sans)] text-lg font-semibold leading-snug">{s.title}</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-[var(--color-ink-soft)]">{s.desc}</p>
          </div>
        </Rise>
      ))}
    </ol>
  );
}

export function CtaBand({ title = 'Talk to a CA this week', sub = 'A free 20-minute consultation by phone, video call or at our office. No obligation, no jargon.' }) {
  const { openBooking } = useBooking();
  return (
    <section className="relative overflow-hidden bg-[var(--color-cobalt)]">
      <Rosette rim={false} className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 opacity-25 sm:h-[420px] sm:w-[420px]" />
      <Container className="relative py-16 sm:py-20 lg:flex lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-xl">
          <h2 className="text-[34px] text-white sm:text-5xl">{title}</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-[var(--color-on-cobalt)]">{sub}</p>
        </div>
        <div className="mt-8 grid gap-3 sm:flex lg:mt-0 lg:shrink-0">
          <Button variant="light" onClick={() => openBooking(null)}>
            Book a free consultation
          </Button>
          <Button variant="call" href={whatsappLink()} target="_blank" rel="noopener">
            <Icon name="whatsapp" className="h-5 w-5" /> Message on WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}

export function Credentials() {
  return (
    <ul className="grid gap-x-10 sm:grid-cols-2">
      {credentials.map((c) => (
        <li key={c.title} className="flex items-start gap-4 border-b border-[var(--color-line)] py-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-wash)] text-[var(--color-cobalt)]">
            <Icon name="shield" className="h-5.5 w-5.5" />
          </span>
          <span>
            <span className="block font-semibold">{c.title}</span>
            <span className="tnum block text-[15px] text-[var(--color-ink-soft)]">{c.detail}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Faq({ items = faqs }) {
  return (
    <div className="border-t border-[var(--color-line)]">
      {items.map((f) => (
        <FaqItem key={f.q} {...f} />
      ))}
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="border-b border-[var(--color-line)]">
      <h3 className="font-[family-name:var(--font-sans)]">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full items-center justify-between gap-4 py-5 text-left text-[17px] font-semibold leading-snug hover:text-[var(--color-cobalt)]"
        >
          {q}
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-[background-color,transform] duration-300 ${open ? 'rotate-45 bg-[var(--color-cobalt)] text-white' : 'bg-[var(--color-wash)] text-[var(--color-cobalt)]'}`}>
            <Icon name="plus" className="h-4.5 w-4.5" />
          </span>
        </button>
      </h3>
      <div
        id={id}
        className={`grid transition-[grid-template-rows] duration-400 ease-[var(--ease-out)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-5 pr-12 text-[16px] leading-relaxed text-[var(--color-ink-soft)]">{a}</p>
        </div>
      </div>
    </div>
  );
}
