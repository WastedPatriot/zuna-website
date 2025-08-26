'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import PixelMascot from './components/PixelMascot';
import InteractiveBackground from './components/InteractiveBackground';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [currentScene, setCurrentScene] = useState(0);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const newScene = Math.floor(scrollPosition / windowHeight);
      setCurrentScene(newScene);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      <InteractiveBackground />
      <Navigation />

      <div className="relative z-10">
        {/* Hero Section */}
        <section 
          ref={el => sectionsRef.current[0] = el!}
          className="min-h-screen flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center max-w-4xl"
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
              className="mb-8 inline-block"
            >
              <PixelMascot size={120} interactive />
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 pixelated glow-green">
              ZUNA
            </h1>
            
            <p className="text-xl md:text-2xl text-green-400 mb-12 pixelated">
              Banking Reimagined for Every Mind
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold pixelated text-lg hover:shadow-2xl hover:shadow-green-500/50 transition-all"
                >
                  GET STARTED
                </motion.button>
              </Link>
              
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-green-500 text-green-400 px-8 py-4 rounded-xl font-bold pixelated text-lg hover:bg-green-500/20 transition-all"
                >
                  LOGIN
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section 
          ref={el => sectionsRef.current[1] = el!}
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <div className="max-w-6xl w-full">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-center mb-16 pixelated"
            >
              FEATURES
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "TAMAGOTCHI COMPANION",
                  desc: "Your financial buddy that grows with your savings",
                  icon: "🎮",
                  color: "from-green-400 to-emerald-600"
                },
                {
                  title: "SMART SAVINGS",
                  desc: "AI-powered insights to help you save more",
                  icon: "💰",
                  color: "from-purple-400 to-pink-600"
                },
                {
                  title: "PLAY & EARN",
                  desc: "Turn financial goals into fun challenges",
                  icon: "🏆",
                  color: "from-blue-400 to-cyan-600"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-gray-800 hover:border-green-400 transition-all"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <div className={`h-1 w-20 bg-gradient-to-r ${feature.color} mb-4`} />
                  <h3 className="text-xl font-bold mb-4 pixelated">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section 
          ref={el => sectionsRef.current[2] = el!}
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <div className="max-w-4xl w-full">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-center mb-16 pixelated"
            >
              HOW IT WORKS
            </motion.h2>
            
            <div className="space-y-12">
              {[
                { step: "01", title: "SIGN UP", desc: "Create your account and meet your Tamagotchi" },
                { step: "02", title: "SET GOALS", desc: "Choose your savings targets and challenges" },
                { step: "03", title: "SAVE & PLAY", desc: "Watch your companion grow as you save" },
                { step: "04", title: "LEVEL UP", desc: "Unlock rewards and new features" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-8"
                >
                  <div className="text-6xl font-bold text-green-400/20 pixelated">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 pixelated text-green-400">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          ref={el => sectionsRef.current[3] = el!}
          className="min-h-screen flex items-center justify-center px-4 py-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-center max-w-3xl"
          >
            <div className="mb-8">
              <PixelMascot size={80} mood="excited" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 pixelated">
              READY TO START YOUR JOURNEY?
            </h2>
            
            <p className="text-xl text-gray-400 mb-12">
              Join thousands who are already saving smarter with their digital companion
            </p>
            
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-6 rounded-xl font-bold pixelated text-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all"
              >
                CREATE ACCOUNT
              </motion.button>
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4 pixelated text-green-400">ZUNA</h3>
                <p className="text-gray-400 text-sm">
                  Your financial companion for a better tomorrow
                </p>
              </div>
              
              <div>
                <h4 className="font-bold mb-4 pixelated">PRODUCT</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/features" className="hover:text-green-400 transition-colors">Features</Link></li>
                  <li><Link href="/pricing" className="hover:text-green-400 transition-colors">Pricing</Link></li>
                  <li><Link href="/security" className="hover:text-green-400 transition-colors">Security</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-4 pixelated">COMPANY</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/about" className="hover:text-green-400 transition-colors">About</Link></li>
                  <li><Link href="/blog" className="hover:text-green-400 transition-colors">Blog</Link></li>
                  <li><Link href="/careers" className="hover:text-green-400 transition-colors">Careers</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-4 pixelated">LEGAL</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/terms" className="hover:text-green-400 transition-colors">Terms & Conditions</Link></li>
                  <li><Link href="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/cookies" className="hover:text-green-400 transition-colors">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Zuna. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Scene Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20">
        {[0, 1, 2, 3].map((i) => (
          <motion.button
            key={i}
            className={`block w-3 h-3 rounded-full mb-4 transition-all ${
              currentScene === i ? 'bg-green-400 scale-150' : 'bg-white/30'
            }`}
            whileHover={{ scale: 1.5 }}
            onClick={() => {
              sectionsRef.current[i]?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ))}
      </div>
    </>
  );
}