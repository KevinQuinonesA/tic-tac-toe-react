import { WINNER_COMBOS } from '../constants'

export const checkWinner = (board) => {
  for (let i = 0; i < WINNER_COMBOS.length; i++) {
    const [a, b, c] = WINNER_COMBOS[i]
    if (board[a] && board[a] === board[b] && board[a] === board[c]) { return true }
  }
  return null
}

export const checkDraw = (board) => {
  return board.every((square) => square !== null)
}
