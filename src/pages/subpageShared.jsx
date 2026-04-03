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
    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">{children}</p>
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
    <p className={`mt-3 max-w-3xl text-base leading-relaxed text-slate-600 md:text-[17px] ${className}`}>
      {children}
    </p>
  );
}

export function Card({ icon, title, children }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200/90 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition hover:border-blue-200/80 hover:shadow-md md:p-7">
      {icon ? (
        <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-lg ring-1 ring-blue-100/80">
          {icon}
        </span>
      ) : null}
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-slate-600">{children}</div>
    </article>
  );
}

export function CheckList({ items }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((text) => (
        <li key={text} className="flex gap-3 text-sm leading-relaxed text-slate-600">
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
export function FourCardFramework({ copy, ctaTitle, children, pillarTitles, betweenCardsAndCta }) {
  const bodies = copy;

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {FOUR_E_META.map(({ title: defaultTitle, Icon }, i) => {
          const title = pillarTitles?.[i] ?? defaultTitle;
          return (
            <Card
              key={`${i}-${title}`}
              icon={<Icon className="h-5 w-5 text-blue-600" strokeWidth={2.2} aria-hidden />}
              title={title}
            >
              {bodies[i]}
            </Card>
          );
        })}
      </div>
      {betweenCardsAndCta ? <div className="mt-10 md:mt-12">{betweenCardsAndCta}</div> : null}
      <CtaBand title={ctaTitle}>{children}</CtaBand>
    </>
  );
}

export function CtaBand({ title, children }) {
  return (
    <div className="relative mt-12 overflow-hidden rounded-[1.35rem] border border-blue-200/60 bg-gradient-to-br from-slate-900 via-[#0f2744] to-[#0a1734] p-8 text-center shadow-[0_20px_50px_rgba(15,23,42,0.25)] md:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"
      />
      <h3 className="relative text-xl font-bold text-white md:text-2xl">{title}</h3>
      <div className="relative mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">{children}</div>
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
