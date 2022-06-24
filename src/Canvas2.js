import React, { useRef, useEffect } from "react";

export default function Canvas2({ draw, playRatio, x, y, width, height }) {
  const rectRef = useRef(null);
  useEffect(() => {
    const rect = rectRef.current;
    const context = rect.getContext("2d");
    let playRate = (playRatio * width) / 100;
    draw(context, playRate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playRatio]);
  return (
    <>
      <canvas
        className="rect"
        ref={rectRef}
        width={width}
        height={height}
        style={{ left: x, top: y, border: "2px solid red" }}
      ></canvas>
    </>
  );
}
