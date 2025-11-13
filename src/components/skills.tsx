"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin outside the component to avoid double registration
if (typeof window !== "undefined" && gsap && gsap.registerPlugin) {
  gsap.registerPlugin(ScrollTrigger);
}

const skills = [
  {
    title: "Full Stack Development",
    description:
      "5+ years building scalable web apps with modern stacks — from dynamic frontends (React, Next.js) to robust backends (Node.js, REST/GraphQL APIs).",
    date: "2021 – Present",
    icon: "💻",
  },
  {
    title: "Intelligent Process Automation",
    description:
      "Designed and deployed no-code/low-code automation systems that connect forms, databases, and task managers — eliminating manual workflows and reducing operational costs by up to 70%.",
    date: "2022 – Present",
    icon: "🤖",
  },
  {
    title: "API & System Integration",
    description:
      "Architected seamless data pipelines between SaaS platforms (Airtable, Google Workspace, Asana) and custom applications using webhooks, OAuth, and cron-triggered microservices.",
    date: "2022 – Present",
    icon: "🔌",
  },
  {
    title: "UI/UX for Complex Systems",
    description:
      "Built intuitive dashboards and admin panels with real-time data visualization (Chart.js, Framer Motion) — turning complex automation logic into user-friendly interfaces.",
    date: "2021 – Present",
    icon: "🎨",
  },
  {
    title: "DevOps & Deployment",
    description:
      "Automated CI/CD pipelines, containerized apps with Docker, and deployed scalable cloud infrastructure (Vercel, Render, AWS) with monitoring and rollback capabilities.",
    date: "2023 – Present",
    icon: "🚀",
  },
  {
    title: "AI & Prompt Engineering",
    description:
      "Integrated LLMs into business workflows for chatbots, content generation, and data analysis — optimizing prompts for reliability, cost, and accuracy.",
    date: "2023 – Present",
    icon: "🧠",
  },
];

const timelineInterDotCount = skills.length - 1; // Place dots between each card, not at the ends

const getDotPositions = (count:number) => {
  return Array.from({ length: count }, (_, i) =>
    Math.round(((i + 1) / (skills.length)) * 100)
  );
};

const SkillsTimeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const additionalDotsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!timelineRef.current) return;

    const skillCards = gsap.utils.toArray<HTMLElement>(
      timelineRef.current.querySelectorAll(".skill-timeline-card")
    );

    skillCards.forEach((card, idx) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 120 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 32%",
            scrub: true,
          },
        }
      );
      const dot = card.querySelector(".skill-dot");
      if (dot) {
        gsap.fromTo(
          dot,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 70%",
              scrub: true,
            },
          }
        );
      }
      const line = card.querySelector(".skill-line");
      if (line) {
        gsap.fromTo(
          line,
          { height: 0 },
          {
            height: "100%",
            ease: "power1.out",
            scrollTrigger: {
              trigger: card,
              start: "top 98%",
              end: "top 30%",
              scrub: true,
            },
          }
        );
      }
    });

    additionalDotsRefs.current.forEach((dot, dotIdx) => {
      if (!dot) return;
      gsap.fromTo(
        dot,
        { boxShadow: "0 0 0px 0px #36ccfd00", background: "linear-gradient(135deg, #19333e 70%, #155261 100%)", opacity: 0.6 },
        {
          boxShadow: "0 0 18px 4px #36ccfd88, 0 2px 12px #139bfd55",
          background: "linear-gradient(135deg, #36ccfd 85%, #139bfd 100%)",
          opacity: 1,
          ease: "power2.out",
          duration: 0.55,
          scrollTrigger: {
            trigger: dot,
            start: "top 90%",
            end: "top 70%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const dotPositions = getDotPositions(timelineInterDotCount);

  return (
    <section className="relative z-10 text-white py-16 sm:py-24 px-2 sm:px-7 mx-auto max-w-[1386px] overflow-hidden">
      <style>{`
        .skill-timeline-card {
          background: #06131b;
          border: 1.5px solid rgba(54,204,253,0.16);
          border-radius: 1.1rem;
          box-shadow: 0 6px 32px 0 #139bfd12, 0 0 1px 1px #139bfd12;
        }
        .skill-timeline-card:hover, .skill-timeline-card:focus-within {
          border-color: #36ccfd;
          box-shadow: 0px 6px 36px 0 #36ccfd28, 0 0 0 0 #36ccfd3d;
          transform: scale(1.02) translateY(-6px);
          transition: all 0.25s cubic-bezier(.29,1.06,.64,1.12);
          z-index: 3;
        }
        @media (max-width: 640px) {
          .skill-timeline-card {
            border-radius: 1rem;
            padding: 1.1rem;
          }
        }
        .skills-glow-bg {
          background: radial-gradient(circle at 64% 20%, #36ccfd16 0%, #139bfd11 75%, transparent 100%);
          filter: blur(22px);
          opacity: 0.8;
          z-index: -1;
        }
        .skill-dot {
          background: linear-gradient(135deg, #36ccfd 80%, #139bfd 98%);
          box-shadow: 0 0 18px 0 #36ccfd50, 0 2px 8px #139bfd24;
        }
        .skill-dot.animated {
          animation: skillDotPop 0.7s cubic-bezier(.66,.21,.56,1) both;
        }
        @keyframes skillDotPop {
          from { transform: scale(0.3); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .skill-line {
          background: linear-gradient(180deg,#36ccfd33 0%,#139bfd22 100%);
          border-radius: 999px;
          width: 4px;
          margin: 0 auto;
        }
        /* Timeline Dots */
        .timeline-inter-dot {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #19333e 70%, #155261 100%);
          box-shadow: 0 0 0px 0px #36ccfd00;
          z-index: 10;
          opacity: 0.75;
          border: 2.5px solid #26b5d0cc;
          transition: box-shadow 0.4s, background 0.35s, opacity 0.14s;
        }

        /* --- MOBILE: Timeline to left, cards to right --- */
        @media (max-width: 767px) {
          .skills-timeline-row {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            gap: 0.4rem;
            margin-bottom: 2.1rem;
            position: relative;
          }
          .skills-timeline-row:last-child {
            margin-bottom: 0;
          }
          .skills-timeline-vertical {
            min-width: 46px;
            width: 46px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: none;
            z-index: 10;
          }
          .skills-timeline-card {
            margin-left: 0;
            margin-right: 0;
            margin-top: 0;
            position: relative;
            max-width: 100%;
            width: 100%;
          }
        }
        @media (max-width: 767px) {
          /* Move the timeline line to the left side of the card list */
          .skills-timeline-absolute-line {
            left: 23px !important;
            transform: none !important;
          }
          .skills-glow-bg {
            left: 23px !important;
            transform: none !important;
          }
        }
      `}</style>
      {/* Header */}
      <div className="text-center 2xl:mb-24 mb-14">
        <h5 className="text-cyan-400 text-xs sm:text-sm uppercase tracking-widest font-semibold">
          MY EXPERTISE
        </h5>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 gradient-title-text">
          Technical Mastery Through Experience
        </h2>
        <p className="mt-4 text-gray-300 max-w-3xl mx-auto leading-relaxed text-[1.07rem] sm:text-base">
          I continuously evolve my skill set to solve tomorrow’s problems —
          blending deep technical knowledge with practical automation
          intelligence.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto pb-1" ref={timelineRef}>
        {/* --- Timeline for Desktop --- */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full skills-glow-bg pointer-events-none"
          style={{ zIndex: 0 }}
        />
        <div
          ref={timelineLineRef}
          className="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-linear-to-b from-cyan-400 via-cyan-500/40 to-transparent rounded-full pointer-events-none skills-timeline-absolute-line"
          style={{ zIndex: 1 }}
        >
          {
            dotPositions.map((pos, i) => (
              <div
                key={i}
                ref={el => {
                  additionalDotsRefs.current[i] = el;
                }}
                className="timeline-inter-dot"
                style={{
                  top: `calc(${pos}% - 9px)`,
                }}
                aria-hidden="true"
              />
            ))
          }
        </div>

        {/* Timeline+Cards Layout */}
        {/* Desktop/Tablet Layout */}
        <div className="hidden md:flex flex-col gap-12 sm:gap-16 relative z-10">
          {skills.map((skill, idx) => {
            const align = idx % 2 === 0 ? "left" : "right";
            return (
              <div
                key={idx}
                className={`
                  skill-timeline-card relative group transition-all duration-300 cursor-pointer
                  flex flex-col sm:flex-row items-center justify-center
                  ${
                    align === "left"
                      ? "md:items-end md:justify-start"
                      : "md:items-start md:justify-end"
                  }
                  shadow-md
                  px-6 py-7 md:px-3 md:py-9 lg:px-6 lg:py-7 xl:p-8
                  mx-auto w-full max-w-[89vw] md:max-w-[40%] lg:max-w-[50%] xl:max-w-[470px] 
                  ${
                    align === "left"
                      ? "md:ml-0 md:mr-auto lg:-ml-22 lg:mr-auto xl:-ml-40 xl:mr-auto"
                      : "md:ml-auto md:mr-0 lg:ml-auto lg:-mr-22 xl:ml-auto xl:-mr-40"
                  }
                  `}
                tabIndex={0}
                style={{
                  outline: "none",
                  boxShadow: "0 2px 16px 0 #11baff22, 0 0 1px 1px #139bfd12",
                }}
              >
                {/* Timeline dot and line */}
                <div
                  className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center z-20"
                  aria-hidden="true"
                  style={{ width: "30px" }}
                >
                  {/* Vertical line above, except for first item */}
                  {idx !== 0 && (
                    <div className="skill-line" style={{ height: "54px" }} />
                  )}
                  {/* The timeline dot */}
                  <div
                    className="skill-dot w-7 h-7 rounded-full flex items-center justify-center text-2xl relative shadow-lg border-2 border-cyan-400/60"
                    style={{
                      margin: "2px 0",
                      color: "#36ccfd",
                      background: "#06131b",
                    }}
                  >
                    <span aria-label={skill.title}>{skill.icon}</span>
                  </div>
                  {/* Vertical line below, except for last item */}
                  {idx !== skills.length - 1 && (
                    <div className="skill-line" style={{ height: "64px" }} />
                  )}
                </div>

                {/* Card Content */}
                <div
                  className={`
                    relative z-20
                    flex flex-col
                    w-full
                    ${align === "left" ? "sm:pl-5" : "sm:pr-5"} 
                  `}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-cyan-400 tracking-wide font-mono">
                        {skill.date}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-cyan-200 group-hover:text-cyan-400 transition-colors">
                      {skill.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-base">
                      {skill.description}
                    </p>
                  </div>
                </div>
                {/* Glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                  style={{
                    background:
                      "radial-gradient(circle at 55% 45%, #36ccfd38 0%, #139bfd24 70%, transparent 100%)",
                    filter: "blur(18px)",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Mobile Layout: Timeline left, cards right */}
        <div className="md:hidden block w-full z-10">
          {skills.map((skill, idx) => {
            return (
              <div key={idx} className="skills-timeline-row">
                {/* Timeline vertical and dot/lines, separate column */}
                <div className="skills-timeline-vertical" aria-hidden="true">
                  {/* Vertical line above, except for first item */}
                  {idx !== 0 && (
                    <div className="skill-line" style={{ height: "40px" }} />
                  )}
                  {/* Timeline dot */}
                  <div
                    className="skill-dot w-7 h-7 rounded-full flex items-center justify-center text-2xl relative shadow-lg border-2 border-cyan-400/60"
                    style={{
                      margin: "2px 0",
                      color: "#36ccfd",
                      background: "#06131b",
                    }}
                  >
                    <span aria-label={skill.title}>{skill.icon}</span>
                  </div>
                  {/* Vertical line below, except for last item */}
                  {idx !== skills.length - 1 && (
                    <div className="skill-line" style={{ height: "54px" }} />
                  )}
                </div>
                {/* Card, always full width right of timeline on mobile */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    className="skill-timeline-card group transition-all duration-300 cursor-pointer px-5 py-5 my-0 relative w-full"
                    tabIndex={0}
                    style={{
                      outline: "none",
                      boxShadow: "0 2px 16px 0 #11baff22, 0 0 1px 1px #139bfd12",
                    }}
                  >
                    <div className="relative z-20 flex flex-col w-full ">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-cyan-400 tracking-wide font-mono">
                            {skill.date}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-cyan-200 group-hover:text-cyan-400 transition-colors">
                          {skill.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-base">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                    {/* Glow on hover */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                      style={{
                        background:
                          "radial-gradient(circle at 55% 45%, #36ccfd38 0%, #139bfd24 70%, transparent 100%)",
                        filter: "blur(18px)",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsTimeline;
