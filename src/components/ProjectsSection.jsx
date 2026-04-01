import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: "p1",
    title: "AI Skills Studio",
    summary:
      "Learners build practical AI workflows and present evidence-based outcomes across weekly sprint checkpoints.",
    meta: ["12 Modules", "Beginner to Advanced", "Portfolio-ready"],
    accent: "from-blue-600/20 to-cyan-400/10",
  },
  {
    id: "p2",
    title: "Digital Problem Labs",
    summary:
      "Teams apply the ABCD method to real scenarios, test solutions, and refine delivery through mentor feedback.",
    meta: ["48+ Project Briefs", "Team-based", "Industry-style"],
    accent: "from-cyan-500/20 to-blue-500/10",
  },
  {
    id: "p3",
    title: "Institution Innovation Tracks",
    summary:
      "Schools and universities launch guided project tracks aligned with future-of-work outcomes and measurable impact.",
    meta: ["School + University", "Implementation Support", "Outcome Analytics"],
    accent: "from-indigo-500/20 to-sky-400/10",
  },
];

export default function ProjectsSection({ reducedMotion, isMobile }) {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || !cards.length) return;

    if (reducedMotion) {
      gsap.set(cards, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      if (introRef.current) {
        gsap.from(introRef.current.children, {
          y: isMobile ? 16 : 26,
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

      gsap.from(cards, {
        y: isMobile ? 20 : 34,
        opacity: 0,
        stagger: isMobile ? 0.1 : 0.14,
        duration: isMobile ? 0.55 : 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 76%",
          toggleActions: "play none none none",
        },
      });

      if (!isMobile) {
        cards.forEach((card, i) => {
          gsap.to(card, {
            y: i % 2 ? -6 : -10,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.45,
            },
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  return (
    <section id="projects" ref={sectionRef} className="relative px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div ref={introRef} className="mb-12 max-w-3xl md:mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Projects in action</p>
          <h2 className="mt-2 font-geom-heading text-[clamp(1.8rem,4.6vw,3.1rem)] font-normal leading-[1.3] tracking-[-0.012em] text-ink">
            Real-world project journeys built for measurable outcomes
          </h2>
          <p className="mt-4 text-ink/65 md:text-lg">
            A focused project layer built from your existing programs, briefs, and showcase model.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <article
              key={project.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="group relative overflow-hidden rounded-[1.6rem] border border-white/75 bg-white/75 p-6 shadow-[0_16px_40px_rgba(9,15,26,0.08)] backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-blue-300/50 hover:shadow-[0_22px_56px_rgba(37,99,235,0.18)] md:p-7"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500" aria-hidden />
              <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${project.accent} blur-2xl`} aria-hidden />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600/90">Project 0{i + 1}</p>
                <h3 className="mt-3 font-geom-heading text-[1.28rem] font-normal leading-[1.2] tracking-[-0.01em] text-ink">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70 md:text-base">{project.summary}</p>

                <ul className="mt-5 space-y-2 border-t border-blue-100/90 pt-4 text-sm text-ink/75">
                  {project.meta.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
