'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SpriteAnimation from '../components/SpriteAnimation';
import { useAuth0 } from '../providers/Auth0Provider';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user, logout } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-400 to-sky-300">
        <div className="text-center">
          <SpriteAnimation
            sprite="/sprites/jumping.webp"
            frames={4}
            frameRate={200}
            size={128}
            alt="Loading"
          />
          <p className="text-white text-xl mt-4" style={{ fontFamily: 'monospace' }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    { label: 'Total Saved', value: '£2,456', icon: '💰', color: 'from-green-400 to-green-600' },
    { label: 'Games Won', value: '12', icon: '🏆', color: 'from-blue-400 to-blue-600' },
    { label: 'Pet Happiness', value: '95%', icon: '😊', color: 'from-purple-400 to-purple-600' },
    { label: 'ZUNA Tokens', value: '450', icon: '🪙', color: 'from-yellow-400 to-yellow-600' },
  ];

  const recentActivity = [
    { date: '2025-08-30', type: 'save', description: 'Added £50 to Holiday Fund', amount: '+£50' },
    { date: '2025-08-29', type: 'game', description: 'Won Tetris Tournament', amount: '+50 ZUNA' },
    { date: '2025-08-28', type: 'achievement', description: 'Unlocked "Super Saver" badge', amount: '' },
    { date: '2025-08-27', type: 'save', description: 'Created new pot: Car Fund', amount: '' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Dashboard Header */}
      <section className="bg-gradient-to-b from-sky-400 to-sky-300 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2" style={{
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
                textShadow: '3px 3px 0 rgba(0,0,0,0.3)'
              }}>
                Welcome back, {user?.name || 'Saver'}!
              </h1>
              <p className="text-white/90" style={{ fontFamily: 'monospace' }}>
                Your financial adventure continues...
              </p>
            </div>
            <div className="hidden md:block">
              <SpriteAnimation
                sprite="/sprites/waving.webp"
                frames={4}
                frameRate={200}
                size={80}
                alt="Welcome"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-r ${stat.color} p-6 text-white`}
                style={{
                  border: '4px solid #1a1a1a',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.2)'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{stat.icon}</span>
                  <span className="text-2xl font-bold" style={{ fontFamily: 'monospace' }}>
                    {stat.value}
                  </span>
                </div>
                <p className="text-sm" style={{ fontFamily: 'monospace' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6" style={{
                border: '4px solid #1a1a1a',
                boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
              }}>
                <h2 className="text-xl font-bold text-gray-900 mb-6" style={{
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em'
                }}>
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <Link href="/app" className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 text-center transition-colors" style={{
                    fontFamily: 'monospace',
                    border: '3px solid rgba(0,0,0,0.2)',
                    boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
                  }}>
                    📱 Open Mobile App
                  </Link>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 transition-colors" style={{
                    fontFamily: 'monospace',
                    border: '3px solid rgba(0,0,0,0.2)',
                    boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
                  }}>
                    💰 Add to Savings
                  </button>
                  <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 transition-colors" style={{
                    fontFamily: 'monospace',
                    border: '3px solid rgba(0,0,0,0.2)',
                    boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
                  }}>
                    🎮 Play Game
                  </button>
                  <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 transition-colors" style={{
                    fontFamily: 'monospace',
                    border: '3px solid rgba(0,0,0,0.2)',
                    boxShadow: '3px 3px 0 rgba(0,0,0,0.2)'
                  }}>
                    🐾 Visit Pet
                  </button>
                </div>
              </div>

              {/* Pet Status */}
              <div className="bg-white p-6 mt-6" style={{
                border: '4px solid #1a1a1a',
                boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
              }}>
                <h2 className="text-xl font-bold text-gray-900 mb-4" style={{
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em'
                }}>
                  Your ZUNA Pet
                </h2>
                <div className="flex justify-center mb-4">
                  <SpriteAnimation
                    sprite="/sprites/happy.webp"
                    frames={4}
                    frameRate={200}
                    size={128}
                    alt="ZUNA Pet"
                  />
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1" style={{ fontFamily: 'monospace' }}>
                      <span>Happiness</span>
                      <span>95%</span>
                    </div>
                    <div className="bg-gray-200 h-3" style={{ border: '2px solid #1a1a1a' }}>
                      <div className="bg-green-500 h-full" style={{ width: '95%' }} />
                    </div>
                  </div>
                  <p className="text-center text-gray-600 text-sm mt-3" style={{ fontFamily: 'monospace' }}>
                    "Keep saving! I'm so happy!"
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6" style={{
                border: '4px solid #1a1a1a',
                boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
              }}>
                <h2 className="text-xl font-bold text-gray-900 mb-6" style={{
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em'
                }}>
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-gray-50"
                      style={{
                        border: '2px solid #1a1a1a'
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">
                          {activity.type === 'save' && '💰'}
                          {activity.type === 'game' && '🎮'}
                          {activity.type === 'achievement' && '🏆'}
                        </span>
                        <div>
                          <p className="font-bold text-gray-900" style={{ fontFamily: 'monospace' }}>
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-500" style={{ fontFamily: 'monospace' }}>
                            {activity.date}
                          </p>
                        </div>
                      </div>
                      {activity.amount && (
                        <span className="font-bold text-green-600" style={{ fontFamily: 'monospace' }}>
                          {activity.amount}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
                <Link href="/activity" className="block text-center mt-6 text-green-600 hover:text-green-700 font-bold" style={{ fontFamily: 'monospace' }}>
                  View All Activity →
                </Link>
              </div>

              {/* Savings Goals */}
              <div className="bg-white p-6 mt-6" style={{
                border: '4px solid #1a1a1a',
                boxShadow: '6px 6px 0 rgba(0,0,0,0.1)'
              }}>
                <h2 className="text-xl font-bold text-gray-900 mb-6" style={{
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em'
                }}>
                  Savings Goals
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold" style={{ fontFamily: 'monospace' }}>🏖️ Holiday Fund</span>
                      <span className="text-sm text-gray-600" style={{ fontFamily: 'monospace' }}>£1,200 / £2,000</span>
                    </div>
                    <div className="bg-gray-200 h-4" style={{ border: '2px solid #1a1a1a' }}>
                      <div className="bg-blue-500 h-full" style={{ width: '60%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold" style={{ fontFamily: 'monospace' }}>🚗 Car Fund</span>
                      <span className="text-sm text-gray-600" style={{ fontFamily: 'monospace' }}>£500 / £5,000</span>
                    </div>
                    <div className="bg-gray-200 h-4" style={{ border: '2px solid #1a1a1a' }}>
                      <div className="bg-green-500 h-full" style={{ width: '10%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold" style={{ fontFamily: 'monospace' }}>🎮 PS5 Fund</span>
                      <span className="text-sm text-gray-600" style={{ fontFamily: 'monospace' }}>£380 / £450</span>
                    </div>
                    <div className="bg-gray-200 h-4" style={{ border: '2px solid #1a1a1a' }}>
                      <div className="bg-purple-500 h-full" style={{ width: '84%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
