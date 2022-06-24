import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import PlayerControls from "./PlayerControls";
import screenfull from "screenfull";
// import Canvas from "./Canvas";
import Canvas2 from "./Canvas2";

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
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const {
    playing,
    muted,
    volume,
    playbackRate,
    elapsed,
    duration,
    playRatio,
    x,
    y,
    width,
    height,
  } = state;
  // Ref
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  // handleState
  const handlePlayPause = () => {
    console.log(playerRef.current);
    // let player = document.getElementsByClassName("react-player");
    // let pause = player[0].firstElementChild.paused;
    // console.log(player);
    // console.log(pause);
    // pause = !pause;
    // pause
    //   ? setState({ ...state, playing: false })
    //   : setState({ ...state, playing: true });

    setState({ ...state, playing: !playing });
  };
  const handleRewind = () => {
    getTime();
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };
  const handleFastForward = () => {
    getTime();
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
  // Canvas
  const draw = (ctx, x) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x + 25, 75, 25, 0, 1 * Math.PI);
    ctx.fill();
    ctx.strokeRect(x, 20, 50, 50);
  };
  // Time
  const getTime = async function () {
    const elapsed_sec = await playerRef.current.getCurrentTime();
    // calculations
    const elapsed_ms = Math.floor(elapsed_sec * 1000);
    const ms = elapsed_ms % 1000;
    const min = Math.floor(elapsed_ms / 60000);
    const seconds = Math.floor((elapsed_ms - min * 60000) / 1000);
    const duration = await playerRef.current.getDuration();
    const duration_ms = Math.floor(duration * 1000);
    const dms = duration_ms % 1000;
    const dmin = Math.floor(duration_ms / 60000);
    const dseconds = Math.floor((duration_ms - dmin * 60000) / 1000);
    const playRatio = (100 * elapsed_sec) / duration;

    const rect = playerContainerRef.current.getBoundingClientRect();
    setState({
      ...state,
      elapsed:
        min.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0") +
        ":" +
        ms.toString().padStart(3, "0"),
      duration:
        dmin.toString().padStart(2, "0") +
        ":" +
        dseconds.toString().padStart(2, "0") +
        ":" +
        dms.toString().padStart(3, "0"),
      playRatio: playRatio,
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    });
  };

  useEffect(() => {
    if (playing) {
      const interval = setInterval(getTime, 100);
      return () => {
        clearInterval(interval);
      };
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  // Resize to call getTime
  function Size() {
    const [dimensions, setDimensions] = React.useState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    useEffect(() => {
      function handleResize() {
        getTime();
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth,
        });
      }

      window.addEventListener("resize", handleResize);

      return (_) => {
        window.removeEventListener("resize", handleResize);
      };
    });
    return (
      <div>
        Rendered at {dimensions.width} x {dimensions.height}
      </div>
    );
  }
  return (
    <>
      <div className="wrapper">
        <header>
          <h1>React-player</h1>
        </header>
        <div ref={playerContainerRef} className="player-wrapper">
          <ReactPlayer
            className="react-player"
            width="100%"
            height="100%"
            ref={playerRef}
            // url={"videos/test1.mp4"}
            url="https://www.youtube.com/watch?v=C6rBmJv9g_0"
            muted={muted}
            playing={playing}
            loop={true}
            volume={volume}
            playbackRate={playbackRate}
            controls={false}
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
          {/* <Canvas playRatio={playRatio} draw={draw} /> */}
          <Canvas2
            playRatio={playRatio}
            draw={draw}
            x={x}
            y={y}
            width={width}
            height={height}
          />
          <Size />
        </footer>
      </div>
    </>
  );
}

export default App;
