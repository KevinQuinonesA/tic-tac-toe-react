export function ScorePopUp ({ winner, resetGame, turn }) {
  if (winner === null) return null
  return (
    <div>
      <section className='winner'>
        <div className='text'>
          <h2>
            {
                    winner === false ? 'Draw' : 'Winner: ' + turn
                }
          </h2>
          <button onClick={resetGame}>Reset Game</button>
        </div>
      </section>
    </div>
  )
}
