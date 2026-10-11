import { useMemo, useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { serviceIndex } from '../data/content';
import { upcomingDueDates, daysLeftLabel, icsHref } from '../data/dueDates';
import Icon from './Icon';

const filters = [
  { id: 'all', label: 'Everyone' },
  { id: 'individual', label: 'Individuals' },
  { id: 'business', label: 'Businesses' },
];

const fmtMonth = new Intl.DateTimeFormat('en-IN', { month: 'short' });
const fmtLong = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export default function DueDates({ limit = 5 }) {
  const { openBooking } = useBooking();
  const [who, setWho] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const all = useMemo(() => upcomingDueDates(), []);

  const list = all.filter((d) => who === 'all' || d.audience === who || d.audience === 'all');
  const [next, ...rest] = list;
  const shown = rest.slice(0, expanded ? limit * 2 : limit - 1);

  return (
    <div>
      <div className="scroll-x -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="tablist" aria-label="Show due dates for">
        {filters.map((f) => {
          const active = who === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => { setWho(f.id); setExpanded(false); }}
              className={`min-h-11 shrink-0 rounded-full px-5 text-[15px] font-semibold transition-colors duration-200 ${
                active
                  ? 'bg-[var(--color-ink)] text-white'
                  : 'bg-[var(--color-glaze)] text-[var(--color-ink-soft)] ring-1 ring-inset ring-[var(--color-line)] hover:text-[var(--color-cobalt)]'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {next && (
        <div key={next.key} className="anim-fade mt-6 overflow-hidden rounded-[28px] bg-[var(--color-cobalt)] text-white">
          <div className="flex items-start justify-between gap-4 p-6 sm:p-8">
            <div className="min-w-0">
              <h3 className="text-[26px] leading-tight sm:text-3xl">{next.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-on-cobalt)]">{next.detail}</p>
              <p className="mt-3 text-sm text-[var(--color-on-cobalt)]">{fmtLong.format(next.date)}</p>
            </div>
            <div className="shrink-0 text-right">
              {next.daysLeft === 0 ? (
                <div className="font-[family-name:var(--font-display)] text-[34px] leading-none sm:text-5xl">Today</div>
              ) : (
                <>
                  <div className="tnum font-[family-name:var(--font-display)] text-[56px] leading-none sm:text-7xl">
                    {next.daysLeft}
                  </div>
                  <div className="mt-1 text-sm text-[var(--color-on-cobalt)]">
                    {next.daysLeft === 1 ? 'day left' : 'days left'}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 border-t border-white/15">
            <a
              href={icsHref(next)}
              download={`${next.key}.ics`}
              className="flex min-h-14 items-center justify-center gap-2 text-[15px] font-semibold hover:bg-white/8"
            >
              <Icon name="calendarPlus" className="h-5 w-5" /> Add to calendar
            </a>
            <button
              type="button"
              onClick={() => openBooking(serviceIndex(next.service))}
              className="flex min-h-14 items-center justify-center gap-2 border-l border-white/15 text-[15px] font-semibold hover:bg-white/8"
            >
              Get it done <Icon name="arrow" className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      )}

      <ul className="mt-2">
        {shown.map((d) => (
          <li key={d.key} className="anim-fade flex items-center gap-4 border-b border-[var(--color-line)] py-4">
            <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full bg-[var(--color-glaze)] ring-2 ring-[var(--color-turq)]">
              <span className="tnum font-[family-name:var(--font-display)] text-xl leading-none text-[var(--color-cobalt)]">
                {d.date.getDate()}
              </span>
              <span className="mt-0.5 text-[11px] font-semibold tracking-wide text-[var(--color-ink-soft)] uppercase">
                {fmtMonth.format(d.date)}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-snug text-[var(--color-ink)]">{d.title}</p>
              <p className="mt-0.5 text-sm text-[var(--color-ink-soft)]">
                <span className={d.daysLeft <= 7 ? 'font-semibold text-[var(--color-cobalt)]' : ''}>
                  {daysLeftLabel(d.daysLeft)}
                </span>
                <span className="hidden sm:inline"> · {d.detail}</span>
              </p>
            </div>
            <a
              href={icsHref(d)}
              download={`${d.key}.ics`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[var(--color-cobalt)] ring-1 ring-inset ring-[var(--color-line)] hover:bg-[var(--color-glaze)] hover:ring-[var(--color-cobalt)]"
              aria-label={`Add ${d.title} on ${fmtLong.format(d.date)} to your calendar`}
              title="Add to calendar"
            >
              <Icon name="calendarPlus" className="h-5 w-5" />
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {rest.length > limit - 1 && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="inline-flex min-h-11 items-center gap-1.5 self-start font-semibold text-[var(--color-cobalt)]"
            aria-expanded={expanded}
          >
            {expanded ? 'Show fewer dates' : 'Show more dates'}
            <Icon name="chevronDown" className={`h-4.5 w-4.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        )}
        <p className="text-[13px] leading-relaxed text-[var(--color-ink-soft)] sm:max-w-sm sm:text-right">
          Statutory due dates, worked out from today. The government sometimes extends them; we tell our clients when it does.
        </p>
      </div>
    </div>
  );
}
