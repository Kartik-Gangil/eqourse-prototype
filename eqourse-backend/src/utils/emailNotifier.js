/**
 * eQOURSE Email Notification System
 *
 * Sends beautifully formatted HTML email notifications to the team
 * whenever a new Contact Us or Free Pilot query is submitted.
 *
 * DESIGN PRINCIPLES:
 * - Fire-and-forget: email sending never blocks the user's response
 * - Graceful degradation: if SMTP is not configured, notifications are
 *   silently skipped (logged as a warning, never thrown)
 * - All query details are included directly in the email body so the
 *   recipient can act without visiting the admin panel
 */

const nodemailer = require("nodemailer");
const logger = require("./logger");

// ─── SMTP Transport ─────────────────────────────────────────────────────────

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    logger.warn("SMTP not configured — email notifications are disabled. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env");
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

// ─── Shared Styles ──────────────────────────────────────────────────────────

const BRAND_COLOR = "#0d9488";       // teal-600
const BRAND_DARK = "#0f766e";        // teal-700
const BG_DARK = "#1a1a2e";           // dark navy
const TEXT_LIGHT = "#f8fafc";
const TEXT_MUTED = "#94a3b8";
const CARD_BG = "#ffffff";
const BORDER = "#e2e8f0";

function baseTemplate({ title, emoji, headerSubtitle, bodyHtml, footerNote }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:${BG_DARK};font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_DARK};padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          
          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,${BRAND_COLOR},${BRAND_DARK});border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
              <div style="font-size:40px;margin-bottom:8px;">${emoji}</div>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:${TEXT_LIGHT};letter-spacing:-0.3px;">
                ${title}
              </h1>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.75);">
                ${headerSubtitle}
              </p>
            </td>
          </tr>
          
          <!-- BODY -->
          <tr>
            <td style="background:${CARD_BG};padding:32px 40px;">
              ${bodyHtml}
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td style="background:#f1f5f9;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:${TEXT_MUTED};">
                ${footerNote}
              </p>
              <p style="margin:8px 0 0;font-size:11px;color:#cbd5e1;">
                eQOURSE Admin • Powered by eQOURSE Platform
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Build a styled key-value row for the email body.
 */
function fieldRow(label, value, options = {}) {
  if (!value || value.toString().trim() === "") return "";
  
  const { highlight, badge } = options;
  
  let valueHtml = escapeHtml(value.toString());
  
  if (badge) {
    const badgeColor = badge === "chatbot" ? "#7c3aed" : BRAND_COLOR;
    valueHtml = `<span style="display:inline-block;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:600;color:#fff;background:${badgeColor};">${valueHtml}</span>`;
  } else if (highlight) {
    valueHtml = `<span style="font-weight:600;color:${BRAND_DARK};">${valueHtml}</span>`;
  }
  
  return `
    <tr>
      <td style="padding:10px 16px;font-size:13px;color:${TEXT_MUTED};font-weight:500;white-space:nowrap;vertical-align:top;border-bottom:1px solid ${BORDER};width:140px;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 16px;font-size:14px;color:#1e293b;border-bottom:1px solid ${BORDER};">
        ${valueHtml}
      </td>
    </tr>`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(date) {
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

const SERVICE_LABELS = {
  "ai-data": "AI Data Services",
  "content-services": "Content Services",
  "edtech": "EdTech",
  "localization": "Localization",
  "other": "Other",
};

// ─── Contact Us Notification ────────────────────────────────────────────────

/**
 * Send an email notification for a new Contact Us query.
 * @param {Object} query — Mongoose document from the ContactQuery model
 */
async function sendContactNotification(query) {
  const mailer = getTransporter();
  if (!mailer) return;

  const to = process.env.NOTIFY_EMAIL || "som@eqourse.com";
  const smtpUser = process.env.SMTP_USER || "eqourse@gmail.com";
  const from = `eQOURSE Notifications <${smtpUser}>`;

  const sourceBadge = (query.source || "website").toLowerCase();

  const bodyHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:8px;overflow:hidden;">
      ${fieldRow("Name", query.name, { highlight: true })}
      ${fieldRow("Email", query.email)}
      ${fieldRow("Phone", query.phone_code && query.phone ? `${query.phone_code} ${query.phone}` : query.phone)}
      ${fieldRow("Company", query.company)}
      ${fieldRow("Designation", query.designation)}
      ${fieldRow("Subject", query.subject, { highlight: true })}
      ${fieldRow("Message", query.message)}
      ${fieldRow("Source", sourceBadge, { badge: sourceBadge })}
      ${fieldRow("Submitted At", formatDate(query.createdAt || new Date()))}
    </table>
    
    <div style="margin-top:24px;padding:16px;background:#f0fdfa;border-radius:8px;border-left:4px solid ${BRAND_COLOR};">
      <p style="margin:0;font-size:13px;color:${BRAND_DARK};font-weight:600;">
        💡 Quick Reply Tip
      </p>
      <p style="margin:6px 0 0;font-size:13px;color:#334155;">
        You can reply directly to this email — it will go to <strong>${escapeHtml(query.email)}</strong>
      </p>
    </div>`;

  const subject = `🔔 New Contact Inquiry — ${query.name}${query.subject ? ` • ${query.subject}` : ""}`;

  try {
    await mailer.sendMail({
      from,
      to,
      replyTo: query.email,
      subject,
      html: baseTemplate({
        title: "New Contact Us Inquiry",
        emoji: "📬",
        headerSubtitle: `Received on ${formatDate(query.createdAt || new Date())} via ${sourceBadge}`,
        bodyHtml,
        footerNote: "This is an automated notification from the eQOURSE website contact form.",
      }),
    });
    logger.info(`📧 Contact notification sent to ${to} for query from ${query.email}`);
  } catch (err) {
    logger.error(`Failed to send contact notification: ${err.message}`);
  }
}

// ─── Free Pilot Notification ────────────────────────────────────────────────

/**
 * Send an email notification for a new Free Pilot request.
 * @param {Object} query — Mongoose document from the PilotQuery model
 */
async function sendPilotNotification(query) {
  const mailer = getTransporter();
  if (!mailer) return;

  const to = process.env.NOTIFY_EMAIL || "som@eqourse.com";
  const smtpUser = process.env.SMTP_USER || "eqourse@gmail.com";
  const from = `eQOURSE Notifications <${smtpUser}>`;

  const sourceBadge = (query.source || "website").toLowerCase();
  const serviceLabel = SERVICE_LABELS[query.serviceInterest] || query.serviceInterest;

  const bodyHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:8px;overflow:hidden;">
      ${fieldRow("Name", query.name, { highlight: true })}
      ${fieldRow("Email", query.email)}
      ${fieldRow("Phone", query.phone)}
      ${fieldRow("Company", query.company, { highlight: true })}
      ${fieldRow("Role", query.role)}
      ${fieldRow("Service Interest", serviceLabel, { highlight: true })}
      ${fieldRow("Project Scope", query.projectScope)}
      ${fieldRow("Timeline", query.timeline)}
      ${fieldRow("Languages", query.languages)}
      ${fieldRow("Message", query.message)}
      ${fieldRow("Source", sourceBadge, { badge: sourceBadge })}
      ${fieldRow("Submitted At", formatDate(query.createdAt || new Date()))}
    </table>
    ${query.attachment && query.attachment.url ? `
    <div style="margin-top:16px;padding:12px 16px;background:#fef9c3;border-radius:8px;border-left:4px solid #eab308;">
      <p style="margin:0;font-size:13px;color:#854d0e;font-weight:600;">
        📎 Attachment Included
      </p>
      <p style="margin:4px 0 0;font-size:13px;color:#713f12;">
        ${escapeHtml(query.attachment.originalName || "File attached")} — view in admin panel
      </p>
    </div>` : ""}
    
    <div style="margin-top:16px;padding:16px;background:#f0fdfa;border-radius:8px;border-left:4px solid ${BRAND_COLOR};">
      <p style="margin:0;font-size:13px;color:${BRAND_DARK};font-weight:600;">
        💡 Quick Reply Tip
      </p>
      <p style="margin:6px 0 0;font-size:13px;color:#334155;">
        You can reply directly to this email — it will go to <strong>${escapeHtml(query.email)}</strong>
      </p>
    </div>`;

  const subject = `🚀 New Free Pilot Request — ${query.name}${query.company ? ` • ${query.company}` : ""}`;

  try {
    await mailer.sendMail({
      from,
      to,
      replyTo: query.email,
      subject,
      html: baseTemplate({
        title: "New Free Pilot Request",
        emoji: "🚀",
        headerSubtitle: `${serviceLabel} • Received on ${formatDate(query.createdAt || new Date())} via ${sourceBadge}`,
        bodyHtml,
        footerNote: "This is an automated notification from the eQOURSE Free Pilot request form.",
      }),
    });
    logger.info(`📧 Pilot notification sent to ${to} for request from ${query.email}`);
  } catch (err) {
    logger.error(`Failed to send pilot notification: ${err.message}`);
  }
}

module.exports = { sendContactNotification, sendPilotNotification };

// ═══════════════════════════════════════════════════════════════════════════
// CAREER EMAIL SYSTEM (uses team@eqourse.com — separate SMTP transport)
// ═══════════════════════════════════════════════════════════════════════════

let careerTransporter = null;

function getCareerTransporter() {
  if (careerTransporter) return careerTransporter;

  const host = process.env.CAREERS_SMTP_HOST || process.env.SMTP_HOST;
  const port = parseInt(process.env.CAREERS_SMTP_PORT || process.env.SMTP_PORT || "587", 10);
  const user = process.env.CAREERS_SMTP_USER;
  const pass = process.env.CAREERS_SMTP_PASS;

  if (!user || !pass) {
    logger.warn("Career SMTP not configured — career email notifications disabled.");
    return null;
  }

  careerTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return careerTransporter;
}

const DEPT_LABELS_EMAIL = {
  "ai-data": "AI Data Services",
  "content-services": "Content Services",
  operations: "Operations & Admin",
  marketing: "Marketing & BD",
  technology: "Technology & Engineering",
  hr: "Human Resources",
  other: "Other",
};

/**
 * Notify HR (team@eqourse.com) when a new application is received.
 */
async function sendApplicationReceivedNotification(application, job) {
  const mailer = getCareerTransporter();
  if (!mailer) return;

  const to = process.env.CAREERS_NOTIFY_EMAIL || "team@eqourse.com";
  const smtpUser = process.env.CAREERS_SMTP_USER || "team@eqourse.com";
  const from = `eQOURSE Careers <${smtpUser}>`;
  const deptLabel = DEPT_LABELS_EMAIL[job.department] || job.department;

  const bodyHtml = `
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:8px;overflow:hidden;">
      ${fieldRow("Receipt ID", application.receiptId, { highlight: true })}
      ${fieldRow("Position", job.title, { highlight: true })}
      ${fieldRow("Department", deptLabel)}
      ${fieldRow("Candidate", application.fullName, { highlight: true })}
      ${fieldRow("Email", application.email)}
      ${fieldRow("Phone", application.phone)}
      ${fieldRow("Experience", application.experience)}
      ${fieldRow("Current Role", application.currentRole)}
      ${fieldRow("Qualification", application.qualification)}
      ${fieldRow("Skills", (application.skills || []).join(", "))}
      ${fieldRow("Portfolio", application.portfolioLink)}
      ${fieldRow("Resume", application.resumeFile ? application.resumeFile.originalName : (application.resumeDriveLink || "—"))}
      ${fieldRow("Cover Letter", application.coverLetter)}
      ${(application.customAnswers || []).map(ans => fieldRow(ans.questionLabel, Array.isArray(ans.answerValue) ? ans.answerValue.join(", ") : String(ans.answerValue), { highlight: true })).join("\n")}
      ${fieldRow("Applied At", formatDate(application.createdAt || new Date()))}
    </table>`;

  try {
    await mailer.sendMail({
      from,
      to,
      replyTo: application.email,
      subject: `📋 New Application for ${job.title} — ${application.fullName} [${application.receiptId}]`,
      html: baseTemplate({
        title: `New Application for ${job.title}`,
        emoji: "📋",
        headerSubtitle: `${deptLabel} • ${job.location} • ${application.receiptId}`,
        bodyHtml,
        footerNote: "This is an automated notification from the eQOURSE Careers portal.",
      }),
    });
    logger.info(`📧 Career HR notification sent for ${application.email} → ${job.title}`);
  } catch (err) {
    logger.error(`Career HR notification failed: ${err.message}`);
  }
}

/**
 * Send a confirmation receipt email to the candidate after applying.
 */
async function sendCandidateConfirmation(application, job) {
  const mailer = getCareerTransporter();
  if (!mailer) return;

  const smtpUser = process.env.CAREERS_SMTP_USER || "team@eqourse.com";
  const from = `eQOURSE Careers <${smtpUser}>`;
  const deptLabel = DEPT_LABELS_EMAIL[job.department] || job.department;

  const bodyHtml = `
    <div style="text-align:center;margin-bottom:24px;">
      <div style="display:inline-block;width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,${BRAND_COLOR},${BRAND_DARK});text-align:center;line-height:64px;font-size:28px;">✅</div>
    </div>
    <h2 style="text-align:center;color:#1e293b;font-size:20px;margin:0 0 8px;">Application Received!</h2>
    <p style="text-align:center;color:${TEXT_MUTED};font-size:14px;margin:0 0 24px;">
      Thank you for applying, <strong>${escapeHtml(application.fullName)}</strong>. We're excited to review your profile!
    </p>
    
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:8px;overflow:hidden;">
      ${fieldRow("Position", job.title, { highlight: true })}
      ${fieldRow("Department", deptLabel)}
      ${fieldRow("Location", job.location)}
      ${fieldRow("Receipt ID", application.receiptId, { highlight: true })}
      ${fieldRow("Applied On", formatDate(application.createdAt || new Date()))}
    </table>
    
    <div style="margin-top:24px;padding:16px;background:#f0fdfa;border-radius:8px;border-left:4px solid ${BRAND_COLOR};">
      <p style="margin:0;font-size:13px;color:${BRAND_DARK};font-weight:600;">
        📌 What happens next?
      </p>
      <p style="margin:6px 0 0;font-size:13px;color:#334155;">
        Our HR team will review your application within <strong>5-7 business days</strong>. If your profile matches our requirements, we'll reach out to schedule the next steps. Please keep your receipt ID <strong>${escapeHtml(application.receiptId)}</strong> for your reference.
      </p>
    </div>`;

  try {
    await mailer.sendMail({
      from,
      to: application.email,
      subject: `✅ Application Received — ${job.title} at eQOURSE [${application.receiptId}]`,
      html: baseTemplate({
        title: "Application Confirmed",
        emoji: "✅",
        headerSubtitle: `${job.title} • ${deptLabel} • ${job.location}`,
        bodyHtml,
        footerNote: `You're receiving this because you applied for ${job.title} at eQOURSE. If you didn't apply, please ignore this email.`,
      }),
    });
    logger.info(`📧 Candidate confirmation sent to ${application.email} for ${job.title}`);
  } catch (err) {
    logger.error(`Candidate confirmation email failed: ${err.message}`);
  }
}

/**
 * Send status update email to candidate (shortlisted or rejected).
 */
async function sendCandidateStatusUpdate(application, job, status) {
  const mailer = getCareerTransporter();
  if (!mailer) return;

  const smtpUser = process.env.CAREERS_SMTP_USER || "team@eqourse.com";
  const from = `eQOURSE Careers <${smtpUser}>`;
  const jobTitle = job ? job.title : "the position";

  let bodyHtml;
  let subject;

  if (status === "shortlisted") {
    subject = `🎉 Congratulations! You've been shortlisted — ${jobTitle} at eQOURSE`;
    bodyHtml = `
      <div style="text-align:center;margin-bottom:24px;">
        <div style="display:inline-block;width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#10b981,#059669);text-align:center;line-height:64px;font-size:28px;">🎉</div>
      </div>
      <h2 style="text-align:center;color:#1e293b;font-size:20px;margin:0 0 8px;">You've Been Shortlisted!</h2>
      <p style="text-align:center;color:${TEXT_MUTED};font-size:14px;margin:0 0 24px;">
        Great news, <strong>${escapeHtml(application.fullName)}</strong>!
      </p>
      
      <div style="padding:20px;background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0;margin-bottom:20px;">
        <p style="margin:0;font-size:15px;color:#166534;line-height:1.7;">
          We're thrilled to let you know that after carefully reviewing your application for 
          <strong>${escapeHtml(jobTitle)}</strong>, our team has decided to move forward with your candidacy. 
          Your skills and experience truly stood out! 🌟
        </p>
      </div>
      
      <div style="padding:16px;background:#f0fdfa;border-radius:8px;border-left:4px solid ${BRAND_COLOR};">
        <p style="margin:0;font-size:13px;color:${BRAND_DARK};font-weight:600;">
          📌 Next Steps
        </p>
        <p style="margin:6px 0 0;font-size:13px;color:#334155;">
          A member of our HR team will reach out to you shortly to discuss the next round of the selection process. 
          Please keep an eye on your inbox (and spam folder, just in case!).
        </p>
      </div>
      
      <p style="text-align:center;margin-top:24px;font-size:13px;color:${TEXT_MUTED};">
        Reference: <strong>${escapeHtml(application.receiptId)}</strong>
      </p>`;
  } else {
    subject = `Application Update — ${jobTitle} at eQOURSE`;
    bodyHtml = `
      <div style="text-align:center;margin-bottom:24px;">
        <div style="display:inline-block;width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#94a3b8,#64748b);text-align:center;line-height:64px;font-size:28px;">📝</div>
      </div>
      <h2 style="text-align:center;color:#1e293b;font-size:20px;margin:0 0 8px;">Thank You for Applying</h2>
      <p style="text-align:center;color:${TEXT_MUTED};font-size:14px;margin:0 0 24px;">
        Dear <strong>${escapeHtml(application.fullName)}</strong>,
      </p>
      
      <div style="padding:20px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:20px;">
        <p style="margin:0;font-size:15px;color:#334155;line-height:1.7;">
          Thank you for your interest in the <strong>${escapeHtml(jobTitle)}</strong> position at eQOURSE 
          and for taking the time to apply. After careful consideration, we have decided to move forward 
          with other candidates whose profiles more closely align with our current requirements.
        </p>
        <p style="margin:12px 0 0;font-size:15px;color:#334155;line-height:1.7;">
          This decision does not diminish the value of your skills and experience. We encourage you to 
          keep an eye on our <a href="https://www.eqourse.com/career" style="color:${BRAND_COLOR};text-decoration:underline;">careers page</a> 
          for future opportunities that may be a better fit.
        </p>
      </div>
      
      <div style="padding:16px;background:#fefce8;border-radius:8px;border-left:4px solid #eab308;">
        <p style="margin:0;font-size:13px;color:#854d0e;font-weight:600;">
          💡 Stay Connected
        </p>
        <p style="margin:6px 0 0;font-size:13px;color:#713f12;">
          We genuinely appreciate your interest in eQOURSE. Your profile has been saved, and we may reach out 
          if a suitable role opens up in the future.
        </p>
      </div>
      
      <p style="text-align:center;margin-top:24px;font-size:12px;color:${TEXT_MUTED};">
        We wish you all the best in your career journey. 💚
      </p>`;
  }

  try {
    await mailer.sendMail({
      from,
      to: application.email,
      subject,
      html: baseTemplate({
        title: status === "shortlisted" ? "You're Shortlisted!" : "Application Update",
        emoji: status === "shortlisted" ? "🎉" : "📝",
        headerSubtitle: `${jobTitle} • eQOURSE Careers`,
        bodyHtml,
        footerNote: `This email was sent regarding your application (${application.receiptId}) for ${jobTitle} at eQOURSE.`,
      }),
    });
    logger.info(`📧 Status update (${status}) sent to ${application.email} for ${jobTitle}`);
  } catch (err) {
    logger.error(`Status update email failed: ${err.message}`);
  }
}

module.exports = {
  sendContactNotification,
  sendPilotNotification,
  sendApplicationReceivedNotification,
  sendCandidateConfirmation,
  sendCandidateStatusUpdate,
};
