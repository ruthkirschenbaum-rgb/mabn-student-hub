MABN STUDENT HUB

A responsive opportunity board for Queens College MABN students. Deployed from
this GitHub repository to the existing Vercel project.

FILES
- index.html, styles.css, brand.css: accessible page and sans-serif styling
- app.js: listings, filters, archive, labeled dates, calendar downloads, and forms
- api/visits.js: durable aggregate visit count
- api/feedback.js: anonymous messages to qcmabnstudentreps@gmail.com
- lib/server.js: server-only storage, validation, and abuse controls
- lib/email.js: Gmail SMTP delivery, with optional Resend alternative
- tests/check.js: calendar and API checks (run: node tests/check.js)

DEPLOYMENT
Vercel automatically deploys the main branch. Vercel installs the pinned Nodemailer dependency. The static page needs no build.
Vercel detects the api/ directory and deploys its Node.js functions.
Do not move hosting to GitHub Pages: the new features require server functions.

ONE-TIME SETUP FOR COUNTER AND FEEDBACK
1. In the Vercel project, connect a permanent Upstash Redis database through the
   Storage/Marketplace integration. Add the server-side environment variables
   UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN. Existing Vercel KV-style
   KV_REST_API_URL and KV_REST_API_TOKEN are supported as aliases.
2. For delivery through the shared Gmail account:
   a. Sign into qcmabnstudentreps@gmail.com, enable Google 2-Step Verification,
      and create an App Password named MABN Student Hub:
      https://myaccount.google.com/apppasswords
   b. Paste the generated App Password directly into the Vercel Production
      environment variable GMAIL_APP_PASSWORD. Never paste it in chat or GitHub.
      Spaces in Google's displayed App Password are removed automatically.
   c. The application signs into that fixed shared account and sends feedback
      from it back to qcmabnstudentreps@gmail.com. No domain is required.
      The personal Vercel account email is not used for delivery.
   Gmail setup: https://support.google.com/mail/answer/185833
   If App Passwords are unavailable under the account's security policy, use
   the existing Resend alternative with RESEND_API_KEY and FEEDBACK_FROM on a
   verified sending domain. Gmail takes priority when both are configured.
3. Optionally set FEEDBACK_DEDUP_SECRET to a random secret. Otherwise the storage
   token supplies the HMAC secret for short-lived duplicate-message receipts.
4. Apply variables to Production (and Preview if wanted), then redeploy.
5. Verify GET /api/feedback returns {"available":true}. Submit one clearly marked
   test message and confirm receipt in the shared inbox before announcing it.
   The app reports success only after the email provider accepts delivery;
   acceptance does not guarantee inbox placement. Configuration availability is
   not an authentication test; wrong App Passwords are detected on submission.
   Check Inbox, Spam, and Sent in the shared Gmail account.

Never commit real keys or tokens. .env.example lists variable names only.
Docs: https://vercel.com/docs/functions/runtimes/node-js
      https://upstash.com/docs/redis/features/restapi
      https://resend.com/docs/api-reference/emails/send-email

BEFORE SETUP
The counter stays hidden rather than showing a fabricated zero. The form checks
availability and shows a setup notice with its send button disabled. Ordinary
listings, search, calendar downloads, and the archive work independently.

WHAT THE SMALL NUMBER MEANS
The faint number fixed to the bottom-left is total counted visits since setup,
not unique people or historical traffic. Opening a new tab/session counts a
visit; reloading the same tab reads the existing total. Browser storage blocking
may cause reloads to count again. Bots and deliberate requests can inflate this
approximation. The number is discreet, not access-controlled: anyone could read
it or the public count endpoint. A privacy-preserving aggregate cap allows up to
1,000 increments per hour. The server stores only the total and expiring hourly
aggregate buckets, never visitor profiles or IP addresses.

FEEDBACK PRIVACY
The form asks for a message only. It requires no login, name, or email. Requests
omit browser credentials, and no third-party tracking scripts, CAPTCHA, or remote
font requests are used. The email contains the message only, with no visitor ID,
IP address, user agent, or reply-to address attached by this application. The
application does not log message bodies or IP addresses and does not store
message text in Redis. The email provider and recipient retain the message.
With Gmail delivery, copies may also appear in the shared account's Sent folder.
Do not put identifying details in a message if anonymity is desired.

Hosting, security, network, and email providers may retain technical logs; no
"100% untraceable" guarantee is made. Review provider log-retention settings
before making stronger claims. Recipients cannot reply to anonymous messages.

Abuse controls use a hidden honeypot, strict length limits, same-origin writes,
and an aggregate limit of 30 feedback attempts/hour. Deduplication stores only a
keyed message digest receipt for 24 hours, not sender details or message text.
There is no IP-based throttling, cookie, fingerprint, or visitor-to-feedback link.

UPDATING LISTINGS
The opportunities array in app.js holds existing entries. conferenceEvents holds
conference dates previously embedded in deadline listings. deadlineDetails links
each submission/registration deadline to its event and gives its explicit label.
Keep event dates and deadlines separate; use an exclusive endDate (the day after
the last event day) for multiday calendar files. Calendar reminders are all-day
unless startTime is supplied; organizer times and cutoffs remain in the description.
Archive status updates using each visitor's local date. Undated items never get
a calendar button. Confirm dates with the official organizer when updating.
