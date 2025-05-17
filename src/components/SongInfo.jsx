import React from 'react'

const SongInfo = ({ songName, songArtist, songAvatar, onAvatarClick, avatarClass }) => {
  return (
    <div className="flex items-center gap-4">
      {songAvatar.type === 'video' ? (
        <video
          src={songAvatar.src}
          poster={songAvatar.poster}
          className={`w-16 h-16 rounded-lg object-cover cursor-pointer ${avatarClass}`}
          onClick={onAvatarClick}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          src={songAvatar.src}
          alt="Song Avatar"
          className={`w-16 h-16 rounded-lg object-cover cursor-pointer ${avatarClass}`}
          onClick={onAvatarClick}
        />
      )}
      <div>
        <div className="text-white text-lg font-bold">{songName}</div>
        <div className="text-gray-300 text-sm">{songArtist}</div>
      </div>
    </div>
  )
}

export default SongInfo
