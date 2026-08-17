import { useEffect, useRef } from "react";
import { useMusic } from "../contexts/MusicContext";

export const MusicPlayer = () => {
  const {
    currentTrack,
    currentTime,
    setCurrentTime,
    formatTime,
    duration,
    setDuration,
    nextTrack,
    prevTrack,
    isPlaying,
    play,
    pause,
    volume,
    setVolume,
  } = useMusic();
  const audioRef = useRef(null);

  const handleTimeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.error(err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetaData = () => {
      setDuration(audio.duration);
    };
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("canplay", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("canplay", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [setDuration, setCurrentTime, nextTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();
    setDuration(0);
    setCurrentTime(0);
  }, [currentTrack, setCurrentTime, setDuration]);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        preload="metadata"
        crossOrigin="anonymous"
      />

      <div className="track-info">
        {currentTrack ? (
          <h3 className="track-title">{currentTrack.title}</h3>
        ) : (
          <h3 className="track-title">Select a song</h3>
        )}
        <p className="track-artist">{currentTrack?.artist}</p>
      </div>
      <div className="progress-container">
        <span className="time">{formatTime(currentTime)}</span>
        <input
          type="range"
          className="progress-bar"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime || 0}
          onChange={handleTimeChange}
          style={{ "--progress": `${progressPercentage}%` }}
        />
        <span className="time">{formatTime(duration)}</span>
      </div>
      <div className="controls">
        <button className="control-btn" onClick={prevTrack}>
          «
        </button>
        <button
          className="control-btn play-btn"
          onClick={() => (isPlaying ? pause() : play())}
        >
          {isPlaying ? "||" : "‣"}
        </button>
        <button className="control-btn" onClick={nextTrack}>
          »
        </button>
      </div>
      <div className="volume-container">
        <span className="volume-icon">🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          className="volume-bar"
          onChange={handleVolumeChange}
          value={volume}
        />
      </div>
    </div>
  );
};
