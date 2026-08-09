import ImagePlaceholder from '../components/ImagePlaceholder';
import { milestones, team } from '../data/content';
import founderPortrait from '../assets/images/founder-portrait.jpg';
import founderOffice from '../assets/images/founder-office.jpg';
import teamPriya from '../assets/images/team-priya.jpg';
import teamKaran from '../assets/images/team-karan.jpg';

const credentials = ['ICAI Registered', 'ISO 9001 Practice', 'Peer Reviewed'];

const teamImages = {
  team1: founderOffice,
  team2: teamPriya,
  team3: teamKaran,
};

export default function About() {
  return (
    <div>
      <div className="relative h-85 w-full md:h-[420px]">
        <ImagePlaceholder
          shape="rect"
          src={founderPortrait}
          alt="M. Aggarwal, FCA — Founder & Managing Partner"
          objectPosition="center 15%"
          className="h-full w-full"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(15,28,28,0.1) 0%, rgba(12,24,24,0.8) 100%)' }}
        />
        <div className="absolute bottom-5.5 left-6 right-6 md:left-8 md:mx-auto md:max-w-6xl md:right-8">
          <div className="font-serif text-[25px] font-bold text-white md:text-5xl">M. Aggarwal, FCA</div>
          <div className="mt-1 text-[13px] text-white/75 md:text-lg">Founder &amp; Managing Partner</div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-6 md:px-8 md:py-14">
        <div className="md:grid md:grid-cols-[1.1fr_0.9fr] md:gap-14">
          <div>
            <div className="mb-6 text-sm leading-relaxed text-[var(--color-body)] md:text-base">
              Founded in 2011, M. Aggarwal &amp; Co. began with a simple idea: financial advice should feel like a
              conversation, not a lecture. Today we work with individuals and growing businesses on tax, compliance
              and long-term financial planning — with the same care as our very first client.
            </div>

            <div className="font-serif mb-3.5 text-[17px] font-bold text-[var(--color-ink)] md:text-2xl">Our journey</div>
            <div className="mb-7 flex flex-col">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className="mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full"
                      style={{ background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-mid))' }}
                    />
                    {i < milestones.length - 1 && (
                      <div className="w-0.5 flex-1" style={{ background: 'var(--color-cream-border)' }} />
                    )}
                  </div>
                  <div className="pb-5">
                    <div className="mb-0.5 text-[13px] font-bold text-[var(--color-primary)] md:text-sm">{m.year}</div>
                    <div className="text-[13px] leading-relaxed text-[var(--color-muted-6)] md:text-sm">{m.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-serif mb-3.5 text-[17px] font-bold text-[var(--color-ink)] md:text-2xl">The team</div>
            <div className="mb-7 flex gap-3.5 md:flex-col md:gap-5">
              {team.map((p) => (
                <div key={p.id} className="flex-1 text-center md:flex md:items-center md:gap-4 md:text-left">
                  <ImagePlaceholder
                    shape="circle"
                    src={teamImages[p.id]}
                    alt={p.name}
                    className="mx-auto mb-2 h-16 w-16 md:mx-0 md:mb-0 md:h-16 md:w-16"
                  />
                  <div>
                    <div className="text-[12.5px] font-bold text-[var(--color-ink)] md:text-sm">{p.name}</div>
                    <div className="mt-0.5 text-[11px] text-[var(--color-muted)] md:text-xs">{p.role}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2.5">
              {credentials.map((c) => (
                <div
                  key={c}
                  className="rounded-lg px-3 py-1.75 text-[11.5px] font-bold"
                  style={{ background: 'var(--color-badge)', color: 'var(--color-badge-text)' }}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
