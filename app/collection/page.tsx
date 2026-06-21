'use client';

import Header from '@/app/components/Header';
import ProductCard from '@/app/components/ProductCard';
import { watches, getAllCollections } from '@/lib/watches';
import { motion } from 'framer-motion';

export default function CollectionPage() {
  const collections = getAllCollections();

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
              Our Collection
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '32rem',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Discover our exclusive range of luxury watches, each crafted with precision and passion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '5rem',
        paddingBottom: '5rem'
      }}>
        <div style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {watches.map((watch, index) => (
              <ProductCard key={watch.id} watch={watch} index={index} />
            ))}
          </div>
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
          </div>
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem', textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>
            <p>&copy; 2026 Avior Prestige. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
