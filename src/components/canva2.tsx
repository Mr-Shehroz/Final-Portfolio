// src/components/canva1.tsx
'use client';
import React, { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 121;
const SCROLL_DURATION = '300vh';
const CANVAS_HEIGHT = '100vh';

// Safely read env vars (fallback to empty string if missing)
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
const CLOUDINARY_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_2 || 'canvas2';

// Validate env vars in development
if (process.env.NODE_ENV === 'development' && !CLOUDINARY_CLOUD_NAME) {
  console.warn('⚠️ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set in .env.local');
}

const IMAGE_PATH = (idx: number): string => {
  if (!CLOUDINARY_CLOUD_NAME) {
    return `/canvas2/frame_${idx.toString().padStart(4, '0')}.jpg`;
  }

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${CLOUDINARY_FOLDER}/frame_${idx
    .toString()
    .padStart(4, '0')}.jpg`;
};

const preloadImages = (): Promise<HTMLImageElement[]> => {
  return Promise.all(
    Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new window.Image();
        img.src = IMAGE_PATH(i + 1);
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    })
  );
};

const Canva2: React.FC = () => {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef(false);
  const lastFrameRef = useRef(0);

  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[idx];
    if (!canvas || !img) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (width === 0 || height === 0) return;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = width / height;

    let sx = 0,
      sy = 0,
      sw = img.naturalWidth,
      sh = img.naturalHeight;

    if (imgAspect > canvasAspect) {
      sw = img.naturalHeight * canvasAspect;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasAspect;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
    lastFrameRef.current = idx;
  }, []);

  useEffect(() => {
    preloadImages().then((imgs) => {
      imagesRef.current = imgs;
      loadedRef.current = true;
      drawFrame(0);
    });
  }, [drawFrame]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateFrame = () => {
      if (!loadedRef.current || !scrollWrapperRef.current) return;

      const wrapper = scrollWrapperRef.current;
      const wrapperRect = wrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const wrapperHeight = wrapper.offsetHeight;

      if (wrapperHeight <= windowHeight) {
        drawFrame(TOTAL_FRAMES - 1);
        return;
      }

      const progress = -wrapperRect.top / (wrapperHeight - windowHeight);
      const clampedProgress = Math.min(Math.max(progress, 0), 1);
      const frameIndex = Math.floor(clampedProgress * (TOTAL_FRAMES - 1));
      drawFrame(frameIndex);
    };

    const onScroll = () => requestAnimationFrame(updateFrame);
    const onResize = () => {
      if (loadedRef.current) drawFrame(lastFrameRef.current);
    };

    updateFrame();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [drawFrame]);

  return (
    <div
      ref={scrollWrapperRef}
      style={{
        height: SCROLL_DURATION,
        position: 'relative',
      }}
    >
      {/* Pinned canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: CANVAS_HEIGHT,
          display: 'block',
          zIndex: 0,
        }}
      />

      {/* ✅ Overlay: Add content on top of the canvas */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: CANVAS_HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          zIndex: 10, // Above canvas
          pointerEvents: 'none', // Optional: lets scroll pass through if needed
          padding: '1.5rem',
          boxSizing: 'border-box',
          background: 'linear-gradient(to bottom, rgba(0,0,0,1), transparent 70%)',
        }}
      >
        {/* Optional: Add your brand, tagline, or minimal UI */}
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.2,
          }}
        >
          Crafting Digital Experiences
        </h1>
        <p
          style={{
            marginTop: '1rem',
            fontSize: '1.1rem',
            opacity: 0.9,
            textAlign: 'center',
            maxWidth: '600px',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
          }}
        >
          Scroll to explore the journey
        </p>
      </div>
    </div>
  );
};

export default Canva2;