// Server-only delivery. The shared account is both sender and recipient.
// Never attach visitor headers, addresses, or browser details to the email.
const RECIPIENT = 'qcmabnstudentreps@gmail.com';

function gmailPassword() {
  return (process.env.GMAIL_APP_PASSWORD || '').replace(/\s/g, '');
}

function emailConfigured() {
  return /^[a-z]{16}$/i.test(gmailPassword()) ||
    !!(process.env.RESEND_API_KEY && process.env.FEEDBACK_FROM);
}

async function sendFeedback(message, deliveryKey) {
  const mail = {
    to: [RECIPIENT],
    subject: 'Anonymous feedback — MABN Student Hub',
    text: `An anonymous message from the MABN Student Hub:\n\n${message}\n\n---\nNo sender name, email address, IP address, browser details, or visitor identifier was attached by the form.`,
  };
  const password = gmailPassword();
  if (/^[a-z]{16}$/i.test(password)) {
    const nodemailer = require('nodemailer');
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com', port: 465, secure: true,
      auth: { user: RECIPIENT, pass: password },
      connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
      logger: false, debug: false,
      disableFileAccess: true, disableUrlAccess: true, maxRecipients: 1,
    });
    const result = await transport.sendMail({
      ...mail, from: { name: 'MABN Student Hub', address: RECIPIENT },
      messageId: `<${deliveryKey}@mabn-student-hub>`,
    });
    if (!result.accepted?.some(address => String(address).toLowerCase() === RECIPIENT)) {
      throw new Error('Email was not accepted');
    }
    return;
  }
  if (!process.env.RESEND_API_KEY || !process.env.FEEDBACK_FROM) throw new Error('Email unavailable');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': deliveryKey },
    body: JSON.stringify({ ...mail, from: process.env.FEEDBACK_FROM }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error('Email unavailable');
  const result = await response.json();
  if (!result.id) throw new Error('Email unavailable');
}

module.exports = { emailConfigured, sendFeedback };
