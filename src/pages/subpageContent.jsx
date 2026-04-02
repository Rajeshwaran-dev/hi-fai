import { useState } from "react";
import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Check,
  FlaskConical,
  GraduationCap,
  Handshake,
  Landmark,
  LineChart,
  Puzzle,
  Rocket,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";
import InnerPageLink from "../components/InnerPageLink.jsx";

function SectionLabel({ children }) {
  return (
    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">{children}</p>
  );
}

function SectionHeading({ children, as: Tag = "h2", className = "" }) {
  return (
    <Tag
      className={`text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl ${className}`}
    >
      {children}
    </Tag>
  );
}

function Lead({ children, className = "" }) {
  return (
    <p className={`mt-3 max-w-3xl text-base leading-relaxed text-slate-600 md:text-[17px] ${className}`}>
      {children}
    </p>
  );
}

function Card({ icon, title, children }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200/90 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition hover:border-blue-200/80 hover:shadow-md md:p-7">
      {icon ? (
        <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-lg ring-1 ring-blue-100/80">
          {icon}
        </span>
      ) : null}
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-slate-600">{children}</div>
    </article>
  );
}

function CheckList({ items }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((text) => (
        <li key={text} className="flex gap-3 text-sm leading-relaxed text-slate-600">
          <span
            className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-[10px] font-bold text-white"
            aria-hidden
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

function CtaBand({ title, children }) {
  return (
    <div className="relative mt-12 overflow-hidden rounded-[1.35rem] border border-blue-200/60 bg-gradient-to-br from-slate-900 via-[#0f2744] to-[#0a1734] p-8 text-center shadow-[0_20px_50px_rgba(15,23,42,0.25)] md:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"
      />
      <h3 className="relative text-xl font-bold text-white md:text-2xl">{title}</h3>
      <div className="relative mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">{children}</div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-flex rounded-full border border-blue-200 bg-blue-50/80 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
      {children}
    </span>
  );
}

/* ── School Students ── */
export function SchoolStudentsBody() {
  return (
    <>
      <div className="mb-10">
        <SectionLabel>Built for school learners</SectionLabel>
        <SectionHeading>AI literacy that feels human, creative, and age-right</SectionHeading>
        <Lead>
          HIfAi helps school students practice how to think with AI: asking better questions, checking outputs,
          combining human judgment with tools, and shipping small projects that matter in the real world.
        </Lead>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Card icon={<Target className="h-5 w-5 text-blue-600" strokeWidth={2.2} />} title="Foundations that stick">
          Short, guided modules on prompts, verification, privacy basics, and responsible use—always tied to
          activities you can try the same week.
        </Card>
        <Card icon={<Puzzle className="h-5 w-5 text-blue-600" strokeWidth={2.2} />} title="Project studios">
          Team-friendly sprints where you define a problem, prototype with AI as a teammate, and present what you
          learned—not just the final slide deck.
        </Card>
        <Card icon={<ShieldCheck className="h-5 w-5 text-blue-600" strokeWidth={2.2} />} title="Safety & confidence">
          Frameworks for spotting bias, citing sources, and knowing when *not* to automate—skills colleges and
          employers already expect.
        </Card>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 md:p-8">
          <SectionHeading as="h3" className="text-xl md:text-2xl">
            What a typical pathway looks like
          </SectionHeading>
          <CheckList
            items={[
              "Orientation: how modern AI works (without the hype)",
              "Skills labs: prompting, editing, data sense-checking, visual storytelling",
              "Innovation sprint: civic, school, or club challenge with mentor checkpoints",
              "Showcase: feedback rubrics that reward process and responsible use",
            ]}
          />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-blue-50/50 to-white p-6 md:p-8">
          <SectionHeading as="h3" className="text-xl md:text-2xl">
            Outcomes we design for
          </SectionHeading>
          <Lead>
            Students leave able to lead group projects with AI, explain their choices to teachers and parents,
            and continue learning as tools evolve.
          </Lead>
          <CheckList
            items={[
              "Clear artifact: mini-app, campaign, research brief, or media piece",
              "Reflection on limits, risks, and next experiments",
              "Portfolio line you can reuse for applications and interviews",
            ]}
          />
        </div>
      </div>

      <CtaBand title="Ready to join as a school student?">
        <InnerPageLink
          to="/get-started"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
        >
          Start your application
        </InnerPageLink>
        <InnerPageLink
          to="/learning-hub"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
        >
          Browse the Learning Hub
        </InnerPageLink>
      </CtaBand>
    </>
  );
}

/* ── College Students ── */
export function CollegeStudentsBody() {
  return (
    <>
      <div className="mb-10">
        <SectionLabel>University & early career</SectionLabel>
        <SectionHeading>From fluency to portfolio-ready innovation</SectionHeading>
        <Lead>
          For undergraduates and postgraduates, HIfAi connects rigorous AI practice with internships, research
          groups, and venture-style projects—so your work is credible to faculty and industry mentors alike.
        </Lead>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Card icon={<Zap className="h-5 w-5 text-blue-600" strokeWidth={2.2} />} title="Innovation labs">
          Cohort-based studios with weekly milestones: problem discovery, prototyping, user tests, and metrics
          that prove impact—not vanity downloads.
        </Card>
        <Card icon={<BarChart3 className="h-5 w-5 text-blue-600" strokeWidth={2.2} />} title="Workflow craftsmanship">
          Go deeper on evaluation, toolchains, documentation, and reproducibility so collaborators can trust your
          pipeline.
        </Card>
        <Card icon={<Handshake className="h-5 w-5 text-blue-600" strokeWidth={2.2} />} title="Mentor office hours">
          Live sessions with practitioners on product sense, ethics review, and storytelling for technical work.
        </Card>
        <Card icon={<Rocket className="h-5 w-5 text-blue-600" strokeWidth={2.2} />} title="Career signals">
          Interview storytelling, Git hygiene, and artifact selection aligned to roles in product, research, and
          mission-driven teams.
        </Card>
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 md:flex md:items-stretch md:gap-8 md:p-8">
        <div className="flex-1">
          <SectionHeading as="h3" className="text-xl">
            Tracks you can mix
          </SectionHeading>
          <Lead>
            Pick a spine—product, research, or public interest—and bolt on labs from our Learning Hub. Cohorts
            often pair with a faculty sponsor or club charter.
          </Lead>
        </div>
        <ul className="mt-6 flex shrink-0 flex-col gap-2 md:mt-0 md:w-72">
          {[
            "Build & ship track",
            "Responsible AI & policy briefs",
            "Data + storytelling for campaigns",
            "Research assist (literature, simulation, viz)",
          ].map((t) => (
            <li
              key={t}
              className="rounded-xl border border-blue-100 bg-blue-50/40 px-4 py-2.5 text-sm font-semibold text-slate-800"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <CtaBand title="Tell us about your program and goals">
        <InnerPageLink
          to="/get-started"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
        >
          Apply as a college student
        </InnerPageLink>
        <a
          href="mailto:hello@hifai.skills"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
        >
          Email hello@hifai.skills
        </a>
      </CtaBand>
    </>
  );
}

/* ── School Organizations ── */
export function SchoolOrganizationsBody() {
  return (
    <>
      <div className="mb-10">
        <SectionLabel>K–12 partnerships</SectionLabel>
        <SectionHeading>Curriculum-ready AI literacy for your whole school</SectionHeading>
        <Lead>
          HIfAi partners with school leaders, IT teams, and teachers to roll out age-appropriate programs,
          professional learning, and outcome analytics—without putting extra burden on staff who are already at
          capacity.
        </Lead>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card icon={<BookOpen className="h-5 w-5 text-blue-600" strokeWidth={2.2} />} title="Scope & pacing">
          Map your goals to term-length modules, electives, or club formats. We align to your bell schedule,
          device policy, and safeguarding requirements.
        </Card>
        <Card icon={<GraduationCap className="h-5 w-5 text-blue-600" strokeWidth={2.2} />} title="Educator enablement">
          Co-designed lesson guides, assessment rubrics, and live coaching on facilitation—not just slides dropped
          into a drive.
        </Card>
        <Card icon={<LineChart className="h-5 w-5 text-blue-600" strokeWidth={2.2} />} title="Evidence for leadership">
          Lightweight analytics on participation, competency checkpoints, and showcase quality to support board
          updates and grants.
        </Card>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <SectionHeading as="h3" className="text-xl">
            Implementation snapshots
          </SectionHeading>
          <CheckList
            items={[
              "Launch workshop for leadership + lead teachers",
              "Pilot in 1–2 grades or departments with mentor touchpoints",
              "Student showcase + family communication kit",
              "Scale toolkit for remaining grades and after-school tracks",
            ]}
          />
        </div>
        <div className="rounded-2xl border border-blue-200/70 bg-gradient-to-br from-blue-50/80 to-cyan-50/40 p-6 md:p-8">
          <SectionHeading as="h3" className="text-xl">
            Innovation Partner Network
          </SectionHeading>
          <Lead>
            Your team gets access to the same live mentoring, curriculum support, and analytics backbone described
            across HIfAi—structured so vendors, data, and pedagogy stay institution-owned.
          </Lead>
        </div>
      </div>

      <CtaBand title="Plan a conversation with our school partnerships team">
        <a
          href="mailto:hello@hifai.skills?subject=School%20organization%20partnership"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
        >
          Email to schedule
        </a>
        <InnerPageLink
          to="/get-started"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
        >
          Interest form
        </InnerPageLink>
      </CtaBand>
    </>
  );
}

/* ── College Organizations ── */
export function CollegeOrganizationsBody() {
  return (
    <>
      <div className="mb-10">
        <SectionLabel>Higher education</SectionLabel>
        <SectionHeading>Scale innovation programs without losing academic rigor</SectionHeading>
        <Lead>
          Departments, innovation centers, and student clubs use HIfAi to run multi-disciplinary studios,
          faculty co-design sprints, and employer-backed challenges—with shared rubrics and mentor capacity you can
          plan around.
        </Lead>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Card icon={<Landmark className="h-5 w-5 text-blue-600" strokeWidth={2.2} />} title="Certificates & minors">
          Stack our project sequences into credit-bearing paths or co-curricular credentials with clear
          learning outcomes.
        </Card>
        <Card icon={<FlaskConical className="h-5 w-5 text-blue-600" strokeWidth={2.2} />} title="Research adjacent support">
          Responsible use playbooks for literature acceleration, experiment design, and cross-lab collaboration
          protocols.
        </Card>
        <Card icon={<BriefcaseBusiness className="h-5 w-5 text-blue-600" strokeWidth={2.2} />} title="Industry bridges">
          Joint briefings with hiring partners on portfolios, take-home expectations, and ethics screens.
        </Card>
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50">
        <div className="grid md:grid-cols-2">
          <div className="p-6 md:p-8">
            <SectionHeading as="h3" className="text-xl">
              What we co-create
            </SectionHeading>
            <CheckList
              items={[
                "Program charter: audience, mentors, risk guardrails, success metrics",
                "Term roadmap with faculty champions and student leads",
                "Portfolio review days + employer office hours",
                "Closing analytics package for accreditations and sponsors",
              ]}
            />
          </div>
          <div className="border-t border-slate-200 bg-gradient-to-br from-[#0a1734] to-[#102b57] p-6 text-white md:border-l md:border-t-0 md:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200/90">Partner ops</p>
            <p className="mt-3 text-sm leading-relaxed text-blue-100/90">
              Dedicated slack for leads, scheduled mentor rotations, and curriculum version control so your
              wiki does not drift from what students experience in the room.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-white/95">
              <li>• SSO-friendly rollout patterns</li>
              <li>• GDPR-aligned data handling discussions</li>
              <li>• Option for embedded HIfAi fellow on campus</li>
            </ul>
          </div>
        </div>
      </div>

      <CtaBand title="Invite HIfAi into your next term">
        <a
          href="mailto:hello@hifai.skills?subject=College%20organization%20partnership"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
        >
          Contact partnerships
        </a>
        <InnerPageLink
          to="/learning-hub"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
        >
          See facilitator resources
        </InnerPageLink>
      </CtaBand>
    </>
  );
}

/* ── Learning Hub ── */
const resources = [
  {
    tag: "Starter",
    title: "AI literacy primer for classrooms",
    blurb: "A one-page readiness checklist plus discussion starters for families and advisors.",
  },
  {
    tag: "Studio",
    title: "Sprint playbook: 10 school-day blocks",
    blurb: "Milestones, standup prompts, and rubric snippets for showcasing responsible use.",
  },
  {
    tag: "Policy",
    title: "Acceptable use + escalation templates",
    blurb: "Language you can adapt for handbooks, clubs, and innovation labs.",
  },
  {
    tag: "Advanced",
    title: "Evaluation harness for student projects",
    blurb: "Lightweight criteria for accuracy, originality, and collaboration using AI tools.",
  },
  {
    tag: "Career",
    title: "Portfolio review guide",
    blurb: "How to narrate human judgment, toolchains, and trade-offs recruiters care about.",
  },
  {
    tag: "Community",
    title: "Partner office hours calendar",
    blurb: "Monthly open sessions on facilitation challenges and new tool releases.",
  },
];

export function LearningHubBody() {
  return (
    <>
      <div className="mb-10">
        <SectionLabel>Resources & playbooks</SectionLabel>
        <SectionHeading>Practical kits for students, teachers, and org leads</SectionHeading>
        <Lead>
          The Learning Hub centralizes the templates, facilitation notes, and office-hour recordings that keep
          HIfAi programs consistent—whether you are running a first pilot or your fifth campus showcase.
        </Lead>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((r) => (
          <article
            key={r.title}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
          >
            <Tag>{r.tag}</Tag>
            <h3 className="mt-3 text-base font-bold text-slate-900">{r.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{r.blurb}</p>
            <span className="mt-4 text-xs font-semibold text-blue-600">Included with active cohorts →</span>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-dashed border-blue-300/80 bg-blue-50/30 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <SectionHeading as="h3" className="text-xl">
              Looking for a tailored resource?
            </SectionHeading>
            <Lead className="mt-2">
              Tell us your grade band, subject area, or policy constraints—we prioritize hub updates from real
              partner requests.
            </Lead>
          </div>
          <a
            href="mailto:hello@hifai.skills?subject=Learning%20Hub%20request"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Request a topic
          </a>
        </div>
      </div>

      <CtaBand title="New to HIfAi? Start with the student pathways">
        <InnerPageLink
          to="/students/school-students"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
        >
          School students
        </InnerPageLink>
        <InnerPageLink
          to="/students/college-students"
          className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
        >
          College students
        </InnerPageLink>
      </CtaBand>
    </>
  );
}

/* ── Get Started ── */
export function GetStartedBody() {
  const [tab, setTab] = useState("school-org");

  const tabOptions = [
    { id: "school-org", label: "High school" },
    { id: "college-org", label: "University" },
    { id: "school-student", label: "School Students" },
    { id: "college-student", label: "College Students" },
  ];

  return (
    <>
      <div className="mb-10">
        <SectionLabel>Join a cohort</SectionLabel>
        <SectionHeading>Tell us who you are—we will route your request to the right team</SectionHeading>
        <Lead>
          Applications are reviewed weekly. Schools and universities can share procurement details in the notes
          field; students should use a supervised email where possible.
        </Lead>
      </div>

      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_32px_rgba(15,23,42,0.06)] md:p-8">
        <div className="mx-auto grid w-full max-w-3xl grid-cols-2 gap-1.5 rounded-[1rem] bg-slate-100 p-1.5 shadow-inner md:grid-cols-4">
          {tabOptions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-[0.7rem] px-3 py-2.5 text-sm font-semibold transition-all ${
                tab === item.id
                  ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">First name</span>
              <input
                type="text"
                placeholder="Jane"
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">Last name</span>
              <input
                type="text"
                placeholder="Doe"
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">{tab === "school-org" ? "Grades covered" : tab === "college-org" ? "Institution type" : tab === "school-student" ? "Grade" : "Program"}</span>
              <select className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20">
                {tab === "school-org" ? (
                  <>
                    <option>Select grade range</option>
                    <option>Middle school (Grades 6-8)</option>
                    <option>Secondary (Grades 9-10)</option>
                    <option>Senior secondary (Grades 11-12)</option>
                    <option>K-12 mixed</option>
                  </>
                ) : tab === "college-org" ? (
                  <>
                    <option>Select institution type</option>
                    <option>University</option>
                    <option>College</option>
                    <option>Research institute</option>
                    <option>Innovation center</option>
                  </>
                ) : tab === "school-student" ? (
                  <>
                    <option>Select grade</option>
                    <option>Grade 8</option>
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
                    <option>PhD</option>
                  </>
                )}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">{tab === "school-org" ? "School name" : tab === "college-org" ? "Institution name" : tab === "school-student" ? "School name" : "University name"}</span>
              <input
                type="text"
                placeholder={tab === "school-org" ? "Your high school" : tab === "college-org" ? "Your institution" : tab === "school-student" ? "Your school" : "Your university"}
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
            </label>
            {tab === "school-org" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Your role</span>
                <select className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20">
                  <option>Select role</option>
                  <option>Principal / Vice Principal</option>
                  <option>Teacher</option>
                  <option>Curriculum coordinator</option>
                  <option>IT / Innovation lead</option>
                </select>
              </label>
            ) : null}
            {tab === "college-org" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Department / center</span>
                <input
                  type="text"
                  placeholder="e.g. Computer Science Department"
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                />
              </label>
            ) : null}
            {tab === "school-student" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Parent/guardian email</span>
                <input
                  type="email"
                  placeholder="guardian@email.com"
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                />
              </label>
            ) : null}
            {tab === "college-student" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Major / focus area</span>
                <input
                  type="text"
                  placeholder="e.g. Data Science"
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                />
              </label>
            ) : null}
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-800">
                {tab === "school-org" || tab === "college-org" ? "Partnership goals / notes" : "Learning goals / notes"}
              </span>
              <textarea
                rows={3}
                placeholder={
                  tab === "school-org" || tab === "college-org"
                    ? "e.g. pilot cohort size, timeline, procurement contact..."
                    : "e.g. AI topics you want to learn, project interests..."
                }
                className="w-full resize-y rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">Phone</span>
              <input
                type="tel"
                placeholder="+1 ••• ••• ••••"
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">Email</span>
              <input
                type="email"
                placeholder="you@school.edu"
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
            </label>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <InnerPageLink
              to="/"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              Back to home
            </InnerPageLink>
            <button
              type="submit"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
            >
              Submit application
            </button>
          </div>
        </form>
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center text-sm text-slate-500">
        Prefer email? Reach us directly at{" "}
        <a href="mailto:hello@hifai.skills" className="font-semibold text-blue-600 hover:underline">
          hello@hifai.skills
        </a>
        .
      </p>
    </>
  );
}
