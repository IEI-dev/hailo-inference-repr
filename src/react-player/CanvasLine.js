import React, { useEffect, useRef } from "react";

function drawLines(ctx, startpoint, endpoint) {
  console.log("here");
  if (ctx) {
    console.log("there");
    ctx.clearRect(0, 0, window.innerWidth * 3, window.innerHeight * 3);
    if (startpoint.sx !== 0 && startpoint.sy !== 0) {
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "lightgreen";
      ctx.arc(startpoint.sx, startpoint.sy, 3, 0, Math.PI * 2);
      ctx.moveTo(startpoint.sx, startpoint.sy);

      ctx.lineTo(endpoint.ex, endpoint.ey);
      ctx.arc(endpoint.ex, endpoint.ey, 3, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
}

export default function CanvasLine({
  x,
  y,
  width,
  height,
  wRatio,
  hRatio,
  lineCheck,
  startpoint,
  endpoint,
  setStartpoint,
  setEndpoint,
  startend,
  setStartend,
}) {
  const lineRef = useRef(null);
  useEffect(() => {
    setStartpoint({ sx: 0, sy: 0 });
    setEndpoint({ ex: 0, ey: 0 });
    setStartend("start");
  }, [wRatio, hRatio]);

  function handleClick(event) {
    if ((event.buttons & 1) === 1) {
      if (startend === "start") {
        setStartpoint({ sx: event.pageX - x, sy: event.pageY - y });
        setEndpoint({ ex: event.pageX - x, ey: event.pageY - y });
        setStartend("end");
      } else {
        setEndpoint({ ex: event.pageX - x, ey: event.pageY - y });
        setStartend("start");
      }
    }
  }
  function handleMove(event) {
    if (startend === "end") {
      setEndpoint({ ex: event.pageX - x, ey: event.pageY - y });
    }
  }

  useEffect(() => {
    if (lineCheck) {
      const line = lineRef.current;
      const ctx = line.getContext("2d");
      if (ctx) {
        line.addEventListener("mousemove", handleMove);
        line.addEventListener("mousedown", handleClick);
        drawLines(ctx, startpoint, endpoint);
        return () => {
          line.removeEventListener("mousemove", handleMove);
          line.removeEventListener("mousedown", handleClick);
        };
      }
    }
  }, [startend, startpoint, endpoint, lineCheck]);

  return lineCheck ? (
    <canvas
      className="line"
      ref={lineRef}
      width={width}
      height={height}
      style={{ left: x, top: y, border: "2px solid blue" }}
    ></canvas>
  ) : null;
}
