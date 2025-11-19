// src/app/page.tsx
import About from "@/components/about";
import Contact from "@/components/contact";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Services from "@/components/services";
import Skills from "@/components/skills";
import Testimonials from "@/components/testimonials";
import Canva1 from "@/components/canva1";
import Canva2 from "@/components/canva2";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Canva1 /> {/* Now behaves like a normal section */}
      <Projects />
      <Skills />
      <Canva2 />
      <Testimonials />
      <Contact />
    </div>
  );
}