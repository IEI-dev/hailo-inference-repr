import React from "react";

export default function PlayerControls({
  playing,
  onPlayPause,
  onRewind,
  onFastFoward,
  muted,
  onMute,
  onPlaybackRateChange,
  onToggleFullScreen,
  playedSeconds,
  loadedSeconds,
}) {
  let rates = [1.0, 0.5, 1.5, 2.0];
  return (
    <div>
      <button onClick={onRewind}>rewind</button>
      {playing ? (
        <button className="pause" onClick={onPlayPause}>
          Pause
        </button>
      ) : (
        <button className="play" onClick={onPlayPause}>
          Play
        </button>
      )}
      <button onClick={onFastFoward}>forward</button>
      {muted ? (
        <button onClick={onMute}>unmute</button>
      ) : (
        <button onClick={onMute}>mute</button>
      )}
      <select onChange={onPlaybackRateChange}>
        {rates.map((rate, index) => (
          <option key={index} value={rate}>
            {rate}
          </option>
        ))}
      </select>
      <button onClick={onToggleFullScreen}>full</button>
      <span>{playedSeconds.toFixed(2)}</span>/
      <span>{loadedSeconds.toFixed(2)}</span>
    </div>
  );
}
