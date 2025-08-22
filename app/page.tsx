'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const { scrollY } = useScroll();
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  const phrases = [
    "Financial wellness meets fun",
    "Your money companion",
    "Banking reimagined",
    "Save, play, grow"
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Animated gradient background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(74, 222, 128, 0.3) 0%, transparent 70%)',
            filter: 'blur(100px)',
            x: useTransform(() => mousePosition.x * 0.05),
            y: useTransform(() => mousePosition.y * 0.05),
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
            filter: 'blur(100px)',
            x: useTransform(() => -mousePosition.x * 0.05),
            y: useTransform(() => -mousePosition.y * 0.05),
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
            filter: 'blur(120px)',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/10 border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-bold text-xl">Z</span>
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Zuna</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              {['Features', 'Mascot', 'Pricing', 'Blog'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-300 hover:text-white transition relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link 
                  href="https://app.gozuna.co.uk" 
                  className="relative bg-gradient-to-r from-green-500 to-green-600 px-6 py-2.5 rounded-full font-medium overflow-hidden group"
                >
                  <span className="relative z-10">Launch App</span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div 
          className="container mx-auto max-w-6xl text-center relative z-10"
          style={{ opacity }}
        >
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 mb-8"
          >
            <motion.span 
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent font-medium">
              10K+ users already saving smarter
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            <span className="bg-gradient-to-br from-white via-white to-gray-400 bg-clip-text text-transparent">
              Do more
            </span>
            <br />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentPhrase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-600 bg-clip-text text-transparent"
              >
                {phrases[currentPhrase]}
              </motion.span>
            </AnimatePresence>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            The financial wellness app that makes saving fun with your own Tamagotchi companion, 
            AI coaching, and gamified rewards
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="#download"
                className="group relative bg-white text-black px-8 py-4 rounded-full font-semibold text-lg overflow-hidden"
              >
                <span className="relative z-10">Get Started Free</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500"
                  initial={{ y: '100%' }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="#features"
                className="border border-white/20 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/5 backdrop-blur-sm transition-all"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* Interactive 3D card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{ y: y1 }}
            className="mt-20 relative"
          >
            <motion.div
              className="relative bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 max-w-2xl mx-auto"
              whileHover={{ scale: 1.02 }}
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-purple-500/20 rounded-3xl blur-xl" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">
                  Your Financial Journey Starts Here
                </h3>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <motion.div 
                      className="text-3xl font-bold text-white"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 }}
                    >
                      £2.8M+
                    </motion.div>
                    <p className="text-gray-400 text-sm">Saved by users</p>
                  </div>
                  <div>
                    <motion.div 
                      className="text-3xl font-bold text-white"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      4.9★
                    </motion.div>
                    <p className="text-gray-400 text-sm">App rating</p>
                  </div>
                  <div>
                    <motion.div 
                      className="text-3xl font-bold text-white"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.4 }}
                    >
                      24/7
                    </motion.div>
                    <p className="text-gray-400 text-sm">AI support</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section with cards */}
      <section id="features" className="relative py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Banking that
              </span>{' '}
              <span className="bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">
                gets you
              </span>
            </h2>
            <p className="text-xl text-gray-400">Everything you need for financial wellness</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🎮',
                title: 'Gamified Savings',
                desc: 'Turn financial goals into achievements',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: '🤖',
                title: 'AI Money Coach',
                desc: 'Personalized advice powered by AI',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: '🔒',
                title: 'Secure Banking',
                desc: 'Bank-grade security with biometrics',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                icon: '📊',
                title: 'Smart Analytics',
                desc: 'Track spending and find savings',
                gradient: 'from-orange-500 to-red-500'
              },
              {
                icon: '🎯',
                title: 'Goal Setting',
                desc: 'Visual progress towards dreams',
                gradient: 'from-indigo-500 to-purple-500'
              },
              {
                icon: '🏆',
                title: 'Rewards System',
                desc: 'Earn points and unlock features',
                gradient: 'from-yellow-500 to-orange-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10 group-hover:border-white/20 transition-all">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-purple-500/20 blur-3xl" />
            <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Ready to transform your finances?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Join thousands who are already building better money habits
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link 
                  href="https://app.gozuna.co.uk"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-3 hover:shadow-2xl hover:shadow-green-500/25 transition-all"
                >
                  Start Your Journey
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">Z</span>
              </div>
              <span className="text-xl font-bold">Zuna</span>
            </div>
            <p className="text-sm text-gray-400">© 2024 Zuna. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}