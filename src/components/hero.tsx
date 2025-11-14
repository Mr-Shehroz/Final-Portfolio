"use client";
import { useRef, useEffect } from "react";
import { Montserrat, Poppins } from "next/font/google";
import { Typewriter } from "react-simple-typewriter";
import Button from "./ui/button";
import Link from "next/link";
import gsap from "gsap";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

const Hero = () => {
  // Create refs for animated elements
  const sectionRef = useRef<HTMLDivElement>(null);
  const helloRef = useRef<HTMLHeadingElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLPreElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Animate elements in sequence on mount
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      helloRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
      .fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=0.3"
      )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.25"
      )
      .fromTo(
        descRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 0.85, duration: 0.6 },
        "-=0.18"
      )
      .fromTo(
        btnRef.current,
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.7)" },
        "-=0.12"
      );

    // Optional: Animate slight background scale for parallax effect
    gsap.fromTo(
      sectionRef.current,
      { scale: 1.015 },
      { scale: 1, duration: 1.7, ease: "expo.out" }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-[url('/banner.jpg')] bg-cover bg-center bg-no-repeat relative overflow-hidden"
    >
      {/* Overlay for mobile/tablet, hidden for >=lg (≥1024px) */}
      <div className="absolute inset-0 bg-[#0a0a0add] opacity-50  z-0" />
      <div className="relative z-10 flex flex-col items-start justify-center min-h-screen sm:h-screen max-w-[1386px] mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-0">
        {/* Hello Subheading */}
        <h4
          ref={helloRef}
          className={`text-white font-normal text-base sm:text-lg md:text-xl mb-4 sm:mb-7 md:mb-10 opacity-0 ${montserrat.className}`}
        >
          HELLO
        </h4>

        {/* Main Heading with Typing Effect */}
        <h1
          ref={headingRef}
          className={`text-white text-3xl sm:text-5xl md:text-[52px] lg:text-[64px] font-bold leading-tight sm:leading-tight md:leading-none opacity-0 ${montserrat.className}`}
        >
          I&apos;m Shehroz
        </h1>

        {/* Subtitle with Typewriter Effect & Blue Highlight */}
        <pre
          ref={subtitleRef}
          className={`text-white text-2xl sm:text-4xl md:text-[44px] lg:text-[64px] font-bold mt-2 sm:mt-3 md:mt-4 flex items-center gap-2 opacity-0 ${montserrat.className}`}
        >
          A{" "}
          <span className="text-blue-400">
            {/* @ts-ignore */}
            {typeof window !== "undefined" && (
              <span>
                <span style={{ color: "#60a5fa" }}>
                  <Typewriter
                    words={[
                      "Front End Developer",
                      "Backend Developer",
                      "Automation Specialist",
                      "Full Stack Developer",
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </span>
              </span>
            )}
          </span>
        </pre>

        {/* Description */}
        <p
          ref={descRef}
          className={`text-gray-300 max-w-full sm:max-w-xl my-4 sm:my-6 text-sm sm:text-base md:text-lg leading-relaxed opacity-0 ${poppins.className}`}
        >
          A personal portfolio is a collection of your work, achievements, and
          skills that highlights your abilities and professional growth.
        </p>

        <Link href="#portfolio" ref={btnRef} className="opacity-0">
          <Button>View My Work</Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
