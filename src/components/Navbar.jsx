import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { Link, useLocation } from "react-router-dom";
import { useRouteTransition } from "./RouteTransitionProvider.jsx";

const navItems = [
  {
    label: "Students",
    submenu: [
      {
        label: "School Students",
        to: "/students/school-students",
        description: "Programs, projects, and AI skill pathways for school learners.",
        icon: "school",
      },
      {
        label: "College Students",
        to: "/students/college-students",
        description: "Career-focused tracks and innovation labs for higher education.",
        icon: "college",
      },
    ],
  },
  { label: "School Organizations", to: "/school-organizations" },
  { label: "College Organizations", to: "/college-organizations" },
  { label: "Learning Hub", to: "/learning-hub" },
];

export default function Navbar({ reducedMotion }) {
  const barRef = useRef(null);
  const studentsMenuCloseTimeoutRef = useRef(null);
  const location = useLocation();
  const { transitionTo } = useRouteTransition(); // kept for logo route transition consistency
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGetStartedModalOpen, setIsGetStartedModalOpen] = useState(false);
  const [isStudentsMenuOpen, setIsStudentsMenuOpen] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState("school");

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
    if (!isMobileMenuOpen && !isGetStartedModalOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    const onEsc = (event) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
      if (event.key === "Escape") setIsGetStartedModalOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onEsc);
    };
  }, [isMobileMenuOpen, isGetStartedModalOpen]);

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

  const getStartedModal =
    isGetStartedModalOpen && typeof document !== "undefined" ? (
      <div
        className="fixed inset-0 z-[100] flex min-h-[100dvh] items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className="absolute inset-0 bg-ink/45 backdrop-blur-md"
          onClick={() => setIsGetStartedModalOpen(false)}
          aria-label="Close dialog"
        />

        <div className="relative z-10 my-auto max-h-[min(94dvh,920px)] w-[min(94vw,900px)] overflow-hidden rounded-[1.8rem] border border-white/60 bg-white/95 shadow-[0_32px_96px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent via-accent-cyan to-accent"
            aria-hidden
          />
          <button
            type="button"
            onClick={() => setIsGetStartedModalOpen(false)}
            className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-xl text-ink/50 shadow-sm transition-all hover:rotate-90 hover:bg-white hover:text-ink"
            aria-label="Close modal"
          >
            &times;
          </button>

          <div className="max-h-[min(94dvh,920px)] overflow-y-auto">
            <div className="px-6 pb-8 pt-10 md:px-10 md:pt-12">
              <div className="text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Join Now</p>
                <h2 className="mt-3 font-geom-heading text-[1.8rem] font-normal leading-tight text-ink md:text-[2.25rem]">
                  Ready to Start Your Journey?
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-sm text-ink/65">
                  Choose your pathway and tell us more about you.
                </p>
              </div>

              <div className="mx-auto mt-7 flex max-w-sm rounded-[1rem] bg-slate-100 p-1.5 shadow-inner">
                <button
                  type="button"
                  onClick={() => setActiveFormTab("school")}
                  className={`flex-1 rounded-[0.7rem] py-2.5 text-sm font-semibold transition-all ${
                    activeFormTab === "school"
                      ? "bg-white text-accent shadow-sm ring-1 ring-black/5"
                      : "text-slate-500 hover:text-ink"
                  }`}
                >
                  High School
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFormTab("university")}
                  className={`flex-1 rounded-[0.7rem] py-2.5 text-sm font-semibold transition-all ${
                    activeFormTab === "university"
                      ? "bg-white text-accent shadow-sm ring-1 ring-black/5"
                      : "text-slate-500 hover:text-ink"
                  }`}
                >
                  University
                </button>
              </div>

              <form className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_32px_rgba(15,23,42,0.06)] md:p-7">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-800">First name</span>
                    <input
                      type="text"
                      placeholder="Jane"
                      className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-800">Last name</span>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-800">
                      {activeFormTab === "school" ? "Grade" : "Program"}
                    </span>
                    <select className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20">
                      {activeFormTab === "school" ? (
                        <>
                          <option>Select grade</option>
                          <option>Grade 9</option>
                          <option>Grade 10</option>
                          <option>Grade 11</option>
                          <option>Grade 12</option>
                        </>
                      ) : (
                        <>
                          <option>Select program</option>
                          <option>Undergraduate</option>
                          <option>Postgraduate</option>
                          <option>Diploma</option>
                        </>
                      )}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-800">
                      {activeFormTab === "school" ? "Institution name" : "University name"}
                    </span>
                    <input
                      type="text"
                      placeholder={activeFormTab === "school" ? "Your high school" : "Your university"}
                      className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-800">Phone number</span>
                    <input
                      type="tel"
                      placeholder="+1 ••• ••• ••••"
                      className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-800">Email ID</span>
                    <input
                      type="email"
                      placeholder="you@school.edu"
                      className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                    />
                  </label>
                </div>
              </form>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50/50 p-6 md:flex-row md:items-center md:justify-between">
              <button
                type="button"
                className="group flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-cyan px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-glow-cyan md:w-auto"
              >
                Submit Application
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button
                type="button"
                onClick={() => setIsGetStartedModalOpen(false)}
                className="flex min-h-[48px] items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <header
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 md:px-8 md:pt-4"
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center gap-3 rounded-[18px] border border-[#3f5f95]/70 bg-gradient-to-r from-[#0a1734]/95 via-[#0c2244]/90 to-[#102b57]/95 px-3 py-2.5 shadow-[0_12px_40px_rgba(3,10,30,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:px-6 md:py-3">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center"
          aria-label="HIfAi home"
          onClick={(e) => handleNavClick(e, "/")}
        >
          <img
            src="/logo-1.png"
            alt="HIfAi — human hand and robotic hand high-five"
            className="h-9 w-auto md:h-16"
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
          onClick={() => setIsGetStartedModalOpen(true)}
          className="ml-auto hidden min-h-[42px] shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(20,131,255,0.45)] transition-transform duration-200 hover:scale-[1.03] hover:shadow-glow active:scale-[0.98] md:inline-flex md:px-6"
        >
          Get Started
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
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsGetStartedModalOpen(true);
          }}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(20,131,255,0.45)]"
        >
          Get Started
        </button>
      </aside>

      {getStartedModal ? createPortal(getStartedModal, document.body) : null}
    </header>
  );
}
