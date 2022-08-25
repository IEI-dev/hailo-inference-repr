// invisible playercontrol for forward, backward, pause, play, mute. Searching bar may be useful soon.
import React, { useState } from "react";

export default function PlayerControls({
  onRewind,
  onFastFoward,
  volume,
  onChangeVolume,
  muted,
  onMute,
  onSearch,
  wrapperLeftRef,
  wrapperRightRef,
  btnControlLeftRef,
  btnControlRightRef,
  setLeftControl,
  setRightControl,
  vw,
  setVw,
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
            wrapperLeftRef.current.classList.remove("control");
            wrapperRightRef.current.classList.remove("control");
            wrapperLeftRef.current.classList.add("hide");
            wrapperRightRef.current.classList.add("hide");
            btnControlLeftRef.current.classList.add("hide");
            btnControlRightRef.current.classList.add("hide");

            let newVw = vw + 10;
            if (newVw < 110) {
              setVw(newVw);
              const wrapper = document.querySelector(".wrapper");
              wrapper.style.setProperty("--wrapper-width", `${newVw}vw`);
            }

            if (newVw === 70) {
              wrapperLeftRef.current.classList.remove("hide");
              wrapperRightRef.current.classList.remove("hide");
              btnControlLeftRef.current.classList.remove("hide");
              btnControlRightRef.current.classList.remove("hide");
              setLeftControl(false);
              setRightControl(false);
            }
          }}
        >
          &nbsp;+&nbsp;
        </button>
        <button
          className="minus"
          onClick={() => {
            wrapperLeftRef.current.classList.remove("control");
            wrapperRightRef.current.classList.remove("control");
            wrapperLeftRef.current.classList.add("hide");
            wrapperRightRef.current.classList.add("hide");
            btnControlLeftRef.current.classList.add("hide");
            btnControlRightRef.current.classList.add("hide");

            let newVw = vw - 10;
            if (newVw > 40) {
              setVw(newVw);
              const wrapper = document.querySelector(".wrapper");
              wrapper.style.setProperty("--wrapper-width", `${newVw}vw`);
            }

            if (newVw === 70) {
              wrapperLeftRef.current.classList.remove("hide");
              wrapperRightRef.current.classList.remove("hide");
              btnControlLeftRef.current.classList.remove("hide");
              btnControlRightRef.current.classList.remove("hide");
              setLeftControl(false);
              setRightControl(false);
            }
          }}
        >
          &nbsp;-&nbsp;
        </button>
      </div>
    </div>
  );
}
