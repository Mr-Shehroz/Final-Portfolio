'use client';

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin (safe in client components)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const starRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<HTMLImageElement>(null);
  const textSpanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // === ICONS ===
  const GithubIcon = () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-cyan-400">
      <rect width="24" height="24" rx="12" fill="#0E2232" />
      <path
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.47 2.87 8.26 6.84 9.6.5.1.68-.22.68-.48v-1.67c-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.13.64-1.4-2.22-.26-4.56-1.15-4.56-5.1 0-1.13.38-2.06 1.02-2.78-.1-.25-.44-1.27.09-2.65 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.88c.85.004 1.7.11 2.5.32 1.9-1.33 2.74-1.05 2.74-1.05.53 1.38.2 2.4.1 2.65.64.72 1.02 1.65 1.02 2.78 0 3.96-2.34 4.83-4.57 5.09.36.33.68.97.68 1.97v2.92c0 .27.18.59.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
        fill="#22D3EE"
      />
    </svg>
  );

  const EmailIcon = () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-cyan-400">
      <rect width="24" height="24" rx="12" fill="#0E2232" />
      <path d="M21 8.5V15a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 15V8.5m18 0A2.5 2.5 0 0 0 18.5 6h-13A2.5 2.5 0 0 0 3 8.5m18 0-8.22 6.54a1 1 0 0 1-1.28 0L3 8.5" stroke="#22D3EE" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-cyan-400">
      <rect width="24" height="24" rx="12" fill="#0E2232" />
      <path d="M18.882 16.023c-.435-.433-2.589-2.134-3.02-2.388-.433-.256-.749-.318-1.06.023-.312.342-.918 1.064-1.126 1.284-.208.221-.385.238-.709.089a8.88 8.88 0 0 1-2.712-2.338 8.293 8.293 0 0 1-1.718-2.752c-.138-.32-.013-.5.19-.7.2-.2.445-.525.6-.7.156-.174.111-.453-.068-.92-.177-.465-.785-2.192-1.053-3.004-.277-.829-.562-.717-.77-.73-.198-.012-.421-.014-.644-.014-.222 0-.571.082-.87.385C3.447 4.49 2.897 6.166 3 7.247c.122 1.282.769 3.256 2.523 5.928 1.714 2.605 3.586 4.453 6.3 6.19 2.67 1.72 4.645 2.404 5.927 2.525 1.08.104 2.757-.447 2.893-1.787.032-.338-.005-.695-.017-.888-.013-.217.1-.494-.73-.771-.816-.269-2.542-.876-3.007-1.053-.467-.18-.745-.225-.92-.068-.176.156-.502.401-.701.6-.199.203-.38.328-.7.19Z" stroke="#22D3EE" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // === HOVER INTERACTIONS ===
  const handleSocialMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.15,
      backgroundColor: "#164e63",
      color: "#67e8f9",
      boxShadow: "0 4px 18px #22d3ee22",
      duration: 0.28,
      ease: "power2.out",
    });
  };
  const handleSocialMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      backgroundColor: "#0a1a26",
      color: "#22d3ee",
      boxShadow: "0 0px 0px transparent",
      duration: 0.24,
      ease: "power2.in",
    });
  };

  const handleContactHoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.14,
      backgroundColor: "rgba(34,211,238,0.13)",
      duration: 0.18,
      ease: "power1.out",
    });
  };
  const handleContactHoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      backgroundColor: "rgba(6,18,27,0.1)",
      duration: 0.18,
      ease: "power1.out",
    });
  };

  const handleLinkHoverIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      color: "#67e8f9",
      x: 8,
      fontWeight: 600,
      duration: 0.18,
      ease: "power2.out",
    });
  };
  const handleLinkHoverOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      color: "#d1d5db",
      x: 0,
      fontWeight: 400,
      duration: 0.16,
      ease: "power2.in",
    });
  };

  // === STARS ===
  const STAR_COUNT = 20;
  const starsData = Array.from({ length: STAR_COUNT }).map(() => ({
    width: Math.random() * 2 + 1,
    height: Math.random() * 2 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  }));

  // === ANIMATIONS ON MOUNT ===
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Logo
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(1.4)" }
      );

      // Text characters
      gsap.fromTo(
        textSpanRefs.current,
        { opacity: 0, y: 25, rotationX: -80 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.7,
          stagger: 0.025,
          ease: "power3.out",
        }
      );

      // Twinkling stars
      starRefs.current.forEach((star) => {
        if (star) {
          gsap.to(star, {
            opacity: Math.random() * 0.5 + 0.3,
            repeat: -1,
            yoyo: true,
            duration: 1.8 + Math.random() * 1.2,
            ease: "sine.inOut",
          });
        }
      });

      // Grid columns (Quick Links, Contact, etc.)
      const cols = Array.from(gridRef.current?.children || []);
      cols.forEach((col, i) => {
        gsap.fromTo(
          col,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      });
    });

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[#06131b] text-white pt-16 pb-8 px-5 border-t border-cyan-500/10 relative overflow-hidden"
    >
      {/* Cosmic Glow */}
      <div
        className="absolute top-0 right-0 w-full h-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 90% 20%, #36ccfd16 0%, #139bfd11 75%, transparent 100%)",
          filter: "blur(80px)",
          zIndex: -1,
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {starsData.map((star, i) => (
          <div
            key={i}
            ref={(el) => {
              starRefs.current[i] = el;
            }}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              left: star.left,
              top: star.top,
              opacity: 0, // Will be animated
            }}
          />
        ))}
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="max-w-[1386px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
      >
        {/* Brand */}
        <div>
          <div className="flex items-center mb-6">
            <Image
              ref={logoRef}
              src="/logo.svg"
              height={100}
              width={100}
              alt="Shehroz Logo"
              className="2xl:w-[180px] w-[150px] cursor-pointer"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 leading-tight">
            <span>
              {Array.from("Get Ready To").map((char, idx) => (
                <span
                  key={idx}
                  ref={el => {
                    if (el) textSpanRefs.current.push(el);
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
            <br />
            <span className="text-cyan-300">
              {Array.from("Create Great").map((char, idx) => (
                <span
                  key={idx}
                  ref={(el) => {
                    if (el) textSpanRefs.current.push(el);
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </h2>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Quick Link</h3>
          <ul className="space-y-3">
            {["About", "Services", "Portfolio", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-300 hover:text-cyan-300 transition-colors"
                  onMouseEnter={handleLinkHoverIn}
                  onMouseLeave={handleLinkHoverOut}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Contact</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <a
                href="mailto:shehroz.programmer@gmail.com"
                className="w-6 h-6 bg-cyan-500/10 border border-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition"
                aria-label="Email"
                onMouseEnter={handleContactHoverIn}
                onMouseLeave={handleContactHoverOut}
              >
                <EmailIcon />
              </a>
              <a
                href="mailto:shehroz.programmer@gmail.com"
                className="text-gray-300 hover:text-cyan-300"
              >
                shehroz.programmer@gmail.com
              </a>
            </div>
            <div className="flex items-start gap-3">
              <a
                href="https://github.com/Mr-Shehroz"
                className="w-6 h-6 bg-cyan-500/10 border border-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition"
                aria-label="GitHub"
                onMouseEnter={handleContactHoverIn}
                onMouseLeave={handleContactHoverOut}
              >
                <GithubIcon />
              </a>
              <a
                href="https://github.com/Mr-Shehroz"
                className="text-gray-300 hover:text-cyan-300"
              >
                github.com/Mr-Shehroz
              </a>
            </div>
            <div className="flex items-start gap-3">
              <a
                href="tel:+923255706845"
                className="w-6 h-6 bg-cyan-500/10 border border-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-500/20 transition"
                aria-label="Phone"
                onMouseEnter={handleContactHoverIn}
                onMouseLeave={handleContactHoverOut}
              >
                <PhoneIcon />
              </a>
              <a href="tel:+923255706845" className="text-gray-300 hover:text-cyan-300">
                +923255706845
              </a>
            </div>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Follow Us</h3>
          <div className="flex space-x-4">
            {[
              {
                name: "Instagram",
                href: "https://instagram.com/",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                ),
              },
              {
                name: "LinkedIn",
                href: "https://linkedin.com/in/mr-shehroz/",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    viewBox="0 0 32 32"
                    fill="none"
                    aria-hidden="true"
                  >
                    <text
                      x="7"
                      y="23"
                      fontFamily="Inter, Arial, sans-serif"
                      fontWeight="bold"
                      fontSize="24"
                      fill="currentColor"
                      letterSpacing="1"
                    >
                      in
                    </text>
                  </svg>
                ),
              },
              {
                name: "Twitter",
                href: "https://x.com/",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4l16 16" />
                    <path d="M20 4L4 20" />
                  </svg>
                ),
              },
              {
                name: "Facebook",
                href: "https://facebook.com/",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M14 3v4h3a.5.5 0 0 1 .5.5V9a.5.5 0 0 1-.5.5h-3V13h3a.5.5 0 0 1 .5.5v2.1a.5.5 0 0 1-.5.4h-3V21a.5.5 0 0 1-.5.5h-2.2a.5.5 0 0 1-.5-.5v-5h-2.1a.5.5 0 0 1-.5-.4l-.01-2.08a.5.5 0 0 1 .5-.5h2.11v-2.48c0-2 1.14-3.07 3.17-3.07h2.23a.5.5 0 0 1 .5.5v1.8a.5.5 0 0 1-.5.5H14Z"
                      fill="currentColor"
                    />
                  </svg>
                ),
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                aria-label={social.name}
                className="w-10 h-10 bg-[#0a1a26] border border-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleSocialMouseEnter}
                onMouseLeave={handleSocialMouseLeave}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 pt-6 border-t border-cyan-500/10 flex flex-col sm:flex-row justify-center items-center text-sm text-gray-400">
        <p>© Shehroz 2025 | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;