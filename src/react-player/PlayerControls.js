import React, { useState } from "react";

export default function PlayerControls({
  onRewind,
  onFastFoward,
  volume,
  onChangeVolume,
  muted,
  onMute,
  onSearch,
  screenRatio,
  setScreenRatio,
}) {
  const [newUrl, setNewUrl] = useState("");
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
            console.log(volume);
            e.preventDefault();
            if (volume - 0.1 >= 0.0) {
              onChangeVolume(volume - 0.1);
            }
            if (volume < 0.1) {
              onChangeVolume(0.0, true);
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
            if (downRatio > 65) {
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
      </div>
    </div>
  );
}
