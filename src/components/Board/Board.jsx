import { ScorePopUp } from './ScorePopUp'
import { Square } from './Square'

export function Board({board, winner, turn, updateBoard, resetGame}) {
  return (
    <>
        <section className='game'>
          {
            board.map((value, index)=>(
              <Square key={index} index={index} updateBoard={updateBoard}>
                { value }
              </Square>
            ))
          }
        </section>

        <ScorePopUp winner={winner} resetGame={resetGame} turn={turn} />
    </>
  )
}