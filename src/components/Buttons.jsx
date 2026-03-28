import React, { useState } from 'react';
import horseFootstepsMp3 from '../Sounds/Horse footsteps.mp3';
import horseNeighMp3 from '../Sounds/Horse Neigh Sounds.mp3';
import whooshMp3 from '../Sounds/whoosh sound.mp3';
import boingMp3 from '../Sounds/boing sound.mp3';
import funnyFailMp3 from '../Sounds/funny fail sound.mp3';
import errorBeepMp3 from '../Sounds/error beep.mp3';

function Buttons({ onYes, onNoHover }) {
  const [noStyle, setNoStyle] = useState({});

  const playAudio = (src, volume = 1) => {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(e => console.log('Audio error:', e));
  };

  const handleEscape = (e) => {
    onNoHover();
    
    // Play sounds
    const escapes = [whooshMp3, boingMp3];
    playAudio(escapes[Math.floor(Math.random() * escapes.length)], 0.6);
    
    // Check if it's a real click (e.type === 'click')
    if (e && e.type === 'click') {
      playAudio(funnyFailMp3);
      setTimeout(() => playAudio(errorBeepMp3), 300);
    }
    
    // Keep button inside screen bounds strictly
    const buttonWidth = 140; 
    const buttonHeight = 60;
    
    const maxX = typeof window !== 'undefined' ? Math.max(0, window.innerWidth - buttonWidth) : 300; 
    const maxY = typeof window !== 'undefined' ? Math.max(0, window.innerHeight - buttonHeight) : 300;
      
    // Random position avoiding edges slightly
    const randomX = Math.min(maxX, Math.max(10, Math.floor(Math.random() * maxX)));
    const randomY = Math.min(maxY, Math.max(10, Math.floor(Math.random() * maxY)));

    setNoStyle({
      position: 'fixed',
      left: `${randomX}px`,
      top: `${randomY}px`,
      zIndex: 100
    });
  };

  return (
    <div className="buttons-container">
      <button className="yes-btn" onClick={onYes}>
        جاي معاك 😎
      </button>
      
      <button 
        className="no-btn" 
        style={noStyle}
        onMouseEnter={handleEscape}
        onTouchStart={handleEscape}
        onClick={handleEscape}
      >
        مش جاي 😅
      </button>
    </div>
  );
}

export default Buttons;
