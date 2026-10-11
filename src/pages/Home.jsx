import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { firm, services, processSteps, testimonials, stats } from '../data/content';
import { Plate, Rosette, VineRule } from '../components/Motifs';
import Icon from '../components/Icon';
import DueDates from '../components/DueDates';
import { Button, Container, Rise, TextLink } from '../components/ui';
import { CtaBand, Credentials, SectionHeading, Stations } from '../components/Sections';
import founderPortrait from '../assets/images/founder-portrait.jpg';

// The plate turns like it is on the potter's wheel as you scroll.
function useWheel() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (ref.current) ref.current.style.transform = `rotate(${window.scrollY * 0.09}deg)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return ref;
}

export default function Home() {
  const { openBooking } = useBooking();
  const wheel = useWheel();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <Container className="grid items-center gap-y-8 pb-12 pt-4 sm:pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-x-12 lg:pb-24 lg:pt-16">
          <div className="relative h-[228px] sm:h-[300px] lg:order-2 lg:h-[540px]">
            <div className="absolute -right-16 -top-2 h-[236px] w-[236px] sm:right-0 sm:h-[300px] sm:w-[300px] lg:right-[-6%] lg:top-0 lg:h-[500px] lg:w-[500px]">
              <div ref={wheel} className="h-full w-full will-change-transform">
                <Rosette className="h-full w-full drop-shadow-[0_18px_30px_oklch(0.43_0.17_264/0.18)]" />
              </div>
            </div>
            <figure className="absolute left-0 top-12 w-[168px] sm:left-6 sm:w-[210px] lg:bottom-4 lg:left-0 lg:top-auto lg:w-[290px]">
              <Plate
                src={founderPortrait}
                alt="CA M. Aggarwal, founder of M. Aggarwal & Co."
                position="center 22%"
                size="lg"
                loading="eager"
                className="shadow-[0_18px_40px_-14px_oklch(0.25_0.07_264/0.45)]"
              />
              <figcaption className="mt-3 hidden text-sm text-[var(--color-ink-soft)] lg:block">
                <span className="font-semibold text-[var(--color-ink)]">CA M. Aggarwal</span>, FCA · Founder
              </figcaption>
            </figure>
          </div>

          <div className="lg:order-1">
            <h1 className="text-[42px] leading-[1.06] sm:text-6xl lg:text-[76px]">
              Financial clarity, <span className="text-[var(--color-cobalt)]">handled with care.</span>
            </h1>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-[var(--color-ink-soft)] sm:text-lg">
              Chartered accountants in Jaipur since {firm.since}, for income tax, GST, audit and the money decisions in between.
              Plain answers, on time, every time.
            </p>
            <div className="mt-8 grid gap-3 sm:flex">
              <Button onClick={() => openBooking(null)}>
                Book a free consultation
                <Icon name="arrow" className="h-4.5 w-4.5" />
              </Button>
              <Button variant="call" href={firm.phoneHref}>
                <Icon name="phone" className="h-4.5 w-4.5" />
                <span className="tnum">Call {firm.phoneDisplay.replace('+91 ', '')}</span>
              </Button>
            </div>
            <p className="tnum mt-6 flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
              <Icon name="shield" className="h-4.5 w-4.5 shrink-0 text-[var(--color-cobalt)]" />
              ICAI member firm · FRN {firm.frn} · Peer reviewed
            </p>
          </div>
        </Container>

        <Container>
          <p className="grid grid-cols-2 gap-x-5 gap-y-4 border-t border-[var(--color-line)] py-6 text-[15px] leading-snug text-[var(--color-ink-soft)] lg:flex lg:flex-wrap lg:gap-x-6 lg:py-7 lg:text-[17px] lg:leading-[2.1]">
            {stats.map((s, i) => (
              <span key={s.label} className="flex flex-col lg:inline-flex lg:flex-row lg:items-baseline lg:whitespace-nowrap">
                <span className="tnum font-[family-name:var(--font-display)] text-[28px] leading-tight text-[var(--color-cobalt)] lg:mr-1.5 lg:text-2xl">{s.value}</span>
                {s.label}
                {i < stats.length - 1 && <span className="ml-6 hidden h-1.5 w-1.5 self-center lg:inline-block rounded-full bg-[var(--color-turq)]" aria-hidden="true" />}
              </span>
            ))}
          </p>
        </Container>
      </section>

      {/* DUE DATES: the live compliance calendar */}
      <section id="due-dates" className="bg-[var(--color-wash)]">
        <VineRule className="opacity-60" />
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              title="What’s due next"
              sub="Upcoming income tax, GST and payroll deadlines, worked out live from today’s date. Add any of them to your phone’s calendar with one tap."
            />
          </div>
          <DueDates />
        </Container>
      </section>

      {/* SERVICES */}
      <section className="relative overflow-hidden bg-[var(--color-cobalt)]">
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading
            light
            title="Six ways we look after your money"
            sub="One firm for the whole picture, so nothing falls between two advisers."
          />
          <ul className="mt-10 grid border-t border-white/15 lg:grid-cols-2 lg:gap-x-12">
            {services.map((s) => (
              <li key={s.code} className="border-b border-white/15">
                <Link to={`/services#${s.code}`} className="group flex items-center gap-4 py-5 sm:py-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-turq)] text-[var(--color-ink)] transition-transform duration-300 group-hover:rotate-[-8deg]">
                    <Icon name={s.icon} className="h-5.5 w-5.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[17px] font-semibold leading-snug text-white">{s.title}</span>
                    <span className="mt-0.5 block text-[15px] leading-snug text-[var(--color-on-cobalt)]">{s.short}</span>
                  </span>
                  <Icon name="chevron" className="h-5 w-5 shrink-0 text-[var(--color-on-cobalt)] transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* PROCESS */}
      <section>
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading title="From first call to filed" sub="A simple, predictable way of working. You always know what happens next and what it costs." />
          <div className="mt-10 lg:mt-14">
            <Stations steps={processSteps} />
          </div>
        </Container>
      </section>

      {/* FOUNDER */}
      <section className="bg-[var(--color-wash)]">
        <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
          <Rise className="mx-auto w-[240px] sm:w-[300px] lg:w-[380px]">
            <Plate src={founderPortrait} alt="CA M. Aggarwal" position="center 22%" size="lg" />
          </Rise>
          <figure>
            <Icon name="quote" className="h-10 w-10 text-[var(--color-turq)]" fill="currentColor" strokeWidth={0} />
            <blockquote className="mt-4 font-[family-name:var(--font-display)] text-[28px] leading-[1.25] sm:text-4xl lg:text-[42px]">
              We built this firm so that no client ever has to feel lost in their own finances.
            </blockquote>
            <figcaption className="mt-6">
              <span className="block font-semibold">CA M. Aggarwal, FCA</span>
              <span className="block text-[15px] text-[var(--color-ink-soft)]">Founder &amp; Managing Partner</span>
            </figcaption>
            <TextLink to="/about" className="mt-6">Meet the team</TextLink>
          </figure>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section>
        <Container className="pt-16 sm:pt-20 lg:pt-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading title="What clients say" />
            <p className="flex items-center gap-2 text-[15px] text-[var(--color-ink-soft)]">
              <span className="flex text-[var(--color-cobalt)]" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon key={i} name="star" className="h-4.5 w-4.5" fill="currentColor" strokeWidth={1} />
                ))}
              </span>
              <span><strong className="text-[var(--color-ink)]">4.9</strong> average client rating</span>
            </p>
          </div>
        </Container>
        <div className="scroll-x mt-8 flex snap-x snap-mandatory scroll-px-5 gap-8 overflow-x-auto px-5 pb-2 sm:px-8 lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-2 lg:gap-x-16 lg:gap-y-14 lg:overflow-visible">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex w-[82%] max-w-[360px] shrink-0 snap-start flex-col lg:w-auto lg:max-w-none"
            >
              <VineRule className="opacity-80" />
              <blockquote className="mt-5 flex-1 font-[family-name:var(--font-display)] text-[21px] leading-[1.4] lg:text-2xl">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-cobalt)] font-[family-name:var(--font-display)] text-white" aria-hidden="true">
                  {t.name.split(' ').map((w) => w[0]).join('')}
                </span>
                <span>
                  <span className="block font-semibold leading-tight">{t.name}</span>
                  <span className="block text-sm text-[var(--color-ink-soft)]">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CREDENTIALS */}
      <section>
        <Container className="grid gap-8 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
          <SectionHeading title="Qualified, registered, reviewed" sub="The checks that matter when you hand someone your financial records." />
          <Credentials />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
