'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SpriteAnimation from './SpriteAnimation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-sky-400/95 backdrop-blur-md shadow-lg' : 'bg-sky-400/80'
    }`} style={{
      borderBottom: '4px solid #1a1a1a',
      imageRendering: 'pixelated'
    }}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10">
              <SpriteAnimation
                sprite="/sprites/idleblink.webp"
                frames={2}
                frameRate={500}
                size={40}
                alt="ZUNA Logo"
              />
            </div>
            <span className="text-2xl font-bold text-white" style={{
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              textShadow: '2px 2px 0 rgba(0,0,0,0.3)'
            }}>
              ZUNA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-yellow-300 transition-colors text-sm font-medium"
                style={{ fontFamily: 'monospace' }}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 ml-8">
              <Link
                href="/signin"
                className="text-white hover:text-yellow-300 transition-colors text-sm font-medium"
                style={{ fontFamily: 'monospace' }}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 transition-colors text-sm"
                style={{
                  fontFamily: 'monospace',
                  border: '3px solid rgba(0,0,0,0.2)',
                  boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
                }}
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            style={{
              border: '2px solid white',
              background: isMenuOpen ? 'rgba(0,0,0,0.2)' : 'transparent'
            }}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 border-t-2 border-white/20">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 text-white hover:text-yellow-300 transition-colors text-sm font-medium"
                    style={{ fontFamily: 'monospace' }}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t-2 border-white/20">
                  <Link
                    href="/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 text-white hover:text-yellow-300 transition-colors text-sm font-medium"
                    style={{ fontFamily: 'monospace' }}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 text-center bg-green-500 hover:bg-green-600 text-white font-bold transition-colors text-sm mt-2"
                    style={{
                      fontFamily: 'monospace',
                      border: '3px solid rgba(0,0,0,0.2)',
                      boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
                    }}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
