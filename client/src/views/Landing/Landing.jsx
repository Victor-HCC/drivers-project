import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';
import svgSoundOn from '../../assets/icons/icon-sound-on.svg';
import svgSoundOff from '../../assets/icons/icon-sound-off.svg';

const Landing = () => {

  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef(new Audio('src/assets/audio/f1-car-sound.mp3'));

  const toggleSound = () => {
    const audio = audioRef.current;
    if (isSoundOn) {
      audio.pause();
      audio.currentTime = 0; // Reset the audio to the beginning
    } else {
      audio.play();
      audio.loop = true;
    }
    setIsSoundOn(!isSoundOn);
  };

  const handleVolumeChange = (event) => {
    const volume = event.target.value / 100; // Convert the value to a float between 0 and 1
    audioRef.current.volume = volume;
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Drivers APP</h1>
      </div>

      <div className={styles.linkContainer}>
        <Link to='/home' className={styles.link}>Home Page</Link>
      </div>

      <div className={styles.controlsContainer}>
        <img
        className={styles.icon}
        src={isSoundOn ? svgSoundOff : svgSoundOn}
        alt={isSoundOn ? 'Sound Off' : 'Sound On'}
        onClick={toggleSound}
        width='30px'
        height='30px'
        />

        {isSoundOn && <input
          type="range"
          min="0"
          max="100"
          step="1"
          defaultValue="70"
          onChange={handleVolumeChange}
          className={styles.volumeControl}
        />}
      </div>

      <div className={styles.copyright}>
        &copy; Victor Cori
      </div>
      
    </div>
  )
}

export default Landing
