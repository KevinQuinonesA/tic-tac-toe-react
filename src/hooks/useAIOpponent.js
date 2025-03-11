// hooks/useAIOpponent.js
import { useEffect } from 'react'
import { TURNS } from '../constants'

// Different AI difficulty levels
const makeMoveEasy = (board) => {
  // Find empty cells
  const emptyCells = board
    .map((cell, index) => cell === null ? index : null)
    .filter(index => index !== null)

  if (emptyCells.length > 0) {
    // Easy AI: just pick a random empty cell
    const randomIndex = Math.floor(Math.random() * emptyCells.length)
    return emptyCells[randomIndex]
  }
  return null
}

const makeMoveMedium = (board) => {
  // First check if AI can win in the next move
  const winMove = findWinningMove(board, TURNS.O)
  if (winMove !== null) return winMove

  // Then check if player can win in the next move and block
  const blockMove = findWinningMove(board, TURNS.X)
  if (blockMove !== null) return blockMove

  // If no winning or blocking moves, pick a random cell
  return makeMoveEasy(board)
}

const findWinningMove = (board, player) => {
  // Check all empty spaces to see if placing the player's symbol would create a win
  const emptyCells = board
    .map((cell, index) => cell === null ? index : null)
    .filter(index => index !== null)

  // Try each empty cell to see if it creates a win
  for (const index of emptyCells) {
    const testBoard = [...board]
    testBoard[index] = player

    // Check winning patterns
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ]

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern
      if (
        testBoard[a] &&
        testBoard[a] === testBoard[b] &&
        testBoard[a] === testBoard[c]
      ) {
        return index
      }
    }
  }

  return null
}

const makeMoveHard = (board) => {
  // First check if AI can win in the next move
  const winMove = findWinningMove(board, TURNS.O)
  if (winMove !== null) return winMove

  // Then check if player can win in the next move and block
  const blockMove = findWinningMove(board, TURNS.X)
  if (blockMove !== null) return blockMove

  // Strategic moves for hard difficulty
  // Take center if available
  if (board[4] === null) return 4

  // Take corners if available
  const corners = [0, 2, 6, 8]
  const emptyCorners = corners.filter(corner => board[corner] === null)
  if (emptyCorners.length > 0) {
    return emptyCorners[Math.floor(Math.random() * emptyCorners.length)]
  }

  // Take edges if available
  const edges = [1, 3, 5, 7]
  const emptyEdges = edges.filter(edge => board[edge] === null)
  if (emptyEdges.length > 0) {
    return emptyEdges[Math.floor(Math.random() * emptyEdges.length)]
  }

  return null
}

export function useAIOpponent (board, turn, winner, updateBoard, difficulty = 'medium', enabled = true) {
  useEffect(() => {
    // Only proceed if AI is enabled and it's O's turn
    if (!enabled || turn !== TURNS.O || winner) {
      return
    }

    const timeout = setTimeout(() => {
      let moveIndex = null

      // Select move based on difficulty
      switch (difficulty) {
        case 'easy':
          moveIndex = makeMoveEasy(board)
          break
        case 'hard':
          moveIndex = makeMoveHard(board, turn)
          break
        case 'medium':
        default:
          moveIndex = makeMoveMedium(board, turn)
          break
      }

      if (moveIndex !== null) {
        updateBoard(moveIndex)
      }
    }, 600) // Slight delay for better UX

    return () => clearTimeout(timeout)
  }, [board, turn, winner, updateBoard, difficulty, enabled])
}
