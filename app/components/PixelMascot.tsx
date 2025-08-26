'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PixelMascotProps {
  size?: number;
  mood?: 'idle' | 'happy' | 'gaming' | 'jumping' | 'eating' | 'speaking' | 'planting' | 'plane' | 'savings' | 'sad' | 'watering' | 'waving';
  interactive?: boolean;
}

// Sprite configurations matching the mobile app
const SPRITE_CONFIGS = {
  idle: {
    source: '/sprites/idleblink.webp',
    frames: 2,
    frameRate: 500,
  },
  happy: {
    source: '/sprites/happy.webp',
    frames: 4,
    frameRate: 200,
  },
  gaming: {
    source: '/sprites/gaming.webp',
    frames: 4,
    frameRate: 200,
  },
  jumping: {
    source: '/sprites/jumping.webp',
    frames: 4,
    frameRate: 150,
  },
  leftrun: {
    source: '/sprites/leftrn.webp',
    frames: 6,
    frameRate: 100,
  },
  rightrun: {
    source: '/sprites/righrun.webp',
    frames: 6,
    frameRate: 100,
  },
  eating: {
    source: '/sprites/eating an apple.webp',
    frames: 3,
    frameRate: 300,
  },
  speaking: {
    source: '/sprites/speaking.webp',
    frames: 4,
    frameRate: 200,
  },
  planting: {
    source: '/sprites/planting.webp',
    frames: 3,
    frameRate: 300,
  },
  plane: {
    source: '/sprites/plane.webp',
    frames: 3,
    frameRate: 200,
  },
  savings: {
    source: '/sprites/savings.webp',
    frames: 4,
    frameRate: 400,
  },
  sad: {
    source: '/sprites/sad.webp',
    frames: 3,
    frameRate: 300,
  },
  watering: {
    source: '/sprites/watering.webp',
    frames: 4,
    frameRate: 300,
  },
  waving: {
    source: '/sprites/waving.webp',
    frames: 4,
    frameRate: 200,
  },
};

export default function PixelMascot({ size = 64, mood = 'idle', interactive = false }: PixelMascotProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [spriteLoaded, setSpriteLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const config = SPRITE_CONFIGS[mood] || SPRITE_CONFIGS.idle;
  
  useEffect(() => {
    if (!spriteLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % config.frames);
    }, config.frameRate);
    
    return () => clearInterval(interval);
  }, [mood, config.frames, config.frameRate, spriteLoaded]);
  
  return (
    <motion.div
      className={`relative inline-block ${interactive ? 'cursor-pointer' : ''}`}
      style={{ width: size, height: size }}
      whileHover={interactive ? { scale: 1.1 } : undefined}
      whileTap={interactive ? { scale: 0.95 } : undefined}
    >
      <div className="relative w-full h-full overflow-hidden bg-green-400 rounded-lg">
        {!error ? (
          <Image
            src={config.source}
            alt="Zuna Mascot"
            width={size * config.frames}
            height={size}
            className="absolute"
            style={{
              imageRendering: 'pixelated',
              left: `-${currentFrame * size}px`,
            }}
            onLoad={() => setSpriteLoaded(true)}
            onError={(e) => {
              console.error('Failed to load sprite:', config.source);
              setError(`Failed to load: ${config.source}`);
            }}
            unoptimized
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl mb-2">🎮</div>
              <div className="text-xs">Mascot</div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}