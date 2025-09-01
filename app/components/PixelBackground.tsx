'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PixelBackgroundProps {
  children: React.ReactNode;
  isDarkMode?: boolean;
}

export default function PixelBackground({ children, isDarkMode = false }: PixelBackgroundProps) {
  const [pixelStars, setPixelStars] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);

  useEffect(() => {
    if (isDarkMode) {
      // Generate pixel stars for night mode
      const stars = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 70, // Only in top 70% to leave room for grass
        size: Math.random() < 0.7 ? 2 : 4 // Pixel sizes: 2px or 4px
      }));
      setPixelStars(stars);
    }
  }, [isDarkMode]);

  if (isDarkMode) {
    // Night mode - dark starry sky
    return (
      <div className="relative min-h-screen overflow-hidden" style={{
        background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #2d3561 70%, #1a2f1a 100%)',
        imageRendering: 'pixelated'
      }}>
        {/* Pixel Stars */}
        {pixelStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              imageRendering: 'pixelated'
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ 
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Pixel Moon */}
        <div className="absolute top-10 right-20" style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#FFF8DC',
          borderRadius: '50%',
          boxShadow: '0 0 20px rgba(255, 248, 220, 0.5)',
          imageRendering: 'pixelated'
        }} />
        
        {children}
      </div>
    );
  }

  // Day mode - blue sky with pixel clouds
  return (
    <div className="relative min-h-screen overflow-hidden" style={{
      background: 'linear-gradient(180deg, #87CEEB 0%, #98D8E8 50%, #B0E0E6 70%, #90EE90 100%)',
      imageRendering: 'pixelated'
    }}>
      {/* Pixel Clouds */}
      <motion.div
        className="absolute top-20 left-10"
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ imageRendering: 'pixelated' }}
      >
        <div style={{
          width: '80px',
          height: '40px',
          backgroundColor: 'white',
          boxShadow: `
            20px 0 0 white,
            40px 0 0 white,
            10px 10px 0 white,
            30px 10px 0 white,
            0px 20px 0 white,
            20px 20px 0 white,
            40px 20px 0 white
          `
        }} />
      </motion.div>

      <motion.div
        className="absolute top-40 right-20"
        animate={{ x: [-100, 50, -100] }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        style={{ imageRendering: 'pixelated' }}
      >
        <div style={{
          width: '60px',
          height: '30px',
          backgroundColor: 'white',
          boxShadow: `
            15px 0 0 white,
            30px 0 0 white,
            7px 7px 0 white,
            23px 7px 0 white,
            0px 15px 0 white,
            15px 15px 0 white
          `
        }} />
      </motion.div>

      {/* Pixel Sun */}
      <div className="absolute top-10 right-20" style={{
        width: '60px',
        height: '60px',
        backgroundColor: '#FFD700',
        boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)',
        imageRendering: 'pixelated'
      }} />
      
      {children}
    </div>
  );
}
