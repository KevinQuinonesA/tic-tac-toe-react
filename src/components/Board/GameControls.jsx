export function GameControls ({ resetGame }) {
  return (
    <div className='controls'>
      <button onClick={resetGame}>Reset the game</button>
    </div>
  )
}
