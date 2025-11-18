// src/components/canva1.tsx
'use client';
import React, { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 121;
const CANVAS_DURATION = '100vh'; // 👈 Key: gives 50vh of scroll to animate over

const IMAGE_PATH = (idx: number) =>
  `/canvas1/frame_${idx.toString().padStart(4, '0')}.jpg`;

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

const Canva1: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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

    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

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

  // Preload images
  useEffect(() => {
    preloadImages().then((imgs) => {
      imagesRef.current = imgs;
      loadedRef.current = true;
      drawFrame(0);
    });
  }, [drawFrame]);

  // Handle scroll & resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateFrame = () => {
      if (!loadedRef.current || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Map scroll from:
      // - 0% when bottom of section hits bottom of viewport
      // - 100% when top of section hits top of viewport
      const start = -rect.height; // section fully below viewport
      const end = windowHeight;  // section fully above viewport
      const scrollProgress = (-rect.top - start) / (end - start);
      const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);

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
      ref={sectionRef}
      style={{
        height: CANVAS_DURATION, // e.g., '150vh'
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'sticky',
          top: 100,
          width: '100%',
          height: '100vh',
          display: 'block',
        }}
      />
    </div>
  );
};

export default Canva1;