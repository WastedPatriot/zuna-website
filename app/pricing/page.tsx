'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Press_Start_2P } from 'next/font/google';
import PixelBackground from '../components/PixelBackground';
import GrassyBottom from '../components/GrassyBottom';

const pixelFont = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function PricingPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'FREE',
      price: '£0',
      period: 'forever',
      color: '#10b981',
      features: [
        '1 Bank Account',
        '1 Savings Pot',
        'Basic Pet',
        'Daily Challenges',
        'Community Access'
      ],
      notIncluded: [
        'AI Coach Pro',
        'Unlimited Pots',
        'Premium Games',
        'Priority Support'
      ]
    },
    {
      name: 'PREMIUM',
      price: isYearly ? '£49' : '£5',
      period: isYearly ? '/year' : '/month',
      color: '#FFD700',
      popular: true,
      features: [
        'Unlimited Banks',
        'Unlimited Pots',
        'Premium Pet Skins',
        'All Games Unlocked',
        'AI Coach Pro',
        'Priority Support',
        'Early Access',
        'Exclusive Rewards'
      ],
      notIncluded: []
    },
    {
      name: 'FAMILY',
      price: isYearly ? '£99' : '£10',
      period: isYearly ? '/year' : '/month',
      color: '#667eea',
      features: [
        'Everything in Premium',
        'Up to 5 Accounts',
        'Family Dashboard',
        'Parental Controls',
        'Shared Savings Goals',
        'Family Challenges',
        'Group Leaderboards',
        'Dedicated Support'
      ],
      notIncluded: []
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
              Pricing
            </h1>
            <p className="text-xl mb-8" style={{
              fontFamily: pixelFont.style.fontFamily,
              color: '#FFFFFF',
              fontSize: '14px'
            }}>
              Choose your adventure
            </p>

            {/* Billing Toggle */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-4 p-2" style={{
                backgroundColor: 'rgba(0,0,0,0.3)',
                border: '2px solid #667eea',
                imageRendering: 'pixelated'
              }}>
                <button
                  onClick={() => setIsYearly(false)}
                  className="px-4 py-2"
                  style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '12px',
                    backgroundColor: !isYearly ? '#667eea' : 'transparent',
                    color: '#FFFFFF',
                    border: '2px solid transparent'
                  }}
                >
                  MONTHLY
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className="px-4 py-2"
                  style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '12px',
                    backgroundColor: isYearly ? '#667eea' : 'transparent',
                    color: '#FFFFFF',
                    border: '2px solid transparent'
                  }}
                >
                  YEARLY
                </button>
                {isYearly && (
                  <span className="px-2 py-1" style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '10px',
                    backgroundColor: '#10b981',
                    color: '#FFFFFF'
                  }}>
                    SAVE 20%
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="px-4 py-1" style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '10px',
                      backgroundColor: '#FFD700',
                      color: '#000',
                      border: '2px solid #FFA500',
                      boxShadow: '2px 2px 0 rgba(0,0,0,0.3)'
                    }}>
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="h-full p-6" style={{
                  backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.95)' : 'rgba(255,255,255,0.95)',
                  border: '4px solid',
                  borderColor: plan.color,
                  boxShadow: plan.popular ? '8px 8px 0 rgba(255, 215, 0, 0.3)' : '8px 8px 0 rgba(0,0,0,0.2)',
                  imageRendering: 'pixelated',
                  transform: plan.popular ? 'scale(1.05)' : 'scale(1)'
                }}>
                  <h3 className="text-center mb-4" style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '20px',
                    color: plan.color
                  }}>
                    {plan.name}
                  </h3>
                  
                  <div className="text-center mb-6">
                    <span style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '32px',
                      color: isDarkMode ? '#FFFFFF' : '#1a1a1a'
                    }}>
                      {plan.price}
                    </span>
                    <span style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '12px',
                      color: isDarkMode ? '#B0B0B0' : '#666666'
                    }}>
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start" style={{
                        fontFamily: pixelFont.style.fontFamily,
                        fontSize: '10px',
                        color: isDarkMode ? '#98D8E8' : '#4A90E2'
                      }}>
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, idx) => (
                      <li key={idx} className="flex items-start opacity-50" style={{
                        fontFamily: pixelFont.style.fontFamily,
                        fontSize: '10px',
                        color: isDarkMode ? '#666666' : '#999999',
                        textDecoration: 'line-through'
                      }}>
                        <span className="mr-2">✗</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="w-full py-3 text-white transition-all hover:scale-105"
                    style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '12px',
                      backgroundColor: plan.color,
                      border: '3px solid',
                      borderColor: plan.color === '#FFD700' ? '#FFA500' : 
                                   plan.color === '#10b981' ? '#065f46' : '#4A5FC1',
                      boxShadow: '4px 4px 0 #000',
                      imageRendering: 'pixelated',
                      color: plan.color === '#FFD700' ? '#000' : '#FFF'
                    }}
                  >
                    {plan.name === 'FREE' ? 'GET STARTED' : 'UPGRADE NOW'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12" style={{
            fontFamily: pixelFont.style.fontFamily,
            color: '#FFFFFF',
            textShadow: '2px 2px 0 rgba(102, 126, 234, 0.5)'
          }}>
            FAQ
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'Can I change plans anytime?', a: 'Yes! Upgrade or downgrade whenever you want.' },
              { q: 'Is there a free trial?', a: '7-day free trial for Premium plans.' },
              { q: 'What payment methods?', a: 'Cards, PayPal, and crypto accepted.' },
              { q: 'Can I cancel anytime?', a: 'Yes, no contracts or hidden fees.' }
            ].map((faq, index) => (
              <div key={index} className="p-4" style={{
                backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.8)' : 'rgba(255,255,255,0.9)',
                border: '2px solid',
                borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                imageRendering: 'pixelated'
              }}>
                <h3 style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '12px',
                  color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                  marginBottom: '8px'
                }}>
                  {faq.q}
                </h3>
                <p style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '10px',
                  color: isDarkMode ? '#B0B0B0' : '#666666'
                }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <GrassyBottom />
      </div>
    </PixelBackground>
  );
}