'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const FRAME_COUNT = 120; // 120 frames at 24fps = 5 second animation
const FRAME_WIDTH = 1920;
const FRAME_HEIGHT = 1080;

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const [framesLoaded, setFramesLoaded] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio
    const setCanvasSize = () => {
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    setCanvasSize();

    // Preload all frames
    const frames: HTMLImageElement[] = [];
    let loadedCount = 0;

    const onFrameLoad = () => {
      loadedCount++;
      setFramesLoaded(loadedCount);
      if (loadedCount === FRAME_COUNT) {
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
        setFramesLoaded(loadedCount);
        if (loadedCount === FRAME_COUNT) {
          drawFrame(0);
        }
      };
      frames.push(img);
    }

    framesRef.current = frames;

    // Draw function with premium effects
    function drawFrame(frameIndex: number) {
      if (!canvas || !ctx || frames.length === 0) return;

      const frame = frames[frameIndex];
      // Check if frame is valid and loaded
      if (!frame || !frame.complete || !frame.naturalWidth) return;

      const devicePixelRatio = window.devicePixelRatio || 1;
      const cw = canvas.width / devicePixelRatio;
      const ch = canvas.height / devicePixelRatio;
      const iw = FRAME_WIDTH;
      const ih = FRAME_HEIGHT;

      // Calculate scale to cover
      const scale = Math.max(cw / iw, ch / ih);
      const scaledWidth = iw * scale;
      const scaledHeight = ih * scale;
      const x = (cw - scaledWidth) / 2;
      const y = (ch - scaledHeight) / 2;

      // Clear background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, cw, ch);

      // Add premium glow effect
      const glowColor = `rgba(200, 169, 110, ${0.15 * scrollProgress})`;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 40 + scrollProgress * 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Calculate subtle zoom based on scroll
      const zoomScale = 1 + scrollProgress * 0.08;
      const zoomX = x + scaledWidth / 2;
      const zoomY = y + scaledHeight / 2;

      ctx.save();
      ctx.translate(zoomX, zoomY);
      ctx.scale(zoomScale, zoomScale);
      ctx.translate(-zoomX, -zoomY);

      // Draw frame - safely check if image is ready
      try {
        ctx.drawImage(frame, x, y, scaledWidth, scaledHeight);
      } catch (e) {
        console.error('Failed to draw frame:', e);
      }
      ctx.restore();

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

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

      setScrollProgress(progress);

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
      setCanvasSize();
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

        {/* Loading indicator */}
        {framesLoaded < FRAME_COUNT && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 10,
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                color: '#C8A96E',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Loading Experience
            </div>
            <div
              style={{
                width: '60px',
                height: '2px',
                background: 'rgba(200, 169, 110, 0.2)',
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                animate={{ width: `${(framesLoaded / FRAME_COUNT) * 100}%` }}
                transition={{ duration: 0.3 }}
                style={{
                  height: '100%',
                  background: '#C8A96E',
                }}
              />
            </div>
          </div>
        )}

        {/* Overlay with premium effects */}
        <div
          ref={overlayRef}
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
          {/* Premium glow effect behind text */}
          <div
            style={{
              position: 'absolute',
              bottom: '20%',
              left: 0,
              width: '400px',
              height: '200px',
              background: `radial-gradient(ellipse, rgba(200, 169, 110, ${0.1 + scrollProgress * 0.1}) 0%, transparent 70%)`,
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: '600px', position: 'relative', zIndex: 1 }}>
            {/* Label */}
            <motion.div
              custom={0}
              variants={{
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
              }}
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
                textShadow: `0 0 20px rgba(200, 169, 110, ${0.3 + scrollProgress * 0.2})`,
              }}
            >
              Est. 2020 · Dubai
            </motion.div>

            {/* Heading */}
            <motion.h1
              custom={1}
              variants={{
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
              }}
              initial="hidden"
              animate="visible"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 5.5rem)',
                lineHeight: 1.1,
                fontFamily: 'var(--font-playfair)',
                fontWeight: 400,
                marginBottom: '1.5rem',
                textShadow: `0 10px 40px rgba(0, 0, 0, 0.8)`,
                letterSpacing: '-0.01em',
              }}
            >
              Avior Prestige
            </motion.h1>

            {/* Subtext */}
            <motion.p
              custom={2}
              variants={{
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
              }}
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
              Engineered for precision. Designed for elegance. A luxury timepiece
              that defies time itself.
            </motion.p>

            {/* CTA Button */}
            <motion.a
              custom={3}
              variants={{
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
              }}
              initial="hidden"
              animate="visible"
              href="#features"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(200, 169, 110, 0.5)' }}
              whileTap={{ scale: 0.95 }}
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
                backdropFilter: 'blur(10px)',
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
