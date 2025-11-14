'use client';

import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const swiperSlidesRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animated "shine" effect function for testimonial cards
  const triggerCardShine = (slideIndex: number) => {
    const card = swiperSlidesRefs.current[slideIndex];
    if (!card) return;
    const shine = card.querySelector('.shine-effect') as HTMLDivElement | null;
    if (shine) {
      shine.style.opacity = "1";
      shine.style.transition = "opacity .6s ease";
      setTimeout(() => {
        shine.style.opacity = "0";
      }, 600);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Animate title & subtitle: scale, skew, fade with spring for a modern look
      if (titleRef.current && subtitleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 70, scale: 0.96, skewY: 10, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            skewY: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            }
          }
        );
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 60, scale: 0.96, skewY: 12, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            skewY: 0,
            filter: 'blur(0px)',
            duration: 1.0,
            delay: 0.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              once: true,
            }
          }
        );
      }

      // Animate slider with 3D slide up and opacity
      const swiperEl = sectionRef.current?.querySelector('.testimonial-swiper');
      if (swiperEl) {
        gsap.fromTo(
          swiperEl,
          { opacity: 0, y: 90, rotateX: 18, scale: 0.95, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.3,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 81%',
              once: true,
            },
          }
        );
      }

      // Animate in "warp pop" for each card as it slides into view (observer-based)
      if (swiperSlidesRefs.current.length) {
        swiperSlidesRefs.current.forEach((el, idx) => {
          if (el) {
            gsap.set(el, { opacity: 0, y: 70, scale: 0.925, filter: 'blur(10px)' });
            ScrollTrigger.create({
              trigger: el,
              start: "top 90%",
              onEnter: () => {
                gsap.to(el, {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                  duration: 1,
                  ease: 'elastic.out(1, 0.575)',
                  overwrite: 'auto',
                  stagger: 0.09
                });
                // Optional: Add a quick shine on card entrance
                triggerCardShine(idx);
              },
              once: true,
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-[#03101A] relative overflow-hidden">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6" ref={sectionRef}>
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 text-[#36ccfd] tracking-tight drop-shadow-xl"
        >
          Testimonials
        </h2>
        <p
          ref={subtitleRef}
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
          className="testimonial-swiper opacity-0" // will be animated
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div
                ref={(el) => {
                  swiperSlidesRefs.current[i] = el;
                }}
                style={{
                  minHeight: 320,
                  maxWidth: 550,
                  width: "97%",
                  margin: "0 auto",
                  position: "relative",
                  zIndex: 1,
                }}
                className="relative overflow-hidden bg-[#06131b]/90 border border-[#36ccfd2f] rounded-3xl px-6 py-10 sm:px-12 sm:py-12 md:px-14 md:py-14 lg:px-14 lg:py-12 shadow-2xl group transition-all duration-300 hover:scale-[1.045] hover:shadow-[0_20px_60px_0_#2bb7fc3f,0_0_22px_5px_#36ccfd58] hover:border-[#36ccfd] will-change-transform"
              >
                {/* Animated shine effect */}
                <div
                  className="shine-effect pointer-events-none absolute left-0 top-0 w-full h-full rounded-3xl opacity-0"
                  style={{
                    background: "linear-gradient(120deg, transparent 60%, #61e6fb77 97%, transparent 100%)",
                    filter: "blur(1.5px)",
                    zIndex: 2,
                  }}
                ></div>

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
                    <div className="font-semibold text-[#aee9fc] text-xl sm:text-2xl md:text-2xl lg:text-3xl drop-shadow mb-1 animate-gradient-move">
                      {t.name}
                    </div>
                    <div className="text-[#3ed0ff] text-base sm:text-lg md:text-lg font-medium">
                      {t.role}
                    </div>
                  </div>
                </div>

                {/* Quote with floating animation */}
                <div className="relative group animate-floatUpDown">
                  <svg
                    fill="none"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    className="absolute left-[-1.3em] top-[-1.4em] w-8 h-8 md:w-9 md:h-9 text-[#36ccfd]/30 opacity-85 scale-110 drop-shadow-glow"
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
                    className="absolute right-[-1.3em] bottom-[-0.8em] w-8 h-8 md:w-9 md:h-9 text-[#36ccfd]/30 opacity-85 rotate-180 scale-110 drop-shadow-glow"
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

      {/* Extra: CSS animations for float and glow */}
      <style jsx global>{`
        @keyframes floatUpDown {
          0% { transform: translateY(0); }
          37% { transform: translateY(-7px);}
          60% { transform: translateY(2.5px);}
          100% { transform: translateY(0);}
        }
        .animate-floatUpDown {
          animation: floatUpDown 4.2s cubic-bezier(.77,0,.18,1) infinite;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px #31d7ff68);
        }
        @keyframes gradientMove {
          0% { 
            background-position: 0% 50%;
          }
          100% { 
            background-position: 100% 50%;
          }
        }
        .animate-gradient-move {
          background: linear-gradient(90deg, #36ccfd 0%, #7ff0ff 45%, #36ccfd 100%);
          background-size: 300% 300%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 2.2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;