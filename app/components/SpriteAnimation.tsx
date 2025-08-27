'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

// Import all sprites
const SPRITES = {
  idle: '/sprites/idleblink.webp',
  leftrn: '/sprites/leftrn.webp',
  righrun: '/sprites/righrun.webp',
  happy: '/sprites/happy.webp',
  sad: '/sprites/sad.webp',
  gaming: '/sprites/gaming.webp',
  jumping: '/sprites/jumping.webp',
  eating: '/sprites/eating-an-apple.webp',
  speaking: '/sprites/speaking.webp',
  planting: '/sprites/planting.webp',
  plane: '/sprites/plane.webp',
  savings: '/sprites/savings.webp',
  watering: '/sprites/watering.webp',
  waving: '/sprites/waving.webp',
};

const SPRITE_INFO = {
  idle: { frames: 2, frameRate: 500 },
  leftrn: { frames: 6, frameRate: 100 },
  righrun: { frames: 6, frameRate: 100 },
  happy: { frames: 4, frameRate: 200 },
  sad: { frames: 3, frameRate: 300 },
  gaming: { frames: 4, frameRate: 200 },
  jumping: { frames: 4, frameRate: 150 },
  eating: { frames: 3, frameRate: 300 },
  speaking: { frames: 4, frameRate: 200 },
  planting: { frames: 3, frameRate: 300 },
  plane: { frames: 3, frameRate: 200 },
  savings: { frames: 4, frameRate: 400 },
  watering: { frames: 4, frameRate: 300 },
  waving: { frames: 4, frameRate: 200 },
};

interface SpriteAnimationProps {
  sprite?: keyof typeof SPRITES;
  size?: number;
  className?: string;
}

export default function SpriteAnimation({ 
  sprite = 'idle', 
  size = 64,
  className = ''
}: SpriteAnimationProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const info = SPRITE_INFO[sprite];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % info.frames);
    }, info.frameRate);
    
    return () => clearInterval(interval);
  }, [sprite, info.frames, info.frameRate]);
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <div 
        className="absolute"
        style={{
          width: size * info.frames,
          height: size,
          transform: `translateX(-${currentFrame * size}px)`,
          transition: 'none',
        }}
      >
        <Image
          src={SPRITES[sprite]}
          alt={sprite}
          width={size * info.frames}
          height={size}
          className="pixelated"
          unoptimized
        />
      </div>
    </div>
  );
}
