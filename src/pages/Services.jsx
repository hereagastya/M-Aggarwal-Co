import { useBooking } from '../context/BookingContext';
import { services, whatsappLink } from '../data/content';
import Icon from '../components/Icon';
import { Container, Button } from '../components/ui';
import { CtaBand, Faq, PageHead, SectionHeading } from '../components/Sections';

export default function Services() {
  const { openBooking } = useBooking();

  return (
    <>
      <PageHead title="Services" sub="Everything your finances need, under one roof. Pick a service to see what is included.">
        <nav aria-label="Jump to a service" className="scroll-x -mx-5 mt-7 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {services.map((s) => (
            <a
              key={s.code}
              href={`#${s.code}`}
              className="flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-[var(--color-glaze)] px-4 text-[15px] font-semibold text-[var(--color-ink)] ring-1 ring-inset ring-[var(--color-line)] hover:text-[var(--color-cobalt)] hover:ring-[var(--color-cobalt)]"
            >
              <Icon name={s.icon} className="h-4.5 w-4.5 text-[var(--color-cobalt)]" />
              {s.title.split(' ')[0] === 'Income' ? 'Income Tax' : s.title.split(' ')[0]}
            </a>
          ))}
        </nav>
      </PageHead>

      <Container className="py-6 lg:py-12">
        {services.map((s, i) => (
          <article
            key={s.code}
            id={s.code}
            className="grid gap-6 border-b border-[var(--color-line)] py-12 last:border-b-0 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-16"
          >
            <div>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-turq)] text-[var(--color-ink)]">
                <Icon name={s.icon} className="h-6.5 w-6.5" />
              </span>
              <h2 className="mt-5 text-[30px] sm:text-4xl">{s.title}</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-[var(--color-ink-soft)]">{s.desc}</p>
              <p className="mt-4 text-[15px]">
                <span className="font-semibold">Best for: </span>
                <span className="text-[var(--color-ink-soft)]">{s.forWhom}</span>
              </p>
            </div>
            <div className="lg:pt-[76px]">
              <ul className="grid gap-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[16px] leading-snug">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-wash)] text-[var(--color-cobalt)]">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-7 grid gap-3 sm:flex">
                <Button onClick={() => openBooking(i)}>
                  Book a consultation
                  <Icon name="arrow" className="h-4.5 w-4.5" />
                </Button>
                <Button
                  variant="whatsapp"
                  href={whatsappLink(`Hello, I have a question about ${s.title}.`)}
                  target="_blank"
                  rel="noopener"
                >
                  <Icon name="whatsapp" className="h-5 w-5" /> Ask on WhatsApp
                </Button>
              </div>
            </div>
          </article>
        ))}
      </Container>

      <section className="bg-[var(--color-wash)]">
        <Container className="grid gap-8 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
          <SectionHeading title="Common questions" sub="Still unsure? Ask us anything on WhatsApp. We reply within the working day." />
          <Faq />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
