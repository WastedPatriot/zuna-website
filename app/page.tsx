'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  const phrases = [
    "Financial wellness meets fun",
    "Your money companion",
    "Banking reimagined",
    "Save, play, grow"
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(phraseInterval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            ZUNA
          </Link>
          <div className="flex gap-8 items-center">
            <Link href="#features" className="hover:text-green-400 transition">Features</Link>
            <Link href="#mascot" className="hover:text-green-400 transition">Mascot</Link>
            <Link href="#download" className="hover:text-green-400 transition">Download</Link>
            <Link 
              href="https://app.gozuna.co.uk" 
              className="bg-green-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-green-400 transition"
            >
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-green-900/20" />
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, #4ade80 0%, transparent 50%), radial-gradient(circle at 80% 80%, #9333ea 0%, transparent 50%)',
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
              ZUNA
            </h1>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPhrase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-2xl md:text-3xl text-gray-300 mb-8"
              >
                {phrases[currentPhrase]}
              </motion.p>
            </AnimatePresence>
            
            {/* Pixel Mascot Preview */}
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-pulse" />
              <div className="relative z-10 w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-6xl">🎮</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link 
                href="#download"
                className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition transform hover:scale-105"
              >
                Download App
              </Link>
              <Link 
                href="#features"
                className="border border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
              Banking that gets you
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-900/20 to-purple-900/10 p-8 rounded-3xl border border-purple-500/20"
              >
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-2xl font-bold mb-4">Gamified Savings</h3>
                <p className="text-gray-400">
                  Turn your financial goals into an adventure with our Tamagotchi-style companion
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-900/20 to-green-900/10 p-8 rounded-3xl border border-green-500/20"
              >
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold mb-4">AI Money Coach</h3>
                <p className="text-gray-400">
                  Get personalized financial advice and track subscriptions with our smart AI
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 p-8 rounded-3xl border border-blue-500/20"
              >
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-2xl font-bold mb-4">Secure Crypto Wallet</h3>
                <p className="text-gray-400">
                  Store, buy, and manage your crypto with bank-grade security
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mascot Section */}
      <section id="mascot" className="py-24 px-6 relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Meet your money buddy
            </h2>
            <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
              A pixel-perfect companion that grows with your savings and celebrates your wins
            </p>
            
            {/* Mascot Showcase */}
            <div className="bg-gradient-to-br from-green-500/10 to-purple-500/10 rounded-3xl p-12 max-w-4xl mx-auto border border-white/10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-left">
                  <h3 className="text-3xl font-bold mb-6">Emotional & Interactive</h3>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 text-xl">✓</span>
                      <span>Feed, play, and care for your mascot</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 text-xl">✓</span>
                      <span>Watch it evolve as you reach savings goals</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 text-xl">✓</span>
                      <span>Get motivational messages and tips</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 text-xl">✓</span>
                      <span>Unlock new animations and environments</span>
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <div className="w-64 h-64 mx-auto bg-black/50 rounded-2xl border border-white/20 flex items-center justify-center">
                    <div className="text-8xl animate-bounce">🌱</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-24 px-6 bg-gradient-to-t from-green-900/20 to-transparent">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Ready to start?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands who are already transforming their financial future with Zuna
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link 
                href="https://apps.apple.com/zuna"
                className="bg-white text-black px-12 py-6 rounded-full font-semibold text-xl hover:bg-gray-200 transition transform hover:scale-105 flex items-center gap-3"
              >
                <span className="text-3xl">🍎</span>
                Download for iOS
              </Link>
              <Link 
                href="https://play.google.com/store/apps/zuna"
                className="bg-white text-black px-12 py-6 rounded-full font-semibold text-xl hover:bg-gray-200 transition transform hover:scale-105 flex items-center gap-3"
              >
                <span className="text-3xl">🤖</span>
                Download for Android
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">ZUNA</h3>
              <p className="text-gray-400">Financial wellness for everyone</p>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms</Link>
              <Link href="/support" className="text-gray-400 hover:text-white transition">Support</Link>
              <Link href="https://twitter.com/zunaapp" className="text-gray-400 hover:text-white transition">Twitter</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © 2024 Zuna. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}