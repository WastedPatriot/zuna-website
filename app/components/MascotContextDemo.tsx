'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PixelMascot from './PixelMascot';

interface DemoScenario {
  title: string;
  description: string;
  mood: string;
  action?: () => void;
}

const SCENARIOS: DemoScenario[] = [
  {
    title: 'Welcome Screen',
    description: 'User opens the app',
    mood: 'waving',
  },
  {
    title: 'Successful Deposit',
    description: 'Money added to savings',
    mood: 'savings',
  },
  {
    title: 'Achievement Unlocked',
    description: 'Reached savings goal',
    mood: 'jumping',
  },
  {
    title: 'Financial Advice',
    description: 'AI Coach speaking',
    mood: 'speaking',
  },
  {
    title: 'Playing Tetris',
    description: 'Gaming session',
    mood: 'gaming',
  },
  {
    title: 'Feeding Time',
    description: 'Tamagotchi feeding',
    mood: 'eating',
  },
  {
    title: 'Planting Savings',
    description: 'New savings pot created',
    mood: 'planting',
  },
  {
    title: 'Growing Money',
    description: 'Adding to savings pot',
    mood: 'watering',
  },
  {
    title: 'Travel Dreams',
    description: 'Holiday savings mode',
    mood: 'plane',
  },
  {
    title: 'Low Balance Alert',
    description: 'Overspending warning',
    mood: 'sad',
  },
];

export default function MascotContextDemo() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentScenario(prev => (prev + 1) % SCENARIOS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const scenario = SCENARIOS[currentScenario];

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-green-400/30">
      <h3 className="text-3xl font-bold mb-6 text-center pixelated text-green-400">
        MASCOT IN ACTION
      </h3>

      {/* Current Scenario Display */}
      <div className="mb-8 text-center">
        <motion.div
          key={currentScenario}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <PixelMascot size={150} mood={scenario.mood as any} />
        </motion.div>

        <motion.div
          key={`${currentScenario}-text`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="text-2xl font-bold pixelated text-green-400 mb-2">
            {scenario.title}
          </h4>
          <p className="text-gray-400 text-lg">
            {scenario.description}
          </p>
        </motion.div>
      </div>

      {/* Scenario Selector */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {SCENARIOS.map((s, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCurrentScenario(index);
              setIsPlaying(false);
            }}
            className={`p-3 rounded-lg border-2 transition-all text-sm ${
              currentScenario === index
                ? 'border-green-400 bg-green-400/20'
                : 'border-gray-700 bg-gray-800/50 hover:border-green-400/50'
            }`}
          >
            <span className="pixelated text-xs">{s.title}</span>
          </motion.button>
        ))}
      </div>

      {/* Play/Pause Control */}
      <div className="flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-6 py-3 rounded-lg font-bold pixelated transition-all ${
            isPlaying
              ? 'bg-red-500 text-white'
              : 'bg-green-500 text-white'
          }`}
        >
          {isPlaying ? 'PAUSE DEMO' : 'PLAY DEMO'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setCurrentScenario((prev + 1) % SCENARIOS.length);
            setIsPlaying(false);
          }}
          className="px-6 py-3 rounded-lg bg-gray-800 text-gray-400 border-2 border-gray-700 font-bold pixelated"
        >
          NEXT →
        </motion.button>
      </div>

      {/* Context Info */}
      <div className="mt-8 p-4 bg-black/30 rounded-lg">
        <h5 className="text-sm font-bold pixelated text-green-400 mb-2">SPRITE INFO</h5>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
          <div>Mood: <span className="text-white">{scenario.mood}</span></div>
          <div>Frames: <span className="text-white">{SPRITE_CONFIGS[scenario.mood as keyof typeof SPRITE_CONFIGS]?.frames || 'N/A'}</span></div>
          <div>Speed: <span className="text-white">{SPRITE_CONFIGS[scenario.mood as keyof typeof SPRITE_CONFIGS]?.frameRate || 'N/A'}ms</span></div>
          <div>Loop: <span className="text-white">{SPRITE_CONFIGS[scenario.mood as keyof typeof SPRITE_CONFIGS]?.loop ? 'Yes' : 'No'}</span></div>
        </div>
      </div>
    </div>
  );
}

// Import sprite configs for info display
const SPRITE_CONFIGS = {
  idle: { frames: 2, frameRate: 500, loop: true },
  happy: { frames: 4, frameRate: 200, loop: false, loopCount: 3 },
  sad: { frames: 3, frameRate: 300, loop: false, loopCount: 1 },
  gaming: { frames: 4, frameRate: 200, loop: true },
  jumping: { frames: 4, frameRate: 150, loop: false, loopCount: 2 },
  eating: { frames: 3, frameRate: 300, loop: false, loopCount: 3 },
  speaking: { frames: 4, frameRate: 200, loop: true },
  planting: { frames: 3, frameRate: 300, loop: false, loopCount: 1 },
  watering: { frames: 4, frameRate: 300, loop: false, loopCount: 1 },
  savings: { frames: 4, frameRate: 400, loop: false, loopCount: 2 },
  plane: { frames: 3, frameRate: 200, loop: true },
  waving: { frames: 4, frameRate: 200, loop: false, loopCount: 2 },
};
