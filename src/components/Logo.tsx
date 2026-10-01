import { useSettings } from "../hooks/useStore";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  light?: boolean;
}

export default function Logo({ size = "md", light = false }: LogoProps) {
  const [settings] = useSettings();
  const circleSize = size === "sm" ? 36 : size === "lg" ? 52 : 44;

  if (settings.logoImage) {
    return (
      <div className="flex items-center gap-3">
        <img
          src={settings.logoImage}
          alt={settings.schoolName}
          style={{ height: circleSize, width: "auto", maxWidth: circleSize * 3, objectFit: "contain" }}
        />
        <div className="leading-none">
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: size === "sm" ? 13 : size === "lg" ? 17 : 15,
              letterSpacing: "0.01em",
              fontWeight: 600,
              color: light ? "white" : "var(--site-navy)",
            }}
          >
            {settings.schoolName.split(" ").slice(0, 1).join("")}
          </div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: size === "sm" ? 10 : size === "lg" ? 13 : 11,
              letterSpacing: "0.18em",
              fontWeight: 600,
              color: "var(--site-gold)",
            }}
          >
            {settings.schoolName.split(" ").slice(1).join(" ").toUpperCase() || "HORIZONTE"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div
        className="rounded-full flex items-center justify-center flex-shrink-0"
        style={{ width: circleSize, height: circleSize, background: "var(--site-navy)" }}
      >
        <svg width={circleSize * 0.55} height={circleSize * 0.55} viewBox="0 0 24 24" fill="none">
          <path d="M12 3L2 8l10 5 10-5-10-5z" fill="var(--site-gold)" stroke="var(--site-gold)" strokeWidth="0.5" />
          <path d="M2 8v6M22 8v6" stroke="var(--site-gold)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6 10.5v4.5a6 6 0 0 0 12 0v-4.5" stroke="var(--site-gold)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="leading-none">
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: size === "sm" ? 13 : size === "lg" ? 17 : 15,
            letterSpacing: "0.01em",
            fontWeight: 600,
            color: light ? "white" : "var(--site-navy)",
          }}
        >
          Instituto
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: size === "sm" ? 10 : size === "lg" ? 13 : 11,
            letterSpacing: "0.18em",
            fontWeight: 600,
            color: "var(--site-gold)",
          }}
        >
          HORIZONTE
        </div>
      </div>
    </div>
  );
}
