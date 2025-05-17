import React, { useState, useRef, useEffect } from 'react'
import third from './assets/3.jpg'
import first from './assets/1.jpg'
import secondImg from './assets/2.webp'
import secondVid from './assets/2.mp4'
import thirdVid from './assets/3.mp4'
import fourth from './assets/4.jpg'
import fourthVid from './assets/4.mp4'
import fifthVid from './assets/5.mp4'
import fifthImg from './assets/5.webp'
import songsData from './songs.json'
import bgVideo from './assets/1.mp4'
import bgSound from './assets/bgSound4.mp4'

const songFiles = [
  '/default-assets/song/1.mp3',
  '/default-assets/song/2.mp3',
  '/default-assets/song/3.mp3',
  '/default-assets/song/4.mp3',
  '/default-assets/song/test1.mp3',
];

const avatarMap = {
  first: { type: 'image', src: first },
  second: { type: 'video', src: secondVid, poster: secondImg },
  third: { type: 'video', src: thirdVid, poster: third },
  fourth: { type: 'video', src: fourthVid, poster: fourth },
  fifth: { type: 'video', src: fifthVid, poster: fifthImg },
};

const songs = songsData.map(song => ({
  ...song,
  songSrc: songFiles[song.songSrc],
  songAvatar: avatarMap[song.songAvatar],
}));

const backgrounds = [bgVideo, secondVid, thirdVid, fourthVid, fifthVid]

const App = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const [fade, setFade] = useState(false)
  const [songIndex, setSongIndex] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [audioProgress, setAudioProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null)

  const background = backgrounds[backgroundIndex]
  const currentSong = songs[songIndex]

  const handleChangeBackground = () => {
    setFade(true)
    setTimeout(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length)
      setFade(false)
    }, 400)
  }

  const handleNextSong = () => {
    setSongIndex((prev) => (prev + 1) % songs.length)
    setAudioProgress(0)
  }

  const handlePrevSong = () => {
    setSongIndex((prev) => (prev - 1 + songs.length) % songs.length)
    setAudioProgress(0)
  }

  const handleAudioPlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setAudioProgress(isNaN(progress) ? 0 : progress);
      setCurrentTime(audioRef.current.currentTime);
    }
  }

  // const handleProgressBarChange = (e) => {
  //   const value = e.target.value
  //   if (audioRef.current) {
  //     audioRef.current.currentTime = (value / 100) * audioRef.current.duration
  //     setAudioProgress(value)
  //   }
  // }

  const handleVolumeChange = (e) => {
    const value = e.target.value
    setVolume(value)
    if (audioRef.current) {
      audioRef.current.volume = value
    }
  }

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  // const formatTime = (seconds) => {
  //   const min = Math.floor(seconds / 60);
  //   const sec = Math.floor(seconds % 60);
  //   return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  // };

  useEffect(() => {
    const handleSpacebar = (e) => {
      if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        handleAudioPlayPause();
      }
    };
    window.addEventListener('keydown', handleSpacebar);
    return () => window.removeEventListener('keydown', handleSpacebar);
  }, [isPlaying]);

  useEffect(() => {
    setFade(true);
    const timeout = setTimeout(() => {
      setBackgroundIndex(songIndex);
      setFade(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [songIndex]);

  return (
    <div className="relative h-screen w-full">
      <video
        className={`fixed top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-700 pointer-events-none ${fade ? 'opacity-0' : 'opacity-100'}`}
        src={backgrounds[backgroundIndex]}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute left-0 bottom-0 m-8 flex flex-row items-center gap-8 bg-gradient-to-br from-black/90 via-green-900/80 to-black/80 p-8 rounded-2xl min-w-[540px] max-w-[700px] shadow-2xl border border-green-800 backdrop-blur-md opacity-100 z-10">
        <div className="flex-shrink-0 flex items-center justify-center">
          <div className="relative w-20 h-20 flex items-center justify-center">
            {isPlaying && (
              <video
                src={bgSound}
                autoPlay
                loop
                muted
                playsInline
                className="absolute w-20 h-20 object-cover rounded-full z-10 mix-blend-lighten"
                style={{ background: 'transparent' }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-3">
          <audio
            ref={audioRef}
            src={currentSong.songSrc}
            onTimeUpdate={handleAudioTimeUpdate}
            volume={volume}
            autoPlay
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            muted={isMuted}
            onEnded={() => {
              audioRef.current.currentTime = 0;
              audioRef.current.play();
            }}
          />
          <div className="flex items-center gap-3 w-full">
            <button onClick={handlePrevSong} className="text-lime-400 text-2xl p-2 rounded-full hover:bg-lime-900/40 transition"><span role='img' aria-label='prev'>⏮️</span></button>
            <button onClick={handleAudioPlayPause} className="text-white text-3xl p-2 rounded-full hover:bg-lime-900/40 transition">
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button onClick={handleNextSong} className="text-lime-400 text-2xl p-2 rounded-full hover:bg-lime-900/40 transition"><span role='img' aria-label='next'>⏭️</span></button>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-center gap-3 w-full">
                <span className="text-lime-400 text-lg cursor-pointer select-none" onClick={handleMuteToggle}>
                  {isMuted ? '🔇' : '🔊'}
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 accent-lime-500 h-2 rounded-lg bg-gray-700/60"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className="flex-1 px-4 py-2 bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-white rounded-lg shadow hover:scale-105 transition-transform duration-200 font-semibold"
              onClick={handleNextSong}
            >
              Next Song
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
