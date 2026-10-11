import { firm, milestones, stats, team } from '../data/content';
import { Plate } from '../components/Motifs';
import { Container, Rise } from '../components/ui';
import { CtaBand, Credentials, PageHead, SectionHeading, Stations } from '../components/Sections';
import founderPortrait from '../assets/images/founder-portrait.jpg';
import partnerPhoto from '../assets/images/founder-office.jpg';
import teamPriya from '../assets/images/team-priya.jpg';
import teamKaran from '../assets/images/team-karan.jpg';

const photos = {
  founder: { src: founderPortrait, pos: 'center 22%' },
  partner: { src: partnerPhoto, pos: 'center 18%' },
  priya: { src: teamPriya, pos: 'center 30%' },
  karan: { src: teamKaran, pos: 'center 25%' },
};

export default function About() {
  return (
    <>
      <PageHead
        title="About the firm"
        sub={`A founder-led practice on Residency Road, Jaipur, looking after families and businesses since ${firm.since}.`}
      />

      <Container className="grid items-start gap-10 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
        <Rise className="mx-auto w-[240px] sm:w-[300px] lg:sticky lg:top-28 lg:w-full lg:max-w-[380px]">
          <Plate src={founderPortrait} alt="CA M. Aggarwal, Founder & Managing Partner" position="center 22%" size="lg" />
          <p className="mt-5 text-center">
            <span className="block font-[family-name:var(--font-display)] text-2xl">CA M. Aggarwal</span>
            <span className="block text-[15px] text-[var(--color-ink-soft)]">FCA · Founder &amp; Managing Partner</span>
          </p>
        </Rise>

        <div>
          <h2 className="text-[32px] sm:text-[40px]">Advice that feels like a conversation, not a lecture.</h2>
          <div className="mt-6 grid gap-5 text-[17px] leading-relaxed text-[var(--color-ink-soft)]">
            <p>
              M. Aggarwal &amp; Co. began in {firm.since} with a simple idea: people deserve to understand their own
              finances. Too many of our first clients had been handed returns they could not read and notices nobody
              explained.
            </p>
            <p>
              Today a team of chartered accountants and tax specialists works with salaried professionals, shop owners,
              family businesses and young companies on tax, GST, audit and long-term planning. Every client has one
              named person to call, and nothing is filed without your sign-off.
            </p>
            <p>
              We still work the way we did with our very first client: patiently, in Hindi or English, and always
              before the deadline rather than after it.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-y-6 border-t border-[var(--color-line)] pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="tnum font-[family-name:var(--font-display)] text-[34px] leading-none text-[var(--color-cobalt)]">{s.value}</dd>
                <dd className="mt-1.5 text-[15px] text-[var(--color-ink-soft)]">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <section className="bg-[var(--color-wash)]">
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading title="Our journey" />
          <div className="mt-10 lg:mt-14">
            <Stations
              numbered={false}
              steps={milestones.map((m) => ({ label: '', kicker: m.year, title: m.text, desc: '' }))}
            />
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading title="The people you will speak to" sub="Small enough that you always talk to a qualified person, large enough to cover every deadline." />
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-8">
            {team.map((p, i) => (
              <Rise as="li" key={p.id} delay={i * 70} className="text-center sm:text-left">
                <Plate src={photos[p.img].src} alt={p.name} position={photos[p.img].pos} className="mx-auto w-full max-w-[200px] sm:mx-0" />
                <h3 className="mt-4 font-[family-name:var(--font-sans)] text-[17px] font-semibold leading-tight">{p.name}</h3>
                <p className="mt-1 text-[15px] leading-snug text-[var(--color-cobalt)]">{p.role}</p>
                <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{p.creds}</p>
                <p className="mt-2 hidden text-sm leading-snug text-[var(--color-ink-soft)] sm:block">{p.focus}</p>
              </Rise>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-[var(--color-line)]">
        <Container className="grid gap-8 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-24">
          <SectionHeading title="Credentials" sub="Registered with the Institute of Chartered Accountants of India and independently peer reviewed." />
          <Credentials />
        </Container>
      </section>

      <CtaBand title="Let’s talk about your situation" />
    </>
  );
}
