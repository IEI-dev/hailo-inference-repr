import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import PlayerControls from "./react-player/PlayerControls";
import screenfull from "screenfull";
import Elapsed from "./react-player/Elapsed";
import Canvas from "./react-player/Canvas";
import Data from "./react-player/Data";

// boxes, boxTime, ids give to Canvas
function App({ ids, boxes, scores, basicWidth, basicHeight }) {
  const [sourceWidth, setSW] = useState(960); //basicWidth
  const [sourceHeight, setSH] = useState(540); //basicHeight
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [playRatio, setPlayRatio] = useState(0);
  const [boxCheck, setBoxCheck] = useState(true); // box and id props for PlayerControls callback and give to Canvas
  const [idCheck, setIdCheck] = useState(true);
  const [bxs, setBoxes] = useState(boxes);
  const [bxScores, setScores] = useState(scores);
  const [bxid, setIds] = useState(ids);
  const [fps, setFps] = useState(25.0);
  const [frame, setFrame] = useState(0);
  const [limit, setLimit] = useState(329);
  const [screenRatio, setScreenRatio] = useState(100);
  const [video, setVideo] = useState(null);
  const [key, setKey] = useState(0);
  // State
  const [state, setState] = useState({
    playing: false,
    muted: false,
    volume: 0.1,
    playbackRate: 1.0,
    // url: `./videos/palace.mp4`,
    url: `./videos/MOT20-01-raw.webm`,
    // url: `./videos/MOT20-05-raw.webm`,
    // url: `./videos/tc1.mp4`,
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

  const handleVolume = (volume) => {
    setState({ ...state, volume: volume });
  };
  const handleTime = () => {
    setTime(playerRef.current.getCurrentTime());
  };
  const handlePlayPause = () => {
    setState({ ...state, playing: !playing });
    setDuration(playerRef.current.getDuration());
    getSize();
  };
  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
    handleTime();
    console.log(frame);
  };
  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
    handleTime();
    console.log(frame);
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
    setFrame(Math.round((+e.target.value * limit) / 100));
  };
  const handleBoxes = (newUrl) => {
    handleUrl(newUrl);
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
  const getSize = function() {
    if (playerRef) {
      const rect = playerContainerRef.current.getBoundingClientRect();
      setCanvas({
        x: rect.x,
        y: 0, // rect.y
        width: rect.width,
        height: rect.height,
        wRatio: rect.width / sourceWidth,
        hRatio: rect.height / sourceHeight,
      });
    } else return;
  };
  const getBox = function() {
    if (playerRef && playing) {
      handleTime();
    } else return;
  };

  useEffect(() => {
    if (playing) {
      const interval = setInterval(getBox, 100);
      return () => {
        clearInterval(interval);
      };
    } else {
      handleTime();
    }
  }, [playing, time]);

  useEffect(() => {
    getSize();
  }, [playing, screenRatio]);

  useEffect(() => {
    setKey(key + 1);
  }, [url]);

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
          Canvas at {width.toFixed(2)} x {height.toFixed(2)}
        </p>
      </div>
    );
  }
  //  trigger as the video starts, callback as every video frame
  const startDrawing = () => {
    let startTime = 0.0;
    video.addEventListener("play", () => {
      if (!("requestVideoFrameCallback" in HTMLVideoElement.prototype)) {
        return alert(
          "Your browser does not support the `Video.requestVideoFrameCallback()` API."
        );
      }
    });
    const updateCanvas = (now, metadata) => {
      console.log("called");
      if (startTime === 0.0) {
        startTime = now;
      }
      // const frames = Math.round(metadata.mediaTime * fps);
      // console.log(frames);
      let frameOffset = 0;
      setFrame(Math.round(metadata.mediaTime * fps) - frameOffset); // +1 is added if you count frame 0 as frame 1... Semantics
      // metadataInfo.innerText = JSON.stringify(metadata, null, 2);
      video.requestVideoFrameCallback(updateCanvas);
    };
    video.requestVideoFrameCallback(updateCanvas);
  };

  return (
    <div className="wrapper">
      <header>{/* <h1>React-player</h1> */}</header>
      <div
        ref={playerContainerRef}
        className="player-wrapper"
        style={{ border: "1px solid black" }}
      >
        <ReactPlayer
          id="player"
          key={key}
          className="react-player"
          width="100%"
          height="100%"
          ref={playerRef}
          url={url}
          muted={muted}
          playing={playing}
          loop={true}
          // onEnded={() => {
          //   const timeout = setTimeout(handlePlayPause, 100);
          //   return () => {
          //     clearTimeout(timeout);
          //   };
          // }}
          volume={volume}
          playbackRate={playbackRate}
          controls={false}
          onReady={() => {
            setDuration(playerRef.current.getDuration());
            const video = document.querySelector("video");
            setVideo(video);
            const items = document.querySelectorAll(".list-group-item");
            items.forEach((item) => {
              item.addEventListener("click", () => {
                items.forEach((item) => {
                  item.classList.remove("active");
                });
                item.classList.add("active");
              });
            });
          }}
          onStart={() => {
            startDrawing();
          }}
        />
      </div>
      {/* <div className="data">
        {width}寬度
        {height}高度
        {sourceWidth}來源寬度
        {sourceHeight}來源高度
        {wRatio}寬比例
        {hRatio}高比例
      </div> */}
      <PlayerControls
        className="controls"
        playing={playing}
        onPlayPause={handlePlayPause}
        onRewind={handleRewind}
        onFastFoward={handleFastForward}
        volume={volume}
        onChangeVolume={handleVolume}
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
        time={time}
        duration={duration}
        setPlayRatio={setPlayRatio}
        screenRatio={screenRatio}
        setScreenRatio={setScreenRatio}
      />
      <Canvas
        x={x}
        y={y}
        width={width}
        height={height}
        boxes={bxs}
        ids={bxid}
        scores={bxScores}
        wRatio={wRatio}
        hRatio={hRatio}
        boxCheck={boxCheck}
        idCheck={idCheck}
        fps={fps}
        frame={frame}
      />
      <div className="wrapper-right">
        <Data
          handleBoxes={handleBoxes}
          setBoxes={setBoxes}
          setIds={setIds}
          setScores={setScores}
          setSW={setSW}
          setSH={setSH}
          setFps={setFps}
          setLimit={setLimit}
          handleTime={handleTime}
          fps={fps}
          frame={frame}
        />
        <Elapsed elapsed={format(time)} duration={format(duration)} />
        <footer>
          <Size />
        </footer>
      </div>
    </div>
  );
}

export default App;
