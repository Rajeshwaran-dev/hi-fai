import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AppWindow,
  Award,
  Briefcase,
  ExternalLink,
  Landmark,
  Users,
} from "lucide-react";
import { useReducedMotion, useIsMobile } from "../hooks/useReducedMotion.js";

gsap.registerPlugin(ScrollTrigger);

const PARTNER_SITE_URL = "https://kanavoogle.com/";
const PARTNER_SITE_DISPLAY = "kanavoogle.com";

const kanavoogleLinkClass =
  "font-medium text-blue-700 no-underline rounded-md py-0.5 transition-colors hover:bg-blue-200 hover:text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const hifaiHighlightClass = "font-semibold text-blue-700";

/** Partnership column: year — linked title — issuing body / program (external sources). */
const PARTNERSHIP_RECOGNITION_AWARDS = [
  {
    year: "2025",
    title: "CONNECT EducAIT",
    href: "https://research.csiro.au/onalumni/connect-educait/",
    description:
      "CSIRO — Australia's national science agency — ON Prime innovation program.",
  },
  {
    year: "2022",
    title: "Brian Gibson Award for Most Innovative Presentation",
    href: "https://seaanz.org/seaanz-2022-symposium-awards/",
    description:
      "SEAANZ — Small Enterprise Academy of Australia and New Zealand.",
  },
  {
    year: "2021",
    title: "ACDICT Learning and Teaching Grant",
    href: "https://acdict.edu.au/alta-2020-small-projects-grants-recipients-announced/",
    description: "Australian Council of ICT Deans (ACDICT).",
  },
];

const STATIC_ASSET_BASE = import.meta.env.BASE_URL;
const FEMALE_AVATAR_URL = `${STATIC_ASSET_BASE}human.png`;
const MALE_AVATAR_URL = `${STATIC_ASSET_BASE}man.png`;
const GROUP_AVATAR_URL = `${STATIC_ASSET_BASE}group.png`;
const AMBASSADOR_IMAGE_URL = `${STATIC_ASSET_BASE}ambassador.png`;

function isTeamEntry(member) {
  const text = `${member?.name ?? ""} ${member?.role ?? ""}`.toLowerCase();
  return Boolean(member?.isGroup) || /(^|\W)team(\W|$)/i.test(text);
}

function getMemberAvatar(member) {
  if (member.gender === "group" || isTeamEntry(member)) return GROUP_AVATAR_URL;
  if (member.gender === "female") return FEMALE_AVATAR_URL;
  if (member.gender === "male") return MALE_AVATAR_URL;
  return /^ms\.|^mrs\./i.test(member.name.trim())
    ? FEMALE_AVATAR_URL
    : MALE_AVATAR_URL;
}

const PARTNERSHIP_TEAM_GROUPS = [
  {
    title: "HIfAi Team",
    subtitle: "Core team & delivery",
    icon: Landmark,
    index: "01",
    headerHref: "https://hifai.askeva.net/",
    theme: {
      bar: "from-blue-900 via-blue-700 to-blue-600",
      icon: "bg-blue-600/15 text-blue-800 ring-1 ring-inset ring-blue-600/20 shadow-sm",
      avatar:
        "border-blue-200/80 bg-gradient-to-br from-white via-blue-50/40 to-blue-100/30 text-blue-950 shadow-sm",
      cardHover:
        "hover:border-blue-200/90 hover:shadow-md hover:shadow-blue-900/[0.06]",
    },
    members: [
      {
        name: "Mr G. Saravana Sundar",
        role: "Public Relations Officer",
        initials: "GS",
        gender: "male",
        orgKind: "partner",
      },
      {
        name: "Mr Madhu Raju",
        role: "Director Digital ABCD",
        initials: "MR",
        gender: "male",
        orgKind: "partner",
      },
      {
        name: "Ms. S. Sayee Skantha Varshini ",
        role: "Consultant (Marketing & Sales)",
        initials: "MS",
        gender: "female",
        orgKind: "HIfAi",
      },
      {
        name: "Mrs. M. Sayee Baggialakshmi",
        role: "Finance Officer",
        initials: "MS",
        gender: "female",
        orgKind: "HIfAi",
      },
      {
        name: "Mrs. N. Mythili",
        role: "DGL based Expert in Learning Outcomes (Volunteer)",
        initials: "MS",
        gender: "female",
        orgKind: "HIfAi",
      },
    ],
  },
  {
    title: "Kanavoogle",
    subtitle: "Partner collaboration",
    icon: Briefcase,
    index: "02",
    headerHref: "https://kanavoogle.com/",
    theme: {
      bar: "from-indigo-900 via-indigo-700 to-violet-600",
      icon: "bg-indigo-600/15 text-indigo-900 ring-1 ring-inset ring-indigo-600/20 shadow-sm",
      avatar:
        "border-indigo-200/80 bg-gradient-to-br from-white via-indigo-50/35 to-violet-50/40 text-indigo-950 shadow-sm",
      cardHover:
        "hover:border-indigo-200/90 hover:shadow-md hover:shadow-indigo-900/[0.06]",
    },
    members: [
      {
        name: "Dr. N. Venkatachalam",
        role: "21st Century Skills Development Consultant",
        initials: "NV",
        gender: "male",
        orgKind: "partner",
      },
      {
        name: "Mr Ruturaj Suryawanshi",
        role: "Infrastructure Advisor",
        initials: "RS",
        gender: "male",
        orgKind: "partner",
      },
      {
        name: "Mr. Venkata Shashank Kesireddy",
        role: "Solutions Architect",
        initials: "VSK",
        gender: "male",
        orgKind: "partner",
      },
    ],
  },
  {
    title: "Netzy",
    subtitle: "Growth & support",
    icon: Users,
    index: "03",
    headerHref: "https://www.netzytechnosoft.com/",
    theme: {
      bar: "from-sky-800 via-cyan-700 to-teal-600",
      icon: "bg-cyan-600/18 text-cyan-900 ring-1 ring-inset ring-cyan-600/30 shadow-sm",
      avatar:
        "border-cyan-200/80 bg-gradient-to-br from-white via-cyan-50/35 to-teal-50/30 text-teal-950 shadow-sm",
      cardHover:
        "hover:border-cyan-200/90 hover:shadow-md hover:shadow-cyan-900/[0.06]",
    },
    members: [
      {
        name: "Lr Mohamed Safiudin & Team",
        role: "Executive Director-Business Development",
        initials: "NT",
        gender: "group",
        orgKind: "neutral",
        isGroup: true,
        profileHref: "https://www.linkedin.com/in/safibux/",
      },
    ],
  },
  {
    title: "A3i Systems",
    subtitle: "Platform enablement",
    icon: AppWindow,
    index: "04",
    headerHref: "https://www.a3isystems.com/",
    theme: {
      bar: "from-emerald-800 via-emerald-600 to-teal-500",
      icon: "bg-emerald-600/18 text-emerald-900 ring-1 ring-inset ring-emerald-600/30 shadow-sm",
      avatar:
        "border-emerald-200/80 bg-gradient-to-br from-white via-emerald-50/35 to-teal-50/30 text-emerald-950 shadow-sm",
      cardHover:
        "hover:border-emerald-200/90 hover:shadow-md hover:shadow-emerald-900/[0.06]",
    },
    members: [
      {
        name: "App Dev Partner ",
        role: "",
        initials: "A3",
        gender: "group",
        orgKind: "neutral",
        isGroup: true,
      },
    ],
  },
  {
    title: "Geniebox",
    subtitle: "Strategic collaboration",
    icon: Briefcase,
    index: "05",
    headerHref: "https://geniebox.io/",
    theme: {
      bar: "from-fuchsia-800 via-purple-700 to-violet-600",
      icon: "bg-fuchsia-600/15 text-fuchsia-900 ring-1 ring-inset ring-fuchsia-600/25 shadow-sm",
      avatar:
        "border-fuchsia-200/80 bg-gradient-to-br from-white via-fuchsia-50/35 to-violet-50/30 text-fuchsia-950 shadow-sm",
      cardHover:
        "hover:border-fuchsia-200/90 hover:shadow-md hover:shadow-fuchsia-900/[0.06]",
    },
    members: [
      {
        name: "Mrs. Lekashri",
        role: "Project Manager",
        initials: "GL",
        gender: "female",
        orgKind: "partner",
      },
    ],
  },
];

function KanavooglePartnershipSection({ reducedMotion, isMobile }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const mainRef = useRef(null);
  const awardsRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current?.children?.length) {
        gsap.from(headerRef.current.children, {
          y: isMobile ? 14 : 22,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }
      if (mainRef.current?.children?.length) {
        gsap.from(mainRef.current.children, {
          y: isMobile ? 18 : 26,
          opacity: 0,
          stagger: 0.1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }
      if (awardsRef.current?.children?.length) {
        gsap.from(awardsRef.current.children, {
          y: isMobile ? 16 : 20,
          opacity: 0,
          stagger: 0.09,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: {
            trigger: awardsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
      if (teamRef.current?.children?.length) {
        gsap.from(teamRef.current.children, {
          y: isMobile ? 18 : 26,
          opacity: 0,
          stagger: 0.11,
          duration: 0.62,
          ease: "power3.out",
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  const featuredGroupTitles = ["HIfAi Team", "Kanavoogle", "Netzy"];
  const featuredGroups = featuredGroupTitles
    .map((title) =>
      PARTNERSHIP_TEAM_GROUPS.find((group) => group.title === title),
    )
    .filter(Boolean);
  const extraGroups = PARTNERSHIP_TEAM_GROUPS.filter(
    (group) => !featuredGroupTitles.includes(group.title),
  );
  const primaryGroup = featuredGroups[0];
  const partnerGroups = [...featuredGroups.slice(1), ...extraGroups];
  const partnerColumns = [
    partnerGroups.filter((group) => group.title === "Kanavoogle"),
    partnerGroups.filter(
      (group) =>
        group.title === "Netzy" || group.title === "Geniebox Mrs. Lekashri.",
    ),
    partnerGroups.filter(
      (group) =>
        group.title !== "Kanavoogle" &&
        group.title !== "Netzy" &&
        group.title !== "Geniebox Mrs. Lekashri.",
    ),
  ];

  const renderTeamGroupCard = (group, compact = false, rowMembers = false) => {
    const Icon = group.icon;
    const { theme } = group;
    const memberGridCols = rowMembers
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
      : "grid-cols-1";

    return (
      <div
        key={group.title}
        className="group/col flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.025] transition-shadow duration-300 hover:shadow-[0_12px_40px_-8px_rgba(15,23,42,0.12)]"
      >
        <div
          className={`h-1.5 w-full shrink-0 bg-gradient-to-r ${theme.bar}`}
          aria-hidden
        />
        <div
          className={`flex flex-1 flex-col ${compact ? "p-4 md:p-5" : "p-5 md:p-6"}`}
        >
          {group.headerHref ? (
            <a
              href={group.headerHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-xl border border-transparent px-1 py-1 text-left no-underline outline-offset-2 transition-colors hover:border-slate-200/70 hover:bg-slate-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
              aria-label={`${group.title}: ${group.subtitle} (opens in new tab)`}
            >
              <span
                className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${theme.icon}`}
                aria-hidden
              >
                <Icon className="h-[22px] w-[22px]" strokeWidth={1.65} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-geom-heading text-sm font-normal tracking-[-0.02em] text-slate-900 md:text-sm">
                    {group.title}
                  </p>
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em] text-slate-500">
                    {group.index}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-snug text-slate-600">
                  {group.subtitle}
                </p>
              </div>
            </a>
          ) : (
            <div className="flex items-start gap-4">
              <span
                className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${theme.icon}`}
                aria-hidden
              >
                <Icon className="h-[22px] w-[22px]" strokeWidth={1.65} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-geom-heading text-sm font-normal tracking-[-0.02em] text-slate-900 md:text-sm">
                    {group.title}
                  </p>
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em] text-slate-500">
                    {group.index}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-snug text-slate-600">
                  {group.subtitle}
                </p>
              </div>
            </div>
          )}

          <ul className={`mt-5 grid gap-3 ${memberGridCols}`}>
            {group.members.map((m) => (
              <li key={m.name}>
                <div
                  className={`flex h-full gap-4 rounded-xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/80 p-4 shadow-sm transition-all duration-300 md:p-[1rem] ${theme.cardHover}`}
                >
                  <div
                    className={`flex h-[2.25rem] w-[2.25rem] shrink-0 items-center justify-center rounded-xl border text-[10px] font-bold uppercase tracking-[0.1em] ${theme.avatar}`}
                    aria-hidden
                  >
                    <img
                      src={getMemberAvatar(m)}
                      alt=""
                      className="h-full w-full rounded-[0.65rem] object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    {m.profileHref ? (
                      <a
                        href={m.profileHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[16px] font-semibold leading-snug tracking-tight text-slate-900 no-underline transition-colors hover:text-blue-800"
                        aria-label={`${m.name} (opens in new tab)`}
                      >
                        {m.name}
                      </a>
                    ) : (
                      <p className="text-[16px] font-semibold leading-snug tracking-tight text-slate-900">
                        {m.name}
                      </p>
                    )}
                    {m.role ? (
                      <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
                        {m.role}
                      </p>
                    ) : null}
                    {/* <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={
                          m.orgKind === "partner" || m.org === "HIfAi"
                            ? "inline-flex items-center rounded-md bg-blue-600/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-blue-800 ring-1 ring-blue-600/15"
                            : "inline-flex items-center rounded-md bg-slate-100/90 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200/80"
                        }
                      >
                        {m.org === "HIfAi" ? (
                          <span className="text-blue-800">HIfAi</span>
                        ) : (
                          m.org
                        )}
                      </span>
                    </div> */}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-200/80 bg-white py-4 md:py-8 sm:px-2 px-4"
      aria-labelledby="kanavoogle-partnership-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(100, 116, 139, 0.12) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-[22rem] w-[22rem] -translate-y-1/3 translate-x-1/4 rounded-full bg-blue-600/[0.05] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <div ref={headerRef} className="mx-auto max-w-5xl text-center">
          <h2
            id="kanavoogle-partnership-heading"
            className="mt-3 font-geom-heading text-[clamp(1.75rem,3.8vw,2.5rem)] font-normal leading-[1.2] tracking-[-0.02em] text-ink"
          >
            Proud partner of{" "}
            <a
              href={PARTNER_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={kanavoogleLinkClass}
            >
              Kanavoogle
            </a>
            <span className="text-ink/80">, Australia</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/65 md:text-[18px]">
            <span className={hifaiHighlightClass}>HIfAi</span> is shaped through
            an active partnership with{" "}
            <a
              href={PARTNER_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={kanavoogleLinkClass}
            >
              Kanavoogle
            </a>
            —connecting Australian innovation networks with our mission to make
            human intelligence visible, measurable, and actionable in a world
            shaped by AI. Explore the collaboration further at{" "}
            <a
              href={PARTNER_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={kanavoogleLinkClass}
            >
              {PARTNER_SITE_DISPLAY}
            </a>
            .
          </p>
        </div>

        <div
          ref={mainRef}
          className="mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_28px_-6px_rgba(15,23,42,0.1),0_0_0_1px_rgba(15,23,42,0.02)] md:mt-10"
        >
          <div
            className="h-1 bg-gradient-to-r from-blue-800 via-blue-600 to-sky-500"
            aria-hidden
          />

          <div
            className="relative border-t border-slate-100 bg-gradient-to-b from-slate-50/70 via-white to-white px-5 py-6 md:px-8 md:py-7"
            aria-labelledby="partnership-recognition-heading"
          >
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex items-start gap-3">
                <span
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-900/15"
                  aria-hidden
                >
                  <Award className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3
                    id="partnership-recognition-heading"
                    className="font-geom-heading text-lg font-normal tracking-[-0.02em] text-slate-900 mb-2"
                  >
                    Recognition & Grants
                  </h3>
                  <p className="relative text-sm leading-relaxed text-slate-700 md:text-[18px]">
                    Together, <span className={hifaiHighlightClass}>HIfAi</span>{" "}
                    and{" "}
                    <a
                      href={PARTNER_SITE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={kanavoogleLinkClass}
                    >
                      Kanavoogle
                    </a>{" "}
                    bridge innovation in Australia with programs that make
                    skills and human intelligence easier to see and act on. For
                    partnership context, research, and networks, visit{" "}
                    <a
                      href={PARTNER_SITE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={kanavoogleLinkClass}
                    >
                      {PARTNER_SITE_DISPLAY}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

            <ol ref={awardsRef} className="grid gap-3 sm:gap-3.5">
              {PARTNERSHIP_RECOGNITION_AWARDS.map((item) => (
                <li key={`${item.year}-${item.title}`}>
                  <div className="group/row relative overflow-hidden rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-900/[0.02] transition-all duration-300 hover:border-blue-200/80 hover:shadow-md hover:ring-blue-600/10 sm:p-4 md:flex md:items-start md:gap-5 md:p-5">
                    <div
                      className="absolute inset-y-0 left-0 w-1 rounded-l-xl bg-gradient-to-b from-blue-600 to-blue-500 opacity-0 transition-opacity duration-300 group-hover/row:opacity-100"
                      aria-hidden
                    />
                    <span className="mb-2 inline-flex min-w-[3.25rem] items-center justify-center rounded-lg border border-slate-200/90 bg-slate-50 px-2 py-1 font-geom-heading text-xs font-normal tabular-nums text-slate-700 md:mb-0 md:min-h-[2.25rem] md:shrink-0">
                      {item.year}
                    </span>
                    <div className="min-w-0 flex-1 md:flex md:items-center md:gap-2.5 md:pt-0.5">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 text-[16px] font-semibold leading-snug text-ink no-underline transition-colors hover:text-blue-800 md:whitespace-nowrap"
                      >
                        <span className="underline-offset-[3px] group-hover/link:underline">
                          {item.title}
                        </span>
                        <ExternalLink
                          className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover/link:text-blue-600"
                          aria-hidden
                        />
                      </a>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600 md:mt-0 md:whitespace-nowrap">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="relative mt-6 border-t border-slate-200/90 pt-6 md:mt-8 md:pt-8 lg:mt-10 lg:pt-10">
          <div
            className="relative overflow-hidden rounded-[1.35rem] border border-slate-200/90 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04),0_24px_64px_-16px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.03]"
            aria-labelledby="partnership-team-heading"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f2844] to-[#143d62] px-6 py-11 md:px-10 md:py-8 lg:px-12 lg:py-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                aria-hidden
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, rgba(96, 165, 250, 0.22), transparent 45%), radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.12), transparent 40%), radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                  backgroundSize: "100% 100%, 100% 100%, 24px 24px",
                }}
              />
              <div
                className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl"
                aria-hidden
              />
              <div className="relative mx-auto max-w-4xl text-center">
                <h3
                  id="partnership-team-heading"
                  className="font-geom-heading text-[clamp(1.75rem,3.8vw,2.35rem)] font-normal leading-snug tracking-[-0.02em] text-white"
                >
                  HIfAi Eco System
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-300/95 md:mt-5 md:text-lg">
                  Leadership, operations, and support working together across{" "}
                  <span className="font-semibold text-sky-200">HIfAi</span> and
                  our{" "}
                  <a
                    href={PARTNER_SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sky-200 underline decoration-sky-200/50 underline-offset-2 transition-colors hover:text-white hover:decoration-white"
                  >
                    Kanavoogle
                  </a>{" "}
                  collaboration.
                </p>
              </div>
            </div>

            <div className="relative border-t border-slate-200/80 bg-gradient-to-b from-slate-100/90 via-slate-50/50 to-white px-4 py-6 md:px-6 md:py-8 lg:px-8">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.4]"
                aria-hidden
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(148, 163, 184, 0.14) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div
                ref={teamRef}
                className="relative flex flex-col gap-5 sm:gap-6"
              >
                {primaryGroup
                  ? renderTeamGroupCard(primaryGroup, false, true)
                  : null}

                <div className="rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 md:px-5 md:py-4">
                  <h4 className="font-geom-heading text-base font-normal tracking-[-0.01em] text-slate-900 md:text-lg">
                  HIfAi Eco System Partners
                  </h4>
                </div>

                <div className="grid gap-5 sm:gap-6 lg:grid-cols-3 lg:items-start">
                  {partnerColumns.map((columnGroups, columnIndex) => (
                    <div
                      key={`partners-column-${columnIndex}`}
                      className="flex flex-col gap-5"
                    >
                      {columnGroups.map((group) =>
                        renderTeamGroupCard(group, true),
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mt-10 md:mt-12">
                <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-[#08152a] via-[#0d2642] to-[#103760] p-5 shadow-[0_18px_56px_-20px_rgba(15,23,42,0.7)] md:p-7">
                  <div
                    className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute -bottom-16 left-1/3 h-56 w-56 rounded-full bg-blue-500/25 blur-3xl"
                    aria-hidden
                  />
                  <div className="relative grid items-center gap-5 md:grid-cols-[240px_minmax(0,1fr)] md:gap-8">
                    <div className="mx-auto w-full max-w-[220px] md:mx-0 md:max-w-[240px]">
                      <div className="overflow-hidden rounded-2xl border border-white/25 bg-white/10 p-1.5 shadow-[0_16px_42px_-18px_rgba(14,165,233,0.75)] backdrop-blur-sm">
                        <img
                          src={AMBASSADOR_IMAGE_URL}
                          alt="Brand ambassador portrait"
                          className="h-[220px] w-full rounded-xl object-cover object-top md:h-[270px]"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>

                    <div className="text-center md:text-left">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200/90">
                        Ambassador Spotlight
                      </p>
                      <h4 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
                        Brand Ambassador Alex
                      </h4>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-200/90 md:text-base">
                        Follow featured talks, stories, and updates from our
                        ambassador community on Anba TV.
                      </p>

                      <a
                        href="https://anba.tv/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative mt-6 inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-blue-300/80 bg-gradient-to-r from-blue-100 via-sky-100 to-indigo-100 px-7 py-3.5 text-center shadow-[0_8px_0_rgba(29,78,216,0.12),0_20px_48px_-6px_rgba(37,99,235,0.35),0_0_0_1px_rgba(255,255,255,0.6)_inset] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                        aria-label="Open Anba TV in a new tab"
                      >
                        <span className="relative text-base font-bold leading-tight tracking-tight text-blue-950">
                          Watch on
                          <span className="mx-2 font-normal text-blue-500/90">
                            |
                          </span>
                          <span className="font-extrabold text-blue-700 underline decoration-blue-600 decoration-2 underline-offset-[5px] transition-colors group-hover:text-blue-800">
                            Anba TV
                          </span>
                        </span>
                        <ExternalLink
                          className="relative h-5 w-5 shrink-0 text-blue-700 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutBody() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile(768);

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <KanavooglePartnershipSection
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />
    </>
  );
}
