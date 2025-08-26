'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PixelMascotProps {
  size?: number;
  mood?: 'idle' | 'happy' | 'gaming' | 'jumping' | 'leftrun' | 'rightrun' | 'eating' | 'speaking' | 'planting' | 'plane' | 'savings' | 'sad' | 'watering' | 'waving';
  interactive?: boolean;
}

// Sprite configurations with proper timing and loop settings
const SPRITE_CONFIGS = {
  idle: {
    source: '/sprites/idleblink.webp',
    frames: 2,
    frameRate: 500,
    loop: true,
  },
  happy: {
    source: '/sprites/happy.webp',
    frames: 4,
    frameRate: 200,
    loop: false,
    loopCount: 3,
  },
  gaming: {
    source: '/sprites/gaming.webp',
    frames: 4,
    frameRate: 200,
    loop: true,
  },
  jumping: {
    source: '/sprites/jumping.webp',
    frames: 4,
    frameRate: 150,
    loop: false,
    loopCount: 2,
  },
  leftrun: {
    source: '/sprites/leftrn.webp',
    frames: 6,
    frameRate: 100,
    loop: true,
  },
  rightrun: {
    source: '/sprites/righrun.webp', 
    frames: 6,
    frameRate: 100,
    loop: true,
  },
  eating: {
    source: '/sprites/eating an apple.webp',
    frames: 3,
    frameRate: 300,
    loop: false,
    loopCount: 3,
  },
  speaking: {
    source: '/sprites/speaking.webp',
    frames: 4,
    frameRate: 200,
    loop: true,
  },
  planting: {
    source: '/sprites/planting.webp',
    frames: 3,
    frameRate: 300,
    loop: false,
    loopCount: 1,
  },
  plane: {
    source: '/sprites/plane.webp',
    frames: 3,
    frameRate: 200,
    loop: true,
  },
  savings: {
    source: '/sprites/savings.webp',
    frames: 4,
    frameRate: 400,
    loop: false,
    loopCount: 2,
  },
  sad: {
    source: '/sprites/sad.webp',
    frames: 3,
    frameRate: 300,
    loop: false,
    loopCount: 1,
  },
  watering: {
    source: '/sprites/watering.webp',
    frames: 4,
    frameRate: 300,
    loop: false,
    loopCount: 1,
  },
  waving: {
    source: '/sprites/waving.webp',
    frames: 4,
    frameRate: 200,
    loop: false,
    loopCount: 2,
  },
};

export default function PixelMascot({ size = 64, mood = 'idle', interactive = false }: PixelMascotProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [spriteLoaded, setSpriteLoaded] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const config = SPRITE_CONFIGS[mood as keyof typeof SPRITE_CONFIGS] || SPRITE_CONFIGS.idle;
  
  useEffect(() => {
    if (!spriteLoaded) return;
    
    let frameIndex = 0;
    let currentLoopCount = 0;
    
    const interval = setInterval(() => {
      frameIndex++;
      
      if (frameIndex >= config.frames) {
        frameIndex = 0;
        currentLoopCount++;
        
        // Check if animation should stop
        if (!config.loop && currentLoopCount >= (config.loopCount || 1)) {
          clearInterval(interval);
          setAnimationComplete(true);
          return;
        }
      }
      
      setCurrentFrame(frameIndex);
    }, config.frameRate);
    
    return () => clearInterval(interval);
  }, [mood, config, spriteLoaded]);
  
  return (
    <motion.div
      className={`relative inline-block ${interactive ? 'cursor-pointer' : ''}`}
      style={{ width: size, height: size }}
      whileHover={interactive ? { scale: 1.1 } : undefined}
      whileTap={interactive ? { scale: 0.95 } : undefined}
    >
      <div className="relative w-full h-full overflow-hidden bg-green-400 rounded-lg">
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
          }}
          unoptimized
          priority
        />
      </div>
    </motion.div>
  );
}