'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      color: 'from-gray-400 to-gray-500',
      features: [
        'Basic savings tracking',
        'Digital pet companion',
        'Monthly mini-games',
        'Up to 3 savings pots',
        'Basic spending insights',
        'Community support'
      ],
      limitations: [
        'Limited game entries',
        'Basic pet features',
        'No AI coach'
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Plus',
      price: { monthly: 4.99, yearly: 49.99 },
      description: 'For serious savers',
      color: 'from-green-400 to-blue-500',
      features: [
        'Everything in Free',
        'Unlimited savings pots',
        'Priority game entries',
        'Advanced pet features',
        'AI coach (10 sessions/month)',
        'Detailed analytics',
        'Bank sync (3 accounts)',
        'Email support'
      ],
      limitations: [],
      cta: 'Start 30-Day Trial',
      popular: true
    },
    {
      name: 'Premium',
      price: { monthly: 9.99, yearly: 99.99 },
      description: 'Maximum financial wellness',
      color: 'from-purple-400 to-pink-500',
      features: [
        'Everything in Plus',
        'Unlimited AI coach',
        'VIP game tournaments',
        'Exclusive pet skins',
        'Crypto wallet access',
        'Investment tracking',
        'Unlimited bank accounts',
        'Priority support',
        'Early feature access',
        'Personal finance webinars'
      ],
      limitations: [],
      cta: 'Start Premium Trial',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! Plus and Premium plans come with a 30-day free trial. No credit card required to start.'
    },
    {
      question: 'How do the prize games work?',
      answer: 'Every month, we run prize games where you can win real money. Free users get limited entries, while paid users get more chances to win.'
    },
    {
      question: 'Is my financial data secure?',
      answer: 'Absolutely! We use bank-level encryption and are regulated by the FCA. Your data is never sold or shared.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel your subscription at any time. You\'ll keep access until the end of your billing period.'
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
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto mb-8" style={{
              fontFamily: 'monospace',
              lineHeight: '1.6'
            }}>
              Choose the plan that fits your savings journey. Upgrade or downgrade anytime.
            </p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-sm p-2 rounded-full" style={{
              border: '3px solid #1a1a1a'
            }}>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  billingCycle === 'monthly' 
                    ? 'bg-white text-gray-900' 
                    : 'text-white hover:bg-white/10'
                }`}
                style={{ fontFamily: 'monospace' }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  billingCycle === 'yearly' 
                    ? 'bg-white text-gray-900' 
                    : 'text-white hover:bg-white/10'
                }`}
                style={{ fontFamily: 'monospace' }}
              >
                Yearly
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'md:-mt-8' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-green-500 text-white px-4 py-1 text-xs font-bold" style={{
                      fontFamily: 'monospace',
                      border: '2px solid #1a1a1a',
                      boxShadow: '2px 2px 0 rgba(0,0,0,0.2)'
                    }}>
                      MOST POPULAR
                    </div>
                  </div>
                )}
                
                <div className={`h-full bg-white p-8 ${plan.popular ? 'pt-12' : ''}`} style={{
                  border: '4px solid #1a1a1a',
                  boxShadow: plan.popular ? '8px 8px 0 rgba(0,0,0,0.3)' : '6px 6px 0 rgba(0,0,0,0.2)'
                }}>
                  <div className={`bg-gradient-to-r ${plan.color} text-white p-4 -mx-8 -mt-8 mb-6`} style={{
                    borderBottom: '4px solid #1a1a1a'
                  }}>
                    <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'monospace' }}>
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold" style={{ fontFamily: 'monospace' }}>
                        £{billingCycle === 'monthly' ? plan.price.monthly : (plan.price.yearly / 12).toFixed(2)}
                      </span>
                      <span className="text-sm" style={{ fontFamily: 'monospace' }}>
                        /month
                      </span>
                    </div>
                    {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                      <p className="text-xs mt-1" style={{ fontFamily: 'monospace' }}>
                        £{plan.price.yearly} billed yearly
                      </p>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-sm" style={{ fontFamily: 'monospace' }}>
                    {plan.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span className="text-gray-700 text-sm" style={{ fontFamily: 'monospace' }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, idx) => (
                      <li key={idx} className="flex items-start gap-2 opacity-60">
                        <span className="text-gray-400 mt-0.5">✗</span>
                        <span className="text-gray-500 text-sm" style={{ fontFamily: 'monospace' }}>
                          {limitation}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href="/signup"
                    className={`block text-center font-bold py-3 px-6 transition-colors ${
                      plan.popular 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                    style={{
                      fontFamily: 'monospace',
                      border: '3px solid rgba(0,0,0,0.2)',
                      boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
                    }}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{
            fontFamily: 'monospace',
            letterSpacing: '0.05em'
          }}>
            Compare Plans
          </h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full" style={{
              border: '4px solid #1a1a1a',
              boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
            }}>
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="p-4 text-left" style={{ fontFamily: 'monospace' }}>Feature</th>
                  <th className="p-4 text-center" style={{ fontFamily: 'monospace' }}>Free</th>
                  <th className="p-4 text-center" style={{ fontFamily: 'monospace' }}>Plus</th>
                  <th className="p-4 text-center" style={{ fontFamily: 'monospace' }}>Premium</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-t-2 border-gray-200">
                  <td className="p-4" style={{ fontFamily: 'monospace' }}>Savings Pots</td>
                  <td className="p-4 text-center" style={{ fontFamily: 'monospace' }}>3</td>
                  <td className="p-4 text-center" style={{ fontFamily: 'monospace' }}>Unlimited</td>
                  <td className="p-4 text-center" style={{ fontFamily: 'monospace' }}>Unlimited</td>
                </tr>
                <tr className="border-t-2 border-gray-200">
                  <td className="p-4" style={{ fontFamily: 'monospace' }}>AI Coach Sessions</td>
                  <td className="p-4 text-center" style={{ fontFamily: 'monospace' }}>-</td>
                  <td className="p-4 text-center" style={{ fontFamily: 'monospace' }}>10/month</td>
                  <td className="p-4 text-center" style={{ fontFamily: 'monospace' }}>Unlimited</td>
                </tr>
                <tr className="border-t-2 border-gray-200">
                  <td className="p-4" style={{ fontFamily: 'monospace' }}>Game Entries</td>
                  <td className="p-4 text-center" style={{ fontFamily: 'monospace' }}>5/month</td>
                  <td className="p-4 text-center" style={{ fontFamily: 'monospace' }}>50/month</td>
                  <td className="p-4 text-center" style={{ fontFamily: 'monospace' }}>Unlimited</td>
                </tr>
                <tr className="border-t-2 border-gray-200">
                  <td className="p-4" style={{ fontFamily: 'monospace' }}>Bank Accounts</td>
                  <td className="p-4 text-center" style={{ fontFamily: 'monospace' }}>1</td>
                  <td className="p-4 text-center" style={{ fontFamily: 'monospace' }}>3</td>
                  <td className="p-4 text-center" style={{ fontFamily: 'monospace' }}>Unlimited</td>
                </tr>
                <tr className="border-t-2 border-gray-200">
                  <td className="p-4" style={{ fontFamily: 'monospace' }}>Crypto Wallet</td>
                  <td className="p-4 text-center text-2xl">❌</td>
                  <td className="p-4 text-center text-2xl">❌</td>
                  <td className="p-4 text-center text-2xl">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{
            fontFamily: 'monospace',
            letterSpacing: '0.05em'
          }}>
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 p-6"
                style={{
                  border: '3px solid #1a1a1a',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.1)'
                }}
              >
                <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'monospace' }}>
                  {faq.question}
                </h3>
                <p className="text-gray-600" style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            textShadow: '3px 3px 0 rgba(0,0,0,0.2)'
          }}>
            Start Your 30-Day Free Trial
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8" style={{
            fontFamily: 'monospace',
            lineHeight: '1.6'
          }}>
            No credit card required. Cancel anytime.
          </p>
          <Link href="/signup" className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-10 inline-block transition-colors" style={{
            fontFamily: 'monospace',
            border: '4px solid #1a1a1a',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)'
          }}>
            Get Started Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
