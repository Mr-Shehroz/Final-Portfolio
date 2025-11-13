"use client";

import { useState } from "react";

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imgHovered, setImgHovered] = useState(false);

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
          .services-card:hover .services-glow {
            opacity: 1;
          }
          .services-glow {
            background: radial-gradient(circle at 60% 40%, #36ccfd36 20%, #139bfd16 80%, transparent 100%);
            filter: blur(16px);
          }
          .services-card {
            position: relative;
            overflow: visible;
          }
          .services-card:hover {
            box-shadow: 0 8px 32px 0 #13b5fd44, 0 0 16px 2px #139bfd40;
            z-index: 2;
            transform: translateY(-4px) scale(1.025) rotate(-1deg);
            border-color: #36ccfd;
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
            height: 2.5px;
            background: linear-gradient(90deg, #139bfd 20%, #36ccfd 80%);
            border-radius: 2px;
            transform: scaleX(0);
            transition: transform 0.31s cubic-bezier(.29,1.06,.64,1.12);
            transform-origin: left;
            position: absolute;
            bottom: -3.5px;
            left: 0;
            opacity: 0.95;
          }
          .services-card:hover .animated-underline::after {
            transform: scaleX(1);
          }

          .services-img-container {
            transition: box-shadow 0.33s cubic-bezier(.22,1,.36,1), transform 0.31s cubic-bezier(.17,.67,.83,.67);
            box-shadow: 0 2px 24px 0 #11baff24, 0 0 1px 1px #0097fc12;
            position: relative;
          }
          .services-img-container:hover, .services-img-container.img-hovered {
            box-shadow: 0 8px 48px 0 #07b6ec80, 0 0 12px 4px #139bfd3d;
            transform: scale(1.025) translateY(-6px) rotate(1deg);
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
            background: radial-gradient(circle at 65% 55%, #36ccfd22 0%, #139bfd0a 55%, transparent 100%);
            filter: blur(12px);
          }
          .services-img-container:hover .services-img-glow, .services-img-container.img-hovered .services-img-glow {
            opacity: 0.77;
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
      <section id="services" className="text-white py-14 sm:py-20 px-2 px-5 mx-auto max-w-[1386px]">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
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
                className={`services-card bg-[#06131b] border border-cyan-500/20 rounded-3xl p-7 xl:p-10 transition-all duration-300 cursor-pointer
          ${hoveredIndex === index ? "border-cyan-400 shadow-2xl" : ""}
        `}
                tabIndex={0}
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
            >
              <img
                src="/services.png"
                alt="Full Stack Developer & Automation Specialist"
                className="w-full h-full object-cover transition-[transform] duration-400"
                style={{
                  transition: "transform 0.29s cubic-bezier(.39,1.17,.65,1)",
                  transform: imgHovered
                    ? "scale(1.045) rotate(-2deg)"
                    : "scale(1)",
                  zIndex: 3,
                  position: "relative",
                }}
              />
              <div className="services-img-glow" aria-hidden="true"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none z-[2]"></div>
              <svg
                className={`pointer-events-none absolute -top-4 -right-4 w-16 h-16 z-[4] transition-opacity duration-300 ${
                  imgHovered ? "opacity-90" : "opacity-0"
                }`}
                fill="none"
                viewBox="0 0 64 64"
                aria-hidden="true"
              >
                <g filter="url(#services-svg-sparkle)">
                  <path
                    d="M32 9L36.3 27.7L55 32L36.3 36.3L32 55L27.7 36.3L9 32L27.7 27.7L32 9Z"
                    fill="#23d5ff"
                    fillOpacity="0.38"
                  />
                  <path
                    d="M32 16L34.5 26.5L45 29L34.5 31.5L32 42L29.5 31.5L19 29L29.5 26.5L32 16Z"
                    fill="#13b4fd"
                    fillOpacity="0.45"
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
                    <feGaussianBlur stdDeviation="1.7" />
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
