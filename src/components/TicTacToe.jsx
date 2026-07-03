import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRefreshCw, FiX } from 'react-icons/fi';
import ContainerBoard from './ContainerBoard';
import { checkWinner } from '../utils/checkWinner';
import { getAIMove } from '../utils/minimax';
import './TicTacToe.css';

// Particle component for win celebration
const Particle = ({ color, delay, angle, speed }) => {
  const radians = (angle * Math.PI) / 180;
  const vx = Math.cos(radians) * speed;
  const vy = Math.sin(radians) * speed;

  return (
    <motion.div
      className="game-particle"
      style={{ backgroundColor: color }}
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{
        x: vx * 2.5,
        y: [0, vy - 15, vy + 150], // parabolic path (gravitational fall)
        scale: [1, 1.2, 0],
        opacity: [1, 1, 0]
      }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
        delay: delay
      }}
    />
  );
};

const TicTacToe = ({ onClose }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('X'); // X is Human, O is AI
  const [difficulty, setDifficulty] = useState('impossible'); // Default to Impossible
  const [gameStatus, setGameStatus] = useState('active'); // active, win, lose, draw
  const [winningLine, setWinningLine] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [particles, setParticles] = useState([]);

  // Auto-flip open on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Generate particles on human win
  const triggerWinCelebration = () => {
    const colors = ['#10B981', '#00F3FF', '#FF007F', '#FBBF24', '#ffffff'];
    const newParticles = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * 360,
      speed: 50 + Math.random() * 120,
      delay: Math.random() * 0.2
    }));
    setParticles(newParticles);
  };

  // Handle AI turn
  useEffect(() => {
    if (currentPlayer === 'O' && gameStatus === 'active') {
      setIsThinking(true);
      
      // Artificial delay to simulate AI thinking
      const thinkingTimer = setTimeout(() => {
        const aiMove = getAIMove(board, difficulty);
        if (aiMove !== -1) {
          const newBoard = [...board];
          newBoard[aiMove] = 'O';
          
          setBoard(newBoard);
          
          const result = checkWinner(newBoard);
          if (result) {
            if (result.winner === 'O') {
              setGameStatus('lose');
              setWinningLine(result.line);
            } else if (result.winner === 'draw') {
              setGameStatus('draw');
            }
          }
          
          setCurrentPlayer('X');
        }
        setIsThinking(false);
      }, 700);

      return () => clearTimeout(thinkingTimer);
    }
  }, [currentPlayer, gameStatus, board, difficulty]);

  // Handle human move
  const handleCellClick = (index) => {
    if (board[index] !== null || gameStatus !== 'active' || currentPlayer !== 'X' || isThinking) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      if (result.winner === 'X') {
        setGameStatus('win');
        setWinningLine(result.line);
        triggerWinCelebration();
      } else if (result.winner === 'draw') {
        setGameStatus('draw');
      }
      setCurrentPlayer('O'); // set to O, but game ends
    } else {
      setCurrentPlayer('O');
    }
  };

  // Restart board
  const handleReplay = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameStatus('active');
    setWinningLine(null);
    setIsThinking(false);
    setParticles([]);
  };

  // Handle closing with clean flip-back transition
  const handleClose = () => {
    setIsFlipped(false);
    // Wait for the flip animation to finish before unmounting/closing
    setTimeout(() => {
      onClose();
    }, 600);
  };

  // Get status message details
  const getStatusDetails = () => {
    switch (gameStatus) {
      case 'win':
        return { text: "YOU WIN!", className: "status-text win" };
      case 'lose':
        return { text: "YOU LOSE...", className: "status-text lose" };
      case 'draw':
        return { text: "IT'S A DRAW", className: "status-text draw" };
      default:
        return isThinking 
          ? { text: "AI THINKING...", className: "status-text thinking" }
          : { text: "YOUR TURN (X)", className: "status-text human" };
    }
  };

  const status = getStatusDetails();

  return (
    <div className="tictactoe-overlay-wrapper">
      {/* Celebration particles */}
      <div className="celebration-particles-container">
        {particles.map((p) => (
          <Particle 
            key={p.id} 
            color={p.color} 
            angle={p.angle} 
            speed={p.speed} 
            delay={p.delay} 
          />
        ))}
      </div>

      {/* Top HUD Controls */}
      <div className="game-hud">
        <div className="game-status-panel glass">
          <span className={status.className}>{status.text}</span>
        </div>
        
        <div className="game-controls">
          <button 
            className="hud-btn replay-btn" 
            onClick={handleReplay} 
            title="Reset Game"
            aria-label="Reset Game"
          >
            <FiRefreshCw />
          </button>
          <button 
            className="hud-btn close-btn" 
            onClick={handleClose} 
            title="Close Game"
            aria-label="Close Game"
          >
            <FiX />
          </button>
        </div>
      </div>

      {/* 3x3 Shipping Container Board */}
      <ContainerBoard 
        board={board} 
        onCellClick={handleCellClick} 
        winningLine={winningLine} 
        isFlipped={isFlipped}
        disabled={gameStatus !== 'active' || currentPlayer !== 'X' || isThinking}
      />

      {/* Difficulty Tabs Controller */}
      <div className="game-difficulty-panel glass">
        <span className="difficulty-title mono">DIFFICULTY:</span>
        <div className="difficulty-tabs">
          {['easy', 'medium', 'impossible'].map((mode) => (
            <button
              key={mode}
              className={`difficulty-tab mono ${difficulty === mode ? 'active' : ''}`}
              onClick={() => gameStatus === 'active' && setDifficulty(mode)}
              disabled={gameStatus !== 'active'}
            >
              {mode.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
