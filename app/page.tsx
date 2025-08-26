'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PixelMascot from './components/PixelMascot';
import TamagotchiDisplay from './components/TamagotchiDisplay';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-20 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <PixelMascot size={48} mood="happy" />
            <h1 className="text-2xl font-bold pixelated text-green-600">ZUNA</h1>
          </div>
          
          <div className="flex gap-6">
            <Link href="/signup" className="text-gray-700 hover:text-green-600 transition-colors">
              Sign Up
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-green-600 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 pixelated text-green-600">
              YOUR DIGITAL
              <br />
              FINANCIAL PET
            </h2>
            
            <p className="text-xl mb-8 text-gray-700">
              Take care of your money, take care of your pet. 
              Watch them both grow together!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-500 text-white px-8 py-4 rounded-full font-bold pixelated shadow-lg hover:bg-green-600 transition-colors"
                >
                  START NOW
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-full font-bold pixelated hover:bg-green-50 transition-colors"
              >
                LEARN MORE
              </motion.button>
            </div>
          </motion.div>
          
          {/* Right Content - Tamagotchi */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TamagotchiDisplay />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 pixelated text-green-600">
            HOW IT WORKS
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'SAVE MONEY',
                description: 'Every pound you save feeds your pet',
                icon: '💰',
                mascotMood: 'happy' as const,
              },
              {
                title: 'PLAY GAMES',
                description: 'Earn rewards and keep your pet happy',
                icon: '🎮',
                mascotMood: 'gaming' as const,
              },
              {
                title: 'GROW TOGETHER',
                description: 'Watch your savings and pet flourish',
                icon: '🌱',
                mascotMood: 'jumping' as const,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <div className="mb-4">
                  <PixelMascot size={80} mood={feature.mascotMood} />
                </div>
                <h4 className="text-xl font-bold mb-2 pixelated text-green-600">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-green-400 to-green-600 rounded-3xl p-12 text-white"
          >
            <h3 className="text-4xl font-bold mb-6 pixelated">
              READY TO START?
            </h3>
            <p className="text-xl mb-8">
              Join thousands of users growing their financial future
            </p>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-12 py-4 rounded-full font-bold pixelated text-lg shadow-lg"
              >
                CREATE ACCOUNT
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p className="pixelated text-sm">© 2024 ZUNA - YOUR FINANCIAL COMPANION</p>
        </div>
      </footer>
    </div>
  );
}