//  Youtube ui controls
import React, { useEffect } from "react";
import Duration from "./Duration";
import ToggleControls from "./ToggleControls";

export default function Controls({
  playerContainerRef,
  playing,
  onPlayPause,
  seekToStart,
  video,
  onMute,
  muted,
  volume,
  onChangeVolume,
  time,
  duration,
  playbackRate,
  onPlaybackRateChange,
  onToggleFullScreen,
  onSeek,
}) {
  let isScrubbing = false;
  let wasPaused;
  function toggleScrubbing(e) {
    const timelineContainer = document.querySelector(".timeline-container");
    const rect = timelineContainer.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    isScrubbing = (e.buttons & 1) === 1;
    playerContainerRef.current.classList.toggle("scrubbing", isScrubbing);
    if (isScrubbing) {
      wasPaused = video.paused;
      video.pause();
    } else {
      onSeek(percent);
      if (!wasPaused) video.play();
    }
    handleTimelineUpdate(e);
  }

  function handleTimelineUpdate(e) {
    const timelineContainer = document.querySelector(".timeline-container");
    const rect = timelineContainer.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    timelineContainer.style.setProperty("--preview-position", percent);
    if (isScrubbing) {
      e.preventDefault();
      timelineContainer.style.setProperty("--progress-position", percent);
    }
  }
  useEffect(() => {
    // const playerWrapper = document.querySelector(".player-wrapper");
    playing
      ? playerContainerRef.current.classList.remove("paused")
      : playerContainerRef.current.classList.add("paused");
    const timelineContainer = document.querySelector(".timeline-container");
    timelineContainer.addEventListener("mousedown", toggleScrubbing);
    timelineContainer.addEventListener("mousemove", handleTimelineUpdate);
    document.addEventListener("mouseup", (e) => {
      if (isScrubbing) toggleScrubbing(e);
    });
    document.addEventListener("mousemove", (e) => {
      if (isScrubbing) handleTimelineUpdate(e);
    });
    // const rect = document.querySelector(".rect");
    // rect.addEventListener("click", onPlayPause);
    return () => {
      timelineContainer.removeEventListener("mousedown", toggleScrubbing);
      document.removeEventListener("mouseup", (e) => {
        if (isScrubbing) toggleScrubbing(e);
      });
      timelineContainer.removeEventListener("mousemove", handleTimelineUpdate);
      document.removeEventListener("mousemove", (e) => {
        if (isScrubbing) handleTimelineUpdate(e);
      });
      // rect.removeEventListener("click", onPlayPause);
    };
  }, [video]);
  useEffect(() => {
    if (video !== null) {
      const timelineContainer = document.querySelector(".timeline-container");
      video.addEventListener("timeupdate", () => {
        const percent = video.currentTime / video.duration;
        timelineContainer.style.setProperty("--progress-position", percent);
      });

      return () => {
        video.removeEventListener("timeupdate", () => {
          const percent = video.currentTime / video.duration;
          timelineContainer.style.setProperty("--progress-position", percent);
        });
      };
    }
  }, [video]);
  useEffect(() => {
    // const playerWrapper = document.querySelector(".player-wrapper");
    let volumeLevel;
    if (volume === 0 || muted === true) {
      volumeLevel = "muted";
    } else if (volume >= 0.5) {
      volumeLevel = "high";
    } else {
      volumeLevel = "low";
    }
    playerContainerRef.current.dataset.volumeLevel = volumeLevel;
  }, [volume, muted]);

  return (
    <div>
      <div className="video-controls-container" data-testid="video-controls">
        <div className="timeline-container">
          <div className="timeline">
            <div className="thumb-indicator"></div>
          </div>
        </div>
        <div className="controls">
          <button className="rewind-btn" onClick={seekToStart}>
            <svg height="24px" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M11 16.07V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.56.4-.56 1.24 0 1.63l5.77 4.07c.67.47 1.58 0 1.58-.81zm1.66-3.25l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z"
              />
            </svg>
          </button>

          {playing ? (
            <button className="play-pause-btn" onClick={onPlayPause}>
              <svg className="pause-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
              </svg>
            </button>
          ) : (
            <button className="play-pause-btn" onClick={onPlayPause}>
              <svg className="play-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
              </svg>
            </button>
          )}

          <div className="volume-container">
            <button className="mute-btn" onClick={onMute}>
              <svg className="volume-high-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                />
              </svg>
              <svg className="volume-low-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
                />
              </svg>
              <svg className="volume-muted-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                />
              </svg>
            </button>
            <input
              className="volume-slider"
              type="range"
              min="0"
              max="1"
              step="any"
              value={volume}
              onChange={(e) => {
                onChangeVolume(parseFloat(e.target.value));
              }}
            />
          </div>

          <Duration time={time} duration={duration} />

          <button className="speed-btn wide-btn" onClick={onPlaybackRateChange}>
            {playbackRate}x
          </button>
          <button className="full-screen-btn" onClick={onToggleFullScreen}>
            <svg className="open" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
              />
            </svg>
            <svg className="close" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
              />
            </svg>
          </button>
        </div>
      </div>
      <ToggleControls playerContainerRef={playerContainerRef} />
    </div>
  );
}
