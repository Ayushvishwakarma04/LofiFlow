import React, { useEffect, useState } from 'react'
import githubLogo from '../assets/Github.png'
import linkedinLogo from '../assets/linkedin.webp'

const Navbar = ({ currentSong = 'Lofi Chill Beats' }) => {
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

  // Fullscreen toggle handler
  const handleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        handleFullscreen();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <nav className="bg-green-900 px-8 py-4 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl font-bold tracking-wide cursor-pointer" onClick={() => window.location.href = '/'}
        >
          LofiFLow
        </div>
        <ul className="flex gap-8 items-center">
          <li>
            <button
              onClick={() => window.open('/futureScope', '_blank')}
              className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-4 py-1 rounded-full shadow transition-transform duration-200"
            >
              🔮 Future Scope
            </button>
          </li>
          <li>
            <button
              onClick={handleFullscreen}
              title="Toggle Fullscreen (F)"
              className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-4 py-1 rounded-full shadow transition-transform duration-200 flex items-center gap-2 relative overflow-hidden"
              style={{ minWidth: 120 }}
            >
              {!isFullscreen && (
                <span
                  className="absolute left-4 transition-all duration-300 opacity-100 scale-100"
                  style={{ pointerEvents: 'auto' }}
                  role="img" aria-label="fullscreen"
                >🖥️</span>
              )}
              <span className={isFullscreen ? "ml-0 transition-all duration-300" : "ml-8 transition-all duration-300"}>
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </span>
            </button>
          </li>
          <li>
            <a href="https://github.com/Ayushvishwakarma04" target="_blank" rel="noopener noreferrer">
              <img
                src={githubLogo}
                alt="Github"
                className="w-8 h-8 rounded-full hover:scale-110 transition-transform duration-200"
              />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/ayush-vishwakarma-9a177a24a/" target="_blank" rel="noopener noreferrer">
              <img
                src={linkedinLogo}
                alt="LinkedIn"
                className="w-8 h-8 rounded-full hover:scale-110 transition-transform duration-200"
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
