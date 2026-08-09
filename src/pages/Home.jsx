import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import Reveal from '../components/Reveal';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { useReveal, useCountUp } from '../hooks/useReveal';
import { services, processSteps, testimonials, badges, stats } from '../data/content';
import officeInterior from '../assets/images/office-interior.jpg';
import founderPortrait from '../assets/images/founder-portrait.jpg';

export default function Home() {
  const { openBooking } = useBooking();
  const navigate = useNavigate();
  const [statsRef, statsVisible] = useReveal();

  return (
    <div>
      {/* HERO */}
      <div
        className="relative min-h-[560px] overflow-hidden md:min-h-[640px] lg:min-h-[720px]"
        style={{
          background:
            'linear-gradient(135deg, var(--color-navy) 0%, oklch(0.23 0.08 215) 45%, var(--color-teal-deep) 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{ mixBlendMode: 'luminosity' }}
        >
          <ImagePlaceholder shape="rect" src={officeInterior} alt="M. Aggarwal & Co. office" className="h-full w-full" />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,20,25,0.25) 0%, rgba(10,20,25,0.55) 60%, rgba(10,20,25,0.92) 100%)',
          }}
        />
        <div
          className="animate-blob-a absolute -right-[70px] -top-[70px] h-65 w-65 rounded-full"
          style={{ background: 'radial-gradient(circle, oklch(0.78 0.15 75 / 0.4), transparent 70%)', filter: 'blur(6px)' }}
        />
        <div
          className="animate-blob-b absolute -left-20 bottom-30 h-55 w-55 rounded-full"
          style={{ background: 'radial-gradient(circle, oklch(0.72 0.16 155 / 0.35), transparent 70%)', filter: 'blur(6px)' }}
        />

        <div className="relative mx-auto max-w-6xl px-6 pt-18 md:px-8 md:pt-28 lg:pt-32">
          <div className="md:max-w-xl">
            <div
              className="mb-5.5 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5"
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(14px)', borderColor: 'rgba(255,255,255,0.22)' }}
            >
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-gold)' }} />
              <div className="text-[11.5px] font-semibold text-white/90">13 years &middot; 500+ clients trust us</div>
            </div>
            <div className="font-serif mb-3.5 text-[38px] font-bold leading-[1.08] text-white md:text-5xl lg:text-6xl">
              Financial clarity,
              <br />
              handled with care.
            </div>
            <div className="mb-6.5 max-w-[290px] text-sm leading-relaxed text-white/75 md:max-w-md md:text-base">
              M. Aggarwal &amp; Co. — chartered accountants for tax, GST, audit and the money decisions in between.
            </div>
            <div className="mb-12 flex gap-2.5 md:mb-20">
              <button
                onClick={() => openBooking(null)}
                className="cursor-pointer rounded-xl border-none px-5 py-3.5 text-sm font-bold shadow-lg md:px-7 md:py-4 md:text-base"
                style={{
                  background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-deep))',
                  color: 'var(--color-gold-text)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                }}
              >
                Book Consultation
              </button>
              <button
                onClick={() => navigate('/services')}
                className="cursor-pointer rounded-xl border px-4.5 py-3.5 text-sm font-semibold text-white md:px-6 md:py-4 md:text-base"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(14px)', borderColor: 'rgba(255,255,255,0.3)' }}
              >
                View Services
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-3.5 left-0 right-0 flex justify-center md:hidden">
          <div className="animate-bob h-1.5 w-1.5 rounded-full bg-white" />
        </div>
      </div>

      {/* STATS */}
      <div ref={statsRef} className="relative z-2 -mt-9 px-5 md:mt-0 md:px-8">
        <div
          className="reveal mx-auto grid max-w-6xl grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-5"
          style={{
            opacity: statsVisible ? 1 : 0,
            transform: statsVisible ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {stats.map((s) => (
            <StatCard key={s.key} stat={s} active={statsVisible} />
          ))}
        </div>
      </div>

      {/* SERVICES SHOWCASE */}
      <div className="mx-auto max-w-6xl px-6 pb-2 pt-11 md:px-8 md:pt-20">
        <Reveal>
          <SectionKicker>What we do</SectionKicker>
          <SectionTitle>Six ways we look after your money</SectionTitle>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {services.map((svc, i) => (
              <Reveal
                key={svc.code}
                delay={i * 70}
                onClick={() => navigate('/services')}
                className="cursor-pointer rounded-2xl border bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg md:p-6"
                style={{ borderColor: 'var(--color-cream-border-light)' }}
              >
                <div
                  className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-[10px] text-[10px] font-bold tracking-wide text-white md:mb-4 md:h-11 md:w-11 md:text-xs"
                  style={{ background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-mid))' }}
                >
                  {svc.code}
                </div>
                <div className="mb-1.5 text-[13.5px] font-bold leading-tight text-[var(--color-ink)] md:text-base">
                  {svc.title}
                </div>
                <div className="text-[11.5px] leading-snug text-[var(--color-muted)] md:text-sm">{svc.short}</div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>

      {/* PROCESS */}
      <div className="mt-11 px-6 pb-2 pt-11 md:mt-16 md:px-8 md:pt-20" style={{ background: 'var(--color-cream-alt)' }}>
        <Reveal className="mx-auto max-w-4xl">
          <SectionKicker>How it works</SectionKicker>
          <SectionTitle>From first call to filed</SectionTitle>
          <div className="md:grid md:grid-cols-2 md:gap-x-10">
            {processSteps.map((step) => (
              <div key={step.num} className="flex gap-4">
                <div className="flex flex-shrink-0 flex-col items-center">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white md:h-11 md:w-11 md:text-base"
                    style={{ background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-mid))' }}
                  >
                    {step.num}
                  </div>
                  <div
                    className="w-0.5 flex-1 md:hidden"
                    style={{ background: 'linear-gradient(180deg, var(--color-teal-mid), transparent)' }}
                  />
                </div>
                <div className="pb-6.5 md:pb-10">
                  <div className="mb-1 text-[14.5px] font-bold text-[var(--color-ink)] md:text-lg">{step.title}</div>
                  <div className="text-[12.5px] leading-relaxed text-[var(--color-muted-2)] md:text-sm">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* STORY BREAK */}
      <Reveal className="relative mt-1.5 h-75 md:h-96">
        <ImagePlaceholder
          shape="rect"
          src={founderPortrait}
          alt="M. Aggarwal, Founder & FCA"
          objectPosition="center 15%"
          className="absolute inset-0 h-full w-full"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(12,24,24,0.15) 0%, rgba(10,20,20,0.85) 100%)' }}
        />
        <div
          className="absolute -bottom-7 left-5 right-5 rounded-[18px] border p-5 md:left-1/2 md:right-auto md:w-[560px] md:-translate-x-1/2 md:p-8"
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(18px)',
            borderColor: 'rgba(255,255,255,0.7)',
            boxShadow: '0 16px 40px rgba(20,40,40,0.15)',
          }}
        >
          <div className="font-serif mb-2.5 text-[15.5px] italic leading-relaxed text-[var(--color-ink-soft)] md:text-xl">
            &ldquo;We built this firm so no client ever has to feel lost in their own finances.&rdquo;
          </div>
          <div className="text-xs font-bold text-[var(--color-primary)] md:text-sm">M. Aggarwal, Founder &amp; FCA</div>
        </div>
      </Reveal>

      {/* TESTIMONIALS */}
      <div className="pt-20 pb-2 md:pt-28">
        <Reveal>
          <div className="mx-auto mb-4 max-w-6xl px-6 md:px-8">
            <SectionKicker>Testimonials</SectionKicker>
            <SectionTitle>What clients say</SectionTitle>
          </div>
          <div className="flex gap-3.5 overflow-x-auto px-6 pb-2 md:mx-auto md:max-w-6xl md:px-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex-none w-62.5 rounded-[18px] border bg-white p-5 shadow-sm md:w-auto md:flex-1 md:p-7"
                style={{ borderColor: 'var(--color-cream-border-light)' }}
              >
                <div className="mb-2.5 text-sm tracking-widest" style={{ color: 'var(--color-gold)' }}>
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>
                <div className="font-serif mb-4 text-[13.5px] italic leading-relaxed text-[var(--color-body)] md:text-base">
                  &ldquo;{t.quote}&rdquo;
                </div>
                <div className="flex items-center gap-2.5">
                  <ImagePlaceholder shape="circle" className="h-9 w-9 flex-shrink-0" />
                  <div>
                    <div className="text-[12.5px] font-bold text-[var(--color-ink)] md:text-sm">{t.name}</div>
                    <div className="text-[11px] text-[var(--color-muted)]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* BADGES MARQUEE */}
      <Reveal className="overflow-hidden py-9">
        <div className="flex w-max gap-3 animate-marquee">
          {[...badges, ...badges].map((b, i) => (
            <div
              key={i}
              className="flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-[11.5px] font-bold"
              style={{ background: 'var(--color-badge)', color: 'var(--color-badge-text)' }}
            >
              {b}
            </div>
          ))}
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal className="px-6 pb-8 pt-2 md:mx-auto md:max-w-6xl md:px-8 md:pb-16">
        <div
          className="relative overflow-hidden rounded-[20px] p-7 md:flex md:items-center md:justify-between md:p-14"
          style={{ background: 'linear-gradient(135deg, var(--color-navy), var(--color-teal-deep))' }}
        >
          <div
            className="absolute -right-7 -top-7 h-32.5 w-32.5 rounded-full"
            style={{ background: 'radial-gradient(circle, oklch(0.78 0.15 75 / 0.35), transparent 70%)' }}
          />
          <div className="relative md:max-w-md">
            <div className="font-serif mb-1.5 text-xl font-bold text-white md:text-3xl">
              Free 20-minute consultation
            </div>
            <div className="mb-4.5 text-[13px] leading-relaxed text-white/72 md:mb-0 md:text-base">
              Talk through your tax or compliance questions, no obligation.
            </div>
          </div>
          <div className="relative flex gap-2.5 md:flex-shrink-0">
            <button
              onClick={() => openBooking(null)}
              className="cursor-pointer rounded-[11px] border-none px-5 py-3.5 text-[13.5px] font-bold md:px-7 md:py-4 md:text-base"
              style={{ background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-deep))', color: 'var(--color-gold-text)' }}
            >
              Book Now
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="cursor-pointer rounded-[11px] border px-4.5 py-3.5 text-[13.5px] font-semibold text-white md:px-6 md:py-4 md:text-base"
              style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.3)' }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function StatCard({ stat, active }) {
  const value = useCountUp(stat.target, active, 1400, stat.decimals || 0);
  return (
    <div
      className="rounded-2xl border p-4 md:p-6"
      style={{
        background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(16px)',
        borderColor: 'rgba(255,255,255,0.7)',
        boxShadow: '0 10px 30px rgba(20,40,40,0.1)',
      }}
    >
      <div className="font-serif text-[23px] font-bold text-[var(--color-primary)] md:text-4xl">
        {value}
        {stat.suffix}
      </div>
      <div className="mt-0.5 text-[11px] text-[var(--color-muted-2)] md:text-sm">{stat.label}</div>
    </div>
  );
}

function SectionKicker({ children }) {
  return (
    <div
      className="mb-2 text-[11.5px] font-bold uppercase tracking-[1.2px] md:text-xs"
      style={{ color: 'var(--color-accent-green)' }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="font-serif mb-4.5 text-[23px] font-bold text-[var(--color-ink)] md:mb-9 md:text-4xl">
      {children}
    </div>
  );
}
