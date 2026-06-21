'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Spec {
  label: string;
  value: string;
}

const specs: Spec[] = [
  { label: 'Model', value: 'Avior Prestige Pro' },
  { label: 'Case Diameter', value: '42 mm' },
  { label: 'Case Material', value: 'Stainless Steel & Gold' },
  { label: 'Movement Type', value: 'Automatic, Self-Winding' },
  { label: 'Power Reserve', value: '48 hours' },
  { label: 'Accuracy', value: '-4/+6 seconds per day' },
  { label: 'Crystal', value: 'Sapphire with AR Coating' },
  { label: 'Water Resistance', value: '300 meters (1000 feet)' },
  { label: 'Dial Type', value: 'Sunburst Finish' },
  { label: 'Bracelet Style', value: 'Premium Metal Links' },
];

export default function SpecsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0, 0, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="specs"
      style={{
        background: '#000000',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem)',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section Label */}
        <motion.div
          variants={itemVariants}
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#C8A96E',
            fontFamily: 'var(--font-inter)',
            fontWeight: 500,
            marginBottom: '2rem',
          }}
        >
          Technical Specifications
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            lineHeight: 1.2,
            fontFamily: 'var(--font-playfair)',
            fontWeight: 400,
            marginBottom: '4rem',
            maxWidth: '800px',
          }}
        >
          The architecture of precision.
        </motion.h2>

        {/* Specs Table */}
        <motion.div
          variants={containerVariants}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '0 4rem',
            maxWidth: '1000px',
          }}
        >
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.2fr',
                gap: '2rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
                alignItems: 'center',
              }}
            >
              {/* Label */}
              <div
                style={{
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 500,
                  color: '#C8A96E',
                  letterSpacing: '0.02em',
                }}
              >
                {spec.label}
              </div>

              {/* Value */}
              <div
                style={{
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 300,
                  color: '#E5E5E5',
                }}
              >
                {spec.value}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
