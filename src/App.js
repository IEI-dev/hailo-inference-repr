import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import PlayerControls from "./react-player/PlayerControls";
import screenfull from "screenfull";
import Elapsed from "./react-player/Elapsed";
import Canvas from "./react-player/Canvas";
import Data from "./react-player/Data";

// boxes, boxTime, ids give to Canvas
function App({ boxes, boxTime, ids }) {
  const [sourceWidth, setSW] = useState(640);
  const [sourceHeight, setSH] = useState(360);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [playRatio, setPlayRatio] = useState(0);
  const [boxCheck, setBoxCheck] = useState(true); // box and id props for PlayerControls callback and give to Canvas
  const [idCheck, setIdCheck] = useState(true);
  const [bxs, setBoxes] = useState(boxes);
  const [bxT, setBoxTime] = useState(boxTime);
  const [bxid, setIds] = useState(ids);
  // State
  const [state, setState] = useState({
    playing: false,
    muted: false,
    volume: 0.1,
    playbackRate: 1.0,
    url: `./videos/tc1.mp4`,
  });
  const { playing, muted, volume, playbackRate, url } = state; // dedectionary
  const [canvas, setCanvas] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    wRatio: 1,
    hRatio: 1,
  });
  const { x, y, width, height, wRatio, hRatio } = canvas;

  // Ref
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);

  // handleState function give to PlayerControls
  const handleTime = () => {
    setTime(playerRef.current.getCurrentTime());
    setPlayRatio((time * 100) / duration);
  };
  const handlePlayPause = () => {
    setState({ ...state, playing: !playing });
    setDuration(playerRef.current.getDuration());
  };
  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
    handleTime();
  };
  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
    handleTime();
  };
  const handleMute = () => {
    setState({ ...state, muted: !muted });
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
  const onSeek = (e) => {
    const seekto = playerRef.current.getDuration() * (+e.target.value / 100);
    playerRef.current.seekTo(seekto);
    handleTime();
  };
  const handleBoxes = (data, newUrl) => {
    setBoxes(data[0]);
    setBoxTime(data[1]);
    setIds(data[2]);
    setSW(data[3]);
    setSH(data[4]);
    handleUrl(newUrl);
    getSize();
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
  const getSize = async function() {
    if (playerRef) {
      const rect = playerContainerRef.current.getBoundingClientRect();
      setCanvas({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        wRatio: rect.width / sourceWidth,
        hRatio: rect.height / sourceHeight,
      });
    } else return;
  };
  function closest(goal, arr) {
    if (arr == null) {
      return;
    }
    return arr.reduce((prev, curr) =>
      Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
    );
  }
  const getBox = async function() {
    if (playerRef && playing) {
      handleTime();
    } else return;
  };

  // useEffect
  useEffect(() => {
    if (playerRef && playing) {
      const interval = setInterval(getBox, 10);
      return () => {
        clearInterval(interval);
      };
    } else if (playerRef && !playing) {
      const timeout = setTimeout(getSize, 200);
      return () => {
        clearTimeout(timeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, time, url]);

  // Size Component
  function Size() {
    const dimensions = {
      height: window.innerHeight,
      width: window.innerWidth,
    };
    useEffect(() => {
      function handleResize() {
        getSize();
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
        onSeek={onSeek}
        onSearch={handleUrl}
        url={url}
        playRatio={playRatio}
        boxCheck={boxCheck}
        setBoxCheck={setBoxCheck}
        idCheck={idCheck}
        setIdCheck={setIdCheck}
      />
      <Data handleBoxes={handleBoxes} />
      <Elapsed elapsed={format(time)} duration={format(duration)} />
      <Canvas
        x={x}
        y={y}
        width={width}
        height={height}
        duration={duration}
        boxes={bxs}
        ids={bxid}
        time={closest(time, bxT)} // get the closest time to boxTime
        boxIndex={bxT.indexOf(closest(time, bxT))} // get the index of every closest time's timeBox
        wRatio={wRatio}
        hRatio={hRatio}
        boxCheck={boxCheck}
        idCheck={idCheck}
      />
      <footer>
        <Size />
      </footer>
    </div>
  );
}

export default App;
