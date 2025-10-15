'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PhoneMockupProps {
  isDarkMode: boolean;
}

const screens = [
  {
    id: 'home',
    title: 'Home Screen',
    description: 'Your financial companion',
    sprite: 'happy',
    features: ['Balance Overview', 'Quick Actions', 'Savings Goals']
  },
  {
    id: 'savings',
    title: 'Savings Pots',
    description: 'Watch your money grow',
    sprite: 'savings',
    features: ['Visual Savings', 'Goal Tracking', 'Rewards']
  },
  {
    id: 'coach',
    title: 'AI Coach',
    description: 'Smart financial advice',
    sprite: 'speaking',
    features: ['Personalized Tips', 'Spending Analysis', 'Goal Setting']
  },
  {
    id: 'crypto',
    title: 'Crypto Wallet',
    description: 'Digital assets made easy',
    sprite: 'gaming',
    features: ['Buy & Sell', 'Portfolio Tracking', 'Security']
  }
];

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ isDarkMode }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleScreenSelect = (index: number) => {
    setCurrentScreen(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Phone Mockup */}
        <div className="relative">
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            {/* Phone Frame */}
            <div 
              className="relative w-[320px] h-[640px] rounded-[40px] p-3"
              style={{
                backgroundColor: isDarkMode ? '#1a1a1a' : '#333',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(255,255,255,0.1)'
              }}
            >
              {/* Screen */}
              <div 
                className="relative w-full h-full rounded-[30px] overflow-hidden"
                style={{
                  backgroundColor: isDarkMode ? '#0F0B1E' : '#87CEEB'
                }}
              >
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-8 flex justify-between items-center px-4 z-20"
                     style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
                  <span className="text-white text-xs font-mono">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-3 bg-white rounded-sm"></div>
                    <div className="w-1 h-3 bg-white rounded-sm"></div>
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                  </div>
                </div>

                {/* App Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScreen}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                    className="absolute inset-0 pt-8"
                  >
                    {/* Current Screen */}
                    <div className="h-full flex flex-col items-center justify-center p-8">
                      {/* Sprite */}
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="mb-6"
                      >
                        <Image
                          src={`/sprites/${screens[currentScreen].sprite}.webp`}
                          alt="ZUNA Mascot"
                          width={120}
                          height={120}
                          className={isDarkMode ? 'sprite-img sprite-dark-mode' : 'sprite-img'}
                          style={{ 
                            imageRendering: 'pixelated',
                            filter: isDarkMode ? 'drop-shadow(0 0 2px white)' : 'none'
                          }}
                          unoptimized
                        />
                      </motion.div>

                      {/* Screen Title */}
                      <h3 className="text-white text-xl font-bold mb-2 font-mono">
                        {screens[currentScreen].title}
                      </h3>
                      <p className="text-white/80 text-sm mb-6 font-mono text-center">
                        {screens[currentScreen].description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 w-full">
                        {screens[currentScreen].features.map((feature, index) => (
                          <motion.div
                            key={feature}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-center"
                          >
                            <span className="text-white text-xs font-mono">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/20 backdrop-blur-sm flex justify-around items-center">
                      {['home', 'wallet', 'plus', 'chart', 'user'].map((icon, index) => (
                        <div
                          key={icon}
                          className={`w-8 h-8 rounded-lg ${
                            index === currentScreen ? 'bg-white/30' : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Notch */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-10" />
            </div>
          </motion.div>
        </div>

        {/* Screen Selector */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold mb-4" style={{
            fontFamily: '"Press Start 2P", monospace',
            color: isDarkMode ? '#FFFFFF' : '#1a1a1a'
          }}>
            App Features
          </h3>
          
          {screens.map((screen, index) => (
            <motion.button
              key={screen.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScreenSelect(index)}
              className={`text-left p-4 rounded-lg transition-all ${
                currentScreen === index
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : isDarkMode 
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-black/10 text-black hover:bg-black/20'
              }`}
              style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '12px',
                boxShadow: currentScreen === index ? '4px 4px 0 rgba(0,0,0,0.3)' : 'none'
              }}
            >
              <div className="mb-1">{screen.title}</div>
              <div className="text-xs opacity-80 font-sans">
                {screen.description}
              </div>
            </motion.button>
          ))}

          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="mt-4 px-4 py-2 rounded-lg text-sm"
            style={{
              fontFamily: '"Press Start 2P", monospace',
              backgroundColor: isAutoPlaying ? '#10b981' : '#6b7280',
              color: 'white',
              boxShadow: '2px 2px 0 rgba(0,0,0,0.3)'
            }}
          >
            {isAutoPlaying ? 'Pause' : 'Play'} Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
