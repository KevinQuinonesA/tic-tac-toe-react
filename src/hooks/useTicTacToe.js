// hooks/useTicTacToe.js
import { useState, useEffect, useCallback } from 'react'
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

  const [stats, setStats] = useState(() => {
    const savedStats = window.localStorage.getItem('ticTacToeStats')
    return savedStats
      ? JSON.parse(savedStats)
      : { xWins: 0, oWins: 0, draws: 0 }
  })

  const updateBoard = useCallback((index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()

      // Update stats
      if (newWinner === TURNS.X) {
        setStats(prev => ({ ...prev, xWins: prev.xWins + 1 }))
      } else if (newWinner === TURNS.O) {
        setStats(prev => ({ ...prev, oWins: prev.oWins + 1 }))
      }
      return
    } else if (checkDraw(newBoard)) {
      setWinner(false)
      setStats(prev => ({ ...prev, draws: prev.draws + 1 }))
      return
    }

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }, [board, turn, winner])

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
  }, [board, turn])

  useEffect(() => {
    window.localStorage.setItem('ticTacToeStats', JSON.stringify(stats))
  }, [stats])

  return { board, turn, winner, stats, updateBoard, resetGame }
}
