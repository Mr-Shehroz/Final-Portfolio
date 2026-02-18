// app/api/contact/route.ts
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // 1. Notify you about the new message
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.EMAIL_TO!,
      replyTo: email,
      subject: subject ? `Contact Form: ${subject}` : 'Contact Form Submission',
      html: `
        <div style="
          background: linear-gradient(90deg, #012736 0%, #083f55 100%);
          color: #f2fafd;
          border-radius: 18px;
          box-shadow: 0 8px 40px 0 #22d3ee33;
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
          padding: 2.6rem 2rem 2rem 2rem;
          max-width: 520px;
          margin: 1.5rem auto;
          border: 1.5px solid #22d3ee;
        ">
          <div style="display: flex; align-items: center; margin-bottom: 1.7rem;">
            <div style="
              background: #0e2232; border-radius: 50%;
              width: 48px; height: 48px;
              display: flex; align-items: center; justify-content: center;
              box-shadow: 0 0 0 2px #22d3ee; margin-right: 1rem;
            ">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <rect width="24" height="24" rx="12" fill="#0E2232"/>
                <path d="M21 8.5V15a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 15V8.5m18 0A2.5 2.5 0 0 0 18.5 6h-13A2.5 2.5 0 0 0 3 8.5m18 0-8.22 6.54a1 1 0 0 1-1.28 0L3 8.5" stroke="#22D3EE" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <h2 style="margin: 0;font-size: 1.55rem;font-weight:700;letter-spacing:-0.5px;">🚀 New Portfolio Enquiry</h2>
              <div style="color: #67e8f9; font-size: 1rem;font-weight:600;">shehroz.dev Contact Form</div>
            </div>
          </div>
          <div style="font-size: 1rem; line-height: 2.1;">
            <div style="margin-bottom: 0.9rem;">
              <span style="color:#22d3ee;font-weight:600;">👤 Name:</span>
              <span style="color:#f2fafd;margin-left:0.4em">${name}</span>
            </div>
            <div style="margin-bottom: 0.9rem;">
              <span style="color:#22d3ee;font-weight:600;">📧 Email:</span>
              <a href="mailto:${email}" style="color:#a5ffe7;text-decoration:none;margin-left:0.4em">${email}</a>
            </div>
            <div style="margin-bottom: 0.9rem;">
              <span style="color:#22d3ee;font-weight:600;">📱 Phone:</span>
              <span style="margin-left:0.4em;color:#e0eaf3">${phone || 'Not provided'}</span>
            </div>
            <div style="margin-bottom: 0.9rem;">
              <span style="color:#22d3ee;font-weight:600;">📝 Subject:</span>
              <span style="margin-left:0.4em;color:#e0eaf3">${subject || 'N/A'}</span>
            </div>
            <div style="margin-bottom: 0.8rem;">
              <span style="color:#22d3ee;font-weight:600;">💬 Message:</span>
              <div style="margin-top:0.4em;background:#0e2232;border-left:4px solid #22d3ee;padding:0.95em 1.15em;border-radius:12px;color:#f2fafd;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          <hr style="border: none; border-top: 1.5px solid #22d3eef1; opacity:.22; margin-top:2rem;margin-bottom:1.1rem;">
          <div style="text-align:center;color:#8af2ec;font-size:.96rem;">
            <em>Sent securely from <strong>shehroz.dev</strong> 🚀</em>
          </div>
        </div>
      `,
    });

    // 2. Send thank-you confirmation to the sender
    await resend.emails.send({
      from: 'Shehroz <onboarding@resend.dev>',
      to: email,
      subject: '✅ Thanks for reaching out!',
      html: `
        <div style="
          background: linear-gradient(90deg, #012736 0%, #083f55 100%);
          color: #f2fafd;
          border-radius: 18px;
          box-shadow: 0 8px 40px 0 #22d3ee33;
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
          padding: 2.6rem 2rem 2rem 2rem;
          max-width: 520px;
          margin: 1.5rem auto;
          border: 1.5px solid #22d3ee;
        ">
          <!-- Header -->
          <div style="text-align:center; margin-bottom: 2rem;">
            <div style="
              display: inline-flex; align-items: center; justify-content: center;
              background: #0e2232; border-radius: 50%;
              width: 64px; height: 64px;
              box-shadow: 0 0 0 3px #22d3ee;
              margin-bottom: 1rem;
            ">
              <span style="font-size: 2rem;">👋</span>
            </div>
            <h2 style="margin: 0; font-size: 1.7rem; font-weight: 700; letter-spacing: -0.5px;">
              Hey ${name}, thanks for reaching out!
            </h2>
            <p style="color: #67e8f9; font-size: 1rem; margin-top: 0.4rem;">
              I've received your message and will get back to you shortly.
            </p>
          </div>

          <!-- Message recap -->
          <div style="background:#0e2232; border-radius:12px; padding: 1.2rem 1.4rem; margin-bottom: 1.5rem; border-left: 4px solid #22d3ee;">
            <p style="margin: 0 0 0.5rem 0; color:#22d3ee; font-weight:600; font-size:0.9rem;">YOUR MESSAGE</p>
            <p style="margin: 0; color:#e0eaf3; font-size:0.97rem; line-height:1.7;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>

          <!-- Body -->
          <p style="font-size: 1rem; line-height: 1.8; color: #c8e8f0; margin-bottom: 1.2rem;">
            While you wait, feel free to explore my work or connect with me:
          </p>

          <!-- Links -->
          <div style="display:flex; gap:0.8rem; flex-wrap:wrap; margin-bottom: 2rem;">
            <a href="https://github.com/Mr-Shehroz" style="
              background: #0e2232; color: #22d3ee;
              border: 1.5px solid #22d3ee; border-radius: 8px;
              padding: 0.5rem 1.1rem; text-decoration: none;
              font-size: 0.95rem; font-weight: 600;
            ">🐙 GitHub</a>
            <a href="mailto:shehroz.programmer@gmail.com" style="
              background: #0e2232; color: #22d3ee;
              border: 1.5px solid #22d3ee; border-radius: 8px;
              padding: 0.5rem 1.1rem; text-decoration: none;
              font-size: 0.95rem; font-weight: 600;
            ">📧 Email Me</a>
          </div>

          <hr style="border: none; border-top: 1.5px solid #22d3eef1; opacity:.22; margin-bottom:1.1rem;">
          <div style="text-align:center; color:#8af2ec; font-size:.93rem;">
            <em>With ❤️ from <strong>Shehroz</strong> · shehroz.dev</em>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}