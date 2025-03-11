// components/Game/Game.jsx
import { useState, useEffect } from 'react'
import { Board } from '../Board/Board'
import { ScoreBoard } from '../Board/ScoreBoard'
import { ScorePopUp } from '../Board/ScorePopUp'
import { GameControls } from '../Board/GameControls'
import { GameModeSelector } from '../Board/GameModeSelector'
import { useTicTacToe } from '../../hooks/useTicTacToe'
import { useAIOpponent } from '../../hooks/useAIOpponent'

export function Game () {
  const [gameMode, setGameMode] = useState(() => {
    return localStorage.getItem('ticTacToeGameMode') || 'twoPlayer'
  })

  const { board, turn, winner, updateBoard, resetGame } = useTicTacToe()

  // Save game mode to localStorage
  useEffect(() => {
    localStorage.setItem('ticTacToeGameMode', gameMode)
    resetGame() // Reset the game when changing modes
  }, [gameMode, resetGame])

  // Determine AI difficulty based on game mode
  const aiDifficulty = (() => {
    switch (gameMode) {
      case 'aiEasy': return 'easy'
      case 'aiMedium': return 'medium'
      case 'aiHard': return 'hard'
      default: return null
    }
  })()

  // Always call the hook, but enable/disable its functionality based on the game mode
  useAIOpponent(board, turn, winner, updateBoard, aiDifficulty, gameMode.startsWith('ai'))

  return (
    <main className='board'>
      <h1 translate='no'>Tic Tac Toe</h1>

      <div className='game-settings'>
        <GameModeSelector currentMode={gameMode} setGameMode={setGameMode} />
      </div>

      <GameControls resetGame={resetGame} />
      <Board
        board={board}
        updateBoard={updateBoard}
      />
      <ScoreBoard turn={turn} />
      <ScorePopUp winner={winner} resetGame={resetGame} turn={turn} />
    </main>
  )
}
