import { Square } from './Square'

export function Board({board, updateBoard}) {
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
    </>
  )
}