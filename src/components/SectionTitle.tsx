interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionTitle({ eyebrow, title, description, center = true, light = false }: SectionTitleProps) {
  return (
    <div className={center ? "text-center" : ""}>
      <div
        className="text-[11px] font-semibold mb-3"
        style={{ color: "var(--site-gold)", letterSpacing: "0.14em", fontFamily: "var(--font-sans)" }}
      >
        {eyebrow}
      </div>
      <h2
        className="text-3xl md:text-4xl font-semibold leading-tight"
        style={{
          fontFamily: "var(--font-serif)",
          color: light ? "white" : "var(--site-navy)",
        }}
      >
        {title}
      </h2>
      <div
        className={`mt-3 h-[2px] w-12 bg-[var(--site-gold)] ${center ? "mx-auto" : ""}`}
        style={{ borderRadius: 1 }}
      />
      {description && (
        <p
          className="mt-5 text-[15px] leading-relaxed max-w-2xl"
          style={{
            color: light ? "rgba(255,255,255,0.75)" : "#64748B",
            margin: center ? "20px auto 0" : "20px 0 0",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
