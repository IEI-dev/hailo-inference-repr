import React, { useState, useEffect } from "react";

export default function PlayerControls({
  playing,
  onPlayPause,
  onRewind,
  onFastFoward,
  volume,
  onChangeVolume,
  muted,
  onMute,
  onPlaybackRateChange,
  onToggleFullScreen,
  onSeek,
  onSearch,
  playRatio,
  boxCheck,
  setBoxCheck,
  idCheck,
  setIdCheck,
  time,
  duration,
  setPlayRatio,
  screenRatio,
  setScreenRatio,
}) {
  let rates = [1.0, 0.5, 1.5, 2.0];
  const [newUrl, setNewUrl] = useState("");
  useEffect(() => {
    setPlayRatio((time * 100) / duration);
  }, [time]);
  return (
    <div className="player-control">
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
        <img
          src="./pictures/volume.png"
          alt="volume"
          style={{ width: "1.75%" }}
        ></img>
        {volume.toFixed(1)}&nbsp;
        <button
          className="volumeUp "
          onClick={(e) => {
            e.preventDefault();
            if (volume + 0.1 < 1.0) {
              onChangeVolume(volume + 0.1);
            }
          }}
        >
          &nbsp;+&nbsp;
        </button>
        <button
          className="volumeDown"
          onClick={(e) => {
            e.preventDefault();
            if (volume - 0.1 > 0.0) {
              onChangeVolume(volume - 0.1);
            }
          }}
        >
          &nbsp;-&nbsp;
        </button>
      </form>
      <div className="buttons">
        <button
          className="rewind"
          onClick={() => {
            onRewind();
          }}
        >
          rewind
        </button>
        {playing ? (
          <button id="play" className="pause" onClick={onPlayPause}>
            Pause
          </button>
        ) : (
          <button id="play" className="play" onClick={onPlayPause}>
            Play
          </button>
        )}
        <button
          className="forward"
          onClick={() => {
            onFastFoward();
          }}
        >
          forward
        </button>
        {muted ? (
          <button id="mute" onClick={onMute}>
            unmute
          </button>
        ) : (
          <button id="mute" onClick={onMute}>
            mute
          </button>
        )}
        <select onChange={onPlaybackRateChange}>
          {rates.map((rate, index) => (
            <option key={index} value={rate}>
              {rate}
            </option>
          ))}
        </select>
        <button onClick={onToggleFullScreen}>full</button>
        <button
          className="plus"
          onClick={() => {
            const player = document.querySelector(".player-wrapper");
            const upRatio = (screenRatio * 11) / 10;
            if (upRatio < 200) {
              player.style.setProperty("--element-width", `${upRatio}%`);
              player.style.setProperty(
                "--element-height",
                `${(upRatio * 56.25) / 100}%`
              );
              setScreenRatio(upRatio);
            }
          }}
        >
          &nbsp;+&nbsp;
        </button>
        {screenRatio.toFixed(2)}%
        <button
          className="minus"
          onClick={() => {
            const player = document.querySelector(".player-wrapper");
            const downRatio = (screenRatio * 10) / 11;
            if (downRatio > 20) {
              player.style.setProperty("--element-width", `${downRatio}%`);
              player.style.setProperty(
                "--element-height",
                `${(downRatio * 56.25) / 100}%`
              );
              setScreenRatio(downRatio);
            }
          }}
        >
          &nbsp;-&nbsp;
        </button>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={playRatio ? playRatio : "0"}
          onChange={onSeek}
        />
      </div>
      <div className="switches">
        <div className="form-check form-switch">
          <input
            className="form-check-input box"
            type="checkbox"
            // eslint-disable-next-line
            checked={boxCheck}
            id="flexSwitchBox"
            onChange={() => {
              setBoxCheck(!boxCheck);
            }}
          />
          {boxCheck ? (
            <label className="form-check-label" htmlFor="flexSwitchBox">
              Box on
            </label>
          ) : (
            <label className="form-check-label" htmlFor="flexSwitchBox">
              Box off
            </label>
          )}
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input id"
            type="checkbox"
            id="flexSwitchID"
            // eslint-disable-next-line
            checked={idCheck}
            onChange={() => {
              setIdCheck(!idCheck);
            }}
          />
          {idCheck ? (
            <label className="form-check-label" htmlFor="flexSwitchID">
              ID on
            </label>
          ) : (
            <label className="form-check-label" htmlFor="flexSwitchID">
              ID off
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
