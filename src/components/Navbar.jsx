import { useEffect, useRef } from "react";
import gsap from "gsap";

const links = [
  { label: "Services", href: "#services" },
  { label: "Who we serve", href: "#audience" },
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
];

export default function Navbar({ reducedMotion }) {
  const barRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || !barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, [reducedMotion]);

  return (
    <header
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-8"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-white/50 bg-white/50 px-4 py-3 shadow-glass backdrop-blur-xl md:px-6">
        <a
          href="#hero"
          className="font-display text-[1.05rem] font-normal tracking-[-0.006em] text-gradient md:text-[1.15rem]"
        >
          HIFAI Skills
        </a>
        <ul className="hidden items-center gap-6 text-sm font-medium text-ink/80 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative transition-colors hover:text-accent after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-accent after:to-accent-cyan after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#cta"
          data-magnetic
          className="rounded-full bg-gradient-to-r from-accent to-accent-cyan px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.03] hover:shadow-glow active:scale-[0.98]"
        >
          Join Now
        </a>
      </nav>
    </header>
  );
}
