import { Award, Check, ClipboardCheck, Compass, Maximize2 } from "lucide-react";

/** Fixed 4-pillar titles and icons for inner marketing pages (Explore → Excel). */
const FOUR_E_META = [
  { title: "Explore", Icon: Compass },
  { title: "Expand", Icon: Maximize2 },
  { title: "Evaluate", Icon: ClipboardCheck },
  { title: "Excel", Icon: Award },
];

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
  // Anti-clockwise order around center: Explore (top-left), Expand (bottom-left), Evaluate (bottom-right), Excel (top-right)
  const orbitAngles = ["135deg", "225deg", "315deg", "45deg"];

  return (
    <>
      <div className="mx-auto max-w-7xl">
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
              {/* Mobile: keep readable grid */} 
              <div className="mx-auto grid max-w-7xl gap-4 md:hidden">
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

              {/* Desktop: true orbit */} 
              <div className="orbit-mode mx-auto hidden max-w-6xl md:block">
                <div className="orbit-rotor" aria-hidden={false}>
                  {FOUR_E_META.map(({ title: defaultTitle, Icon }, i) => {
                    const title = pillarTitles?.[i] ?? defaultTitle;
                    const PillarIcon = pillarIcons?.[i] ?? Icon;
                    return (
                      <div
                        key={`${i}-${title}`}
                        className="orbit-card"
                        style={{ "--orbit-angle": orbitAngles[i] }}
                      >
                        <Card
                          layout="stacked"
                          className="orbit-card__inner rounded-[999px]"
                          icon={
                            <PillarIcon
                              className="h-6 w-6 text-blue-600 transition-colors duration-300 group-hover:text-white"
                              strokeWidth={2.2}
                              aria-hidden
                            />
                          }
                          title={title}
                        >
                          {bodies[i]}
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
          {cardsCenterOverlay ? (
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block">
              <div className="pointer-events-auto">{cardsCenterOverlay}</div>
            </div>
          ) : null}
        </div>
        {belowCardsContent ? (
          <div className="mt-6 md:mt-8">{belowCardsContent}</div>
        ) : null}
        {ctaBelowCards ? (
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row sm:gap-4">
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
