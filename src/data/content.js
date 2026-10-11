// Demo firm. FRN, credentials, team, stats and testimonials are illustrative
// placeholders; replace them with the real firm's details before going live.
export const firm = {
  name: 'M. Aggarwal & Co.',
  tagline: 'Chartered Accountants',
  frn: '014382C',
  since: 2011,
  phoneDisplay: '+91 72985 12186',
  phoneHref: 'tel:+917298512186',
  whatsapp: '917298512186',
  email: 'hello@maggarwalco.in',
  addressLines: ['204, Residency Road', 'Near City Court, Jaipur 302001', 'Rajasthan'],
  addressShort: '204 Residency Road, Jaipur',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Residency+Road+Jaipur+Rajasthan',
  mapsEmbed: 'https://maps.google.com/maps?q=Residency%20Road%2C%20Jaipur&z=15&output=embed',
  hours: [
    { days: 'Monday to Friday', time: '10:00 am – 7:00 pm' },
    { days: 'Saturday', time: '10:00 am – 4:00 pm' },
    { days: 'Sunday', time: 'Closed' },
  ],
};

export const whatsappLink = (text = 'Hello, I would like to speak with a CA at M. Aggarwal & Co.') =>
  `https://wa.me/${firm.whatsapp}?text=${encodeURIComponent(text)}`;

export const services = [
  {
    code: 'tax',
    icon: 'tax',
    title: 'Income Tax Filing & Planning',
    short: 'Returns, planning and notices handled end to end.',
    desc: 'Accurate, on-time income tax returns and year-round planning to legally minimise what you owe, whichever regime suits you.',
    bullets: [
      'ITR filing for salaried, professionals and businesses',
      'Old vs new regime comparison and advance tax planning',
      'Capital gains on shares, mutual funds and property',
      'Income tax notices, scrutiny and appeals',
    ],
    forWhom: 'Salaried individuals, NRIs, professionals, business owners',
  },
  {
    code: 'gst',
    icon: 'gst',
    title: 'GST Registration & Returns',
    short: 'Registration, returns and reconciliation, on schedule.',
    desc: 'Registration, monthly or quarterly returns and input-credit reconciliation so you never miss a due date or a rupee of credit.',
    bullets: [
      'GST registration, amendments and cancellation',
      'GSTR-1, GSTR-3B and annual GSTR-9 filing',
      'Input tax credit reconciliation with GSTR-2B',
      'GST notices, audits and e-way bill support',
    ],
    forWhom: 'Traders, manufacturers, e-commerce sellers, service businesses',
  },
  {
    code: 'reg',
    icon: 'reg',
    title: 'Business Registration',
    short: 'The right structure, set up from day one.',
    desc: 'From sole proprietorship to private limited, we help you pick the right structure and handle every filing to get you started.',
    bullets: [
      'Private limited, LLP and OPC incorporation',
      'MSME / Udyam and shop & establishment registration',
      'Trademark filing and professional tax',
      'ROC annual filings and compliance calendar',
    ],
    forWhom: 'First-time founders, family businesses, startups',
  },
  {
    code: 'audit',
    icon: 'audit',
    title: 'Audit & Assurance',
    short: 'Numbers lenders and investors can trust.',
    desc: 'Statutory, tax and internal audits that give lenders, investors and you real confidence in the numbers.',
    bullets: [
      'Statutory audit under the Companies Act',
      'Tax audit under Section 44AB',
      'Internal, concurrent and stock audits',
      'Due diligence for loans and investment',
    ],
    forWhom: 'Companies, LLPs, firms with turnover above audit limits',
  },
  {
    code: 'advisory',
    icon: 'advisory',
    title: 'Financial Advisory',
    short: 'Savings, investments and the long view.',
    desc: 'Practical, unbiased guidance on savings, investments, loans and long-term wealth planning for you and your family.',
    bullets: [
      'Retirement and goal-based planning',
      'Investment portfolio review',
      'Loan structuring and project reports for banks',
      'Will, estate and succession planning',
    ],
    forWhom: 'Families, retirees, business owners planning ahead',
  },
  {
    code: 'payroll',
    icon: 'payroll',
    title: 'Payroll & TDS',
    short: 'Salaries, PF/ESI and TDS, every month.',
    desc: 'Accurate monthly payroll with PF, ESI and TDS deposited and filed on time, so your team is paid right and you stay compliant.',
    bullets: [
      'Monthly payroll processing and payslips',
      'PF and ESI registration and returns',
      'TDS deposit and quarterly TDS returns',
      'Form 16 and Form 16A issuance',
    ],
    forWhom: 'Businesses with 5 to 200 employees',
  },
];

export const serviceIndex = (code) => services.findIndex((s) => s.code === code);

export const processSteps = [
  { title: 'Free consultation', desc: 'A 20-minute call or visit to understand your situation. No fee, no obligation.' },
  { title: 'A clear quote', desc: 'You get a written scope and a fixed fee before any work begins.' },
  { title: 'Documents, your way', desc: 'Share on WhatsApp or email, or we collect them from you in Jaipur.' },
  { title: 'We do the work', desc: 'Your assigned CA prepares, reviews and keeps you posted on progress.' },
  { title: 'You approve, we file', desc: 'Nothing is filed without your sign-off. You receive the acknowledgement.' },
];

export const testimonials = [
  {
    quote: 'They have handled my family’s taxes for six years and I have never once worried about a deadline. They message me before I even remember.',
    name: 'Rohit Malhotra',
    role: 'Owner, Malhotra Textiles, Jaipur',
    id: 't1',
  },
  {
    quote: 'Patient, clear, and never made me feel silly for asking basic questions about GST. My returns have been on time every single month.',
    name: 'Sunita Rao',
    role: 'Boutique owner, C-Scheme',
    id: 't2',
  },
  {
    quote: 'We moved our company audit to them last year. The difference in communication was night and day, and the bank loved the reports.',
    name: 'Arvind Nair',
    role: 'Co-founder, a Jaipur D2C startup',
    id: 't3',
  },
  {
    quote: 'Got a scrutiny notice and panicked. Mr. Aggarwal sat with me, explained everything in Hindi, and the matter was closed in two months.',
    name: 'Deepak Choudhary',
    role: 'Retired bank officer, Vaishali Nagar',
    id: 't4',
  },
];

export const team = [
  {
    name: 'CA M. Aggarwal',
    role: 'Founder & Managing Partner',
    creds: 'FCA, DISA (ICAI) · 25+ years',
    focus: 'Tax advisory, notices and family-business planning',
    img: 'founder',
    id: 'team1',
  },
  {
    name: 'CA R. K. Jain',
    role: 'Partner, Audit & Assurance',
    creds: 'FCA · 18 years',
    focus: 'Statutory and bank audits, due diligence',
    img: 'partner',
    id: 'team4',
  },
  {
    name: 'CA Priya Sharma',
    role: 'Senior Associate, GST',
    creds: 'ACA · 6 years',
    focus: 'GST returns, reconciliation and notices',
    img: 'priya',
    id: 'team2',
  },
  {
    name: 'Karan Mehta',
    role: 'Tax Consultant',
    creds: 'B.Com, CA Inter · 4 years',
    focus: 'Individual returns, payroll and TDS',
    img: 'karan',
    id: 'team3',
  },
];

export const milestones = [
  { year: '2011', text: 'Founded as a single-partner practice on Residency Road, Jaipur.' },
  { year: '2015', text: 'Crossed 200 individual and business clients.' },
  { year: '2017', text: 'Set up a dedicated GST desk in the first year of GST.' },
  { year: '2019', text: 'Added an audit partner and empanelled for bank branch audits.' },
  { year: '2024', text: 'Serving 500+ clients across Rajasthan, Gujarat and Madhya Pradesh.' },
];

export const credentials = [
  { title: 'ICAI member firm', detail: `Firm Registration No. ${firm.frn}` },
  { title: 'Peer reviewed', detail: 'Peer review certificate issued by ICAI' },
  { title: 'Bank audit panel', detail: 'Empanelled for bank branch audits' },
  { title: 'GST practitioner', detail: 'Enrolled GST practitioner on the GSTN portal' },
];

export const stats = [
  { value: `${new Date().getFullYear() - firm.since}`, label: 'years in practice' },
  { value: '500+', label: 'clients served' },
  { value: '1,200+', label: 'returns filed each year' },
  { value: '4.9', label: 'average client rating' },
];

export const faqs = [
  {
    q: 'Is the first consultation really free?',
    a: 'Yes. The first 20-minute call or office visit is free and carries no obligation. If you decide to go ahead, we send you a written quote first.',
  },
  {
    q: 'How are your fees decided?',
    a: 'Fees depend on the work involved, for example a salaried ITR versus a business with GST and audit. We always agree a fixed fee in writing before starting.',
  },
  {
    q: 'What documents do I need to file my income tax return?',
    a: 'Usually your PAN, Aadhaar, Form 16, bank interest certificates, AIS/26AS and proof of investments. After your consultation we send a checklist made for your case.',
  },
  {
    q: 'I received an income tax or GST notice. What should I do?',
    a: 'Do not ignore it, and do not reply in a hurry. Share a copy with us on WhatsApp; we will read it and tell you the deadline and next steps the same day.',
  },
  {
    q: 'Do you work with clients outside Jaipur?',
    a: 'Yes. Most of our work happens over WhatsApp, email and video calls, and we serve clients across Rajasthan, Gujarat and Madhya Pradesh.',
  },
  {
    q: 'Can you speak with me in Hindi?',
    a: 'Of course. Our whole team works in Hindi and English, and we explain everything in plain language.',
  },
];

export const timeSlots = ['10:30 AM', '12:00 PM', '3:00 PM', '5:00 PM'];
