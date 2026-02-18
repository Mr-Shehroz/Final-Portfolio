'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const highlightsRef = useRef<HTMLDivElement>(null);

  // New: individual refs for card values for "count up" effect
  const numberRef = useRef<HTMLHeadingElement | null>(null);

  const setCardRef = (el: HTMLDivElement | null, i: number) => {
    if (el) cardsRef.current[i] = el;
  };
  const setHeadingRef = (el: HTMLHeadingElement | null, i: number) => {
    headingRefs.current[i] = el;
  };
  const setParaRef = (el: HTMLParagraphElement | null, i: number) => {
    paraRefs.current[i] = el;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 1. Cards: Animate backgrounds, pop and subtle wiggle after in
      if (cardsRef.current.length > 0) {
        cardsRef.current.forEach((el, idx) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: 80 + idx * 10,
              scale: 0.92,
              rotate: -3 + idx * 2,
              filter: 'blur(10px)',
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              filter: 'blur(0px)',
              duration: 1.15,
              ease: 'elastic.out(0.7, 0.5)',
              delay: idx * 0.12,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 82%',
                once: true,
              },
              onComplete: () => {
                // fun: wiggle & pulse when entering
                gsap.to(el, {
                  scale: 1.04,
                  y: -6,
                  boxShadow: '0 0 22px 6px #36ccfd44',
                  duration: 0.18,
                  yoyo: true,
                  repeat: 1,
                  ease: 'sine.inOut',
                  clearProps: 'scale,boxShadow,y',
                  delay: 0.04 + idx * 0.04,
                });
              },
            }
          );
        });
      }

      // 1.2 Count Up Animation on Number
      if (numberRef.current) {
        gsap.fromTo(
          { val: 0 },
          { val: 3 },
          {
            duration: 1.25,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 82%',
              once: true,
            },
            onUpdate: function () {
              if (numberRef.current) {
                numberRef.current.textContent = `${Math.round(this.targets()[0].val)}+`;
              }
            }
          }
        );
      }

      // 2. Headings: Reveal with split-letters stagger and color flicker
      headingRefs.current.forEach((el, idx) => {
        if (el) {
          // Split text into spans for flicker effect, but only for h2 (main heading)
          if (idx === 1) {
            const text = el.textContent ?? '';
            el.innerHTML = text
              .split('')
              .map((l, i) =>
                `<span class='about-h2-letter' style='display:inline-block;'>${l === ' ' ? '&nbsp;' : l}</span>`
              )
              .join('');
            const letterSpans = el.querySelectorAll('.about-h2-letter');

            gsap.fromTo(
              letterSpans,
              {
                opacity: 0,
                y: 32,
                scale: 0.8,
                color: '#3ee5fa',
                filter: 'blur(6px)',
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                color: '#fff',
                filter: 'blur(0px)',
                duration: 0.63,
                stagger: { each: 0.0275, from: 'start' },
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top 79%',
                  once: true,
                },
                onStart: () => {
                  // Random flicker a few letters near the start for more pop
                  letterSpans.forEach((span, i) => {
                    if (Math.random() < 0.13) {
                      gsap.fromTo(
                        span,
                        { color: '#36ccfd', textShadow: '0 0 10px #36ccfd' },
                        {
                          color: '#fff',
                          textShadow: 'none',
                          duration: 0.22 + Math.random() * 0.11,
                          delay: 0.22 + i * 0.03,
                          ease: 'power1.inOut',
                        }
                      );
                    }
                  });
                },
              }
            );
          } else {
            gsap.fromTo(
              el,
              {
                opacity: 0,
                x: -48,
                filter: 'blur(3px)',
                color: '#0ff5f4',
              },
              {
                opacity: 1,
                x: 0,
                filter: 'blur(0)',
                color: '#22d3ee',
                duration: 0.80,
                ease: 'power4.out',
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top 79%',
                  once: true,
                },
                onStart: () => {
                  gsap.to(el, {
                    color: '#67e8f9',
                    duration: 0.3,
                    repeat: 1,
                    yoyo: true,
                    ease: 'sine.in',
                  });
                },
              }
            );
          }
        }
      });

      // 3. Paragraphs: Fade up with "typing reveal" mask
      paraRefs.current.forEach((el, idx) => {
        if (el) {
          // Create typing mask effect (clip-path reveal)
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: 30,
              clipPath: 'inset(0 100% 0 0)', // animate LTR reveal
            },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0% 0 0)',
              duration: 1.1 + idx * 0.13,
              ease: 'power2.inOut',
              delay: 0.21 * idx,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 77%',
                once: true,
              },
            }
          );
        }
      });

      // 4. Expertise Items: Cascade pop, scale flare & rainbow pulse backgrounds
      if (highlightsRef.current) {
        const items = Array.from(
          highlightsRef.current.querySelectorAll('.expertise-highlight')
        );
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 36,
            scale: 0.92,
            filter: 'blur(7px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.65,
            stagger: 0.15,
            ease: 'elastic.out(0.7, 0.65)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
            onStart: () => {
              // Animate dot pulse & color.
              items.forEach((item, i) => {
                const dot = item.querySelector('.glow-dot');
                if (dot) {
                  gsap.fromTo(
                    dot,
                    {
                      scale: 0.65,
                      boxShadow: '0 0 0px 0px #36ccfd00',
                      background:
                        'radial-gradient(circle at 50% 30%, #2ee6fa 65%, #06b6d4 100%)',
                    },
                    {
                      scale: 1,
                      boxShadow: '0 0 16px 7px #36ccfd77, 0 0 8px 3px #2ee6fa66',
                      background:
                        'radial-gradient(circle at 60% 45%, #67e8f9 20%, #0ea5e9 100%)',
                      duration: 0.48,
                      delay: 0.22 + i * 0.12,
                      ease: 'elastic.out(1.2,0.5)',
                      onComplete: () => {
                        // Pulse color for fun
                        gsap.to(dot, {
                          boxShadow: '0 0 16px 16px #a5b4fc77',
                          background:
                            'radial-gradient(circle at 40% 85%, #a5b4fc 40%, #2dd4bf 100%)',
                          duration: 0.33,
                          yoyo: true,
                          repeat: 1,
                          ease: 'power1.inOut',
                          clearProps: 'boxShadow,background',
                        });
                      },
                    }
                  );
                }
              });
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .glow-border {
          position: relative;
          box-shadow: 0 0 4px 1.5px #139bfd22, 0 0 1px 0.5px #36ccfd33;
          border-color: #25aefc;
          transition: 
            box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.3s ease;
        }
        .glow-border:hover, .glow-border:focus-within {
          box-shadow: 0 0 16px 4px #3ee5fa55, 0 0 2px 1px #36ccfd99;
          border-color: #36ccfd;
          z-index: 2;
          transform: translateY(-2px) scale(1.02);
        }
        .glow-border .glow-effect {
          opacity: 0;
          pointer-events: none;
          position: absolute;
          inset: 0;
          z-index: 1;
          border-radius: inherit;
          background: radial-gradient(circle at 60% 45%, #36ccfd28 0%, transparent 70%);
          filter: blur(12px);
        }
        .glow-border:hover .glow-effect {
          opacity: 0.6;
        }
        .glow-dot {
          transition: box-shadow 0.28s cubic-bezier(.45,1.53,.8,1), transform 0.18s ease, background 0.4s;
        }
        .glow-dot:hover, .group:hover .glow-dot {
          box-shadow: 0 0 16px 7px #2ee6fa99;
          transform: scale(1.16) rotate(-8deg);
          background: radial-gradient(circle at 80% 28%, #0ff5f4 50%, #22d3ee 100%);
        }
        .about-h2-letter {
          will-change: opacity, transform, color, filter;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="about"
        className="text-white py-20 px-5 mx-auto max-w-[1386px]"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Stats Cards */}
          <div className="flex flex-col gap-8 w-full md:w-auto">
            <div
              className="glow-border bg-[#06131b]/80 backdrop-blur-sm border border-cyan-500/40 rounded-3xl flex flex-col justify-center items-center w-full xl:max-w-[626px] md:max-w-[40vw] xl:h-[397px] h-[300px] text-center px-8 sm:px-16 md:px-28 leading-tight relative overflow-hidden light"
              ref={(el) => setCardRef(el, 0)}
            >
              <div className="glow-effect" />
              <h1 ref={numberRef} className="text-6xl sm:text-[55px] xl:text-[80px] font-bold mb-4 sm:mb-8 z-10 relative">
                3+
              </h1>
              <p className="text-2xl sm:text-3xl xl:text-[48px] font-bold z-10 relative">
                Years Of Experience
              </p>
            </div>

            <div
              className="glow-border bg-[#06131b]/80 backdrop-blur-sm border border-cyan-500/35 rounded-3xl flex items-center px-4 sm:px-6 xl:px-10 gap-4 xl:h-[166px] h-[140px] w-full xl:max-w-[626px] md:max-w-[40vw] relative overflow-hidden light1"
              ref={(el) => setCardRef(el, 1)}
            >
              <div className="glow-effect" />
              <div className="shrink-0 w-[80px] h-[80px] xl:w-[100px] xl:h-[100px] border border-[#139bfd] rounded-full flex items-center justify-center glow-dot bg-black/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="text-[#139bfd] xl:w-12 xl:h-12 w-9 h-9"
                >
                  <rect x="3" y="7" width="18" height="11" rx="2.3" stroke="currentColor" strokeWidth="1.7" fill="none"/>
                  <path d="M9 7V6.2A2.2 2.2 0 0 1 11.2 4h1.6A2.2 2.2 0 0 1 15 6.2V7" stroke="currentColor" strokeWidth="1.7" fill="none"/>
                  <rect x="8.2" y="12.2" width="2.4" height="2.2" rx="0.6" fill="currentColor" opacity="0.7"/>
                  <rect x="13.4" y="12.2" width="2.4" height="2.2" rx="0.6" fill="currentColor" opacity="0.5"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl sm:text-2xl xl:text-[27px]">Full Stack Development</h3>
                <p className="text-base xl:text-lg text-white/90">30+ Projects Delivered</p>
              </div>
            </div>
          </div>

          {/* Right Column - Narrative */}
          <div className="w-full md:w-[690px] space-y-6">
            <div>
              <h5
                className="text-cyan-400 text-sm sm:text-base uppercase tracking-wider"
                ref={(el) => setHeadingRef(el, 0)}
              >
                ABOUT ME
              </h5>
              <h2
                className="text-[32px] sm:text-4xl xl:text-[40px] 2xl:text-[45px] font-bold mt-2"
                ref={(el) => setHeadingRef(el, 1)}
              >
                Engineering Scalable Solutions with Code & Intelligence
              </h2>
              <p
                className="mt-4 text-gray-300 leading-relaxed text-base xl:text-lg"
                ref={(el) => setParaRef(el, 0)}
              >
                I specialize in building robust, high-performance web applications from concept to deployment — combining clean frontend experiences with powerful backend systems.
              </p>
              <p
                className="mt-4 text-gray-300 leading-relaxed text-base xl:text-lg"
                ref={(el) => setParaRef(el, 1)}
              >
                Beyond development, I design intelligent automation workflows that eliminate manual effort, reduce operational costs, and accelerate business processes — turning complex tasks into seamless, error-free systems.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6" ref={highlightsRef}>
              <div className="flex items-start gap-3 group expertise-highlight">
                <div className="mt-1 w-2 h-2 rounded-full bg-cyan-400 glow-dot" />
                <span className="text-base xl:text-lg group-hover:text-cyan-300 transition-colors">
                  End-to-End Web Application Architecture
                </span>
              </div>
              <div className="flex items-start gap-3 group expertise-highlight">
                <div className="mt-1 w-2 h-2 rounded-full bg-cyan-400 glow-dot" />
                <span className="text-base xl:text-lg group-hover:text-cyan-300 transition-colors">
                  Dynamic User Interfaces with Modern Frameworks
                </span>
              </div>
              <div className="flex items-start gap-3 group expertise-highlight">
                <div className="mt-1 w-2 h-2 rounded-full bg-cyan-400 glow-dot" />
                <span className="text-base xl:text-lg group-hover:text-cyan-300 transition-colors">
                  Intelligent Process Automation & Integration
                </span>
              </div>
              <div className="flex items-start gap-3 group expertise-highlight">
                <div className="mt-1 w-2 h-2 rounded-full bg-cyan-400 glow-dot" />
                <span className="text-base xl:text-lg group-hover:text-cyan-300 transition-colors">
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
