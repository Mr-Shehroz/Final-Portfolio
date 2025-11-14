'use client';

import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import gsap from 'gsap';

const testimonials = [
  {
    name: "Alice R.",
    role: "Product Manager",
    text: "Working with you was a seamless experience. The web app launch was fast, stable, and exceeded our expectations for both design and performance.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "Michael B.",
    role: "CTO, Startup",
    text: "Consistently delivered high-quality code, on time, with great communication. Raised our frontend quality to a new level.",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    name: "Priya S.",
    role: "Design Lead",
    text: "Creative and detail-oriented! Our clients were thrilled with the modern, responsive site.",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg"
  },
  {
    name: "Carlos V.",
    role: "Tech Lead",
    text: "Ability to solve complex React and Next.js problems saved our deadlines multiple times. Highly recommended.",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg"
  },
  {
    name: "Samantha L.",
    role: "CEO, SaaS Company",
    text: "You delivered innovation ahead of time—our users LOVE the intuitive dashboards and performance!",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg"
  },
  {
    name: "Jonas M.",
    role: "Backend Engineer",
    text: "The seamless handoff between backend and frontend was a game changer. I wish more frontend engineers communicated this well.",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    name: "Linda T.",
    role: "Marketing Director",
    text: "Met every requirement and provided insightful suggestions that improved our project outcomes.",
    avatar: ""
  },
  {
    name: "Mateo C.",
    role: "Full Stack Developer",
    text: "Code reviews were thorough, constructive, and always made the codebase better. Great team player.",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg"
  },
  {
    name: "Ava P.",
    role: "UI/UX Designer",
    text: "A true collaborator! You turned our Figma mocks into pixel-perfect, accessible experiences.",
    avatar: "https://randomuser.me/api/portraits/women/30.jpg"
  },
  {
    name: "Noah S.",
    role: "Startup Founder",
    text: "The MVP launch exceeded expectations. Your rapid development and attention to detail were outstanding.",
    avatar: ""
  },
  {
    name: "Ravi K.",
    role: "DevOps Engineer",
    text: "Deployment went smoothly and the site’s performance is top-notch. Clearly skilled in DevOps and frontend.",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg"
  }
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((str) => str[0])
    .join("")
    .slice(0, 2);

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Animate the whole section and testimonial cards in view
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out"
        }
      );
    }
  }, []);

  // Animate the title & subtitle
  useEffect(() => {
    if (!sectionRef.current) return;
    const q = sectionRef.current.querySelectorAll('[data-animate="title"], [data-animate="subtitle"]');
    gsap.fromTo(
      q,
      { opacity: 0, y: 25, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0)',
        duration: 0.85,
        stagger: 0.10,
        ease: "power3.out",
        delay: 0.14
      }
    );
  }, []);

  // Animate the testimonial cards on mount/staggered
  useEffect(() => {
    if (!slideRefs.current || !slideRefs.current.length) return;
    gsap.fromTo(
      slideRefs.current,
      {
        opacity: 0,
        y: 64,
        scale: 0.96,
        filter: 'blur(12px)'
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.15,
        ease: "power3.out",
        stagger: 0.11,
        delay: 0.37
      }
    );
  }, [slideRefs.current.length]);

  return (
    <section id="testimonials" className="py-20 bg-[#03101A] relative">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6" ref={sectionRef}>
        <h2
          data-animate="title"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 text-[#36ccfd] tracking-tight drop-shadow-xl"
        >
          Testimonials
        </h2>
        <p
          data-animate="subtitle"
          className="text-[#bde3f5] text-center text-base sm:text-lg mb-12"
        >
          What clients and colleagues say
        </p>

        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 16,
            stretch: 0,
            depth: 180,
            modifier: 2,
            slideShadows: true,
          }}
          centeredSlides={true}
          slidesPerView={1.05}
          breakpoints={{
            350: { slidesPerView: 1.04, spaceBetween: 12 },
            540: { slidesPerView: 1.12, spaceBetween: 18 },
            700: { slidesPerView: 1.5, spaceBetween: 24 },
            900: { slidesPerView: 2, spaceBetween: 36 },
            1200: { slidesPerView: 2.5, spaceBetween: 50 },
            1450: { slidesPerView: 3, spaceBetween: 64 },
          }}
          spaceBetween={16}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          className="testimonial-swiper"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                style={{
                  minHeight: 320,
                  maxWidth: 550,
                  width: "97%",
                  margin: "0 auto",
                }}
                className="relative bg-[#06131b]/90 border border-[#36ccfd2f] rounded-3xl px-6 py-10 sm:px-12 sm:py-12 md:px-14 md:py-14 lg:px-14 lg:py-12 shadow-2xl group transition-all duration-300 hover:scale-[1.045] hover:shadow-[0_20px_60px_0_#2bb7fc3f,0_0_22px_5px_#36ccfd58] hover:border-[#36ccfd] will-change-transform"
              >
                {/* Avatar & Info */}
                <div className="flex items-center mb-6">
                  <div className="shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#12334b] border-[3px] border-[#36ccfd88] flex items-center justify-center overflow-hidden shadow-xl group-hover:border-[#36ccfd] group-hover:scale-110 group-hover:shadow-[0_0_0_9px_#36ccfd2e] transition-all duration-300 will-change-transform">
                      {t.avatar ? (
                        <img
                          src={t.avatar}
                          alt={`${t.name} avatar`}
                          onError={(e) => (e.currentTarget.style.display = "none")}
                          className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-[#36ccfd] font-bold text-3xl md:text-4xl">
                          {getInitials(t.name)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-5">
                    <div className="font-semibold text-[#aee9fc] text-xl sm:text-2xl md:text-2xl lg:text-3xl drop-shadow mb-1">
                      {t.name}
                    </div>
                    <div className="text-[#3ed0ff] text-base sm:text-lg md:text-lg font-medium">
                      {t.role}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative group">
                  <svg
                    fill="none"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    className="absolute left-[-1.3em] top-[-1.4em] w-8 h-8 md:w-9 md:h-9 text-[#36ccfd]/30 opacity-85 scale-110"
                  >
                    <text x="0" y="24" fontSize="32" fill="currentColor">
                      “
                    </text>
                  </svg>
                  <div
                    style={{ minHeight: 88 }}
                    className="text-[#e8f7fa] text-lg sm:text-xl md:text-2xl leading-relaxed mb-1 relative z-10 font-semibold group-hover:text-[#e4f9ff] transition-colors"
                  >
                    {t.text}
                  </div>
                  <svg
                    fill="none"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    className="absolute right-[-1.3em] bottom-[-0.8em] w-8 h-8 md:w-9 md:h-9 text-[#36ccfd]/30 opacity-85 rotate-180 scale-110"
                  >
                    <text x="0" y="24" fontSize="32" fill="currentColor">
                      ”
                    </text>
                  </svg>
                </div>

                {/* Hover Glow */}
                <div
                  style={{
                    background: "radial-gradient(ellipse at 65% 45%, #36ccfd33 0%, transparent 73%)",
                    filter: "blur(12px)",
                  }}
                  className="pointer-events-none absolute -inset-2.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Background Glow */}
      <div
        style={{
          background: "radial-gradient(circle, #36ccfd19 0%, transparent 70%)",
        }}
        className="pointer-events-none absolute left-[4%] top-[7%] w-[92%] h-[86%] z-0"
      />
    </section>
  );
};

export default Testimonials;