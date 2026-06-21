'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Feature {
  label: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    label: 'Automatic Movement',
    description:
      'Precision-engineered automatic rotor mechanism that winds continuously with wrist motion, delivering 48-hour power reserve without manual intervention.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M16 8V16M16 16L22 22"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'Premium Case Material',
    description:
      'Crafted from aerospace-grade stainless steel with golden accents, engineered for durability, corrosion resistance, and timeless elegance.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 4L20 12H28L22 17L24 26L16 21L8 26L10 17L4 12H12L16 4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    ),
  },
  {
    label: 'Water Resistant',
    description:
      'Advanced sealed construction with screw-down crown, rated 300 meters water-resistant for professional diving and everyday adventures.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M8 14C8 10 10 6 16 6C22 6 24 10 24 14"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M16 16V26M12 22H20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'Luxury Bracelet',
    description:
      'Interlocking three-piece solid metal links with seamless integration, individually polished and adjusted to exacting standards for supreme comfort.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="12" width="24" height="8" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="12" x2="8" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <line x1="12" y1="12" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <line x1="20" y1="12" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <line x1="24" y1="12" x2="24" y2="20" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: 'Superlative Chronometer',
    description:
      'Officially certified to -4/+6 seconds per day. Advanced motion-sensing technology ensures precision across all conditions.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M16 12V16L20 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Sapphire Crystal',
    description:
      'Scratch-resistant synthetic sapphire crystal with anti-reflective coating, ensuring perfect clarity and legibility in all lighting conditions.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      id="features"
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
          Engineered Excellence
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
          Precision meets luxury in every detail
        </motion.h2>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(2rem, 5vw, 3rem)',
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              style={{
                paddingTop: '2rem',
                borderTop: '1px solid rgba(200, 169, 110, 0.2)',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  marginBottom: '1.5rem',
                  color: '#C8A96E',
                }}
              >
                {feature.icon}
              </div>

              {/* Label */}
              <h3
                style={{
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  marginBottom: '0.75rem',
                  color: '#ffffff',
                }}
              >
                {feature.label}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: '#E5E5E5',
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 300,
                }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
