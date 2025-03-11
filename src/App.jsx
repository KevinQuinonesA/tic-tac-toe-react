import { TwitterFollowCard } from './components/TwitterFollowCard'
import './App.css'
import { Board } from './components/Board/Board'
import { ScoreBoard } from './components/Board/ScoreBoard'
import { ScorePopUp } from './components/Board/ScorePopUp'
import { GameControls } from './components/Board/GameControls'
import { useTicTacToe } from './hooks/useTicTacToe'

function App () {
  // Tic Tac Toe
  const { board, turn, winner, updateBoard, resetGame } = useTicTacToe()

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
