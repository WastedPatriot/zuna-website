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

export default function GamePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [dailyPlaysRemaining, setDailyPlaysRemaining] = useState(1);
  const [isPremium, setIsPremium] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const playerRef = useRef({
    x: 400,
    y: 300,
    size: 20,
    speed: 3
  });
  const foodRef = useRef<Array<{x: number, y: number, size: number}>>([]);
  const enemiesRef = useRef<Array<{x: number, y: number, size: number, vx: number, vy: number}>>([]);
  const mouseRef = useRef({ x: 400, y: 300 });

  // Load game data
  useEffect(() => {
    const savedHighScore = localStorage.getItem('zunaio_web_highscore');
    if (savedHighScore) setHighScore(parseInt(savedHighScore));
    
    const savedPlays = localStorage.getItem('zunaio_web_daily_plays');
    const lastPlayDate = localStorage.getItem('zunaio_web_last_play_date');
    const today = new Date().toDateString();
    
    if (lastPlayDate !== today) {
      // Reset daily plays
      const plays = isPremium ? 3 : 1;
      setDailyPlaysRemaining(plays);
      localStorage.setItem('zunaio_web_daily_plays', plays.toString());
      localStorage.setItem('zunaio_web_last_play_date', today);
    } else if (savedPlays) {
      setDailyPlaysRemaining(parseInt(savedPlays));
    }
    
    // Check premium status (would come from Auth0 in production)
    const premiumStatus = localStorage.getItem('user_premium');
    setIsPremium(premiumStatus === 'true');
  }, [isPremium]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  const startGame = () => {
    if (dailyPlaysRemaining <= 0) {
      alert(isPremium 
        ? 'You\'ve used all 3 daily plays. Come back tomorrow!' 
        : 'Free users get 1 play per day. Upgrade to Premium for 3 daily plays!');
      return;
    }
    
    // Deduct a play
    const newPlays = dailyPlaysRemaining - 1;
    setDailyPlaysRemaining(newPlays);
    localStorage.setItem('zunaio_web_daily_plays', newPlays.toString());
    
    // Reset game state
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    playerRef.current = { x: 400, y: 300, size: 20, speed: 3 };
    foodRef.current = [];
    enemiesRef.current = [];
    
    // Generate initial food
    for (let i = 0; i < 50; i++) {
      foodRef.current.push({
        x: Math.random() * 800,
        y: Math.random() * 600,
        size: 5
      });
    }
    
    // Generate initial enemies
    for (let i = 0; i < 5; i++) {
      enemiesRef.current.push({
        x: Math.random() * 800,
        y: Math.random() * 600,
        size: 15 + Math.random() * 20,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      });
    }
    
    // Start game loop
    gameLoop();
  };

  const gameLoop = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = isDarkMode ? '#000428' : '#87CEEB';
    ctx.fillRect(0, 0, 800, 600);
    
    // Move player towards mouse
    const player = playerRef.current;
    const dx = mouseRef.current.x - player.x;
    const dy = mouseRef.current.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 5) {
      player.x += (dx / distance) * player.speed;
      player.y += (dy / distance) * player.speed;
    }
    
    // Keep player in bounds
    player.x = Math.max(player.size, Math.min(800 - player.size, player.x));
    player.y = Math.max(player.size, Math.min(600 - player.size, player.y));
    
    // Draw and check food
    ctx.fillStyle = '#10b981';
    foodRef.current = foodRef.current.filter(food => {
      const dx = player.x - food.x;
      const dy = player.y - food.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < player.size) {
        // Eat food
        player.size += 0.5;
        player.speed = Math.max(1, 3 - player.size * 0.02);
        setScore(prev => prev + 10);
        return false;
      }
      
      // Draw food
      ctx.fillRect(food.x - food.size/2, food.y - food.size/2, food.size, food.size);
      return true;
    });
    
    // Add new food occasionally
    if (Math.random() < 0.05 && foodRef.current.length < 100) {
      foodRef.current.push({
        x: Math.random() * 800,
        y: Math.random() * 600,
        size: 5
      });
    }
    
    // Update and draw enemies
    ctx.fillStyle = '#ef4444';
    let gameEnded = false;
    enemiesRef.current.forEach(enemy => {
      // Move enemy
      enemy.x += enemy.vx;
      enemy.y += enemy.vy;
      
      // Bounce off walls
      if (enemy.x < enemy.size || enemy.x > 800 - enemy.size) enemy.vx *= -1;
      if (enemy.y < enemy.size || enemy.y > 600 - enemy.size) enemy.vy *= -1;
      
      // Check collision with player
      const dx = player.x - enemy.x;
      const dy = player.y - enemy.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < player.size + enemy.size) {
        if (player.size > enemy.size) {
          // Eat enemy
          player.size += enemy.size * 0.1;
          setScore(prev => prev + 50);
          enemy.size = 0; // Mark for removal
        } else {
          // Game over
          gameEnded = true;
        }
      }
      
      // Draw enemy
      if (enemy.size > 0) {
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    // Remove eaten enemies
    enemiesRef.current = enemiesRef.current.filter(e => e.size > 0);
    
    // Add new enemies occasionally
    if (Math.random() < 0.01 && enemiesRef.current.length < 10) {
      enemiesRef.current.push({
        x: Math.random() * 800,
        y: Math.random() * 600,
        size: 15 + Math.random() * 30,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      });
    }
    
    // Draw player (ZUNA mascot style)
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw eyes
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(player.x - player.size * 0.3, player.y - player.size * 0.2, player.size * 0.2, 0, Math.PI * 2);
    ctx.arc(player.x + player.size * 0.3, player.y - player.size * 0.2, player.size * 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(player.x - player.size * 0.3, player.y - player.size * 0.2, player.size * 0.1, 0, Math.PI * 2);
    ctx.arc(player.x + player.size * 0.3, player.y - player.size * 0.2, player.size * 0.1, 0, Math.PI * 2);
    ctx.fill();
    
    if (gameEnded) {
      endGame();
    } else {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('zunaio_web_highscore', score.toString());
    }
    
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    if (isPlaying) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isPlaying, handleMouseMove]);

  return (
    <PixelBackground isDarkMode={isDarkMode}>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center" style={{
          backgroundColor: isDarkMode ? 'rgba(0, 4, 40, 0.8)' : 'rgba(74, 144, 226, 0.9)',
          borderBottom: '4px solid',
          borderColor: isDarkMode ? '#667eea' : '#357ABD'
        }}>
          <Link href="/" className="text-white hover:text-yellow-300 transition-colors" style={{
            fontFamily: pixelFont.style.fontFamily,
            fontSize: '12px'
          }}>
            ← HOME
          </Link>
          
          <div className="flex gap-4 items-center">
            <span style={{
              fontFamily: pixelFont.style.fontFamily,
              fontSize: '14px',
              color: '#FFD700'
            }}>
              SCORE: {score}
            </span>
            <span style={{
              fontFamily: pixelFont.style.fontFamily,
              fontSize: '14px',
              color: '#10b981'
            }}>
              HIGH: {highScore}
            </span>
            <span style={{
              fontFamily: pixelFont.style.fontFamily,
              fontSize: '14px',
              color: dailyPlaysRemaining > 0 ? '#10b981' : '#ef4444'
            }}>
              PLAYS: {dailyPlaysRemaining}/{isPremium ? 3 : 1}
            </span>
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div style={{
            backgroundColor: isDarkMode ? 'rgba(26, 31, 58, 0.95)' : 'rgba(255,255,255,0.95)',
            border: '4px solid',
            borderColor: isDarkMode ? '#667eea' : '#4A90E2',
            boxShadow: '8px 8px 0 rgba(0,0,0,0.3)',
            padding: '20px',
            imageRendering: 'pixelated'
          }}>
            {!isPlaying && !gameOver && (
              <div className="text-center p-8">
                <h1 style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '32px',
                  color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                  marginBottom: '20px'
                }}>
                  ZUNA.IO
                </h1>
                <p style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '14px',
                  color: isDarkMode ? '#B0B0B0' : '#666666',
                  marginBottom: '30px'
                }}>
                  Eat • Grow • Survive
                </p>
                
                {!isPremium && dailyPlaysRemaining === 0 && (
                  <div className="mb-4 p-4" style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '2px solid #ef4444',
                    borderRadius: '4px'
                  }}>
                    <p style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '12px',
                      color: '#ef4444'
                    }}>
                      No plays remaining!
                    </p>
                    <p style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '10px',
                      color: '#FFD700',
                      marginTop: '10px'
                    }}>
                      Upgrade to Premium for 3 plays/day
                    </p>
                  </div>
                )}
                
                <button
                  onClick={startGame}
                  disabled={dailyPlaysRemaining <= 0}
                  className="px-8 py-4 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '16px',
                    color: '#FFFFFF',
                    backgroundColor: dailyPlaysRemaining > 0 ? '#10b981' : '#6b7280',
                    border: '4px solid',
                    borderColor: dailyPlaysRemaining > 0 ? '#065f46' : '#4b5563',
                    boxShadow: '4px 4px 0 #000',
                    imageRendering: 'pixelated'
                  }}
                >
                  {dailyPlaysRemaining > 0 ? 'PLAY NOW' : 'NO PLAYS LEFT'}
                </button>
                
                <div className="mt-6">
                  <p style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '10px',
                    color: isDarkMode ? '#B0B0B0' : '#666666'
                  }}>
                    Use mouse to control
                  </p>
                </div>
              </div>
            )}

            {gameOver && (
              <div className="text-center p-8">
                <h2 style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '28px',
                  color: '#ef4444',
                  marginBottom: '20px'
                }}>
                  GAME OVER
                </h2>
                <p style={{
                  fontFamily: pixelFont.style.fontFamily,
                  fontSize: '16px',
                  color: isDarkMode ? '#FFFFFF' : '#1a1a1a',
                  marginBottom: '10px'
                }}>
                  SCORE: {score}
                </p>
                {score === highScore && score > 0 && (
                  <p style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '14px',
                    color: '#FFD700',
                    marginBottom: '30px'
                  }}>
                    NEW HIGH SCORE!
                  </p>
                )}
                <button
                  onClick={resetGame}
                  className="px-8 py-4 transition-all hover:scale-105"
                  style={{
                    fontFamily: pixelFont.style.fontFamily,
                    fontSize: '16px',
                    color: '#FFFFFF',
                    backgroundColor: '#10b981',
                    border: '4px solid #065f46',
                    boxShadow: '4px 4px 0 #000',
                    imageRendering: 'pixelated'
                  }}
                >
                  BACK TO MENU
                </button>
              </div>
            )}

            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              style={{
                display: isPlaying ? 'block' : 'none',
                imageRendering: 'pixelated',
                cursor: 'none'
              }}
            />
          </div>
        </div>

        <GrassyBottom />
      </div>
    </PixelBackground>
  );
}