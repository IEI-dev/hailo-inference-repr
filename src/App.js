import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import PlayerControls from "./PlayerControls";
import screenfull from "screenfull";
import Canvas from "./Canvas";

function App() {
  // State
  const [state, setState] = useState({
    playing: false,
    muted: false,
    volume: 0.1,
    playbackRate: 1.0,
    elapsed: 0,
    duration: 0,
    playRatio: 0,
  });
  const { playing, muted, volume, playbackRate, elapsed, duration, playRatio } =
    state;
  // Ref
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  // handleState
  const handlePlayPause = () => {
    console.log(playerRef.current);
    let player = document.getElementsByClassName("react-player");
    let pause = player[0].firstElementChild.paused;
    console.log(player);
    console.log(pause);
    pause = !pause;
    pause
      ? setState({ ...state, playing: false })
      : setState({ ...state, playing: true });
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
  console.log(playerRef.current);
  const draw = (ctx, x) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(x + 25, 75, 25, 0, 2 * Math.PI);
    ctx.fill();
  };
  useEffect(() => {
    if (playing) {
      const interval = setInterval(async () => {
        const elapsed_sec = await playerRef.current.getCurrentTime(); // this is a promise
        const duration = await playerRef.current.getDuration();
        const playRatio = (100 * elapsed_sec) / duration;
        // calculations
        const elapsed_ms = Math.floor(elapsed_sec * 1000);
        const ms = elapsed_ms % 1000;
        const min = Math.floor(elapsed_ms / 60000);
        const seconds = Math.floor((elapsed_ms - min * 60000) / 1000);

        setState({
          ...state,
          elapsed:
            min.toString().padStart(2, "0") +
            ":" +
            seconds.toString().padStart(2, "0") +
            ":" +
            ms.toString().padStart(3, "0"),
          duration: duration,
          playRatio: playRatio,
        });
      }, 100);
      return () => {
        clearInterval(interval);
      };
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);
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
            // url="https://www.youtube.com/watch?v=sHD_z90ZKV0"
            muted={muted}
            playing={playing}
            loop={true}
            volume={volume}
            playbackRate={playbackRate}
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
        />
        <footer>
          <div>
            {elapsed}/{duration}
          </div>
          <div>{playRatio.toFixed(2)}%</div>
          <Canvas playRatio={playRatio} draw={draw} />
        </footer>
      </div>
    </>
  );
}

export default App;
