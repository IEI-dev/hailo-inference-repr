import React, { useState } from "react";

export default function PlayerControls({
  playing,
  onPlayPause,
  onRewind,
  onFastFoward,
  muted,
  onMute,
  onPlaybackRateChange,
  onToggleFullScreen,
  onSeek,
  playRatio,
  onSearch,
}) {
  let rates = [1.0, 0.5, 1.5, 2.0];
  const [newUrl, setNewUrl] = useState("");
  return (
    <div>
      <div>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(newUrl);
          }}
        >
          <input
            id="videoURL"
            type="text"
            placeholder="type your url"
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <input id="search" type="submit" value={"Search"} />
        </form>
      </div>
      <button
        onClick={() => {
          onRewind();
        }}
      >
        rewind
      </button>
      {playing ? (
        <button className="pause" onClick={onPlayPause}>
          Pause
        </button>
      ) : (
        <button className="play" onClick={onPlayPause}>
          Play
        </button>
      )}
      <button
        onClick={() => {
          onFastFoward();
        }}
      >
        forward
      </button>
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
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={playRatio ? playRatio : "0"}
        onChange={onSeek}
      />
    </div>
  );
}
