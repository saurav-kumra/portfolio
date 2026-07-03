import React from 'react';
import { motion } from 'framer-motion';
import './ContainerBoard.css';

// Import cropped container images
import container_0_0 from '../assets/container_0_0.png';
import container_0_1 from '../assets/container_0_1.png';
import container_0_2 from '../assets/container_0_2.png';
import container_1_0 from '../assets/container_1_0.png';
import container_1_1 from '../assets/container_1_1.png';
import container_1_2 from '../assets/container_1_2.png';
import container_2_0 from '../assets/container_2_0.png';
import container_2_1 from '../assets/container_2_1.png';
import container_2_2 from '../assets/container_2_2.png';

const containerImages = [
  container_0_0, container_0_1, container_0_2,
  container_1_0, container_1_1, container_1_2,
  container_2_0, container_2_1, container_2_2
];

const drawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { 
      pathLength: { type: "spring", stiffness: 100, damping: 15 },
      opacity: { duration: 0.1 }
    }
  }
};

const XMarker = () => (
  <svg viewBox="0 0 100 100" className="marker-svg x-marker" aria-label="X">
    <motion.line 
      x1="28" y1="28" x2="72" y2="72" 
      stroke="#00F3FF" strokeWidth="10" strokeLinecap="round" 
      variants={drawVariants} 
      initial="hidden" 
      animate="visible" 
    />
    <motion.line 
      x1="72" y1="28" x2="28" y2="72" 
      stroke="#00F3FF" strokeWidth="10" strokeLinecap="round" 
      variants={drawVariants} 
      initial="hidden" 
      animate="visible" 
      transition={{ delay: 0.1 }}
    />
  </svg>
);

const OMarker = () => (
  <svg viewBox="0 0 100 100" className="marker-svg o-marker" aria-label="O">
    <motion.circle 
      cx="50" cy="50" r="22" 
      stroke="#FF007F" strokeWidth="10" fill="none" strokeLinecap="round" 
      variants={drawVariants} 
      initial="hidden" 
      animate="visible" 
    />
  </svg>
);

const ContainerBoard = ({ board, onCellClick, winningLine, isFlipped, disabled }) => {
  return (
    <div className="game-overlay-grid">
      {board.map((cellValue, index) => {
        const isWinningCell = winningLine && winningLine.includes(index);
        
        // Define animation variants for individual card flipping (with slight stagger delays)
        const cardVariants = {
          front: { 
            rotateY: 0,
            transition: { duration: 0.5, ease: "easeInOut" }
          },
          back: { 
            rotateY: 180,
            transition: { 
              duration: 0.5, 
              ease: "easeInOut",
              delay: (index % 3 + Math.floor(index / 3)) * 0.05 // Staggered cascade flip effect
            }
          }
        };

        return (
          <div key={index} className="cell-card-container">
            <motion.div 
              className={`cell-card ${isWinningCell ? 'winning-glow' : ''}`}
              variants={cardVariants}
              animate={isFlipped ? "back" : "front"}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front Face: The exact cropped container image */}
              <div className="card-face card-front">
                <img 
                  src={containerImages[index]} 
                  alt={`Container ${index}`} 
                  className="card-img" 
                />
              </div>

              {/* Back Face: Gameplay cell (clickable, faded background logo, and centered mark) */}
              <button 
                className="card-face card-back"
                onClick={() => !disabled && cellValue === null && onCellClick(index)}
                disabled={disabled || cellValue !== null}
                style={{ transform: "rotateY(180deg)" }}
                aria-label={`Cell ${index + 1}`}
              >
                {/* Faded Background Logo */}
                <div className="card-back-bg-wrapper">
                  <img 
                    src={containerImages[index]} 
                    alt={`Faded Container ${index}`} 
                    className="card-img faded-bg-img" 
                  />
                  <div className="card-back-overlay" />
                </div>

                {/* Centered Marker X/O */}
                <div className="cell-marker-container">
                  {cellValue === 'X' && <XMarker />}
                  {cellValue === 'O' && <OMarker />}
                </div>
              </button>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default ContainerBoard;
