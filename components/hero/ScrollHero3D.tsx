'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const Hero3DCanvas = dynamic(() => import('./Hero3DCanvas'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gold text-xs tracking-[0.25em] uppercase mb-4">Loading Experience</p>
        <div className="w-16 h-0.5 bg-gold/20 mx-auto overflow-hidden rounded-full">
          <div className="h-full w-1/2 bg-gold skeleton-shimmer" />
        </div>
      </div>
    </div>
  ),
});

export default function ScrollHero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => setScrollProgress(v));
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Parallax background */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,110,0.08)_0%,transparent_60%)]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold/3 rounded-full blur-[100px]" />
        </motion.div>

        {/* 3D Canvas */}
        <div className="absolute inset-0 z-0">
          <Hero3DCanvas scrollProgress={scrollProgress} />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

        {/* Content overlay */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="absolute inset-0 z-20 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 pointer-events-none"
        >
          <div className="max-w-xl relative">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0, 0, 1] }}
              className="text-gold text-[10px] md:text-xs tracking-[0.25em] uppercase mb-4 md:mb-6"
            >
              Est. 2025 · Palestine
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.8, ease: [0.25, 0, 0, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight mb-4 md:mb-6"
              style={{ textShadow: '0 0 40px rgba(200,169,110,0.2), 0 20px 60px rgba(0,0,0,0.8)' }}
            >
              Avior Prestige
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.25, 0, 0, 1] }}
              className="text-white/70 text-sm md:text-base leading-relaxed mb-8 max-w-md font-light"
            >
              Engineered for precision. Designed for elegance. A luxury timepiece that defies time itself.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8, ease: [0.25, 0, 0, 1] }}
              className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
            >
              <Link href="/collection">
                <motion.span
                  whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(200,169,110,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block bg-gradient-to-r from-gold to-gold-light text-black px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold cursor-pointer border border-gold/30 shadow-lg shadow-gold/20"
                >
                  Explore Collection
                </motion.span>
              </Link>
              {!isMobile && (
                <Link href="#features">
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block border border-white/20 text-white/80 px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium cursor-pointer hover:border-gold/40 hover:text-gold transition-colors"
                  >
                    Discover More
                  </motion.span>
                </Link>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ opacity: textOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
          aria-hidden="true"
        >
          <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
}
