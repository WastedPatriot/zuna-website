'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentScene, setCurrentScene] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animations for mouse movement
  const springConfig = { damping: 25, stiffness: 350 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);
  
  // 3D perspective transforms
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [30, -30]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30]);
  
  // Parallax layers
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Interactive scenes
  const scenes = [
    { title: "Welcome to Zuna", subtitle: "Your Financial Adventure Begins" },
    { title: "Meet Your Companion", subtitle: "A Tamagotchi That Grows With Your Savings" },
    { title: "Play & Save", subtitle: "Turn Money Management Into Fun" },
    { title: "Join The Journey", subtitle: "Start Building Your Future Today" }
  ];

  return (
    <div ref={containerRef} className="relative min-h-[400vh] bg-black overflow-hidden">
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>

      {/* 3D Scene Container */}
      <div className="fixed inset-0" style={{ perspective: '1000px' }}>
        <motion.div
          className="absolute inset-0"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Floating 3D Elements */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `translateZ(${Math.random() * 200 - 100}px)`,
              }}
              animate={{
                y: [0, -30, 0],
                rotateZ: [0, 360],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            >
              <div className={`w-${Math.floor(Math.random() * 8 + 4)} h-${Math.floor(Math.random() * 8 + 4)} bg-gradient-to-br ${
                i % 3 === 0 ? 'from-green-400 to-emerald-600' : 
                i % 3 === 1 ? 'from-purple-400 to-pink-600' : 
                'from-blue-400 to-cyan-600'
              } rounded-lg opacity-80 blur-sm`} />
            </motion.div>
          ))}

          {/* Interactive Mascot */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              y: y2,
              z: 100,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="relative w-64 h-64"
            >
              {/* 3D Mascot Container */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl transform rotate-45 opacity-20" />
              <div className="absolute inset-4 bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl transform rotate-45 opacity-40" />
              <div className="absolute inset-8 bg-gradient-to-br from-green-600 to-emerald-800 rounded-xl transform rotate-45 opacity-60" />
              
              {/* Mascot Face */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Eyes that follow mouse */}
                  <motion.div
                    className="absolute -left-8 -top-4 w-4 h-4 bg-black rounded-full"
                    style={{
                      x: useTransform(mouseXSpring, [-0.5, 0.5], [-2, 2]),
                      y: useTransform(mouseYSpring, [-0.5, 0.5], [-2, 2]),
                    }}
                  />
                  <motion.div
                    className="absolute -right-8 -top-4 w-4 h-4 bg-black rounded-full"
                    style={{
                      x: useTransform(mouseXSpring, [-0.5, 0.5], [-2, 2]),
                      y: useTransform(mouseYSpring, [-0.5, 0.5], [-2, 2]),
                    }}
                  />
                  {/* Smile */}
                  <div className="w-16 h-8 border-b-4 border-black rounded-b-full mt-4" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating UI Elements */}
          <motion.div
            className="absolute top-20 left-20"
            style={{ y: y1, z: 50 }}
            whileHover={{ scale: 1.1, z: 100 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-xl mb-2">Balance</h3>
              <motion.p
                className="text-3xl font-bold text-green-400"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                £2,847.56
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-20 right-20"
            style={{ y: y3, z: 50 }}
            whileHover={{ scale: 1.1, z: 100 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-bold text-xl mb-2">Savings Goal</h3>
              <div className="w-48 h-4 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-600"
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        {scenes.map((scene, index) => (
          <motion.section
            key={index}
            className="min-h-screen flex items-center justify-center relative"
            onViewportEnter={() => setCurrentScene(index)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold text-white mb-6"
                style={{
                  textShadow: '0 0 30px rgba(74, 222, 128, 0.5)',
                }}
              >
                {scene.title}
              </motion.h1>
              <motion.p
                className="text-2xl text-gray-300"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {scene.subtitle}
              </motion.p>
              
              {index === scenes.length - 1 && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12"
                >
                  <Link
                    href="https://app.gozuna.co.uk"
                    className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-6 rounded-full text-xl font-bold hover:scale-110 transition-transform"
                  >
                    Start Your Adventure
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </motion.section>
        ))}
      </div>

      {/* Interactive Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20">
        {scenes.map((_, index) => (
          <motion.button
            key={index}
            className={`block w-3 h-3 rounded-full mb-4 transition-all ${
              currentScene === index ? 'bg-green-400 scale-150' : 'bg-white/30'
            }`}
            whileHover={{ scale: 1.5 }}
            onClick={() => {
              window.scrollTo({
                top: index * window.innerHeight,
                behavior: 'smooth'
              });
            }}
          />
        ))}
      </div>

      {/* Ambient Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Sound Wave Visualizer */}
      <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none">
        <svg className="w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.rect
              key={i}
              x={`${i * 5}%`}
              y="50%"
              width="4%"
              height="2"
              fill="url(#gradient)"
              animate={{
                height: [2, Math.random() * 60 + 20, 2],
                y: ['50%', `${50 - Math.random() * 30}%`, '50%'],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 0.5,
              }}
            />
          ))}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}