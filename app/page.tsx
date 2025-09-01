'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PixelBackground from './components/PixelBackground';
import GrassyBottom from './components/GrassyBottom';
import SpriteAnimation from './components/SpriteAnimation';

// Import Press Start 2P font for pixel text
import { Press_Start_2P } from 'next/font/google';

const pixelFont = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mascotMood, setMascotMood] = useState<'idle' | 'happy' | 'waving'>('idle');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Check time and set initial mode
  useEffect(() => {
    const hour = new Date().getHours();
    setIsDarkMode(hour >= 19 || hour < 7); // Dark mode from 7pm to 7am
  }, []);

  // Change sprite animations
  useEffect(() => {
    const spriteInterval = setInterval(() => {
      const moods: ('idle' | 'happy' | 'waving')[] = ['idle', 'happy', 'waving'];
      setMascotMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 5000);
    
    return () => clearInterval(spriteInterval);
  }, []);

  // Testimonials
  const testimonials = [
    { name: 'Sarah J.', role: 'Student', content: 'ZUNA made saving fun!', avatar: '👩‍🎓' },
    { name: 'Mike T.', role: 'Freelancer', content: 'The AI coach is amazing!', avatar: '👨‍💻' },
    { name: 'Emma L.', role: 'Professional', content: 'Love the monthly games!', avatar: '👩‍💼' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <PixelBackground isDarkMode={isDarkMode}>
      {/* Day/Night Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-3 rounded-lg transition-all"
          style={{
            backgroundColor: isDarkMode ? '#1a1f3a' : '#87CEEB',
            border: '4px solid',
            borderColor: isDarkMode ? '#667eea' : '#4A90E2',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
            imageRendering: 'pixelated'
          }}
        >
          <span className="text-2xl">{isDarkMode ? '🌙' : '☀️'}</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen pb-24">
        {/* Navigation */}
        <nav className="px-6 py-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#4CAF50',
                border: '4px solid #2E7D32',
                borderRadius: '8px',
                imageRendering: 'pixelated'
              }} />
              <span className={`text-2xl font-bold ${pixelFont.className}`} style={{
                color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                textShadow: isDarkMode ? '2px 2px 0 rgba(0,0,0,0.5)' : '2px 2px 0 rgba(255,255,255,0.5)'
              }}>
                ZUNA
              </span>
            </div>
            
            <div className="flex gap-4">
              <Link href="/features" className="px-4 py-2" style={{
                fontFamily: pixelFont.style.fontFamily,
                color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                backgroundColor: isDarkMode ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255,255,255,0.8)',
                border: '2px solid',
                borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                imageRendering: 'pixelated'
              }}>
                Features
              </Link>
              <Link href="/pricing" className="px-4 py-2" style={{
                fontFamily: pixelFont.style.fontFamily,
                color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                backgroundColor: isDarkMode ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255,255,255,0.8)',
                border: '2px solid',
                borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                imageRendering: 'pixelated'
              }}>
                Pricing
              </Link>
              <Link href="/signin" className="px-4 py-2" style={{
                fontFamily: pixelFont.style.fontFamily,
                color: '#FFFFFF',
                backgroundColor: '#4CAF50',
                border: '2px solid #2E7D32',
                boxShadow: '2px 2px 0 rgba(0,0,0,0.3)',
                imageRendering: 'pixelated'
              }}>
                Sign In
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{
                fontFamily: pixelFont.style.fontFamily,
                color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                textShadow: isDarkMode ? '3px 3px 0 rgba(102, 126, 234, 0.5)' : '3px 3px 0 rgba(74, 144, 226, 0.3)',
                letterSpacing: '0.05em'
              }}>
                Financial Wellness
                <br />
                <span style={{ 
                  color: '#4CAF50',
                  textShadow: '3px 3px 0 rgba(46, 125, 50, 0.5)'
                }}>
                  Made Fun
                </span>
              </h1>
              
              <p className="text-xl mb-8" style={{
                fontFamily: pixelFont.style.fontFamily,
                color: isDarkMode ? '#E0E0E0' : '#333333',
                lineHeight: '1.6'
              }}>
                Save money, play games, and watch your digital pet thrive!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="px-8 py-4 text-center" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  color: '#FFFFFF',
                  backgroundColor: '#4CAF50',
                  border: '4px solid #2E7D32',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                  imageRendering: 'pixelated',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  Start Free Trial
                </Link>
                <Link href="/features" className="px-8 py-4 text-center" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                  backgroundColor: isDarkMode ? 'rgba(102, 126, 234, 0.5)' : 'rgba(255,255,255,0.9)',
                  border: '4px solid',
                  borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                  imageRendering: 'pixelated',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}>
                  Learn More
                </Link>
              </div>
            </div>

            {/* Mascot */}
            <div className="flex justify-center">
              <div className="relative p-8 rounded-xl" style={{
                backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.8)' : 'rgba(255,255,255,0.9)',
                border: '4px solid',
                borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                boxShadow: isDarkMode ? '0 0 30px rgba(102, 126, 234, 0.3)' : '8px 8px 0 rgba(0,0,0,0.2)',
                imageRendering: 'pixelated'
              }}>
                <div style={{ 
                  width: '256px', 
                  height: '256px', 
                  position: 'relative',
                  filter: 'none', // Preserve original sprite colors
                  mixBlendMode: 'normal' // Don't blend with background
                }}>
                  <Image
                    src={`/sprites/${mascotMood === 'idle' ? 'idleblink' : mascotMood}.webp`}
                    alt="ZUNA Mascot"
                    width={256}
                    height={256}
                    style={{ 
                      imageRendering: 'pixelated',
                      imageRendering: '-moz-crisp-edges' as any,
                      imageRendering: 'crisp-edges' as any,
                      filter: 'none' // Keep original colors
                    }}
                    unoptimized
                  />
                </div>
                <div className="text-center mt-4">
                  <div className="inline-block px-4 py-2" style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '14px',
                    color: '#FFFFFF',
                    backgroundColor: isDarkMode ? '#667eea' : '#4A90E2',
                    border: '2px solid',
                    borderColor: isDarkMode ? '#4A5FC1' : '#357ABD',
                    imageRendering: 'pixelated'
                  }}>
                    Hi Friend! 👋
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center mb-12" style={{
            fontFamily: pixelFont.style.fontFamily,
            color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
            textShadow: isDarkMode ? '2px 2px 0 rgba(102, 126, 234, 0.5)' : '2px 2px 0 rgba(74, 144, 226, 0.3)'
          }}>
            Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🏦', title: 'Smart Banking', desc: 'Connect your accounts securely' },
              { icon: '🎮', title: 'Fun Games', desc: 'Play and win real prizes' },
              { icon: '🐾', title: 'Digital Pet', desc: 'Watch your buddy grow' },
              { icon: '🤖', title: 'AI Coach', desc: 'Get personalized advice' },
              { icon: '💰', title: 'Savings Pots', desc: 'Organize your goals' },
              { icon: '🪙', title: 'Crypto', desc: 'Earn ZUNA tokens' }
            ].map((feature, index) => (
              <div key={index} className="p-6 text-center" style={{
                backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.8)' : 'rgba(255,255,255,0.9)',
                border: '4px solid',
                borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
                imageRendering: 'pixelated'
              }}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  color: isDarkMode ? '#FFFFFF' : '#1a1a1a'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '14px',
                  color: isDarkMode ? '#B0B0B0' : '#666666'
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center mb-12" style={{
            fontFamily: pixelFont.style.fontFamily,
            color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
            textShadow: isDarkMode ? '2px 2px 0 rgba(102, 126, 234, 0.5)' : '2px 2px 0 rgba(74, 144, 226, 0.3)'
          }}>
            What Users Say
          </h2>

          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 text-center"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.8)' : 'rgba(255,255,255,0.9)',
                  border: '4px solid',
                  borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
                  imageRendering: 'pixelated'
                }}
              >
                <div className="text-5xl mb-4">{testimonials[currentTestimonial].avatar}</div>
                <p className="text-xl mb-4" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  color: isDarkMode ? '#FFFFFF' : '#1a1a1a'
                }}>
                  "{testimonials[currentTestimonial].content}"
                </p>
                <p className="font-bold" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  color: isDarkMode ? '#B0B0B0' : '#666666'
                }}>
                  {testimonials[currentTestimonial].name} - {testimonials[currentTestimonial].role}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold mb-8" style={{
            fontFamily: pixelFont.style.fontFamily,
            color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
            textShadow: isDarkMode ? '3px 3px 0 rgba(102, 126, 234, 0.5)' : '3px 3px 0 rgba(74, 144, 226, 0.3)'
          }}>
            Ready to Start?
          </h2>
          
          <Link href="/signup" className="inline-block px-12 py-5" style={{
            fontFamily: pixelFont.style.fontFamily,
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#FFFFFF',
            backgroundColor: '#4CAF50',
            border: '4px solid #2E7D32',
            boxShadow: '6px 6px 0 rgba(0,0,0,0.3)',
            imageRendering: 'pixelated'
          }}>
            Get Started Free
          </Link>
          
          <p className="mt-6" style={{
            fontFamily: pixelFont.style.fontFamily,
            fontSize: '14px',
            color: isDarkMode ? '#B0B0B0' : '#666666'
          }}>
            No credit card required • 30-day free trial
          </p>
        </section>
      </div>

      {/* Grassy Bottom */}
      <GrassyBottom />
    </PixelBackground>
  );
}