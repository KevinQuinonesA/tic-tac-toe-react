// components/Board/Square.jsx
export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''} ${children === 'X' ? 'x' : children === 'O' ? 'o' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div
      className={className}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
