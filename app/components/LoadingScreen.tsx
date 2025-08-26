'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PixelMascot from './PixelMascot';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Animated Mascot */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <PixelMascot size={80} mood="happy" />
        </motion.div>
        
        {/* Loading Text */}
        <motion.h1
          className="text-4xl font-bold text-green-400 mb-8 pixelated"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          LOADING ZUNA
        </motion.h1>
        
        {/* Progress Bar */}
        <div className="w-64 h-8 bg-gray-800 rounded-xl overflow-hidden border-2 border-green-400 mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <p className="text-green-400 pixelated">
          {Math.floor(Math.min(progress, 100))}%
        </p>
        
        {/* Loading tips */}
        <motion.p
          className="text-gray-400 mt-8 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Tip: Your Tamagotchi grows happier when you save regularly!
        </motion.p>
      </div>
    </motion.div>
  );
}
