import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useReducedMotion } from "../hooks/useReducedMotion.js";

export default function BreadcrumbPage({ title, subtitle, children }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative w-full bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes bc-fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bc-r1 { animation: bc-fadeUp 0.55s cubic-bezier(.22,1,.36,1) 0.05s both; }
        .bc-r2 { animation: bc-fadeUp 0.55s cubic-bezier(.22,1,.36,1) 0.2s both; }

        @media (prefers-reduced-motion: reduce) {
          .bc-r1, .bc-r2 { animation: none; }
        }
      `}</style>

      <Navbar reducedMotion={reducedMotion} />

      {/* ── Hero (id matches Footer back-to-top anchor) ── */}
      <section
        id="hero"
        className="bc-wrap relative w-full overflow-hidden pt-[8.75rem] pb-12"
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

          <div className="bc-r1 flex flex-col items-center text-center">

            <div className="mx-auto max-w-4xl">
              <h1 className="font-extrabold leading-tight tracking-tight text-slate-900 text-[32px] md:text-[42px]">
                {title}
              </h1>
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
        <section className="relative w-full overflow-x-hidden bg-white pb-8 pt-2 md:pb-8image.png md:pt-4">
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
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="bc-r2">{children}</div>
          </div>
        </section>
      ) : null}

      <Footer reducedMotion={reducedMotion} />
    </div>
  );
}
