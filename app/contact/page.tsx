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

export default function ContactPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form:', formData);
  };

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

        {/* Contact Section */}
        <div className="flex-1 container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{
              fontFamily: pixelFont.style.fontFamily,
              color: '#FFFFFF',
              textShadow: '4px 4px 0 rgba(0,0,0,0.3)'
            }}>
              Contact Us
            </h1>
            <p style={{
              fontFamily: pixelFont.style.fontFamily,
              color: '#FFFFFF',
              fontSize: '14px'
            }}>
              We'd love to hear from you!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div style={{
              backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.95)' : 'rgba(255,255,255,0.95)',
              border: '4px solid',
              borderColor: isDarkMode ? '#667eea' : '#4A90E2',
              boxShadow: '8px 8px 0 rgba(0,0,0,0.3)',
              padding: '32px',
              imageRendering: 'pixelated'
            }}>
              <h2 className="mb-6" style={{
                fontFamily: pixelFont.style.fontFamily,
                fontSize: '18px',
                color: isDarkMode ? '#FFFFFF' : '#1a1a1a'
              }}>
                Send Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2" style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '10px',
                    color: isDarkMode ? '#B0B0B0' : '#666666'
                  }}>
                    NAME
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full px-3 py-2"
                    style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '11px',
                      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
                      border: '2px solid',
                      borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                      color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2" style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '10px',
                    color: isDarkMode ? '#B0B0B0' : '#666666'
                  }}>
                    EMAIL
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full px-3 py-2"
                    style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '11px',
                      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
                      border: '2px solid',
                      borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                      color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2" style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '10px',
                    color: isDarkMode ? '#B0B0B0' : '#666666'
                  }}>
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                    className="w-full px-3 py-2"
                    style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '11px',
                      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
                      border: '2px solid',
                      borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                      color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2" style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '10px',
                    color: isDarkMode ? '#B0B0B0' : '#666666'
                  }}>
                    MESSAGE
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    rows={5}
                    className="w-full px-3 py-2"
                    style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '11px',
                      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
                      border: '2px solid',
                      borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                      color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-white transition-all hover:scale-105"
                  style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '12px',
                    backgroundColor: '#10b981',
                    border: '4px solid #065f46',
                    boxShadow: '4px 4px 0 #000',
                    imageRendering: 'pixelated'
                  }}
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Mascot */}
              <div className="flex justify-center mb-8">
                <div style={{
                  width: '128px',
                  height: '128px',
                  position: 'relative',
                  isolation: 'isolate',
                  zIndex: 10
                }}>
                  <Image
                    src="/sprites/waving.webp"
                    alt="ZUNA Waving"
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

              <div className="space-y-4">
                {[
                  { icon: '📧', label: 'EMAIL', value: 'hello@zuna.app' },
                  { icon: '💬', label: 'DISCORD', value: 'discord.gg/zuna' },
                  { icon: '🐦', label: 'TWITTER', value: '@zunafinance' },
                  { icon: '📍', label: 'LOCATION', value: 'London, UK' }
                ].map((item, index) => (
                  <div key={index} className="p-4" style={{
                    backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.8)' : 'rgba(255,255,255,0.9)',
                    border: '3px solid',
                    borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                    imageRendering: 'pixelated'
                  }}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p style={{
                          fontFamily: pixelFont.style.fontFamily,
                          fontSize: '10px',
                          color: isDarkMode ? '#B0B0B0' : '#666666'
                        }}>
                          {item.label}
                        </p>
                        <p style={{
                          fontFamily: pixelFont.style.fontFamily,
                          fontSize: '12px',
                          color: isDarkMode ? '#FFFFFF' : '#1a1a1a'
                        }}>
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4" style={{
                backgroundColor: isDarkMode ? 'rgba(102, 126, 234, 0.1)' : 'rgba(74, 144, 226, 0.1)',
                border: '3px solid #FFD700',
                imageRendering: 'pixelated'
              }}>
                <h3 style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '12px',
                  color: '#FFD700',
                  marginBottom: '8px'
                }}>
                  SUPPORT HOURS
                </h3>
                <p style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '10px',
                  color: isDarkMode ? '#B0B0B0' : '#666666'
                }}>
                  MON-FRI: 9AM-6PM GMT<br/>
                  SAT-SUN: 10AM-4PM GMT
                </p>
              </div>
            </div>
          </div>
        </div>

        <GrassyBottom />
      </div>
    </PixelBackground>
  );
}