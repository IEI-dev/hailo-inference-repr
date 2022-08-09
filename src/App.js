import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import PlayerControls from "./react-player/PlayerControls";
import screenfull from "screenfull";
import Elapsed from "./react-player/Elapsed";
import Canvas from "./react-player/Canvas";
import CanvasLine from "./react-player/CanvasLine";
import Data from "./react-player/Data";
import Controls from "./react-player/Controls";
import Points from "./react-player/Points";
import People from "./react-player/People";

// boxes, boxTime, ids give to Canvas
function App({
  ids,
  boxes,
  scores,
  attrs,
  basicWidth,
  basicHeight,
  idAll,
  basicFps,
  entrance,
  keys,
}) {
  const [sourceWidth, setSW] = useState(basicWidth); //basicWidth MOT20-01 960
  const [sourceHeight, setSH] = useState(basicHeight); //basicHeight MOT20-01 540
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [boxCheck, setBoxCheck] = useState(false); // box and id props for PlayerControls callback and give to Canvas
  const [idCheck, setIdCheck] = useState(false);
  const [lineCheck, setLineCheck] = useState(true);
  const [edgeCheck, setEdgeCheck] = useState(false);
  const [bxs, setBoxes] = useState(boxes);
  const [bxScores, setScores] = useState(scores);
  const [bxid, setIds] = useState(ids);
  const [fps, setFps] = useState(basicFps);
  const [frame, setFrame] = useState(0);
  const [limit, setLimit] = useState(329);
  const [screenRatio, setScreenRatio] = useState(100);
  const [vw, setVw] = useState(70);
  const [video, setVideo] = useState(null);
  const [key, setKey] = useState(0);
  const [startpoint, setStartpoint] = useState({
    sx: 0,
    sy: 0,
  });
  const [endpoint, setEndpoint] = useState({
    ex: 0,
    ey: 0,
  });
  const [startend, setStartend] = useState("start");
  // State
  const [state, setState] = useState({
    playing: false,
    muted: false,
    volume: 0.1,
    playbackRate: 1.0,
    // url: `./videos/palace.mp4`,
    // url: `./videos/MOT20-01-raw.webm`,
    url: `./videos/pwalk1.mp4`,
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
  const [leftControl, setLeftControl] = useState(true);
  const [rightControl, setRightControl] = useState(true);

  // Ref
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const wrapperLeftRef = useRef(null);
  const wrapperRightRef = useRef(null);
  const btnControlLeftRef = useRef(null);
  const btnControlRightRef = useRef(null);

  // handleState function give to PlayerControls

  const handleVolume = (volume, muted = false) => {
    setState({ ...state, volume: volume, muted: muted });
  };
  const handleTime = () => {
    setTime(playerRef.current.getCurrentTime());
  };
  const handlePlayPause = () => {
    setState({ ...state, playing: !playing });
    // setDuration(playerRef.current.getDuration());
    // getSize();
  };
  const seekToStart = () => {
    playerRef.current.seekTo(0);
    handleTime();
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

  const handlePlaybackRate = () => {
    let pb;
    if (playbackRate < 2) {
      pb = playbackRate + 0.5;
    } else {
      pb = 0.5;
    }
    setState({ ...state, playbackRate: pb });
  };
  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };

  const handleUrl = (newUrl) => {
    setState({ ...state, url: newUrl });
  };

  const onSeek = (percent) => {
    const seekto = duration * percent;
    playerRef.current.getInternalPlayer().currentTime = seekto;
    handleTime();
    setFrame(Math.round(percent * limit));
  };

  const handleBoxes = (newUrl) => {
    handleUrl(newUrl);
  };

  // Update Time and Size
  const format = (sec) => {
    // const ms = Math.floor(sec * 100) % 100;  // use this line to show ms
    // Math.floor(sec * 1000) % 1000
    const hour = Math.floor((sec * 1000) / 360000);
    const min = Math.floor((sec * 1000) / 60000);
    const seconds = Math.floor(Math.floor(sec * 1000 - min * 60000) / 1000);
    let time;
    if (hour === 0) {
      time =
        min.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0");
    } else {
      time =
        hour.toString().padStart(2, "0") +
        min.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0");
    }

    // ms.toString().padStart(2, "0"); // padStart(3, "0")
    return time;
  };
  const getSize = function() {
    if (playerRef) {
      const rect = playerContainerRef.current.getBoundingClientRect();
      console.log(rect);
      setCanvas({
        x: rect.x,
        y: rect.top + window.scrollY,
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
  }, [screenRatio, vw, video]);

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

      return () => {
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
  function toggleLeftControls() {
    const wrapperLeft = document.querySelector(".wrapper-left");
    const wrapperRight = document.querySelector(".wrapper-right");
    wrapperLeft.classList.toggle("control");
    wrapperLeft.classList.remove("hide");
    wrapperRight.classList.remove("hide");
    setLeftControl(!leftControl);
  }
  function toggleRightControls() {
    const wrapperLeft = document.querySelector(".wrapper-left");
    const wrapperRight = document.querySelector(".wrapper-right");
    wrapperRight.classList.toggle("control");
    wrapperLeft.classList.remove("hide");
    wrapperRight.classList.remove("hide");
    setRightControl(!rightControl);
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
    <>
      <div className="wrapper-left control" ref={wrapperLeftRef}>
        <People
          ids={ids}
          attrs={attrs}
          frame={frame}
          linecheck={lineCheck}
          idAll={idAll}
          entrance={entrance}
        />
      </div>

      {leftControl ? (
        <button
          onClick={toggleLeftControls}
          type="button"
          className="btn-control-left"
          ref={btnControlLeftRef}
        >
          <span className="material-symbols-rounded">
            keyboard_double_arrow_right
          </span>
        </button>
      ) : (
        <button
          onClick={toggleLeftControls}
          type="button"
          className="btn-control-left"
          ref={btnControlLeftRef}
        >
          <span className="material-symbols-rounded">
            keyboard_double_arrow_left
          </span>
        </button>
      )}

      <div className="wrapper">
        <h1>Video Player</h1>
        <div
          ref={playerContainerRef}
          className="player-wrapper control"
          data-volume-level="high"
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
            loop={true} //false to test frames .etc
            volume={volume}
            playbackRate={playbackRate}
            controls={false}
            onReady={() => {
              setDuration(playerRef.current.getDuration());
              const video = document.querySelector("video");
              setVideo(video);
            }}
            onStart={() => {
              startDrawing();
            }}
          />
          <PlayerControls
            className="controls"
            onRewind={handleRewind}
            onFastFoward={handleFastForward}
            volume={volume}
            onChangeVolume={handleVolume}
            muted={muted}
            onMute={handleMute}
            onSearch={handleUrl}
            screenRatio={screenRatio}
            setScreenRatio={setScreenRatio}
            wrapperLeftRef={wrapperLeftRef}
            wrapperRightRef={wrapperRightRef}
            btnControlLeftRef={btnControlLeftRef}
            btnControlRightRef={btnControlRightRef}
            setLeftControl={setLeftControl}
            setRightControl={setRightControl}
            vw={vw}
            setVw={setVw}
          />
          <Controls
            playerContainerRef={playerContainerRef}
            playing={playing}
            onPlayPause={handlePlayPause}
            seekToStart={seekToStart}
            video={video}
            onMute={handleMute}
            muted={muted}
            volume={volume}
            onChangeVolume={handleVolume}
            time={format(time)}
            duration={format(duration)}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRate}
            boxCheck={boxCheck}
            setBoxCheck={setBoxCheck}
            idCheck={idCheck}
            setIdCheck={setIdCheck}
            lineCheck={lineCheck}
            setLineCheck={setLineCheck}
            edgeCheck={edgeCheck}
            setEdgeCheck={setEdgeCheck}
            onToggleFullScreen={toggleFullScreen}
            onSeek={onSeek}
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
          lineCheck={lineCheck}
          edgeCheck={edgeCheck}
          fps={fps}
          frame={frame}
          keys={keys}
        />
        <CanvasLine
          x={x}
          y={y}
          width={width}
          height={height}
          wRatio={wRatio}
          hRatio={hRatio}
          lineCheck={lineCheck}
          startpoint={startpoint}
          endpoint={endpoint}
          setStartpoint={setStartpoint}
          setEndpoint={setEndpoint}
          startend={startend}
          setStartend={setStartend}
        />
      </div>
      {rightControl ? (
        <button
          onClick={toggleRightControls}
          type="button"
          className="btn-control-right"
          ref={btnControlRightRef}
        >
          <span className="material-symbols-rounded">
            keyboard_double_arrow_left
          </span>
        </button>
      ) : (
        <button
          onClick={toggleRightControls}
          type="button"
          className="btn-control-right"
          ref={btnControlRightRef}
        >
          <span className="material-symbols-rounded">
            keyboard_double_arrow_right
          </span>
        </button>
      )}

      <div className="wrapper-right control" ref={wrapperRightRef}>
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
          fps={fps.toFixed(2)}
          frame={frame}
        />
        <Elapsed elapsed={format(time)} duration={format(duration)} />
        <Size />
        <Points
          width={width}
          height={height}
          startpoint={startpoint}
          endpoint={endpoint}
          setStartpoint={setStartpoint}
          setEndpoint={setEndpoint}
        />
      </div>
    </>
  );
}

export default App;
