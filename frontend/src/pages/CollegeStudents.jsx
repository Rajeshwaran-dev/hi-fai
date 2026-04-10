import InnerPageLink from "../components/InnerPageLink.jsx";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { GetStartedFormModal } from "./GetStarted.jsx";
import {
  FourCardFramework,
  ORBIT_ICONS_DISCOVER_CYCLE,
  OrbitCenterPageTitle,
  SectionLabel,
} from "./subpageShared.jsx";

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

function DigitalAbcdProjectsModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex min-h-[100dvh] w-full items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="digital-abcd-modal-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[min(92dvh,880px)] w-full max-w-2xl flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.35)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:right-4 sm:top-4"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <h2
          id="digital-abcd-modal-title"
          className="pr-10 font-geom-heading text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
        >
          Digital ABCD Projects
        </h2>
        <div className="mt-4 min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain pr-1 text-sm leading-relaxed text-slate-700">
          <p className="text-slate-600">
            HIfAI&apos;s projects are designed to provide all students with a unique opportunity to
            apply their skills to solve real problems. The experienced HIfAi team will guide the
            student teams to make effective and novel use of Digital ABCD (AI, Blockchain, Cloud
            and Data) technologies in their solutions. All projects will have the following
            characteristics.
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <span className="font-semibold text-slate-800">Duration:</span> 12 weeks
            </li>
            <li>
              <span className="font-semibold text-slate-800">Problem Origination Domain:</span>{" "}
              Finance or Health or Education or Defence (teams can choose their preferred domain).
            </li>
            <li>
              <span className="font-semibold text-slate-800">Team size:</span> 3 to 5 max
            </li>
          </ul>

          <div>
            <h3 className="text-base font-bold text-slate-900">Proposed schedule</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold text-slate-800">Week 1 –</span> Develop an agile
                mindset (time management, cost and quality control of your work).
              </li>
              <li>
                <span className="font-semibold text-slate-800">Week 2 –</span> Develop sprint-level
                feature plan to be developed and delivered over 10 weeks.
              </li>
              <li>
                <span className="font-semibold text-slate-800">Week 3 to 10 –</span> Design,
                develop, evaluate, and deploy the prioritised features of your solution.
              </li>
              <li>
                <span className="font-semibold text-slate-800">Week 11 and 12 –</span> Demonstrate
                the outcomes, submit a report, and complete skill evaluation tests.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">HiFAI included services</h3>
            <ul className="mt-2 list-disc space-y-3 pl-5">
              <li>
                <span className="font-semibold text-slate-800">Week 1 –</span> Learn to be an agile
                mindful individual.
                <ul className="mt-1.5 list-[circle] space-y-1 pl-5">
                  <li>Agile development sprints</li>
                  <li>21st century skills needed to be demonstrated in these projects.</li>
                  <li>
                    Understand the difference between effective and novel use of any technology
                    (based on award-winning Kanavoogle&apos;s founder&apos;s research).
                  </li>
                </ul>
              </li>
              <li>
                <span className="font-semibold text-slate-800">Week two to week 10:</span>
                <ul className="mt-1.5 list-[circle] space-y-1 pl-5">
                  <li>
                    A 2-hour guidance session from the HIfAi team every week.
                    <ul className="mt-1 list-[square] space-y-1 pl-5 text-slate-600">
                      <li>
                        1 hour for helping your team plan roles, responsibilities, scope, and
                        deliverables for the project.
                      </li>
                      <li>1 hour for any technical guidance.</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <span className="font-semibold text-slate-800">Week 11–12 –</span> Answers to Q&amp;A
                via emails and short team-level calls.
              </li>
              <li>
                <span className="font-semibold text-slate-800">Week 12 –</span> Review and assess
                the final reports for 21st century skills demonstrated.
              </li>
              <li>
                <span className="font-semibold text-slate-800">Week 15 –</span> A skills certificate
                based on authentic assessment-based evaluation of skills demonstrated by each
                student during the 12-week project.
              </li>
              <li>
                <span className="font-semibold text-slate-800">Week 16 –</span> A customized
                experience letter for each student signed by Kanavoogle and HIfAi directors.
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-slate-800">
            <p className="font-semibold text-amber-950">Bonus: From week 10 to 12</p>
            <p className="mt-2">
              The SCRUM master in each team may be given access to Kanavoogle large Dell servers
              (one is designed to manage blockchain workloads) and one large GPU server (to evaluate
              your AI-based solution). The Kanavoogle team will decide this based on the needs of the
              project and the progress shown by the individual teams in week 8/9.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">Team-level expectations</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                An innovative and original digital solution that needs to be designed and developed
                by the team.
              </li>
              <li>
                Each team can choose and develop a solution by making either effective or novel use
                of Digital ABCD using the knowledge gained in their degrees.
              </li>
              <li>
                Each team must have 4 or 5 members (max). Ideal teams should have a combination:
                one AI expert, one DS expert, one CS expert, and one cyber or IS expert.
              </li>
              <li>
                Expected hours to be spent on the project by every member in the team: 15 to 20 hours
                (2 to 3 hours per day max).
              </li>
              <li>
                The total effort expectations from a team of 4: 960 hours across 12 weeks.
              </li>
            </ul>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full shrink-0 rounded-xl bg-gradient-to-r from-[#1483ff] to-[#21b9ff] py-3 text-center text-sm font-semibold text-white shadow-md transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-auto sm:px-8"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}

export function CollegeStudentsBody() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isHubModalOpen, setIsHubModalOpen] = useState(false);

  return (
    <>
      <FourCardFramework
        ctaBelowCards
        layoutMode="orbit"
        cardsCenterOverlay={
          <OrbitCenterPageTitle
            title="Digital ABCD"
            subtitle="Projects"
            onClick={() => setIsHubModalOpen(true)}
            className="max-w-[11.5rem] min-h-[6.25rem] min-w-[6.25rem] sm:max-w-[12.5rem] sm:min-h-[6.75rem] sm:min-w-[6.75rem]"
          />
        }
        pillarIcons={ORBIT_ICONS_DISCOVER_CYCLE}
        pillarTitles={["Explore", "Evaluate", "Expand", "Excel"]}
        copy={[
          "Learn  Agility and Time management and choose a futuristic industry problem and choice of digital ABCD that aligns with your long term goals",
          "Design a unique solution that makes novel use of Digital ABCD technologies to show your teams creativity",
          "Develop the must have components and validate the quality of your outcomes with critical analysis and effective communications",
          "Show your project outcomes to prospective employers to prove your 21st century skills"
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
          href="mailto:innovate@hifaiskills.io?subject=College%20student%20project%20%28limited%20slots%29"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
        >
          Limited team slots available
        </a>
        <button
          type="button"
          onClick={() => setIsFormOpen(true)}
          className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          Register and Join Now
        </button>
      </FourCardFramework>
      <GetStartedFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialTab="college-student"
      />
      <DigitalAbcdProjectsModal
        isOpen={isHubModalOpen}
        onClose={() => setIsHubModalOpen(false)}
      />
    </>
  );
}
