'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [currentSprite, setCurrentSprite] = useState('idle');
  const [frame, setFrame] = useState(0);
  
  // Simple sprite animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 2);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 to-blue-600 relative">
      {/* Animated Clouds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 pixel-text">ZUNA</h1>
          <p className="text-xl text-white pixel-text">YOUR DIGITAL FINANCIAL PET</p>
        </header>

        {/* Hero Section with Mascot */}
        <div className="bg-white/90 rounded-lg p-8 mb-8 pixel-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4 pixel-text">Take care of your money,</h2>
              <h3 className="text-2xl mb-4 pixel-text">take care of your pet.</h3>
              <p className="text-lg mb-6 pixel-text">Watch them both grow together!</p>
              
              <div className="flex gap-4">
                <Link href="/login">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded pixel-border pixel-text">
                    START NOW
                  </button>
                </Link>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded pixel-border pixel-text">
                  EARN MORE
                </button>
              </div>
            </div>
            
            {/* Mascot Display */}
            <div className="relative w-64 h-64 bg-gradient-to-b from-green-100 to-green-200 rounded-lg pixel-border p-4">
              <div className="text-center mb-4">
                <div className="text-sm pixel-text">MOOD: HAPPY</div>
                <div className="text-xs pixel-text text-gray-600">76% HAPPY</div>
              </div>
              
              {/* Sprite Container */}
              <div className="flex justify-center items-center h-32">
                <img 
                  src="/sprites/idleblink.webp" 
                  alt="Zuna Pet"
                  className="pixelated"
                  style={{
                    imageRendering: 'pixelated',
                    width: '128px',
                    height: '128px',
                    objectFit: 'contain'
                  }}
                />
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-center gap-4 mt-4">
                <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded pixel-text text-sm">
                  FEED
                </button>
                <button className="px-4 py-2 bg-purple-400 hover:bg-purple-500 rounded pixel-text text-sm">
                  PLAY
                </button>
                <button className="px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded pixel-text text-sm">
                  SLEEP
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-black/80 text-green-400 p-4 rounded mb-8 pixel-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold pixel-text">100K+</div>
              <div className="text-sm pixel-text">Active Players</div>
            </div>
            <div>
              <div className="text-2xl font-bold pixel-text">$50K+</div>
              <div className="text-sm pixel-text">Saved</div>
            </div>
            <div>
              <div className="text-2xl font-bold pixel-text">2M</div>
              <div className="text-sm pixel-text">ZUNA Earned</div>
            </div>
            <div>
              <div className="text-2xl font-bold pixel-text">500+</div>
              <div className="text-sm pixel-text">Daily Winners</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/90 p-6 rounded pixel-border">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-bold mb-2 pixel-text">Play & Earn</h3>
            <p className="pixel-text text-sm">Play Tetris, care for your pet, and earn ZUNA tokens!</p>
          </div>
          
          <div className="bg-white/90 p-6 rounded pixel-border">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2 pixel-text">Smart Savings</h3>
            <p className="pixel-text text-sm">Set savings goals and watch your pet grow happier!</p>
          </div>
          
          <div className="bg-white/90 p-6 rounded pixel-border">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2 pixel-text">AI Coach</h3>
            <p className="pixel-text text-sm">Get personalized financial advice (Premium)</p>
          </div>
        </div>

        {/* Banking Features */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded mb-8 pixel-border text-white">
          <h2 className="text-3xl font-bold mb-6 pixel-text text-center">REAL BANKING + GAMING</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 pixel-text">BANKING</h3>
              <ul className="space-y-2">
                <li className="pixel-text">✓ Send & receive money</li>
                <li className="pixel-text">✓ Track spending</li>
                <li className="pixel-text">✓ Savings pots</li>
                <li className="pixel-text">✓ Bill reminders</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 pixel-text">CRYPTO</h3>
              <ul className="space-y-2">
                <li className="pixel-text">✓ ZUNA wallet</li>
                <li className="pixel-text">✓ Earn by playing</li>
                <li className="pixel-text">✓ Trade tokens</li>
                <li className="pixel-text">✓ Daily rewards</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-white">
          <p className="pixel-text">© 2025 ZUNA - Your Digital Financial Pet</p>
          <p className="pixel-text text-sm mt-2">Banking reimagined</p>
        </footer>
      </div>
    </div>
  );
}