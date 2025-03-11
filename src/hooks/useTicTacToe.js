import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { TURNS } from '../constants'
import { checkWinner, checkDraw } from '../logic/board'

export function useTicTacToe () {
  const [board, setBoard] = useState(() => {
    const board = window.localStorage.getItem('board')
    return board ? JSON.parse(board) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turn = window.localStorage.getItem('turn')
    return turn || TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
      return
    } else if (checkDraw(newBoard)) {
      setWinner(false)
      return
    }

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  useEffect(() => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
  }, [board, turn])

  return { board, turn, winner, updateBoard, resetGame }
}
