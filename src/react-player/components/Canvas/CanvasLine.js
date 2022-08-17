import React, { useEffect, useRef } from "react";

function drawLines(ctx, startpoint, endpoint) {
  console.log("here");
  if (ctx) {
    console.log("there");
    ctx.strokeStyle = "lightgreen";
    ctx.lineStyle = "lightgreen";
    ctx.clearRect(0, 0, window.innerWidth * 3, window.innerHeight * 3);
    if (startpoint.sx >= 0 && startpoint.sy >= 0) {
      ctx.beginPath();
      ctx.lineWidth = 3;
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
    // you may also transform the line as screenRatio changes, but it will effects your mouse event's accuracy
    // const line = lineRef.current;
    // const ctx = line.getContext("2d");
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    // ctx.scale(wRatio, hRatio);
    setStartpoint({ sx: 0, sy: 360 });
    setEndpoint({ ex: 1280, ey: 360 });
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
