import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Ensure .env is loaded
dotenv.config();

/**
 * Escapes HTML characters to prevent XSS / HTML injection in email templates
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Validates email format
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

/**
 * Validates contact form data
 */
export function validateContactPayload(data) {
  const errors = [];

  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const phone = (data.phone || '').trim();
  const service = (data.service || '').trim();
  const message = (data.message || '').trim();

  if (!name || name.length < 2) {
    errors.push('Name must be at least 2 characters long.');
  }

  if (!phone) {
    errors.push('Phone number is required.');
  } else {
    const digitsOnly = phone.replace(/[^0-9]/g, '');
    if (digitsOnly.length < 10) {
      errors.push('Please enter a valid 10-digit phone number.');
    }
  }

  if (email && !isValidEmail(email)) {
    errors.push('Please provide a valid email address.');
  }

  if (!service) {
    errors.push('Please select a required service.');
  }

  if (!message || message.length < 5) {
    errors.push('Enquiry message must be at least 5 characters long.');
  }

  // Honeypot spam check
  if (data._botField || data.faxOnly) {
    errors.push('Spam detected.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      name,
      email,
      phone,
      service,
      message
    }
  };
}

/**
 * Sends enquiry email via SMTP
 */
export async function sendContactEmail(payload) {
  const validation = validateContactPayload(payload);
  if (!validation.isValid) {
    const error = new Error(validation.errors.join(' '));
    error.statusCode = 400;
    throw error;
  }

  const { name, email, phone, service, message } = validation.sanitized;

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
  const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;
  const recipientEmail = process.env.RECIPIENT_EMAIL || 'josetravelskgl@gmail.com';

  if (!smtpUser || !smtpPass) {
    const err = new Error('Server SMTP credentials are not configured. Please check .env file.');
    err.statusCode = 500;
    throw err;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  const nowIST = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  // Plain-text alternative
  const textContent = `
NEW WEBSITE ENQUIRY - JOSE COMPUTERS & TRAVELS
==================================================

Visitor Details:
----------------
• Full Name: ${name}
• Phone / WhatsApp: ${phone}
• Email: ${email || 'Not provided'}
• Required Service: ${service}
• Received At: ${nowIST} (IST)

Enquiry Message:
----------------
${message}

==================================================
This enquiry was submitted from the official Contact Page at Rajiv Junction, Karungal.
`.trim();

  // Polished, responsive HTML email template
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Enquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f7f9; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f4c81 0%, #20a7db 100%); padding: 30px; text-align: left; color: #ffffff;">
              <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9; margin-bottom: 6px;">
                Jose Computers & Jose Tours & Travels
              </div>
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; line-height: 1.3;">
                New Website Customer Enquiry
              </h1>
              <p style="margin: 8px 0 0; font-size: 13px; opacity: 0.9;">
                Rajiv Junction, Karungal - 629157 • Contact Form Submission
              </p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 30px;">
              <!-- Quick Highlight Badge -->
              <div style="background-color: #f0f9ff; border-left: 4px solid #20a7db; padding: 12px 16px; border-radius: 4px; margin-bottom: 24px;">
                <span style="font-size: 12px; font-weight: 700; color: #0284c7; text-transform: uppercase; letter-spacing: 0.5px;">Service Requested</span>
                <div style="font-size: 18px; font-weight: 700; color: #0f4c81; margin-top: 2px;">
                  ${escapeHtml(service)}
                </div>
              </div>

              <!-- Visitor Information Table -->
              <h2 style="font-size: 15px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                Visitor Contact Information
              </h2>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td width="35%" style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Full Name:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 700;">
                    ${escapeHtml(name)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Phone / WhatsApp:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 700;">
                    <a href="tel:${escapeHtml(phone)}" style="color: #20a7db; text-decoration: none;">${escapeHtml(phone)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Email Address:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">
                    ${email ? `<a href="mailto:${escapeHtml(email)}" style="color: #20a7db; text-decoration: none;">${escapeHtml(email)}</a>` : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Received Time:</td>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px;">
                    ${nowIST} (IST)
                  </td>
                </tr>
              </table>

              <!-- Customer Message Block -->
              <h2 style="font-size: 15px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                Message / Requirement Details
              </h2>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; margin-bottom: 24px;">
${escapeHtml(message)}
              </div>

              <!-- Quick Reply Actions -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-top: 10px;">
                    <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${name}, thank you for contacting Jose Computers regarding ${service}.`)}" 
                       style="display: inline-block; background-color: #25d366; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 20px; border-radius: 6px; margin-right: 10px;">
                      Reply via WhatsApp
                    </a>
                    ${email ? `
                    <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent(`Re: Enquiry on ${service} - Jose Computers`)}" 
                       style="display: inline-block; background-color: #20a7db; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 20px; border-radius: 6px;">
                      Reply via Email
                    </a>
                    ` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 30px; text-align: center; color: #94a3b8; font-size: 12px; line-height: 1.5;">
              This notification was generated automatically by the Jose Computers website contact form.<br>
              Centre Location: Rajiv Junction, Karungal - 629157, Tamil Nadu.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  const mailOptions = {
    from: `"Jose Computers & Travels" <${smtpUser}>`,
    to: recipientEmail,
    subject: `New Enquiry [${service}] from ${name}`,
    text: textContent,
    html: htmlContent
  };

  // If visitor provided a valid email, set replyTo so the recipient can click "Reply" directly in Gmail
  if (email && isValidEmail(email)) {
    mailOptions.replyTo = `"${name}" <${email}>`;
  }

  const info = await transporter.sendMail(mailOptions);
  return {
    success: true,
    messageId: info.messageId
  };
}
