'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    { title: "Save with your mascot", desc: "Watch your digital pet grow as your savings increase" },
    { title: "AI-powered insights", desc: "Get personalized financial advice from our smart coach" },
    { title: "Play to earn", desc: "Compete in Tetris tournaments for real rewards" },
    { title: "Secure crypto wallet", desc: "Store and manage crypto with Face ID protection" }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      {/* Gradient Orbs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-green-500/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/10 blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/20 border-b border-white/5">
        <div className="container mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">Z</span>
              </div>
              <span className="text-xl font-bold">Zuna</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition">Features</Link>
              <Link href="#mascot" className="text-gray-300 hover:text-white transition">Mascot</Link>
              <Link href="#testimonials" className="text-gray-300 hover:text-white transition">Reviews</Link>
              <Link href="#download" className="text-gray-300 hover:text-white transition">Download</Link>
              <Link 
                href="https://app.gozuna.co.uk" 
                className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all"
              >
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-400">10K+ users saving smarter</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-white to-gray-400 bg-clip-text text-transparent">
              Do more<br />
              <span className="text-green-400">With your money</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              The financial wellness app that makes saving fun with your own Tamagotchi companion, 
              AI coaching, and gamified rewards
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#download"
                className="group relative bg-white text-black px-8 py-4 rounded-full font-semibold text-lg overflow-hidden transition-all hover:shadow-xl hover:shadow-white/20"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 text-white flex items-center justify-center transition-opacity">Get Started</span>
              </Link>
              <Link 
                href="#features"
                className="border border-white/20 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/5 transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Animated Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold mb-3 text-green-400">{features[currentFeature].title}</h3>
                  <p className="text-gray-400">{features[currentFeature].desc}</p>
                </motion.div>
              </AnimatePresence>
              
              {/* Progress dots */}
              <div className="flex gap-2 mt-6">
                {features.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all ${
                      index === currentFeature ? 'w-8 bg-green-500' : 'w-2 bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Banking that <span className="text-green-400">gets you</span>
            </h2>
            <p className="text-xl text-gray-400">Everything you need to take control of your finances</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🎮",
                title: "Gamified Savings",
                desc: "Turn financial goals into achievements",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: "🤖",
                title: "AI Money Coach",
                desc: "Personalized advice powered by AI",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: "🔒",
                title: "Secure Wallet",
                desc: "Bank-grade security for your crypto",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: "📊",
                title: "Smart Analytics",
                desc: "Track spending and find savings",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: "🎯",
                title: "Goal Setting",
                desc: "Visual progress towards your dreams",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: "🏆",
                title: "Rewards System",
                desc: "Earn points and unlock features",
                gradient: "from-yellow-500 to-orange-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mascot Section */}
      <section id="mascot" className="py-24 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Meet your <span className="text-green-400">money buddy</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                A pixel-perfect companion that evolves with your financial journey. 
                Feed it, play with it, and watch it celebrate your wins!
              </p>
              
              <div className="space-y-4">
                {[
                  "Grows stronger as you save more",
                  "Reminds you of bills and goals",
                  "Celebrates your achievements",
                  "Unlocks new features and games"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="text-green-400 text-sm">✓</span>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-green-500/20 to-purple-500/20 rounded-3xl p-12 backdrop-blur-xl border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-purple-500/10 rounded-3xl animate-pulse" />
                {/* Mascot placeholder - in real app this would be the animated mascot */}
                <div className="relative z-10 w-48 h-48 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-6xl">🌱</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-gradient-to-b from-transparent to-green-900/10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Real users, <span className="text-green-400">real results</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                role: "University Student",
                quote: "Finally saved enough for my first car thanks to Zuna's gamified approach!"
              },
              {
                name: "James K.",
                role: "Freelancer",
                quote: "The AI coach helped me identify £200/month in unnecessary subscriptions."
              },
              {
                name: "Emma L.",
                role: "Young Professional",
                quote: "Love watching my mascot grow! Makes saving actually fun and engaging."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full" />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section id="download" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-500/20 to-purple-500/20 rounded-3xl p-12 backdrop-blur-xl border border-white/10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start your journey today
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Join thousands who are transforming their financial future
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="https://apps.apple.com/zuna"
                className="group bg-white text-black px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-white/20 transition-all"
              >
                <span className="text-2xl">🍎</span>
                Download for iOS
              </a>
              <a 
                href="https://play.google.com/store/apps/zuna"
                className="group bg-white text-black px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-white/20 transition-all"
              >
                <span className="text-2xl">🤖</span>
                Download for Android
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">Z</span>
                </div>
                <span className="text-lg font-bold">Zuna</span>
              </div>
              <p className="text-sm text-gray-400">Financial wellness for everyone</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="#mascot" className="hover:text-white transition">Mascot</Link></li>
                <li><Link href="#download" className="hover:text-white transition">Download</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms</Link></li>
                <li><Link href="/security" className="hover:text-white transition">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© 2024 Zuna. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://twitter.com/zunaapp" className="text-gray-400 hover:text-white transition">Twitter</a>
              <a href="https://discord.gg/zuna" className="text-gray-400 hover:text-white transition">Discord</a>
              <a href="https://github.com/zuna" className="text-gray-400 hover:text-white transition">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}