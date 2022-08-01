import React, { useRef, useEffect, useState } from "react";

export default function Canvas({
  x,
  y,
  width,
  height,
  boxes,
  ids,
  scores,
  wRatio,
  hRatio,
  boxCheck,
  idCheck,
  lineCheck,
  fps,
  // video,
  frame,
}) {
  const boxRef = useRef(null);
  const lineRef = useRef(null);
  const colorList = [
    "#FF6347",
    "#40E0D0",
    "#EE82EE",
    "#F5DEB3",
    "#FFFF00",
    "#9ACD32",
    "#D8BFD8",
    "#008080",
    "#D2B48C",
    "#4682B4",
    "#00FF7F",
    "#708090",
    "#6A5ACD",
    "#87CEEB",
    "#C0C0C0",
    "#A0522D",
    "#2E8B57",
    "#F4A460",
    "#FA8072",
    "#8B4513",
    "#4169E1",
    "#BC8F8F",
    "#FF0000",
    "#663399",
    "#800080",
    "#A020F0",
    "#B0E0E6",
    "#DDA0DD",
    "#FFC0CB",
    "#CD853F",
    "#FFDAB9",
    "#FFEFD5",
    "#DB7093",
    "#AFEEEE",
    "#98FB98",
    "#EEE8AA",
    "#DA70D6",
    "#FF4500",
    "#FFA500",
    "#6B8E23",
    "#808000",
    "#000080",
    "#FFDEAD",
    "#FFE4B5",
    "#FFE4E1",
    "#191970",
    "#C71585",
    "#48D1CC",
    "#00FA9A",
    "#7B68EE",
    "#3CB371",
    "#9370DB",
    "#BA55D3",
    "#0000CD",
    "#66CDAA",
    "#800000",
    "#B03060",
    "#FF00FF",
    "#32CD32",
    "#00FF00",
    "#B0C4DE",
    "#778899",
    "#87CEFA",
    "#20B2AA",
    "#FFA07A",
    "#FFB6C1",
    "#90EE90",
    "#D3D3D3",
    "#FAFAD2",
    "#E0FFFF",
    "#F08080",
    "#ADD8E6",
    "#FFFACD",
    "#7CFC00",
    "#FFF0F5",
    "#E6E6FA",
    "#F0E68C",
    "#4B0082",
    "#CD5C5C",
    "#FF69B4",
    "#ADFF2F",
    "#008000",
    "#00FF00",
    "#808080",
    "#BEBEBE",
    "#DAA520",
    "#FFD700",
    "#DCDCDC",
    "#FF00FF",
    "#228B22",
    "#B22222",
    "#1E90FF",
    "#696969",
    "#00BFFF",
    "#FF1493",
    "#9400D3",
    "#00CED1",
    "#2F4F4F",
    "#483D8B",
    "#8FBC8F",
    "#E9967A",
    "#8B0000",
    "#9932CC",
    "#FF8C00",
    "#556B2F",
    "#8B008B",
    "#BDB76B",
    "#006400",
    "#A9A9A9",
    "#B8860B",
    "#008B8B",
    "#00008B",
    "#00FFFF",
    "#DC143C",
    "#6495ED",
    "#FF7F50",
    "#D2691E",
    "#7FFF00",
    "#5F9EA0",
    "#DEB887",
    "#A52A2A",
    "#8A2BE2",
    "#0000FF",
    "#FFEBCD",
    "#000000",
    "#FFE4C4",
    "#F5F5DC",
    "#7FFFD4",
    "#00FFFF",
    "#FAEBD7",
  ];
  const [startpoint, setStartpoint] = useState({
    sx: 0,
    sy: 0,
  });
  const [endpoint, setEndpoint] = useState({
    ex: 0,
    ey: 0,
  });
  const [startend, setStartend] = useState("start");
  useEffect(() => {
    if (wRatio !== 1) {
      const box = boxRef.current;
      const ctx = box.getContext("2d");
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(wRatio, hRatio);
      setStartpoint({ sx: 0, sy: 0 });
      setEndpoint({ ex: 0, ey: 0 });
    }
  }, [wRatio, hRatio]);

  useEffect(() => {
    const box = boxRef.current;
    const ctx = box.getContext("2d");
    drawByFrames(ctx);
  }, [frame, boxCheck, idCheck, width]);

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
    const line = lineRef.current;
    const ctx = line.getContext("2d");
    if (lineCheck) {
      line.addEventListener("mousemove", handleMove);
      line.addEventListener("mousedown", handleClick);
      drawLines(ctx);
      return () => {
        line.removeEventListener("mousemove", handleMove);
        line.removeEventListener("mousedown", handleClick);
      };
    } else {
      ctx.clearRect(0, 0, window.innerWidth * 3, window.innerHeight * 3);
    }
  }, [startend, x, endpoint, lineCheck]);

  function drawByFrames(ctx) {
    let frameIndex = frame - 1;
    if (frameIndex === -1) frameIndex = 0;

    if (ids[frameIndex] !== undefined) {
      ctx.clearRect(0, 0, window.innerWidth * 3, window.innerHeight * 3);
      ctx.lineWidth = 1;
      ctx.font = "bold 8px Arial";

      for (let i = 0; i < ids[frameIndex].length; i++) {
        if (idCheck) {
          ctx.fillStyle = "black";
          ctx.fillText(
            `${ids[frameIndex][i]}`,
            boxes[frameIndex][i][0],
            boxes[frameIndex][i][1] - 5
          );
        }
        if (boxCheck) {
          ctx.strokeStyle = colorList[ids[frameIndex][i] - 1];
          ctx.fillStyle = "rgba(255,255,0,0.2)";
          ctx.strokeRect(
            boxes[frameIndex][i][0],
            boxes[frameIndex][i][1],
            boxes[frameIndex][i][2],
            boxes[frameIndex][i][3]
          );
          ctx.fillRect(
            boxes[frameIndex][i][0],
            boxes[frameIndex][i][1],
            boxes[frameIndex][i][2],
            boxes[frameIndex][i][3]
          );
        }
      }
    }
  }

  function drawLines(ctx) {
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

  return (
    <>
      <canvas
        className="rect"
        ref={boxRef}
        width={width}
        height={height}
        style={{ left: x, top: y, border: "2px solid red" }}
      ></canvas>
      <canvas
        className="line"
        ref={lineRef}
        width={width}
        height={height}
        style={{ left: x, top: y, border: "2px solid blue" }}
      ></canvas>
    </>
  );
}
