import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import PlayerControls from "./PlayerControls";
import screenfull from "screenfull";

function App() {
  // State
  const [state, setState] = useState({
    playing: true,
    muted: false,
    volume: 0.1,
    playbackRate: 1.0,
    playedSeconds: 0,
    loadedSeconds: 0,
  });
  const { playing, muted, volume, playbackRate, playedSeconds, loadedSeconds } =
    state;
  // Ref
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  // handleState
  const handlePlayPause = () => {
    let player = document.getElementsByClassName("react-player");
    let pause = player[0].firstElementChild.paused;
    pause = !pause;
    pause
      ? setState({ ...state, playing: false })
      : setState({ ...state, playing: true });
    console.log(pause);
  };
  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };
  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };
  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };
  const handlePlaybackRateChange = (selectObject) => {
    setState({ ...state, playbackRate: Number(selectObject.target.value) });
  };
  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };
  const handleProgress = (changeState) => {
    console.log(changeState);
    setState({ ...state, ...changeState });
  };

  return (
    <>
      <div className="wrapper">
        <header>
          <h1>Hello, world!</h1>
        </header>
        <div ref={playerContainerRef} className="player-wrapper">
          <ReactPlayer
            className="react-player"
            width="100%"
            height="100%"
            ref={playerRef}
            url={"videos/test1.mp4"}
            muted={muted}
            playing={playing}
            loop="true"
            volume={volume}
            playbackRate={playbackRate}
            onProgress={handleProgress}
          />
        </div>
        <PlayerControls
          className="controls"
          playing={playing}
          onPlayPause={handlePlayPause}
          onRewind={handleRewind}
          onFastFoward={handleFastForward}
          muted={muted}
          onMute={handleMute}
          playbackRate={playbackRate}
          onPlaybackRateChange={handlePlaybackRateChange}
          onToggleFullScreen={toggleFullScreen}
          playedSeconds={playedSeconds}
          loadedSeconds={loadedSeconds}
        />
        <footer>end</footer>
      </div>
    </>
  );
}

export default App;
