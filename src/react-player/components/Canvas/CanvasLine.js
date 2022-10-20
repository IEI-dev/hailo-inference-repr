import React, { useEffect, useRef, useContext } from "react";
import { CanvasContext } from "../../context/CanvasContext";
import { DataContext } from "../../context/DataContext";

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

function drawPolygon(ctx, clicks) {
  if (ctx) {
    console.log("touched");
    ctx.clearRect(0, 0, window.innerWidth * 3, window.innerHeight * 3);
    ctx.fillStyle = "rgba(100,100,100,0.4)";
    ctx.strokeStyle = "lightgreen";
    ctx.lineWidth = 3;
    console.log(clicks);
    ctx.beginPath();
    ctx.moveTo(clicks.firstClick[0], clicks.firstClick[1]);
    if (clicks.secondClick) {
      ctx.lineTo(clicks.secondClick[0], clicks.secondClick[1]);
    }
    if (clicks.thirdClick) {
      ctx.lineTo(clicks.thirdClick[0], clicks.thirdClick[1]);
    }
    if (clicks.fourthClick) {
      ctx.lineTo(clicks.fourthClick[0], clicks.fourthClick[1]);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

function drawPoints(ctx, clicks) {
  ctx.strokeStyle = "#df4b26";
  ctx.lineJoin = "round";
  ctx.lineWidth = 2;

  for (let property in clicks) {
    ctx.beginPath();
    ctx.arc(clicks[property][0], clicks[property][1], 3, 0, Math.PI * 2, false);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  // for (let i = 0; i < clicks.length; i++) {
  //   ctx.beginPath();
  //   ctx.arc(clicks[i][0], clicks[i][1], 3, 0, Math.PI * 2, false);
  //   ctx.fillStyle = "#fff";
  //   ctx.fill();
  //   ctx.lineWidth = 3;
  //   ctx.stroke();
  // }
}

export default function CanvasLine({ x, y, width, height, wRatio, hRatio }) {
  const lineRef = useRef(null);
  const {
    startpoint,
    endpoint,
    setStartpoint,
    setEndpoint,
    lineCheck,
    startend,
    setStartend,
    type,
    clicks,
    setClicks,
  } = useContext(CanvasContext);
  const { data } = useContext(DataContext);
  const { entrance_line } = data;
  let clickCount = 0;
  let clickList = [];

  useEffect(() => {
    // you may also transform the line as screenRatio changes, but it will effects your mouse event's accuracy
    // const line = lineRef.current;
    // const ctx = line.getContext("2d");
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    // ctx.scale(wRatio, hRatio);
    setStartpoint({ sx: entrance_line[0], sy: entrance_line[1] });
    setEndpoint({ ex: entrance_line[2], ey: entrance_line[3] });
    setStartend("start");
  }, [wRatio, hRatio]);

  function handleClick(event) {
    const line = lineRef.current;
    const ctx = line.getContext("2d");
    if ((event.buttons & 1) === 1) {
      if (type === "line") {
        if (startend === "start") {
          setStartpoint({ sx: event.pageX - x, sy: event.pageY - y });
          setEndpoint({ ex: event.pageX - x, ey: event.pageY - y });
          setStartend("end");
        } else {
          setEndpoint({ ex: event.pageX - x, ey: event.pageY - y });
          setStartend("start");
        }
      }

      if (type === "polygon") {
        clickCount += 1;
        clickList.push([event.pageX - x, event.pageY - y]);
        console.log("touched");
        console.log(clicks);
        console.log(clickCount);
        switch (clickCount) {
          case 1:
            setClicks({
              firstClick: clickList[0],
            });
            break;
          case 2:
            setClicks({
              firstClick: clickList[0],
              secondClick: clickList[1],
            });
            break;
          case 3:
            setClicks({
              firstClick: clickList[0],
              secondClick: clickList[1],
              thirdClick: clickList[2],
            });
            break;
          case 4:
            setClicks({
              firstClick: clickList[0],
              secondClick: clickList[1],
              thirdClick: clickList[2],
              fourthClick: clickList[3],
            });
            break;
          default:
            clickList = [];
            setClicks({
              firstClick: [0, 0],
              secondClick: [0, 0],
              thirdClick: [0, 0],
              fourthClick: [0, 0],
            });
        }
        if (clickCount < 5) {
          // drawPolygon(ctx, clickList);
          // drawPoints(ctx, clickList);
        } else {
          ctx.clearRect(0, 0, window.innerWidth * 3, window.innerHeight * 3);
          clickCount = 0;
        }
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

  useEffect(() => {
    const line = lineRef.current;
    const ctx = line.getContext("2d");
    drawPolygon(ctx, clicks);
    drawPoints(ctx, clicks);
  }, [clicks]);
  return (
    <canvas
      className="line"
      ref={lineRef}
      width={width}
      height={height}
      style={{ left: x, top: y, border: "2px solid blue" }}
    ></canvas>
  );
}
