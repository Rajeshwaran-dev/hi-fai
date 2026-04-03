import InnerPageLink from "../components/InnerPageLink.jsx";
import { FourCardFramework, SectionLabel } from "./subpageShared.jsx";

function CollegeProjectDetails() {
  const rows = [
    { label: "Duration", value: "3 months", emphasize: true },
    { label: "First phase", value: "April 15 – June 15", emphasize: true },
    { label: "Team size", value: "Minimum 4 – Maximum 5 students", emphasize: true },
    { label: "Capacity", value: "Only 10 teams per quarter", emphasize: true },
  ];

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-8"
      aria-labelledby="college-project-details-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl" aria-hidden />

      <SectionLabel>Program</SectionLabel>
      <h2
        id="college-project-details-heading"
        className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl"
      >
        Project Details
      </h2>

      <dl className="relative mt-6 space-y-0 divide-y divide-slate-200/80">
        {rows.map(({ label, value, emphasize }) => (
          <div
            key={label}
            className="flex flex-col gap-1 py-4 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <dt className="shrink-0 text-sm font-semibold text-slate-800">{label}</dt>
            <dd className="text-sm leading-relaxed text-slate-600 sm:text-right">
              {emphasize ? <em className="italic text-slate-800">{value}</em> : value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="relative mt-5 rounded-xl border border-blue-100/90 bg-gradient-to-r from-blue-50/90 to-cyan-50/50 px-4 py-3 text-sm text-slate-800">
        <em className="italic font-medium">Onsite access available</em>
      </p>
    </section>
  );
}

export function CollegeStudentsBody() {
  return (
    <FourCardFramework
      pillarTitles={["Discover", "Build", "Apply", "Validate"]}
      copy={[
        "Designed for college students to explore domains, ideas, and opportunities aligned with their career path.",
        "Develop practical skills by learning new technologies and collaborating in team-based environments.",
        "Work on real-time project tasks and gain hands-on experience by applying your knowledge in a structured project environment.",
        "Track your progress through continuous evaluation and mentorship. The project will be guided by the HIFAI IT Tech Head throughout, with reviews by the Director of Kanavoogle once every two weeks, and a final in-person review in Dindigul during the last two weeks. Certification will be issued upon successful completion and validation of the project.",
      ]}
      betweenCardsAndCta={<CollegeProjectDetails />}
      ctaTitle="Tell us about your program and goals"
    >
      <a
        href="mailto:hifaidgl@gmail.com?subject=College%20student%20project%20%28limited%20slots%29"
        className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
      >
        Limited team slots available
      </a>
      <InnerPageLink
        to="/get-started"
        className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
      >
        Register and join now
      </InnerPageLink>
    </FourCardFramework>
  );
}
