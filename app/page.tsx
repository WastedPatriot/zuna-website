'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SpriteAnimation from './components/SpriteAnimation';

export default function Home() {
  const [mascotSprite, setMascotSprite] = useState('idleblink');
  const [mascotPosition, setMascotPosition] = useState({ x: 50, y: 50 });
  const [isMoving, setIsMoving] = useState(false);

  // Random sprite animation changes
  useEffect(() => {
    const sprites = ['idleblink', 'waving', 'happy', 'leftrn', 'righrun'];
    const interval = setInterval(() => {
      const randomSprite = sprites[Math.floor(Math.random() * sprites.length)];
      setMascotSprite(randomSprite);
      
      // If it's a movement sprite, move the mascot
      if (randomSprite === 'leftrn' || randomSprite === 'righrun') {
        setIsMoving(true);
        setMascotPosition(prev => ({
          x: Math.max(5, Math.min(85, prev.x + (randomSprite === 'leftrn' ? -15 : 15))),
          y: Math.max(10, Math.min(80, prev.y + (Math.random() - 0.5) * 10))
        }));
        
        // Return to idle after movement
        setTimeout(() => {
          setMascotSprite('idleblink');
          setIsMoving(false);
        }, 2000);
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-200 relative overflow-hidden">
      
      {/* Moving Clouds Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Large Cloud 1 */}
        <motion.div
          className="absolute w-[300px] h-[100px] bg-white rounded-full opacity-80 blur-sm"
          animate={{
            x: [-300, typeof window !== 'undefined' ? window.innerWidth + 300 : 1920],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: '10%' }}
        />
        
        {/* Large Cloud 2 */}
        <motion.div
          className="absolute w-[250px] h-[80px] bg-white rounded-full opacity-70 blur-sm"
          animate={{
            x: [-250, typeof window !== 'undefined' ? window.innerWidth + 250 : 1920],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear",
            delay: 10,
          }}
          style={{ top: '20%' }}
        />
        
        {/* Medium Cloud 3 */}
        <motion.div
          className="absolute w-[200px] h-[60px] bg-white rounded-full opacity-60 blur-sm"
          animate={{
            x: [-200, typeof window !== 'undefined' ? window.innerWidth + 200 : 1920],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
            delay: 20,
          }}
          style={{ top: '30%' }}
        />
        
        {/* Small Cloud 4 */}
        <motion.div
          className="absolute w-[150px] h-[45px] bg-white rounded-full opacity-50 blur-sm"
          animate={{
            x: [-150, typeof window !== 'undefined' ? window.innerWidth + 150 : 1920],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
          }}
          style={{ top: '15%' }}
        />
        
        {/* Small Cloud 5 */}
        <motion.div
          className="absolute w-[120px] h-[35px] bg-white rounded-full opacity-40 blur-sm"
          animate={{
            x: [-120, typeof window !== 'undefined' ? window.innerWidth + 120 : 1920],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            delay: 15,
          }}
          style={{ top: '25%' }}
        />
      </div>

      {/* Modern Header */}
      <header className="relative z-20 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold pixel-text text-gray-900">ZUNA</div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="pixel-text text-gray-700 hover:text-gray-900 transition-colors">Features</Link>
            <Link href="#about" className="pixel-text text-gray-700 hover:text-gray-900 transition-colors">About</Link>
            <Link href="/login" className="pixel-text text-gray-700 hover:text-gray-900 transition-colors">Login</Link>
          </nav>
          <Link href="/signup" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg pixel-text transition-colors">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <section className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold pixel-text text-gray-900 mb-6 leading-tight"
          >
            Your Financial<br/>Adventure Awaits
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl pixel-text text-gray-700 mb-8 max-w-3xl mx-auto"
          >
            Manage your money, play monthly games with prizes, and watch your digital pet grow as you save!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/signup" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg pixel-text text-xl transition-colors shadow-lg">
              Start Your Journey
            </Link>
            <Link href="#features" className="bg-white/80 hover:bg-white text-gray-900 font-bold py-4 px-8 rounded-lg pixel-text text-xl transition-colors shadow-lg border-2 border-gray-900">
              Learn More
            </Link>
          </motion.div>
        </section>

        {/* Interactive Mascot Environment */}
        <section className="mb-16">
          <div className="bg-gradient-to-b from-sky-200 to-green-300 rounded-2xl border-4 border-gray-900 shadow-2xl overflow-hidden relative h-[500px] mx-auto max-w-4xl">
            
            {/* Environment Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-400 to-green-300"></div>
            
            {/* Animated Mascot */}
            <motion.div
              className="absolute z-10"
              animate={{
                left: `${mascotPosition.x}%`,
                top: `${mascotPosition.y}%`,
              }}
              transition={{
                duration: isMoving ? 2 : 0.5,
                ease: "easeInOut"
              }}
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              <SpriteAnimation
                sprite={`/sprites/${mascotSprite}.webp`}
                frames={
                  mascotSprite === 'idleblink' ? 2 :
                  mascotSprite === 'waving' ? 4 :
                  mascotSprite === 'happy' ? 4 :
                  mascotSprite === 'leftrn' ? 6 :
                  mascotSprite === 'righrun' ? 6 : 2
                }
                frameRate={
                  mascotSprite === 'idleblink' ? 500 :
                  mascotSprite === 'waving' ? 200 :
                  mascotSprite === 'happy' ? 200 :
                  mascotSprite === 'leftrn' ? 100 :
                  mascotSprite === 'righrun' ? 100 : 500
                }
                size={120} // Much larger sprite
                alt="Zuna Mascot"
              />
            </motion.div>
            
            {/* Environment Decorations */}
            <div className="absolute bottom-16 left-10 w-8 h-8 bg-yellow-400 rounded-full opacity-80"></div>
            <div className="absolute bottom-20 right-16 w-6 h-6 bg-red-400 rounded-full opacity-80"></div>
            <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full opacity-60"></div>
            
            {/* Status Text */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gray-900/80 text-white px-4 py-2 rounded-lg pixel-text text-sm">
                {mascotSprite === 'idleblink' && "Zuna is thinking about your savings..."}
                {mascotSprite === 'waving' && "Hello there! 👋"}
                {mascotSprite === 'happy' && "Great job saving money! 🎉"}
                {mascotSprite === 'leftrn' && "Exploring to the left..."}
                {mascotSprite === 'righrun' && "Running to new adventures!"}
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="mb-16">
          <h2 className="text-4xl font-bold pixel-text text-gray-900 text-center mb-12">
            Everything You Need
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-4 border-gray-900 shadow-lg text-center"
            >
              <div className="text-6xl mb-4">🏦</div>
              <h3 className="text-2xl font-bold pixel-text text-gray-900 mb-4">Smart Banking</h3>
              <p className="pixel-text text-gray-700">
                Connect your real bank accounts and get AI-powered insights on your spending patterns.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-4 border-gray-900 shadow-lg text-center"
            >
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold pixel-text text-gray-900 mb-4">Monthly Games</h3>
              <p className="pixel-text text-gray-700">
                Play monthly games with real prizes and earn ZUNA tokens for saving money.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-4 border-gray-900 shadow-lg text-center"
            >
              <div className="text-6xl mb-4">🐾</div>
              <h3 className="text-2xl font-bold pixel-text text-gray-900 mb-4">Digital Pet</h3>
              <p className="pixel-text text-gray-700">
                Watch your Tamagotchi grow happier as you hit your savings goals and build healthy habits.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-green-400 to-blue-500 p-12 rounded-2xl border-4 border-gray-900 shadow-2xl"
          >
            <h2 className="text-4xl font-bold pixel-text text-white mb-6">
              Ready to Start Saving?
            </h2>
            <p className="text-xl pixel-text text-white/90 mb-8">
              Join thousands of users who are already building better financial habits with ZUNA.
            </p>
            <Link href="/signup" className="bg-white text-gray-900 font-bold py-4 px-12 rounded-lg pixel-text text-xl hover:bg-gray-100 transition-colors shadow-lg">
              Get Started Today
            </Link>
          </motion.div>
        </section>
        
      </main>
    </div>
  );
}