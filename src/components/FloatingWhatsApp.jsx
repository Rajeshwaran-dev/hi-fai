const WHATSAPP_URL = "https://wa.me/message/PQNSXRG6VDSCI1";
const CALL_URL = "tel:+919384882012";
const EMAIL_URL = "mailto:innovate@hifai.io";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-[5.4rem] right-3 z-[134] flex flex-col items-center gap-2 md:bottom-24 md:right-8 md:gap-3">
      <a
        href={CALL_URL}
        aria-label="Call HIfAi"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0ea5e9] text-white shadow-[0_12px_40px_rgba(14,165,233,0.45)] transition-transform duration-200 hover:scale-105 hover:shadow-[0_14px_48px_rgba(14,165,233,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:h-12 md:w-12"
      >
        <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21 16.42v3.29a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 1.12 4.98 2 2 0 0 1 3.11 2.8H6.4a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L7.2 10.66a16 16 0 0 0 6.14 6.14l1.41-1.41a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 21 16.42z" />
        </svg>
      </a>

      <a
        href={EMAIL_URL}
        aria-label="Email HIfAi"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-[0_12px_40px_rgba(37,99,235,0.45)] transition-transform duration-200 hover:scale-105 hover:shadow-[0_14px_48px_rgba(37,99,235,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:h-12 md:w-12"
      >
        <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 6h18v12H3z" stroke="currentColor" strokeWidth="2" />
          <path d="m3 7 9 7 9-7" stroke="currentColor" strokeWidth="2" />
        </svg>
      </a>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with HIfAi on WhatsApp"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_rgba(37,211,102,0.45)] transition-transform duration-200 hover:scale-105 hover:shadow-[0_14px_48px_rgba(37,211,102,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:h-12 md:w-12"
      >
        <svg
          className="h-6 w-6 md:h-7 md:w-7"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
