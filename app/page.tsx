'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import CloudBackground from './components/CloudBackground';
import SpriteAnimation from './components/SpriteAnimation';
// import { useUser } from '@auth0/nextjs-auth0'; // Will be configured with Auth0Provider

export default function Home() {
  const [activeTab, setActiveTab] = useState('features');
  const [mascotMood, setMascotMood] = useState<'happy' | 'gaming'>('happy');
  // const { user, error, isLoading } = useUser(); // Will be configured with Auth0Provider
  const user = null;
  const isLoading = false;

  useEffect(() => {
    const interval = setInterval(() => {
      const moods: ('happy' | 'gaming')[] = ['happy', 'gaming'];
      setMascotMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-200 relative overflow-hidden">
      <CloudBackground />
      
      {/* Header */}
      <header className="relative z-50 px-4 py-4">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center pixel-corners">
                <span className="text-white font-bold text-xl pixel-font">Z</span>
              </div>
              <span className="text-2xl font-bold text-gray-800 pixel-font">ZUNA</span>
            </Link>
            
            <div className="hidden md:flex gap-6">
              <Link href="#game" className="text-gray-700 hover:text-green-600 transition-colors pixel-font">
                Game
              </Link>
              <Link href="#features" className="text-gray-700 hover:text-green-600 transition-colors pixel-font">
                Features
              </Link>
              <Link href="#tokenomics" className="text-gray-700 hover:text-green-600 transition-colors pixel-font">
                Tokenomics
              </Link>
              <Link href="#community" className="text-gray-700 hover:text-green-600 transition-colors pixel-font">
                Community
              </Link>
            </div>
          </div>
          
          <div className="flex gap-4">
            {!isLoading && !user ? (
              <>
                <Link href="/api/auth/login" className="px-4 py-2 text-gray-700 hover:text-green-600 transition-colors pixel-font">
                  Login
                </Link>
                <Link href="/api/auth/signup" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 pixel-corners pixel-font">
                  Play Now
                </Link>
              </>
            ) : (
              <Link href="/app" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 pixel-corners pixel-font">
                Launch App
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-40 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 pixel-font">
                YOUR DIGITAL<br />
                <span className="text-green-600">FINANCIAL PET</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 pixel-font">
                Take care of your money, take care of your pet. 
                Watch them both grow together!
              </p>
              
              <div className="flex gap-4 mb-8">
                <Link href="/api/auth/signup" className="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 pixel-corners text-lg font-bold pixel-font">
                  START NOW
                </Link>
                <button className="px-8 py-4 border-2 border-gray-700 text-gray-700 rounded-lg hover:bg-gray-100 transition-all pixel-corners text-lg font-bold pixel-font">
                  LEARN MORE
                </button>
              </div>
              
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 pixel-font">100K+</div>
                  <div className="text-sm text-gray-600 pixel-font">Active Players</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 pixel-font">$5M+</div>
                  <div className="text-sm text-gray-600 pixel-font">Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 pixel-font">50K+</div>
                  <div className="text-sm text-gray-600 pixel-font">ZUNA Earned</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-900 rounded-2xl p-4 pixel-corners border-4 border-gray-800">
                <div className="bg-sky-200 rounded-lg p-8 relative overflow-hidden" style={{ minHeight: '400px' }}>
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-green-100 opacity-50" />
                  
                  {/* Animated Mascot */}
                  <div className="relative z-10 flex justify-center items-center h-full">
                    <SpriteAnimation sprite={mascotMood} size={200} />
                  </div>
                  
                  {/* Stats overlay */}
                  <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-2 rounded pixel-corners">
                    <div className="text-xs pixel-font">HAPPY</div>
                    <div className="w-24 h-2 bg-gray-700 rounded-full mt-1">
                      <div className="w-20 h-2 bg-green-400 rounded-full" />
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-2 rounded pixel-corners">
                    <div className="text-xs pixel-font">HUNGER</div>
                    <div className="w-24 h-2 bg-gray-700 rounded-full mt-1">
                      <div className="w-16 h-2 bg-yellow-400 rounded-full" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-2 rounded pixel-corners">
                    <div className="text-xs pixel-font">ENERGY</div>
                    <div className="w-24 h-2 bg-gray-700 rounded-full mt-1">
                      <div className="w-18 h-2 bg-blue-400 rounded-full" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-2 rounded pixel-corners">
                    <div className="text-xs pixel-font">83% FED</div>
                    <div className="text-xs pixel-font">76% HAPPY</div>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 py-2 bg-green-500 text-white rounded pixel-corners hover:bg-green-600 transition-colors pixel-font">
                    FEED
                  </button>
                  <button className="flex-1 py-2 bg-blue-500 text-white rounded pixel-corners hover:bg-blue-600 transition-colors pixel-font">
                    PLAY
                  </button>
                  <button className="flex-1 py-2 bg-purple-500 text-white rounded pixel-corners hover:bg-purple-600 transition-colors pixel-font">
                    SLEEP
                  </button>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg transform rotate-3 pixel-corners">
                <span className="font-bold pixel-font">ZUNA DIGITAL PET v1.0</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Tabs */}
      <section className="relative z-30 px-4 py-16 bg-white/90">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 pixel-font">
              A huge, pixel art banking app.
            </h2>
            <h3 className="text-2xl text-green-600 pixel-font">
              Jump in, save up, level up
            </h3>
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            {['features', 'games', 'banking', 'crypto'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg transition-all pixel-corners pixel-font ${
                  activeTab === tab
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-100 rounded-2xl p-8 pixel-corners"
            >
              {activeTab === 'features' && (
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg pixel-corners">
                    <div className="w-16 h-16 bg-green-500 rounded-lg mb-4 flex items-center justify-center pixel-corners">
                      <span className="text-2xl">🎮</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2 pixel-font">Play to Earn</h4>
                    <p className="text-gray-600 pixel-font">
                      Earn ZUNA tokens by playing Tetris, caring for your pet, and completing challenges.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg pixel-corners">
                    <div className="w-16 h-16 bg-blue-500 rounded-lg mb-4 flex items-center justify-center pixel-corners">
                      <span className="text-2xl">💰</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2 pixel-font">Smart Savings</h4>
                    <p className="text-gray-600 pixel-font">
                      Set savings goals and watch your pet grow happier as you save more money.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg pixel-corners">
                    <div className="w-16 h-16 bg-purple-500 rounded-lg mb-4 flex items-center justify-center pixel-corners">
                      <span className="text-2xl">🤖</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2 pixel-font">AI Coach</h4>
                    <p className="text-gray-600 pixel-font">
                      Get personalized financial advice from our AI-powered coach (Premium).
                    </p>
                  </div>
                </div>
              )}
              
              {activeTab === 'games' && (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 pixel-font">Tetris Championship</h3>
                  <p className="text-gray-600 mb-6 pixel-font">
                    Compete for the highest score and earn ZUNA tokens!
                  </p>
                  <div className="bg-gray-900 text-green-400 p-6 rounded-lg inline-block pixel-corners">
                    <div className="grid grid-cols-3 gap-8 text-left pixel-font">
                      <div>
                        <div className="text-xs text-gray-500">DAILY PRIZE</div>
                        <div className="text-2xl font-bold">500 ZUNA</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">WEEKLY PRIZE</div>
                        <div className="text-2xl font-bold">5,000 ZUNA</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">FREE GAMES</div>
                        <div className="text-2xl font-bold">2 PER DAY</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'banking' && (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 pixel-font">Real Banking Features</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <span className="text-green-500">✓</span>
                        <span className="pixel-font">Send & receive money instantly</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-green-500">✓</span>
                        <span className="pixel-font">Track spending with categories</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-green-500">✓</span>
                        <span className="pixel-font">Set up savings pots</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-green-500">✓</span>
                        <span className="pixel-font">Bill reminders & automation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-green-400 to-blue-500 p-8 rounded-lg text-white pixel-corners">
                    <div className="text-3xl font-bold mb-2 pixel-font">£2,450.00</div>
                    <div className="text-sm opacity-80 pixel-font">Current Balance</div>
                  </div>
                </div>
              )}
              
              {activeTab === 'crypto' && (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 pixel-font">ZUNA Token Economy</h3>
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-white p-4 rounded-lg pixel-corners">
                      <div className="text-sm text-gray-500 pixel-font">EARN</div>
                      <div className="text-lg font-bold pixel-font">Play games, care for pet, save money</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg pixel-corners">
                      <div className="text-sm text-gray-500 pixel-font">SPEND</div>
                      <div className="text-lg font-bold pixel-font">Cosmetics, power-ups, prizes</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg pixel-corners">
                      <div className="text-sm text-gray-500 pixel-font">TRADE</div>
                      <div className="text-lg font-bold pixel-font">Coming soon: DEX integration</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>



      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white px-4 py-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4 pixel-font">ZUNA</h3>
            <p className="text-sm text-gray-400 pixel-font">
              Your digital financial pet. Banking reimagined.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 pixel-font">Game</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white pixel-font">Play Tetris</Link></li>
              <li><Link href="#" className="hover:text-white pixel-font">Pet Care</Link></li>
              <li><Link href="#" className="hover:text-white pixel-font">Leaderboards</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 pixel-font">Community</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white pixel-font">Discord</Link></li>
              <li><Link href="#" className="hover:text-white pixel-font">Twitter</Link></li>
              <li><Link href="#" className="hover:text-white pixel-font">Reddit</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 pixel-font">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-white pixel-font">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white pixel-font">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white pixel-font">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400 pixel-font">
            © 2024 Zuna. All rights reserved. Built with love and pixels.
          </p>
        </div>
      </footer>
    </div>
  );
}