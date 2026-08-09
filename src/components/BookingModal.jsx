import { useEffect, useMemo, useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { services, timeSlots } from '../data/content';

function getDates() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const out = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push({ label: days[d.getDay()], num: d.getDate(), full: `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}` });
  }
  return out;
}

const emptyBooking = { serviceIdx: null, dateIdx: null, timeIdx: null, name: '', phone: '', email: '', message: '' };

export default function BookingModal() {
  const { isOpen, closeBooking, presetServiceIdx } = useBooking();
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState(emptyBooking);
  const dates = useMemo(() => getDates(), []);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setBooking({ ...emptyBooking, serviceIdx: presetServiceIdx });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, presetServiceIdx]);

  if (!isOpen) return null;

  const canStep1 = booking.serviceIdx !== null;
  const canStep2 = booking.dateIdx !== null && booking.timeIdx !== null;
  const canStep3 = !!(booking.name && booking.phone);
  const nextDisabled =
    (step === 1 && !canStep1) || (step === 2 && !canStep2) || (step === 3 && !canStep3);

  const setField = (key, val) => setBooking((b) => ({ ...b, [key]: val }));

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center sm:p-6" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeBooking} />
      <div className="relative flex h-full w-full flex-col bg-[var(--color-cream-light)] sm:h-auto sm:max-h-[88vh] sm:w-full sm:max-w-md sm:rounded-3xl sm:shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--color-cream-border-light)] px-5 py-4 sm:px-6">
          <div className="font-serif text-base font-bold text-[var(--color-ink)] sm:text-lg">Book a Consultation</div>
          <button
            onClick={closeBooking}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-cream-border-light)] text-sm text-[var(--color-muted-4)] hover:bg-[var(--color-cream-border)]"
          >
            &times;
          </button>
        </div>

        <div className="flex gap-1.5 px-5 pt-4 sm:px-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className="h-[3px] flex-1 rounded-full"
              style={{ background: step >= s ? 'var(--color-primary)' : 'var(--color-cream-border)' }}
            />
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {step === 1 && (
            <div>
              <StepLabel step={1} />
              <div className="mb-4 font-serif text-lg font-bold text-[var(--color-ink)] sm:text-xl">
                What do you need help with?
              </div>
              <div className="flex flex-col gap-2.5">
                {services.map((svc, i) => {
                  const active = booking.serviceIdx === i;
                  return (
                    <div
                      key={svc.code}
                      onClick={() => setField('serviceIdx', i)}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border-[1.5px] p-3.5 transition-colors"
                      style={{
                        borderColor: active ? 'var(--color-primary)' : 'var(--color-cream-border)',
                        background: active ? 'var(--color-badge)' : '#fff',
                      }}
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-bold text-[var(--color-primary)]">
                        {svc.code}
                      </div>
                      <div className="text-sm font-bold text-[var(--color-ink)]">{svc.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <StepLabel step={2} />
              <div className="mb-4 font-serif text-lg font-bold text-[var(--color-ink)] sm:text-xl">
                Pick a date &amp; time
              </div>
              <div className="mb-5 flex gap-2 overflow-x-auto pb-1.5">
                {dates.map((d, i) => {
                  const active = booking.dateIdx === i;
                  return (
                    <div
                      key={d.full}
                      onClick={() => setField('dateIdx', i)}
                      className="flex-shrink-0 cursor-pointer rounded-xl border-[1.5px] px-1 py-3 text-center"
                      style={{
                        width: 52,
                        borderColor: active ? 'var(--color-primary)' : 'var(--color-cream-border)',
                        background: active ? 'var(--color-primary)' : '#fff',
                        color: active ? '#fff' : 'var(--color-ink)',
                      }}
                    >
                      <div className="text-[10.5px] font-bold opacity-80">{d.label}</div>
                      <div className="mt-0.5 text-base font-bold">{d.num}</div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {timeSlots.map((t, i) => {
                  const active = booking.timeIdx === i;
                  return (
                    <div
                      key={t}
                      onClick={() => setField('timeIdx', i)}
                      className="cursor-pointer rounded-xl border-[1.5px] py-3.5 text-center text-sm font-bold"
                      style={{
                        borderColor: active ? 'var(--color-primary)' : 'var(--color-cream-border)',
                        background: active ? 'var(--color-primary)' : '#fff',
                        color: active ? '#fff' : 'var(--color-ink)',
                      }}
                    >
                      {t}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <StepLabel step={3} />
              <div className="mb-4 font-serif text-lg font-bold text-[var(--color-ink)] sm:text-xl">Your details</div>
              <div className="flex flex-col gap-3.5">
                <Field label="Full name">
                  <input
                    value={booking.name}
                    onChange={(e) => setField('name', e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-lg border-[1.5px] border-[var(--color-cream-border)] px-3.5 py-3 text-sm font-sans focus:border-[var(--color-primary)] focus:outline-none"
                  />
                </Field>
                <Field label="Phone number">
                  <input
                    value={booking.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                    placeholder="+91 90000 00000"
                    className="w-full rounded-lg border-[1.5px] border-[var(--color-cream-border)] px-3.5 py-3 text-sm font-sans focus:border-[var(--color-primary)] focus:outline-none"
                  />
                </Field>
                <Field label="Email (optional)">
                  <input
                    value={booking.email}
                    onChange={(e) => setField('email', e.target.value)}
                    placeholder="you@email.com"
                    className="w-full rounded-lg border-[1.5px] border-[var(--color-cream-border)] px-3.5 py-3 text-sm font-sans focus:border-[var(--color-primary)] focus:outline-none"
                  />
                </Field>
                <Field label="What would you like to discuss?">
                  <textarea
                    value={booking.message}
                    onChange={(e) => setField('message', e.target.value)}
                    placeholder="A short note helps us prepare"
                    rows={3}
                    className="w-full resize-none rounded-lg border-[1.5px] border-[var(--color-cream-border)] px-3.5 py-3 text-sm font-sans focus:border-[var(--color-primary)] focus:outline-none"
                  />
                </Field>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="mx-auto mb-4 flex h-13 w-13 items-center justify-center rounded-full bg-[var(--color-badge)]">
                <div className="h-5.5 w-5.5 rounded-full" style={{ background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-mid))' }} />
              </div>
              <div className="mb-1.5 text-center font-serif text-lg font-bold text-[var(--color-ink)] sm:text-xl">
                You&apos;re all set, {booking.name || 'there'}
              </div>
              <div className="mb-5 text-center text-sm text-[var(--color-muted-7)]">
                We&apos;ll call to confirm within one business day.
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-[var(--color-cream-border-light)] bg-white p-4.5">
                <SummaryRow label="Service" value={booking.serviceIdx !== null ? services[booking.serviceIdx].title : '—'} />
                <SummaryRow label="Date" value={booking.dateIdx !== null ? dates[booking.dateIdx].full : '—'} />
                <SummaryRow label="Time" value={booking.timeIdx !== null ? timeSlots[booking.timeIdx] : '—'} />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2.5 border-t border-[var(--color-cream-border-light)] px-5 py-4 sm:px-6 sm:py-5">
          {step > 1 && step < 4 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex-none w-22 rounded-lg border-[1.5px] border-[var(--color-cream-border)] bg-white py-3.5 text-sm font-bold text-[var(--color-body)]"
            >
              Back
            </button>
          )}
          {step < 4 && (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={nextDisabled}
              className="flex-1 rounded-lg border-none py-3.5 text-sm font-bold text-white transition-opacity"
              style={{
                background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-mid))',
                opacity: nextDisabled ? 0.45 : 1,
                cursor: nextDisabled ? 'not-allowed' : 'pointer',
              }}
            >
              Continue
            </button>
          )}
          {step === 4 && (
            <button
              onClick={closeBooking}
              className="flex-1 rounded-lg border-none py-3.5 text-sm font-bold text-white"
              style={{ background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-mid))' }}
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepLabel({ step }) {
  return (
    <div className="mb-1 text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">Step {step} of 4</div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-bold text-[var(--color-muted-6)]">{label}</div>
      {children}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[var(--color-muted)]">{label}</span>
      <span className="font-bold text-[var(--color-ink)]">{value}</span>
    </div>
  );
}
