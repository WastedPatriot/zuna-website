'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Press_Start_2P } from 'next/font/google';
import PixelBackground from '../components/PixelBackground';
import GrassyBottom from '../components/GrassyBottom';
import Image from 'next/image';

const pixelFont = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function FeaturesPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const features = [
    {
      icon: '🏦',
      title: 'Open Banking',
      description: 'Connect all your bank accounts securely in one place',
      details: [
        'Real-time balance updates',
        'Transaction categorization',
        'Spending insights',
        'Multi-bank support'
      ]
    },
    {
      icon: '🎮',
      title: 'Gamification',
      description: 'Turn saving money into an adventure',
      details: [
        'Daily challenges',
        'Achievement system',
        'Leaderboards',
        'Reward points'
      ]
    },
    {
      icon: '🐾',
      title: 'Digital Pet',
      description: 'Your savings buddy that grows with you',
      details: [
        'Happiness meter',
        'Evolution stages',
        'Custom accessories',
        'Interactive animations'
      ]
    },
    {
      icon: '🤖',
      title: 'AI Coach',
      description: 'Personalized financial guidance',
      details: [
        'Smart recommendations',
        'Budget optimization',
        'Goal tracking',
        'Premium insights'
      ]
    },
    {
      icon: '💰',
      title: 'Savings Pots',
      description: 'Organize your money for different goals',
      details: [
        'Custom categories',
        'Auto-save rules',
        'Visual progress',
        'Shared pots'
      ]
    },
    {
      icon: '🪙',
      title: 'Crypto Wallet',
      description: 'Earn and manage ZUNA tokens',
      details: [
        'Secure storage',
        'Easy transfers',
        'Reward earnings',
        'Token staking'
      ]
    }
  ];

  return (
    <PixelBackground isDarkMode={isDarkMode}>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <Link href="/" className="text-white hover:text-yellow-300 transition-colors" style={{
            fontFamily: pixelFont.style.fontFamily,
            fontSize: '12px'
          }}>
            ← HOME
          </Link>
          
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded"
            style={{
              backgroundColor: isDarkMode ? '#FFD700' : '#4A90E2',
              border: '2px solid',
              borderColor: isDarkMode ? '#FFA500' : '#357ABD',
              fontFamily: pixelFont.style.fontFamily,
              fontSize: '10px'
            }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{
              fontFamily: pixelFont.style.fontFamily,
              color: '#FFFFFF',
              textShadow: '4px 4px 0 rgba(0,0,0,0.3)'
            }}>
              Features
            </h1>
            <p className="text-xl mb-8" style={{
              fontFamily: pixelFont.style.fontFamily,
              color: '#FFFFFF',
              fontSize: '14px'
            }}>
              Everything you need for financial wellness
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.9)' : 'rgba(255,255,255,0.9)',
                  border: '4px solid',
                  borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                  boxShadow: '8px 8px 0 rgba(0,0,0,0.2)',
                  imageRendering: 'pixelated'
                }}
              >
                <div className="text-5xl mb-4 text-center">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-center" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  color: isDarkMode ? '#FFFFFF' : '#1a1a1a'
                }}>
                  {feature.title}
                </h3>
                <p className="mb-4 text-center" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '11px',
                  color: isDarkMode ? '#B0B0B0' : '#666666'
                }}>
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center" style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '10px',
                      color: isDarkMode ? '#98D8E8' : '#4A90E2'
                    }}>
                      <span className="mr-2">▸</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Premium Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="p-8" style={{
              backgroundColor: isDarkMode ? 'rgba(102, 126, 234, 0.1)' : 'rgba(74, 144, 226, 0.1)',
              border: '4px solid',
              borderColor: '#FFD700',
              boxShadow: '8px 8px 0 rgba(0,0,0,0.3)',
              imageRendering: 'pixelated'
            }}>
              <h2 className="text-3xl font-bold mb-6 text-center" style={{
                fontFamily: pixelFont.style.fontFamily,
                color: '#FFD700',
                textShadow: '2px 2px 0 rgba(0,0,0,0.5)'
              }}>
                ⭐ Premium Features ⭐
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <h3 style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '14px',
                    color: '#FFFFFF'
                  }}>
                    Free Plan
                  </h3>
                  <ul className="space-y-2">
                    {['Basic banking', '1 savings pot', 'Daily challenges', 'Basic pet'].map((item, idx) => (
                      <li key={idx} style={{
                        fontFamily: pixelFont.style.fontFamily,
                        fontSize: '10px',
                        color: isDarkMode ? '#B0B0B0' : '#666666'
                      }}>
                        ✓ {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '14px',
                    color: '#FFD700'
                  }}>
                    Premium Plan
                  </h3>
                  <ul className="space-y-2">
                    {['Everything in Free', 'Unlimited pots', 'AI Coach Pro', 'Exclusive games', 'Priority support'].map((item, idx) => (
                      <li key={idx} style={{
                        fontFamily: pixelFont.style.fontFamily,
                        fontSize: '10px',
                        color: '#FFD700'
                      }}>
                        ⭐ {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <Link href="/pricing">
                  <button className="px-8 py-4 text-black transition-all hover:scale-105" style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '14px',
                    backgroundColor: '#FFD700',
                    border: '4px solid #FFA500',
                    boxShadow: '4px 4px 0 #000',
                    imageRendering: 'pixelated'
                  }}>
                    UPGRADE NOW
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <GrassyBottom />
      </div>
    </PixelBackground>
  );
}