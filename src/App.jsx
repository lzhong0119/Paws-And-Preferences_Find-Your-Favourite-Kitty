import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, X, Play, Music, RotateCcw } from 'lucide-react';

const CATAAS_API = 'https://cataas.com';

const Card = ({ cat, onSwipe, isFront, zIndex, exitDirection }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-15, 15]);

  // Visual indicators while dragging
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const dislikeOpacity = useTransform(x, [0, -100], [0, 1]);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 100;
    if (info.offset.x > swipeThreshold || info.velocity.x > 800) {
      onSwipe('like');
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -800) {
      onSwipe('dislike');
    }
  };

  return (
    <motion.div
      custom={exitDirection}
      style={{
        x: isFront ? x : 0,
        rotate: isFront ? rotate : 0,
        zIndex,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#fff',
        borderRadius: '24px',
        boxShadow: isFront ? 'var(--shadow-xl)' : 'var(--shadow-lg)',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        scale: isFront ? 1 : 0.95 + (zIndex * 0.01),
        y: isFront ? 0 : (3 - zIndex) * -15,
        opacity: isFront ? 1 : 0.8 + (zIndex * 0.05)
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={isFront ? { cursor: 'grabbing', scale: 1.02 } : {}}
      onDragEnd={isFront ? handleDragEnd : undefined}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: isFront ? 1 : 0.95 + (zIndex * 0.01), opacity: isFront ? 1 : 0.8 + (zIndex * 0.05) }}
      exit={(customDirection) => {
        const currentX = x.get();
        // Prioritize physical location (manual swipe) over batched state for smoothness
        const directionToUse = Math.abs(currentX) > 50 ? currentX : customDirection;
        return {
          x: directionToUse > 0 ? 1000 : -1000,
          opacity: 0,
          transition: { duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }
        };
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        <img
          src={cat.url}
          alt="A cute cat"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          draggable="false"
        />

        {/* Like Overlay */}
        <motion.div
          style={{
            position: 'absolute',
            top: 40,
            right: 40,
            padding: '8px 24px',
            border: '4px solid var(--color-like)',
            color: 'var(--color-like)',
            borderRadius: '12px',
            fontFamily: 'Agirlsty',
            fontSize: '2rem',
            transform: 'rotate(15deg)',
            opacity: likeOpacity,
            pointerEvents: 'none',
            zIndex: 10
          }}
        >
          LIKE
        </motion.div>

        {/* Dislike Overlay */}
        <motion.div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            padding: '8px 24px',
            border: '4px solid var(--color-dislike)',
            color: 'var(--color-dislike)',
            borderRadius: '12px',
            fontFamily: 'Agirlsty',
            fontSize: '2rem',
            transform: 'rotate(-15deg)',
            opacity: dislikeOpacity,
            pointerEvents: 'none',
            zIndex: 10
          }}
        >
          NOPE
        </motion.div>
      </div>

      <div style={{ padding: '16px 24px 20px', background: 'white' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-text)', marginBottom: '10px' }}>
          Mystery Kitty
        </h2>
        {cat.tags && cat.tags.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {cat.tags.slice(0, 5).map(tag => (
              <span
                key={tag}
                style={{
                  display: 'inline-block',
                  padding: '3px 12px',
                  borderRadius: '20px',
                  background: 'rgba(232, 170, 140, 0.15)',
                  border: '1px solid rgba(232, 170, 140, 0.4)',
                  color: 'var(--color-accent)',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.3px',
                  textTransform: 'capitalize'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : (
          <p style={{ color: 'rgba(74, 64, 54, 0.6)', fontSize: '0.9rem' }}>
            Looking for a loving home!
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summaryMode, setSummaryMode] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [direction, setDirection] = useState(1);
  const [songProgress, setSongProgress] = useState(0);

  const audioRef = useRef(null);
  const userPausedRef = useRef(false); // true when user explicitly paused

  const fetchCats = async () => {
    setLoading(true);
    try {
      const skipAmount = Math.floor(Math.random() * 50);
      const res = await fetch(`${CATAAS_API}/api/cats?limit=15&skip=${skipAmount}`);
      const data = await res.json();

      const loadedCats = data.map(cat => ({
        id: cat.id || cat._id,
        url: `${CATAAS_API}/cat/${cat.id || cat._id}`,
        tags: cat.tags || []
      }));
      setCats(loadedCats);
    } catch (e) {
      console.error(e);
      // Fallbacks
      setCats([
        { id: '1', url: 'https://cataas.com/cat' },
        { id: '2', url: 'https://cataas.com/cat?type=small' },
        { id: '3', url: 'https://cataas.com/cat?type=square' }
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (summaryMode || loading || cats.length === 0) return;

      if (e.key === 'ArrowRight') {
        handleLike();
      } else if (e.key === 'ArrowLeft') {
        handleDislike();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const ensureMusicPlaying = () => {
    // Only auto-play on first interaction; never override an explicit user pause
    if (!musicPlaying && !userPausedRef.current && audioRef.current) {
      audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => { });
    }
  };

  const handleLike = () => {
    ensureMusicPlaying();
    setDirection(1);
    if (cats[currentIndex]) {
      setLikedCats(prev => [...prev, cats[currentIndex]]);
    }
    setTimeout(() => {
      nextCard();
    }, 10);
  };

  const handleDislike = () => {
    ensureMusicPlaying();
    setDirection(-1);
    setTimeout(() => {
      nextCard();
    }, 10);
  };

  const handleSwipe = (action) => {
    ensureMusicPlaying();
    if (action === 'like') {
      setLikedCats(prev => [...prev, cats[currentIndex]]);
      setDirection(1);
    } else {
      setDirection(-1);
    }
    nextCard();
  };

  const nextCard = () => {
    if (currentIndex < cats.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setSummaryMode(true);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setLikedCats([]);
    setSummaryMode(false);
    fetchCats();
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
        setMusicPlaying(false);
        userPausedRef.current = true;  // remember user chose to stop
      } else {
        audioRef.current.play().then(() => setMusicPlaying(true)).catch(e => console.error(e));
        userPausedRef.current = false; // user chose to play again
      }
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', maxWidth: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflowX: 'hidden' }}>

      {/* Background Music Audio Element */}
      <audio
        ref={audioRef}
        loop
        id="bg-music"
        src={`${import.meta.env.BASE_URL}audio/Song.mp3`}
        onTimeUpdate={(e) => {
          const current = e.target.currentTime;
          const dur = e.target.duration && !isNaN(e.target.duration) ? e.target.duration : 77;
          setSongProgress(current / dur);
        }}
      />

      {/* Header */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px clamp(20px, 4vw, 40px)', zIndex: 100, boxSizing: 'border-box' }}>
        <button
          onClick={reset}
          className="brand-font"
          style={{ fontSize: '2.5rem', color: 'var(--color-accent)', margin: 0, background: 'none', border: 'none', padding: 0, cursor: 'pointer', outline: 'none' }}
        >
          P&P
        </button>
        <div style={{ position: 'relative', width: 48, height: 48 }}>
          <button className="btn-glass music-btn" onClick={toggleMusic} style={{ width: '100%', height: '100%', borderRadius: '50%', border: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {musicPlaying ? <Music size={20} color="var(--color-accent)" /> : <Play size={20} color="rgba(74, 64, 54, 0.4)" />}
          </button>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: 'rotate(-90deg)',
              pointerEvents: 'none',
            }}
          >
            <circle
              cx="24"
              cy="24"
              r="23"
              fill="none"
              stroke="rgba(74, 64, 54, 0.1)"
              strokeWidth="2"
            />
            <circle
              cx="24"
              cy="24"
              r="23"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 23}
              strokeDashoffset={2 * Math.PI * 23 * (1 - (songProgress || 0))}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '20px', boxSizing: 'border-box' }}>

        {loading ? (
          <div className="floating" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="spinner" style={{ marginBottom: '24px' }}></div>
            <h2 className="brand-font" style={{ fontSize: '2rem', color: 'var(--color-accent)' }}>Purring up...</h2>
          </div>
        ) : summaryMode ? (
          <motion.div
            className="glass"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              maxWidth: '600px',
              borderRadius: '24px',
              padding: '30px 20px',
              textAlign: 'center',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box'
            }}
          >
            <h1 className="brand-font floating" style={{ fontSize: '4rem', color: 'var(--color-accent)', marginBottom: '16px' }}>
              Your Matches
            </h1>
            <p style={{ marginBottom: '32px', fontSize: '1.2rem' }}>
              You liked {likedCats.length} {likedCats.length === 1 ? 'kitty' : 'kitties'}!
            </p>

            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, width: '100%' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                gap: '24px',
                padding: '16px 8px',
                boxSizing: 'border-box'
              }}>
                {likedCats.map((cat, i) => (
                  <motion.div
                    key={`${cat.id}-${i}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      aspectRatio: '1',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <img src={cat.url} alt="Loved cat" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </motion.div>
                ))}

                {likedCats.length === 0 && (
                  <div style={{ gridColumn: '1 / -1', padding: '40px', color: 'rgba(74, 64, 54, 0.5)' }}>
                    No matches this time. Maybe try again?
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={reset}
              className="btn-glass"
              style={{
                marginTop: '32px',
                padding: '16px 32px',
                borderRadius: '30px',
                fontSize: '1.2rem',
                fontFamily: 'Agirlsty',
                width: 'fit-content',
                alignSelf: 'center',
                gap: '12px',
                border: 'none'
              }}
            >
              <RotateCcw size={20} /> Play Again
            </button>
          </motion.div>
        ) : (
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px', height: '60vh', minHeight: '500px' }}>
            <AnimatePresence custom={direction}>
              {cats.slice(currentIndex, currentIndex + 2).map((cat, mapIndex) => {
                const isFront = mapIndex === 0;
                return (
                  <Card
                    key={cat.id}
                    cat={cat}
                    isFront={isFront}
                    zIndex={3 - mapIndex}
                    onSwipe={handleSwipe}
                    exitDirection={direction}
                  />
                );
              }).reverse()}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Swipe Controls */}
      {!loading && !summaryMode && (
        <div style={{
          display: 'flex',
          gap: '32px',
          marginTop: '24px',
          paddingBottom: '80px',
          zIndex: 100
        }}>
          <button
            className="btn-glass"
            onClick={handleDislike}
            style={{ width: 72, height: 72, color: 'var(--color-dislike)', background: 'rgba(255,255,255,0.95)' }}
          >
            <X size={32} strokeWidth={3} />
          </button>
          <button
            className="btn-glass"
            onClick={handleLike}
            style={{ width: 72, height: 72, color: 'var(--color-like)', background: 'rgba(255,255,255,0.95)' }}
          >
            <Heart size={32} strokeWidth={3} fill="var(--color-like)" />
          </button>
        </div>
      )}
    </div>
  );
}
