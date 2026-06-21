'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/80 border-b border-amber-400/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-3xl font-black bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent hover:drop-shadow-lg transition-all"
            >
              AVIOR
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <Link
              href="/"
              className={`font-semibold transition-all duration-300 relative group ${
                isActive('/') ? 'text-amber-400' : 'text-white hover:text-amber-400'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-300 group-hover:w-full transition-all duration-300 ${
                isActive('/') ? 'w-full' : ''
              }`}></span>
            </Link>
            <Link
              href="/collection"
              className={`font-semibold transition-all duration-300 relative group ${
                isActive('/collection') ? 'text-amber-400' : 'text-white hover:text-amber-400'
              }`}
            >
              Collection
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-300 group-hover:w-full transition-all duration-300 ${
                isActive('/collection') ? 'w-full' : ''
              }`}></span>
            </Link>
            <Link
              href="/about"
              className={`font-semibold transition-all duration-300 relative group ${
                isActive('/about') ? 'text-amber-400' : 'text-white hover:text-amber-400'
              }`}
            >
              About
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-300 group-hover:w-full transition-all duration-300 ${
                isActive('/about') ? 'w-full' : ''
              }`}></span>
            </Link>
            <Link
              href="/contact"
              className={`font-semibold transition-all duration-300 relative group ${
                isActive('/contact') ? 'text-amber-400' : 'text-white hover:text-amber-400'
              }`}
            >
              Contact
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-300 group-hover:w-full transition-all duration-300 ${
                isActive('/contact') ? 'w-full' : ''
              }`}></span>
            </Link>
          </div>

          {/* CTA Button */}
          <Link href="/collection" className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold rounded-lg hover:shadow-xl hover:shadow-amber-500/50 transition-all duration-200"
            >
              Shop Now
            </motion.button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-3 hover:bg-white/10 rounded-lg transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-6 space-y-2 border-t border-white/10 pt-4"
          >
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg font-semibold transition-all ${
                isActive('/') 
                  ? 'bg-amber-400 text-black' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/collection"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg font-semibold transition-all ${
                isActive('/collection') 
                  ? 'bg-amber-400 text-black' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Collection
            </Link>
            <Link 
              href="/about"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg font-semibold transition-all ${
                isActive('/about') 
                  ? 'bg-amber-400 text-black' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              About
            </Link>
            <Link 
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg font-semibold transition-all ${
                isActive('/contact') 
                  ? 'bg-amber-400 text-black' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Contact
            </Link>
            <Link 
              href="/collection"
              onClick={() => setIsOpen(false)}
              className="block w-full px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all mt-4 text-center"
            >
              Shop Now
            </Link>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
