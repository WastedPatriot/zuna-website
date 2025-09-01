'use client';

import { useState } from 'react';
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

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Mock data
  const userStats = {
    totalSavings: '£2,456',
    monthlyGrowth: '+12%',
    zunaTokens: '1,250',
    petHappiness: 85
  };

  const savingsPots = [
    { name: 'Holiday', amount: '£850', progress: 70, color: '#10b981' },
    { name: 'Emergency', amount: '£1,200', progress: 40, color: '#667eea' },
    { name: 'Gaming PC', amount: '£406', progress: 25, color: '#FFD700' }
  ];

  const recentActivity = [
    { type: 'deposit', amount: '+£50', pot: 'Holiday', date: 'Today' },
    { type: 'reward', amount: '+25 ZUNA', pot: 'Daily Challenge', date: 'Yesterday' },
    { type: 'deposit', amount: '+£100', pot: 'Emergency', date: '3 days ago' }
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

        {/* Dashboard Content */}
        <div className="flex-1 container mx-auto px-6 py-12">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 style={{
              fontFamily: pixelFont.style.fontFamily,
              fontSize: '28px',
              color: '#FFFFFF',
              textShadow: '3px 3px 0 rgba(0,0,0,0.3)'
            }}>
              Welcome Back!
            </h1>
            <p style={{
              fontFamily: pixelFont.style.fontFamily,
              fontSize: '12px',
              color: '#B0B0B0',
              marginTop: '8px'
            }}>
              Your financial adventure continues...
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4" style={{
                  backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.95)' : 'rgba(255,255,255,0.95)',
                  border: '4px solid #10b981',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.2)',
                  imageRendering: 'pixelated'
                }}>
                  <p style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '10px',
                    color: isDarkMode ? '#B0B0B0' : '#666666'
                  }}>
                    TOTAL SAVINGS
                  </p>
                  <p style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '24px',
                    color: '#10b981',
                    marginTop: '8px'
                  }}>
                    {userStats.totalSavings}
                  </p>
                </div>

                <div className="p-4" style={{
                  backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.95)' : 'rgba(255,255,255,0.95)',
                  border: '4px solid #667eea',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.2)',
                  imageRendering: 'pixelated'
                }}>
                  <p style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '10px',
                    color: isDarkMode ? '#B0B0B0' : '#666666'
                  }}>
                    THIS MONTH
                  </p>
                  <p style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '24px',
                    color: '#667eea',
                    marginTop: '8px'
                  }}>
                    {userStats.monthlyGrowth}
                  </p>
                </div>
              </div>

              {/* Savings Pots */}
              <div className="p-6" style={{
                backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.95)' : 'rgba(255,255,255,0.95)',
                border: '4px solid',
                borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                boxShadow: '8px 8px 0 rgba(0,0,0,0.2)',
                imageRendering: 'pixelated'
              }}>
                <h2 className="mb-6" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '16px',
                  color: isDarkMode ? '#FFFFFF' : '#1a1a1a'
                }}>
                  SAVINGS POTS
                </h2>

                <div className="space-y-4">
                  {savingsPots.map((pot, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span style={{
                          fontFamily: pixelFont.style.fontFamily,
                          fontSize: '12px',
                          color: isDarkMode ? '#FFFFFF' : '#1a1a1a'
                        }}>
                          {pot.name}
                        </span>
                        <span style={{
                          fontFamily: pixelFont.style.fontFamily,
                          fontSize: '12px',
                          color: pot.color
                        }}>
                          {pot.amount}
                        </span>
                      </div>
                      <div style={{
                        height: '20px',
                        backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)',
                        border: '2px solid',
                        borderColor: pot.color,
                        position: 'relative',
                        imageRendering: 'pixelated'
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${pot.progress}%`,
                          backgroundColor: pot.color,
                          imageRendering: 'pixelated'
                        }} />
                        <span style={{
                          position: 'absolute',
                          right: '8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontFamily: pixelFont.style.fontFamily,
                          fontSize: '10px',
                          color: '#FFFFFF'
                        }}>
                          {pot.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '12px',
                  backgroundColor: 'transparent',
                  color: '#667eea',
                  border: '2px solid #667eea'
                }}>
                  + ADD NEW POT
                </button>
              </div>

              {/* Recent Activity */}
              <div className="p-6" style={{
                backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.95)' : 'rgba(255,255,255,0.95)',
                border: '4px solid',
                borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                boxShadow: '8px 8px 0 rgba(0,0,0,0.2)',
                imageRendering: 'pixelated'
              }}>
                <h2 className="mb-6" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '16px',
                  color: isDarkMode ? '#FFFFFF' : '#1a1a1a'
                }}>
                  RECENT ACTIVITY
                </h2>

                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex justify-between items-center p-3" style={{
                      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)',
                      border: '2px solid',
                      borderColor: activity.type === 'reward' ? '#FFD700' : '#10b981'
                    }}>
                      <div>
                        <p style={{
                          fontFamily: pixelFont.style.fontFamily,
                          fontSize: '11px',
                          color: isDarkMode ? '#FFFFFF' : '#1a1a1a'
                        }}>
                          {activity.pot}
                        </p>
                        <p style={{
                          fontFamily: pixelFont.style.fontFamily,
                          fontSize: '9px',
                          color: isDarkMode ? '#B0B0B0' : '#666666'
                        }}>
                          {activity.date}
                        </p>
                      </div>
                      <span style={{
                        fontFamily: pixelFont.style.fontFamily,
                        fontSize: '14px',
                        color: activity.type === 'reward' ? '#FFD700' : '#10b981'
                      }}>
                        {activity.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Pet Status */}
              <div className="p-6" style={{
                backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.95)' : 'rgba(255,255,255,0.95)',
                border: '4px solid #FFD700',
                boxShadow: '8px 8px 0 rgba(0,0,0,0.2)',
                imageRendering: 'pixelated'
              }}>
                <h3 className="mb-4" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '14px',
                  color: '#FFD700'
                }}>
                  YOUR BUDDY
                </h3>

                <div className="flex justify-center mb-4">
                  <div style={{
                    width: '128px',
                    height: '128px',
                    position: 'relative',
                    isolation: 'isolate',
                    zIndex: 10
                  }}>
                    <Image
                      src="/sprites/happy.webp"
                      alt="ZUNA Happy"
                      width={128}
                      height={128}
                      style={{
                        imageRendering: 'pixelated',
                        filter: 'brightness(1) contrast(1)',
                        opacity: 1
                      }}
                      unoptimized
                      priority
                    />
                  </div>
                </div>

                <div>
                  <p style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '10px',
                    color: isDarkMode ? '#B0B0B0' : '#666666',
                    marginBottom: '4px'
                  }}>
                    HAPPINESS
                  </p>
                  <div style={{
                    height: '16px',
                    backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)',
                    border: '2px solid #FFD700',
                    position: 'relative'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${userStats.petHappiness}%`,
                      backgroundColor: '#FFD700'
                    }} />
                  </div>
                  <p style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '12px',
                    color: '#FFD700',
                    marginTop: '8px',
                    textAlign: 'center'
                  }}>
                    {userStats.petHappiness}% HAPPY
                  </p>
                </div>
              </div>

              {/* ZUNA Tokens */}
              <div className="p-6" style={{
                backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.95)' : 'rgba(255,255,255,0.95)',
                border: '4px solid #F0A000',
                boxShadow: '8px 8px 0 rgba(0,0,0,0.2)',
                imageRendering: 'pixelated'
              }}>
                <h3 className="mb-4" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '14px',
                  color: '#F0A000'
                }}>
                  ZUNA TOKENS
                </h3>

                <p style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '28px',
                  color: '#F0A000',
                  textAlign: 'center',
                  marginBottom: '16px'
                }}>
                  {userStats.zunaTokens}
                </p>

                <button className="w-full py-2" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '11px',
                  backgroundColor: '#F0A000',
                  color: '#000',
                  border: '2px solid #B87800'
                }}>
                  REDEEM
                </button>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <Link href="/game" className="block">
                  <button className="w-full py-3" style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '12px',
                    backgroundColor: '#667eea',
                    color: '#FFFFFF',
                    border: '3px solid #4A5FC1',
                    boxShadow: '4px 4px 0 #000'
                  }}>
                    PLAY GAME
                  </button>
                </Link>
                
                <button className="w-full py-3" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '12px',
                  backgroundColor: '#10b981',
                  color: '#FFFFFF',
                  border: '3px solid #065f46',
                  boxShadow: '4px 4px 0 #000'
                }}>
                  ADD FUNDS
                </button>
              </div>
            </div>
          </div>
        </div>

        <GrassyBottom />
      </div>
    </PixelBackground>
  );
}