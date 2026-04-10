/**
 * Send transactional email via SendPulse SMTP API (HTTPS).
 * @see https://sendpulse.com/integrations/api/smtp
 *
 * Auth (pick one):
 * - SENDPULSE_API_KEY: static Bearer token from Settings → API → Generate
 * - SENDPULSE_CLIENT_ID + SENDPULSE_CLIENT_SECRET: OAuth client credentials
 */

const SENDPULSE_SMTP_URL = "https://api.sendpulse.com/smtp/emails";
const SENDPULSE_OAUTH_URL = "https://api.sendpulse.com/oauth/access_token";

let oauthToken = null;
let oauthExpiresAt = 0;

function useSendPulse() {
  if (process.env.SENDPULSE_API_KEY?.trim()) return true;
  if (
    process.env.SENDPULSE_CLIENT_ID?.trim() &&
    process.env.SENDPULSE_CLIENT_SECRET?.trim()
  ) {
    return true;
  }
  return false;
}

async function getBearerToken() {
  const staticKey = process.env.SENDPULSE_API_KEY?.trim();
  if (staticKey) return staticKey;

  const clientId = process.env.SENDPULSE_CLIENT_ID?.trim();
  const clientSecret = process.env.SENDPULSE_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) {
    throw new Error("SendPulse: set SENDPULSE_API_KEY or CLIENT_ID + CLIENT_SECRET");
  }

  const now = Date.now();
  if (oauthToken && now < oauthExpiresAt - 30_000) {
    return oauthToken;
  }

  const res = await fetch(SENDPULSE_OAUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.message || data.error || res.statusText;
    throw new Error(`SendPulse OAuth failed (${res.status}): ${msg}`);
  }

  if (!data.access_token) {
    throw new Error("SendPulse OAuth: no access_token in response");
  }

  oauthToken = data.access_token;
  const ttlSec = Number(data.expires_in) || 3600;
  oauthExpiresAt = now + ttlSec * 1000;
  return oauthToken;
}

/**
 * @param {object} opts
 * @param {string} opts.html
 * @param {string} opts.text
 * @param {string} opts.subject
 * @param {string} opts.fromEmail
 * @param {string} [opts.fromName]
 * @param {string} opts.toEmail
 * @param {string} [opts.toName]
 * @param {string} opts.replyToEmail
 * @param {string} [opts.replyToName]
 */
async function sendViaSendPulse(opts) {
  const token = await getBearerToken();
  const htmlB64 = Buffer.from(opts.html, "utf8").toString("base64");

  const body = {
    email: {
      html: htmlB64,
      text: opts.text,
      subject: opts.subject,
      from: {
        name: opts.fromName || "Hi Fai",
        email: opts.fromEmail,
      },
      to: [
        {
          name: opts.toName || "Hi Fai",
          email: opts.toEmail,
        },
      ],
      reply_to: {
        name: opts.replyToName || opts.replyToEmail,
        email: opts.replyToEmail,
      },
    },
  };

  const res = await fetch(SENDPULSE_SMTP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.message || JSON.stringify(data) || res.statusText;
    throw new Error(`SendPulse send failed (${res.status}): ${msg}`);
  }
  if (data.result !== true) {
    throw new Error(`SendPulse send rejected: ${JSON.stringify(data)}`);
  }
  return data;
}

module.exports = { useSendPulse, sendViaSendPulse };
