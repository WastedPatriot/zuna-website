'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Press_Start_2P } from 'next/font/google';
import PixelBackground from '../components/PixelBackground';
import GrassyBottom from '../components/GrassyBottom';
import Link from 'next/link';

const pixelFont = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

// Tetris constants
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 30;

// Tetromino shapes
const SHAPES = [
  // I piece
  [[1, 1, 1, 1]],
  // O piece
  [[1, 1], [1, 1]],
  // T piece
  [[0, 1, 0], [1, 1, 1]],
  // S piece
  [[0, 1, 1], [1, 1, 0]],
  // Z piece
  [[1, 1, 0], [0, 1, 1]],
  // J piece
  [[1, 0, 0], [1, 1, 1]],
  // L piece
  [[0, 0, 1], [1, 1, 1]]
];

const COLORS = [
  '#00F0F0', // Cyan (I)
  '#F0F000', // Yellow (O)
  '#A000F0', // Purple (T)
  '#00F000', // Green (S)
  '#F00000', // Red (Z)
  '#0000F0', // Blue (J)
  '#F0A000'  // Orange (L)
];

interface Piece {
  shape: number[][];
  x: number;
  y: number;
  color: string;
}

export default function TetrisPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [board, setBoard] = useState<(string | null)[][]>(() => 
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Create a new random piece
  const createPiece = useCallback(() => {
    const shapeIndex = Math.floor(Math.random() * SHAPES.length);
    return {
      shape: SHAPES[shapeIndex],
      x: Math.floor(BOARD_WIDTH / 2) - 1,
      y: 0,
      color: COLORS[shapeIndex]
    };
  }, []);

  // Check if position is valid
  const isValidMove = useCallback((piece: Piece, board: (string | null)[][]) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = piece.x + x;
          const newY = piece.y + y;
          
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return false;
          }
          
          if (newY >= 0 && board[newY][newX]) {
            return false;
          }
        }
      }
    }
    return true;
  }, []);

  // Rotate piece
  const rotatePiece = useCallback((piece: Piece): Piece => {
    const rotated = piece.shape[0].map((_, index) =>
      piece.shape.map(row => row[index]).reverse()
    );
    return { ...piece, shape: rotated };
  }, []);

  // Lock piece to board
  const lockPiece = useCallback((piece: Piece, board: (string | null)[][]) => {
    const newBoard = board.map(row => [...row]);
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardY = piece.y + y;
          const boardX = piece.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = piece.color;
          }
        }
      }
    }
    
    return newBoard;
  }, []);

  // Clear completed lines
  const clearLines = useCallback((board: (string | null)[][]) => {
    let clearedLines = 0;
    const newBoard = board.filter(row => {
      if (row.every(cell => cell !== null)) {
        clearedLines++;
        return false;
      }
      return true;
    });
    
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(null));
    }
    
    return { newBoard, clearedLines };
  }, []);

  // Handle keyboard input
  useEffect(() => {
    if (!isPlaying || gameOver || isPaused || !currentPiece) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      e.preventDefault();
      
      switch (e.key) {
        case 'ArrowLeft':
          const leftPiece = { ...currentPiece, x: currentPiece.x - 1 };
          if (isValidMove(leftPiece, board)) {
            setCurrentPiece(leftPiece);
          }
          break;
          
        case 'ArrowRight':
          const rightPiece = { ...currentPiece, x: currentPiece.x + 1 };
          if (isValidMove(rightPiece, board)) {
            setCurrentPiece(rightPiece);
          }
          break;
          
        case 'ArrowDown':
          const downPiece = { ...currentPiece, y: currentPiece.y + 1 };
          if (isValidMove(downPiece, board)) {
            setCurrentPiece(downPiece);
            setScore(prev => prev + 1);
          }
          break;
          
        case 'ArrowUp':
        case ' ':
          const rotatedPiece = rotatePiece(currentPiece);
          if (isValidMove(rotatedPiece, board)) {
            setCurrentPiece(rotatedPiece);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPiece, board, isPlaying, gameOver, isPaused, isValidMove, rotatePiece]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver || isPaused) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
      return;
    }

    const speed = Math.max(100, 1000 - (level - 1) * 100);
    
    gameLoopRef.current = setInterval(() => {
      setCurrentPiece(prev => {
        if (!prev) {
          const newPiece = createPiece();
          if (!isValidMove(newPiece, board)) {
            setGameOver(true);
            return null;
          }
          return newPiece;
        }

        const movedPiece = { ...prev, y: prev.y + 1 };
        
        if (isValidMove(movedPiece, board)) {
          return movedPiece;
        } else {
          // Lock piece and create new one
          const newBoard = lockPiece(prev, board);
          const { newBoard: clearedBoard, clearedLines } = clearLines(newBoard);
          
          setBoard(clearedBoard);
          
          if (clearedLines > 0) {
            setLines(l => l + clearedLines);
            setScore(s => s + clearedLines * 100 * level);
            setLevel(l => Math.floor((lines + clearedLines) / 10) + 1);
          }
          
          const newPiece = createPiece();
          if (!isValidMove(newPiece, clearedBoard)) {
            setGameOver(true);
            return null;
          }
          
          return newPiece;
        }
      });
    }, speed);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameOver, isPaused, level, board, lines, createPiece, isValidMove, lockPiece, clearLines]);

  // Start new game
  const startGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)));
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
    setCurrentPiece(createPiece());
  };

  // Render board with current piece
  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    if (currentPiece && !gameOver) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.y + y;
            const boardX = currentPiece.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }
    
    return displayBoard;
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

        {/* Game Container */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="flex gap-8">
            {/* Game Board */}
            <div className="relative">
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '4px solid #667eea',
                padding: '4px',
                imageRendering: 'pixelated'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${CELL_SIZE}px)`,
                  gridTemplateRows: `repeat(${BOARD_HEIGHT}, ${CELL_SIZE}px)`,
                  gap: '1px',
                  backgroundColor: '#1a1a2e'
                }}>
                  {renderBoard().map((row, y) => 
                    row.map((cell, x) => (
                      <div
                        key={`${y}-${x}`}
                        style={{
                          width: CELL_SIZE,
                          height: CELL_SIZE,
                          backgroundColor: cell || 'rgba(255, 255, 255, 0.05)',
                          border: cell ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                          imageRendering: 'pixelated'
                        }}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Game Over Overlay */}
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
                    <p className="text-white mb-4" style={{ fontSize: '14px' }}>
                      Score: {score}
                    </p>
                    <button
                      onClick={startGame}
                      className="px-4 py-2 bg-green-500 text-white hover:bg-green-600"
                      style={{
                        fontFamily: pixelFont.style.fontFamily,
                        fontSize: '12px',
                        border: '2px solid #2d5a2d'
                      }}
                    >
                      PLAY AGAIN
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Side Panel */}
            <div className="space-y-4">
              {/* Score Display */}
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '4px solid #667eea',
                padding: '16px',
                fontFamily: pixelFont.style.fontFamily,
                color: 'white'
              }}>
                <h3 style={{ fontSize: '14px', marginBottom: '12px' }}>SCORE</h3>
                <p style={{ fontSize: '18px', color: '#FFD700' }}>{score}</p>
              </div>

              {/* Level & Lines */}
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '4px solid #667eea',
                padding: '16px',
                fontFamily: pixelFont.style.fontFamily,
                color: 'white'
              }}>
                <div className="mb-4">
                  <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>LEVEL</h3>
                  <p style={{ fontSize: '18px', color: '#00F0F0' }}>{level}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', marginBottom: '8px' }}>LINES</h3>
                  <p style={{ fontSize: '18px', color: '#F0A000' }}>{lines}</p>
                </div>
              </div>

              {/* Controls */}
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '4px solid #667eea',
                padding: '16px',
                fontFamily: pixelFont.style.fontFamily,
                color: 'white'
              }}>
                {!isPlaying ? (
                  <button
                    onClick={startGame}
                    className="w-full px-4 py-3 bg-green-500 text-white hover:bg-green-600"
                    style={{
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '14px',
                      border: '2px solid #2d5a2d'
                    }}
                  >
                    START GAME
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="w-full px-4 py-3 text-white"
                    style={{
                      backgroundColor: isPaused ? '#F0A000' : '#667eea',
                      fontFamily: pixelFont.style.fontFamily,
                      fontSize: '14px',
                      border: '2px solid',
                      borderColor: isPaused ? '#B87800' : '#4A5FC1'
                    }}
                  >
                    {isPaused ? 'RESUME' : 'PAUSE'}
                  </button>
                )}
              </div>

              {/* Instructions */}
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '4px solid #667eea',
                padding: '16px',
                fontFamily: pixelFont.style.fontFamily,
                fontSize: '10px',
                color: 'white'
              }}>
                <h3 className="mb-2" style={{ fontSize: '12px' }}>CONTROLS</h3>
                <div className="space-y-1">
                  <p>← → Move</p>
                  <p>↓ Soft Drop</p>
                  <p>↑/SPACE Rotate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <GrassyBottom />
      </div>
    </PixelBackground>
  );
}
