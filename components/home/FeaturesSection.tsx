'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';

const features = [
  {
    label: 'Automatic Movement',
    description:
      'Precision-engineered automatic rotor mechanism that winds continuously with wrist motion, delivering 48-hour power reserve.',
  },
  {
    label: 'Premium Case Material',
    description:
      'Crafted from aerospace-grade stainless steel with golden accents, engineered for durability and timeless elegance.',
  },
  {
    label: 'Water Resistant',
    description:
      'Advanced sealed construction with screw-down crown, rated 300 meters water-resistant for professional diving.',
  },
  {
    label: 'Luxury Bracelet',
    description:
      'Interlocking three-piece solid metal links with seamless integration, polished to exacting standards.',
  },
  {
    label: 'Superlative Chronometer',
    description:
      'Officially certified to -4/+6 seconds per day. Advanced motion-sensing technology ensures precision.',
  },
  {
    label: 'Sapphire Crystal',
    description:
      'Scratch-resistant synthetic sapphire crystal with anti-reflective coating for perfect clarity.',
  },
];

export default function FeaturesSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} id="features" className="bg-black py-16 md:py-32 px-4 sm:px-6 lg:px-8">
      <motion.div variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="max-w-7xl mx-auto">
        <motion.p variants={fadeUp} className="text-gold text-[10px] tracking-[0.25em] uppercase mb-6">
          Engineered Excellence
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl text-white mb-12 md:mb-16 max-w-2xl">
          Precision meets luxury in every detail
        </motion.h2>
        <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature) => (
            <motion.div key={feature.label} variants={fadeUp} className="pt-8 border-t border-gold/20">
              <div className="w-10 h-10 mb-6 rounded-full border border-gold/30 flex items-center justify-center">
                <div className="w-2 h-2 bg-gold rounded-full" />
              </div>
              <h3 className="text-white text-sm font-medium tracking-wide mb-3">{feature.label}</h3>
              <p className="text-white/60 text-sm leading-relaxed font-light">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
