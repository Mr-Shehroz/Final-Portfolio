'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Icons (unchanged)
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

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const infoItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const formRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await axios.post('/api/contact', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Animate section background/title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Animate contact info items (stagger)
    gsap.fromTo(
      infoItemsRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate form container
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="text-white py-20 px-5 mx-auto max-w-[1386px]"
    >
      <div className="bg-[#06131b] border border-cyan-500/20 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Glow effect */}
        <div
          className="absolute top-0 left-0 w-1/3 h-full bg-linear-to-r from-cyan-500/10 to-transparent rounded-l-3xl pointer-events-none"
          style={{ filter: 'blur(40px)' }}
        />

        <div className="flex flex-col lg:flex-row gap-8 p-8 sm:p-12">
          {/* Left Column - Info */}
          <div className="lg:w-1/2 space-y-8">
            <h2
              ref={titleRef}
              className="text-3xl sm:text-4xl font-bold leading-tight opacity-0"
            >
              Get Ready To <br />
              <span className="text-cyan-300 relative after:content-[''] after:block after:absolute after:w-1/2 after:h-1 after:rounded after:bg-cyan-500/40 after:bottom-[-10px] after:left-0">
                Create Great
              </span>
            </h2>

            <div className="space-y-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  ref={el => {
                    infoItemsRef.current[i] = el;
                  }}
                  className="flex items-start gap-4 group opacity-0"
                >
                  <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500 rounded-full flex items-center justify-center group-hover:bg-cyan-500/20 transition duration-200">
                    {i === 0 ? <EmailIcon /> : i === 1 ? <GitHubIcon /> : <PhoneIcon />}
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">
                      {i === 0 ? 'E-mail:' : i === 1 ? 'GitHub:' : 'Contact:'}
                    </p>
                    {i === 0 ? (
                      <a
                        href="mailto:shehroz.programmer@gmail.com"
                        className="text-white hover:text-cyan-300 transition-colors"
                      >
                        shehroz.programmer@gmail.com
                      </a>
                    ) : i === 1 ? (
                      <a
                        href="https://github.com/Mr-Shehroz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-cyan-300 transition-colors"
                      >
                        github.com/Mr-Shehroz
                      </a>
                    ) : (
                      <a
                        href="tel:923255706845"
                        className="text-white hover:text-cyan-300 transition-colors"
                      >
                        +923255706845
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={formRef} className="lg:w-1/2 opacity-0">
            <h3 className="text-lg font-semibold mb-6">GET IN TOUCH</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0a1a26] border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all animated-input"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#0a1a26] border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all animated-input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0a1a26] border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all animated-input"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#0a1a26] border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all animated-input"
                />
              </div>

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-[#0a1a26] border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all resize-none animated-input"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/70 text-white font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center ${
                  isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.644z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Appointment Now →'
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-300 text-sm animate-fadeInUp">
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm animate-fadeInUp">
                  ❌ Please fill in all required fields or try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animated-input:focus {
          box-shadow: 0 0 0 2px #22d3ee50, 0 2px 12px #0ff3ff22;
          transition: box-shadow 0.25s cubic-bezier(.67,1.57,.7,.5);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Contact;