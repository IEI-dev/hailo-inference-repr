import React from "react";

export default function FrameFps({ frame, fps }) {
  return (
    <div>
      <span id="frame-info">{frame + 1}frames</span>{" "}
      <span id="fps-info">{fps}fps</span>
    </div>
  );
}
