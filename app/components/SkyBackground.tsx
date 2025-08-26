'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SkyBackground() {
  const [birds, setBirds] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    // Generate random birds
    const birdArray = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 10 + Math.random() * 40,
    }));
    setBirds(birdArray);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500" />
      
      {/* Moving Clouds */}
      <div className="absolute inset-0">
        {/* Cloud Layer 1 - Far */}
        <motion.div
          className="absolute top-10 opacity-60"
          animate={{
            x: ['-20%', '120%'],
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg width="200" height="100" viewBox="0 0 200 100" className="fill-white">
            <ellipse cx="50" cy="50" rx="40" ry="20" />
            <ellipse cx="80" cy="45" rx="50" ry="25" />
            <ellipse cx="120" cy="50" rx="45" ry="22" />
            <ellipse cx="100" cy="55" rx="35" ry="18" />
          </svg>
        </motion.div>

        {/* Cloud Layer 2 - Mid */}
        <motion.div
          className="absolute top-32 opacity-70"
          animate={{
            x: ['120%', '-20%'],
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg width="250" height="120" viewBox="0 0 250 120" className="fill-white">
            <ellipse cx="60" cy="60" rx="50" ry="25" />
            <ellipse cx="100" cy="55" rx="60" ry="30" />
            <ellipse cx="150" cy="60" rx="55" ry="27" />
            <ellipse cx="130" cy="65" rx="40" ry="20" />
          </svg>
        </motion.div>

        {/* Cloud Layer 3 - Near */}
        <motion.div
          className="absolute top-20 right-0 opacity-80"
          animate={{
            x: [0, -2000],
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg width="300" height="150" viewBox="0 0 300 150" className="fill-white">
            <ellipse cx="70" cy="70" rx="60" ry="30" />
            <ellipse cx="120" cy="65" rx="70" ry="35" />
            <ellipse cx="180" cy="70" rx="65" ry="32" />
            <ellipse cx="160" cy="75" rx="50" ry="25" />
            <ellipse cx="220" cy="72" rx="45" ry="23" />
          </svg>
        </motion.div>
      </div>

      {/* Flying Birds */}
      {birds.map((bird) => (
        <motion.div
          key={bird.id}
          className="absolute"
          initial={{ left: `${bird.x}%`, top: `${bird.y}%` }}
          animate={{
            left: ['0%', '110%'],
            top: [
              `${bird.y}%`,
              `${bird.y + 5}%`,
              `${bird.y - 5}%`,
              `${bird.y}%`,
            ],
          }}
          transition={{
            left: {
              duration: 20 + bird.id * 5,
              repeat: Infinity,
              ease: 'linear',
            },
            top: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg width="30" height="20" viewBox="0 0 30 20" className="fill-gray-700">
              <path d="M15 10 Q5 5 0 10 Q7.5 8 15 10 Q22.5 8 30 10 Q25 5 15 10" />
            </svg>
          </motion.div>
        </motion.div>
      ))}

      {/* Sun */}
      <motion.div
        className="absolute top-10 right-20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-24 h-24 bg-yellow-300 rounded-full shadow-[0_0_60px_20px_rgba(251,191,36,0.5)]" />
      </motion.div>

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full opacity-50"
          initial={{
            x: Math.random() * 1920,
            y: 1080 + 10,
          }}
          animate={{
            y: -10,
            x: Math.random() * 1920,
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
}
