// Recurring Indian statutory due dates. Computed from the visitor's "today",
// so the list is always current without anyone updating the site.

const monthly = [
  {
    id: 'tds',
    day: (m) => (m === 3 ? 30 : 7), // March's TDS is due 30 April
    title: 'TDS / TCS deposit',
    detail: 'Tax deducted or collected last month must be paid to the government.',
    audience: 'business',
    service: 'payroll',
  },
  {
    id: 'gstr1',
    day: () => 11,
    title: 'GSTR-1 (monthly)',
    detail: 'Details of last month’s sales for regular GST filers.',
    audience: 'business',
    service: 'gst',
  },
  {
    id: 'pf',
    day: () => 15,
    title: 'PF & ESI contribution',
    detail: 'Employer and employee contributions for last month’s salaries.',
    audience: 'business',
    service: 'payroll',
  },
  {
    id: 'gstr3b',
    day: () => 20,
    title: 'GSTR-3B & GST payment',
    detail: 'Summary return and tax payment for last month.',
    audience: 'business',
    service: 'gst',
  },
];

const yearly = [
  ...[
    [5, 15, 1, '15%'],
    [8, 15, 2, '45%'],
    [11, 15, 3, '75%'],
    [2, 15, 4, '100%'],
  ].map(([month, day, n, pct]) => ({
    id: `adv${n}`,
    month,
    day,
    title: `Advance tax, instalment ${n}`,
    detail: `Pay ${pct} of your estimated tax for the year if it exceeds ₹10,000.`,
    audience: 'all',
    service: 'tax',
  })),
  {
    id: 'itr',
    month: 6,
    day: 31,
    title: 'Income tax return (ITR)',
    detail: 'For salaried people and others whose accounts are not audited.',
    audience: 'individual',
    service: 'tax',
  },
  {
    id: 'taxaudit',
    month: 8,
    day: 30,
    title: 'Tax audit report',
    detail: 'Form 3CA/3CB-3CD for businesses above the audit turnover limit.',
    audience: 'business',
    service: 'audit',
  },
  {
    id: 'itraudit',
    month: 9,
    day: 31,
    title: 'ITR for audited accounts',
    detail: 'Return for companies and businesses that require a tax audit.',
    audience: 'business',
    service: 'tax',
  },
  {
    id: 'belated',
    month: 11,
    day: 31,
    title: 'Belated or revised ITR',
    detail: 'Last chance to file a missed return or correct one already filed.',
    audience: 'individual',
    service: 'tax',
  },
  {
    id: 'gstr9',
    month: 11,
    day: 31,
    title: 'GSTR-9 annual return',
    detail: 'Annual GST return for the previous financial year.',
    audience: 'business',
    service: 'gst',
  },
  {
    id: 'form16',
    month: 5,
    day: 15,
    title: 'Form 16 to employees',
    detail: 'Employers must issue TDS certificates for the last financial year.',
    audience: 'business',
    service: 'payroll',
  },
  ...[
    [6, 31, 'Apr–Jun'],
    [9, 31, 'Jul–Sep'],
    [0, 31, 'Oct–Dec'],
    [4, 31, 'Jan–Mar'],
  ].map(([month, day, q]) => ({
    id: `tdsr${month}`,
    month,
    day,
    title: 'Quarterly TDS return',
    detail: `TDS return (24Q / 26Q) for the ${q} quarter.`,
    audience: 'business',
    service: 'payroll',
  })),
  ...[3, 6, 9, 0].map((month) => ({
    id: `cmp${month}`,
    month,
    day: 18,
    title: 'CMP-08 (GST composition)',
    detail: 'Quarterly tax statement for composition-scheme dealers.',
    audience: 'business',
    service: 'gst',
  })),
];

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export function upcomingDueDates(today = new Date(), monthsAhead = 13) {
  const base = startOfDay(today);
  const out = [];
  for (let i = 0; i < monthsAhead; i++) {
    const y = base.getFullYear() + Math.floor((base.getMonth() + i) / 12);
    const m = (base.getMonth() + i) % 12;
    for (const r of monthly) {
      out.push({ ...r, key: `${r.id}-${y}-${m}`, date: new Date(y, m, r.day(m)) });
    }
    for (const r of yearly) {
      if (r.month === m) out.push({ ...r, key: `${r.id}-${y}`, date: new Date(y, m, r.day) });
    }
  }
  return out
    .filter((d) => d.date >= base)
    .sort((a, b) => a.date - b.date || a.title.localeCompare(b.title))
    .map((d) => ({ ...d, daysLeft: Math.round((d.date - base) / 86400000) }));
}

export function daysLeftLabel(n) {
  if (n === 0) return 'Due today';
  if (n === 1) return 'Due tomorrow';
  return `In ${n} days`;
}

const pad = (n) => String(n).padStart(2, '0');
const ymd = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;

export function icsHref(item) {
  const end = new Date(item.date);
  end.setDate(end.getDate() + 1);
  const now = new Date();
  const stamp = `${ymd(now)}T${pad(now.getHours())}${pad(now.getMinutes())}00`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//M. Aggarwal & Co.//Due dates//EN',
    'BEGIN:VEVENT',
    `UID:${item.key}@maggarwalco.in`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${ymd(item.date)}`,
    `DTEND;VALUE=DATE:${ymd(end)}`,
    `SUMMARY:${item.title} due`,
    `DESCRIPTION:${item.detail} Need help? Call M. Aggarwal & Co. on +91 72985 12186.`,
    'BEGIN:VALARM',
    'TRIGGER:-P3D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${item.title} due in 3 days`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join('\r\n'))}`;
}
