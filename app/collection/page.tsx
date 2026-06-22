'use client';

import Header from '@/app/components/Header';
import ProductCard from '@/app/components/ProductCard';
import { watches, getAllCollections } from '@/lib/watches';
import { motion, useInView } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CollectionPage() {
  const collections = getAllCollections();
  const [isHeroInView, setIsHeroInView] = useState(false);
  const [isFeaturesInView, setIsFeaturesInView] = useState(false);
  const [isGridInView, setIsGridInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('collection-hero');
      const featuresSection = document.getElementById('collection-features');
      const gridSection = document.getElementById('collection-grid');

      if (heroSection) {
        const heroTop = heroSection.getBoundingClientRect().top;
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsHeroInView(heroTop < window.innerHeight && heroBottom > 0);
      }

      if (featuresSection) {
        const featuresTop = featuresSection.getBoundingClientRect().top;
        const featuresBottom = featuresSection.getBoundingClientRect().bottom;
        setIsFeaturesInView(featuresTop < window.innerHeight && featuresBottom > 0);
      }

      if (gridSection) {
        const gridTop = gridSection.getBoundingClientRect().top;
        const gridBottom = gridSection.getBoundingClientRect().bottom;
        setIsGridInView(gridTop < window.innerHeight && gridBottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff' }}>
      <Header />

      {/* Hero Section */}
      <section id="collection-hero"
               style={{
                 position: 'relative',
                 overflow: 'hidden',
                 background: 'linear-gradient(to bottom, rgba(18, 18, 18, 0.95), #000000)',
                 padding: 'clamp(8rem, 20vw, 12rem) clamp(1rem, 5vw, 3rem)',
                 textAlign: 'center'
               }}>
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '80rem',
          margin: '0 auto'
        }}>
          {/* Premium Background Gradient */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(200, 169, 110, 0.05) 0%, transparent 50%)',
            pointerEvents: 'none'
          }}></div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isHeroInView ? 1 : 0, y: isHeroInView ? 0 : 40 }}
            transition={{ duration: 1.2, ease: [0.25, 0, 0, 1] }}
          >
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              fontWeight: '800',
              marginBottom: '1.5rem',
              background: 'linear-gradient(to right, #facc15, #fde047, #fb923c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              lineHeight: 1.1
            }}>
              Our Collections
            </h1>
            <p style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '48rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.7
            }}>
              Explore our meticulously curated collections, each representing a distinct facet of horological excellence. From the bold engineering of our Sports line to the timeless elegance of Heritage and the refined luxury of Prestige.
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '400px',
            height: '400px',
            marginLeft: '-200px',
            marginTop: '-200px',
            background: 'radial-gradient(circle at center, rgba(200, 169, 110, 0.08) 0%, transparent 70%)',
            transform: 'rotate(30deg)',
            pointerEvents: 'none',
            animation: 'pulse 6s ease-in-out infinite'
          }}></div>
        </div>
      </section>

      {/* Collections Overview */}
      <section id="collection-features"
               style={{
                 background: '#000000',
                 padding: 'clamp(6rem, 15vw, 10rem) clamp(1.5rem, 5vw, 3rem)'
               }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isFeaturesInView ? 1 : 0, y: isFeaturesInView ? 0 : 30 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: '400',
            fontFamily: 'var(--font-playfair)',
            marginBottom: '3rem',
            textAlign: 'center',
            color: '#ffffff',
            lineHeight: 1.2
          }}>
            Distinguished Collections
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(2rem, 6vw, 3rem)',
            maxWidth: '90rem',
            margin: '0 auto'
          }}>
            {/* Prestige Collection */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isFeaturesInView ? 1 : 0, x: isFeaturesInView ? 0 : -50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                background: 'linear-gradient(to bottom, rgba(30, 30, 30, 0.8), transparent)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, rgba(250, 204, 21, 0.1) 0%, transparent 70%)',
                borderRadius: '0 0 0 120px',
                pointerEvents: 'none'
              }}></div>
              <h3 style={{
                color: '#facc15',
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                Prestige
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#facc15" strokeWidth="1.5">
                  <path d="M10 3L14 12H6L10 3Z"/>
                </svg>
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                lineHeight: 1.6,
                marginBottom: '1.5rem'
              }}>
                The pinnacle of luxury watchmaking, where precious metals meet sophisticated complications.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{
                  background: 'rgba(250, 204, 21, 0.2)',
                  color: '#facc15',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(250, 204, 21, 0.3)'
                }}>
                  Swiss Made
                </span>
                <span style={{
                  background: 'rgba(250, 204, 21, 0.2)',
                  color: '#facc15',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(250, 204, 21, 0.3)'
                }}>
                  Limited Editions
                </span>
              </div>
            </motion.div>

            {/* Sports Collection */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isFeaturesInView ? 1 : 0, x: isFeaturesInView ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                background: 'linear-gradient(to bottom, rgba(30, 30, 30, 0.8), transparent)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, rgba(30, 144, 255, 0.1) 0%, transparent 70%)',
                borderRadius: '0 120px 0 0',
                pointerEvents: 'none'
              }}></div>
              <h3 style={{
                color: '#ffffff',
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                Sports
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#ffffff" strokeWidth="1.5">
                  <path d="M4 8h12M8 4v12"/>
                </svg>
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                lineHeight: 1.6,
                marginBottom: '1.5rem'
              }}>
                Engineered for adventure and built to withstand the elements, our Sports collection combines robustness with precision.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{
                  background: 'rgba(30, 144, 255, 0.2)',
                  color: '#60a5fa',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(30, 144, 255, 0.3)'
                }}>
                  Water Resistant
                </span>
                <span style={{
                  background: 'rgba(30, 144, 255, 0.2)',
                  color: '#60a5fa',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(30, 144, 255, 0.3)'
                }}>
                  Extreme Conditions
                </span>
              </div>
            </motion.div>

            {/* Heritage Collection */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isFeaturesInView ? 1 : 0, y: isFeaturesInView ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                background: 'linear-gradient(to bottom, rgba(30, 30, 30, 0.8), transparent)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, transparent 70%)',
                borderRadius: '120px 0 0 0',
                pointerEvents: 'none'
              }}></div>
              <h3 style={{
                color: '#d4af37',
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                Heritage
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#d4af37" strokeWidth="1.5">
                  <path d="M2 10h16M6 6v8"/>
                </svg>
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                lineHeight: 1.6,
                marginBottom: '1.5rem'
              }}>
                Timeless designs inspired by classic watchmaking traditions, reimagined for the modern connoisseur.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{
                  background: 'rgba(212, 175, 55, 0.2)',
                  color: '#d4af37',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}>
                  Vintage Inspiration
                </span>
                <span style={{
                  background: 'rgba(212, 175, 55, 0.2)',
                  color: '#d4af37',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}>
                  Timeless Elegance
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section id="collection-grid"
               style={{
                 background: '#000000',
                 padding: 'clamp(6rem, 15vw, 10rem) clamp(1rem, 5vw, 3rem)'
               }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isGridInView ? 1 : 0, y: isGridInView ? 0 : 40 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: '400',
            fontFamily: 'var(--font-playfair)',
            marginBottom: '3rem',
            textAlign: 'center',
            color: '#ffffff',
            lineHeight: 1.2
          }}>
            Explore the Collections
          </h2>

          <div style={{
            maxWidth: '90rem',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2.5rem, 6vw, 3rem)'
            }}>
              {watches.map((watch, index) => (
                <motion.div
                  key={watch.id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: isGridInView ? 1 : 0, y: isGridInView ? 0 : 60 }}
                  transition={{ duration: 0.8, delay: index * 0.08 }}
                >
                  <ProductCard watch={watch} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section style={{
        background: 'linear-gradient(to bottom, rgba(18, 18, 18, 0.95), #000000)',
        padding: 'clamp(6rem, 15vw, 10rem) clamp(1.5rem, 5vw, 3rem)',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            fontWeight: '400',
            fontFamily: 'var(--font-playfair)',
            marginBottom: '2rem',
            background: 'linear-gradient(to right, #facc15, #fde047, #fb923c)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.2
          }}>
            Discover Your Perfect Timepiece
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '48rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.7
          }}>
            Each watch in our collection tells a story of innovation, craftsmanship, and timeless style. Find the one that resonates with your journey.
          </p>
          <div style={{
            marginTop: '3rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <a href="/collection" style={{
              textDecoration: 'none',
              background: 'linear-gradient(to right, #facc15, #fb923c)',
              color: '#000000',
              fontWeight: '600',
              fontSize: '0.95rem',
              padding: '1rem 2.5rem',
              borderRadius: '0.5rem',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(250, 204, 21, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              Shop All Collections
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                transform: 'rotate(45deg)',
                pointerEvents: 'none'
              }}></div>
            </a>
            <a href="/about" style={{
              textDecoration: 'none',
              border: '2px solid rgba(250, 204, 21, 0.3)',
              color: '#facc15',
              fontWeight: '600',
              fontSize: '0.95rem',
              padding: '1rem 2.5rem',
              borderRadius: '0.5rem',
              display: 'inline-block',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}>
              Learn About Our Heritage
              <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                transform: 'rotate(45deg)',
                pointerEvents: 'none'
              }}></div>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto', padding: '3rem 1rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <h3 style={{ color: '#facc15', fontWeight: 'bold', marginBottom: '1rem' }}>AVIOR</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>
                Luxury watches crafted with precision and passion
              </p>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '1rem' }}>Shop</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="/collection" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>All Watches</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="/about" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>About</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '1rem' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="/contact" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>Contact</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem', textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>
            <p>&copy; 2026 Avior Prestige. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: translate(-50%, -50%) rotate(30deg) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) rotate(30deg) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
