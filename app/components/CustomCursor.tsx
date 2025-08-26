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
    <motion.div
      className="fixed pointer-events-none mix-blend-difference"
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
      <div className="w-8 h-8 bg-green-400 rounded-full shadow-lg shadow-green-400/50" />
      <div className="absolute top-1 left-1 w-6 h-6 bg-green-500 rounded-full" />
    </motion.div>
  );
}
