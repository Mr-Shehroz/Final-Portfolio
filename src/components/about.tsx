'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const About = () => {
  // Refs for animation
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const highlightsRef = useRef<HTMLDivElement>(null);

  // Helper for cards ref
  const setCardRef = (el: HTMLDivElement, i: number) => {
    cardsRef.current[i] = el;
  };
  // Helper for heading/paras ref
  const setHeadingRef = (el: HTMLHeadingElement | null, i: number) => {
    headingRefs.current[i] = el;
  };
  const setParaRef = (el: HTMLParagraphElement | null, i: number) => {
    paraRefs.current[i] = el;
  };

  useEffect(() => {
    // Section fade-in with slight parallax
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 32, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: 'expo.out',
      }
    );

    // Animate cards: slide up + subtle scale with stagger
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 48, scale: 0.96, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.25,
        }
      );
    }

    // Animate headings: fade in and letter pop for "ABOUT ME" and subtitle
    headingRefs.current.forEach((el, idx) => {
      if (el)
        gsap.fromTo(
          el,
          { opacity: 0, y: 25, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0)',
            duration: 0.85,
            ease: 'power3.out',
            delay: 0.45 + idx * 0.11,
          }
        );
    });

    // Parags: fade + slide up
    paraRefs.current.forEach((el, idx) => {
      if (el)
        gsap.fromTo(
          el,
          { opacity: 0, y: 32, scale: 0.97 },
          {
            opacity: 0.85,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.3)',
            delay: 0.7 + idx * 0.12,
          }
        );
    });

    // Animate highlights group: grid expertise popping with stagger
    if (highlightsRef.current) {
      gsap.fromTo(
        highlightsRef.current.querySelectorAll('.expertise-highlight'),
        { opacity: 0, x: 32 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.11,
          duration: 0.65,
          ease: 'power2.out',
          delay: 1,
        }
      );
    }
  }, []);

  return (
    <>
      {/* Glowing border styles with smaller, attractive effect */}
      <style>
        {`
          .glow-border {
            position: relative;
            transition: 
              box-shadow 0.2s cubic-bezier(.36,1.17,.53,.97), 
              border-color 0.25s;
            /* Add a subtle glow and a slightly lighter static border */
            box-shadow: 0 0 4px 1.5px #139bfd22, 0 0 1px 0.5px #36ccfd33;
            border-color: #25aefc;
          }
          .glow-border:hover, .glow-border:focus-within {
            box-shadow: 0 0 8px 2px #36ccfd66, 0 0 0.5px 1px #139bfd88;
            border-color: #36ccfd;
            z-index: 2;
          }
          .glow-border .glow-effect {
            opacity: 0;
            pointer-events: none;
            position: absolute;
            inset: 0;
            z-index: 1;
            transition: opacity 0.24s;
            border-radius: inherit;
          }
          .glow-border:hover .glow-effect,
          .glow-border:focus-within .glow-effect {
            opacity: 0.55;
          }
          .glow-border .glow-effect {
            background: radial-gradient(circle at 60% 45%, #36ccfd30 0%, #139bfd07 67%, transparent 100%);
            filter: blur(10px);
          }
          .glow-dot {
            transition: box-shadow 0.18s;
          }
          .glow-dot:hover, .group:hover .glow-dot {
            box-shadow: 0 0 6px 2px #06b6d4ca;
          }
        `}
      </style>
      <section
        ref={sectionRef}
        id="about"
        className="text-white py-20 px-5 mx-auto max-w-[1386px]"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Stats Cards */}
          <div
            className="flex flex-col gap-8 w-full md:w-auto"
            ref={cardsContainerRef}
          >
            {/* Experience Card */}
            <div
              className="glow-border bg-[#06131b] border border-cyan-500/40 rounded-3xl flex flex-col justify-center items-center w-full xl:max-w-[626px] md:max-w-[40vw] xl:h-[397px] h-[300px] text-center px-8 sm:px-16 md:px-28 leading-tight relative overflow-hidden light"
              ref={(el) => {
                if (el) setCardRef(el, 0);
              }}
            >
              <div className="glow-effect pointer-events-none" />
              <h1 className="text-6xl sm:text-[55px] xl:text-[80px] font-bold mb-4 sm:mb-8 z-10 relative">
                3+
              </h1>
              <p className="text-2xl sm:text-3xl xl:text-[48px] font-bold z-10 relative">
                Years Of Experience
              </p>
            </div>

            {/* Projects Card */}
            <div
              className="glow-border bg-[#06131b] border border-cyan-500/35 rounded-3xl flex items-center px-4 sm:px-6 xl:px-10 gap-4 xl:h-[166px] h-[140px] w-full xl:max-w-[626px] md:max-w-[40vw] relative light1 overflow-hidden"
              ref={(el) => {
                if (el) setCardRef(el, 1);
              }}
            >
              <div className="glow-effect pointer-events-none" />
              <div className="shrink-0 w-[80px] h-[80px] xl:w-[100px] xl:h-[100px] border border-[#139bfd] rounded-full flex items-center justify-center glow-dot bg-black/30">
                {/* Briefcase icon representing projects */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="text-[#139bfd] xl:w-12 xl:h-12 w-9 h-9"
                >
                  <rect
                    x="3"
                    y="7"
                    width="18"
                    height="11"
                    rx="2.3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    fill="none"
                  />
                  <path
                    d="M9 7V6.2A2.2 2.2 0 0 1 11.2 4h1.6A2.2 2.2 0 0 1 15 6.2V7"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    fill="none"
                  />
                  <rect
                    x="8.2"
                    y="12.2"
                    width="2.4"
                    height="2.2"
                    rx="0.6"
                    fill="currentColor"
                    opacity="0.7"
                  />
                  <rect
                    x="13.4"
                    y="12.2"
                    width="2.4"
                    height="2.2"
                    rx="0.6"
                    fill="currentColor"
                    opacity="0.5"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl sm:text-2xl xl:text-[27px]">
                  Full Stack Development
                </h3>
                <p className="text-base xl:text-lg text-white opacity-80">
                  30+ Projects Delivered
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Narrative */}
          <div className="w-full md:w-[690px] space-y-6">
            <div>
              <h5
                className="text-cyan-400 text-sm sm:text-base uppercase tracking-wider"
                ref={el => setHeadingRef(el, 0)}
              >
                ABOUT ME
              </h5>
              <h2
                className="text-3xl sm:text-4xl xl:text-5xl font-bold mt-2"
                ref={el => setHeadingRef(el, 1)}
              >
                Engineering Scalable Solutions with Code & Intelligence
              </h2>
              <p
                className="mt-4 text-gray-300 leading-relaxed text-base xl:text-lg"
                ref={el => setParaRef(el, 0)}
              >
                I specialize in building robust, high-performance web applications from concept to deployment — combining clean frontend experiences with powerful backend systems.
              </p>
              <p
                className="mt-4 text-gray-300 leading-relaxed text-base xl:text-lg"
                ref={el => setParaRef(el, 1)}
              >
                Beyond development, I design intelligent automation workflows that eliminate manual effort, reduce operational costs, and accelerate business processes — turning complex tasks into seamless, error-free systems.
              </p>
            </div>

            {/* Expertise Highlights */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
              ref={highlightsRef}
            >
              <div className="flex items-start gap-3 group expertise-highlight">
                <div className="mt-1 w-2 h-2 rounded-full bg-cyan-400 glow-dot" />
                <span className="text-base xl:text-lg">
                  End-to-End Web Application Architecture
                </span>
              </div>
              <div className="flex items-start gap-3 group expertise-highlight">
                <div className="mt-1 w-2 h-2 rounded-full bg-cyan-400 glow-dot" />
                <span className="text-base xl:text-lg">
                  Dynamic User Interfaces with Modern Frameworks
                </span>
              </div>
              <div className="flex items-start gap-3 group expertise-highlight">
                <div className="mt-1 w-2 h-2 rounded-full bg-cyan-400 glow-dot" />
                <span className="text-base xl:text-lg">
                  Intelligent Process Automation & Integration
                </span>
              </div>
              <div className="flex items-start gap-3 group expertise-highlight">
                <div className="mt-1 w-2 h-2 rounded-full bg-cyan-400 glow-dot" />
                <span className="text-base xl:text-lg">
                  Scalable APIs & Real-Time Data Systems
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;