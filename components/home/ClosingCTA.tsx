'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';

export default function ClosingCTA() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} id="cta" className="relative bg-black py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(200,169,110,0.08)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <motion.p variants={fadeUp} className="text-gold text-[10px] tracking-[0.25em] uppercase mb-6">
          Yours to Command
        </motion.p>

        <motion.div variants={fadeUp} className="mb-8">
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-white mb-2">Time is precious.</h2>
          <p className="font-display text-2xl md:text-4xl lg:text-5xl text-white/80 italic">Make it count.</p>
        </motion.div>

        <motion.p variants={fadeUp} className="text-white/60 text-base leading-relaxed mb-10 max-w-md mx-auto font-light">
          Avior Prestige combines cutting-edge engineering with timeless design, crafted for those who refuse to compromise.
        </motion.p>

        <motion.div variants={fadeUp}>
          <Link href="/collection">
            <motion.span
              whileHover={{ scale: 1.03, backgroundColor: '#C8A96E', color: '#000000' }}
              whileTap={{ scale: 0.97 }}
              className="inline-block border border-gold text-gold px-10 py-4 text-[10px] tracking-[0.2em] uppercase font-medium cursor-pointer transition-colors duration-300"
            >
              Discover Avior Collection
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
