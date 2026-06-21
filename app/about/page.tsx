'use client';

import Header from '@/app/components/Header';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'black', color: 'white' }}>
      <Header />

      {/* Hero Section */}
      <section style={{
        paddingTop: '8rem',
        paddingBottom: '5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        background: 'linear-gradient(to bottom, rgba(120, 53, 15, 0.1), black)'
      }}>
        <div style={{ maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              background: 'linear-gradient(to right, #facc15, #fde047, #fb923c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              About Avior
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              Crafting timeless elegance since 2010
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section style={{
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '5rem',
        paddingBottom: '5rem'
      }}>
        <div style={{ maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>
              Our Story
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '1.5rem',
              lineHeight: '1.75'
            }}>
              Avior Prestige was founded on the belief that luxury watches are more than just timepieces—they are expressions of style, precision, and craftsmanship. Our journey began in the heart of Switzerland, where master watchmakers dedicated themselves to creating exceptional timepieces that would stand the test of time.
            </p>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '1.5rem',
              lineHeight: '1.75'
            }}>
              Each watch in our collection represents years of research, development, and meticulous attention to detail. We combine traditional Swiss watchmaking techniques with modern innovation to create watches that are both timeless and contemporary.
            </p>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: '1.75'
            }}>
              Today, Avior Prestige is recognized worldwide as a symbol of excellence, reliability, and sophisticated taste. Our watches are cherished by collectors, professionals, and enthusiasts who appreciate the finer things in life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.03)'
      }}>
        <div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            textAlign: 'center'
          }}>
            Our Values
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { title: 'Precision', description: 'Every movement is tested to COSC standards for accuracy' },
              { title: 'Craftsmanship', description: 'Handcrafted details by master watchmakers with decades of experience' },
              { title: 'Innovation', description: 'Combining traditional techniques with modern technology' }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  textAlign: 'center'
                }}
              >
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#facc15'
                }}>
                  {value.title}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '56rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem'
          }}>
            Discover Our Collection
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '2rem'
          }}>
            Experience the perfect blend of tradition and innovation
          </p>
          <Link href="/collection" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(to right, #facc15, #fb923c)',
              color: 'black',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              View Collection
            </button>
          </Link>
        </div>
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
                Luxury watches crafted with precision
              </p>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '1rem' }}>Shop</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><Link href="/collection" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>All Watches</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 'bold', marginBottom: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><Link href="/about" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>About</Link></li>
                <li><Link href="/contact" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none' }}>Contact</Link></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem', textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>
            <p>&copy; 2026 Avior Prestige. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
