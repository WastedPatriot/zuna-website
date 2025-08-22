'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import BalanceCard from './components/BalanceCard';
import PixelMascot from './components/PixelMascot';
import FeatureCard from './components/FeatureCard';
import Newsletter from './components/Newsletter';

export default function Home() {
  const { scrollY } = useScroll();
  const [mascotMood, setMascotMood] = useState<'happy' | 'excited' | 'sleepy'>('happy');
  
  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const cloudsX = useTransform(scrollY, [0, 1000], [0, -100]);
  
  const features = [
    {
      icon: '🎮',
      title: 'Gamified Savings',
      description: 'Watch your Tamagotchi pet grow stronger as your savings increase. Feed it with deposits!',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: '🤖',
      title: 'AI Money Coach',
      description: 'Get personalized financial advice from our AI that learns your spending habits.',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: '🎯',
      title: 'Smart Goals',
      description: 'Set savings goals and watch your progress with beautiful visual trackers.',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: '🔒',
      title: 'Secure Banking',
      description: 'Bank-grade security with biometric authentication and encrypted transactions.',
      color: 'from-orange-400 to-red-500'
    }
  ];

  return (
    <main className="min-h-screen bg-[#E8F5E9] overflow-x-hidden">
      {/* Tamagotchi Environment Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#98D8E8] to-[#E8F5E9]" />
        
        {/* Animated clouds */}
        <motion.div 
          className="absolute top-10 left-0 w-full h-32"
          style={{ x: cloudsX }}
        >
          <div className="absolute left-10 w-32 h-16 bg-white/80 rounded-full blur-sm" />
          <div className="absolute left-64 w-48 h-20 bg-white/70 rounded-full blur-sm" />
          <div className="absolute right-32 w-40 h-16 bg-white/75 rounded-full blur-sm" />
        </motion.div>
        
        {/* Grass texture at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#7CB342] to-transparent">
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#7CB342]" 
               style={{ 
                 backgroundImage: `repeating-linear-gradient(90deg, #689F38 0px, #689F38 2px, #7CB342 2px, #7CB342 4px)`,
                 backgroundSize: '4px 100%'
               }} 
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 backdrop-blur-sm bg-white/30 border-b border-green-200/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-pixel text-xl">Z</span>
              </div>
              <span className="font-pixel text-2xl text-green-800">ZUNA</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-green-700 hover:text-green-900 transition font-medium">Features</Link>
              <Link href="#mascot" className="text-green-700 hover:text-green-900 transition font-medium">Mascot</Link>
              <Link href="#pricing" className="text-green-700 hover:text-green-900 transition font-medium">Pricing</Link>
              <Link 
                href="https://app.gozuna.co.uk" 
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all transform hover:scale-105"
              >
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div 
          className="container mx-auto max-w-6xl"
          style={{ y: heroY }}
        >
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-pixel text-5xl md:text-7xl text-green-800 mb-6 leading-tight"
            >
              ZUNA
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl text-green-700 font-sans"
            >
              Banking, reimagined for every mind.
            </motion.p>
          </div>

          {/* Interactive Balance Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-md mx-auto mb-12"
          >
            <BalanceCard />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="#download"
              className="group relative bg-green-600 text-white px-8 py-4 rounded-full font-medium text-lg overflow-hidden transition-all hover:shadow-xl hover:shadow-green-500/25"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link 
              href="#features"
              className="border-2 border-green-600 text-green-700 px-8 py-4 rounded-full font-medium text-lg hover:bg-green-50 transition-all"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-pixel text-4xl md:text-5xl text-green-800 mb-4">
              FEATURES
            </h2>
            <p className="text-xl text-green-700 font-sans">
              Everything you need for financial wellness
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Mascot Section */}
      <section id="mascot" className="relative py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-pixel text-4xl md:text-5xl text-green-800 mb-6">
                MEET YOUR MONEY BUDDY
              </h2>
              <p className="text-xl text-green-700 mb-8 font-sans leading-relaxed">
                Your personal Tamagotchi companion that grows with your savings! 
                Feed it with deposits, play mini-games, and watch it evolve as you 
                reach your financial goals.
              </p>
              
              <div className="space-y-4">
                {[
                  'Evolves through 5 different stages',
                  'Reacts to your spending habits',
                  'Celebrates your savings milestones',
                  'Reminds you of bills and goals'
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600">✓</span>
                    </div>
                    <span className="text-green-700 font-sans">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-12 shadow-2xl">
                {/* Pixel art environment */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#8BC34A]" />
                  <div className="absolute bottom-8 left-8 w-16 h-16 bg-[#689F38] rounded-full opacity-50" />
                  <div className="absolute bottom-12 right-12 w-12 h-12 bg-[#7CB342] rounded-full opacity-40" />
                </div>
                
                {/* Interactive Mascot */}
                <div 
                  className="relative z-10 cursor-pointer"
                  onClick={() => setMascotMood(mood => mood === 'happy' ? 'excited' : 'happy')}
                  onMouseEnter={() => setMascotMood('excited')}
                  onMouseLeave={() => setMascotMood('happy')}
                >
                  <PixelMascot mood={mascotMood} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto max-w-4xl">
          <Newsletter />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-green-800 text-white py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="font-pixel text-lg">Z</span>
                </div>
                <span className="font-pixel text-xl">ZUNA</span>
              </div>
              <p className="text-green-100 text-sm font-sans">
                Banking reimagined for neurodivergent minds and everyone who wants a better relationship with money.
              </p>
            </div>
            
            <div>
              <h4 className="font-pixel text-sm mb-4">PRODUCT</h4>
              <ul className="space-y-2 text-sm font-sans">
                <li><Link href="#features" className="text-green-100 hover:text-white transition">Features</Link></li>
                <li><Link href="#mascot" className="text-green-100 hover:text-white transition">Mascot</Link></li>
                <li><Link href="#pricing" className="text-green-100 hover:text-white transition">Pricing</Link></li>
                <li><Link href="/security" className="text-green-100 hover:text-white transition">Security</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-pixel text-sm mb-4">COMPANY</h4>
              <ul className="space-y-2 text-sm font-sans">
                <li><Link href="/about" className="text-green-100 hover:text-white transition">About Us</Link></li>
                <li><Link href="/blog" className="text-green-100 hover:text-white transition">Blog</Link></li>
                <li><Link href="/careers" className="text-green-100 hover:text-white transition">Careers</Link></li>
                <li><Link href="/press" className="text-green-100 hover:text-white transition">Press</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-pixel text-sm mb-4">LEGAL</h4>
              <ul className="space-y-2 text-sm font-sans">
                <li><Link href="/privacy" className="text-green-100 hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-green-100 hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-green-100 hover:text-white transition">Cookie Policy</Link></li>
                <li><Link href="/compliance" className="text-green-100 hover:text-white transition">Compliance</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-green-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-green-100 font-sans">
              © 2024 Zuna. All rights reserved. Regulated by the FCA.
            </p>
            <div className="flex gap-6">
              <a href="https://twitter.com/zunaapp" className="text-green-100 hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://discord.gg/zuna" className="text-green-100 hover:text-white transition">
                <span className="sr-only">Discord</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}