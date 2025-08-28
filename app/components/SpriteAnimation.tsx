'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface SpriteAnimationProps {
  sprite: string; // Path to the WEBP sprite sheet in public folder
  frames: number;
  frameRate: number; // milliseconds per frame
  size: number; // width and height of the mascot
  loop?: boolean;
  alt: string;
}

const SpriteAnimation: React.FC<SpriteAnimationProps> = ({
  sprite,
  frames,
  frameRate,
  size,
  loop = true,
  alt,
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentFrame(0); // Reset frame when sprite changes

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentFrame((prevFrame) => {
        const nextFrame = prevFrame + 1;
        if (nextFrame >= frames) {
          return loop ? 0 : frames - 1; // Loop or stop at last frame
        }
        return nextFrame;
      });
    }, frameRate);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sprite, frames, frameRate, loop]);

  const frameWidth = size;
  const frameHeight = size;

  return (
    <div
      style={{
        width: frameWidth,
        height: frameHeight,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="pixelated" // Apply pixelated rendering
    >
      <Image
        src={sprite}
        alt={alt}
        width={frames * frameWidth} // Total width of the sprite sheet
        height={frameHeight}
        style={{
          transform: `translateX(-${currentFrame * frameWidth}px)`,
          imageRendering: 'pixelated',
          position: 'absolute',
          left: 0,
          top: 0,
          objectFit: 'contain',
        }}
        unoptimized // Prevent Next.js image optimization for pixel art
        priority // Load sprite immediately
      />
    </div>
  );
};

export default SpriteAnimation;