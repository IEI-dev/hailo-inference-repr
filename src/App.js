import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import PlayerControls from "./PlayerControls";
import screenfull from "screenfull";
import Elapsed from "./Elapsed";
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
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    time: 0,
    url: "videos/test2.mp4",
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
    time,
    url,
  } = state;
  // Ref
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  // handleState
  const setTime = () => {
    setState({
      ...state,
      time: playerRef.current.getCurrentTime().toFixed(2),
    });
  };
  const handlePlayPause = () => {
    setState({ ...state, playing: !playing });
  };
  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    setTime();
  };
  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    setTime();
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
  const handleUrl = (newUrl) => {
    setState({ ...state, url: newUrl });
  };
  // Canvas draw function
  const draw = (ctx, x) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x + 25, 75, 25, 0, 1 * Math.PI);
    ctx.fill();
    ctx.strokeRect(x, 20, 50, 50);
  };

  const onSeek = (e) => {
    const seekto = playerRef.current.getDuration() * (+e.target.value / 100);
    playerRef.current.seekTo(seekto);
    setTime();
  };
  // Update Time and Size
  const format = (sec) => {
    const ms = Math.floor(sec * 1000) % 1000;
    const min = Math.floor((sec * 1000) / 60000);
    const seconds = Math.floor(Math.floor(sec * 1000 - min * 60000) / 1000);
    const time =
      min.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0") +
      ":" +
      ms.toString().padStart(3, "0");
    return time;
  };
  const getTime = async function () {
    if (playerRef) {
      const elapsed_sec = await playerRef.current.getCurrentTime();
      const duration = await playerRef.current.getDuration();
      const playRatio = (100 * elapsed_sec) / duration;
      const rect = playerContainerRef.current.getBoundingClientRect();
      setState({
        ...state,
        elapsed: format(elapsed_sec),
        duration: format(duration),
        playRatio: playRatio,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      });
    } else return;
  };

  useEffect(() => {
    if (playerRef && playing) {
      const interval = setInterval(getTime, 100);
      return () => {
        clearInterval(interval);
      };
    } else if (playerRef && !playing) {
      const timeout = setTimeout(getTime, 200);
      return () => {
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, time]);

  // Size Component
  function Size() {
    const dimensions = {
      height: window.innerHeight,
      width: window.innerWidth,
    };
    useEffect(() => {
      function handleResize() {
        getTime();
      }

      window.addEventListener("resize", handleResize);

      return (_) => {
        window.removeEventListener("resize", handleResize);
      };
    });
    return (
      <div>
        <p>
          Rendered at {dimensions.width} x {dimensions.height}
        </p>
        <p>
          Canvas at {width} x {height}
        </p>
      </div>
    );
  }
  return (
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
          // url={"videos/test2.mp4"}
          url={url}
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
        getTime={getTime}
        playRatio={playRatio}
        onSeek={onSeek}
        onSearch={handleUrl}
        url={url}
      />
      <Elapsed
        elapsed={elapsed}
        duration={duration}
        playRatio={playRatio}
        getTime={getTime}
      />
      {/* <Canvas playRatio={playRatio} draw={draw} /> */}
      <Canvas
        playRatio={playRatio}
        draw={draw}
        x={x}
        y={y}
        width={width}
        height={height}
      />
      <footer>
        <Size />
      </footer>
    </div>
  );
}

export default App;
