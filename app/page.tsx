'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [mascotMood, setMascotMood] = useState<'idle' | 'happy' | 'waving'>('idle');
  
  useEffect(() => {
    const interval = setInterval(() => {
      const moods: ('idle' | 'happy' | 'waving')[] = ['idle', 'happy', 'waving'];
      setMascotMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-200 relative overflow-hidden">
      {/* Animated Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-0"
          animate={{
            x: [-300, 2000],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-64 h-20 bg-white/40 rounded-full blur-xl" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 left-0"
          animate={{
            x: [-400, 2000],
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
            delay: 10,
          }}
        >
          <div className="w-80 h-24 bg-white/30 rounded-full blur-xl" />
        </motion.div>
        
        <motion.div
          className="absolute top-20 left-0"
          animate={{
            x: [-200, 2000],
          }}
          transition={{
            duration: 70,
            repeat: Infinity,
            ease: "linear",
            delay: 20,
          }}
        >
          <div className="w-48 h-16 bg-white/35 rounded-full blur-xl" />
        </motion.div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-gray-900" style={{ fontFamily: "\'Press Start 2P\', monospace" }}>
            ZUNA
          </h1>
          <p className="text-xl text-gray-700" style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "14px", lineHeight: "1.8" }}>
            Your Financial Adventure Awaits
          </p>
        </header>

        {/* Hero Section with Mascot */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-16">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl font-bold mb-6 text-gray-900" style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "28px", lineHeight: "1.4" }}>
              Save Money,<br />
              Play Games,<br />
              Win Prizes!
            </h2>
            
            <p className="text-gray-700 mb-8" style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "12px", lineHeight: "1.8" }}>
              Manage your money, play monthly games with prizes, 
              and watch your digital pet grow as you save!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/signup" 
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg transition-all hover:scale-105"
                style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "14px" }}
              >
                Start Saving
              </Link>
              <Link 
                href="#features" 
                className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg shadow-lg border-2 border-gray-900 transition-all hover:scale-105"
                style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "14px" }}
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Side - Mascot Box */}
          <div className="flex-1 max-w-md">
            <div className="bg-gradient-to-b from-sky-200 to-green-300 rounded-2xl border-4 border-gray-900 shadow-2xl p-8 relative h-96">
              <div className="absolute top-4 left-4 right-4">
                <h3 className="text-center text-gray-900 font-bold" style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "16px" }}>
                  YOUR FINANCIAL FRIEND
                </h3>
                <p className="text-center text-gray-700 mt-2" style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "10px" }}>
                  Meet your digital pet companion
                </p>
              </div>
              
              {/* Mascot Display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    y: mascotMood === 'happy' ? [0, -10, 0] : 0,
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: mascotMood === 'happy' ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                >
                  <Image
                    src={`/sprites/${mascotMood === 'idle' ? 'idleblink' : mascotMood === 'happy' ? 'happy' : 'waving'}.webp`}
                    alt="Zuna Mascot"
                    width={120}
                    height={120}
                    className="pixelated"
                    unoptimized
                  />
                </motion.div>
              </div>
              
              {/* Status Text */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-gray-900 text-white px-4 py-2 rounded text-center" style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "10px" }}>
                  {mascotMood === 'idle' && "Waiting for you..."}
                  {mascotMood === 'happy' && "So happy to see you!"}
                  {mascotMood === 'waving' && "Hello there!"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900" style={{ fontFamily: "\'Press Start 2P\', monospace" }}>
            Everything You Need
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-4 border-gray-900 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900" style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "16px" }}>
                🏦 Smart Banking
              </h3>
              <p className="text-gray-700" style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "10px", lineHeight: "1.8" }}>
                Connect your real bank accounts and get AI-powered insights on your spending.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-4 border-gray-900 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900" style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "16px" }}>
                🎮 Monthly Games
              </h3>
              <p className="text-gray-700" style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "10px", lineHeight: "1.8" }}>
                Play monthly games with real prizes and earn ZUNA tokens for saving money.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-4 border-gray-900 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900" style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "16px" }}>
                🐾 Digital Pet
              </h3>
              <p className="text-gray-700" style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "10px", lineHeight: "1.8" }}>
                Watch your Tamagotchi grow happier as you hit your savings goals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-12 rounded-2xl border-4 border-gray-900 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "24px" }}>
              Ready to Start?
            </h2>
            <p className="text-white mb-8" style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "12px", lineHeight: "1.8" }}>
              Join thousands building better financial habits with ZUNA
            </p>
            <Link 
              href="/signup" 
              className="inline-block bg-white text-gray-900 px-12 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-all hover:scale-105"
              style={{ fontFamily: "\'Press Start 2P\', monospace", fontSize: "14px" }}
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}