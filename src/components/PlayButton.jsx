import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import './PlayButton.css';

const PlayButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="play-btn-wrapper">
      <motion.button
        className="play-btn"
        onClick={onClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ 
          scale: 1.15,
          boxShadow: "0 0 20px var(--glow-color, rgba(16, 185, 129, 0.6))"
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="Play Tic Tac Toe"
      >
        <FaPlay className="play-icon" />
        <span className="play-btn-pulse" />
      </motion.button>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="play-btn-tooltip mono"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            Play Tic Tac Toe
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlayButton;
