import { useEffect, useMemo, useRef, useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { services, timeSlots, whatsappLink } from '../data/content';
import Icon from './Icon';
import { Rosette } from './Motifs';

const modes = [
  { id: 'phone', label: 'Phone call' },
  { id: 'video', label: 'Video call' },
  { id: 'office', label: 'Office visit' },
];

const stepNames = ['Service', 'Time', 'Details'];

function getDates() {
  const out = [];
  const d = new Date();
  while (out.length < 8) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue; // closed Sundays
    out.push({
      day: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      num: d.getDate(),
      month: d.toLocaleDateString('en-IN', { month: 'short' }),
      full: d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }),
      saturday: d.getDay() === 6,
    });
  }
  return out;
}

const empty = { serviceIdx: null, mode: 'phone', dateIdx: null, timeIdx: null, name: '', phone: '', email: '', message: '' };

const phoneOk = (p) => {
  const digits = p.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  return /^[6-9]\d{9}$/.test(digits);
};
const emailOk = (e) => !e || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export default function BookingModal() {
  const { isOpen, closeBooking, presetServiceIdx } = useBooking();
  const [step, setStep] = useState(1);
  const [b, setB] = useState(empty);
  const [touched, setTouched] = useState({});
  const dates = useMemo(() => getDates(), []);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const valid = presetServiceIdx !== null && presetServiceIdx >= 0;
    setB({ ...empty, serviceIdx: valid ? presetServiceIdx : null });
    setStep(1);
    setTouched({});
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && closeBooking();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, presetServiceIdx, closeBooking]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 });
  }, [step]);

  if (!isOpen) return null;

  const set = (k, v) => setB((x) => ({ ...x, [k]: v }));
  const slots = b.dateIdx !== null && dates[b.dateIdx].saturday ? timeSlots.slice(0, 3) : timeSlots;

  const errors = {
    name: b.name.trim().length < 2 ? 'Please enter your name.' : '',
    phone: !phoneOk(b.phone) ? 'Enter a 10-digit mobile number, e.g. 98290 12345.' : '',
    email: !emailOk(b.email) ? 'This email address looks incomplete.' : '',
  };

  const canNext =
    (step === 1 && b.serviceIdx !== null) ||
    (step === 2 && b.dateIdx !== null && b.timeIdx !== null) ||
    (step === 3 && !errors.name && !errors.phone && !errors.email);

  const next = () => {
    if (step === 3 && !canNext) {
      setTouched({ name: true, phone: true, email: true });
      return;
    }
    if (canNext) setStep((s) => s + 1);
  };

  const summary =
    b.serviceIdx !== null && b.dateIdx !== null && b.timeIdx !== null
      ? {
          service: services[b.serviceIdx].title,
          when: `${dates[b.dateIdx].full}, ${slots[b.timeIdx]}`,
          mode: modes.find((m) => m.id === b.mode).label,
        }
      : null;

  const waText = summary
    ? `Hello, I just requested a free consultation.\n\nName: ${b.name}\nService: ${summary.service}\nWhen: ${summary.when}\nMode: ${summary.mode}${b.message ? `\nNote: ${b.message}` : ''}`
    : '';

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <div className="anim-fade absolute inset-0 bg-[var(--color-ink)]/45" onClick={closeBooking} />

      <div className="anim-sheet relative flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-[28px] bg-[var(--color-glaze)] shadow-[0_-12px_40px_-12px_oklch(0.25_0.07_264/0.35)] sm:max-h-[88vh] sm:max-w-lg sm:rounded-[28px]">
        <div className="mx-auto mt-2.5 h-1.5 w-10 rounded-full bg-[var(--color-line)] sm:hidden" />

        <div className="flex items-center justify-between px-5 pt-3 sm:px-7 sm:pt-6">
          <h2 id="booking-title" className="text-[22px]">
            {step < 4 ? 'Book a free consultation' : 'Request received'}
          </h2>
          <button
            type="button"
            onClick={closeBooking}
            aria-label="Close"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-ink-soft)] hover:bg-[var(--color-wash)]"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        {step < 4 && (
          <ol className="flex gap-2 px-5 pt-3 sm:px-7" aria-label="Progress">
            {stepNames.map((n, i) => (
              <li key={n} className="flex-1" aria-current={step === i + 1 ? 'step' : undefined}>
                <div className={`h-1 rounded-full transition-colors duration-300 ${step > i ? 'bg-[var(--color-cobalt)]' : 'bg-[var(--color-line)]'}`} />
                <span className={`mt-1.5 block text-xs font-semibold ${step === i + 1 ? 'text-[var(--color-cobalt)]' : 'text-[var(--color-ink-soft)]'}`}>
                  {n}
                </span>
              </li>
            ))}
          </ol>
        )}

        <div ref={bodyRef} className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-5 sm:px-7">
          {step === 1 && (
            <fieldset>
              <legend className="mb-4 text-[17px] font-semibold">What would you like help with?</legend>
              <div className="grid gap-2.5">
                {services.map((s, i) => {
                  const active = b.serviceIdx === i;
                  return (
                    <label
                      key={s.code}
                      className={`flex min-h-14 cursor-pointer items-center gap-3.5 rounded-2xl px-4 py-3 ring-inset transition-[box-shadow,background-color] ${
                        active ? 'bg-[var(--color-wash)] ring-2 ring-[var(--color-cobalt)]' : 'bg-[var(--color-glaze)] ring-1 ring-[var(--color-line)] hover:ring-[var(--color-cobalt)]/50'
                      }`}
                    >
                      <input type="radio" name="service" className="sr-only" checked={active} onChange={() => set('serviceIdx', i)} />
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${active ? 'bg-[var(--color-cobalt)] text-white' : 'bg-[var(--color-wash)] text-[var(--color-cobalt)]'}`}>
                        <Icon name={s.icon} className="h-5 w-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block font-semibold leading-snug">{s.title}</span>
                        <span className="block text-sm text-[var(--color-ink-soft)]">{s.short}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <div className="grid gap-6">
              <fieldset>
                <legend className="mb-3 text-[17px] font-semibold">How should we meet?</legend>
                <div className="grid grid-cols-3 gap-2">
                  {modes.map((m) => (
                    <Chip key={m.id} active={b.mode === m.id} onClick={() => set('mode', m.id)}>
                      {m.label}
                    </Chip>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-3 text-[17px] font-semibold">Pick a day</legend>
                <div className="scroll-x -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-7 sm:px-7">
                  {dates.map((d, i) => {
                    const active = b.dateIdx === i;
                    return (
                      <button
                        key={d.full}
                        type="button"
                        onClick={() => setB((x) => ({ ...x, dateIdx: i, timeIdx: null }))}
                        aria-pressed={active}
                        aria-label={d.full}
                        className={`flex w-16 shrink-0 flex-col items-center rounded-2xl py-3 transition-colors ${
                          active ? 'bg-[var(--color-cobalt)] text-white' : 'bg-[var(--color-glaze)] ring-1 ring-inset ring-[var(--color-line)] hover:ring-[var(--color-cobalt)]/50'
                        }`}
                      >
                        <span className={`text-xs font-semibold ${active ? 'text-[var(--color-on-cobalt)]' : 'text-[var(--color-ink-soft)]'}`}>{d.day}</span>
                        <span className="tnum mt-0.5 font-[family-name:var(--font-display)] text-xl leading-tight">{d.num}</span>
                        <span className={`text-[11px] ${active ? 'text-[var(--color-on-cobalt)]' : 'text-[var(--color-ink-soft)]'}`}>{d.month}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset disabled={b.dateIdx === null}>
                <legend className="mb-3 text-[17px] font-semibold">Pick a time</legend>
                {b.dateIdx === null ? (
                  <p className="rounded-2xl bg-[var(--color-wash)] px-4 py-3.5 text-[15px] text-[var(--color-ink-soft)]">
                    Choose a day first to see open times.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {slots.map((t, i) => (
                      <Chip key={t} active={b.timeIdx === i} onClick={() => set('timeIdx', i)}>
                        <span className="tnum">{t}</span>
                      </Chip>
                    ))}
                  </div>
                )}
              </fieldset>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-4">
              <p className="text-[17px] font-semibold">Your details</p>
              <Field label="Full name" error={touched.name && errors.name}>
                <input
                  value={b.name}
                  onChange={(e) => set('name', e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  autoComplete="name"
                  placeholder="Your name"
                  className={inputCls(touched.name && errors.name)}
                />
              </Field>
              <Field label="Mobile number" error={touched.phone && errors.phone}>
                <input
                  value={b.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="98290 12345"
                  className={inputCls(touched.phone && errors.phone)}
                />
              </Field>
              <Field label="Email" hint="Optional" error={touched.email && errors.email}>
                <input
                  value={b.email}
                  onChange={(e) => set('email', e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputCls(touched.email && errors.email)}
                />
              </Field>
              <Field label="Anything we should know?" hint="Optional">
                <textarea
                  value={b.message}
                  onChange={(e) => set('message', e.target.value)}
                  rows={3}
                  placeholder="For example: I received a GST notice last week"
                  className={`${inputCls(false)} resize-none py-3`}
                />
              </Field>
              <p className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--color-ink-soft)]">
                <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-cobalt)]" />
                Your details are only used to arrange this consultation and are never shared.
              </p>
            </div>
          )}

          {step === 4 && summary && (
            <div className="text-center">
              <Rosette className="mx-auto h-24 w-24" />
              <p className="mt-4 text-[17px] font-semibold">Thank you, {b.name.split(' ')[0]}.</p>
              <p className="mx-auto mt-1 max-w-xs text-[15px] text-[var(--color-ink-soft)]">
                We will call you within one working day to confirm your slot.
              </p>
              <dl className="mt-6 divide-y divide-[var(--color-line)] rounded-2xl bg-[var(--color-wash)] px-5 text-left">
                <Row label="Service" value={summary.service} />
                <Row label="When" value={summary.when} />
                <Row label="How" value={summary.mode} />
              </dl>
            </div>
          )}
        </div>

        <div className="flex gap-2.5 border-t border-[var(--color-line)] px-5 pt-3.5 sm:px-7 sm:pb-6" style={{ paddingBottom: 'max(0.875rem, env(safe-area-inset-bottom))' }}>
          {step > 1 && step < 4 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="min-h-12 rounded-full px-5 font-semibold text-[var(--color-ink-soft)] ring-1 ring-inset ring-[var(--color-line)] hover:text-[var(--color-ink)]"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={next}
              disabled={step < 3 && !canNext}
              className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-cobalt)] font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === 3 ? 'Request consultation' : 'Continue'}
              <Icon name="arrow" className="h-4.5 w-4.5" />
            </button>
          ) : (
            <>
              <a
                href={whatsappLink(waText)}
                target="_blank"
                rel="noopener"
                className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-cobalt)] font-semibold text-white"
              >
                <Icon name="whatsapp" className="h-5 w-5" /> Confirm on WhatsApp
              </a>
              <button
                type="button"
                onClick={closeBooking}
                className="min-h-12 rounded-full px-5 font-semibold text-[var(--color-ink-soft)] ring-1 ring-inset ring-[var(--color-line)]"
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const inputCls = (err) =>
  `min-h-12 w-full rounded-xl bg-[var(--color-glaze)] px-4 text-base text-[var(--color-ink)] ring-1 ring-inset outline-none transition-shadow focus:ring-2 focus:ring-[var(--color-cobalt)] ${
    err ? 'ring-2 ring-[oklch(0.55_0.19_27)]' : 'ring-[var(--color-line)]'
  }`;

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-12 rounded-2xl px-2 text-[15px] font-semibold transition-colors ${
        active ? 'bg-[var(--color-cobalt)] text-white' : 'bg-[var(--color-glaze)] text-[var(--color-ink)] ring-1 ring-inset ring-[var(--color-line)] hover:ring-[var(--color-cobalt)]/50'
      }`}
    >
      {children}
    </button>
  );
}

function Field({ label, hint, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between text-sm font-semibold text-[var(--color-ink)]">
        {label}
        {hint && <span className="text-[13px] font-normal text-[var(--color-ink-soft)]">{hint}</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-[13px] font-medium text-[oklch(0.5_0.19_27)]" role="alert">{error}</span>}
    </label>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-3.5 text-[15px]">
      <dt className="text-[var(--color-ink-soft)]">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}
