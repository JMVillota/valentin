import { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ValentineCard.css';
import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import img3 from './assets/3.jpg';
import img4 from './assets/4.jpg';
import img5 from './assets/5.jpg';
import img6 from './assets/6.jpg';
import img7 from './assets/7.jpg';
import img8 from './assets/8.jpg';
import img9 from './assets/9.jpg';
import img10 from './assets/10.jpg';
import img11 from './assets/11.jpg';
import img12 from './assets/12.jpg';
import img13 from './assets/13.jpg';
import img14 from './assets/14.jpg';
import smileGif from './assets/Smile.gif';
import loveGif from './assets/love.gif';
import { Music } from 'lucide-react';

const Star = () => (
  <svg width="20" height="20" viewBox="0 0 20 20">
    <motion.path
      d="M10 0L13.09 6.18L20 7.24L15 12.18L16.18 19.02L10 15.77L3.82 19.02L5 12.18L0 7.24L6.91 6.18L10 0Z"
      fill="#FFD700"
      stroke="#FFA500"
      strokeWidth="0.5"
    />
  </svg>
);

const Sparkle = () => (
  <svg width="15" height="15" viewBox="0 0 15 15">
    <motion.path
      d="M7.5 0L9 5.5L14.5 7L9 8.5L7.5 14L6 8.5L0.5 7L6 5.5L7.5 0Z"
      fill="#FFF"
      stroke="#FFD700"
      strokeWidth="0.5"
    />
  </svg>
);

const BackgroundEffects = () => (
  <div className="background-effects">
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.div
        key={i}
        className="effect-wrapper"
        initial={{
          opacity: 0,
          scale: 0,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          rotate: [0, 180]
        }}
        transition={{
          duration: 2,
          delay: Math.random() * 3,
          repeat: Infinity,
          repeatDelay: Math.random() * 2
        }}
      >
        {i % 2 === 0 ? <Star /> : <Sparkle />}
      </motion.div>
    ))}
  </div>
);

const FloatingImages = () => {
  const images = [
    img1, img2, img3, img4, img5, img6, img7,
    img8, img9, img10, img11, img12, img13, img14
  ];

  return (
    <div className="floating-images-container">
      {images.map((img, index) => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const safeMargin = 100;

        const startX = index % 2 === 0 ? -safeMargin : viewportWidth + safeMargin;
        const endX = index % 2 === 0 ? viewportWidth + safeMargin : -safeMargin;

        const centerY = viewportHeight / 2;
        const startY = Math.random() > 0.5
          ? Math.random() * (centerY - safeMargin)
          : centerY + Math.random() * (viewportHeight - centerY - safeMargin);

        return (
          <motion.div
            key={index}
            className="floating-image-wrapper"
            initial={{
              opacity: 0,
              scale: 0.5,
              x: startX,
              y: startY,
              rotate: 0
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.5],
              x: [startX, startX + (endX - startX) * 0.5, endX],
              y: [startY, startY + Math.random() * 50 - 25, startY],
              rotate: [0, index % 2 === 0 ? -15 : 15, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: index * 1,
              repeat: Infinity,
              repeatDelay: Math.random() * 3
            }}
          >
            <img
              src={img}
              alt={`Valentine memory ${index + 1}`}
              className="floating-image"
            />
          </motion.div>
        );
      })}
    </div>
  );
};

const ValentineCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [response, setResponse] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'einn_UJgGGM',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: 'einn_UJgGGM'
        },
        events: {
          onReady: () => {
            playerRef.current?.setVolume(50);
          }
        }
      });
    };
  
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const handleResponse = (answer) => {
    setResponse(true);
  };

  return (
    <div className="card-scene">
      <AnimatePresence>
        {isOpen && (
          <>
            <BackgroundEffects />
            <FloatingImages />
          </>
        )}
      </AnimatePresence>

      <button
        className="music-control"
        onClick={toggleMusic}
      >
        <Music
          className={`music-icon ${isPlaying ? 'playing' : ''}`}
          color="#ff6b95"
          size={20}
        />
      </button>

      <div id="youtube-player" style={{ display: 'none' }}></div>

      <div className="card-container">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="letter"
              initial={{ scale: 0.8, opacity: 0, z: -100 }}
              animate={{
                scale: 1,
                opacity: 1,
                z: 0,
                transition: { type: "spring", damping: 12 }
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
                z: -100,
                transition: { duration: 0.3 }
              }}
            >
              <div className="letter-content">
                <motion.img
                  src={loveGif}
                  alt="Love Animation"
                  className="love-gif"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'contain',
                    margin: '0 auto',
                    display: 'block'
                  }}
                />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="valentine-message"
                >
                  Mi amor hermosa, cada día me enamoro más de ti.
                  Tu sonrisa ilumina mi mundo y tu amor me hace mejor persona.
                  Eres mi felicidad y mi razón de sonreír.
                  No puedo imaginar mi vida sin ti. ❤️
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="valentine-title"
                >
                  {response === null ? '¿Quieres ser mi Valentín?' :
                    '¡Gracias por decir SÍ! ❤️'}
                </motion.h2>
                {response === null && (
                  <motion.div
                    className="response-buttons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <button
                      className="response-button yes"
                      onClick={() => handleResponse(true)}
                    >
                      ¡Sí! 🥰
                    </button>
                    <motion.button
                      className="response-button no"
                      initial={{ x: 0 }}
                      whileHover={{
                        x: [0, -100, 100, -50, 50, 0],
                        transition: { duration: 0.5 }
                      }}
                      onClick={() => handleResponse(true)}
                    >
                      No 😢
                    </motion.button>
                  </motion.div>
                )}
                {response !== null && (
                  <motion.img
                    src={smileGif}
                    alt="Click to close"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="close-gif"
                    onClick={() => setIsOpen(false)}
                    style={{
                      cursor: 'pointer',
                      width: '100px',
                      height: 'auto',
                      margin: '20px auto 0'
                    }}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && (
          <motion.div
            className="initial-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Para Carolina ❤️
          </motion.div>
        )}
        <motion.div
          className={`envelope ${isOpen ? 'open' : ''}`}
          animate={{
            scale: isOpen ? 0.8 : [1, 1.02, 1],
            z: isOpen ? -200 : 0,
            opacity: isOpen ? 0.6 : 1,
            y: isOpen ? 0 : [0, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: isOpen ? 0 : Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <div className="envelope-flap" />
          <div className="envelope-front">
            <Heart className="heart-seal" fill="#ff6b95" size={30} />
          </div>
          {!isOpen && (
            <motion.div
              className="envelope-clickable"
              onClick={() => {
                setIsOpen(true);
                if (!isPlaying) toggleMusic();
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ValentineCard;
