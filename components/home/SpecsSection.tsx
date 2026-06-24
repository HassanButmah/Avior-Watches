'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getWatchById } from '@/lib/watches';
import { staggerContainer, fadeUp } from '@/lib/motion';

export default function SpecsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const featured = getWatchById('prestige-pro');

  const specs = featured
    ? [
        { label: 'Model', value: featured.name },
        { label: 'Case Diameter', value: featured.specs.caseSize },
        { label: 'Case Material', value: featured.specs.caseMaterial },
        { label: 'Movement Type', value: featured.specs.movement },
        { label: 'Power Reserve', value: featured.specs.power_reserve },
        { label: 'Crystal', value: featured.specs.crystal },
        { label: 'Water Resistance', value: featured.specs.water_resistance },
        { label: 'Dial', value: featured.specs.dial },
        { label: 'Strap', value: featured.specs.strap },
      ]
    : [];

  return (
    <section ref={containerRef} id="specs" className="bg-black py-16 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="max-w-4xl mx-auto">
        <motion.p variants={fadeUp} className="text-gold text-[10px] tracking-[0.25em] uppercase mb-6">
          Technical Specifications
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl text-white mb-12 md:mb-16">
          The architecture of precision.
        </motion.h2>
        <motion.div variants={staggerContainer} className="space-y-0">
          {specs.map((spec) => (
            <motion.div
              key={spec.label}
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-8 py-5 border-b border-white/5 items-center"
            >
              <div className="text-gold text-sm font-medium tracking-wide">{spec.label}</div>
              <div className="text-white/70 text-sm font-light">{spec.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
