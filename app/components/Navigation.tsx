'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth0 } from '../providers/Auth0Provider';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, login, logout } = useAuth0();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-400 rounded-lg" />
            <span className="text-xl font-bold pixelated text-green-400">ZUNA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-gray-300 hover:text-green-400 transition-colors">Features</Link>
            <Link href="/pricing" className="text-gray-300 hover:text-green-400 transition-colors">Pricing</Link>
            <Link href="/about" className="text-gray-300 hover:text-green-400 transition-colors">About</Link>
            
            {isAuthenticated ? (
              <>
                <span className="text-gray-300">Hi, {user?.name || 'User'}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => logout()}
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <button onClick={() => login()} className="text-gray-300 hover:text-green-400 transition-colors">
                  Login
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => login()}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-bold pixelated text-sm"
                >
                  SIGN UP
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-green-400"
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1">
              <motion.div 
                className="w-full h-0.5 bg-green-400"
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
              />
              <motion.div 
                className="w-full h-0.5 bg-green-400"
                animate={{ opacity: isOpen ? 0 : 1 }}
              />
              <motion.div 
                className="w-full h-0.5 bg-green-400"
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-sm border-t border-gray-800"
          >
            <div className="px-4 py-4 space-y-4">
              <Link href="/features" className="block text-gray-300 hover:text-green-400 transition-colors">Features</Link>
              <Link href="/pricing" className="block text-gray-300 hover:text-green-400 transition-colors">Pricing</Link>
              <Link href="/about" className="block text-gray-300 hover:text-green-400 transition-colors">About</Link>
              <Link href="/login" className="block text-gray-300 hover:text-green-400 transition-colors">Login</Link>
              <Link href="/signup" className="block">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-bold pixelated text-sm">
                  SIGN UP
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}