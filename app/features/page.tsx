'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SpriteAnimation from '../components/SpriteAnimation';

export default function FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'banking',
      title: 'Smart Banking Integration',
      icon: '🏦',
      sprite: 'savings',
      description: 'Connect all your bank accounts in one place with Open Banking technology.',
      details: [
        'Real-time transaction tracking',
        'Automatic expense categorization',
        'Smart savings recommendations',
        'Bill payment reminders',
        'Spending insights and analytics'
      ],
      screenshot: '/screenshots/banking.png'
    },
    {
      id: 'games',
      title: 'Monthly Prize Games',
      icon: '🎮',
      sprite: 'gaming',
      description: 'Compete in monthly challenges and win real cash prizes up to £1,000.',
      details: [
        'New games every month',
        'Leaderboards and achievements',
        'Real cash prizes',
        'Skill-based mini-games',
        'Social competitions with friends'
      ],
      screenshot: '/screenshots/games.png'
    },
    {
      id: 'pet',
      title: 'Digital Pet Companion',
      icon: '🐾',
      sprite: 'happy',
      description: 'Your ZUNA pet grows happier as you save more money.',
      details: [
        'Pet evolves with your savings',
        'Unlock new animations and features',
        'Daily interactions and rewards',
        'Customizable appearance',
        'Pet mood reflects financial health'
      ],
      screenshot: '/screenshots/pet.png'
    },
    {
      id: 'coach',
      title: 'AI Financial Coach',
      icon: '🤖',
      sprite: 'speaking',
      description: 'Get personalized financial advice from our intelligent AI coach.',
      details: [
        'Personalized budgeting advice',
        'Investment recommendations',
        'Debt reduction strategies',
        'Financial goal planning',
        '24/7 availability'
      ],
      screenshot: '/screenshots/coach.png'
    },
    {
      id: 'pots',
      title: 'Visual Savings Pots',
      icon: '💰',
      sprite: 'planting',
      description: 'Create themed savings pots and watch them grow visually.',
      details: [
        'Custom savings goals',
        'Visual progress tracking',
        'Automatic transfers',
        'Shared pots with friends',
        'Interest earning options'
      ],
      screenshot: '/screenshots/pots.png'
    },
    {
      id: 'crypto',
      title: 'Integrated Crypto Wallet',
      icon: '🪙',
      sprite: 'jumping',
      description: 'Buy, sell, and earn ZUNA tokens and other cryptocurrencies.',
      details: [
        'ZUNA token rewards',
        'Major cryptocurrency support',
        'Secure wallet storage',
        'Easy fiat conversion',
        'Staking and earning options'
      ],
      screenshot: '/screenshots/crypto.png'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sky-400 to-sky-300 pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
              textShadow: '3px 3px 0 rgba(0,0,0,0.3)'
            }}>
              Powerful Features
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto mb-8" style={{
              fontFamily: 'monospace',
              lineHeight: '1.6'
            }}>
              Everything you need to transform your financial life, gamified for maximum engagement.
            </p>
            <Link href="/signup" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 inline-block transition-colors" style={{
              fontFamily: 'monospace',
              border: '4px solid rgba(0,0,0,0.2)',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.2)'
            }}>
              Try All Features Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 cursor-pointer transition-all ${
                  activeFeature === index ? 'bg-green-50' : 'bg-white'
                }`}
                style={{
                  border: '4px solid #1a1a1a',
                  boxShadow: activeFeature === index ? '8px 8px 0 rgba(0,0,0,0.2)' : '6px 6px 0 rgba(0,0,0,0.1)'
                }}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{feature.icon}</span>
                  <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'monospace' }}>
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4" style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                  {feature.description}
                </p>
                <button className="text-green-600 hover:text-green-700 font-bold text-sm" style={{ fontFamily: 'monospace' }}>
                  Learn More →
                </button>
              </motion.div>
            ))}
          </div>

          {/* Detailed Feature View */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em'
                }}>
                  {features[activeFeature].title}
                </h2>
                <ul className="space-y-3 mb-8">
                  {features[activeFeature].details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-600" style={{ fontFamily: 'monospace' }}>
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 inline-block transition-colors" style={{
                  fontFamily: 'monospace',
                  border: '3px solid rgba(0,0,0,0.2)',
                  boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
                }}>
                  Get Started
                </Link>
              </div>
              <div className="flex justify-center">
                <div className="bg-gradient-to-b from-sky-100 to-green-100 p-12 rounded-xl" style={{
                  border: '4px solid #1a1a1a',
                  boxShadow: '8px 8px 0 rgba(0,0,0,0.2)'
                }}>
                  <SpriteAnimation
                    sprite={`/sprites/${features[activeFeature].sprite}.webp`}
                    frames={4}
                    frameRate={200}
                    size={200}
                    alt={features[activeFeature].title}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{
            fontFamily: 'monospace',
            letterSpacing: '0.05em'
          }}>
            ZUNA vs Traditional Banking Apps
          </h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full" style={{
              border: '4px solid #1a1a1a',
              boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
            }}>
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="p-4 text-left" style={{ fontFamily: 'monospace' }}>Feature</th>
                  <th className="p-4 text-center" style={{ fontFamily: 'monospace' }}>ZUNA</th>
                  <th className="p-4 text-center" style={{ fontFamily: 'monospace' }}>Traditional Apps</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-t-2 border-gray-200">
                  <td className="p-4" style={{ fontFamily: 'monospace' }}>Gamification</td>
                  <td className="p-4 text-center text-2xl">✅</td>
                  <td className="p-4 text-center text-2xl">❌</td>
                </tr>
                <tr className="border-t-2 border-gray-200">
                  <td className="p-4" style={{ fontFamily: 'monospace' }}>Digital Pet Companion</td>
                  <td className="p-4 text-center text-2xl">✅</td>
                  <td className="p-4 text-center text-2xl">❌</td>
                </tr>
                <tr className="border-t-2 border-gray-200">
                  <td className="p-4" style={{ fontFamily: 'monospace' }}>Monthly Prize Games</td>
                  <td className="p-4 text-center text-2xl">✅</td>
                  <td className="p-4 text-center text-2xl">❌</td>
                </tr>
                <tr className="border-t-2 border-gray-200">
                  <td className="p-4" style={{ fontFamily: 'monospace' }}>AI Financial Coach</td>
                  <td className="p-4 text-center text-2xl">✅</td>
                  <td className="p-4 text-center text-2xl">⚠️</td>
                </tr>
                <tr className="border-t-2 border-gray-200">
                  <td className="p-4" style={{ fontFamily: 'monospace' }}>Crypto Integration</td>
                  <td className="p-4 text-center text-2xl">✅</td>
                  <td className="p-4 text-center text-2xl">⚠️</td>
                </tr>
                <tr className="border-t-2 border-gray-200">
                  <td className="p-4" style={{ fontFamily: 'monospace' }}>Fun Factor</td>
                  <td className="p-4 text-center text-2xl">🎮</td>
                  <td className="p-4 text-center text-2xl">😴</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-400 to-pink-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            textShadow: '3px 3px 0 rgba(0,0,0,0.2)'
          }}>
            Experience All Features Risk-Free
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8" style={{
            fontFamily: 'monospace',
            lineHeight: '1.6'
          }}>
            Try ZUNA free for 30 days. No credit card required.
          </p>
          <Link href="/signup" className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-10 inline-block transition-colors" style={{
            fontFamily: 'monospace',
            border: '4px solid #1a1a1a',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)'
          }}>
            Start Your Free Trial
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
