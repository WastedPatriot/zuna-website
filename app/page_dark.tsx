'use client';

// ZUNA Financial Wellness Platform - Dark Starry Theme Matching Mobile App
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import SpriteAnimation from './components/SpriteAnimation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DarkStarryBackground from './components/DarkStarryBackground';

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
    <DarkStarryBackground>
      <Navbar />
      
      {/* Hero Section - Dark Starry Theme Matching Mobile App */}
      <section className="relative overflow-hidden pt-24 pb-20">
        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
                textShadow: '0 0 20px rgba(102, 126, 234, 0.5), 2px 2px 0 rgba(0,0,0,0.5)'
              }}>
                Financial Wellness
                <br />
                <span className="text-green-400" style={{ textShadow: '0 0 20px rgba(34, 197, 94, 0.8)' }}>Made Fun</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8" style={{
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
                <Link href="/features" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 text-center transition-colors" style={{
                  fontFamily: 'monospace',
                  border: '4px solid rgba(102, 126, 234, 0.3)',
                  boxShadow: '4px 4px 0 rgba(102, 126, 234, 0.2)'
                }}>
                  See How It Works
                </Link>
              </div>
              <p className="mt-6 text-sm text-gray-300" style={{ fontFamily: 'monospace' }}>
                ✓ No credit card required &nbsp; ✓ 30-day free trial &nbsp; ✓ Cancel anytime
              </p>
            </div>
            
            {/* Mascot Display */}
            <div className="flex justify-center">
              <div className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl" style={{
                border: '4px solid rgba(102, 126, 234, 0.5)',
                boxShadow: '0 0 30px rgba(102, 126, 234, 0.3)'
              }}>
                <SpriteAnimation
                  sprite={`/sprites/${mascotMood === 'idle' ? 'idleblink' : mascotMood}.webp`}
                  frames={mascotMood === 'idle' ? 2 : 4}
                  frameRate={200}
                  size={256}
                  alt="Zuna Mascot"
                />
                <div className="text-center mt-4">
                  <div className="bg-purple-900/80 text-white px-4 py-2 inline-block text-sm" style={{
                    fontFamily: 'monospace',
                    border: '2px solid rgba(102, 126, 234, 0.5)',
                    boxShadow: '0 0 10px rgba(102, 126, 234, 0.3)'
                  }}>
                    Hi Friend! 👋
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8" style={{ backgroundColor: 'rgba(26, 31, 58, 0.7)' }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-300">
            <div className="flex items-center gap-2" style={{ fontFamily: 'monospace' }}>
              <span className="text-2xl">🔒</span>
              <span>Bank-level Security</span>
            </div>
            <div className="flex items-center gap-2" style={{ fontFamily: 'monospace' }}>
              <span className="text-2xl">🏆</span>
              <span>50,000+ Users</span>
            </div>
            <div className="flex items-center gap-2" style={{ fontFamily: 'monospace' }}>
              <span className="text-2xl">⭐</span>
              <span>4.8/5 Rating</span>
            </div>
            <div className="flex items-center gap-2" style={{ fontFamily: 'monospace' }}>
              <span className="text-2xl">💷</span>
              <span>£2M+ Saved</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4" style={{
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            textShadow: '0 0 10px rgba(102, 126, 234, 0.5)'
          }}>
            Everything You Need
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto" style={{ fontFamily: 'monospace' }}>
            ZUNA combines behavioral psychology, gamification, and AI to make saving money addictively fun.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature Cards */}
          {[
            { icon: '🏦', title: 'Smart Banking', desc: 'Connect your bank accounts securely with Open Banking. Track spending, set goals, and automate savings.' },
            { icon: '🎮', title: 'Monthly Games', desc: 'Compete in monthly challenges, play mini-games, and win real cash prizes up to £1,000.' },
            { icon: '🐾', title: 'Digital Pet', desc: 'Your ZUNA pet grows happier as you save. Watch it evolve and unlock new features!' },
            { icon: '🤖', title: 'AI Coach', desc: 'Get personalized financial advice from our AI coach. Learn to budget, invest, and save smarter.' },
            { icon: '💰', title: 'Savings Pots', desc: 'Create themed savings pots for your goals. Watch them grow with visual progress tracking.' },
            { icon: '🪙', title: 'Crypto Wallet', desc: 'Buy, sell, and earn ZUNA tokens. Convert savings achievements into cryptocurrency rewards.' }
          ].map((feature, index) => (
            <div key={index} className="bg-black/40 backdrop-blur-sm p-8 text-center" style={{
              border: '4px solid rgba(102, 126, 234, 0.3)',
              boxShadow: '0 0 20px rgba(102, 126, 234, 0.2)',
              borderRadius: '16px'
            }}>
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3" style={{ 
                fontFamily: 'monospace',
                textShadow: '0 0 5px rgba(102, 126, 234, 0.5)'
              }}>
                {feature.title}
              </h3>
              <p className="text-gray-300 mb-4" style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                {feature.desc}
              </p>
              <Link href="/features" className="text-green-400 hover:text-green-300 text-sm" style={{ fontFamily: 'monospace' }}>
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20" style={{ backgroundColor: 'rgba(26, 31, 58, 0.5)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4" style={{
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
              textShadow: '0 0 10px rgba(102, 126, 234, 0.5)'
            }}>
              How It Works
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto" style={{ fontFamily: 'monospace' }}>
              Get started in minutes and watch your savings grow
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Sign Up', desc: 'Create your account in 60 seconds. No credit card needed.' },
              { step: '02', title: 'Connect Bank', desc: 'Securely link your bank with Open Banking technology.' },
              { step: '03', title: 'Set Goals', desc: 'Choose savings goals and meet your digital pet companion.' },
              { step: '04', title: 'Save & Play', desc: 'Save money, play games, and watch your pet thrive!' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{
                  fontFamily: 'monospace',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)'
                }}>
                  {item.step}
                </div>
                <h3 className="font-bold text-white mb-2" style={{ fontFamily: 'monospace' }}>{item.title}</h3>
                <p className="text-gray-300 text-sm" style={{ fontFamily: 'monospace' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4" style={{
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            textShadow: '0 0 10px rgba(102, 126, 234, 0.5)'
          }}>
            Loved by Users
          </h2>
          <p className="text-lg text-gray-300" style={{ fontFamily: 'monospace' }}>
            See what our community says about ZUNA
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-black/40 backdrop-blur-sm p-8 text-center"
              style={{
                border: '4px solid rgba(102, 126, 234, 0.3)',
                borderRadius: '16px',
                boxShadow: '0 0 30px rgba(102, 126, 234, 0.2)'
              }}
            >
              <div className="text-6xl mb-4">{testimonials[currentTestimonial].avatar}</div>
              <p className="text-xl text-gray-200 mb-6 italic" style={{ fontFamily: 'monospace' }}>
                "{testimonials[currentTestimonial].content}"
              </p>
              <div>
                <p className="font-bold text-white" style={{ fontFamily: 'monospace' }}>
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-gray-400 text-sm" style={{ fontFamily: 'monospace' }}>
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-green-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: 'rgba(26, 31, 58, 0.7)' }}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4" style={{
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            textShadow: '0 0 20px rgba(102, 126, 234, 0.5)'
          }}>
            Start Your Financial Journey Today
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'monospace' }}>
            Join thousands of users who are already saving smarter and having fun with ZUNA
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 transition-colors" style={{
              fontFamily: 'monospace',
              border: '4px solid rgba(0,0,0,0.2)',
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
            }}>
              Get Started Free
            </Link>
            <Link href="/pricing" className="bg-transparent hover:bg-purple-600/20 text-white font-bold py-4 px-10 transition-colors" style={{
              fontFamily: 'monospace',
              border: '4px solid rgba(102, 126, 234, 0.5)',
              boxShadow: '0 0 10px rgba(102, 126, 234, 0.3)'
            }}>
              View Pricing
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400" style={{ fontFamily: 'monospace' }}>
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </DarkStarryBackground>
  );
}
