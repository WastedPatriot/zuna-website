'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [mascotMood, setMascotMood] = useState<'idle' | 'happy' | 'gaming'>('idle');
  
  useEffect(() => {
    const interval = setInterval(() => {
      const moods: ('idle' | 'happy' | 'gaming')[] = ['idle', 'happy', 'gaming'];
      setMascotMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-200 relative overflow-hidden">
      {/* Animated Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-[-100px] w-[200px] h-[60px] bg-white rounded-full opacity-70"
          animate={{
            x: [0, typeof window !== 'undefined' ? window.innerWidth + 200 : 2120],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            boxShadow: '0 0 20px rgba(255,255,255,0.5)',
          }}
        />
        
        <motion.div
          className="absolute top-32 left-[-150px] w-[250px] h-[80px] bg-white rounded-full opacity-60"
          animate={{
            x: [0, typeof window !== 'undefined' ? window.innerWidth + 250 : 2170],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
            delay: 10,
          }}
          style={{
            boxShadow: '0 0 25px rgba(255,255,255,0.4)',
          }}
        />
        
        <motion.div
          className="absolute top-64 left-[-120px] w-[180px] h-[55px] bg-white rounded-full opacity-65"
          animate={{
            x: [0, typeof window !== 'undefined' ? window.innerWidth + 180 : 2100],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear",
            delay: 20,
          }}
          style={{
            boxShadow: '0 0 15px rgba(255,255,255,0.3)',
          }}
        />
      </div>
      
      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 pixel-text drop-shadow-2xl">
            ZUNA
          </h1>
          <p className="text-xl md:text-2xl text-white pixel-text drop-shadow-lg">
            YOUR DIGITAL FINANCIAL PET
          </p>
        </motion.header>

        {/* Hero Section with Tamagotchi */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-8 pixel-border shadow-2xl"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 pixel-text text-gray-900">
                Save Money, Grow Your Pet
              </h2>
              <p className="text-lg md:text-xl mb-8 pixel-text text-gray-700 leading-relaxed">
                Your pet's happiness is tied to your savings goals. 
                The more you save, the happier it becomes!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl pixel-border pixel-text shadow-xl text-lg"
                  >
                    START SAVING
                  </motion.button>
                </Link>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl pixel-border pixel-text shadow-xl text-lg"
                >
                  LEARN MORE
                </motion.button>
              </div>
            </div>
            
            {/* Tamagotchi Display */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8 pixel-border shadow-inner">
                <div className="text-center mb-6">
                  <div className="text-xl pixel-text font-bold text-purple-600 mb-2">
                    YOUR FINANCIAL FRIEND
                  </div>
                  <div className="text-sm pixel-text text-gray-600">
                    Meet your digital pet companion
                  </div>
                </div>
                
                {/* Animated Tamagotchi */}
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative h-48 flex justify-center items-center bg-gradient-to-b from-sky-200 to-green-200 rounded-2xl border-4 border-gray-800"
                >
                  {/* Sprite placeholder - will use actual sprites */}
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-6xl pixel-border shadow-lg">
                    {mascotMood === 'idle' && '🐾'}
                    {mascotMood === 'happy' && '😊'}
                    {mascotMood === 'gaming' && '🎮'}
                  </div>
                </motion.div>
                
                <div className="text-center mt-6">
                  <div className="pixel-text text-sm text-gray-700 bg-gray-800 text-white px-4 py-2 rounded-lg inline-block">
                    {mascotMood === 'idle' && "Waiting for you..."}
                    {mascotMood === 'happy' && "Feeling great!"}
                    {mascotMood === 'gaming' && "Ready to play!"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-8 pixel-border shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 pixel-text text-center text-gray-900">
            HOW ZUNA WORKS
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-2xl pixel-border"
            >
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-4 pixel-text text-gray-900">SET GOALS</h3>
              <p className="pixel-text text-sm text-gray-700 leading-relaxed">
                Create savings pots for your dreams - vacation, car, emergency fund
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-b from-green-50 to-green-100 rounded-2xl pixel-border"
            >
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-xl font-bold mb-4 pixel-text text-gray-900">SAVE & GROW</h3>
              <p className="pixel-text text-sm text-gray-700 leading-relaxed">
                Every dollar saved makes your pet happier and earns you ZUNA tokens
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl pixel-border"
            >
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-4 pixel-text text-gray-900">PLAY & EARN</h3>
              <p className="pixel-text text-sm text-gray-700 leading-relaxed">
                Play monthly games with prizes to win and earn ZUNA tokens
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Live Stats */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="bg-gradient-to-r from-purple-900 to-blue-900 text-white p-6 rounded-3xl mb-8 pixel-border shadow-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold pixel-text">100K+</div>
              <div className="text-sm pixel-text opacity-90">Happy Pets</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold pixel-text">$2.5M</div>
              <div className="text-sm pixel-text opacity-90">Total Saved</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold pixel-text">50M</div>
              <div className="text-sm pixel-text opacity-90">ZUNA Earned</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold pixel-text">95%</div>
              <div className="text-sm pixel-text opacity-90">Goals Reached</div>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid md:grid-cols-2 gap-8 mb-8"
        >
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl pixel-border shadow-xl">
            <h3 className="text-2xl font-bold mb-6 pixel-text flex items-center text-gray-900">
              <span className="text-3xl mr-4">🏦</span> REAL BANKING
            </h3>
            <ul className="space-y-3 pixel-text text-gray-700">
              <li className="flex items-center"><span className="text-green-500 mr-3">✓</span> Connect your bank account</li>
              <li className="flex items-center"><span className="text-green-500 mr-3">✓</span> Automated savings rules</li>
              <li className="flex items-center"><span className="text-green-500 mr-3">✓</span> Round-up transactions</li>
              <li className="flex items-center"><span className="text-green-500 mr-3">✓</span> Bill management</li>
            </ul>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl pixel-border shadow-xl">
            <h3 className="text-2xl font-bold mb-6 pixel-text flex items-center text-gray-900">
              <span className="text-3xl mr-4">🪙</span> ZUNA REWARDS
            </h3>
            <ul className="space-y-3 pixel-text text-gray-700">
              <li className="flex items-center"><span className="text-purple-500 mr-3">✓</span> Earn tokens by saving</li>
              <li className="flex items-center"><span className="text-purple-500 mr-3">✓</span> Daily login rewards</li>
              <li className="flex items-center"><span className="text-purple-500 mr-3">✓</span> Achievement bonuses</li>
              <li className="flex items-center"><span className="text-purple-500 mr-3">✓</span> Trade & redeem tokens</li>
            </ul>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 rounded-3xl pixel-border shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 pixel-text">
            START YOUR FINANCIAL JOURNEY
          </h2>
          <p className="text-lg pixel-text mb-8 opacity-90">
            Save money, grow your pet, earn ZUNA tokens
          </p>
          <Link href="/signup">
            <motion.button 
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-12 py-4 rounded-xl pixel-border pixel-text font-bold shadow-xl text-xl transform transition-all"
            >
              GET STARTED NOW
            </motion.button>
          </Link>
        </motion.div>

        {/* Footer */}
        <footer className="text-center text-white mt-16">
          <p className="pixel-text text-lg drop-shadow">© 2025 ZUNA - Where Savings Meet Gaming</p>
          <p className="pixel-text text-sm mt-3 opacity-90 drop-shadow">
            Your pet grows with your financial future
          </p>
        </footer>
      </div>
    </div>
  );
}