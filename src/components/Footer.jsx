import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouteTransition } from "./RouteTransitionProvider.jsx";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import logo1Url from "../assets/images/logo-1.png?url";

gsap.registerPlugin(ScrollTrigger);

/** Matches primary header navigation routes */
const FOOTER_NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Students (Grades 9–12)", to: "/students/school-students" },
  { label: "Students (College)", to: "/students/college-students" },
  { label: "Schools", to: "/school-organizations" },
  { label: "Universities", to: "/college-organizations" },
  { label: "Learning Hub", to: "/learning-hub" },
];

const FOOTER_ADDRESS_LINE =
  "24, Rengadevi Amman Koil Street, Main Road, Dindigul-624001";
const FOOTER_PHONE_DISPLAY = "+91 93848 82012";
const FOOTER_PHONE_TEL = "+919384882012";
const FOOTER_EMAIL = "innovate@hifai.io";
const FOOTER_WHATSAPP_URL = "https://wa.me/message/PQNSXRG6VDSCI1";
const FOOTER_INSTAGRAM_URL =
  "https://www.instagram.com/hifai2026?igsh=MXJzODhuemU5ZHFiMQ==";

/** Google Maps embed — HIfAi place (Dindigul) */
const FOOTER_MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d493.78774831078425!2d77.97051!3d10.3618454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00ab09fa3836eb%3A0xc2981c3295ec6fab!2sHIfAi!5e1!3m2!1sen!2sin!4v1775460424439!5m2!1sen!2sin";

export default function Footer({ reducedMotion }) {
  const location = useLocation();
  const { transitionTo } = useRouteTransition();
  const innerRef  = useRef(null);
  const col1Ref   = useRef(null);
  const col2Ref   = useRef(null);
  const col3Ref   = useRef(null);
  const col4Ref   = useRef(null);
  const bottomRef = useRef(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner || reducedMotion) return;

    const ctx = gsap.context(() => {
      const cols = [col1Ref, col2Ref, col3Ref, col4Ref].map((r) => r.current).filter(Boolean);

      gsap.from(cols, {
        y: 32,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: inner, start: "top 88%", toggleActions: "play none none none" },
      });

      if (bottomRef.current) {
        gsap.from(bottomRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: inner, start: "top 82%", toggleActions: "play none none none" },
        });
      }
    }, inner);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Show after scrolling past the top hero (home + subpages use #hero).
  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        setShowBackToTop(window.scrollY > 320);
        return;
      }
      setShowBackToTop(hero.getBoundingClientRect().bottom <= 0);
    };

    let rafId = 0;
    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [location.pathname]);

  /* ── Hover line animation on footer links ── */
  const handleLinkEnter = (e) => {
    if (reducedMotion) return;
    const el = e.currentTarget;
    gsap.fromTo(el, { backgroundSize: "0% 2px" }, { backgroundSize: "100% 2px", duration: 0.28, ease: "power2.out" });
  };
  const handleLinkLeave = (e) => {
    if (reducedMotion) return;
    const el = e.currentTarget;
    gsap.to(el, { backgroundSize: "0% 2px", duration: 0.22, ease: "power2.in" });
  };

  const footerLink =
    "transition-colors duration-200 hover:text-accent bg-[length:0%_2px] bg-gradient-to-r bg-[position:0_100%] bg-no-repeat from-accent to-accent-cyan";

  const handleFooterNavClick = (e, to) => {
    if (to === location.pathname) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    transitionTo(to);
  };

  return (
    <footer className="relative overflow-hidden border-t border-accent/10 bg-ink px-4 pt-20 pb-14 md:px-8">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[radial-gradient(70%_120%_at_50%_-20%,rgba(65,105,225,0.36),transparent)]" aria-hidden />
      <div className="pointer-events-none absolute -left-24 -top-8 h-72 w-72 rounded-full bg-accent/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-accent-cyan/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-10 h-44 w-[70%] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" aria-hidden />

      {showBackToTop && (
        <a
          href="#hero"
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-[135] flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-ink/70 px-4 text-accent-cyan shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-200 hover:border-accent/40 hover:bg-ink/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </a>
      )}

      <div ref={innerRef} className="relative mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-[#07132b] shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          {/* Top gradient line */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent via-accent-cyan to-accent" />

          <div className="grid gap-10 p-8 md:p-10 lg:grid-cols-[1.15fr_0.9fr_1.15fr_0.95fr]">

            {/* Col 1 — Brand */}
            <div ref={col1Ref}>
              <a
                href="/"
                onClick={(e) => handleFooterNavClick(e, "/")}
                className="inline-flex items-center"
                aria-label="HIfAi home"
              >
                <img
                style={{ transform: "scale(1.4)", marginLeft: "10px" }}
                  src={logo1Url}
                  alt="HIfAi — human hand and robotic hand high-five"
                  className="h-16 w-auto object-contain object-left sm:h-[4.25rem] md:h-[4.5rem] lg:h-[4.75rem]"
                />
              </a>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
                <span className="font-semibold text-accent-cyan">HIfAi</span>{" "}
                brings forward what often goes unseen, shaping it into meaningful,
                real-world impact.
              </p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["AI Skills", "Project-based", "Institution Ready"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-accent/35 bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-cyan"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Col 2 — Navigation */}
            <nav ref={col2Ref} aria-label="Footer navigation" className="md:pl-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-cyan">Explore</p>
              <ul className="mt-4 space-y-3 text-sm font-medium text-white/80">
                {FOOTER_NAV_LINKS.map((l) => (
                  <li key={l.to}>
                    <a
                      href={l.to}
                      onClick={(e) => handleFooterNavClick(e, l.to)}
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                      className={`${footerLink} ${location.pathname === l.to ? "text-accent-cyan" : ""}`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Col 3 — Map */}
            <div ref={col3Ref} className="min-w-0 lg:pl-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-cyan">Location</p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/15 bg-black/20 shadow-inner">
                <iframe
                  title="HIfAi on Google Maps"
                  src={FOOTER_MAP_EMBED_SRC}
                  className="h-[200px] w-full border-0 sm:h-[220px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Col 4 — Contact */}
            <div ref={col4Ref} className="lg:pl-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-cyan">Contact</p>
              <address className="mt-4 space-y-4 text-sm not-italic leading-relaxed text-white/75">
                <p>{FOOTER_ADDRESS_LINE}</p>
                <p>
                  <a
                    href={`tel:${FOOTER_PHONE_TEL}`}
                    className="text-accent-cyan transition-colors hover:text-white"
                  >
                    {FOOTER_PHONE_DISPLAY}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${FOOTER_EMAIL}`}
                    className="text-accent-cyan transition-colors hover:text-white"
                  >
                    {FOOTER_EMAIL}
                  </a>
                </p>
              </address>
              <div className="mt-5 flex items-center gap-3">
                <a
                  href={FOOTER_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="HIfAi on WhatsApp"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:scale-105 hover:bg-[#20bd5a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07132b]"
                >
                  <SiWhatsapp className="h-6 w-6" aria-hidden />
                </a>
                <a
                  href={FOOTER_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="HIfAi on Instagram"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white shadow-[0_8px_24px_rgba(221,42,123,0.35)] transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07132b]"
                >
                  <SiInstagram className="h-6 w-6" aria-hidden />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            ref={bottomRef}
            className="flex flex-col gap-2 border-t border-white/15 bg-black/10 px-8 py-4 text-xs text-white/60 md:flex-row md:items-center md:justify-between md:px-10"
          >
            <p>© {new Date().getFullYear()} HIfAi Skills. All rights reserved.</p>
            <p>Designed for immersive digital innovation experiences.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}