const socials = ['IN', 'FB', 'X'];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-teal-dark-footer)' }} className="px-6 pb-24 pt-9 md:px-8 md:pb-12">
      <div className="mx-auto max-w-6xl md:flex md:items-start md:justify-between md:gap-10">
        <div className="md:max-w-sm">
          <div className="mb-1.5 font-serif text-lg font-bold text-white md:text-xl">M. Aggarwal &amp; Co.</div>
          <div className="mb-5 text-xs leading-relaxed text-white/55 md:text-sm">
            204 Residency Road, Jaipur, Rajasthan
            <br />
            hello@maggarwalco.in &middot; +91 72985 12186
          </div>
          <div className="mb-5.5 flex gap-2.5 md:mb-0">
            {socials.map((s) => (
              <div
                key={s}
                className="flex h-8.5 w-8.5 items-center justify-center rounded-full border text-[10px] font-bold text-white"
                style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.15)' }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
        <div className="hidden gap-16 md:flex">
          <FooterCol title="Company" items={['Home', 'Services', 'About', 'Contact']} />
          <FooterCol
            title="Services"
            items={['Tax Filing', 'GST & Compliance', 'Auditing', 'Financial Advisory']}
          />
        </div>
      </div>
      <div
        className="mx-auto mt-4 max-w-6xl border-t pt-4 text-[10.5px] text-white/40 md:mt-8 md:pt-6 md:text-xs"
        style={{ borderColor: 'rgba(255,255,255,0.12)' }}
      >
        &copy; 2026 M. Aggarwal &amp; Co. &middot; Firm Regn. No. 0XXXXXN
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <div className="mb-3 text-xs font-bold uppercase tracking-wide text-white/40">{title}</div>
      <div className="flex flex-col gap-2.5">
        {items.map((i) => (
          <span key={i} className="text-sm text-white/70">
            {i}
          </span>
        ))}
      </div>
    </div>
  );
}
