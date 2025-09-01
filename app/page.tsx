'use client';

// ZUNA Financial Wellness Platform - Pomegranate.Health-inspired layout with Pixel Theme
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import SpriteAnimation from './components/SpriteAnimation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function Home() {
  const [mascotMood, setMascotMood] = useState<'idle' | 'happy' | 'waving'>('idle');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Change sprite animations
  useEffect(() => {
    const spriteInterval = setInterval(() => {
      const moods: ('idle' | 'happy' | 'waving')[] = ['idle', 'happy', 'waving'];
      setMascotMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 5000);
    
    return () => clearInterval(spriteInterval);
  }, []);

  // Testimonials data
  const testimonials = [
    {
      name: 'Sarah J.',
      role: 'University Student',
      content: 'ZUNA made saving fun! My digital pet keeps me motivated to save more each month.',
      avatar: '👩‍🎓'
    },
    {
      name: 'Mike T.',
      role: 'Freelancer',
      content: 'The AI coach helped me understand my spending patterns. Game changer!',
      avatar: '👨‍💻'
    },
    {
      name: 'Emma L.',
      role: 'Young Professional',
      content: 'Love the monthly games! Won £50 last month just for saving regularly.',
      avatar: '👩‍💼'
    }
  ];

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(testimonialInterval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section with Animated Background */}
      <section className="relative bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 overflow-hidden pt-24 pb-20">
        {/* Animated Pixel Clouds */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
                textShadow: '3px 3px 0 rgba(0,0,0,0.3)'
              }}>
                Financial Wellness Made Fun
              </h1>
              <p className="text-xl text-white mb-8" style={{
                fontFamily: 'monospace',
                lineHeight: '1.6'
              }}>
                Save money, play games, and watch your digital pet thrive. Join thousands building better financial habits with ZUNA.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 text-center transition-colors" style={{
                  fontFamily: 'monospace',
                  border: '4px solid rgba(0,0,0,0.2)',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.2)'
                }}>
                  Start Free Trial
                </Link>
                <Link href="/features" className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-8 text-center transition-colors" style={{
                  fontFamily: 'monospace',
                  border: '4px solid #1a1a1a',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.2)'
                }}>
                  See How It Works
                </Link>
              </div>
              <p className="mt-6 text-sm text-white/90" style={{ fontFamily: 'monospace' }}>
                ✓ No credit card required &nbsp; ✓ 30-day free trial &nbsp; ✓ Cancel anytime
              </p>
            </div>
            
            {/* Mascot Display */}
            <div className="flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl" style={{
                border: '4px solid #1a1a1a',
                boxShadow: '8px 8px 0 rgba(0,0,0,0.3)'
              }}>
                <SpriteAnimation
                  sprite={`/sprites/${mascotMood === 'idle' ? 'idleblink' : mascotMood}.webp`}
                  frames={mascotMood === 'idle' ? 2 : 4}
                  frameRate={200}
                  size={256}
                  alt="Zuna Mascot"
                />
                <div className="text-center mt-4">
                  <div className="bg-gray-900 text-white px-4 py-2 inline-block text-sm" style={{
                    fontFamily: 'monospace',
                    border: '2px solid #333',
                    boxShadow: '2px 2px 0 rgba(0,0,0,0.3)'
                  }}>
                    {mascotMood === 'idle' && "Hi! I'm ZUNA 👋"}
                    {mascotMood === 'waving' && "Ready to save? 💰"}
                    {mascotMood === 'happy' && "Let's grow together! 🌱"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white border-y-4 border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2" style={{ fontFamily: 'monospace' }}>
              <span className="text-2xl">🔒</span>
              <span className="text-sm">Bank-Level Security</span>
            </div>
            <div className="flex items-center gap-2" style={{ fontFamily: 'monospace' }}>
              <span className="text-2xl">🏆</span>
              <span className="text-sm">50,000+ Happy Savers</span>
            </div>
            <div className="flex items-center gap-2" style={{ fontFamily: 'monospace' }}>
              <span className="text-2xl">⭐</span>
              <span className="text-sm">4.9/5 App Store Rating</span>
            </div>
            <div className="flex items-center gap-2" style={{ fontFamily: 'monospace' }}>
              <span className="text-2xl">🎮</span>
              <span className="text-sm">£500K+ in Prizes Given</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{
              fontFamily: 'monospace',
              letterSpacing: '0.05em'
            }}>
              Everything You Need to Save Smarter
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'monospace' }}>
              ZUNA combines behavioral psychology, gamification, and AI to make saving money addictively fun.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 text-center" style={{
              border: '4px solid #1a1a1a',
              boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
            }}>
              <div className="text-5xl mb-4">🏦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'monospace' }}>
                Smart Banking
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                Connect your bank accounts securely with Open Banking. Track spending, set goals, and automate savings.
              </p>
              <Link href="/features#banking" className="text-green-600 hover:text-green-700 font-bold text-sm" style={{ fontFamily: 'monospace' }}>
                Learn More →
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 text-center" style={{
              border: '4px solid #1a1a1a',
              boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
            }}>
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'monospace' }}>
                Monthly Games
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                Compete in monthly challenges, play mini-games, and win real cash prizes up to £1,000.
              </p>
              <Link href="/features#games" className="text-green-600 hover:text-green-700 font-bold text-sm" style={{ fontFamily: 'monospace' }}>
                Learn More →
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 text-center" style={{
              border: '4px solid #1a1a1a',
              boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
            }}>
              <div className="text-5xl mb-4">🐾</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'monospace' }}>
                Digital Pet
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                Your ZUNA pet grows happier as you save. Watch it evolve and unlock new features!
              </p>
              <Link href="/features#pet" className="text-green-600 hover:text-green-700 font-bold text-sm" style={{ fontFamily: 'monospace' }}>
                Learn More →
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 text-center" style={{
              border: '4px solid #1a1a1a',
              boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
            }}>
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'monospace' }}>
                AI Coach
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                Get personalized financial advice from our AI coach. Learn to budget, invest, and save smarter.
              </p>
              <Link href="/features#coach" className="text-green-600 hover:text-green-700 font-bold text-sm" style={{ fontFamily: 'monospace' }}>
                Learn More →
              </Link>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 text-center" style={{
              border: '4px solid #1a1a1a',
              boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
            }}>
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'monospace' }}>
                Savings Pots
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                Create themed savings pots for your goals. Watch them grow with visual progress tracking.
              </p>
              <Link href="/features#pots" className="text-green-600 hover:text-green-700 font-bold text-sm" style={{ fontFamily: 'monospace' }}>
                Learn More →
              </Link>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 text-center" style={{
              border: '4px solid #1a1a1a',
              boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
            }}>
              <div className="text-5xl mb-4">🪙</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'monospace' }}>
                Crypto Wallet
              </h3>
              <p className="text-gray-600 mb-4" style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                Buy, sell, and earn ZUNA tokens. Convert savings achievements into cryptocurrency rewards.
              </p>
              <Link href="/features#crypto" className="text-green-600 hover:text-green-700 font-bold text-sm" style={{ fontFamily: 'monospace' }}>
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-sky-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{
              fontFamily: 'monospace',
              letterSpacing: '0.05em'
            }}>
              How ZUNA Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'monospace' }}>
              Get started in minutes and watch your savings grow
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center" style={{
                border: '4px solid #1a1a1a',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.2)'
              }}>
                <span className="text-white text-2xl font-bold" style={{ fontFamily: 'monospace' }}>1</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'monospace' }}>Sign Up</h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'monospace' }}>
                Create your account in 60 seconds. No credit card needed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center" style={{
                border: '4px solid #1a1a1a',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.2)'
              }}>
                <span className="text-white text-2xl font-bold" style={{ fontFamily: 'monospace' }}>2</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'monospace' }}>Connect Bank</h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'monospace' }}>
                Securely link your bank with Open Banking technology.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center" style={{
                border: '4px solid #1a1a1a',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.2)'
              }}>
                <span className="text-white text-2xl font-bold" style={{ fontFamily: 'monospace' }}>3</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'monospace' }}>Set Goals</h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'monospace' }}>
                Choose savings goals and meet your digital pet companion.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-yellow-500 rounded-full flex items-center justify-center" style={{
                border: '4px solid #1a1a1a',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.2)'
              }}>
                <span className="text-white text-2xl font-bold" style={{ fontFamily: 'monospace' }}>4</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'monospace' }}>Save & Play</h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'monospace' }}>
                Save money, play games, and watch your pet thrive!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{
              fontFamily: 'monospace',
              letterSpacing: '0.05em'
            }}>
              Loved by Thousands of Savers
            </h2>
            <p className="text-lg text-gray-600" style={{ fontFamily: 'monospace' }}>
              See what our community says about ZUNA
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 text-center"
                style={{
                  border: '4px solid #1a1a1a',
                  boxShadow: '8px 8px 0 rgba(0,0,0,0.1)'
                }}
              >
                <div className="text-6xl mb-4">{testimonials[currentTestimonial].avatar}</div>
                <p className="text-xl text-gray-700 mb-6 italic" style={{ fontFamily: 'monospace' }}>
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div>
                  <p className="font-bold text-gray-900" style={{ fontFamily: 'monospace' }}>
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-gray-600 text-sm" style={{ fontFamily: 'monospace' }}>
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  style={{
                    border: '2px solid #1a1a1a'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-400 to-blue-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)',
            imageRendering: 'pixelated'
          }} />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            textShadow: '3px 3px 0 rgba(0,0,0,0.2)'
          }}>
            Ready to Transform Your Finances?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'monospace' }}>
            Join 50,000+ people who are saving smarter and having fun doing it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-10 transition-colors" style={{
              fontFamily: 'monospace',
              border: '4px solid #1a1a1a',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.3)'
            }}>
              Start Your Free Trial
            </Link>
            <Link href="/pricing" className="bg-transparent hover:bg-white/10 text-white font-bold py-4 px-10 transition-colors" style={{
              fontFamily: 'monospace',
              border: '4px solid white',
              boxShadow: '4px 4px 0 rgba(255,255,255,0.3)'
            }}>
              View Pricing
            </Link>
          </div>
          <p className="mt-6 text-white/90 text-sm" style={{ fontFamily: 'monospace' }}>
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}