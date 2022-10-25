import React, { useState, useRef, useEffect, useContext } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";

import Canvas from "./react-player/components/Canvas/Canvas";
import Controls from "./react-player/components/Controls/Controls";
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

  // State
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [frame, setFrame] = useState(0);
  const [vw, setVw] = useState(70);
  const [video, setVideo] = useState(null);

  // Ref
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);

  // handleState functions pass to Control.js

  const handleVolume = (volume, muted = false) => {
    setState({ ...state, volume: volume, muted: muted });
  };
  const handleTime = () => {
    setTime(playerRef.current.getCurrentTime());
  };
  const handlePlayPause = () => {
    setState({ ...state, playing: !playing });
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

  // update canvas size according to playerContainerRef
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
            loop={true} //false to test if frame counts are correct .etc
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
        <Size getSize={getSize} />
      </div>
    </>
  );
}

export default App;
