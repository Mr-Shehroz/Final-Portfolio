'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import gsap from 'gsap';

const EmailIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="text-cyan-400">
    <rect width="24" height="24" rx="12" fill="#0E2232" />
    <path d="M21 8.5V15a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 15V8.5m18 0A2.5 2.5 0 0 0 18.5 6h-13A2.5 2.5 0 0 0 3 8.5m18 0-8.22 6.54a1 1 0 0 1-1.28 0L3 8.5" stroke="#22D3EE" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="text-cyan-400">
    <rect width="24" height="24" rx="12" fill="#0E2232" />
    <path
      d="M12 2C6.48 2 2 6.58 2 12.26c0 4.47 2.87 8.26 6.84 9.6.5.1.68-.22.68-.48v-1.67c-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.13.64-1.4-2.22-.26-4.56-1.15-4.56-5.1 0-1.13.38-2.06 1.02-2.78-.1-.25-.44-1.27.09-2.65 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.88c.85.004 1.7.11 2.5.32 1.9-1.33 2.74-1.05 2.74-1.05.53 1.38.2 2.4.1 2.65.64.72 1.02 1.65 1.02 2.78 0 3.96-2.34 4.83-4.57 5.09.36.33.68.97.68 1.97v2.92c0 .27.18.59.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
      fill="#22D3EE"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" className="text-cyan-400">
    <rect width="24" height="24" rx="12" fill="#0E2232" />
    <path d="M18.882 16.023c-.435-.433-2.589-2.134-3.02-2.388-.433-.256-.749-.318-1.06.023-.312.342-.918 1.064-1.126 1.284-.208.221-.385.238-.709.089a8.88 8.88 0 0 1-2.712-2.338 8.293 8.293 0 0 1-1.718-2.752c-.138-.32-.013-.5.19-.7.2-.2.445-.525.6-.7.156-.174.111-.453-.068-.92-.177-.465-.785-2.192-1.08-2.732-.294-.54-.581-.47-.874-.48-.294-.008-.636-.009-.968.3-.334.31-1.399 1.37-1.528 2.924-.13 1.556.453 4.053 3.334 6.857 2.88 2.805 5.316 3.337 6.858 3.21 1.543-.127 2.603-1.186 2.912-1.52.31-.332.308-.673.3-.968-.01-.293.06-.58-.48-.874-.54-.296-2.268-.904-2.734-1.08-.467-.178-.744-.224-.92-.068-.174.155-.5.4-.7.6-.2.203-.38.328-.7.19ZM16.939 5.051a.922.922 0 1 1 .001 1.844.922.922 0 0 1-.001-1.844Z" stroke="#22D3EE" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Dummy api route to be implemented in /pages/api/contact.ts
// For now, we'll POST to `/api/contact`

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Refs for animation
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }
      );
    }
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1, delay: 0.15, ease: 'power3.out' }
      );
    }
    if (leftRef.current) {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -60, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 1, delay: 0.28, ease: 'power3.out' }
      );
    }
    if (rightRef.current) {
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 60, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 1, delay: 0.38, ease: 'power3.out' }
      );
    }
  }, []);

  // Animated floating for icons
  const emailIconRef = useRef<HTMLDivElement | null>(null);
  const githubIconRef = useRef<HTMLDivElement | null>(null);
  const phoneIconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (emailIconRef.current) {
      gsap.to(emailIconRef.current, {
        y: 7,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut',
      });
    }
    if (githubIconRef.current) {
      gsap.to(githubIconRef.current, {
        y: -7,
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: 'sine.inOut',
      });
    }
    if (phoneIconRef.current) {
      gsap.to(phoneIconRef.current, {
        y: 5,
        repeat: -1,
        yoyo: true,
        duration: 2.1,
        ease: 'sine.inOut',
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Validation of essential fields could be stricter, but follow same requirements as before
    if (!formData.name || !formData.email || !formData.message) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      return;
    }

    try {
      // Send form data using axios POST to the API route `/api/contact`
      await axios.post('/api/contact', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      // Animate form success
      gsap.fromTo(
        rightRef.current,
        { backgroundColor: "#0a1a26" },
        { backgroundColor: "#254153", duration: 0.5, yoyo: true, repeat: 1, ease: "power1.inOut" }
      );
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      // Animate error
      gsap.fromTo(
        rightRef.current,
        { backgroundColor: "#0a1a26" },
        { backgroundColor: "#3a1a1a", duration: 0.33, yoyo: true, repeat: 1, ease: "power1.inOut" }
      );
    }
  };

  return (
    <section id="contact" className="text-white py-20 px-5 mx-auto max-w-[1386px]">
      <div ref={sectionRef} className="bg-[#06131b] border border-cyan-500/20 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Glow effect on left */}
        <div
          className="absolute top-0 left-0 w-1/3 h-full bg-linear-to-r from-cyan-500/10 to-transparent rounded-l-3xl pointer-events-none"
          style={{ filter: 'blur(40px)' }}
        />

        <div className="flex flex-col lg:flex-row gap-8 p-8 sm:p-12">
          {/* Left Column - Info */}
          <div ref={leftRef} className="lg:w-1/2 space-y-8">
            <h2 ref={headingRef} className="text-3xl sm:text-4xl font-bold leading-tight">
              Get Ready To <br />
              <span className="text-cyan-300 relative after:content-[''] after:block after:absolute after:w-1/2 after:h-1 after:rounded after:bg-cyan-500/40 after:bottom-[-10px] after:left-0">
                Create Great
              </span>
            </h2>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div
                  ref={emailIconRef}
                  className="w-8 h-8 bg-cyan-500/10 border border-cyan-500 rounded-full flex items-center justify-center group-hover:bg-cyan-500/20 transition duration-200"
                >
                  <EmailIcon />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">E-mail:</p>
                  <a href="mailto:shehroz.programmer@gmail.com" className="text-white hover:text-cyan-300 transition-colors">
                    shehroz.programmer@gmail.com
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-start gap-4 group">
                <div
                  ref={githubIconRef}
                  className="w-8 h-8 bg-cyan-500/10 border border-cyan-500 rounded-full flex items-center justify-center group-hover:bg-cyan-500/20 transition duration-200"
                >
                  <GitHubIcon />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">GitHub:</p>
                  <a
                    href="https://github.com/Mr-Shehroz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-cyan-300 transition-colors"
                  >
                    github.com/Mr-Shehroz
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div
                  ref={phoneIconRef}
                  className="w-8 h-8 bg-cyan-500/10 border border-cyan-500 rounded-full flex items-center justify-center group-hover:bg-cyan-500/20 transition duration-200"
                >
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Contact:</p>
                  <a href="tel:923255706845" className="text-white hover:text-cyan-300 transition-colors">
                    +923255706845
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={rightRef} className="lg:w-1/2">
            <h3 className="text-lg font-semibold mb-6">GET IN TOUCH</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a1a26] border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all animated-input"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#0a1a26] border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all animated-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a1a26] border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all animated-input"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#0a1a26] border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all animated-input"
                  />
                </div>
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-[#0a1a26] border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all resize-none animated-input"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/70 text-white font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center ${
                  isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                } group`}
                onMouseDown={e => {
                  const btn = e.currentTarget;
                  gsap.to(btn, { scale: 0.94, duration: 0.15, ease: 'power1.out' });
                }}
                onMouseUp={e => {
                  const btn = e.currentTarget;
                  gsap.to(btn, { scale: 1, duration: 0.18, ease: 'power1.out' });
                }}
                onMouseLeave={e => {
                  const btn = e.currentTarget;
                  gsap.to(btn, { scale: 1, duration: 0.18, ease: 'power1.out' });
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.644z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Appointment Now →
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-300 text-sm animated-success">
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm animated-error">
                  ❌ Please fill in all required fields or try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* extra minimal input styling for focus animation (optional but enhances modern look) */}
      <style>
        {`
        .animated-input:focus {
          box-shadow: 0 0 0 2px #22d3ee50, 0 2px 12px #0ff3ff22;
          transition: box-shadow 0.25s cubic-bezier(.67,1.57,.7,.5);
        }
        .animated-success, .animated-error {
          animation: msgPop 0.5s cubic-bezier(.1,1.2,.8,1) forwards;
        }
        @keyframes msgPop {
          0% { transform: scale(0.88) translateY(24px); opacity: 0.2; }
          80% { transform: scale(1.05) translateY(0px); opacity: 1; }
          100% { transform: scale(1) translateY(0px); opacity: 1; }
        }
        `}
      </style>
    </section>
  );
};

export default Contact;