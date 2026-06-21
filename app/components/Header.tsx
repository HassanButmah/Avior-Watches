'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent"
            >
              AVIOR
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/collection"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              Collection
            </Link>
            <Link
              href="/about"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-6 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-200"
          >
            Shop Now
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4"
          >
            <Link href="/" className="block text-white/80 py-2">
              Home
            </Link>
            <Link href="/collection" className="block text-white/80 py-2">
              Collection
            </Link>
            <Link href="/about" className="block text-white/80 py-2">
              About
            </Link>
            <Link href="/contact" className="block text-white/80 py-2">
              Contact
            </Link>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
