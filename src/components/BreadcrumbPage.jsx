import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useReducedMotion } from "../hooks/useReducedMotion.js";
import { useRouteTransition } from "../components/RouteTransitionProvider.jsx";
import { useLocation } from "react-router-dom";

export default function BreadcrumbPage({ title, subtitle, children }) {
  const reducedMotion = useReducedMotion();
  const { transitionTo } = useRouteTransition();
  const location = useLocation();

  const handleHomeClick = (e) => {
    if (location.pathname === "/") return;
    e.preventDefault();
    transitionTo("/");
  };

  return (
    <div className="relative w-full bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes bc-fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bc-r1 { animation: bc-fadeUp 0.55s cubic-bezier(.22,1,.36,1) 0.05s both; }
        .bc-r2 { animation: bc-fadeUp 0.55s cubic-bezier(.22,1,.36,1) 0.17s both; }
        .bc-r3 { animation: bc-fadeUp 0.55s cubic-bezier(.22,1,.36,1) 0.28s both; }

        @media (prefers-reduced-motion: reduce) {
          .bc-r1, .bc-r2, .bc-r3 { animation: none; }
        }

        .bc-home-crumb { transition: background 0.2s, color 0.2s, border-color 0.2s; }
        .bc-home-crumb:hover { background: #eff6ff; color: #2563eb; border-color: #bfdbfe; }

        .bc-active-glow {
          position: relative;
        }
        .bc-active-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          opacity: 0.15;
          filter: blur(8px);
          z-index: -1;
        }
      `}</style>

      <Navbar reducedMotion={reducedMotion} />

      {/* ── Breadcrumb Hero (id matches Footer back-to-top anchor) ── */}
      <section
        id="hero"
        className="bc-wrap relative w-full overflow-hidden pt-[5.5rem] pb-12"
      >

        {/* Background gradient */}
        <div aria-hidden className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #fafcff 45%, #f0fffe 100%)' }} />

        {/* Dot grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(circle, #bfdbfe 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

        {/* Left ambient glow */}
        <div aria-hidden className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 68%)' }} />

        {/* Right ambient glow */}
        <div aria-hidden className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 68%)' }} />

        {/* Bottom border */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #bfdbfe 25%, #a5f3fc 75%, transparent 100%)' }} />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-8 md:pt-20">

          {/* ── Breadcrumb nav ── */}
          <nav aria-label="Breadcrumb" className="bc-r1 mb-7 flex items-center justify-center gap-2">

            {/* Home pill */}
            <a href="/"
              onClick={handleHomeClick}
              className="bc-home-crumb inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-slate-500 shadow-sm select-none">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Home
            </a>

            {/* Chevron */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="9 18 15 12 9 6"/>
            </svg>

            {/* Active pill */}
            <span className="bc-active-glow relative inline-flex items-center gap-1.5 rounded-full border border-blue-200 px-4 py-1.5 text-[11px] font-bold text-blue-600 shadow-sm select-none"
              style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #ecfeff 100%)' }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }} />
              {title}
            </span>
          </nav>

          {/* ── Heading + right badge row ── */}
          <div className="bc-r2 flex flex-col items-center text-center">

            {/* Left: title */}
            <div className="mx-auto max-w-4xl">
              <h1 className="text-[clamp(2.25rem,5.2vw,3.7rem)] font-extrabold leading-tight tracking-tight text-slate-900">
                {title}
              </h1>
              {/* Accent underline */}
              <div aria-hidden className="mx-auto mt-3 h-[3px] w-16 rounded-full"
                style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4)' }} />
              {subtitle ? (
                <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-slate-600 md:text-lg">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>

        </div>
      </section>

      {children ? (
        <section className="relative w-full overflow-hidden bg-white pb-16 pt-2 md:pb-24 md:pt-4">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: "radial-gradient(circle, #bfdbfe 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(240,247,255,0.5) 0%, transparent 22%, transparent 100%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-8xl px-6">
            <div className="bc-r3">{children}</div>
          </div>
        </section>
      ) : null}

      <Footer reducedMotion={reducedMotion} />
    </div>
  );
}

