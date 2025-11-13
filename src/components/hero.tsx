"use client";
import { Montserrat, Poppins } from "next/font/google";
import { Typewriter } from "react-simple-typewriter";
import Button from "./ui/button";
import Link from "next/link";

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
  return (
    <section className="min-h-screen w-full bg-[url('/banner.jpg')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
      {/* Overlay for mobile/tablet, hidden for >=lg (≥1024px) */}
      <div className="absolute inset-0 bg-[#0a0a0add] opacity-50  z-0" />
      <div className="relative z-10 flex flex-col items-start justify-center min-h-screen sm:h-screen max-w-[1386px] mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-0">
        {/* Hello Subheading */}
        <h4
          className={`text-white font-normal text-base sm:text-lg md:text-xl mb-4 sm:mb-7 md:mb-10 ${montserrat.className}`}
        >
          HELLO
        </h4>

        {/* Main Heading with Typing Effect */}
        <h1
          className={`text-white text-3xl sm:text-5xl md:text-[52px] lg:text-[64px] font-bold leading-tight sm:leading-tight md:leading-none ${montserrat.className}`}
        >
          I&apos;m Shehroz
        </h1>

        {/* Subtitle with Typewriter Effect & Blue Highlight */}
        <pre
          className={`text-white text-2xl sm:text-4xl md:text-[44px] lg:text-[64px] font-bold mt-2 sm:mt-3 md:mt-4 flex items-center gap-2 ${montserrat.className}`}
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
          className={`text-gray-300 max-w-full sm:max-w-xl my-4 sm:my-6 text-sm sm:text-base md:text-lg leading-relaxed opacity-80 ${poppins.className}`}
        >
          A personal portfolio is a collection of your work, achievements, and
          skills that highlights your abilities and professional growth.
        </p>

        <Link href="#portfolio">
          <Button>View My Work</Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
