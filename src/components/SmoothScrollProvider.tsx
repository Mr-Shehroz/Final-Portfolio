// src/components/SmoothScrollWrapper.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

const SmoothScrollWrapper = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ✅ Lenis v1+ — no "smooth", "duration", or "easing" at top level
    const lenis = new Lenis({
      lerp: 0.1, // smoothness (0 = instant, 1 = super smooth)
      wheelMultiplier: 1,
      touchMultiplier: 2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // RAF loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Optional: expose globally
    (window as any).lenis = lenis;

    // Cleanup
    return () => {
      lenis.destroy();
      lenisRef.current = null;
      (window as any).lenis = null;
    };
  }, []);

  // Refresh ScrollTrigger after hydration
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
};

export default SmoothScrollWrapper;