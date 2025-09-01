'use client';

// ZUNA Financial Wellness Platform - Pixel Theme Website
// Last updated: Force redeploy to fix Vercel issue
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SpriteAnimation from './components/SpriteAnimation';

export default function Home() {
  const [mascotMood, setMascotMood] = useState<'idle' | 'happy' | 'waving'>('idle');
  
  // Change sprite animations
  useEffect(() => {
    const spriteInterval = setInterval(() => {
      const moods: ('idle' | 'happy' | 'waving')[] = ['idle', 'happy', 'waving'];
      setMascotMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 5000);
    
    return () => clearInterval(spriteInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 relative overflow-hidden">
      
      {/* Animated Pixel Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cloud 1 */}
        <motion.div
          className="absolute top-10"
          animate={{ x: [-300, 2000] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="pixel-cloud" style={{ 
            width: '120px', 
            height: '40px',
            background: 'white',
            opacity: 0.8,
            imageRendering: 'pixelated',
            boxShadow: '20px 10px 0 white, 40px 10px 0 white, 10px 20px 0 white, 30px 20px 0 white'
          }} />
        </motion.div>
        
        {/* Cloud 2 */}
        <motion.div
          className="absolute top-32"
          animate={{ x: [-400, 2000] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear", delay: 10 }}
        >
          <div className="pixel-cloud" style={{ 
            width: '160px', 
            height: '50px',
            background: 'white',
            opacity: 0.7,
            imageRendering: 'pixelated',
            boxShadow: '30px 10px 0 white, 50px 10px 0 white, 20px 20px 0 white, 40px 20px 0 white, 60px 20px 0 white'
          }} />
        </motion.div>
        
        {/* Cloud 3 */}
        <motion.div
          className="absolute top-20"
          animate={{ x: [-200, 2000] }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear", delay: 20 }}
        >
          <div className="pixel-cloud" style={{ 
            width: '100px', 
            height: '35px',
            background: 'white',
            opacity: 0.75,
            imageRendering: 'pixelated',
            boxShadow: '15px 8px 0 white, 30px 8px 0 white, 10px 15px 0 white, 25px 15px 0 white'
          }} />
        </motion.div>
      </div>

      {/* Header */}
      <header className="relative z-20 text-center py-8">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg" style={{ 
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          textShadow: '2px 2px 0 rgba(0,0,0,0.3)'
        }}>
          ZUNA
        </h1>
        <p className="text-xl md:text-2xl text-yellow-300 drop-shadow-md mb-6" style={{
          fontFamily: 'monospace',
          letterSpacing: '0.05em'
        }}>Your Financial Adventure</p>
        <div className="flex justify-center gap-8">
          <Link href="#features" className="text-white hover:text-yellow-300 text-sm transition-colors" style={{ fontFamily: 'monospace' }}>Features</Link>
          <Link href="#about" className="text-white hover:text-yellow-300 text-sm transition-colors" style={{ fontFamily: 'monospace' }}>About</Link>
          <Link href="/login" className="text-white hover:text-yellow-300 text-sm transition-colors" style={{ fontFamily: 'monospace' }}>Login</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg" style={{
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            textShadow: '2px 2px 0 rgba(0,0,0,0.3)'
          }}>
            Your Financial Adventure Awaits
          </h2>
          <p className="text-base md:text-lg text-white mb-8" style={{
            fontFamily: 'monospace'
          }}>
            Manage your money, play monthly games with prizes, and watch your digital pet grow as you save!
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/signup" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 transition-colors text-sm shadow-lg" style={{
              fontFamily: 'monospace',
              border: '3px solid rgba(0,0,0,0.2)',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.2)'
            }}>
              Start Saving
            </Link>
            <Link href="#features" className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 transition-colors text-sm shadow-lg" style={{
              fontFamily: 'monospace',
              border: '3px solid #1a1a1a',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.2)'
            }}>
              Learn More
            </Link>
          </div>
        </div>

        {/* Mascot Box - PIXEL PERFECT */}
        <div className="flex justify-center mb-16">
          <div className="bg-gradient-to-b from-sky-200 to-green-300 p-8 w-full max-w-md" style={{
            border: '4px solid #1a1a1a',
            boxShadow: '8px 8px 0 rgba(0,0,0,0.3)',
            imageRendering: 'pixelated'
          }}>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-4" style={{
              fontFamily: 'monospace',
              letterSpacing: '0.1em'
            }}>
              YOUR FINANCIAL FRIEND
            </h3>
            <p className="text-center text-gray-700 mb-6 text-xs" style={{
              fontFamily: 'monospace'
            }}>
              Meet your digital pet companion
            </p>
            
            {/* Sprite Display using SpriteAnimation component */}
            <div className="flex justify-center items-center mb-6">
              <SpriteAnimation
                sprite={`/sprites/${mascotMood === 'idle' ? 'idleblink' : mascotMood}.webp`}
                frames={mascotMood === 'idle' ? 2 : 4}
                frameRate={200}
                size={128}
                alt="Zuna Mascot"
              />
            </div>
            
            <div className="text-center">
              <div className="bg-gray-900 text-white px-4 py-2 inline-block text-xs" style={{
                fontFamily: 'monospace',
                border: '2px solid #333',
                boxShadow: '2px 2px 0 rgba(0,0,0,0.3)'
              }}>
                {mascotMood === 'idle' && "Waiting for you..."}
                {mascotMood === 'waving' && "Hello there! 👋"}
                {mascotMood === 'happy' && "So excited to save with you!"}
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <section id="features" className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg" style={{
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            textShadow: '2px 2px 0 rgba(0,0,0,0.3)'
          }}>
            Everything You Need
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/90 backdrop-blur-sm p-6 text-center" style={{
              border: '4px solid #1a1a1a',
              boxShadow: '6px 6px 0 rgba(0,0,0,0.3)'
            }}>
              <div className="text-4xl mb-3">🏦</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'monospace' }}>Smart Banking</h3>
              <p className="text-gray-700 text-xs" style={{ fontFamily: 'monospace', lineHeight: "1.8" }}>
                Connect your real bank accounts and get AI-powered insights
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-6 text-center" style={{
              border: '4px solid #1a1a1a',
              boxShadow: '6px 6px 0 rgba(0,0,0,0.3)'
            }}>
              <div className="text-4xl mb-3">🎮</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'monospace' }}>Monthly Games</h3>
              <p className="text-gray-700 text-xs" style={{ fontFamily: 'monospace', lineHeight: "1.8" }}>
                Play games with real prizes and earn ZUNA tokens
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-6 text-center" style={{
              border: '4px solid #1a1a1a',
              boxShadow: '6px 6px 0 rgba(0,0,0,0.3)'
            }}>
              <div className="text-4xl mb-3">🐾</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'monospace' }}>Digital Pet</h3>
              <p className="text-gray-700 text-xs" style={{ fontFamily: 'monospace', lineHeight: "1.8" }}>
                Watch your pet grow happier as you save money
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-8 rounded-xl border-4 border-gray-900 shadow-lg pixel-border">
            <h2 className="text-2xl font-bold text-white mb-4 pixel-text">
              Ready to Start?
            </h2>
            <p className="text-white mb-6 text-sm pixel-text">
              Join thousands building better financial habits
            </p>
            <Link href="/signup" className="bg-white text-gray-900 font-bold py-3 px-10 rounded-lg hover:bg-gray-100 transition-colors inline-block pixel-text text-sm shadow-lg">
              Get Started Today
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}