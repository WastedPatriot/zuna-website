'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Press_Start_2P } from 'next/font/google';
import PixelBackground from '../components/PixelBackground';
import GrassyBottom from '../components/GrassyBottom';
import Link from 'next/link';

const pixelFont = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface Player {
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: { x: number; y: number };
}

interface Food {
  x: number;
  y: number;
  size: number;
  color: string;
}

interface Enemy {
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: { x: number; y: number };
}

export default function GamePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const playerRef = useRef<Player>({
    x: 400,
    y: 300,
    size: 20,
    color: '#10b981',
    velocity: { x: 0, y: 0 }
  });
  const foodRef = useRef<Food[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const mouseRef = useRef({ x: 400, y: 300 });

  // Pixel colors for game elements
  const PIXEL_COLORS = {
    player: '#10b981', // Green like ZUNA
    food: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#98FB98', '#DDA0DD'],
    enemies: ['#FF4500', '#DC143C', '#8B008B', '#4B0082'],
    grid: isDarkMode ? 'rgba(102, 126, 234, 0.1)' : 'rgba(74, 144, 226, 0.1)'
  };

  // Initialize game
  const initGame = useCallback(() => {
    playerRef.current = {
      x: 400,
      y: 300,
      size: 20,
      color: PIXEL_COLORS.player,
      velocity: { x: 0, y: 0 }
    };
    
    // Create food particles
    foodRef.current = [];
    for (let i = 0; i < 50; i++) {
      foodRef.current.push({
        x: Math.random() * 800,
        y: Math.random() * 600,
        size: 8,
        color: PIXEL_COLORS.food[Math.floor(Math.random() * PIXEL_COLORS.food.length)]
      });
    }
    
    // Create enemy blobs
    enemiesRef.current = [];
    for (let i = 0; i < 5; i++) {
      enemiesRef.current.push({
        x: Math.random() * 800,
        y: Math.random() * 600,
        size: 15 + Math.random() * 25,
        color: PIXEL_COLORS.enemies[Math.floor(Math.random() * PIXEL_COLORS.enemies.length)],
        velocity: { 
          x: (Math.random() - 0.5) * 2, 
          y: (Math.random() - 0.5) * 2 
        }
      });
    }
    
    setScore(0);
    setGameOver(false);
  }, [PIXEL_COLORS]);

  // Draw pixelated circle
  const drawPixelCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) => {
    ctx.fillStyle = color;
    const pixelSize = 4;
    
    for (let py = -radius; py <= radius; py += pixelSize) {
      for (let px = -radius; px <= radius; px += pixelSize) {
        if (px * px + py * py <= radius * radius) {
          ctx.fillRect(
            Math.floor((x + px) / pixelSize) * pixelSize,
            Math.floor((y + py) / pixelSize) * pixelSize,
            pixelSize,
            pixelSize
          );
        }
      }
    }
    
    // Add pixel border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 2;
    for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
      const bx = x + Math.cos(angle) * radius;
      const by = y + Math.sin(angle) * radius;
      ctx.fillRect(
        Math.floor(bx / pixelSize) * pixelSize,
        Math.floor(by / pixelSize) * pixelSize,
        pixelSize,
        pixelSize
      );
    }
  };

  // Game loop
  const gameLoop = useCallback(() => {
    if (!canvasRef.current || gameOver) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = isDarkMode ? '#000428' : '#4A90E2';
    ctx.fillRect(0, 0, 800, 600);
    
    // Draw grid
    ctx.strokeStyle = PIXEL_COLORS.grid;
    ctx.lineWidth = 1;
    for (let x = 0; x < 800; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 600);
      ctx.stroke();
    }
    for (let y = 0; y < 600; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(800, y);
      ctx.stroke();
    }
    
    // Update player position
    const player = playerRef.current;
    const dx = mouseRef.current.x - player.x;
    const dy = mouseRef.current.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 5) {
      player.velocity.x = (dx / distance) * 3;
      player.velocity.y = (dy / distance) * 3;
    } else {
      player.velocity.x *= 0.9;
      player.velocity.y *= 0.9;
    }
    
    player.x += player.velocity.x;
    player.y += player.velocity.y;
    
    // Keep player in bounds
    player.x = Math.max(player.size, Math.min(800 - player.size, player.x));
    player.y = Math.max(player.size, Math.min(600 - player.size, player.y));
    
    // Check food collision
    foodRef.current = foodRef.current.filter(food => {
      const dx = player.x - food.x;
      const dy = player.y - food.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < player.size + food.size) {
        // Eat food
        player.size += 0.5;
        setScore(prev => prev + 10);
        return false;
      }
      return true;
    });
    
    // Respawn food
    while (foodRef.current.length < 50) {
      foodRef.current.push({
        x: Math.random() * 800,
        y: Math.random() * 600,
        size: 8,
        color: PIXEL_COLORS.food[Math.floor(Math.random() * PIXEL_COLORS.food.length)]
      });
    }
    
    // Update enemies
    enemiesRef.current.forEach(enemy => {
      // Simple AI - move towards smaller blobs, away from larger ones
      let targetX = enemy.x + enemy.velocity.x;
      let targetY = enemy.y + enemy.velocity.y;
      
      // Check player
      const pdx = player.x - enemy.x;
      const pdy = player.y - enemy.y;
      const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
      
      if (pdist < 150) {
        if (player.size > enemy.size) {
          // Run away from player
          enemy.velocity.x = -(pdx / pdist) * 2;
          enemy.velocity.y = -(pdy / pdist) * 2;
        } else if (player.size < enemy.size * 0.8) {
          // Chase player
          enemy.velocity.x = (pdx / pdist) * 1.5;
          enemy.velocity.y = (pdy / pdist) * 1.5;
        }
      }
      
      // Random movement
      if (Math.random() < 0.02) {
        enemy.velocity.x = (Math.random() - 0.5) * 3;
        enemy.velocity.y = (Math.random() - 0.5) * 3;
      }
      
      enemy.x += enemy.velocity.x;
      enemy.y += enemy.velocity.y;
      
      // Bounce off walls
      if (enemy.x <= enemy.size || enemy.x >= 800 - enemy.size) {
        enemy.velocity.x *= -1;
      }
      if (enemy.y <= enemy.size || enemy.y >= 600 - enemy.size) {
        enemy.velocity.y *= -1;
      }
      
      enemy.x = Math.max(enemy.size, Math.min(800 - enemy.size, enemy.x));
      enemy.y = Math.max(enemy.size, Math.min(600 - enemy.size, enemy.y));
      
      // Check collision with player
      if (pdist < player.size + enemy.size) {
        if (player.size > enemy.size) {
          // Player eats enemy
          player.size += enemy.size / 4;
          setScore(prev => prev + Math.floor(enemy.size * 5));
          enemy.x = Math.random() * 800;
          enemy.y = Math.random() * 600;
          enemy.size = 15 + Math.random() * 25;
        } else {
          // Enemy eats player
          setGameOver(true);
          if (score > highScore) {
            setHighScore(score);
          }
        }
      }
    });
    
    // Draw food
    foodRef.current.forEach(food => {
      drawPixelCircle(ctx, food.x, food.y, food.size, food.color);
    });
    
    // Draw enemies
    enemiesRef.current.forEach(enemy => {
      drawPixelCircle(ctx, enemy.x, enemy.y, enemy.size, enemy.color);
      
      // Draw pixel eyes
      ctx.fillStyle = 'white';
      ctx.fillRect(enemy.x - 6, enemy.y - 4, 4, 4);
      ctx.fillRect(enemy.x + 2, enemy.y - 4, 4, 4);
      ctx.fillStyle = 'black';
      ctx.fillRect(enemy.x - 5, enemy.y - 3, 2, 2);
      ctx.fillRect(enemy.x + 3, enemy.y - 3, 2, 2);
    });
    
    // Draw player
    drawPixelCircle(ctx, player.x, player.y, player.size, player.color);
    
    // Draw ZUNA face on player
    ctx.fillStyle = 'white';
    ctx.fillRect(player.x - 8, player.y - 6, 6, 6);
    ctx.fillRect(player.x + 2, player.y - 6, 6, 6);
    ctx.fillStyle = 'black';
    ctx.fillRect(player.x - 6, player.y - 4, 2, 2);
    ctx.fillRect(player.x + 4, player.y - 4, 2, 2);
    // Smile
    ctx.fillStyle = '#FF69B4';
    ctx.fillRect(player.x - 4, player.y + 2, 8, 2);
    
    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameOver, isDarkMode, PIXEL_COLORS, score, highScore]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    if (isPlaying) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isPlaying]);

  // Start/stop game loop
  useEffect(() => {
    if (isPlaying && !gameOver) {
      animationRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, gameOver, gameLoop]);

  const startGame = () => {
    initGame();
    setIsPlaying(true);
  };

  return (
    <PixelBackground isDarkMode={isDarkMode}>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
          <Link href="/" className="text-white hover:text-yellow-300 transition-colors" style={{
            fontFamily: pixelFont.style.fontFamily,
            fontSize: '12px'
          }}>
            ← BACK
          </Link>
          
          <div className="flex items-center gap-4">
            <div style={{
              fontFamily: pixelFont.style.fontFamily,
              fontSize: '14px',
              color: '#FFD700'
            }}>
              SCORE: {score}
            </div>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded"
              style={{
                backgroundColor: isDarkMode ? '#FFD700' : '#4A90E2',
                border: '2px solid',
                borderColor: isDarkMode ? '#FFA500' : '#357ABD',
                fontFamily: pixelFont.style.fontFamily,
                fontSize: '10px'
              }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Game Container */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative">
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '4px solid #667eea',
              padding: '4px',
              imageRendering: 'pixelated'
            }}>
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                style={{
                  imageRendering: 'pixelated',
                  cursor: isPlaying ? 'none' : 'default'
                }}
              />
            </div>

            {/* Start Screen */}
            {!isPlaying && !gameOver && (
              <div className="absolute inset-0 flex items-center justify-center" style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
              }}>
                <div className="text-center p-8" style={{
                  backgroundColor: '#1a1a2e',
                  border: '4px solid #667eea',
                  fontFamily: pixelFont.style.fontFamily
                }}>
                  <h2 className="text-green-400 mb-4" style={{ fontSize: '24px' }}>
                    ZUNA.IO
                  </h2>
                  <p className="text-white mb-6" style={{ fontSize: '12px' }}>
                    Eat food • Grow bigger • Avoid enemies
                  </p>
                  <p className="text-gray-400 mb-6" style={{ fontSize: '10px' }}>
                    Move with mouse
                  </p>
                  <button
                    onClick={startGame}
                    className="px-6 py-3 bg-green-500 text-white hover:bg-green-600"
                    style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '14px',
                      border: '2px solid #2d5a2d'
                    }}
                  >
                    START GAME
                  </button>
                </div>
              </div>
            )}

            {/* Game Over Screen */}
            {gameOver && (
              <div className="absolute inset-0 flex items-center justify-center" style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
              }}>
                <div className="text-center p-8" style={{
                  backgroundColor: '#1a1a2e',
                  border: '4px solid #ff6b6b',
                  fontFamily: pixelFont.style.fontFamily
                }}>
                  <h2 className="text-red-500 mb-4" style={{ fontSize: '24px' }}>
                    GAME OVER
                  </h2>
                  <p className="text-white mb-2" style={{ fontSize: '14px' }}>
                    Score: {score}
                  </p>
                  <p className="text-yellow-400 mb-6" style={{ fontSize: '12px' }}>
                    High Score: {highScore}
                  </p>
                  <button
                    onClick={startGame}
                    className="px-6 py-3 bg-green-500 text-white hover:bg-green-600"
                    style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '14px',
                      border: '2px solid #2d5a2d'
                    }}
                  >
                    PLAY AGAIN
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <GrassyBottom />
      </div>
    </PixelBackground>
  );
}
