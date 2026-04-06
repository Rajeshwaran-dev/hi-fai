import InnerPageLink from "../components/InnerPageLink.jsx";
import { FourCardFramework, SectionLabel } from "./subpageShared.jsx";

function CollegeProjectDetails() {
  const rows = [
    { label: "Duration", value: "3 months", emphasize: true },
    { label: "First phase", value: "April 15-July 15", emphasize: true },
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
      ctaBelowCards
      pillarTitles={["Discover", "Build", "Apply", "Validate"]}
      copy={[
        "It starts with awareness. Explore possibilities, understand your strengths, and begin shaping a direction that feels truly yours.",
        "This is where skills take form. Engage with real-time technologies, collaborate, and build projects that are designed around your strengths and thinking.",
        "Step into real execution. Work on live project tasks, apply what you've learned, and start solving problems in a structured, real-time project environment.",
        "Watch your progress turn into something real. With continuous evaluation and mentorship, every step is guided and helping you improve, refine, and grow with clarity.",
      ]}
      betweenCardsAndCta={
        <>
          <p className="mx-auto mb-10 max-w-4xl text-center text-base leading-relaxed text-slate-700 md:text-lg">
            Your project is supported throughout by the HIfAi IT Tech Head, with structured reviews by the Director
            of Kanavoogle every two weeks, followed by a final in-person review in Dindigul. And at the end—your work
            doesn&apos;t just stay as experience. It gets recognized with certification that reflects what you&apos;ve
            built and achieved.
          </p>
          <CollegeProjectDetails />
        </>
      }
      ctaTitle="Start building your real-world experience"
    >
      <a
        href="mailto:innovate@hifai.io?subject=College%20student%20project%20%28limited%20slots%29"
        className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
      >
        Limited team slots available
      </a>
      <InnerPageLink
        to="/get-started"
        className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
      >
        Register and Join Now
      </InnerPageLink>
    </FourCardFramework>
  );
}
