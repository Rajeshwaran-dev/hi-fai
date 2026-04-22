import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, useLocation } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { useRouteTransition } from "./RouteTransitionProvider.jsx";
import logo1Url from "../assets/images/logo-1.png?url";

const TOP_BAR_EMAIL = "venkat@kanavoo.live";
const TOP_BAR_PHONE_DISPLAY = "+91 93848 82012";
const TOP_BAR_PHONE_TEL = "+919384882012";
const TOP_BAR_MAILTO = `mailto:${TOP_BAR_EMAIL}?subject=${encodeURIComponent("Enquiry — HIfAi")}`;
const TOP_BAR_WHATSAPP_URL = "https://wa.me/message/PQNSXRG6VDSCI1";
const TOP_BAR_INSTAGRAM_URL =
  "https://www.instagram.com/hifai2026?igsh=MXJzODhuemU5ZHFiMQ==";

const navItems = [
  { label: "About Us", to: "/about" },
  {
    label: "Students",
    submenu: [
      {
        label: "Grades 9th – 12th",
        to: "/students/school-students",
        description: "Discover your potential beyond marks with En-Thiran",
        icon: "school",
      },
      {
        label: "College Students",
        to: "/students/college-students",
        description: "Build real-world solutions through global, project-based learning",
        icon: "college",
      },
    ],
  },
  { label: "Schools", to: "/school-organizations" },
  { label: "Universities", to: "/college-organizations" },
  { label: "Learning Hub", to: "/learning-hub" },
];

export default function Navbar({ reducedMotion }) {
  const barRef = useRef(null);
  const studentsMenuCloseTimeoutRef = useRef(null);
  const location = useLocation();
  const { transitionTo } = useRouteTransition(); // kept for logo route transition consistency
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStudentsMenuOpen, setIsStudentsMenuOpen] = useState(false);

  useEffect(() => {
    if (reducedMotion || !barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
    );
  }, [reducedMotion]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    const onEsc = (event) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onEsc);
    };
  }, [isMobileMenuOpen]);

  useEffect(
    () => () => {
      if (studentsMenuCloseTimeoutRef.current) {
        window.clearTimeout(studentsMenuCloseTimeoutRef.current);
      }
    },
    [],
  );

  const handleNavClick = (e, to) => {
    if (to === location.pathname) return;
    e.preventDefault();
    transitionTo(to);
  };

  const navigateTo = (to) => {
    if (!to || to === location.pathname) return;
    setIsStudentsMenuOpen(false);
    setIsMobileMenuOpen(false);
    transitionTo(to);
  };

  const openStudentsMenu = () => {
    if (studentsMenuCloseTimeoutRef.current) {
      window.clearTimeout(studentsMenuCloseTimeoutRef.current);
      studentsMenuCloseTimeoutRef.current = null;
    }
    setIsStudentsMenuOpen(true);
  };

  const closeStudentsMenuWithDelay = () => {
    if (studentsMenuCloseTimeoutRef.current) {
      window.clearTimeout(studentsMenuCloseTimeoutRef.current);
    }
    studentsMenuCloseTimeoutRef.current = window.setTimeout(() => {
      setIsStudentsMenuOpen(false);
      studentsMenuCloseTimeoutRef.current = null;
    }, 160);
  };

  const renderSubmenuIcon = (iconType) => {
    if (iconType === "college") {
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
          <path d="M3 8.5 12 4l9 4.5L12 13 3 8.5Z" />
          <path d="M6 10.3V14c0 1.5 2.7 2.7 6 2.7s6-1.2 6-2.7v-3.7" />
          <path d="M21 9v5" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
        <path d="M4 20h16" />
        <path d="M6 20V9l6-4 6 4v11" />
        <path d="M9.5 13h5" />
      </svg>
    );
  };

  /** Match floating FAB palette: call sky, mail blue, WhatsApp green, Instagram gradient */
  const topIconBase =
    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-[0_6px_16px_rgba(0,0,0,0.25)] transition duration-200 hover:scale-105 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1528] md:h-9 md:w-9";

  return (
    <header ref={barRef} className="fixed top-0 left-0 right-0 z-50">
      {/* Fixed top bar — contact (left), CTAs (center), social (right) */}
      <div className="hidden border-b border-cyan-500/10 bg-gradient-to-b from-[#0a1528] to-[#060d18] text-white/90 shadow-[0_8px_24px_rgba(0,0,0,0.28)] min-[700px]:block">
        <div className="mx-auto grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2 gap-y-2 px-3 py-2 md:gap-x-4 md:px-8 md:py-2.5">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[11px] md:text-xs md:gap-x-3">
            <a
              href={TOP_BAR_MAILTO}
              className="inline-flex max-w-[min(100%,11rem)] items-center gap-2 truncate rounded-lg py-0.5 text-white/90 transition-colors hover:text-white sm:max-w-none md:gap-2.5"
            >
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2563eb]/35 text-white ring-1 ring-[#3b82f6]/50 md:h-8 md:w-8">
                <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden />
              </span>
              <span className="truncate font-medium">{TOP_BAR_EMAIL}</span>
            </a>
            <span className="hidden h-3 w-px shrink-0 border-l border-dotted border-white/30 sm:block" aria-hidden />
            <a
              href={`tel:${TOP_BAR_PHONE_TEL}`}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg py-0.5 font-medium text-white/90 transition-colors hover:text-white md:gap-2.5"
            >
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0ea5e9]/35 text-white ring-1 ring-[#0ea5e9]/55 md:h-8 md:w-8">
                <Phone className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden />
              </span>
              {TOP_BAR_PHONE_DISPLAY}
            </a>
          </div>

          <div aria-hidden />

          <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-1.5 md:gap-2">
            <button
              type="button"
              onClick={() => navigateTo("/get-started?tab=school-org")}
              className="rounded-md border border-white/25 bg-white/[0.07] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm transition-colors hover:border-white/35 hover:bg-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 sm:px-3 sm:text-[11px] md:px-4 md:text-xs"
            >
              Enquire
            </button>
            <a
              href={`tel:${TOP_BAR_PHONE_TEL}`}
              aria-label={`Call ${TOP_BAR_PHONE_DISPLAY}`}
              className={`${topIconBase} bg-[#0ea5e9] shadow-[0_6px_18px_rgba(14,165,233,0.45)] focus-visible:ring-[#0ea5e9]`}
            >
              <Phone className="h-4 w-4 md:h-[1.125rem] md:w-[1.125rem]" strokeWidth={2.25} aria-hidden />
            </a>
            <a
              href={TOP_BAR_MAILTO}
              aria-label={`Email ${TOP_BAR_EMAIL}`}
              className={`${topIconBase} bg-[#2563eb] shadow-[0_6px_18px_rgba(37,99,235,0.45)] focus-visible:ring-[#2563eb]`}
            >
              <Mail className="h-4 w-4 md:h-[1.125rem] md:w-[1.125rem]" aria-hidden />
            </a>
            <a
              href={TOP_BAR_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HIfAi on WhatsApp"
              className={`${topIconBase} bg-[#25D366] shadow-[0_6px_18px_rgba(37,211,102,0.45)] focus-visible:ring-[#25D366]`}
            >
              <SiWhatsapp className="h-[1.05rem] w-[1.05rem] md:h-5 md:w-5" aria-hidden />
            </a>
            <a
              href={TOP_BAR_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HIfAi on Instagram"
              className={`${topIconBase} bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] shadow-[0_6px_18px_rgba(221,42,123,0.35)] focus-visible:ring-pink-400`}
            >
              <SiInstagram className="h-4 w-4 md:h-[1.125rem] md:w-[1.125rem]" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <div className="px-3 pt-2 md:px-8 md:pt-3 pb-4">
        <nav className="mx-auto flex w-full max-w-7xl items-center gap-3 rounded-[18px] border border-[#3f5f95]/70 bg-gradient-to-r from-[#0a1734]/95 via-[#0c2244]/90 to-[#102b57]/95 px-3 py-2 shadow-[0_12px_40px_rgba(3,10,30,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:px-6 md:py-2.5 align-items-center justify-center">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center"
          aria-label="HIfAi home"
          onClick={(e) => handleNavClick(e, "/")}
        >
          <img
          style={{ transform: "scale(1.3)"}}
            src={logo1Url}
            alt="HIfAi — human hand and robotic hand high-five"
            className="h-11 w-auto object-contain object-left md:h-[56px] lg:h-[62px] xl:h-[80px]"
          />
        </Link>
        <ul className="hidden flex-1 items-center justify-center gap-7 text-sm font-semibold text-white/90 md:flex">
          {navItems.map((item) => (
            <li
              key={item.label}
              className="group relative"
              onMouseEnter={() => item.submenu && openStudentsMenu()}
              onMouseLeave={() => item.submenu && closeStudentsMenuWithDelay()}
            >
              <button
                type="button"
                onClick={() => {
                  if (item.submenu) {
                    setIsStudentsMenuOpen((prev) => !prev);
                  } else {
                    navigateTo(item.to);
                  }
                }}
                className={`relative inline-flex items-center gap-1 transition-colors duration-200 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-accent after:to-accent-cyan after:transition-all after:duration-200 ${
                  item.to && location.pathname === item.to
                    ? "text-white after:w-full"
                    : "after:w-0 hover:after:w-full"
                }`}
              >
                {item.label}
                {item.submenu ? (
                  <span className="text-xs text-white/70 transition group-hover:text-white">▼</span>
                ) : null}
              </button>

              {item.submenu ? (
                <div
                  onMouseEnter={openStudentsMenu}
                  onMouseLeave={closeStudentsMenuWithDelay}
                  className={`absolute left-1/2 top-[calc(100%+10px)] w-[360px] -translate-x-1/2 rounded-2xl border border-blue-200/25 bg-[#0a1d3d]/95 p-2.5 shadow-[0_16px_36px_rgba(2,8,25,0.5)] backdrop-blur-md transition-all duration-200 ${
                    isStudentsMenuOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0"
                  }`}
                >
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.to}
                      type="button"
                      onClick={() => navigateTo(subItem.to)}
                      className={`group mb-2 block w-full rounded-xl border p-3 text-left transition last:mb-0 ${
                        location.pathname === subItem.to
                          ? "border-cyan-300/45 bg-cyan-300/12 text-white shadow-[0_8px_20px_rgba(34,211,238,0.2)]"
                          : "border-white/10 bg-white/[0.03] text-blue-50/95 hover:border-cyan-200/45 hover:bg-white/[0.08]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-300/30 to-blue-400/30 text-cyan-100 ring-1 ring-white/15">
                          {renderSubmenuIcon(subItem.icon)}
                        </span>
                        <span className="block">
                          <span className="flex items-center gap-2 text-[13px] font-semibold leading-tight">
                            {subItem.label}
                            <span className="text-cyan-200/70 transition-transform group-hover:translate-x-0.5">
                              →
                            </span>
                          </span>
                          <span className="mt-1 block text-[11px] leading-snug text-blue-100/70">
                            {subItem.description}
                          </span>
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
        <button
          type="button"
          data-magnetic
          onClick={() => navigateTo("/get-started")}
          className="ml-auto hidden min-h-[42px] shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(20,131,255,0.45)] transition-transform duration-200 hover:scale-[1.03] hover:shadow-glow active:scale-[0.98] md:inline-flex md:px-6"
        >
          Let's HIfAi
        </button>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white md:hidden"
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="flex flex-col gap-1.5">
            <span className="h-0.5 w-5 rounded-full bg-white" />
            <span className="h-0.5 w-5 rounded-full bg-white" />
            <span className="h-0.5 w-5 rounded-full bg-white" />
          </span>
        </button>
        </nav>
      </div>

      <div
        className={`fixed inset-0 z-[60] bg-[#020617]/55 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      />

      <aside
        className={`fixed top-0 right-0 z-[70] h-dvh w-[84%] max-w-[320px] border-l border-blue-200/20 bg-gradient-to-b from-[#0a1734] via-[#0f2348] to-[#102a56] p-5 shadow-[0_20px_40px_rgba(2,8,25,0.55)] transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center"
            aria-label="HIfAi home"
            onClick={(e) => handleNavClick(e, "/")}
          >
            <img
              src={logo1Url}
              alt="HIfAi logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg text-white"
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => {
                  if (item.submenu) {
                    setIsStudentsMenuOpen((prev) => !prev);
                  } else {
                    navigateTo(item.to);
                  }
                }}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[16px] font-semibold transition hover:bg-white/10 hover:text-white ${
                  item.to && location.pathname === item.to
                    ? "bg-blue-400/20 text-white"
                    : "text-blue-50/90"
                }`}
              >
                <span>{item.label}</span>
                {item.submenu ? <span className="text-xs text-blue-100/70">▼</span> : null}
              </button>

              {item.submenu && isStudentsMenuOpen ? (
                <div className="mt-2 space-y-2 pl-2">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.to}
                      type="button"
                      onClick={() => navigateTo(subItem.to)}
                      className={`block w-full rounded-xl border p-3 text-left transition ${
                        location.pathname === subItem.to
                          ? "border-cyan-300/45 bg-cyan-300/12 text-white"
                          : "border-white/10 bg-white/[0.03] text-blue-100/90 hover:border-cyan-200/40 hover:bg-white/[0.08] hover:text-white"
                      }`}
                    >
                      <span className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-300/30 to-blue-400/30 text-cyan-100 ring-1 ring-white/15">
                          {renderSubmenuIcon(subItem.icon)}
                        </span>
                        <span className="block">
                          <span className="block text-sm font-semibold leading-tight">{subItem.label}</span>
                          <span className="mt-1 block text-[11px] leading-snug text-blue-100/70">
                            {subItem.description}
                          </span>
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => navigateTo("/get-started")}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(20,131,255,0.45)]"
        >
          Let's HIfAi
        </button>
      </aside>
    </header>
  );
}
