import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, useLocation } from "react-router-dom";
import { useRouteTransition } from "./RouteTransitionProvider.jsx";

const navItems = [
  {
    label: "Students",
    submenu: [
      {
        label: "Students (Grades 9–12)",
        to: "/students/school-students",
        description: "Discover your potential beyond marks with En-Thiran",
        icon: "school",
      },
      {
        label: "Students (College)",
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

  return (
    <header
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 md:px-8 md:pt-4"
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center gap-3 rounded-[18px] border border-[#3f5f95]/70 bg-gradient-to-r from-[#0a1734]/95 via-[#0c2244]/90 to-[#102b57]/95 px-3 py-2 shadow-[0_12px_40px_rgba(3,10,30,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:px-6 md:py-2.5">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center"
          aria-label="HIfAi home"
          onClick={(e) => handleNavClick(e, "/")}
        >
          <img
          style={{ transform: "scale(1.3)"}}
            src="/logo-1.png"
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
          Let's Hi-fAi
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
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">
            Navigation
          </span>
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
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[15px] font-semibold transition hover:bg-white/10 hover:text-white ${
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
          Let's Hi-fAi
        </button>
      </aside>
    </header>
  );
}
