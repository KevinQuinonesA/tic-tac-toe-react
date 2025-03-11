import { Square } from './Square'
import { TURNS } from '../../constants'

export function ScoreBoard ({ turn }) {
  return (
    <div>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <h2>Turn: {turn}</h2>
    </div>
  )
}
