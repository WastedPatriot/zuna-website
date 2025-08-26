'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PixelMascotProps {
  size?: number;
  mood?: 'happy' | 'excited' | 'sleeping' | 'eating' | 'idle';
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
    source: '/sprites/rightrun.webp',
    frames: 6,
    frameRate: 100,
  },
  eating: {
    source: '/sprites/eating.webp',
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
};

export default function PixelMascot({ size = 64, mood = 'idle', interactive = false }: PixelMascotProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [spriteLoaded, setSpriteLoaded] = useState(false);
  
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
      whileHover={interactive ? { scale: 1.1 } : {}}
      whileTap={interactive ? { scale: 0.95 } : {}}
    >
      <div className="relative w-full h-full overflow-hidden">
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
          unoptimized
        />
      </div>
    </motion.div>
  );
}