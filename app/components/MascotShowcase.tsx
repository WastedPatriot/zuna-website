'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelMascot from './PixelMascot';

const MASCOT_STATES = [
  { mood: 'idle', name: 'IDLE', desc: 'Just chillin\'' },
  { mood: 'happy', name: 'HAPPY', desc: 'Feeling great!' },
  { mood: 'sad', name: 'SAD', desc: 'Need some love' },
  { mood: 'gaming', name: 'GAMING', desc: 'Playing Tetris!' },
  { mood: 'jumping', name: 'JUMPING', desc: 'So excited!' },
  { mood: 'eating', name: 'EATING', desc: 'Nom nom nom' },
  { mood: 'speaking', name: 'SPEAKING', desc: 'Got advice!' },
  { mood: 'planting', name: 'PLANTING', desc: 'Growing savings' },
  { mood: 'watering', name: 'WATERING', desc: 'Nurturing growth' },
  { mood: 'savings', name: 'SAVINGS', desc: 'Money matters!' },
  { mood: 'plane', name: 'FLYING', desc: 'Adventure time!' },
  { mood: 'waving', name: 'WAVING', desc: 'Hello friend!' },
] as const;

export default function MascotShowcase() {
  const [selectedMood, setSelectedMood] = useState<typeof MASCOT_STATES[number]['mood']>('idle');
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setSelectedMood(current => {
        const currentIndex = MASCOT_STATES.findIndex(s => s.mood === current);
        const nextIndex = (currentIndex + 1) % MASCOT_STATES.length;
        return MASCOT_STATES[nextIndex].mood;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-green-400/30">
      <h3 className="text-3xl font-bold mb-8 text-center pixelated text-green-400">
        MEET YOUR COMPANION
      </h3>

      {/* Main Display - Properly Centered */}
      <div className="flex flex-col items-center justify-center mb-8">
        <motion.div
          key={selectedMood}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6 flex items-center justify-center"
          style={{ width: 200, height: 200 }}
        >
          <PixelMascot size={200} mood={selectedMood} interactive />
        </motion.div>
        
        <motion.div
          key={`${selectedMood}-text`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h4 className="text-3xl font-bold pixelated text-green-400 mb-2">
            {MASCOT_STATES.find(s => s.mood === selectedMood)?.name}
          </h4>
          <p className="text-lg text-gray-400">
            {MASCOT_STATES.find(s => s.mood === selectedMood)?.desc}
          </p>
        </motion.div>
      </div>

      {/* Mood Selector Grid - Properly Labeled */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6">
        {MASCOT_STATES.map((state) => (
          <motion.button
            key={state.mood}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedMood(state.mood);
              setIsAutoPlay(false);
            }}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedMood === state.mood
                ? 'border-green-400 bg-green-400/20'
                : 'border-gray-700 bg-gray-800/50 hover:border-green-400/50'
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-16 h-16 flex items-center justify-center">
                <PixelMascot size={64} mood={state.mood} />
              </div>
              <span className="text-sm font-bold pixelated text-center">{state.name}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Auto Play Toggle - Centered */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className={`px-8 py-4 rounded-lg font-bold pixelated text-lg transition-all ${
            isAutoPlay
              ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
              : 'bg-gray-800 text-gray-400 border-2 border-gray-700'
          }`}
        >
          {isAutoPlay ? '⏸ AUTO PLAY ON' : '▶ AUTO PLAY OFF'}
        </motion.button>
      </div>

      {/* Auto cycle indicator */}
      {isAutoPlay && (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center mt-4 text-sm text-gray-500 pixelated"
        >
          Cycling through all animations...
        </motion.div>
      )}
    </div>
  );
}