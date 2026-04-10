import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import SubmissionSuccessModal from "../components/SubmissionSuccessModal.jsx";
import { Lead, SectionHeading } from "./subpageShared.jsx";
import sampleQrImage from "../assets/images/qr.png?url";

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
const PHONE_RE = /^\d{10}$/;
const SCHOOL_STUDENT_APP_LINK = "/learning-hub";
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3003";
const sanitizeEmailInput = (value = "") =>
  String(value).replace(/[^a-zA-Z0-9@._-]/g, "");
const sanitizePhoneInput = (value = "") =>
  String(value).replace(/\D/g, "").slice(0, 10);

const COLLEGE_PRICE_PER_STUDENT = 12_000;
const COLLEGE_STUDENT_COUNT_MIN = 3;
const COLLEGE_STUDENT_COUNT_MAX = 5;

function formatPayAmountInr(amount) {
  if (amount == null || amount <= 0) return "—";
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

/** Total due for `count` students (₹12,000 each). */
function getCollegeTotalAmount(count) {
  const n = Number(count);
  if (!Number.isFinite(n) || n < COLLEGE_STUDENT_COUNT_MIN || n > COLLEGE_STUDENT_COUNT_MAX) {
    return null;
  }
  return n * COLLEGE_PRICE_PER_STUDENT;
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
    fullName: "",
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
  /** Empty until user selects; one student row is shown before selection. */
  const [studentCount, setStudentCount] = useState("");
  const [studentEntries, setStudentEntries] = useState([
    { name: "", email: "", phone: "" },
    { name: "", email: "", phone: "" },
    { name: "", email: "", phone: "" },
    { name: "", email: "", phone: "" },
    { name: "", email: "", phone: "" },
  ]);
  const [errors, setErrors] = useState({});
  const [isPaying, setIsPaying] = useState(false);
  const [showGpayQrPopup, setShowGpayQrPopup] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [verificationCountdown, setVerificationCountdown] = useState(10);
  const [showPaymentSuccessPopup, setShowPaymentSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const setField = (name, value) => {
    const nextValue = name.toLowerCase().includes("email")
      ? sanitizeEmailInput(value)
      : name.toLowerCase().includes("phone")
        ? sanitizePhoneInput(value)
        : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (submitError) setSubmitError("");
  };
  const setStudentField = (index, field, value) => {
    const nextValue =
      field === "email"
        ? sanitizeEmailInput(value)
        : field === "phone"
          ? sanitizePhoneInput(value)
          : value;
    setStudentEntries((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: nextValue } : item))
    );
    setErrors((prev) => ({ ...prev, [`student-${field}-${index}`]: undefined }));
    if (submitError) setSubmitError("");
  };

  const validate = () => {
    const nextErrors = {};
    const isCollegeStudent = tab === "college-student";
    const collegeSlots =
      tab === "college-student"
        ? studentCount === ""
          ? 1
          : Number(studentCount)
        : 0;
    const activeStudents =
      tab === "college-student"
        ? studentEntries.slice(0, collegeSlots)
        : studentEntries.slice(0, studentCount);

    if (!isCollegeStudent) {
      if (!formData.fullName.trim()) nextErrors.fullName = "Full name is required.";
    }
    if (!formData.gradeOrProgram) nextErrors.gradeOrProgram = "Please select an option.";
    if (!formData.institution.trim()) nextErrors.institution = "This field is required.";
    if (!formData.notes.trim()) nextErrors.notes = "Please add your goals / notes.";
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!isCollegeStudent) {
      if (!phoneDigits) nextErrors.phone = "Phone is required.";
      else if (!PHONE_RE.test(phoneDigits)) nextErrors.phone = "Phone number must be exactly 10 digits.";
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
      if (studentCount === "" || getCollegeTotalAmount(studentCount) == null) {
        nextErrors.studentCount = "Please select how many students are registering.";
      }
      activeStudents.forEach((student, i) => {
        if (!student.name.trim()) nextErrors[`student-name-${i}`] = "Student name is required.";
        if (!student.email.trim()) nextErrors[`student-email-${i}`] = "Student email is required.";
        else if (!EMAIL_RE.test(student.email.trim())) nextErrors[`student-email-${i}`] = "Enter a valid student email.";
        const sp = (student.phone || "").replace(/\D/g, "");
        if (!sp) nextErrors[`student-phone-${i}`] = "Phone number is required.";
        else if (!PHONE_RE.test(sp)) {
          nextErrors[`student-phone-${i}`] = "Phone number must be exactly 10 digits.";
        }
      });
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  useEffect(() => {
    if (!isVerifyingPayment) return undefined;
    if (verificationCountdown <= 0) return undefined;

    const timerId = window.setInterval(() => {
      setVerificationCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(timerId);
          setIsVerifyingPayment(false);
          setShowPaymentSuccessPopup(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isVerifyingPayment, verificationCountdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const isStudentFlow = tab === "college-student";
    if (!isStudentFlow) {
      setIsSubmitting(true);
      setSubmitError("");
      try {
        const subjectByTab = {
          "school-org": "Get Started - School Organization Inquiry",
          "college-org": "Get Started - University Inquiry",
          "school-student": "Get Started - School Student Inquiry",
        };

        const messageLines = [
          `Tab: ${tab}`,
          `Full Name: ${formData.fullName}`,
          `Grade / Program: ${formData.gradeOrProgram}`,
          `Institution: ${formData.institution}`,
          `Phone: ${formData.phone}`,
          `Email: ${formData.email}`,
          `Notes: ${formData.notes}`,
        ];

        if (tab === "school-org") {
          messageLines.push(`Role: ${formData.role}`);
        }
        if (tab === "college-org") {
          messageLines.push(`Department / Center: ${formData.department}`);
        }
        if (tab === "school-student") {
          messageLines.push(`Parent/Guardian Email: ${formData.guardianEmail}`);
        }

        const payload = {
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          subject: subjectByTab[tab] || "Get Started Inquiry",
          message: messageLines.join("\n"),
          recipientRoute: "default",
        };

        const response = await fetch(`${API_BASE_URL}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        setShowSuccessPopup(true);
      } catch (_error) {
        setSubmitError("Could not submit inquiry right now. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setSubmitError("");
    setIsPaying(true);
    try {
      const n = Number(studentCount);
      const slots = studentEntries.slice(0, n);
      const primary = slots[0];
      const total = getCollegeTotalAmount(studentCount);
      const messageLines = [
        "Form: Get Started — College Students (Pay Now)",
        `Students registering: ${n}`,
        `Total due: ${formatPayAmountInr(total)}`,
        `Program: ${formData.gradeOrProgram}`,
        `University: ${formData.institution}`,
        `Major / focus: ${formData.major}`,
        `Learning goals / notes: ${formData.notes}`,
        "",
        ...slots.flatMap((s, i) => [
          `Student ${i + 1}`,
          `  Name: ${s.name.trim()}`,
          `  Email: ${s.email.trim()}`,
          `  Phone: ${String(s.phone || "").replace(/\D/g, "")}`,
        ]),
      ];

      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: primary.name.trim(),
          email: primary.email.trim(),
          subject: "Get Started - College Student payment (Pay Now)",
          message: messageLines.join("\n"),
          recipientRoute: "college_students",
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setVerificationCountdown(10);
      setIsVerifyingPayment(false);
      setShowPaymentSuccessPopup(false);
      setShowGpayQrPopup(true);
    } catch (_error) {
      setSubmitError(
        "Could not notify our team right now. Please try again in a moment.",
      );
    } finally {
      setIsPaying(false);
    }
  };

  const startPaymentVerification = () => {
    if (isVerifyingPayment) return;
    setVerificationCountdown(10);
    setShowPaymentSuccessPopup(false);
    setIsVerifyingPayment(true);
  };

  const closePaymentFlow = () => {
    setShowPaymentSuccessPopup(false);
    setShowGpayQrPopup(false);
    setIsVerifyingPayment(false);
    setVerificationCountdown(10);
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
          {submitError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          ) : null}
          {tab === "college-student" ? (
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-800">How many students</span>
              <select
                value={studentCount}
                onChange={(e) =>
                  setStudentCount(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 md:max-w-[18rem]"
              >
                <option value="">Select number of students</option>
                {Array.from({ length: COLLEGE_STUDENT_COUNT_MAX - COLLEGE_STUDENT_COUNT_MIN + 1 }, (_, j) => {
                  const n = COLLEGE_STUDENT_COUNT_MIN + j;
                  return (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  );
                })}
              </select>
              {errors.studentCount ? (
                <span className="mt-1 block text-xs text-red-600">{errors.studentCount}</span>
              ) : null}
            </label>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            {tab !== "college-student" ? (
              <>
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-slate-800">Full name</span>
                  <input
                    type="text"
                    placeholder="Enter Your Full Name"
                    value={formData.fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                    className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                  />
                  {errors.fullName ? <span className="mt-1 block text-xs text-red-600">{errors.fullName}</span> : null}
                </label>
              </>
            ) : (
              <div className="md:col-span-2 space-y-5">
                {Array.from({
                  length: studentCount === "" ? 1 : Number(studentCount),
                }).map((_, i) => {
                  const nStudents = studentCount === "" ? 1 : Number(studentCount);
                  const payPerStudentDisplay = formatPayAmountInr(COLLEGE_PRICE_PER_STUDENT);
                  return (
                    <div
                      key={`student-${i}`}
                      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
                    >
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-800">
                          Student Name {nStudents > 1 ? i + 1 : ""}
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
                          Student Email ID {nStudents > 1 ? i + 1 : ""}
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
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-800">
                          Phone Number {nStudents > 1 ? i + 1 : ""}
                        </span>
                        <input
                          type="tel"
                          placeholder="10-digit mobile"
                          value={studentEntries[i].phone}
                          onChange={(e) => setStudentField(i, "phone", e.target.value)}
                          inputMode="numeric"
                          maxLength={10}
                          className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                        />
                        {errors[`student-phone-${i}`] ? (
                          <span className="mt-1 block text-xs text-red-600">{errors[`student-phone-${i}`]}</span>
                        ) : null}
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-800">Pay Amount</span>
                        <input
                          type="text"
                          readOnly
                          tabIndex={-1}
                          aria-readonly="true"
                          value={payPerStudentDisplay}
                          className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none"
                        />
                        <span
                          className={`mt-1 block min-h-[1.125rem] text-xs ${i === 0 ? "text-slate-500" : ""}`}
                        >
                          {i === 0 && studentCount !== ""
                            ? `Per student · Total ${formatPayAmountInr(getCollegeTotalAmount(studentCount))} for ${studentCount} students`
                            : i === 0
                              ? "Per student (total updates when you select headcount)"
                              : null}
                        </span>
                      </label>
                    </div>
                  );
                })}
              </div>
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
                    ? "Enter Your School Name"
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
            {tab !== "college-student" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Phone</span>
                <input
                  type="tel"
                  placeholder="Enter Your Phone Number"
                  value={formData.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20"
                />
                {errors.phone ? <span className="mt-1 block text-xs text-red-600">{errors.phone}</span> : null}
              </label>
            ) : null}
            {tab !== "college-student" ? (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-800">Email</span>
                <input
                  type="email"
                  placeholder="Enter Your Email ID"
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
              disabled={isPaying || isSubmitting}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-[0_8px_28px_rgba(20,131,255,0.45)]"
            >
              {tab === "school-org" || tab === "college-org" || tab === "school-student"
                ? isSubmitting
                  ? "Submitting..."
                  : "Enquire Now"
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
      <SubmissionSuccessModal
        open={showSuccessPopup}
        title="Enquiry submitted successfully"
        description="Thank you for your interest. Our team will review your details and contact you shortly."
        onClose={() => setShowSuccessPopup(false)}
      />

      {showGpayQrPopup ? (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label="Google Pay QR popup"
          onClick={() => {
            if (showPaymentSuccessPopup) {
              setShowGpayQrPopup(false);
            }
          }}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_28px_70px_-40px_rgba(15,23,42,0.7)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
                Payment
              </p>
              <button
                type="button"
                onClick={() => {
                  if (showPaymentSuccessPopup) {
                    setShowGpayQrPopup(false);
                  }
                }}
                disabled={!showPaymentSuccessPopup}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                aria-label="Close QR popup"
              >
                ×
              </button>
            </div>

            <h3 className="text-xl font-bold text-slate-900">Google Pay QR Scanner</h3>
            <p className="mt-1 text-sm text-slate-600">
              Scan this QR using Google Pay to continue checkout.
            </p>
            {tab === "college-student" && getCollegeTotalAmount(studentCount) ? (
              <p className="mt-3 rounded-lg border border-blue-100 bg-blue-50/80 px-3 py-2 text-center text-sm font-semibold text-blue-950">
                Amount due: {formatPayAmountInr(getCollegeTotalAmount(studentCount))}
              </p>
            ) : null}

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <img
                src={sampleQrImage}
                alt="Google Pay QR code"
                className="mx-auto aspect-square w-full max-w-[260px] rounded-md border border-slate-200 bg-white object-contain p-1"
              />
            </div>

            {isVerifyingPayment ? (
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                <p className="text-sm font-semibold text-amber-800">
                  Verifying payment... {verificationCountdown}s
                </p>
                <p className="mt-0.5 text-xs text-amber-700">
                  Your payment is being verified.
                </p>
              </div>
            ) : null}

            <div className="mt-4 flex justify-end gap-2">
              {!isVerifyingPayment ? (
                <button
                  type="button"
                  onClick={startPaymentVerification}
                  className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-blue-200 bg-white px-5 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Complete Payment
                </button>
              ) : null}
              <button
                type="button"
                onClick={closePaymentFlow}
                disabled={!showPaymentSuccessPopup}
                className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(20,131,255,0.35)] transition hover:brightness-110"
              >
                Done
              </button>
            </div>

            {showPaymentSuccessPopup ? (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl p-4">
                <div className="relative w-full max-w-[320px] rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center shadow-[0_20px_50px_-30px_rgba(5,150,105,0.55)]">
                  <button
                    type="button"
                    onClick={closePaymentFlow}
                    className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-emerald-200 bg-white/80 text-emerald-700 transition hover:bg-white"
                    aria-label="Close success popup"
                  >
                    ×
                  </button>
                  <p className="relative text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    Payment Successful
                  </p>
                  <h4 className="relative mt-2 text-lg font-bold text-emerald-900">
                    Check your email ID, we have sent the app link.
                  </h4>
                  <p className="relative mt-2 text-sm text-emerald-800">
                    You can now close this popup.
                  </p>
                  <button
                    type="button"
                    onClick={closePaymentFlow}
                    className="relative mt-4 inline-flex min-h-[38px] items-center justify-center rounded-full bg-gradient-to-r from-[#1483ff] to-[#21b9ff] px-4 py-2 text-sm font-semibold text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
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
