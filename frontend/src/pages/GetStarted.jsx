import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Lead, SectionHeading } from "./subpageShared.jsx";
import sampleQrImage from "../assets/images/qr.jpeg?url";

const tabOptions = [
  { id: "school-org", label: "Schools" },
  { id: "college-org", label: "Universities" },
  { id: "school-student", label: "School Students" },
  { id: "college-student", label: "College Students" },
  { id: "register-now", label: "Invoice Payment" },
];
const DEFAULT_TAB = "school-org";

function getInitialTabFromSearch(search) {
  const requestedTab = new URLSearchParams(search).get("tab");
  if (!requestedTab) return DEFAULT_TAB;
  return tabOptions.some((item) => item.id === requestedTab)
    ? requestedTab
    : DEFAULT_TAB;
}

const SCHOOL_STUDENT_APP_LINK = "/students/school-students";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3003";

const GHL_FORMS = {
  "school-org": {
    src: "https://hl.hifaiskills.com/widget/form/7Vuyw1toiIixml2HJSdT",
    id: "inline-7Vuyw1toiIixml2HJSdT",
    name: "School",
    height: "633",
    formId: "7Vuyw1toiIixml2HJSdT"
  },
  "college-org": {
    src: "https://hl.hifaiskills.com/widget/form/tldvVwdJwGjvjk8Y4bX8",
    id: "inline-tldvVwdJwGjvjk8Y4bX8",
    name: "Universities",
    height: "636",
    formId: "tldvVwdJwGjvjk8Y4bX8"
  },
  "school-student": {
    src: "https://hl.hifaiskills.com/widget/form/niAmxyyGgdJIsHytD9cg",
    id: "inline-niAmxyyGgdJIsHytD9cg",
    name: "School Students - Copy",
    height: "1153",
    formId: "niAmxyyGgdJIsHytD9cg"
  },
  "college-student": {
    src: "https://hl.hifaiskills.com/widget/form/jgZyf5prTZzx5OneWgsW",
    id: "inline-jgZyf5prTZzx5OneWgsW",
    name: "College Students",
    height: "657",
    formId: "jgZyf5prTZzx5OneWgsW"
  }
};

function loadRazorpayScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function RegisterNowForm() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", amount: "", invoiceNumber: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) tempErrors.email = "Email is invalid";
    if (!formData.phone) tempErrors.phone = "Phone is required";
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) tempErrors.amount = "Valid amount is required";
    if (!formData.invoiceNumber) tempErrors.invoiceNumber = "Invoice Number is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setMessage("");

    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      setMessage("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    try {
      const orderRes = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: formData.amount }),
      });
      const orderData = await orderRes.json();

      if (!orderData.ok) {
        setMessage(orderData.error || "Failed to create order");
        setLoading(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_SxaEc6U9C0Is3t",
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Hi Fai",
        description: "Registration Payment",
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch(`${API_BASE_URL}/api/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                amount: formData.amount,
                invoiceNumber: formData.invoiceNumber
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.ok) {
              setMessage("Payment successful! Please check your email.");
              setFormData({ name: "", email: "", phone: "", amount: "", invoiceNumber: "" });
            } else {
              setMessage(verifyData.error || "Payment verification failed.");
            }
          } catch (err) {
             setMessage("Error verifying payment.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#2563eb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      setMessage("Server error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handlePayment} className="mt-6 w-full max-w-lg mx-auto space-y-4 p-6 bg-white rounded-xl border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 text-center">Registration Details</h3>
      {message && <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm text-center">{message}</div>}
      
      <div>
        <label className="block text-sm font-medium text-slate-700">Full Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border" placeholder="Enter your full name" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Email Address</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border" placeholder="you@example.com" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Phone Number</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border" placeholder="10-digit mobile number" />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Invoice Number</label>
        <input type="text" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border" placeholder="e.g. INV-1001" />
        {errors.invoiceNumber && <p className="text-red-500 text-xs mt-1">{errors.invoiceNumber}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Amount (₹)</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border" placeholder="Amount to pay" />
        {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
      </div>

      <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 mt-6 transition-all">
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export function GetStartedFormPanel({
  initialTab = "school-org",
  lockTab = false,
  showHeader = true,
  showEmailHint = true,
  containerClassName = "mx-auto w-full max-w-7xl",
}) {
  const [tab, setTab] = useState(initialTab);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);


  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleMessage = async (event) => {
      const data = event.data;
      if (!data) return;

      let isGHLSubmit = false;
      let formData = {};

      // Detect common GoHighLevel postMessage submission formats
      if (typeof data === "string" && (data === "form-submit" || data.includes("form_submit"))) {
        isGHLSubmit = true;
      } else if (Array.isArray(data) && data[0] === "form-submit") {
        isGHLSubmit = true;
        formData = data[1] || {};
      } else if (data.type === "FORM_SUBMITTED" || data.type === "ghl_form_submitted" || data.message === "ghl_form_submitted") {
        isGHLSubmit = true;
        formData = data.formData || data.data || data || {};
      }

      if (isGHLSubmit) {
        // Attempt to map GoHighLevel fields to our backend format
        const name = formData.name || formData.fullName || formData.first_name || "GoHighLevel Lead";
        const email = formData.email || "no-email-provided@ghl.com";
        const phone = formData.phone || "N/A";
        
        try {
          await fetch(`${API_BASE_URL}/api/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name,
              email: email,
              subject: `Get Started Inquiry - ${tab}`,
              message: `Form submitted via GoHighLevel on the ${tab} tab.\n\nPhone: ${phone}\n\nNote: This data was intercepted from a GoHighLevel iframe. Raw Payload: ${JSON.stringify(formData)}`,
              recipientRoute: tab === "college-student" ? "college_students" : "default",
            }),
          });
        } catch (error) {
          console.error("Failed to sync GHL submission to local backend:", error);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [tab]);

  useEffect(() => {
    const scriptId = "ghl-form-embed-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://hl.hifaiskills.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className={containerClassName}>
      {showHeader ? (
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_32px_rgba(15,23,42,0.06)] md:gap-8 md:p-7">
          <div className="text-center md:text-left ">
            <SectionHeading className="mb-2">Start your journey</SectionHeading>
            <Lead className="mx-auto md:mx-0">
              Tell us a little about you and we&apos;ll take it from there to guide you in the right direction.
            </Lead>
          </div>

          <div className="mx-auto w-40 shrink-0">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
              <img
                src={sampleQrImage}
                alt="HiFAI quick access QR code"
                className="mx-auto aspect-square w-full rounded-lg border border-slate-200 bg-white object-contain p-1"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="shrink-0">
            <button 
              onClick={() => setIsRegisterModalOpen(true)}
              className="px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-colors inline-block whitespace-nowrap"
            >
              Invoice Payment
            </button>
          </div>
        </div>
      ) : null}

      <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_32px_rgba(15,23,42,0.06)] md:p-8">
        {!lockTab ? (
          <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-1.5 rounded-[1rem] bg-slate-100 p-1.5 shadow-inner md:grid-cols-5">
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

        {(() => {
          const config = GHL_FORMS[tab];
          if (!config) return null;
          return (
            <div className="mt-6 w-full" style={{ minHeight: `${config.height}px` }}>
              <iframe
                src={config.src}
                style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px" }}
                id={config.id}
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name={config.name}
                data-height={config.height}
                data-layout-iframe-id={config.id}
                data-form-id={config.formId}
                title={config.name}
              />
            </div>
          );
        })()}

        {tab === "register-now" ? (
          <RegisterNowForm />
        ) : null}

        {tab === "school-student" ? (
          <div className="mt-6 flex justify-center">
            <a
              href={SCHOOL_STUDENT_APP_LINK}
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              ENTHIRAN APP LINK
            </a>
          </div>
        ) : null}
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


      {/* 
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
                <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-white/95 p-6 text-center backdrop-blur-sm">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Payment Successful</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Your details have been recorded.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      */}

      {isRegisterModalOpen && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex min-h-[100dvh] items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm md:p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsRegisterModalOpen(false)}
        >
          <div className="relative w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute -right-2 -top-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg transition hover:scale-105"
            >
              <X className="h-4 w-4" />
            </button>
            <RegisterNowForm />
          </div>
        </div>,
        document.body
      )}
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
