'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Pixel mascot data (24x24 grid)
const MASCOT_PIXELS = [
  "000000000000000000000000",
  "000000000000000000000000",
  "000000111100001111000000",
  "000001111110011111100000",
  "000011111111111111110000",
  "000111111111111111111000",
  "001111111111111111111100",
  "001111001111111100111100",
  "011111001111111100111110",
  "011111111111111111111110",
  "011111111111111111111110",
  "011111111111111111111110",
  "011111100000000001111110",
  "011111111111111111111110",
  "001111111111111111111100",
  "001111111111111111111100",
  "000111111111111111111000",
  "000111111111111111111000",
  "000111001111111100111000",
  "000111001111111100111000",
  "000011001111111100110000",
  "000011001111111100110000",
  "000000000000000000000000",
  "000000000000000000000000"
];

const PIXEL_COLORS: { [key: string]: string } = {
  '0': 'transparent',
  '1': '#4ade80', // Green
  '2': '#22c55e', // Darker green
  '3': '#000000', // Black (eyes)
  '4': '#ffffff', // White (eye shine)
  '5': '#f87171', // Pink (cheeks)
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentScene, setCurrentScene] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [mascotMood, setMascotMood] = useState('happy');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Loading sequence
  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(loadingInterval);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Interactive canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? '#4ade80' : '#22c55e'
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Mouse interaction
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          particle.vx += dx * 0.0001;
          particle.vy += dy * 0.0001;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Connect nearby particles
        particles.forEach(other => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 50) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(74, 222, 128, ${0.2 * (1 - distance / 50)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [mousePos]);

  // Render pixel mascot
  const renderMascot = (scale = 4) => {
    return (
      <div 
        className="relative inline-block"
        style={{ 
          width: MASCOT_PIXELS[0].length * scale,
          height: MASCOT_PIXELS.length * scale 
        }}
      >
        {MASCOT_PIXELS.map((row, y) => (
          row.split('').map((pixel, x) => (
            <div
              key={`${x}-${y}`}
              className="absolute"
              style={{
                left: x * scale,
                top: y * scale,
                width: scale,
                height: scale,
                backgroundColor: PIXEL_COLORS[pixel] || 'transparent',
                imageRendering: 'pixelated'
              }}
            />
          ))
        ))}
      </div>
    );
  };

  // Tamagotchi Mini Game
  const TamagotchiGame = () => {
    const [happiness, setHappiness] = useState(80);
    const [hunger, setHunger] = useState(50);
    const [energy, setEnergy] = useState(70);

    const feed = () => {
      setHunger(Math.max(0, hunger - 30));
      setHappiness(Math.min(100, happiness + 10));
      setMascotMood('eating');
      setTimeout(() => setMascotMood('happy'), 2000);
    };

    const play = () => {
      setHappiness(Math.min(100, happiness + 20));
      setEnergy(Math.max(0, energy - 20));
      setMascotMood('playing');
      setTimeout(() => setMascotMood('happy'), 2000);
    };

    const sleep = () => {
      setEnergy(Math.min(100, energy + 40));
      setMascotMood('sleeping');
      setTimeout(() => setMascotMood('happy'), 3000);
    };

    return (
      <motion.div 
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="bg-gray-900 rounded-3xl p-8 max-w-2xl w-full mx-4 border-4 border-green-400">
          <h2 className="text-3xl font-bold text-green-400 mb-6 text-center pixelated">
            ZUNA TAMAGOTCHI
          </h2>
          
          <div className="bg-black rounded-2xl p-8 mb-6 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-green-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>
            
            {/* Mascot */}
            <div className="relative z-10 flex justify-center mb-6">
              <motion.div
                animate={{
                  y: mascotMood === 'sleeping' ? [0, 5, 0] : [0, -10, 0],
                  scale: mascotMood === 'eating' ? [1, 1.1, 1] : 1,
                  rotate: mascotMood === 'playing' ? [0, 10, -10, 0] : 0,
                }}
                transition={{
                  duration: mascotMood === 'sleeping' ? 3 : 1,
                  repeat: mascotMood === 'sleeping' ? Infinity : 0,
                }}
              >
                {renderMascot(8)}
              </motion.div>
            </div>
            
            {/* Stats */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-green-400 text-sm mb-1">
                  <span>Happiness</span>
                  <span>{happiness}%</span>
                </div>
                <div className="bg-gray-800 h-4 rounded-full overflow-hidden">
                  <motion.div 
                    className="bg-green-400 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${happiness}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-yellow-400 text-sm mb-1">
                  <span>Hunger</span>
                  <span>{hunger}%</span>
                </div>
                <div className="bg-gray-800 h-4 rounded-full overflow-hidden">
                  <motion.div 
                    className="bg-yellow-400 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${hunger}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-blue-400 text-sm mb-1">
                  <span>Energy</span>
                  <span>{energy}%</span>
                </div>
                <div className="bg-gray-800 h-4 rounded-full overflow-hidden">
                  <motion.div 
                    className="bg-blue-400 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${energy}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="grid grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={feed}
              className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold pixelated"
            >
              FEED
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={play}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-bold pixelated"
            >
              PLAY
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sleep}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold pixelated"
            >
              SLEEP
            </motion.button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameActive(false)}
            className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-bold"
          >
            CLOSE
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ background: '#000' }}
      />
      
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              {/* Animated Mascot */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="mb-8"
              >
                {renderMascot(6)}
              </motion.div>
              
              {/* Loading Text */}
              <motion.h1
                className="text-4xl font-bold text-green-400 mb-4 pixelated"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                LOADING ZUNA
              </motion.h1>
              
              {/* Progress Bar */}
              <div className="w-64 h-8 bg-gray-800 rounded-full overflow-hidden border-2 border-green-400">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                />
              </div>
              
              <p className="text-green-400 mt-4 pixelated">
                {Math.floor(loadingProgress)}%
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gameActive && <TamagotchiGame />}
      </AnimatePresence>

      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {/* 3D Mascot */}
            <motion.div
              className="mb-8 inline-block"
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              whileHover={{ scale: 1.2 }}
              onClick={() => setGameActive(true)}
              style={{ cursor: 'pointer' }}
            >
              {renderMascot(10)}
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 pixelated">
              ZUNA
            </h1>
            <p className="text-2xl text-green-400 mb-8">
              Your Financial Companion
            </p>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameActive(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-xl font-bold pixelated"
            >
              PLAY WITH MASCOT
            </motion.button>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-green-400 rounded-full mt-2" />
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-6xl w-full">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-center text-white mb-16 pixelated"
            >
              FEATURES
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "SAVE", desc: "Watch your money grow", color: "from-green-400 to-emerald-600" },
                { title: "PLAY", desc: "Earn rewards with games", color: "from-purple-400 to-pink-600" },
                { title: "GROW", desc: "Level up your finances", color: "from-blue-400 to-cyan-600" }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ scale: 1.05, z: 50 }}
                  className="bg-gray-900 rounded-2xl p-8 border-4 border-gray-800 hover:border-green-400 transition-colors"
                >
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-xl mb-4`} />
                  <h3 className="text-2xl font-bold text-white mb-2 pixelated">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .pixelated {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
        
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Custom Cursor */}
      <motion.div
        className="fixed w-8 h-8 pointer-events-none z-[60] mix-blend-difference"
        style={{
          left: mousePos.x - 16,
          top: mousePos.y - 16,
        }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>
    </>
  );
}