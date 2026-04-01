import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useRouteTransition } from "./RouteTransitionProvider.jsx";

const links = [
  { label: "Home", to: "/" },
  { label: "Explore", to: "/explore" },
  { label: "Evaluate", to: "/evaluate" },
  { label: "Extend", to: "/extend" },
  { label: "Expand", to: "/expand" },
];

export default function Navbar({ reducedMotion }) {
  const barRef = useRef(null);
  const location = useLocation();
  const { transitionTo } = useRouteTransition();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (reducedMotion || !barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
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

  const handleNavClick = (e, to) => {
    if (to === location.pathname) return;
    e.preventDefault();
    transitionTo(to);
  };

  return (
    <header
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 md:px-8 md:pt-4"
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center gap-3 rounded-[18px] border border-[#3f5f95]/70 bg-gradient-to-r from-[#0a1734]/95 via-[#0c2244]/90 to-[#102b57]/95 px-3 py-2.5 shadow-[0_12px_40px_rgba(3,10,30,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:px-6 md:py-3">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center"
          aria-label="HIFAI Skills home"
          onClick={(e) => handleNavClick(e, "/")}
        >
          <img
            style={{ width: "38px", transform: "scale(1.42)" }}
            src="/logo.png"
            alt="HIFAI Skills"
            className="w-auto"
          />
        </Link>
        <ul className="hidden flex-1 items-center justify-center gap-7 text-sm font-semibold text-white/90 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                onClick={(e) => handleNavClick(e, l.to)}
                className="relative transition-colors duration-200 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-accent after:to-accent-cyan after:transition-all after:duration-200 hover:after:w-full"
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <NavLink
          to="/get-started"
          data-magnetic
          onClick={(e) => handleNavClick(e, "/get-started")}
          className="ml-auto hidden min-h-[42px] shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(20,131,255,0.45)] transition-transform duration-200 hover:scale-[1.03] hover:shadow-glow active:scale-[0.98] md:inline-flex md:px-6"
        >
          Get Started
        </NavLink>
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
          isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
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
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                onClick={(e) => handleNavClick(e, l.to)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-[15px] font-semibold transition ${
                    isActive
                      ? "bg-blue-400/20 text-white"
                      : "text-blue-50/90 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink
          to="/get-started"
          onClick={(e) => handleNavClick(e, "/get-started")}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(20,131,255,0.45)]"
        >
          Get Started
        </NavLink>
      </aside>
    </header>
  );
}
