import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Lead, SectionHeading } from "./subpageShared.jsx";

const tabOptions = [
  { id: "school-org", label: "Schools" },
  { id: "college-org", label: "Universities" },
  { id: "school-student", label: "School Students" },
  { id: "college-student", label: "College Students" },
];
const DEFAULT_TAB = "school-org";

function getInitialTabFromSearch(search) {
  const requestedTab = new URLSearchParams(search).get("tab");
  if (!requestedTab) return DEFAULT_TAB;
  return tabOptions.some((item) => item.id === requestedTab)
    ? requestedTab
    : DEFAULT_TAB;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE_RE = /^\+?[0-9\s\-()]{8,}$/;
const SCHOOL_STUDENT_APP_LINK = "/learning-hub";

let razorpayScriptPromise = null;

function loadRazorpayScript() {
  if (window.Razorpay) return Promise.resolve(true);
  if (razorpayScriptPromise) return razorpayScriptPromise;

  razorpayScriptPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
}

export function GetStartedFormPanel({
  initialTab = "school-org",
  lockTab = false,
  showHeader = true,
  showEmailHint = true,
  containerClassName = "mx-auto w-full max-w-6xl",
}) {
  const [tab, setTab] = useState(initialTab);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gradeOrProgram: "",
    institution: "",
    role: "",
    department: "",
    guardianEmail: "",
    major: "",
    notes: "",
    phone: "",
    email: "",
  });
  const [studentCount, setStudentCount] = useState(1);
  const [studentEntries, setStudentEntries] = useState([
    { name: "", email: "" },
    { name: "", email: "" },
    { name: "", email: "" },
    { name: "", email: "" },
  ]);
  const [errors, setErrors] = useState({});
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const setField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };
  const setStudentField = (index, field, value) => {
    setStudentEntries((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
    setErrors((prev) => ({ ...prev, [`student-${field}-${index}`]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    const isCollegeStudent = tab === "college-student";
    const activeStudents = studentEntries.slice(0, studentCount);

    if (!isCollegeStudent) {
      if (!formData.firstName.trim()) nextErrors.firstName = "First name is required.";
      if (!formData.lastName.trim()) nextErrors.lastName = "Last name is required.";
    }
    if (!formData.gradeOrProgram) nextErrors.gradeOrProgram = "Please select an option.";
    if (!formData.institution.trim()) nextErrors.institution = "This field is required.";
    if (!formData.notes.trim()) nextErrors.notes = "Please add your goals / notes.";
    if (!formData.phone.trim()) nextErrors.phone = "Phone is required.";
    else if (!PHONE_RE.test(formData.phone.trim())) nextErrors.phone = "Enter a valid phone number.";
    if (!isCollegeStudent) {
      if (!formData.email.trim()) nextErrors.email = "Email is required.";
      else if (!EMAIL_RE.test(formData.email.trim())) nextErrors.email = "Enter a valid email address.";
    }

    if (tab === "school-org" && !formData.role) nextErrors.role = "Please select your role.";
    if (tab === "college-org" && !formData.department.trim()) nextErrors.department = "Department / center is required.";
    if (tab === "school-student") {
      if (!formData.guardianEmail.trim()) nextErrors.guardianEmail = "Parent/guardian email is required.";
      else if (!EMAIL_RE.test(formData.guardianEmail.trim())) nextErrors.guardianEmail = "Enter a valid parent/guardian email.";
    }
    if (tab === "college-student") {
      if (!formData.major.trim()) nextErrors.major = "Major / focus area is required.";
      activeStudents.forEach((student, i) => {
        if (!student.name.trim()) nextErrors[`student-name-${i}`] = "Student name is required.";
        if (!student.email.trim()) nextErrors[`student-email-${i}`] = "Student email is required.";
        else if (!EMAIL_RE.test(student.email.trim())) nextErrors[`student-email-${i}`] = "Enter a valid student email.";
      });
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const isStudentFlow = tab === "college-student";
    if (!isStudentFlow) {
      window.alert("Enquiry submitted successfully.");
      return;
    }

    setIsPaying(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        window.alert("Unable to load payment gateway. Please try again.");
        return;
      }

      const key = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_1DP5mmOlF5G5ag";
      const firstStudent = studentEntries[0];
      const fullName = tab === "college-student"
        ? firstStudent.name.trim()
        : `${formData.firstName} ${formData.lastName}`.trim();
      const paymentEmail = tab === "college-student"
        ? firstStudent.email.trim()
        : formData.email;

      const rzp = new window.Razorpay({
        key,
        amount: 0,
        currency: "INR",
        name: "HIfAi Skills",
        description: "Get Started Application",
        prefill: {
          name: fullName,
          email: paymentEmail,
          contact: formData.phone,
        },
        notes: {
          formType: tab,
        },
        theme: {
          color: "#1483ff",
        },
        handler: () => {},
      });

      rzp.on("payment.failed", () => {});
      rzp.open();
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className={containerClassName}>
      {showHeader ? (
        <div className="mb-10 text-center">
          <SectionHeading>Start your journey</SectionHeading>
          <Lead className="mx-auto">
            Tell us a little about you and we&apos;ll take it from there to guide you in the right direction.
          </Lead>
        </div>
      ) : null}

      <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_32px_rgba(15,23,42,0.06)] md:p-8">
        {!lockTab ? (
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
        ) : null}

        <form
          className="mt-6 space-y-4"
          onSubmit={handleSubmit}
        >
          {tab === "college-student" ? (
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">How many students</span>
              <select
                value={studentCount}
                onChange={(e) => setStudentCount(Number(e.target.value))}
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 md:max-w-[18rem]"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </label>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            {tab !== "college-student" ? (
              <>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-800">First name</span>
                  <input
                    type="text"
                    placeholder="Jane"
                    value={formData.firstName}
                    onChange={(e) => setField("firstName", e.target.value)}
                    className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                  />
                  {errors.firstName ? <span className="mt-1 block text-xs text-red-600">{errors.firstName}</span> : null}
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-800">Last name</span>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setField("lastName", e.target.value)}
                    className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                  />
                  {errors.lastName ? <span className="mt-1 block text-xs text-red-600">{errors.lastName}</span> : null}
                </label>
              </>
            ) : (
              Array.from({ length: studentCount }).map((_, i) => (
                <div key={`student-${i}`} className="contents">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-800">
                      Student Name {studentCount > 1 ? i + 1 : ""}
                    </span>
                    <input
                      type="text"
                      placeholder="Student name"
                      value={studentEntries[i].name}
                      onChange={(e) => setStudentField(i, "name", e.target.value)}
                      className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                    />
                    {errors[`student-name-${i}`] ? (
                      <span className="mt-1 block text-xs text-red-600">{errors[`student-name-${i}`]}</span>
                    ) : null}
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-800">
                      Student Email ID {studentCount > 1 ? i + 1 : ""}
                    </span>
                    <input
                      type="email"
                      placeholder="student@email.com"
                      value={studentEntries[i].email}
                      onChange={(e) => setStudentField(i, "email", e.target.value)}
                      className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                    />
                    {errors[`student-email-${i}`] ? (
                      <span className="mt-1 block text-xs text-red-600">{errors[`student-email-${i}`]}</span>
                    ) : null}
                  </label>
                </div>
              ))
            )}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">
                {tab === "school-org"
                  ? "Grades covered"
                  : tab === "college-org"
                    ? "Institution type"
                    : tab === "school-student"
                      ? "Grade"
                      : "Program"}
              </span>
              <select
                value={formData.gradeOrProgram}
                onChange={(e) => setField("gradeOrProgram", e.target.value)}
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              >
                {tab === "school-org" ? (
                  <>
                    <option value="">Select grade range</option>
                    <option value="Middle school (Grades 6-8)">Middle school (Grades 6-8)</option>
                    <option value="Secondary (Grades 9-10)">Secondary (Grades 9-10)</option>
                    <option value="Senior secondary (Grades 11-12)">Senior secondary (Grades 11-12)</option>
                    <option value="K-12 mixed">K-12 mixed</option>
                  </>
                ) : tab === "college-org" ? (
                  <>
                    <option value="">Select institution type</option>
                    <option value="University">University</option>
                    <option value="College">College</option>
                    <option value="Research institute">Research institute</option>
                    <option value="Innovation center">Innovation center</option>
                  </>
                ) : tab === "school-student" ? (
                  <>
                    <option value="">Select grade</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </>
                ) : (
                  <>
                    <option value="">Select program</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Diploma">Diploma</option>
                    <option value="PhD">PhD</option>
                  </>
                )}
              </select>
              {errors.gradeOrProgram ? <span className="mt-1 block text-xs text-red-600">{errors.gradeOrProgram}</span> : null}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">
                {tab === "school-org"
                  ? "School name"
                  : tab === "college-org"
                    ? "Institution name"
                    : tab === "school-student"
                      ? "School name"
                      : "University name"}
              </span>
              <input
                type="text"
                placeholder={
                  tab === "school-org"
                    ? "Your high school"
                    : tab === "college-org"
                      ? "Your institution"
                      : tab === "school-student"
                        ? "Your school"
                        : "Your university"
                }
                value={formData.institution}
                onChange={(e) => setField("institution", e.target.value)}
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
              {errors.institution ? <span className="mt-1 block text-xs text-red-600">{errors.institution}</span> : null}
            </label>
            {tab === "school-org" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Your role</span>
                <select
                  value={formData.role}
                  onChange={(e) => setField("role", e.target.value)}
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                >
                  <option value="">Select role</option>
                  <option value="Principal / Vice Principal">Principal / Vice Principal</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Curriculum coordinator">Curriculum coordinator</option>
                  <option value="IT / Innovation lead">IT / Innovation lead</option>
                </select>
                {errors.role ? <span className="mt-1 block text-xs text-red-600">{errors.role}</span> : null}
              </label>
            ) : null}
            {tab === "college-org" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Department / center</span>
                <input
                  type="text"
                  placeholder="e.g. Computer Science Department"
                  value={formData.department}
                  onChange={(e) => setField("department", e.target.value)}
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                />
                {errors.department ? <span className="mt-1 block text-xs text-red-600">{errors.department}</span> : null}
              </label>
            ) : null}
            {tab === "school-student" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Parent/guardian email</span>
                <input
                  type="email"
                  placeholder="guardian@email.com"
                  value={formData.guardianEmail}
                  onChange={(e) => setField("guardianEmail", e.target.value)}
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                />
                {errors.guardianEmail ? <span className="mt-1 block text-xs text-red-600">{errors.guardianEmail}</span> : null}
              </label>
            ) : null}
            {tab === "college-student" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Major / focus area</span>
                <input
                  type="text"
                  placeholder="e.g. Data Science"
                  value={formData.major}
                  onChange={(e) => setField("major", e.target.value)}
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                />
                {errors.major ? <span className="mt-1 block text-xs text-red-600">{errors.major}</span> : null}
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
                value={formData.notes}
                onChange={(e) => setField("notes", e.target.value)}
                className="w-full resize-y rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
              {errors.notes ? <span className="mt-1 block text-xs text-red-600">{errors.notes}</span> : null}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">Phone</span>
              <input
                type="tel"
                placeholder="+1 ••• ••• ••••"
                value={formData.phone}
                onChange={(e) => setField("phone", e.target.value)}
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
              />
              {errors.phone ? <span className="mt-1 block text-xs text-red-600">{errors.phone}</span> : null}
            </label>
            {tab !== "college-student" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Email</span>
                <input
                  type="email"
                  placeholder="you@school.edu"
                  value={formData.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                />
                {errors.email ? <span className="mt-1 block text-xs text-red-600">{errors.email}</span> : null}
              </label>
            ) : null}
          </div>

          <div className="flex gap-3 pt-2 sm:justify-center sm:gap-4">
            <button
              type="submit"
              disabled={isPaying}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
            >
              {tab === "school-org" || tab === "college-org" || tab === "school-student"
                ? "Enquire Now"
                : isPaying
                  ? "Processing..."
                  : "Pay Now"}
            </button>
            {tab === "school-student" ? (
              <a
                href={SCHOOL_STUDENT_APP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                App Link
              </a>
            ) : null}
          </div>
        </form>
      </div>

      {showEmailHint ? (
        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-slate-500">
          Prefer email? Reach us directly at{" "}
          <a href="mailto:innovate@hifaiskills.io" className="font-semibold text-blue-600 hover:underline">
            innovate@hifaiskills.io
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}

export function GetStartedFormModal({ isOpen, onClose, initialTab }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex min-h-[100dvh] items-start justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Get Started form"
      onClick={onClose}
    >
      <div className="relative mt-8 w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-2 -top-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
          aria-label="Close form popup"
        >
          <X className="h-4 w-4" />
        </button>
        <GetStartedFormPanel
          initialTab={initialTab}
          lockTab
          showHeader={false}
          showEmailHint={false}
          containerClassName="mx-auto w-full"
        />
      </div>
    </div>,
    document.body
  );
}

export function GetStartedBody() {
  const location = useLocation();
  return <GetStartedFormPanel initialTab={getInitialTabFromSearch(location.search)} />;
}
