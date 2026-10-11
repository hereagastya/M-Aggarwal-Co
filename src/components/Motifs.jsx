import { useId } from 'react';

// Hand-painted blue-pottery motifs. Every petal, leaf and dot is drawn with
// its own size, curve and brush weight (seeded, so it is stable between
// renders), then a faint displacement gives the line a painter's wobble.

const C = 'var(--color-cobalt)';
const T = 'var(--color-turq)';
const P = 'var(--color-turq-pale)';
const W = 'var(--color-glaze)';

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const jit = (r, amt) => (r() * 2 - 1) * amt;
const f = (n) => n.toFixed(2);

// A brush petal from the centre (cx, cy) outwards along `angle`.
function petal(cx, cy, angle, len, width, bend, r) {
  const a = (angle * Math.PI) / 180;
  const ux = Math.sin(a), uy = -Math.cos(a); // outward
  const px = Math.cos(a), py = Math.sin(a); // perpendicular
  const pt = (along, side) => [cx + ux * along + px * side, cy + uy * along + py * side];
  const b = bend * len;
  const [x1, y1] = pt(len * 0.28, -width * (1 + jit(r, 0.12)) + b * 0.3);
  const [x2, y2] = pt(len * 0.72, -width * (1.08 + jit(r, 0.12)) + b);
  const [tx, ty] = pt(len, b * 1.2);
  const [x3, y3] = pt(len * 0.72, width * (1.08 + jit(r, 0.12)) + b);
  const [x4, y4] = pt(len * 0.28, width * (1 + jit(r, 0.12)) + b * 0.3);
  return `M${f(cx)} ${f(cy)} C${f(x1)} ${f(y1)} ${f(x2)} ${f(y2)} ${f(tx)} ${f(ty)} C${f(x3)} ${f(y3)} ${f(x4)} ${f(y4)} ${f(cx)} ${f(cy)}Z`;
}

function Brush({ id, scale = 1.6 }) {
  return (
    <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="7" />
      <feDisplacementMap in="SourceGraphic" scale={scale} />
    </filter>
  );
}

const rosetteCache = new Map();
function rosetteShapes(seed) {
  if (rosetteCache.has(seed)) return rosetteCache.get(seed);
  const r = rng(seed);
  const outer = Array.from({ length: 8 }, (_, i) => {
    const angle = i * 45 + jit(r, 2.2);
    const len = 88 + jit(r, 4);
    return {
      body: petal(120, 120, angle, len, 21 + jit(r, 2), jit(r, 0.025), r),
      core: petal(120, 120, angle + jit(r, 1), len * (0.74 + jit(r, 0.03)), 6.5 + jit(r, 1), jit(r, 0.03), r),
      sw: 1.7 + r() * 1.1,
      tip: { a: angle, d: len - 10 + jit(r, 1.5), rad: 2 + r() * 0.8 },
    };
  });
  const inner = Array.from({ length: 8 }, (_, i) =>
    ({ d: petal(120, 120, i * 45 + 22.5 + jit(r, 2.5), 38 + jit(r, 3), 9 + jit(r, 1.2), jit(r, 0.04), r), sw: 1.3 + r() * 0.8 }),
  );
  const dots = Array.from({ length: 16 }, (_, i) => ({ a: i * 22.5 + 11.25 + jit(r, 2), d: 58 + jit(r, 2.5), rad: 1.6 + r() * 1 }));
  const leaves = Array.from({ length: 28 }, (_, i) => {
    const a = (i * 360) / 28 + jit(r, 1.5);
    return { d: petal(120, 120, a, 11 + jit(r, 2.2), 3 + jit(r, 0.7), jit(r, 0.1), r), a };
  });
  const out = { outer, inner, dots, leaves };
  rosetteCache.set(seed, out);
  return out;
}

const polar = (a, d) => {
  const rad = (a * Math.PI) / 180;
  return [120 + Math.sin(rad) * d, 120 - Math.cos(rad) * d];
};

export function Rosette({ className = '', style, rim = true, seed = 11, title }) {
  const id = useId().replace(/:/g, '');
  const s = rosetteShapes(seed);
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <Brush id={`b${id}`} />
      </defs>
      <g filter={`url(#b${id})`}>
        {rim && (
          <>
            <circle cx="120" cy="120" r="118" fill={W} />
            <circle cx="120" cy="120" r="114.5" fill="none" stroke={C} strokeWidth="2.6" />
            <circle cx="120" cy="120" r="104" fill="none" stroke={T} strokeWidth="9" />
            <circle cx="120" cy="120" r="97.5" fill="none" stroke={C} strokeWidth="1.4" />
            {s.leaves.map((l, i) => (
              <path key={`rl${i}`} d={l.d} fill={C} transform={`translate(${f(polar(l.a, 104)[0] - 120)} ${f(polar(l.a, 104)[1] - 120)})`} />
            ))}
          </>
        )}
        {s.outer.map((p, i) => (
          <g key={`p${i}`}>
            <path d={p.body} fill={P} stroke={C} strokeWidth={f(p.sw)} strokeLinejoin="round" />
            <path d={p.core} fill={C} />
            <circle cx={f(polar(p.tip.a, p.tip.d)[0])} cy={f(polar(p.tip.a, p.tip.d)[1])} r={f(p.tip.rad)} fill={W} />
          </g>
        ))}
        {s.inner.map((p, i) => (
          <path key={`l${i}`} d={p.d} fill={W} stroke={C} strokeWidth={f(p.sw)} strokeLinejoin="round" />
        ))}
        {s.dots.map((d, i) => (
          <circle key={`d${i}`} cx={f(polar(d.a, d.d)[0])} cy={f(polar(d.a, d.d)[1])} r={f(d.rad)} fill={C} />
        ))}
        <circle cx="120" cy="120" r="17" fill={C} />
        <circle cx="120.6" cy="119.4" r="10" fill={T} />
        <circle cx="120.3" cy="120.2" r="4" fill={W} />
      </g>
    </svg>
  );
}

/** Small mark used as the logo: an eight-petal flower. */
export function Mark({ className = '' }) {
  const r = rng(5);
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill={C} />
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={petal(20, 20, i * 45 + jit(r, 3), 14 + jit(r, 0.8), 3 + jit(r, 0.3), jit(r, 0.04), r)} fill={i % 2 ? T : W} />
      ))}
      <circle cx="20" cy="20" r="3.4" fill={C} />
      <circle cx="20" cy="20" r="1.4" fill={W} />
    </svg>
  );
}

// One long painted vine, every swing and leaf slightly different.
const VINE_W = 1800;
const vine = (() => {
  const r = rng(23);
  let d = 'M0 8';
  const leaves = [];
  const dots = [];
  for (let x = 0, i = 0; x < VINE_W; x += 28, i++) {
    const amp = 6 + jit(r, 1.4);
    const up = i % 2 === 0;
    const y = up ? 8 - amp : 8 + amp;
    d += ` Q${f(x + 14 + jit(r, 2))} ${f(y)} ${x + 28} ${f(8 + jit(r, 0.6))}`;
    const lx = x + 14 + jit(r, 2);
    leaves.push(petal(lx, up ? 4.5 : 11.5, (up ? 300 : 120) + jit(r, 18), 5.5 + jit(r, 1.2), 1.9 + jit(r, 0.4), jit(r, 0.12), r));
    if (i % 2) dots.push({ x: x + 28, r: 1.2 + r() * 0.7 });
  }
  return { d, leaves, dots };
})();

/** The painted vine that runs around a pot's rim, used as a section rule. */
export function VineRule({ className = '', tone = 'cobalt' }) {
  const id = useId().replace(/:/g, '');
  const stroke = tone === 'light' ? 'var(--color-on-cobalt)' : C;
  const leaf = T;
  return (
    <svg
      className={`block h-4 w-full ${className}`}
      viewBox={`0 0 ${VINE_W} 16`}
      preserveAspectRatio="xMinYMid slice"
      aria-hidden="true"
    >
      <defs>
        <Brush id={`v${id}`} scale={1.1} />
      </defs>
      <g filter={`url(#v${id})`}>
        <path d={vine.d} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        {vine.leaves.map((l, i) => (
          <path key={i} d={l} fill={leaf} />
        ))}
        {vine.dots.map((d) => (
          <circle key={d.x} cx={d.x} cy="8" r={f(d.r)} fill={stroke} />
        ))}
      </g>
    </svg>
  );
}

/** A photo set into a round plate with a painted rim. */
export function Plate({ src, alt, className = '', position = 'center', size = 'md', loading = 'lazy' }) {
  const rim = size === 'sm' ? 'p-[3px]' : size === 'lg' ? 'p-2.5' : 'p-1.5';
  return (
    <div className={`relative aspect-square rounded-full bg-[var(--color-turq)] ${rim} ${className}`}>
      <div className="h-full w-full rounded-full bg-[var(--color-glaze)] p-[3px] ring-1 ring-[var(--color-cobalt)] ring-inset">
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          className="h-full w-full rounded-full object-cover"
          style={{ objectPosition: position }}
        />
      </div>
    </div>
  );
}
