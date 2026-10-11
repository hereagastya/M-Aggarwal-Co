// One stroke family: 24px grid, 1.7 stroke, round caps.
const paths = {
  phone: (
    <path d="M5 4.5h3l1.5 4-2 1.3a10.5 10.5 0 0 0 6.7 6.7l1.3-2 4 1.5v3A2 2 0 0 1 17.4 21 15.5 15.5 0 0 1 3 6.6 2 2 0 0 1 5 4.5Z" />
  ),
  whatsapp: (
    <>
      <path d="M4.2 19.8l1.1-3.9A8.3 8.3 0 1 1 8.4 19z" />
      <path d="M9 8.6c.2-.5.5-.6.9-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.2.7l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.2.4-.3.7-.2l1.6.7c.3.1.4.3.4.5v.5c0 .4-.1.7-.6.9-.6.3-1.6.4-3-.2a8.6 8.6 0 0 1-4.2-4.2c-.6-1.4-.5-2.4-.2-3Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2.5" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  calendarPlus: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2.5" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4M12 12.5v5M9.5 15h5" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevron: <path d="m9 6 6 6-6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7.5h16M4 12h16M4 16.5h10" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  shield: (
    <>
      <path d="M12 3.5 5 6v5.5c0 4.4 3 8 7 9 4-1 7-4.6 7-9V6z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  star: <path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.4L12 16l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6z" />,
  quote: (
    <path d="M10 7.5C7 8.3 5 10.6 5 14v3.5h5V13H7.5c0-2 1-3.4 2.9-4ZM19 7.5c-3 .8-5 3.1-5 6.5v3.5h5V13h-2.5c0-2 1-3.4 2.9-4Z" />
  ),
  // service icons
  tax: (
    <>
      <path d="M7 3.5h7.5L19 8v12.5H7z" />
      <path d="M14 3.5V8.5h5M10 12.5h6M10 16h6" />
    </>
  ),
  gst: (
    <>
      <path d="M6 3.5h12v17l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4z" />
      <path d="M9 8h6M9 11.5h6M9 15h3.5" />
    </>
  ),
  reg: (
    <>
      <path d="M4 20.5h16M6 20.5V9l6-4.5L18 9v11.5" />
      <path d="M10 20.5v-5h4v5M9.5 11h.01M14.5 11h.01" />
    </>
  ),
  audit: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5M8 10.7l1.8 1.8 3.2-3.5" />
    </>
  ),
  advisory: (
    <>
      <path d="M4 19.5h16" />
      <path d="M5.5 15.5 10 11l3 3 5.5-6.5" />
      <path d="M14.5 7.5h4v4" />
    </>
  ),
  payroll: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.6-3 2.8-5 5.5-5s4.9 2 5.5 5" />
      <path d="M15.5 6a3 3 0 0 1 0 5.5M17.5 14.3c1.6.7 2.7 2.4 3 4.7" />
    </>
  ),
};

export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.7, fill = 'none' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
