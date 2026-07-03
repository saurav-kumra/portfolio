import { checkWinner } from './checkWinner';

/**
 * Evaluates the board score.
 * O (Computer) is maximizer (+10)
 * X (Human) is minimizer (-10)
 * Draw is 0
 */
function evaluateBoard(board) {
  const result = checkWinner(board);
  if (result) {
    if (result.winner === 'O') return 10;
    if (result.winner === 'X') return -10;
    if (result.winner === 'draw') return 0;
  }
  return null;
}

/**
 * Minimax recursive search function.
 */
function minimax(board, depth, isMaximizing) {
  const score = evaluateBoard(board);

  // If game is over, return the score
  if (score !== null) {
    return score;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const currentScore = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(bestScore, currentScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        const currentScore = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(bestScore, currentScore);
      }
    }
    return bestScore;
  }
}

/**
 * Finds the best move for the computer ('O')
 * @param {Array} board - Current board state
 * @returns {number} - Best index to place O
 */
function findBestMove(board) {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

/**
 * Gets a random valid move from the board.
 */
function getRandomMove(board) {
  const availableMoves = [];
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      availableMoves.push(i);
    }
  }
  if (availableMoves.length === 0) return -1;
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}

/**
 * Primary entry point for AI move selection.
 * @param {Array} board - Current board state
 * @param {string} difficulty - 'easy', 'medium', or 'impossible'
 * @returns {number} - Index (0-8) selected by AI
 */
export function getAIMove(board, difficulty = 'impossible') {
  if (difficulty === 'easy') {
    return getRandomMove(board);
  }

  if (difficulty === 'medium') {
    // 50% chance of making a perfect minimax move, 50% chance of random
    const makeBestMove = Math.random() < 0.5;
    if (makeBestMove) {
      return findBestMove(board);
    } else {
      return getRandomMove(board);
    }
  }

  // Default to Impossible: perfect Minimax play
  return findBestMove(board);
}
