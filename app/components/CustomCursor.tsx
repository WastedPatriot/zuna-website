'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
          <>
        {/* Cursor Trail */}
        <motion.div
          className="fixed pointer-events-none"
          style={{
            left: mousePosition.x - 24,
            top: mousePosition.y - 24,
            width: 48,
            height: 48,
            zIndex: 9998,
          }}
          animate={{
            opacity: isVisible ? 0.3 : 0,
            scale: isVisible ? 1.5 : 0,
          }}
          transition={{
            opacity: { duration: 0.4 },
            scale: { duration: 0.4, ease: 'easeOut' }
          }}
        >
          <div className="w-full h-full bg-green-400/20 rounded-full blur-xl" />
        </motion.div>

        {/* Main Cursor */}
        <motion.div
          className="fixed pointer-events-none"
          style={{
            left: mousePosition.x - 16,
            top: mousePosition.y - 16,
            width: 32,
            height: 32,
            zIndex: 9999,
          }}
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.8,
          }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 }
          }}
        >
          {/* Pixel Art Cursor */}
          <div className="relative w-8 h-8">
            {/* Outer Ring */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
              {/* Top Row */}
              <div className="col-start-3 col-span-4 row-start-1 bg-green-400" />
              {/* Second Row */}
              <div className="col-start-2 row-start-2 bg-green-400" />
              <div className="col-start-7 row-start-2 bg-green-400" />
              {/* Third Row */}
              <div className="col-start-1 row-start-3 bg-green-400" />
              <div className="col-start-8 row-start-3 bg-green-400" />
              {/* Fourth Row */}
              <div className="col-start-1 row-start-4 bg-green-400" />
              <div className="col-start-8 row-start-4 bg-green-400" />
              {/* Fifth Row */}
              <div className="col-start-1 row-start-5 bg-green-400" />
              <div className="col-start-8 row-start-5 bg-green-400" />
              {/* Sixth Row */}
              <div className="col-start-1 row-start-6 bg-green-400" />
              <div className="col-start-8 row-start-6 bg-green-400" />
              {/* Seventh Row */}
              <div className="col-start-2 row-start-7 bg-green-400" />
              <div className="col-start-7 row-start-7 bg-green-400" />
              {/* Bottom Row */}
              <div className="col-start-3 col-span-4 row-start-8 bg-green-400" />
              
              {/* Center Dot */}
              <div className="col-start-4 col-span-2 row-start-4 row-span-2 bg-white" />
            </div>
          </div>
        </motion.div>
      </>
  );
}
