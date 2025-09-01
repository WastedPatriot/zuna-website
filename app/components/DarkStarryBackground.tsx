'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function DarkStarryBackground({ children }: { children: React.ReactNode }) {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; color: string }>>([]);

  useEffect(() => {
    // Generate stars on mount
    const generatedStars = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      color: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FFF8DC' : '#FFFFFF'
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d3561 100%)'
    }}>
      {/* Nebula Effect */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at top, rgba(138, 43, 226, 0.1) 0%, transparent 50%)',
        mixBlendMode: 'screen'
      }} />
      
      {/* Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
              borderRadius: '50%'
            }}
            animate={{ 
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3 + star.delay,
              repeat: Infinity,
              delay: star.delay
            }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      <motion.div
        className="absolute"
        style={{
          width: '3px',
          height: '3px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.8)',
          borderRadius: '50%'
        }}
        animate={{
          x: ['-100px', '120vw'],
          y: ['20vh', '60vh'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          repeatDelay: 10,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute"
        style={{
          width: '2px',
          height: '2px',
          backgroundColor: '#FFD700',
          boxShadow: '0 0 8px 3px rgba(255, 215, 0, 0.6)',
          borderRadius: '50%'
        }}
        animate={{
          x: ['110vw', '-100px'],
          y: ['40vh', '80vh'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          repeatDelay: 15,
          delay: 5,
          ease: "linear"
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
