// src/components/Loader.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading time (replace with real asset tracking later)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500); // Adjust based on your assets

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center gap-6">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

      {/* Progress Bar (Optional) */}
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-cyan-400 transition-all duration-1000 ease-out"
          style={{ width: '75%' }} // Update dynamically later
        ></div>
      </div>

      {/* Optional Text */}
      <p className="text-white text-lg">Loading experience...</p>
    </div>
  );
};

export default Loader;