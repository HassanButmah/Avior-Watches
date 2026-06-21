'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/collection', label: 'Collection' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(217, 119, 6, 0.2)'
    }}>
      <nav style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '6rem'
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #facc15, #fde047, #fb923c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              cursor: 'pointer'
            }}>
              AVIOR
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex" style={{
            gap: '0',
            alignItems: 'center',
            display: 'flex'
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: 'none',
                  color: isActive(link.href) ? '#facc15' : 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  position: 'relative',
                  transition: 'color 0.3s ease',
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => !isActive(link.href) && (e.currentTarget.style.color = '#facc15')}
                onMouseLeave={(e) => !isActive(link.href) && (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link href="/collection" className="hidden md:block" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '0.75rem 2rem',
              background: 'linear-gradient(to right, #facc15, #fb923c)',
              color: 'black',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(250, 204, 21, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}>
              Shop Now
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.5rem'
            }}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div style={{
            display: 'block',
            paddingBottom: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '1rem'
          }} className="md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  color: isActive(link.href) ? 'black' : 'rgba(255, 255, 255, 0.8)',
                  backgroundColor: isActive(link.href) ? '#facc15' : 'transparent',
                  borderRadius: '0.5rem',
                  marginBottom: '0.5rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/collection" style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
              <button style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'linear-gradient(to right, #facc15, #fb923c)',
                color: 'black',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                marginTop: '1rem'
              }}>
                Shop Now
              </button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
