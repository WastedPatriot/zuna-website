'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PixelMascot from './PixelMascot';

export default function TamagotchiDisplay() {
  const [happiness, setHappiness] = useState(75);
  const [hunger, setHunger] = useState(50);
  const [energy, setEnergy] = useState(80);
  const [currentMood, setCurrentMood] = useState<'idle' | 'happy' | 'sad' | 'eating' | 'gaming'>('idle');
  
  // Simulate stats changing
  useEffect(() => {
    const interval = setInterval(() => {
      setHappiness(prev => Math.max(0, prev - 1));
      setHunger(prev => Math.min(100, prev + 1));
      setEnergy(prev => Math.max(0, prev - 0.5));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Update mood based on stats
  useEffect(() => {
    if (happiness > 70) {
      setCurrentMood('happy');
    } else if (happiness < 30) {
      setCurrentMood('sad');
    } else if (hunger > 70) {
      setCurrentMood('eating');
    } else {
      setCurrentMood('idle');
    }
  }, [happiness, hunger]);

  const feed = () => {
    setCurrentMood('eating');
    setHunger(Math.max(0, hunger - 30));
    setHappiness(Math.min(100, happiness + 10));
    setTimeout(() => setCurrentMood('idle'), 2000);
  };

  const play = () => {
    setCurrentMood('gaming');
    setHappiness(Math.min(100, happiness + 20));
    setEnergy(Math.max(0, energy - 10));
    setTimeout(() => setCurrentMood('idle'), 3000);
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Tamagotchi Screen */}
      <div className="bg-sky-100 rounded-3xl p-8 border-8 border-sky-900 shadow-2xl">
        {/* Screen Display */}
        <div className="bg-gradient-to-b from-sky-200 to-sky-300 rounded-2xl p-6 mb-6 relative overflow-hidden">
          {/* Pixel Grid Background */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, y) => (
              <div key={y} className="flex">
                {Array.from({ length: 20 }).map((_, x) => (
                  <div
                    key={x}
                    className="w-4 h-4 border border-sky-400"
                  />
                ))}
              </div>
            ))}
          </div>
          
          {/* Mascot Display */}
          <div className="relative z-10 flex items-center justify-center h-48">
            <PixelMascot size={128} mood={currentMood} interactive />
          </div>
          
          {/* Status Bars */}
          <div className="relative z-10 space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold pixelated">HAPPY</span>
              <div className="flex-1 mx-2 h-3 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-yellow-400"
                  animate={{ width: `${happiness}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-xs pixelated">{happiness}%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold pixelated">HUNGER</span>
              <div className="flex-1 mx-2 h-3 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-red-400"
                  animate={{ width: `${hunger}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-xs pixelated">{hunger}%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold pixelated">ENERGY</span>
              <div className="flex-1 mx-2 h-3 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-400"
                  animate={{ width: `${energy}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-xs pixelated">{Math.floor(energy)}%</span>
            </div>
          </div>
        </div>
        
        {/* Control Buttons */}
        <div className="grid grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={feed}
            className="bg-sky-700 hover:bg-sky-600 text-white rounded-full p-4 flex flex-col items-center justify-center"
          >
            <span className="text-2xl mb-1">🍎</span>
            <span className="text-xs pixelated">FEED</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={play}
            className="bg-sky-700 hover:bg-sky-600 text-white rounded-full p-4 flex flex-col items-center justify-center"
          >
            <span className="text-2xl mb-1">🎮</span>
            <span className="text-xs pixelated">PLAY</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-sky-700 hover:bg-sky-600 text-white rounded-full p-4 flex flex-col items-center justify-center"
          >
            <span className="text-2xl mb-1">💤</span>
            <span className="text-xs pixelated">SLEEP</span>
          </motion.button>
        </div>
      </div>
      
      {/* Device Frame */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm pixelated">ZUNA DIGITAL PET v1.0</p>
      </div>
    </div>
  );
}
