'use client';

import { motion } from 'framer-motion';

interface PixelMascotProps {
  size?: number;
  mood?: 'happy' | 'excited' | 'sleeping' | 'eating';
  interactive?: boolean;
}

export default function PixelMascot({ size = 40, mood = 'happy', interactive = false }: PixelMascotProps) {
  // 24x24 pixel grid - exact copy from the app
  const pixels = [
    "000000000000000000000000",
    "000000000000000000000000",
    "000000222200002222000000",
    "000002222220022222200000",
    "000022222222222222220000",
    "000222222222222222222000",
    "002222222222222222222200",
    "002222332222222233222200",
    "022222332222222233222220",
    "022222222222222222222220",
    "022255522222222255522220",
    "022222222222222222222220",
    "022222200000000002222220",
    "022222222222222222222220",
    "002222222222222222222200",
    "002222222222222222222200",
    "000222222222222222222000",
    "000222222222222222222000",
    "000222112222222211222000",
    "000222112222222211222000",
    "000022112222222211220000",
    "000022112222222211220000",
    "000000000000000000000000",
    "000000000000000000000000"
  ];

  const colors: { [key: string]: string } = {
    '0': 'transparent',
    '1': '#166534', // Dark green (legs)
    '2': '#4ade80', // Main green
    '3': '#000000', // Black (eyes)
    '4': '#ffffff', // White (eye shine)
    '5': '#f87171', // Pink (cheeks)
  };

  const pixelSize = size / 24;

  const animations = {
    happy: {
      y: [0, -5, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    excited: {
      y: [0, -10, 0],
      rotate: [-5, 5, -5],
      transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
    },
    sleeping: {
      scale: [1, 1.05, 1],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    eating: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.5, repeat: 3 }
    }
  };

  return (
    <motion.div
      className={`relative inline-block ${interactive ? 'cursor-pointer' : ''}`}
      style={{ width: size, height: size }}
      animate={animations[mood]}
      whileHover={interactive ? { scale: 1.1 } : {}}
      whileTap={interactive ? { scale: 0.95 } : {}}
    >
      {pixels.map((row, y) => (
        row.split('').map((pixel, x) => (
          <div
            key={`${x}-${y}`}
            className="absolute"
            style={{
              left: x * pixelSize,
              top: y * pixelSize,
              width: pixelSize,
              height: pixelSize,
              backgroundColor: colors[pixel] || 'transparent',
              imageRendering: 'pixelated'
            }}
          />
        ))
      ))}
      
      {/* Mood indicators */}
      {mood === 'sleeping' && (
        <motion.div
          className="absolute -top-4 right-0 text-xl"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💤
        </motion.div>
      )}
      
      {mood === 'excited' && (
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2"
          animate={{ y: [-5, -10, -5] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          ✨
        </motion.div>
      )}
    </motion.div>
  );
}