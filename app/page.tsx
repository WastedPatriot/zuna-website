'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [mascotMood, setMascotMood] = useState<'idle' | 'happy' | 'waving'>('idle');
  const [currentFrame, setCurrentFrame] = useState(0);
  
  // Animate sprite frames
  useEffect(() => {
    const frameInterval = setInterval(() => {
      setCurrentFrame(prev => {
        if (mascotMood === 'idle') return (prev + 1) % 2;
        if (mascotMood === 'waving') return (prev + 1) % 4;
        if (mascotMood === 'happy') return (prev + 1) % 4;
        return 0;
      });
    }, 200);
    
    return () => clearInterval(frameInterval);
  }, [mascotMood]);
  
  // Change sprite animations
  useEffect(() => {
    const spriteInterval = setInterval(() => {
      const moods: ('idle' | 'happy' | 'waving')[] = ['idle', 'happy', 'waving'];
      setMascotMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 5000);
    
    return () => clearInterval(spriteInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-200 relative overflow-hidden">
      
      {/* Pixel Clouds Moving Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10"
          animate={{ x: [-300, 2000] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-64 h-20 bg-white rounded-full opacity-60" style={{ filter: 'blur(2px)' }} />
        </motion.div>
        
        <motion.div
          className="absolute top-32"
          animate={{ x: [-400, 2000] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear", delay: 10 }}
        >
          <div className="w-80 h-24 bg-white rounded-full opacity-50" style={{ filter: 'blur(2px)' }} />
        </motion.div>
        
        <motion.div
          className="absolute top-20"
          animate={{ x: [-200, 2000] }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear", delay: 20 }}
        >
          <div className="w-48 h-16 bg-white rounded-full opacity-55" style={{ filter: 'blur(2px)' }} />
        </motion.div>
      </div>

      {/* Header */}
      <header className="relative z-20 text-center py-8">
        <h1 className="text-6xl font-bold text-gray-900 mb-2" style={{ fontFamily: "monospace" }}>
          ZUNA
        </h1>
        <div className="flex justify-center gap-8 mt-4">
          <Link href="#features" className="text-gray-700 hover:text-gray-900" style={{ fontFamily: "monospace" }}>Features</Link>
          <Link href="#about" className="text-gray-700 hover:text-gray-900" style={{ fontFamily: "monospace" }}>About</Link>
          <Link href="/login" className="text-gray-700 hover:text-gray-900" style={{ fontFamily: "monospace" }}>Login</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "monospace" }}>
            Your Financial Adventure Awaits
          </h2>
          <p className="text-lg text-gray-700 mb-8" style={{ fontFamily: "monospace" }}>
            Manage your money, play monthly games with prizes, and watch your digital pet grow as you save!
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors" style={{ fontFamily: "monospace" }}>
              Start Saving
            </Link>
            <Link href="#features" className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-lg border-2 border-gray-900 transition-colors" style={{ fontFamily: "monospace" }}>
              Learn More
            </Link>
          </div>
        </div>

        {/* Mascot Box - FIXED SIZE AND CENTERED */}
        <div className="flex justify-center mb-16">
          <div className="bg-gradient-to-b from-sky-200 to-green-300 rounded-2xl border-4 border-gray-900 shadow-2xl p-8 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 text-center mb-4" style={{ fontFamily: "monospace" }}>
              YOUR FINANCIAL FRIEND
            </h3>
            <p className="text-center text-gray-700 mb-6 text-sm" style={{ fontFamily: "monospace" }}>
              Meet your digital pet companion
            </p>
            
            {/* Sprite Display - PROPER SIZE */}
            <div className="flex justify-center items-center h-40 mb-6">
              <div className="relative w-32 h-32 overflow-hidden">
                <img
                  src={`/sprites/${mascotMood === 'idle' ? 'idleblink' : mascotMood}.webp`}
                  alt="Zuna Mascot"
                  style={{
                    position: 'absolute',
                    width: mascotMood === 'idle' ? '256px' : '512px',
                    height: '128px',
                    imageRendering: 'pixelated',
                    left: `-${currentFrame * 128}px`,
                    top: '0',
                  }}
                />
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-900 text-white px-4 py-2 rounded inline-block text-xs" style={{ fontFamily: "monospace" }}>
                {mascotMood === 'idle' && "Waiting for you..."}
                {mascotMood === 'waving' && "Hello there! 👋"}
                {mascotMood === 'happy' && "So excited to save with you!"}
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <section id="features" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8" style={{ fontFamily: "monospace" }}>
            Everything You Need
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-gray-900 shadow-lg text-center">
              <div className="text-4xl mb-3">🏦</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "monospace" }}>Smart Banking</h3>
              <p className="text-gray-700 text-xs" style={{ fontFamily: "monospace", lineHeight: "1.6" }}>
                Connect your real bank accounts and get AI-powered insights
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-gray-900 shadow-lg text-center">
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "monospace" }}>Monthly Games</h3>
              <p className="text-gray-700 text-xs" style={{ fontFamily: "monospace", lineHeight: "1.6" }}>
                Play games with real prizes and earn ZUNA tokens
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-gray-900 shadow-lg text-center">
              <div className="text-4xl mb-3">🐾</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: "monospace" }}>Digital Pet</h3>
              <p className="text-gray-700 text-xs" style={{ fontFamily: "monospace", lineHeight: "1.6" }}>
                Watch your pet grow happier as you save money
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-8 rounded-xl border-2 border-gray-900 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "monospace" }}>
              Ready to Start?
            </h2>
            <p className="text-white mb-6 text-sm" style={{ fontFamily: "monospace" }}>
              Join thousands building better financial habits
            </p>
            <Link href="/signup" className="bg-white text-gray-900 font-bold py-3 px-10 rounded-lg hover:bg-gray-100 transition-colors inline-block" style={{ fontFamily: "monospace" }}>
              Get Started Today
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}