'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import PixelMascot from './components/PixelMascot';
import MascotShowcase from './components/MascotShowcase';
import MascotContextDemo from './components/MascotContextDemo';
import InteractiveBackground from './components/InteractiveBackground';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mascotMood, setMascotMood] = useState<'idle' | 'happy' | 'gaming' | 'jumping' | 'waving' | 'eating'>('idle');
  const [showFeatures, setShowFeatures] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.3]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowFeatures(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Cycle through mascot moods
  useEffect(() => {
    const interval = setInterval(() => {
      const moods: ('idle' | 'happy' | 'gaming' | 'jumping' | 'waving' | 'eating')[] = ['idle', 'happy', 'gaming', 'jumping', 'waving', 'eating'];
      setMascotMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      <InteractiveBackground />
      <Navigation />

      <div ref={containerRef} className="relative z-10">
        {/* Hero Section with Parallax */}
        <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20"
            style={{ y: y1 }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg opacity-20 blur-xl" />
          </motion.div>

          <motion.div
            className="absolute bottom-20 right-10 w-32 h-32"
            style={{ y: y2 }}
            animate={{
              rotate: [360, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-20 blur-2xl" />
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center max-w-5xl"
          >
            {/* Interactive Mascot */}
            <motion.div
              className="mb-8 inline-block relative"
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => setMascotMood('happy')}
              onHoverEnd={() => setMascotMood('idle')}
            >
              <PixelMascot size={150} mood={mascotMood} interactive />
              
              {/* Speech Bubble */}
              <AnimatePresence>
                {mascotMood === 'happy' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: 10 }}
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-lg shadow-lg"
                  >
                    <span className="text-sm font-bold pixelated">HI THERE!</span>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                      <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
        </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Animated Title */}
            <motion.h1 
              className="text-7xl md:text-9xl font-bold mb-6 pixelated"
              animate={{
                textShadow: [
                  "0 0 20px #4ade80",
                  "0 0 40px #4ade80",
                  "0 0 20px #4ade80",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                ZUNA
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-2xl md:text-3xl text-green-400 mb-12 pixelated"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Your Digital Financial Companion
            </motion.p>

            {/* CTA Buttons with Hover Effects */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link href="/signup">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(74, 222, 128, 0.8)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-xl font-bold pixelated text-xl overflow-hidden"
                >
                  <span className="relative z-10">START YOUR JOURNEY</span>
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ opacity: 0.2 }}
                  />
                </motion.button>
              </Link>
              
              <Link href="#features">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "#4ade80"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-green-500/50 text-green-400 px-10 py-5 rounded-xl font-bold pixelated text-xl hover:bg-green-500/10 transition-all"
                >
                  LEARN MORE
                </motion.button>
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
                <motion.div 
                  className="w-1 h-3 bg-green-400 rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Interactive Features Section */}
        <section id="features" className="min-h-screen py-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-center mb-20 pixelated"
              whileInView={{ scale: [0.8, 1.1, 1] }}
              transition={{ duration: 0.5 }}
            >
              AMAZING FEATURES
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "TAMAGOTCHI BANKING",
                  desc: "Watch your savings grow with your digital pet",
                  icon: "🎮",
                  color: "from-green-400 to-emerald-600",
                  sprite: "happy"
                },
                {
                  title: "SMART AI COACH",
                  desc: "Get personalized financial advice 24/7",
                  icon: "🤖",
                  color: "from-purple-400 to-pink-600",
                  sprite: "speaking"
                },
                {
                  title: "EPIC REWARDS",
                  desc: "Play games and earn real rewards",
                  icon: "🏆",
                  color: "from-blue-400 to-cyan-600",
                  sprite: "gaming"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ 
                    y: -20,
                    rotateY: 5,
                    rotateX: 5,
                  }}
                  className="relative group"
                  style={{ perspective: 1000 }}
                >
                  <div className="bg-gray-900/90 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-800 group-hover:border-green-400 transition-all duration-300 transform-gpu">
                    {/* Animated Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`} />
                    
                    {/* Feature Icon */}
                    <motion.div
                      className="text-6xl mb-6"
                      animate={{
                        rotate: [0, -10, 10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    
                    {/* Gradient Bar */}
                    <motion.div 
                      className={`h-2 w-full bg-gradient-to-r ${feature.color} mb-6 rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                    />
                    
                    <h3 className="text-2xl font-bold mb-4 pixelated">{feature.title}</h3>
                    <p className="text-gray-400 text-lg">{feature.desc}</p>
                    
                    {/* Hover Mascot */}
                    <motion.div
                      className="absolute -bottom-10 -right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <PixelMascot size={80} mood={feature.sprite as any} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Mascot Showcase Section */}
        <section className="min-h-screen py-20 px-4 relative overflow-hidden">
          <motion.div
            className="max-w-6xl mx-auto space-y-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <MascotShowcase />
            <MascotContextDemo />
          </motion.div>
        </section>

        {/* Interactive Demo Section */}
        <section className="min-h-screen py-20 px-4 relative overflow-hidden">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-12 pixelated">
              TRY IT NOW!
            </h2>
            
            {/* Interactive Mascot Playground */}
            <motion.div
              className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-12 border-2 border-green-400/50 relative overflow-hidden"
              whileHover={{ borderColor: "#4ade80" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent" />
              
              <p className="text-xl mb-8 pixelated text-green-400">
                Click the buttons to see your mascot in action!
              </p>
              
              <div className="flex justify-center mb-8">
                <PixelMascot size={120} mood={mascotMood} interactive />
              </div>
              
              <div className="flex gap-4 justify-center flex-wrap">
                {[
                  { mood: 'happy', label: 'HAPPY' },
                  { mood: 'gaming', label: 'GAMING' },
                  { mood: 'jumping', label: 'JUMPING' },
                  { mood: 'idle', label: 'IDLE' }
                ].map((action) => (
                  <motion.button
                    key={action.mood}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMascotMood(action.mood as any)}
                    className={`px-6 py-3 rounded-lg font-bold pixelated transition-all ${
                      mascotMood === action.mood 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {action.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mb-8"
            >
              <PixelMascot size={100} mood="happy" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 pixelated">
              JOIN THOUSANDS OF HAPPY SAVERS!
            </h2>
            
            <p className="text-xl text-gray-400 mb-12">
              Start your financial journey with your digital companion today
            </p>
            
            <Link href="/signup">
              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 50px rgba(74, 222, 128, 1)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-16 py-6 rounded-2xl font-bold pixelated text-2xl hover:shadow-2xl hover:shadow-green-500/50 transition-all"
              >
                GET STARTED NOW!
              </motion.button>
            </Link>
          </motion.div>
        </section>

        {/* Enhanced Footer */}
        <footer className="border-t border-gray-800 py-16 px-4 bg-black/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg" />
                  <h3 className="text-2xl font-bold pixelated text-green-400">ZUNA</h3>
                </div>
                <p className="text-gray-400">
                  Banking reimagined with your digital companion
                </p>
              </div>
              
              {[
                {
                  title: "PRODUCT",
                  links: ["Features", "Security", "Pricing", "Roadmap"]
                },
                {
                  title: "COMPANY",
                  links: ["About", "Blog", "Careers", "Press"]
                },
                {
                  title: "SUPPORT",
                  links: ["Help Center", "Contact", "Status", "Terms"]
                }
              ].map((section, i) => (
                <div key={i}>
                  <h4 className="font-bold mb-4 pixelated text-green-400">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map((link, j) => (
                      <li key={j}>
                        <Link 
                          href={`/${link.toLowerCase().replace(' ', '-')}`}
                          className="text-gray-400 hover:text-green-400 transition-colors"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 mb-4 md:mb-0">
                © 2024 Zuna. All rights reserved.
              </p>
              
              <div className="flex gap-4">
                {["🐦", "📸", "💼", "📱"].map((icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    className="text-2xl"
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
      </footer>
    </div>
    </>
  );
}