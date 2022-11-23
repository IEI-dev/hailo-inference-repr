import React, { useRef, useEffect, useContext } from "react";
import { DataContext } from "../../context/DataContext";

export default function Canvas({ x, y, width, height, wRatio, hRatio, frame }) {
  const boxRef = useRef(null);
  const { data } = useContext(DataContext);
  const { boxes, label } = data;

  useEffect(() => {
    if (wRatio !== 1) {
      const box = boxRef.current;
      const ctx = box.getContext("2d");
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(wRatio, hRatio);
      ctx.clearRect(0, 0, window.innerWidth * 3, window.innerHeight * 3);
    }
    console.log("trigger", wRatio, hRatio);
  }, [wRatio, hRatio]);

  useEffect(() => {
    const box = boxRef.current;
    const ctx = box.getContext("2d");
    drawByFrames(ctx);
    console.log(frame);
  }, [frame, width]);

  function drawByFrames(ctx) {
    let frameIndex = frame;
    if (boxes[frameIndex] !== undefined) {
      ctx.clearRect(0, 0, window.innerWidth * 3, window.innerHeight * 3);

      ctx.font = "bold 8px Arial";

      for (let i = 0; i < boxes[frameIndex].length; i++) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 3;
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

        ctx.fillStyle = "yellow";
        ctx.font = "20px Arial";

        ctx.fillText(
          label[frameIndex][i],
          boxes[frameIndex][i][0],
          boxes[frameIndex][i][1] - 5
        );
      }
    }
  }

  return (
    <canvas
      className="rect"
      ref={boxRef}
      width={width}
      height={height}
      style={{ left: x, top: y, border: "2px solid red" }}
    ></canvas>
  );
}
