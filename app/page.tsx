'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [currentSprite, setCurrentSprite] = useState('idleblink');
  const [currentFrame, setCurrentFrame] = useState(0);
  
  // Animate sprite frames
  useEffect(() => {
    const frameInterval = setInterval(() => {
      setCurrentFrame(prev => {
        if (currentSprite === 'idleblink') return (prev + 1) % 2;
        if (currentSprite === 'waving') return (prev + 1) % 4;
        if (currentSprite === 'happy') return (prev + 1) % 4;
        return 0;
      });
    }, 200);
    
    return () => clearInterval(frameInterval);
  }, [currentSprite]);
  
  // Change sprite animations
  useEffect(() => {
    const spriteInterval = setInterval(() => {
      const sprites = ['idleblink', 'waving', 'happy'];
      setCurrentSprite(sprites[Math.floor(Math.random() * sprites.length)]);
    }, 5000);
    
    return () => clearInterval(spriteInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-200 relative overflow-hidden">
      
      {/* Moving Clouds Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-0 w-64 h-20 bg-white rounded-full opacity-40 blur-xl"
          animate={{ x: [-300, 2000] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-32 left-0 w-80 h-24 bg-white rounded-full opacity-30 blur-xl"
          animate={{ x: [-400, 2000] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear", delay: 10 }}
        />
        <motion.div
          className="absolute top-20 left-0 w-48 h-16 bg-white rounded-full opacity-35 blur-xl"
          animate={{ x: [-200, 2000] }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear", delay: 20 }}
        />
      </div>

      {/* Header */}
      <header className="relative z-20 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: "monospace" }}>ZUNA</div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-gray-900 transition-colors" style={{ fontFamily: "monospace" }}>Features</Link>
            <Link href="#about" className="text-gray-700 hover:text-gray-900 transition-colors" style={{ fontFamily: "monospace" }}>About</Link>
            <Link href="/login" className="text-gray-700 hover:text-gray-900 transition-colors" style={{ fontFamily: "monospace" }}>Login</Link>
          </nav>
          <Link href="/signup" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors" style={{ fontFamily: "monospace" }}>
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: "monospace" }}>
            Your Financial<br/>Adventure Awaits
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto" style={{ fontFamily: "monospace" }}>
            Manage your money, play monthly games with prizes, and watch your digital pet grow as you save!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg" style={{ fontFamily: "monospace" }}>
              Start Your Journey
            </Link>
            <Link href="#features" className="bg-white/80 hover:bg-white text-gray-900 font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg border-2 border-gray-900" style={{ fontFamily: "monospace" }}>
              Learn More
            </Link>
          </div>
        </div>

        {/* Mascot Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-b from-sky-200 to-green-300 rounded-2xl border-4 border-gray-900 shadow-2xl p-8 mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4" style={{ fontFamily: "monospace" }}>
              YOUR FINANCIAL FRIEND
            </h2>
            <p className="text-center text-gray-700 mb-8" style={{ fontFamily: "monospace" }}>
              Meet your digital pet companion
            </p>
            
            {/* Sprite Display Area */}
            <div className="flex justify-center items-center h-64 relative">
              <div className="relative w-32 h-32 overflow-hidden">
                <img
                  src={`/sprites/${currentSprite}.webp`}
                  alt="Zuna Mascot"
                  className="absolute pixelated"
                  style={{
                    width: currentSprite === 'idleblink' ? '256px' : '512px',
                    height: '128px',
                    imageRendering: 'pixelated',
                    transform: `translateX(-${currentFrame * 128}px)`,
                  }}
                />
              </div>
            </div>
            
            <div className="text-center mt-8">
              <div className="bg-gray-900 text-white px-4 py-2 rounded inline-block" style={{ fontFamily: "monospace", fontSize: "12px" }}>
                {currentSprite === 'idleblink' && "Waiting for you..."}
                {currentSprite === 'waving' && "Hello there! 👋"}
                {currentSprite === 'happy' && "So excited to save with you! 🎉"}
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <section id="features" className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12" style={{ fontFamily: "monospace" }}>
            Everything You Need
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-4 border-gray-900 shadow-lg text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">🏦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "monospace" }}>Smart Banking</h3>
              <p className="text-gray-700" style={{ fontFamily: "monospace", fontSize: "14px" }}>
                Connect your real bank accounts and get AI-powered insights on your spending patterns.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-4 border-gray-900 shadow-lg text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "monospace" }}>Monthly Games</h3>
              <p className="text-gray-700" style={{ fontFamily: "monospace", fontSize: "14px" }}>
                Play monthly games with real prizes and earn ZUNA tokens for saving money.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-4 border-gray-900 shadow-lg text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">🐾</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "monospace" }}>Digital Pet</h3>
              <p className="text-gray-700" style={{ fontFamily: "monospace", fontSize: "14px" }}>
                Watch your Tamagotchi grow happier as you hit your savings goals and build healthy habits.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-12 rounded-2xl border-4 border-gray-900 shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: "monospace" }}>
              Ready to Start Saving?
            </h2>
            <p className="text-xl text-white mb-8" style={{ fontFamily: "monospace" }}>
              Join thousands of users building better financial habits
            </p>
            <Link href="/signup" className="bg-white text-gray-900 font-bold py-4 px-12 rounded-lg text-xl hover:bg-gray-100 transition-colors shadow-lg inline-block" style={{ fontFamily: "monospace" }}>
              Get Started Today
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}