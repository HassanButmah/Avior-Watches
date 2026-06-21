'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ClosingCTA() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
        duration: 0.8,
        ease: [0.25, 0, 0, 1],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="cta"
      style={{
        background: '#000000',
        padding: 'clamp(6rem, 15vw, 10rem) clamp(1.5rem, 5vw, 3rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow effect */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background:
            'radial-gradient(ellipse, rgba(200, 169, 110, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px',
        }}
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
          Yours to Command
        </motion.div>

        {/* Main Heading */}
        <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              lineHeight: 1.2,
              fontFamily: 'var(--font-playfair)',
              fontWeight: 400,
              color: '#ffffff',
              marginBottom: '0.5rem',
            }}
          >
            Time is precious.
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.8rem)',
              lineHeight: 1.2,
              fontFamily: 'var(--font-playfair)',
              fontWeight: 400,
              color: '#E5E5E5',
              fontStyle: 'italic',
            }}
          >
            Make it count.
          </p>
        </motion.div>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
            lineHeight: 1.7,
            color: '#E5E5E5',
            fontFamily: 'var(--font-inter)',
            fontWeight: 300,
            marginBottom: '3rem',
            maxWidth: '480px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Avior Prestige combines cutting-edge engineering with timeless design,
          crafted for those who refuse to compromise on quality or style.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-block',
              background: '#000000',
              color: '#C8A96E',
              padding: '0.9rem 2.6rem',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 500,
              fontFamily: 'var(--font-inter)',
              textDecoration: 'none',
              border: '1px solid #C8A96E',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#C8A96E';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#000000';
              e.currentTarget.style.color = '#C8A96E';
            }}
          >
            Discover Avior Collection
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
