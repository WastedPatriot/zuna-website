'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [currentSprite, setCurrentSprite] = useState('idle');
  const [savingsProgress, setSavingsProgress] = useState(45); // Example: 45% of goal
  const [totalSaved, setTotalSaved] = useState(2250); // Example: $2,250 saved
  const [savingsGoal, setSavingsGoal] = useState(5000); // Example: $5,000 goal
  const [zunaEarned, setZunaEarned] = useState(450); // ZUNA earned from saving
  
  // Sprite changes based on savings progress
  useEffect(() => {
    if (savingsProgress < 25) {
      setCurrentSprite('sad');
    } else if (savingsProgress < 50) {
      setCurrentSprite('idle');
    } else if (savingsProgress < 75) {
      setCurrentSprite('happy');
    } else {
      setCurrentSprite('waving');
    }
  }, [savingsProgress]);

  // Calculate mood based on savings
  const getMoodText = () => {
    if (savingsProgress < 25) return 'NEEDS ATTENTION';
    if (savingsProgress < 50) return 'GROWING';
    if (savingsProgress < 75) return 'HAPPY';
    return 'THRIVING!';
  };

  const getMoodColor = () => {
    if (savingsProgress < 25) return 'text-red-500';
    if (savingsProgress < 50) return 'text-yellow-500';
    if (savingsProgress < 75) return 'text-green-500';
    return 'text-purple-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 relative overflow-hidden">
      {/* Enhanced Animated Clouds */}
      <div className="absolute inset-0">
        {/* Large fluffy clouds */}
        <div className="cloud cloud1 opacity-90"></div>
        <div className="cloud cloud2 opacity-80"></div>
        <div className="cloud cloud3 opacity-85"></div>
        <div className="cloud cloud4 opacity-75"></div>
        <div className="cloud cloud5 opacity-70"></div>
        
        {/* Small accent clouds */}
        <div className="small-cloud small-cloud1"></div>
        <div className="small-cloud small-cloud2"></div>
        <div className="small-cloud small-cloud3"></div>
      </div>

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

        {/* Hero Section with Smart Tamagotchi */}
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
              
              {/* Savings Goal Progress */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="pixel-text text-sm">SAVINGS GOAL</span>
                  <span className="pixel-text text-sm font-bold">
                    ${totalSaved} / ${savingsGoal}
                  </span>
                </div>
                <div className="bg-gray-200 rounded-full h-6 overflow-hidden pixel-border">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-full transition-all duration-500 flex items-center justify-center"
                    style={{ width: `${savingsProgress}%` }}
                  >
                    <span className="text-xs pixel-text text-white font-bold">
                      {savingsProgress}%
                    </span>
                  </div>
                </div>
              </div>

              {/* ZUNA Rewards */}
              <div className="bg-purple-100 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="pixel-text text-sm">ZUNA EARNED FROM SAVING:</span>
                  <span className="pixel-text text-xl font-bold text-purple-600">
                    {zunaEarned} ZUNA
                  </span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Link href="/login">
                  <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg pixel-border pixel-text shadow-lg transform hover:-translate-y-1 transition-all">
                    START SAVING
                  </button>
                </Link>
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg pixel-border pixel-text shadow-lg transform hover:-translate-y-1 transition-all">
                  LEARN MORE
                </button>
              </div>
            </div>
            
            {/* Smart Tamagotchi Display */}
            <div className="relative">
              <div className="bg-gradient-to-b from-blue-50 to-green-50 rounded-2xl p-6 pixel-border shadow-inner">
                <div className="text-center mb-4">
                  <div className={`text-lg pixel-text font-bold ${getMoodColor()}`}>
                    {getMoodText()}
                  </div>
                  <div className="text-xs pixel-text text-gray-600 mt-1">
                    Pet happiness: {savingsProgress}%
                  </div>
                </div>
                
                {/* Sprite Display */}
                <div className="relative h-48 flex justify-center items-center bg-gradient-to-b from-transparent to-green-100 rounded-lg">
                  <img 
                    src={`/sprites/${currentSprite === 'idle' ? 'idleblink' : currentSprite}.webp`}
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
                
                {/* Pet Stats connected to savings */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="pixel-text text-xs">HAPPINESS</span>
                    <div className="bg-gray-200 rounded-full h-3 w-32 overflow-hidden">
                      <div 
                        className="bg-yellow-400 h-full transition-all duration-500"
                        style={{ width: `${savingsProgress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="pixel-text text-xs">GROWTH</span>
                    <div className="bg-gray-200 rounded-full h-3 w-32 overflow-hidden">
                      <div 
                        className="bg-green-400 h-full transition-all duration-500"
                        style={{ width: `${Math.min(savingsProgress * 1.2, 100)}%` }}
                      />
                    </div>
                  </div>
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