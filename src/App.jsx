import { TwitterFollowCard } from './components/TwitterFollowCard'
import './App.css'
import { Game } from './components/Game/Game'

function App () {
  // Twitter Follow Card
  const userName = 'dsetatech'
  const displayName = 'Dseta'

  return (
    <>
      <Game />
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
