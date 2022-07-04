import React, { useRef, useEffect } from "react";

export default function Canvas({ playRatio, x, y, width, height }) {
  const rectRef = useRef(null);
  // Canvas draw function
  const draw = (ctx, x) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x + 25, 75, 25, 0, 1 * Math.PI);
    ctx.fill();
    ctx.strokeRect(x, 20, 50, 50);
  };
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
