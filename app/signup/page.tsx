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

export default function SignUpPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log('Sign up:', formData);
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

        {/* Sign Up Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div style={{
              backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.95)' : 'rgba(255,255,255,0.95)',
              border: '4px solid',
              borderColor: isDarkMode ? '#667eea' : '#4A90E2',
              boxShadow: '8px 8px 0 rgba(0,0,0,0.3)',
              padding: '32px',
              imageRendering: 'pixelated'
            }}>
              {/* Mascot */}
              <div className="flex justify-center mb-6">
                <div style={{
                  width: '96px',
                  height: '96px',
                  position: 'relative',
                  isolation: 'isolate',
                  zIndex: 10
                }}>
                  <Image
                    src="/sprites/happy.webp"
                    alt="ZUNA Happy"
                    width={96}
                    height={96}
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

              <h1 className="text-center mb-8" style={{
                fontFamily: pixelFont.style.fontFamily,
                fontSize: '24px',
                color: isDarkMode ? '#FFFFFF' : '#1a1a1a'
              }}>
                JOIN ZUNA
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2" style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '12px',
                    color: isDarkMode ? '#B0B0B0' : '#666666'
                  }}>
                    NAME
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full px-4 py-3"
                    style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '12px',
                      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
                      border: '2px solid',
                      borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                      color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                      outline: 'none',
                      imageRendering: 'pixelated'
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2" style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '12px',
                    color: isDarkMode ? '#B0B0B0' : '#666666'
                  }}>
                    EMAIL
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full px-4 py-3"
                    style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '12px',
                      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
                      border: '2px solid',
                      borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                      color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                      outline: 'none',
                      imageRendering: 'pixelated'
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2" style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '12px',
                    color: isDarkMode ? '#B0B0B0' : '#666666'
                  }}>
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    className="w-full px-4 py-3"
                    style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '12px',
                      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
                      border: '2px solid',
                      borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                      color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                      outline: 'none',
                      imageRendering: 'pixelated'
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2" style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '12px',
                    color: isDarkMode ? '#B0B0B0' : '#666666'
                  }}>
                    CONFIRM PASSWORD
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                    className="w-full px-4 py-3"
                    style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '12px',
                      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
                      border: '2px solid',
                      borderColor: isDarkMode ? '#667eea' : '#4A90E2',
                      color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                      outline: 'none',
                      imageRendering: 'pixelated'
                    }}
                  />
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="terms" className="mr-2" required />
                  <label htmlFor="terms" style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '10px',
                    color: isDarkMode ? '#B0B0B0' : '#666666'
                  }}>
                    I AGREE TO THE{' '}
                    <Link href="/terms" className="underline" style={{ color: '#667eea' }}>
                      TERMS
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 text-white transition-all hover:scale-105"
                  style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '14px',
                    backgroundColor: '#10b981',
                    border: '4px solid #065f46',
                    boxShadow: '4px 4px 0 #000',
                    imageRendering: 'pixelated'
                  }}
                >
                  CREATE ACCOUNT
                </button>
              </form>

              <div className="mt-6 text-center">
                <p style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '10px',
                  color: isDarkMode ? '#B0B0B0' : '#666666'
                }}>
                  ALREADY HAVE AN ACCOUNT?
                </p>
                <Link href="/signin" className="inline-block mt-2" style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '12px',
                  color: '#667eea'
                }}>
                  SIGN IN →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <GrassyBottom />
      </div>
    </PixelBackground>
  );
}