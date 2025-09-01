'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PixelBackgroundProps {
  children: React.ReactNode;
  isDarkMode?: boolean;
}

export default function PixelBackground({ children, isDarkMode = false }: PixelBackgroundProps) {
  const [pixelStars, setPixelStars] = useState<Array<{ id: number; x: number; y: number; size: number; twinkle: boolean }>>([]);

  useEffect(() => {
    if (isDarkMode) {
      // Generate pixel stars for night mode - OLD SONIC STYLE
      const stars = [];
      
      // Layer 1: Small background stars (2x2 pixels)
      for (let i = 0; i < 60; i++) {
        stars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 70,
          size: 2,
          twinkle: Math.random() > 0.7
        });
      }
      
      // Layer 2: Medium stars (4x4 pixels)
      for (let i = 60; i < 90; i++) {
        stars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 70,
          size: 4,
          twinkle: Math.random() > 0.8
        });
      }
      
      // Layer 3: Large stars (6x6 pixels) - fewer
      for (let i = 90; i < 100; i++) {
        stars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 70,
          size: 6,
          twinkle: true
        });
      }
      
      setPixelStars(stars);
    }
  }, [isDarkMode]);

  if (isDarkMode) {
    // Night mode - SOLID dark blue color, NO GRADIENT!
    return (
      <div className="relative min-h-screen overflow-hidden" style={{
        backgroundColor: '#000428', // SOLID Sonic night blue
        imageRendering: 'pixelated'
      }}>
        {/* Pixel Stars - Old Sonic Style */}
        {pixelStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.size === 6 ? '#FFD700' : star.size === 4 ? '#FFFACD' : '#FFFFFF',
              boxShadow: star.size === 6 ? '0 0 4px #FFD700' : 'none',
              imageRendering: 'pixelated'
            }}
            animate={star.twinkle ? { 
              opacity: [1, 0.3, 1],
              scale: [1, 0.8, 1]
            } : {}}
            transition={star.twinkle ? { 
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            } : {}}
          />
        ))}
        
        {/* Pixel Moon - Sonic Style (blocky, no smooth circles) */}
        <div className="absolute top-10 right-20" style={{
          width: '64px',
          height: '64px',
          backgroundColor: '#F0E68C',
          boxShadow: `
            8px 0 0 #D3D3D3,
            -8px 0 0 #D3D3D3,
            0 8px 0 #D3D3D3,
            0 -8px 0 #D3D3D3,
            8px 8px 0 #C0C0C0,
            -8px -8px 0 #C0C0C0,
            -8px 8px 0 #C0C0C0,
            8px -8px 0 #C0C0C0,
            16px 16px 0 #B0B0B0,
            -16px -16px 0 #B0B0B0
          `,
          imageRendering: 'pixelated'
        }} />
        
        {children}
      </div>
    );
  }

  // Day mode - SOLID bright blue sky, NO GRADIENT!
  return (
    <div className="relative min-h-screen overflow-hidden" style={{
      backgroundColor: '#4A90E2', // SOLID Sonic sky blue
      imageRendering: 'pixelated'
    }}>
      {/* Pixel Clouds - Sonic Style (blocky) */}
      <motion.div
        className="absolute top-20 left-10"
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div style={{
          width: '96px',
          height: '48px',
          backgroundColor: 'white',
          boxShadow: `
            24px 0 0 white,
            48px 0 0 white,
            12px 12px 0 white,
            36px 12px 0 white,
            60px 12px 0 white,
            0px 24px 0 white,
            24px 24px 0 white,
            48px 24px 0 white,
            72px 12px 0 white
          `,
          imageRendering: 'pixelated'
        }} />
      </motion.div>

      <motion.div
        className="absolute top-40 right-20"
        animate={{ x: [-100, 50, -100] }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <div style={{
          width: '72px',
          height: '36px',
          backgroundColor: 'white',
          boxShadow: `
            18px 0 0 white,
            36px 0 0 white,
            9px 9px 0 white,
            27px 9px 0 white,
            0px 18px 0 white,
            18px 18px 0 white,
            45px 9px 0 white
          `,
          imageRendering: 'pixelated'
        }} />
      </motion.div>

      {/* Pixel Sun - Sonic Style (blocky square with rays) */}
      <div className="absolute top-10 right-20" style={{
        width: '48px',
        height: '48px',
        backgroundColor: '#FFD700',
        boxShadow: `
          0 -16px 0 4px #FFD700,
          0 16px 0 4px #FFD700,
          -16px 0 0 4px #FFD700,
          16px 0 0 4px #FFD700,
          -12px -12px 0 4px #FFD700,
          12px -12px 0 4px #FFD700,
          -12px 12px 0 4px #FFD700,
          12px 12px 0 4px #FFD700
        `,
        imageRendering: 'pixelated'
      }} />
      
      {children}
    </div>
  );
}