// components/Board/GameModeSelector.jsx
import './GameModeSelector.css'

export function GameModeSelector ({ currentMode, setGameMode }) {
  const modes = [
    { id: 'twoPlayer', name: 'Two Players' },
    { id: 'aiEasy', name: 'AI: Easy' },
    { id: 'aiMedium', name: 'AI: Medium' },
    { id: 'aiHard', name: 'AI: Hard' }
  ]

  return (
    <div className='game-mode-selector'>
      <label htmlFor='mode-select'>Game Mode:</label>
      <select
        id='mode-select'
        defaultValue={currentMode}
        onChange={(e) => setGameMode(e.target.value)}
        className='mode-select'
      >
        {modes.map(mode => (
          <option key={mode.id} value={mode.id}>
            {mode.name}
          </option>
        ))}
      </select>
    </div>
  )
}
