"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import gsap from "gsap";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    name: "Instagram",
    icon: (
      <svg className="2xl:w-[18px] 2xl:h-[18px] w-[14px] h-[14px]" width="18" height="18" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.75 2.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5z" />
      </svg>
    ),
    href: "#",
  },
  {
    name: "LinkedIn",
    icon: (
      <svg className="2xl:w-[18px] 2xl:h-[18px] w-[14px] h-[14px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M196.3 512L103.4 512L103.4 212.9L196.3 212.9L196.3 512zM149.8 172.1C120.1 172.1 96 147.5 96 117.8C96 103.5 101.7 89.9 111.8 79.8C121.9 69.7 135.6 64 149.8 64C164 64 177.7 69.7 187.8 79.8C197.9 89.9 203.6 103.6 203.6 117.8C203.6 147.5 179.5 172.1 149.8 172.1zM543.9 512L451.2 512L451.2 366.4C451.2 331.7 450.5 287.2 402.9 287.2C354.6 287.2 347.2 324.9 347.2 363.9L347.2 512L254.4 512L254.4 212.9L343.5 212.9L343.5 253.7L344.8 253.7C357.2 230.2 387.5 205.4 432.7 205.4C526.7 205.4 544 267.3 544 347.7L544 512L543.9 512z" />
      </svg>
    ),
    href: "#",
  },
  {
    name: "Twitter",
    icon: (
      <svg className="2xl:w-[18px] 2xl:h-[18px] w-[14px] h-[14px]" width="18" height="18" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M22.46 5.92c-.79.35-1.63.59-2.51.7a4.16 4.16 0 0 0 1.82-2.29c-.8.47-1.68.8-2.62.99a4.13 4.13 0 0 0-7.05 3.76c-3.44-.17-6.5-1.82-8.54-4.33a4.16 4.16 0 0 0-.56 2.08c0 1.44.73 2.7 1.85 3.44a4.1 4.1 0 0 1-1.87-.52v.05c0 2.01 1.43 3.7 3.33 4.08a4.16 4.16 0 0 1-1.09.14c-.27 0-.52-.03-.78-.07a4.13 4.13 0 0 0 3.85 2.88A8.34 8.34 0 0 1 2 19.21a11.76 11.76 0 0 0 6.29 1.84c7.55 0 11.69-6.26 11.69-11.7l-.01-.53A8.7 8.7 0 0 0 24 4.59c-.7.31-1.44.53-2.22.66z" />
      </svg>
    ),
    href: "#",
  },
  {
    name: "Facebook",
    icon: (
      <svg className="2xl:w-[18px] 2xl:h-[18px] w-[14px] h-[14px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M240 363.3L240 576L356 576L356 363.3L442.5 363.3L460.5 265.5L356 265.5L356 230.9C356 179.2 376.3 159.4 428.7 159.4C445 159.4 458.1 159.8 465.7 160.6L465.7 71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4L240 265.5L174 265.5L174 363.3L240 363.3z" />
      </svg>
    ),
    href: "#",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animation refs
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const socialDesktopRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  // Animate header, logo, nav links, and social icons on mount
  useEffect(() => {
    // Header entrance
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -72, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
        }
      );
    }

    // Logo pop in
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "expo.out", delay: 0.25 }
      );
    }

    // Nav links sequential fade/slide
    if (navRef.current) {
      gsap.fromTo(
        navRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.09,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.5
        }
      );
    }

    // Social icons desktop
    if (socialDesktopRef.current) {
      gsap.fromTo(
        socialDesktopRef.current.children,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.6,
          ease: "back.out(1.4)",
          stagger: 0.09,
          delay: 0.9,
        }
      );
    }
  }, []);

  // Animate mobile dropdown open/close
  useEffect(() => {
    if (mobileDropdownRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(
          mobileDropdownRef.current,
          { y: -30, opacity: 0, pointerEvents: 'none' },
          { y: 0, opacity: 1, pointerEvents: 'auto', duration: 0.4, ease: "power3.out" }
        );
        // Animate links inside dropdown
        gsap.fromTo(
          mobileDropdownRef.current.querySelectorAll("li"),
          { x: -24, opacity: 0 },
          {
            x: 0, opacity: 1,
            stagger: 0.09,
            delay: 0.13,
            duration: 0.55,
            ease: "expo.out"
          }
        );
        // Animate mobile socials
        gsap.fromTo(
          mobileDropdownRef.current.querySelectorAll("a[aria-label]"),
          { scale: 0.65, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.42, ease: "back.out(1.5)", stagger: 0.07, delay: 0.07 }
        );
      } else {
        gsap.to(mobileDropdownRef.current, {
          y: -30,
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.35,
          ease: "power2.in",
        });
      }
    }
  }, [isMenuOpen]);

  // Close menu on route change (optional if using Next.js App Router)
  useEffect(() => {
    const handleRouteChange = () => setIsMenuOpen(false);
    return () => {};
  }, []);

  return (
    <header
      ref={headerRef}
      className="
        w-full fixed top-0 z-50
        bg-[#06131b]/60
        backdrop-blur-md
        border-x border-b border-white/10
        py-0
        rounded-b-2xl
        shadow-[0_4px_32px_rgba(14,25,41,0.24)]
        max-h-[90px]
      "
      style={{
        WebkitBackdropFilter: "blur(18px)",
        backdropFilter: "blur(18px)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6">
        <div className="flex items-center h-[74px] sm:h-[86px]">
          {/* Logo */}
          <div className="flex items-center min-w-[88px] sm:min-w-[110px] mr-3 sm:mr-8" ref={logoRef}>
            <Link href="#" className="inline-block group">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={108}
                height={36}
                className="h-auto 2xl:w-[170px] w-[138px] sm:w-[155px] transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 min-w-[180px] justify-center">
            <ul
              className="flex flex-wrap justify-center gap-x-2 2xl:gap-x-5 gap-y-1"
              ref={navRef}
            >
              {navLinks.map((link, idx) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`text-white hover:bg-[#0C1524dd] hover:text-[#139bfd] transition-all duration-300 font-bold 2xl:text-[1.09rem] text-[15px] px-3.5 py-2 rounded-xl whitespace-nowrap ${montserrat.className}`}
                    tabIndex={0}
                    style={{
                      transition:
                        "color 0.23s cubic-bezier(.7,0,.3,1), background 0.26s cubic-bezier(.8,0,.15,1), transform 0.25s cubic-bezier(.7,0,.2,1)",
                    }}
                    onMouseEnter={e => {
                      gsap.to(e.currentTarget, { scale: 1.09, duration: 0.19, ease: "power1.out" });
                    }}
                    onMouseLeave={e => {
                      gsap.to(e.currentTarget, { scale: 1.0, duration: 0.15, ease: "power1.out" });
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Icons (Visible on all screens) */}
          <div
            className="hidden lg:flex min-w-[105px] justify-end items-center xl:gap-3 gap-2 ml-4"
            ref={socialDesktopRef}
          >
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="group relative 2xl:w-10 2xl:h-10 w-8 h-8 rounded-full 
                  bg-[#0B0704aa] flex items-center justify-center text-white 
                  hover:bg-sky-500 hover:text-black 
                  transition-all duration-300 ease-in-out
                  shadow-sm hover:shadow-lg
                  border border-gray-700/30 hover:border-sky-400/50
                  backdrop-blur-sm
                  hover:scale-110"
                tabIndex={0}
                onMouseEnter={e =>
                  gsap.to(e.currentTarget, { scale: 1.13, boxShadow: "0 4px 18px #139bfd55", duration: 0.18, ease: "sine.out" })
                }
                onMouseLeave={e =>
                  gsap.to(e.currentTarget, { scale: 1.0, boxShadow: "0 1px 5px #139bfd1a", duration: 0.22, ease: "sine.out" })
                }
              >
                <span className="transition-transform group-hover:scale-110">{social.icon}</span>
                <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 bg-gradient-to-br from-sky-400 to-blue-500 blur-sm"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden ml-auto flex items-center justify-center w-11 h-11 text-[#139bfd] focus:outline-none rounded-xl bg-[#17243615] hover:bg-[#0e1e2a33] transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            tabIndex={0}
            style={{
              transition: "transform 0.15s cubic-bezier(.7,0,.3,1)",
            }}
            onMouseDown={e =>
              gsap.to(e.currentTarget, { scale: 0.93, duration: 0.12, ease: "power1.in" })
            }
            onMouseUp={e =>
              gsap.to(e.currentTarget, { scale: 1, duration: 0.14, ease: "power1.out" })
            }
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          style={{
            pointerEvents: isMenuOpen ? "auto" : "none",
            minHeight: isMenuOpen ? 182 : 0,
          }}
        >
          <div
            className="lg:hidden py-4 border-t border-gray-800 mt-1 
                       rounded-2xl shadow-2xl 
                       relative
                       z-30
                       backdrop-blur-xl
                       bg-gradient-to-br from-[#101B28ee] to-[#112233bb]
                       "
            ref={mobileDropdownRef}
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? "translateY(0px)" : "translateY(-30px)",
              willChange: "opacity, transform",
              boxShadow: "0 8px 32px 8px rgba(14,25,41,0.24), 0 1.5px 12px 0 rgba(50,120,255,0.07)",
              border: "1px solid rgba(255,255,255,0.07)",
              WebkitBackdropFilter: "blur(19px)",
              backdropFilter: "blur(19px)",
              marginTop: "-5px"
            }}
            aria-hidden={!isMenuOpen}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            <div className="flex justify-end mb-4 pr-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="ml-3 group relative w-9 h-9 rounded-full 
                    bg-[#0B0704bb] flex items-center justify-center text-white 
                    hover:bg-sky-500 hover:text-black 
                    transition-all duration-300 ease-in-out
                    shadow-sm hover:shadow-md
                    border border-gray-700/30 hover:border-sky-400/50
                    backdrop-blur-md"
                  tabIndex={isMenuOpen ? 0 : -1}
                  onMouseEnter={e =>
                    gsap.to(e.currentTarget, { scale: 1.11, boxShadow: "0 4px 14px #139bfd55", duration: 0.17, ease: "expo.out" })
                  }
                  onMouseLeave={e =>
                    gsap.to(e.currentTarget, { scale: 1.0, boxShadow: "0 1px 5px #139bfd16", duration: 0.16, ease: "expo.out" })
                  }
                >
                  <span className="text-[16px] transition-transform group-hover:scale-110">
                    {social.icon}
                  </span>
                </Link>
              ))}
            </div>

            <ul className="flex flex-col gap-2 px-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`block text-white hover:bg-[#142138]/90 hover:text-[#139bfd] transition-all font-bold px-4 py-3 rounded-xl ${montserrat.className}`}
                    onClick={() => setIsMenuOpen(false)}
                    tabIndex={isMenuOpen ? 0 : -1}
                    style={{
                      transition:
                        "color 0.15s cubic-bezier(.5,0,.3,1), background 0.18s cubic-bezier(.8,0,.15,1), transform 0.22s cubic-bezier(.91,-0.02,.2,1.23)",
                    }}
                    onMouseEnter={e => {
                      gsap.to(e.currentTarget, { scale: 1.07, duration: 0.13, ease: "sine.out" });
                    }}
                    onMouseLeave={e => {
                      gsap.to(e.currentTarget, { scale: 1.0, duration: 0.16, ease: "sine.out" });
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;