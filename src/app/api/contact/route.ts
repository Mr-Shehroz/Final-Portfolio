// app/api/contact/route.ts
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER, // Your email
      subject: subject ? `Contact Form: ${subject}` : 'Contact Form Submission',
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Subject: ${subject || 'N/A'}
        Message: ${message}
      `,
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
              background: #0e2232;
              border-radius: 50%;
              width: 48px; height: 48px;
              display: flex; align-items: center; justify-content: center;
              box-shadow: 0 0 0 2px #22d3ee;
              margin-right: 1rem;
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
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return Response.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}