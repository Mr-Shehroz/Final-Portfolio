// src/components/SmoothScrollProvider.tsx
'use client';

import React, { ReactNode, useEffect, useRef } from 'react';

// Do NOT import Locomotive Scroll at top level

interface DeviceOptions {
  smooth: boolean;
  breakpoint: number;
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollInstance = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('locomotive-scroll').then((LocomotiveModule) => {
      const LocomotiveScroll = LocomotiveModule.default;

      if (scrollInstance.current) {
        scrollInstance.current.destroy();
      }

      if (scrollRef.current) {
        // Set breakpoints according to Locomotive Scroll docs to fix type error
        scrollInstance.current = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          smartphone: { smooth: true }, // 0 = always applies on mobile
          tablet: { smooth: true, breakpoint: 768 },   // 768 is a typical tablet breakpoint
          multiplier: 1.05,
          class: 'is-inview',
          reloadOnContextChange: true,
        });
      }
    });

    return () => {
      if (scrollInstance.current) {
        scrollInstance.current.destroy();
        scrollInstance.current = null;
      }
    };
  }, []);

  return (
    <div data-scroll-container ref={scrollRef}>
      {children}
    </div>
  );
};

export default SmoothScrollProvider;