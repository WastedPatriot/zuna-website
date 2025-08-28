'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CloudBackground from './components/CloudBackground';

export default function Home() {
  const [mascotMood, setMascotMood] = useState<'idle' | 'happy' | 'gaming'>('idle');
  
  useEffect(() => {
    const interval = setInterval(() => {
      const moods: ('idle' | 'happy' | 'gaming')[] = ['idle', 'happy', 'gaming'];
      setMascotMood(moods[Math.floor(Math.random() * moods.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-200 relative overflow-hidden">
      <CloudBackground />
      
      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-3 pixel-text drop-shadow-lg">
            ZUNA
          </h1>
          <p className="text-lg md:text-xl text-white pixel-text drop-shadow">
            YOUR DIGITAL FINANCIAL PET
          </p>
        </header>

        {/* Hero Section */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-6 md:p-8 mb-8 pixel-border shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 pixel-text">
                Save Money, Grow Your Pet
              </h2>
              <p className="text-base md:text-lg mb-6 pixel-text">
                Your pet's happiness is tied to your savings goals. 
                The more you save, the happier it becomes!
              </p>
              
              <div className="flex gap-4">
                <Link href="/login">
                  <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg pixel-border pixel-text shadow-lg transform hover:-translate-y-1 transition-all">
                    START SAVING
                  </button>
                </Link>
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg pixel-border pixel-text shadow-lg transform hover:-translate-y-1 transition-all">
                  LEARN MORE
                </button>
              </div>
            </div>
            
            {/* Simple Mascot Display */}
            <div className="relative">
              <div className="bg-gradient-to-b from-blue-50 to-green-50 rounded-2xl p-6 pixel-border shadow-inner">
                <div className="text-center mb-4">
                  <div className="text-lg pixel-text font-bold text-purple-600">
                    YOUR FINANCIAL FRIEND
                  </div>
                </div>
                
                {/* Simple mascot placeholder */}
                <div className="relative h-48 flex justify-center items-center bg-gradient-to-b from-transparent to-green-100 rounded-lg">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-4xl">
                    🐾
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  <p className="pixel-text text-sm text-gray-600">
                    Download the app to meet your pet!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-6 md:p-8 mb-8 pixel-border shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 pixel-text text-center">
            HOW ZUNA WORKS
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-lg font-bold mb-2 pixel-text">SET GOALS</h3>
              <p className="pixel-text text-sm">
                Create savings pots for your dreams - vacation, car, emergency fund
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-lg font-bold mb-2 pixel-text">SAVE & GROW</h3>
              <p className="pixel-text text-sm">
                Every dollar saved makes your pet happier and earns you ZUNA tokens
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-lg font-bold mb-2 pixel-text">PLAY & EARN</h3>
              <p className="pixel-text text-sm">
                Play monthly games with prizes to win and earn ZUNA tokens
              </p>
            </div>
          </div>
        </div>

        {/* Live Stats Bar */}
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 text-white p-4 rounded-xl mb-8 pixel-border shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl md:text-2xl font-bold pixel-text">100K+</div>
              <div className="text-xs pixel-text opacity-90">Happy Pets</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold pixel-text">$2.5M</div>
              <div className="text-xs pixel-text opacity-90">Total Saved</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold pixel-text">50M</div>
              <div className="text-xs pixel-text opacity-90">ZUNA Earned</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold pixel-text">95%</div>
              <div className="text-xs pixel-text opacity-90">Goals Reached</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/95 backdrop-blur p-6 rounded-xl pixel-border shadow-xl">
            <h3 className="text-xl font-bold mb-4 pixel-text flex items-center">
              <span className="text-2xl mr-3">🏦</span> REAL BANKING
            </h3>
            <ul className="space-y-2 pixel-text text-sm">
              <li>✓ Connect your bank account</li>
              <li>✓ Automated savings rules</li>
              <li>✓ Round-up transactions</li>
              <li>✓ Bill management</li>
            </ul>
          </div>
          
          <div className="bg-white/95 backdrop-blur p-6 rounded-xl pixel-border shadow-xl">
            <h3 className="text-xl font-bold mb-4 pixel-text flex items-center">
              <span className="text-2xl mr-3">🪙</span> ZUNA REWARDS
            </h3>
            <ul className="space-y-2 pixel-text text-sm">
              <li>✓ Earn tokens by saving</li>
              <li>✓ Daily login rewards</li>
              <li>✓ Achievement bonuses</li>
              <li>✓ Trade & redeem tokens</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl pixel-border shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 pixel-text">
            START YOUR FINANCIAL JOURNEY
          </h2>
          <p className="pixel-text mb-6">
            Save money, grow your pet, earn ZUNA tokens
          </p>
          <Link href="/signup">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg pixel-border pixel-text font-bold shadow-lg transform hover:-translate-y-1 transition-all">
              GET STARTED NOW
            </button>
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-center text-white mt-12">
          <p className="pixel-text text-sm">© 2025 ZUNA - Where Savings Meet Gaming</p>
          <p className="pixel-text text-xs mt-2 opacity-80">
            Your pet grows with your financial future
          </p>
        </footer>
      </div>
    </div>
  );
}