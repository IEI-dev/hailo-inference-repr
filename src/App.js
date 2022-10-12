import React, { useState, useRef, useEffect, useContext } from "react";
import ReactPlayer from "react-player";
import PlayerControls from "./react-player/components/Controls/PlayerControls";
import screenfull from "screenfull";

import Canvas from "./react-player/components/Canvas/Canvas";
import CanvasLine from "./react-player/components/Canvas/CanvasLine";
import Data from "./react-player/components/WrapperRight/Data";
import Controls from "./react-player/components/Controls/Controls";
import Points from "./react-player/components/WrapperRight/Points";
import People from "./react-player/components/WrapperLeft/People";
import FrameFps from "./react-player/components/WrapperRight/FrameFps";
import Size from "./react-player/components/Size/Size";
import { CanvasContext } from "./react-player/context/CanvasContext";
import { DataContext } from "./react-player/context/DataContext";
import { VideoContext } from "./react-player/context/VideoContext";

function App() {
  const { canvas, setCanvas } = useContext(CanvasContext);
  const { x, y, width, height, wRatio, hRatio } = canvas;
  const { data } = useContext(DataContext);
  const { fps, frame_count, width: basicWidth, height: basicHeight } = data;
  const { state, setState } = useContext(VideoContext);
  const { playing, muted, volume, playbackRate, url, key } = state;

  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [frame, setFrame] = useState(0);
  const [vw, setVw] = useState(70);
  const [video, setVideo] = useState(null);
  // const [key, setKey] = useState(0);
  // State
  const [leftControl, setLeftControl] = useState(true);
  const [rightControl, setRightControl] = useState(true);

  // Ref
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const wrapperLeftRef = useRef(null);
  const wrapperRightRef = useRef(null);
  const btnControlLeftRef = useRef(null);
  const btnControlRightRef = useRef(null);

  // handleState functions pass to Control.js

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
    setFrame(0);
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
    setFrame(Math.round(percent * frame_count));
  };

  // Update Time and Size

  const getSize = function() {
    if (playerRef) {
      const rect = playerContainerRef.current.getBoundingClientRect();
      setCanvas({
        x: rect.x,
        y: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
        wRatio: rect.width / basicWidth,
        hRatio: rect.height / basicHeight,
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
  }, [vw, video]);

  useEffect(() => {
    setState({ ...state, key: key + 1 });
  }, [url]);

  // Size Component
  // function Size() {
  //   const dimensions = {
  //     height: window.innerHeight,
  //     width: window.innerWidth,
  //   };
  //   useEffect(() => {
  //     window.addEventListener("resize", getSize);

  //     return () => {
  //       window.removeEventListener("resize", getSize);
  //     };
  //   });
  //   return (
  //     <div>
  //       <p>
  //         Rendered at {dimensions.width} x {dimensions.height}
  //       </p>
  //       <p>
  //         Canvas at {width.toFixed(2)} x {height.toFixed(2)}
  //       </p>
  //     </div>
  //   );
  // }
  // toggleControls, left and right
  function toggleLeftControls() {
    wrapperLeftRef.current.classList.toggle("control");
    wrapperLeftRef.current.classList.remove("hide");
    wrapperRightRef.current.classList.remove("hide");
    setLeftControl(!leftControl);
  }
  function toggleRightControls() {
    wrapperRightRef.current.classList.toggle("control");
    wrapperLeftRef.current.classList.remove("hide");
    wrapperRightRef.current.classList.remove("hide");
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
      {/* wrapper-left */}
      <div className="wrapper-left control" ref={wrapperLeftRef}>
        <People frame={frame} />
      </div>
      {/* wrapper-left control button */}
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
      {/* wrapper-middle */}
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
            time={time}
            duration={duration}
            playbackRate={playbackRate}
            onPlaybackRateChange={handlePlaybackRate}
            onToggleFullScreen={toggleFullScreen}
            onSeek={onSeek}
          />
        </div>
        <Canvas
          x={x}
          y={y}
          width={width}
          height={height}
          wRatio={wRatio}
          hRatio={hRatio}
          frame={frame}
        />
        <CanvasLine
          x={x}
          y={y}
          width={width}
          height={height}
          wRatio={wRatio}
          hRatio={hRatio}
        />
      </div>
      {/* wrapper-right control button */}
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
      {/* wrapper-right */}
      <div className="wrapper-right control" ref={wrapperRightRef}>
        <Data handleUrl={handleUrl} seekToStart={seekToStart} frame={frame} />
        <FrameFps frame={frame} fps={fps} />
        <Size getSize={getSize} />
        <Points width={width} height={height} />
      </div>
    </>
  );
}

export default App;
