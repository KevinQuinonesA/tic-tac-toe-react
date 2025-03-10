import { useState } from 'react'
import { TwitterFollowCard }from './components/TwitterFollowCard'
import './App.css'
import confetti from 'canvas-confetti'
import { TURNS } from './constants'
import { checkDraw, checkWinner } from './logic/board'
import { Board } from './components/Board/Board'
import { ScoreBoard } from './components/Board/ScoreBoard'

function App() {
  // Tic Tac Toe
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)

  // null, there is no winner; false is a draw; true is a win
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    //Don't update if there is already a value
    if(board[index] || winner ) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newWinner = checkWinner(newBoard)

    if(newWinner) {
      setWinner(newWinner)
      confetti()
      return
    } else if(checkDraw(newBoard)) {
      setWinner(false)
      return
    }

    console.log(turn);
    
    //Change turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  // Twitter Follow Card
  const userName = 'dsetatech'
  const displayName = 'Dseta'

  return (  
    <>
      <main className='board'>
        <h1>Tic Tac Toe</h1>
        <Board 
          board={board}
          turn={turn}
          winner={winner}
          updateBoard={updateBoard}
          resetGame={resetGame} />
        
        <ScoreBoard turn={turn} />

      </main>
      <div className='tw-follow-card-container'>
        <TwitterFollowCard 
          key={userName}
          username={userName}
          displayName={displayName}
          initialIsFollowing={false} />
      </div>

    </>
  )
}

export default App
