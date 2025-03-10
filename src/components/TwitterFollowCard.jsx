import { useState } from "react"
export function TwitterFollowCard({children, username='unknown', displayName='Unknown', initialIsFollowing}) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

    const isHandleClick = () => {
        setIsFollowing(!isFollowing)
    }

    const buttonClassName = isFollowing
        ? 'tw-follow-card-button is-following'
        : 'tw-follow-card-button'
    
    return (
        <article className="tw-follow-card">
            <header className="tw-follow-card-header">
                <img className="tw-follow-card-avatar"
                alt={`El avatar de ${username}`}
                src={`https://unavatar.io/${username}`} />
                <div className="tw-follow-card-info">
                    <strong>{displayName}</strong>
                    <span className="tw-follow-card-info-userName">@{username}</span>
                </div>
            </header>

            <aside>
                <button className={buttonClassName}
                onClick={isHandleClick}>
                    {isFollowing ? 'Siguiendo' : 'Seguir'}
                </button>
            </aside>
        </article>
    )
}