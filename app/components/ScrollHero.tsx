'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const FRAME_COUNT = 96; // Will be updated based on actual video duration
const FRAME_WIDTH = 1920;
const FRAME_HEIGHT = 1080;

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    // Preload all frames
    const frames: HTMLImageElement[] = [];
    let loadedCount = 0;

    const onFrameLoad = () => {
      loadedCount++;
      if (loadedCount === FRAME_COUNT) {
        // All frames loaded, draw first frame
        drawFrame(0);
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i + 1).padStart(4, '0')}.jpg`;
      img.onload = onFrameLoad;
      img.onerror = () => {
        console.warn(`Failed to load frame ${i + 1}`);
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          drawFrame(0);
        }
      };
      frames.push(img);
    }

    framesRef.current = frames;

    // Draw function with cover-fit scaling
    function drawFrame(frameIndex: number) {
      if (!canvas || !ctx || frames.length === 0) return;

      const frame = frames[frameIndex];
      if (!frame || !frame.complete) return;

      const cw = canvas.width / (window.devicePixelRatio || 1);
      const ch = canvas.height / (window.devicePixelRatio || 1);
      const iw = FRAME_WIDTH;
      const ih = FRAME_HEIGHT;

      // Calculate scale to cover
      const scale = Math.max(cw / iw, ch / ih);
      const scaledWidth = iw * scale;
      const scaledHeight = ih * scale;
      const x = (cw - scaledWidth) / 2;
      const y = (ch - scaledHeight) / 2;

      // Clear and fill black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, cw, ch);

      // Draw frame
      ctx.drawImage(frame, x, y, scaledWidth, scaledHeight);

      currentFrameRef.current = frameIndex;
    }

    // RAF loop for scroll-driven animation
    const animate = () => {
      const container = containerRef.current;
      if (!container) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const rect = container.getBoundingClientRect();
      const top = rect.top;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress (0 to 1)
      const progress = Math.max(
        0,
        Math.min(
          1,
          -top / (containerHeight - windowHeight)
        )
      );

      // Calculate target frame
      const targetFrame = Math.round(progress * (FRAME_COUNT - 1));

      // Draw frame if changed
      if (targetFrame !== currentFrameRef.current) {
        drawFrame(targetFrame);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const overlayVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + delay * 0.1,
        duration: 0.8,
        ease: [0.25, 0, 0, 1],
      },
    }),
  };

  return (
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          background: '#000000',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '4rem 2rem 6rem',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)',
            pointerEvents: 'none',
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            {/* Label */}
            <motion.div
              custom={0}
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              style={{
                fontSize: 'clamp(0.65rem, 2vw, 0.75rem)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#C8A96E',
                fontFamily: 'var(--font-inter)',
                fontWeight: 400,
                marginBottom: '1.5rem',
              }}
            >
              Est. 1905 · Geneva
            </motion.div>

            {/* Heading */}
            <motion.h1
              custom={1}
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
                lineHeight: 1.1,
                fontFamily: 'var(--font-playfair)',
                fontWeight: 400,
                marginBottom: '1.5rem',
              }}
            >
              Rolex Day-Date 40
            </motion.h1>

            {/* Subtext */}
            <motion.p
              custom={2}
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                lineHeight: 1.6,
                color: '#E5E5E5',
                fontFamily: 'var(--font-inter)',
                fontWeight: 300,
                marginBottom: '2.5rem',
                maxWidth: '460px',
              }}
            >
              The President bracelet. The Cyclops magnifier. A century of
              mastery, refined to an instant.
            </motion.p>

            {/* CTA Button */}
            <motion.a
              custom={3}
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              href="#features"
              style={{
                display: 'inline-block',
                background: '#C8A96E',
                color: '#000000',
                padding: '0.9rem 2.6rem',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 500,
                fontFamily: 'var(--font-inter)',
                textDecoration: 'none',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.3s ease',
                pointerEvents: 'auto',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#E8C98E';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#C8A96E';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Explore Collection
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
