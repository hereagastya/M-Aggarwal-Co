const shapeClass = {
  rect: '',
  rounded: 'rounded-2xl',
  circle: 'rounded-full',
};

export default function ImagePlaceholder({
  shape = 'rect',
  label,
  src,
  alt = '',
  objectPosition = 'center',
  className = '',
  style = {},
}) {
  const shapeCls = shapeClass[shape] || '';

  if (src) {
    return (
      <div className={`relative overflow-hidden ${shapeCls} ${className}`} style={style}>
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          style={{ objectPosition }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${shapeCls} ${className}`}
      style={{
        background: 'linear-gradient(135deg, oklch(0.4 0.05 195), oklch(0.3 0.07 175) 55%, oklch(0.55 0.08 155))',
        ...style,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 45%), radial-gradient(circle at 80% 75%, rgba(255,255,255,0.2), transparent 50%)',
        }}
      />
      {shape !== 'circle' && label && (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <span className="text-[11px] font-medium tracking-wide text-white/60 uppercase">{label}</span>
        </div>
      )}
    </div>
  );
}
