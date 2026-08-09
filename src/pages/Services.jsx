import { useState } from 'react';
import { services } from '../data/content';
import { useBooking } from '../context/BookingContext';

export default function Services() {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const { openBooking } = useBooking();

  return (
    <div>
      <div
        className="relative overflow-hidden px-6 pb-8 pt-18 md:px-8 md:pb-14 md:pt-28"
        style={{ background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-teal-deep) 100%)' }}
      >
        <div
          className="animate-blob-a absolute -right-12 -top-15 h-50 w-50 rounded-full"
          style={{ background: 'radial-gradient(circle, oklch(0.78 0.15 75 / 0.3), transparent 70%)', filter: 'blur(6px)' }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="font-serif text-[27px] font-bold text-white md:text-5xl">Our Services</div>
          <div className="mt-1.5 text-[13px] text-white/70 md:mt-3 md:text-lg">
            Everything your finances need, under one roof
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 md:grid md:grid-cols-2 md:gap-4 md:px-8 md:py-10">
        {services.map((svc, i) => {
          const expanded = expandedIdx === i;
          return (
            <div
              key={svc.code}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm md:self-start"
              style={{ borderColor: 'var(--color-cream-border-light)' }}
            >
              <button
                onClick={() => setExpandedIdx(expanded ? null : i)}
                className="flex w-full cursor-pointer items-center gap-3 border-none bg-transparent p-4 text-left md:p-5"
              >
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[11px] text-[11px] font-bold text-white md:h-12 md:w-12"
                  style={{ background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-mid))' }}
                >
                  {svc.code}
                </div>
                <div className="flex-1 text-[14.5px] font-bold text-[var(--color-ink)] md:text-lg">{svc.title}</div>
                <div className="text-base text-[var(--color-muted)] md:text-xl">{expanded ? '−' : '+'}</div>
              </button>
              {expanded && (
                <div className="px-4 pb-4.5 pl-17 md:px-5 md:pb-6 md:pl-21">
                  <div className="mb-2.5 text-[13px] leading-relaxed text-[var(--color-muted-2)] md:text-sm">
                    {svc.desc}
                  </div>
                  {svc.bullets.map((b) => (
                    <div key={b} className="mb-1.5 flex gap-2 text-[12.5px] leading-snug text-[var(--color-muted-5)] md:text-sm">
                      <span style={{ color: 'var(--color-gold)' }}>&#9670;</span>
                      <span>{b}</span>
                    </div>
                  ))}
                  <button
                    onClick={() => openBooking(i)}
                    className="mt-3 cursor-pointer rounded-lg border-none px-4 py-2.5 text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-mid))' }}
                  >
                    Enquire about this
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
