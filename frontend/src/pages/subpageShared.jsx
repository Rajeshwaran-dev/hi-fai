
import {
  ArrowRight,
  Binoculars,
  Check,
  ClipboardCheck,
  Compass,
  PackageCheck,
  PenTool,
  Presentation,
  TrendingUp,
  Trophy,
} from "lucide-react";

/** Fixed 4-pillar titles and icons for inner marketing pages (Explore → Excel). */
const FOUR_E_META = [
  { title: "Explore", Icon: Compass },
  { title: "Expand", Icon: TrendingUp },
  { title: "Evaluate", Icon: ClipboardCheck },
  { title: "Excel", Icon: Trophy },
];

/** Icons for Discover → Design → Develop and Validate → Demonstrate (university / college flows). */
export const ORBIT_ICONS_DISCOVER_CYCLE = [
  Binoculars,
  PenTool,
  PackageCheck,
  Presentation,
];
const ORBIT_THEMES = [
  { base: "#73A5CA", light: "#E8F3FC", deep: "#1E3A5F" },
  { base: "#6E1A37", light: "#F9EEF3", deep: "#3F1224" },
  { base: "#F08D39", light: "#FFF4E9", deep: "#5A3416" },
  { base: "#519A66", light: "#EBF8EF", deep: "#1F4A2E" },
];
const ORBIT_R_PCT = 36;
const ORBIT_CARD_WIDTH_PCT = 40;
/** Wider than tall so copy fits without the orbit feeling cramped. */
const ORBIT_CARD_ASPECT = "1.45 / 1";
const ORBIT_RING_SCALE = 3.2;

/** Center hub for orbit layouts (mirrors the School Students play control footprint). */
export function OrbitCenterPageTitle({ title, subtitle, onClick, className = "" }) {
  const baseClass =
    "flex min-h-[5.25rem] min-w-[5.25rem] max-w-[9.5rem] flex-col items-center justify-center rounded-full border-[2.5px] border-sky-300/95 bg-white px-3 py-2 text-center shadow-[0_16px_40px_rgba(15,23,42,0.16)] ring-1 ring-blue-500/[0.08] sm:min-h-[8.5rem] sm:min-w-[8.5rem] sm:max-w-[10rem] sm:px-3.5";
  const label = subtitle ? `${title} ${subtitle}` : title;
  const inner = (
    <>
      <span className="font-geom-heading text-[18px] font-semibold leading-snug tracking-tight text-blue-950 sm:text-xs md:text-[20px]">
        {title}
      </span>
      {subtitle ? (
        <span className="font-geom-heading mt-0.5 text-[14px] font-semibold leading-snug tracking-tight text-blue-900/90 sm:text-[12px] md:text-[16px]">
          {subtitle}
        </span>
      ) : null}
    </>
  );
  if (onClick) {
    return (
      <button
        type="button"
        className={`${baseClass} cursor-pointer transition hover:border-sky-400 hover:shadow-[0_18px_44px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 ${className}`}
        onClick={onClick}
        aria-label={`${label}. Open details.`}
      >
        {inner}
      </button>
    );
  }
  return (
    <div
      className={`${baseClass} ${className}`}
      role="status"
      aria-label={label}
    >
      {inner}
    </div>
  );
}

export function SectionLabel({ children }) {
  return (
    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">
      {children}
    </p>
  );
}

export function SectionHeading({ children, as: Tag = "h2", className = "" }) {
  return (
    <Tag
      className={`text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Lead({ children, className = "" }) {
  return (
    <p
      className={`mt-3 max-w-3xl text-base leading-relaxed text-slate-600 ${className}`}
    >
      {children}
    </p>
  );
}

export function Card({ icon, title, children, className = "", layout = "row" }) {
  const isOrbit = layout === "stacked";
  const base =
    "group rounded-2xl border border-slate-200/90 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/80 hover:bg-gradient-to-br hover:from-white hover:via-blue-50/35 hover:to-cyan-50/40 hover:shadow-[0_26px_78px_-22px_rgba(37,99,235,0.55)] hover:ring-1 hover:ring-blue-500/20";
  return (
    <article
      className={`${base} ${
        isOrbit
          ? "flex h-full w-full flex-col items-center justify-start p-7 text-center md:p-8"
          : "flex flex-row items-start gap-4 p-6 md:gap-5 md:p-7"
      } ${className}`}
    >
      {icon ? (
        <span
          className={`inline-flex shrink-0 items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 text-lg ring-1 ring-blue-100/80 transition-all duration-300 group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white group-hover:ring-blue-500/40 group-hover:shadow-[0_18px_46px_-14px_rgba(37,99,235,0.7)] ${
            isOrbit ? "h-14 w-14 rounded-2xl" : "h-11 w-11 rounded-xl"
          }`}
        >
          {icon}
        </span>
      ) : null}
      <div className={`${isOrbit ? "mt-4 w-full max-w-[20rem]" : "min-w-0 flex-1"}`}>
        <h3 className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-900">
          {title}
        </h3>
        <div className="mt-2 text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-700">
          {children}
        </div>
      </div>
    </article>
  );
}

export function CheckList({ items }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((text) => (
        <li
          key={text}
          className="flex gap-3 text-sm leading-relaxed text-slate-600"
        >
          <span
            className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-[10px] font-bold text-white"
            aria-hidden
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

/** Inner pages: four pillars + shared CTA band. `copy` is four body strings in order. Optional `pillarTitles` overrides default Explore/Expand/Evaluate/Excel. Optional `betweenCardsAndCta` renders between the grid and CTA. */
export function FourCardFramework({
  copy,
  ctaTitle,
  ctaSubtitle,
  ctaFooterNote,
  children,
  pillarTitles,
  pillarIcons,
  betweenCardsAndCta,
  cardsCenterOverlay,
  belowCardsContent,
  layoutMode = "default",
  ctaBelowCards = false,
}) {
  const bodies = copy;
  const orbitMode = layoutMode === "orbit";
  return (
    <>
      <div className="mx-auto max-w-7xl px-8">
        <div className="relative">
          {!orbitMode ? (
            <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 md:gap-5">
              {FOUR_E_META.map(({ title: defaultTitle, Icon }, i) => {
                const title = pillarTitles?.[i] ?? defaultTitle;
                const PillarIcon = pillarIcons?.[i] ?? Icon;
                return (
                  <Card
                    key={`${i}-${title}`}
                    icon={
                      <PillarIcon
                        className="h-5 w-5 text-blue-600 transition-colors duration-300 group-hover:text-white"
                        strokeWidth={2.2}
                        aria-hidden
                      />
                    }
                    title={title}
                  >
                    {bodies[i]}
                  </Card>
                );
              })}
            </div>
          ) : (
            <>
              {/* Mobile: keep readable card stack with consistent theme */}
              <div className="mx-auto grid max-w-7xl gap-4 md:hidden">
                {FOUR_E_META.map(({ title: defaultTitle, Icon }, i) => {
                  const title = pillarTitles?.[i] ?? defaultTitle;
                  const PillarIcon = pillarIcons?.[i] ?? Icon;
                  const theme = ORBIT_THEMES[i];
                  return (
                    <article
                      key={`${i}-${title}`}
                      className="rounded-3xl border p-5 shadow-sm"
                      style={{
                        borderColor: theme.base,
                        background: `linear-gradient(160deg, #ffffff 0%, ${theme.light} 100%)`,
                        boxShadow: `0 10px 28px color-mix(in srgb, ${theme.base} 20%, transparent)`,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                          style={{
                            background: `linear-gradient(135deg, ${theme.base}, color-mix(in srgb, ${theme.base} 74%, #ffffff))`,
                          }}
                        >
                          <PillarIcon className="h-5 w-5 text-white" strokeWidth={2.2} aria-hidden />
                        </span>
                        <div>
                          <h3 className="text-lg font-bold" style={{ color: theme.deep }}>{title}</h3>
                          <p className="mt-2 text-sm leading-relaxed" style={{ color: "color-mix(in srgb, #334155 55%, #0f172a)" }}>
                            {bodies[i]}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Desktop: SchoolStudents-like static rectangular orbit layout */}
              <div
                className="mx-auto hidden w-full max-w-[760px] select-none py-12 md:block"
                style={{ position: "relative", aspectRatio: "1 / 1", marginTop: "30px" }}
              >
                <div
                  className="orbit-progress-shell"
                  style={{
                    width: `${ORBIT_R_PCT * ORBIT_RING_SCALE}%`,
                    aspectRatio: "1 / 1",
                  }}
                  aria-hidden
                >
                  <svg
                    viewBox="0 0 120 120"
                    className="orbit-progress-svg"
                    focusable="false"
                  >
                    <circle
                      className="orbit-progress-track"
                      cx="60"
                      cy="60"
                      r="48"
                    />
                    <circle
                      className="orbit-progress-ring"
                      cx="60"
                      cy="60"
                      r="48"
                    />
                  </svg>
                </div>

                {/* Arrow that travels along the orbit track */}
                <div
                  className="orbit-arrow-rotor"
                  style={{
                    width: `${ORBIT_R_PCT * ORBIT_RING_SCALE}%`,
                    aspectRatio: "1 / 1",
                  }}
                  aria-hidden
                >
                  <div className="orbit-arrow">
                    <span className="orbit-arrow-icon-shell">
                      <ArrowRight className="orbit-arrow-icon" strokeWidth={2.9} />
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                  }}
                >
                  {FOUR_E_META.map(({ title: defaultTitle, Icon }, i) => {
                    const title = pillarTitles?.[i] ?? defaultTitle;
                    const PillarIcon = pillarIcons?.[i] ?? Icon;
                    const theme = ORBIT_THEMES[i];
                    const angleRad = (i * 90 - 90) * (Math.PI / 180);
                    const cx = 50 + ORBIT_R_PCT * Math.cos(angleRad);
                    const cy = 50 + ORBIT_R_PCT * Math.sin(angleRad);
                    return (
                      <div
                        key={`${i}-${title}`}
                        style={{
                          position: "absolute",
                          width: `${ORBIT_CARD_WIDTH_PCT}%`,
                          aspectRatio: ORBIT_CARD_ASPECT,
                          left: `${cx}%`,
                          top: `${cy}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <article
                          style={{
                            width: "100%",
                            // height: "100%",
                            borderRadius: 24,
                            overflow: "hidden",
                            background: `linear-gradient(155deg, ${theme.light} 0%, #ffffff 38%, ${theme.light} 100%)`,
                            border: `2.5px solid ${theme.base}`,
                            boxShadow: `0 10px 36px color-mix(in srgb, ${theme.base} 35%, transparent), 0 2px 10px rgba(0,0,0,0.08)`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "4% 3%",
                            textAlign: "center",
                          }}
                        >
                          <span
                            className="inline-flex h-14 w-14 items-center justify-center rounded-full"
                            style={{
                              background: `linear-gradient(135deg, ${theme.base}, color-mix(in srgb, ${theme.base} 74%, #ffffff))`,
                              flexShrink: 0,
                            }}
                          >
                            <PillarIcon className="h-6 w-6 text-white" strokeWidth={2.2} aria-hidden />
                          </span>
                          <h3
                            className="mt-4 font-bold leading-tight"
                            style={{ color: theme.deep, fontSize: "20px" }}
                          >
                            {title}
                          </h3>
                          <p
                            className="mt-2 leading-relaxed"
                            style={{
                              color: "color-mix(in srgb, #334155 55%, #0f172a)",
                              fontSize: "16px",
                              lineHeight: 1.36,
                            }}
                          >
                            {bodies[i]}
                          </p>
                        </article>
                      </div>
                    );
                  })}
                </div>
                {cardsCenterOverlay ? (
                  <div className="pointer-events-none absolute inset-0 z-[10] hidden items-center justify-center md:flex">
                    <div className="pointer-events-auto">{cardsCenterOverlay}</div>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
        {belowCardsContent ? (
          <div className="mt-6 md:mt-8">{belowCardsContent}</div>
        ) : null}
        {ctaBelowCards ? (
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-16 sm:flex-row sm:gap-4">
            {children}
          </div>
        ) : null}
        {betweenCardsAndCta ? (
          <div className="mt-10 md:mt-12">{betweenCardsAndCta}</div>
        ) : null}
        {!ctaBelowCards ? (
          <CtaBand
            title={ctaTitle}
            subtitle={ctaSubtitle}
            footerNote={ctaFooterNote}
          >
            {children}
          </CtaBand>
        ) : null}
      </div>
    </>
  );
}

export function CtaBand({ title, subtitle, footerNote, children, className = "mt-12" }) {
  return (
    <div
      className={`relative ${className} overflow-hidden rounded-[1.35rem] border border-blue-200/60 bg-gradient-to-br from-slate-900 via-[#0f2744] to-[#0a1734] p-8 text-center shadow-[0_20px_50px_rgba(15,23,42,0.25)] md:p-10`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"
      />
      <h3 className="relative text-xl font-bold text-white md:text-2xl">
        {title}
      </h3>
      {subtitle ? (
        <p className="relative mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
          {subtitle}
        </p>
      ) : null}
      <div className="relative mt-5 flex flex-col items-center justify-center gap-3 sm:mt-6 sm:flex-row sm:gap-4">
        {children}
      </div>
      {footerNote ? (
        <p className="relative mt-4 text-xs font-medium text-white/50 md:text-sm">
          {footerNote}
        </p>
      ) : null}
    </div>
  );
}

export function Tag({ children }) {
  return (
    <span className="inline-flex rounded-full border border-blue-200 bg-blue-50/80 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
      {children}
    </span>
  );
}
