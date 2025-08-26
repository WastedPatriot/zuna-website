'use client';

import { motion } from 'framer-motion';

interface PixelMascotSimpleProps {
  size?: number;
  mood?: 'happy' | 'idle' | 'excited';
}

export default function PixelMascotSimple({ size = 64, mood = 'idle' }: PixelMascotSimpleProps) {
  // Simple pixel art mascot using divs
  const pixelSize = size / 16; // 16x16 grid
  
  const mascotPixels = [
    "    ####    ",
    "   ######   ",
    "  ########  ",
    " ########## ",
    " #@@####@@# ",
    " #@@####@@# ",
    " ########## ",
    " ###PPPP### ",
    " ########## ",
    "  ########  ",
    "   ######   ",
    "   ##  ##   ",
    "  ##    ##  ",
    " ##      ## ",
    " ##      ## ",
    "            ",
  ];
  
  const getAnimation = () => {
    switch (mood) {
      case 'happy':
        return {
          y: [0, -5, 0],
          rotate: [-2, 2, -2],
        };
      case 'excited':
        return {
          y: [0, -10, 0],
          scale: [1, 1.1, 1],
        };
      default:
        return {
          y: [0, -2, 0],
        };
    }
  };
  
  return (
    <motion.div
      className="relative inline-block"
      style={{ width: size, height: size }}
      animate={getAnimation()}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {mascotPixels.map((row, y) => (
        row.split('').map((pixel, x) => {
          let color = 'transparent';
          if (pixel === '#') color = '#4ADE80'; // Green
          else if (pixel === '@') color = '#000000'; // Black eyes
          else if (pixel === 'P') color = '#FF69B4'; // Pink cheeks
          
          return (
            <div
              key={`${x}-${y}`}
              className="absolute"
              style={{
                left: x * pixelSize,
                top: y * pixelSize,
                width: pixelSize,
                height: pixelSize,
                backgroundColor: color,
              }}
            />
          );
        })
      ))}
    </motion.div>
  );
}
