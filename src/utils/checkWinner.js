/**
 * Checks the current Tic Tac Toe board for a winner.
 * @param {Array} board - Array of 9 elements representing the board cells
 * @returns {Object|null} - Winning info { winner, line } or { winner: 'draw' } or null
 */
export function checkWinner(board) {
  const lines = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Col 1
    [1, 4, 7], // Col 2
    [2, 5, 8], // Col 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: lines[i] };
    }
  }

  // Check for draw (no null/empty cells left)
  const isDraw = board.every(cell => cell !== null);
  if (isDraw) {
    return { winner: 'draw' };
  }

  return null;
}
