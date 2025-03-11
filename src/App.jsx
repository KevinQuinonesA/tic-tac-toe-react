import { useEffect, useState } from 'react'
import { TwitterFollowCard } from './components/TwitterFollowCard'
import './App.css'
import confetti from 'canvas-confetti'
import { TURNS } from './constants'
import { checkDraw, checkWinner } from './logic/board'
import { Board } from './components/Board/Board'
import { ScoreBoard } from './components/Board/ScoreBoard'
import { ScorePopUp } from './components/Board/ScorePopUp'
import { GameControls } from './components/Board/GameControls'

function App () {
  // Tic Tac Toe
  const [board, setBoard] = useState(() => {
    const board = window.localStorage.getItem('board')
    return board ? JSON.parse(board) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turn = window.localStorage.getItem('turn')
    return turn || TURNS.X
  })

  // null, there is no winner; false is a draw; true is a win
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    // Don't update if there is already a value
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

    // Change turn
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

  // Twitter Follow Card
  const userName = 'dsetatech'
  const displayName = 'Dseta'

  return (
    <>
      <main className='board'>
        <h1 translate='no'>Tic tac toe</h1>
        <GameControls resetGame={resetGame} />
        <Board board={board} updateBoard={updateBoard} />
        <ScoreBoard turn={turn} />
        <ScorePopUp winner={winner} resetGame={resetGame} turn={turn} />
      </main>

      <div className='tw-follow-card-container'>
        <TwitterFollowCard
          key={userName}
          username={userName}
          displayName={displayName}
          initialIsFollowing={false}
        />
      </div>
    </>

  )
}

export default App
