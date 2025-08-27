'use client';

import { motion } from 'framer-motion';

export default function CloudBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated clouds */}
      <motion.div
        className="absolute top-10 left-[-100px] w-[200px] h-[60px] bg-white rounded-full opacity-70"
        animate={{
          x: [0, typeof window !== 'undefined' ? window.innerWidth + 200 : 2120],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          boxShadow: '0 0 20px rgba(255,255,255,0.5)',
        }}
      />
      
      <motion.div
        className="absolute top-32 left-[-150px] w-[250px] h-[80px] bg-white rounded-full opacity-60"
        animate={{
          x: [0, typeof window !== 'undefined' ? window.innerWidth + 250 : 2170],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
          delay: 5,
        }}
        style={{
          boxShadow: '0 0 25px rgba(255,255,255,0.5)',
        }}
      />
      
      <motion.div
        className="absolute top-20 right-[-120px] w-[180px] h-[50px] bg-white rounded-full opacity-65"
        animate={{
          x: [0, typeof window !== 'undefined' ? -window.innerWidth - 180 : -2100],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
          delay: 10,
        }}
        style={{
          boxShadow: '0 0 15px rgba(255,255,255,0.5)',
        }}
      />
      
      <motion.div
        className="absolute top-48 left-[-200px] w-[300px] h-[100px] bg-white rounded-full opacity-50"
        animate={{
          x: [0, typeof window !== 'undefined' ? window.innerWidth + 300 : 2220],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
          delay: 15,
        }}
        style={{
          boxShadow: '0 0 30px rgba(255,255,255,0.5)',
        }}
      />
      
      {/* Static decorative clouds */}
      <div className="absolute top-64 left-1/4 w-[150px] h-[40px] bg-white rounded-full opacity-40" />
      <div className="absolute top-80 right-1/3 w-[120px] h-[35px] bg-white rounded-full opacity-35" />
      <div className="absolute top-96 left-1/2 w-[180px] h-[50px] bg-white rounded-full opacity-30" />
      
      {/* Sun */}
      <motion.div
        className="absolute top-10 right-10 w-24 h-24 bg-yellow-300 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          boxShadow: '0 0 40px rgba(255, 204, 0, 0.6)',
        }}
      />
    </div>
  );
}
