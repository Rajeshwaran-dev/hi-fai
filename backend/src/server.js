const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;
const allowedOrigins = [
  "https://hifai.askeva.net",
  "http://localhost:5173",

];

app.use(cors());
  // cors({
  //   origin: (origin, callback) => {
  //     console.log(origin,"origin");
  //     if (!origin || allowedOrigins.includes(origin)) {
  //       callback(null, true);
  //       return;
  //     }
  //     callback(new Error("Not allowed by CORS"));
  //   },
  // }),
app.use(express.json());

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const parseMessageFields = (message = "") => {
  if (typeof message !== "string") return {};

  return message
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .reduce((acc, line) => {
      const separatorIndex = line.indexOf(":");
      if (separatorIndex === -1) return acc;

      const key = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();
      if (key) acc[key] = value;
      return acc;
    }, {});
};

const requiredEnv = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SENDER_EMAIL",
  "RECIPIENT_EMAIL",
  "MONGODB_URI",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.warn(`[warning] Missing environment variable: ${key}`);
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || "false").toLowerCase() === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, default: "N/A", trim: true },
    message: { type: String, required: true },
    parsedMessageFields: { type: Object, default: {} },
    extraFields: { type: Object, default: {} },
    rawPayload: { type: Object, required: true },
  },
  { timestamps: true, collection: "contact" },
);

const ContactSubmission = mongoose.model(
  "ContactSubmission",
  contactSubmissionSchema,
);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "Backend is running" });
});

app.post("/api/contact", async (req, res) => {
  const payload = req.body || {};
  const { name, email, subject, message, ...extraFields } = payload;

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: "name, email and message are required",
    });
  }

  try {
    await ContactSubmission.create({
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject || "N/A").trim(),
      message: String(message),
      parsedMessageFields: parseMessageFields(message),
      extraFields,
      rawPayload: payload,
    });
  } catch (error) {
    console.error("Database save error:", error);
    return res.status(500).json({
      ok: false,
      error: "Failed to store submission",
    });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || "N/A");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    replyTo: email,
    subject: subject || `New website enquiry from ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, "", "Message:", message].join(
      "\n",
    ),
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Enquiry - Hi Fai</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geom:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
  <style>
    .geom-font {
      font-family: 'Geom', sans-serif;
    }
  </style>
</head>
<body style="margin:0;padding:28px 14px;background:#eef1f7; color:#1f2937;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:700px;border-collapse:collapse;">
          <tr>
            <td style="border-radius:16px;overflow:hidden;background:#ffffff;border:1px solid #dce3ef;box-shadow:0 10px 34px rgba(15,23,42,0.12);">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:22px 26px;background:#0b1739;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="vertical-align:top;">
                          <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:#94a3ff;font-weight:600;">
                            Hi Fai Contact Desk
                          </p>
                          <h2 style="margin:0;font-size:28px;line-height:1.1;color:#ffffff;font-weight:700;">
                            New Website Enquiry
                          </h2>
                          <p style="margin:8px 0 0 0;font-size:13px;line-height:1.6;color:#dbe3ff;">
                            A new lead has been submitted from the Hi Fai website.
                          </p>
                        </td>
                        <td align="right" style="vertical-align:top;">
                          <span style="display:inline-block;padding:7px 12px;border-radius:999px;background:#1e3a8a;color:#dbeafe;font-size:11px;font-weight:600;letter-spacing:0.4px;">
                            RECEIVED
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:22px 26px 10px 26px;background:#ffffff;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;width:170px;font-size:12px;color:#64748b;font-weight:600;letter-spacing:0.3px;text-transform:uppercase;">Name</td>
                        <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;font-size:15px;color:#0f172a;font-weight:500;">${safeName}</td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;width:170px;font-size:12px;color:#64748b;font-weight:600;letter-spacing:0.3px;text-transform:uppercase;">Email</td>
                        <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;font-size:15px;">
                          <a href="mailto:${safeEmail}" style="color:#1d4ed8;text-decoration:none;font-weight:500;">${safeEmail}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;width:170px;font-size:12px;color:#64748b;font-weight:600;letter-spacing:0.3px;text-transform:uppercase;">Subject</td>
                        <td style="padding:12px 0;border-bottom:1px solid #e2e8f0;">
                          <span style="display:inline-block;padding:5px 10px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;font-size:13px;color:#1e40af;font-weight:600;">
                            ${safeSubject}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 26px 24px 26px;">
                    <p style="margin:0 0 10px 0;font-size:13px;letter-spacing:0.3px;text-transform:uppercase;color:#64748b;font-weight:700;">
                      Message Details
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                      <tr>
                        <td style="padding:16px 18px;background:#f8fbff;border:1px solid #dbeafe;border-left:4px solid #2563eb;border-radius:10px;font-size:14px;line-height:1.8;color:#1e293b;">
                          ${safeMessage}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return res.json({ ok: true, message: "Submission stored and email sent" });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({
      ok: false,
      error: "Failed to send email",
    });
  }
});

const startServer = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing in environment variables");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
  });
};

startServer().catch((error) => {
  console.error("Server startup error:", error);
  process.exit(1);
});