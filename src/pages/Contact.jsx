import ImagePlaceholder from '../components/ImagePlaceholder';
import { useBooking } from '../context/BookingContext';
import officeInterior from '../assets/images/office-interior.jpg';

const info = [
  { code: 'TEL', title: '+91 72985 12186', sub: 'Mon–Sat, 10am–7pm' },
  { code: 'MAIL', title: 'hello@maggarwalco.in', sub: 'General enquiries' },
  { code: 'LOC', title: '204 Residency Road, Jaipur', sub: 'Near City Court' },
];

export default function Contact() {
  const { openBooking } = useBooking();

  return (
    <div>
      <div
        className="relative overflow-hidden px-6 pb-8 pt-18 md:px-8 md:pb-14 md:pt-28"
        style={{ background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-teal-deep) 100%)' }}
      >
        <div
          className="animate-blob-b absolute -bottom-15 -left-12 h-50 w-50 rounded-full"
          style={{ background: 'radial-gradient(circle, oklch(0.72 0.16 155 / 0.3), transparent 70%)', filter: 'blur(6px)' }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="font-serif text-[27px] font-bold text-white md:text-5xl">Get in Touch</div>
          <div className="mt-1.5 text-[13px] text-white/70 md:mt-3 md:text-lg">
            We usually reply within one business day
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-6 md:px-8 md:py-14">
        <div className="md:grid md:grid-cols-[1fr_1fr] md:gap-12">
          <div>
            <div
              className="mb-5 rounded-2xl border bg-white p-5 shadow-sm md:p-7"
              style={{ borderColor: 'var(--color-cream-border-light)' }}
            >
              {info.map((row, i) => (
                <div key={row.code} className={`flex gap-3 ${i < info.length - 1 ? 'mb-4' : ''}`}>
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] text-[11px] font-bold md:h-11 md:w-11"
                    style={{ background: 'var(--color-badge)', color: 'var(--color-badge-text)' }}
                  >
                    {row.code}
                  </div>
                  <div>
                    <div className="text-[13.5px] font-bold text-[var(--color-ink)] md:text-base">{row.title}</div>
                    <div className="text-[11.5px] text-[var(--color-muted)] md:text-sm">{row.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <ImagePlaceholder
              shape="rounded"
              src={officeInterior}
              alt="M. Aggarwal & Co. office"
              className="mb-5 h-38 w-full md:h-56"
            />
          </div>

          <div
            className="rounded-2xl p-6 text-center md:p-10"
            style={{ background: 'linear-gradient(135deg, var(--color-navy), var(--color-teal-deep))' }}
          >
            <div className="font-serif mb-1.5 text-[17px] font-bold text-white md:text-2xl">Ready to talk?</div>
            <div className="mb-4 text-[12.5px] text-white/70 md:mb-6 md:text-base">
              Book a free 20-minute consultation in under a minute.
            </div>
            <button
              onClick={() => openBooking(null)}
              className="w-full cursor-pointer rounded-[11px] border-none py-3.5 text-[13.5px] font-bold md:py-4 md:text-base"
              style={{ background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-deep))', color: 'var(--color-gold-text)' }}
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
