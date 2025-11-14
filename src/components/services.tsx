"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imgHovered, setImgHovered] = useState(false);

  // Refs for animation targets
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const services = [
    {
      title: "Full Stack Web Development",
      description:
        "I build scalable, high-performance web applications from front to back — using modern frameworks to deliver seamless user experiences and robust backend systems.",
    },
    {
      title: "Intelligent Process Automation",
      description:
        "I design automated workflows that eliminate repetitive tasks, reduce human error, and accelerate business operations — turning manual processes into intelligent, self-running systems.",
    },
    {
      title: "API Integration & System Architecture",
      description:
        "I architect modular, future-proof systems with clean APIs and real-time data flows — connecting your tools, platforms, and services into a unified, scalable ecosystem.",
    },
  ];

  // Modern, attractive GSAP animations
  useEffect(() => {
    // Animate Header & Subtitle
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 34, filter: "blur(7px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          stagger: 0.14,
          ease: "expo.out",
          delay: 0.13,
        }
      );
    }

    // Animate cards (staggered pop, skew+fade)
    if (cardRefs.current && cardRefs.current.length) {
      gsap.fromTo(
        cardRefs.current,
        {
          opacity: 0,
          y: 62,
          scale: 0.97,
          filter: "blur(13px)",
          rotateZ: -7,
          skewY: 3,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          rotateZ: 0,
          skewY: 0,
          duration: 1.08,
          ease: "back.out(1.65)",
          stagger: 0.16,
          delay: 0.35,
        }
      );
    }

    // Animate image entrance (slide, fade, elastic scale)
    if (imgContainerRef.current) {
      gsap.fromTo(
        imgContainerRef.current,
        {
          opacity: 0,
          y: 64,
          scale: 0.87,
          filter: "blur(12px)",
          rotate: 5
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.38,
          rotate: 0,
          ease: "elastic.out(1, 0.65)",
          delay: 0.6,
        }
      );
    }
  }, []);

  // Animate card sparkle when hovered
  useEffect(() => {
    if (
      hoveredIndex !== null &&
      cardRefs.current[hoveredIndex]
    ) {
      const sparkle = cardRefs.current[hoveredIndex].querySelector(
        ".services-card-sparkle"
      );
      if (sparkle) {
        gsap.fromTo(
          sparkle,
          { opacity: 0, scale: 0.8, rotate: -10, y: -8, x: 8 },
          {
            opacity: 0.95,
            scale: 1.3,
            rotate: 0,
            y: 0,
            x: 0,
            duration: 0.5,
            ease: "expo.out",
            overwrite: "auto",
          }
        );
        // Fade sparkle away
        gsap.to(sparkle, {
          opacity: 0,
          duration: 0.5,
          delay: 0.48,
          ease: "power1.in",
        });
      }
    }
  }, [hoveredIndex]);

  // Animate the hero image sparkle on image hover
  useEffect(() => {
    if (imgContainerRef.current) {
      const sparkle = imgContainerRef.current.querySelector(".services-img-sparkle");
      if (imgHovered && sparkle) {
        gsap.fromTo(
          sparkle,
          { opacity: 0, y: 15, scale: 0.8, rotate: 18 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.64,
            ease: "expo.out",
            overwrite: "auto",
          }
        );
        gsap.to(sparkle, {
          opacity: 0,
          duration: 0.55,
          delay: 0.7,
          ease: "power1.in",
        });
      }
    }
  }, [imgHovered]);

  return (
    <>
      <style>
        {`
          .services-glow {
            position: absolute;
            inset: 0;
            pointer-events: none;
            transition: opacity 0.23s;
            opacity: 0;
            border-radius: 1.5rem;
            z-index: 1;
          }
          .services-card:hover .services-glow,
          .services-card:focus-within .services-glow {
            opacity: 1;
          }
          .services-glow {
            background: radial-gradient(circle at 60% 40%, #36ccfd44 12%, #139bfd19 78%, transparent 100%);
            filter: blur(18px);
          }
          .services-card {
            position: relative;
            overflow: visible;
            will-change: box-shadow, transform;
          }
          .services-card:hover,
          .services-card:focus-within {
            box-shadow: 0 10px 38px 0 #13b5fd45, 0 0 36px 5px #3dd2ff33;
            z-index: 2;
            border-color: #36ccfd;
            transform: translateY(-8px) scale(1.04) rotate(-1.9deg);
          }
          .services-card .animated-underline {
            position: relative;
            display: inline-block;
            cursor: pointer;
          }
          .services-card .animated-underline::after {
            content: '';
            display: block;
            width: 100%;
            height: 2.2px;
            background: linear-gradient(90deg, #139bfd 12%, #36ccfd 88%);
            border-radius: 2px;
            transform: scaleX(0);
            transition: transform 0.47s cubic-bezier(.17,.84,.47,1.13);
            transform-origin: left;
            position: absolute;
            bottom: -4.5px;
            left: 0;
            opacity: 1;
          }
          .services-card:hover .animated-underline::after,
          .services-card:focus-within .animated-underline::after {
            transform: scaleX(1);
          }
          .services-card-sparkle {
            position: absolute;
            top: 10px;
            right: 22px;
            z-index: 10;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.25s;
            width: 23px;
            height: 23px;
          }

          .services-img-container {
            transition: box-shadow 0.39s cubic-bezier(.22,1,.36,1), transform 0.36s cubic-bezier(.21,.87,.54,1.15);
            box-shadow: 0 2px 24px 0 #11baff25, 0 0 3px 1px #0097fc19;
            position: relative;
            will-change: box-shadow, transform;
          }
          .services-img-container:hover,
          .services-img-container.img-hovered,
          .services-img-container:focus-within {
            box-shadow: 0 18px 64px 0 #07b6ec94, 0 0 26px 7px #139bfd50;
            transform: scale(1.035) translateY(-11px) rotate(-1.5deg);
            z-index: 2;
          }
          .services-img-glow {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s;
            position: absolute;
            inset: 0;
            z-index: 2;
            border-radius: 1.5rem;
            background: radial-gradient(circle at 65% 55%, #36ccfd2b 0%, #139bfd28 65%, transparent 100%);
            filter: blur(18px);
          }
          .services-img-container:hover .services-img-glow,
          .services-img-container.img-hovered .services-img-glow,
          .services-img-container:focus-within .services-img-glow {
            opacity: 0.96;
          }
          .services-img-sparkle {
            pointer-events: none;
            position: absolute;
            opacity: 0;
            z-index: 13;
            top: 3%;
            right: 2%;
            width: 44px;
            height: 44px;
          }
          @media (max-width: 1024px) {
            .services-img-container {
              max-width: 50vw !important;
              height: 620px !important;
            }
            .services-img-glow {
              border-radius: 1.15rem;
            }
          }
          @media (max-width: 640px) {
            .services-img-container {
              height: 400px !important;
              max-width: 98vw !important;
              border-width: 7px !important;
              border-radius: 1rem !important;
            }
          }
          @media (max-width: 768px) {
            .services-card {
              padding: 2rem 1.1rem !important;
            }
          }
        `}
      </style>

      <section
        id="services"
        className="text-white py-14 sm:py-20 px-2 px-5 mx-auto max-w-[1386px]"
        ref={sectionRef}
      >
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-12">
          <h5 className="text-cyan-400 text-xs sm:text-sm uppercase tracking-widest font-semibold">
            LATEST SERVICE
          </h5>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mt-2">
            Inspiring The World One Project
          </h2>
          <p className="mt-4 text-gray-300 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
            I deliver end-to-end technical solutions that empower businesses to
            operate smarter, scale faster, and innovate continuously — combining
            code with intelligence.
          </p>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-center justify-between w-full">
          {/* Left Column - Service Cards */}
          <div className="w-full md:w-[51%] space-y-5 sm:space-y-8 flex-shrink-0">
            {services.map((service, index) => (
              <div
                key={index}
                className={`services-card bg-[#06131b] border border-cyan-500/25 rounded-3xl p-7 xl:p-10 transition-all duration-300 cursor-pointer`}
                tabIndex={0}
                ref={el => { cardRefs.current[index] = el; }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                style={{
                  minHeight: "146px",
                  maxWidth: "100%",
                  outline: "none",
                }}
              >
                <div className="services-glow" aria-hidden="true"></div>
                <h3 className="text-[1.17rem] sm:text-2xl font-bold mb-3 text-cyan-300 animated-underline">
                  {String(index + 1).padStart(2, "0")}. {service.title}
                </h3>
                <p className="text-gray-300 text-[0.97rem] sm:text-base leading-relaxed">
                  {service.description}
                </p>
                {/* Sparkle effect */}
                <svg
                  className="services-card-sparkle"
                  fill="none"
                  viewBox="0 0 37 37"
                  aria-hidden="true"
                >
                  <g filter="url(#services-card-shiny)">
                    <path
                      d="M18.5 5L21.2 15.5L32 18.5L21.2 21.5L18.5 32L15.8 21.5L5 18.5L15.8 15.5L18.5 5Z"
                      fill="#23d5ff"
                      fillOpacity="0.6"
                    />
                  </g>
                  <defs>
                    <filter
                      id="services-card-shiny"
                      x="0"
                      y="0"
                      width="37"
                      height="37"
                      filterUnits="userSpaceOnUse"
                    >
                      <feGaussianBlur stdDeviation="1.1" />
                    </filter>
                  </defs>
                </svg>
              </div>
            ))}
          </div>

          {/* Right Column - Hero Image / Visual */}
          <div className="w-full mb-8 md:mb-0 md:w-[49%] flex justify-center items-center">
            <div
              className={`relative services-img-container w-full max-w-[406px] sm:max-w-[520px] md:max-w-[562px] h-[220px] sm:h-[350px] md:h-[440px] lg:h-[650px] rounded-2xl overflow-hidden border-[10px] md:border-[14px] lg:border-[15px] border-[#06131B] bg-black light2
              ${imgHovered ? "img-hovered" : ""}
              `}
              onMouseEnter={() => setImgHovered(true)}
              onMouseLeave={() => setImgHovered(false)}
              tabIndex={0}
              onFocus={() => setImgHovered(true)}
              onBlur={() => setImgHovered(false)}
              style={{ boxSizing: "border-box" }}
              ref={imgContainerRef}
            >
              <img
                src="/about.svg"
                alt="Full Stack Developer & Automation Specialist"
                className="w-full h-full object-cover transition-[transform] duration-400"
                style={{
                  transition: "transform 0.33s cubic-bezier(.39,1.17,.65,1)",
                  transform: imgHovered
                    ? "scale(1.06) rotate(-2.7deg)"
                    : "scale(1) rotate(0)",
                  zIndex: 3,
                  position: "relative",
                }}
              />
              <div className="services-img-glow" aria-hidden="true"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none z-[2]"></div>
              <svg
                className="services-img-sparkle"
                fill="none"
                viewBox="0 0 64 64"
                aria-hidden="true"
              >
                <g filter="url(#services-svg-sparkle)">
                  <path
                    d="M32 9L36.3 27.7L55 32L36.3 36.3L32 55L27.7 36.3L9 32L27.7 27.7L32 9Z"
                    fill="#23d5ff"
                    fillOpacity="0.52"
                  />
                  <path
                    d="M32 16L34.5 26.5L45 29L34.5 31.5L32 42L29.5 31.5L19 29L29.5 26.5L32 16Z"
                    fill="#13b4fd"
                    fillOpacity="0.51"
                  />
                </g>
                <defs>
                  <filter
                    id="services-svg-sparkle"
                    x="0"
                    y="0"
                    width="64"
                    height="64"
                    filterUnits="userSpaceOnUse"
                  >
                    <feGaussianBlur stdDeviation="2.0" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
