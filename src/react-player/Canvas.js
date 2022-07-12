import React, { useRef, useEffect } from "react";

export default function Canvas({
  x,
  y,
  width,
  height,
  boxes,
  time,
  boxIndex,
  ids,
  wRatio,
  hRatio,
  boxCheck,
  idCheck,
  video,
}) {
  const boxRef = useRef(null);

  // useEffect
  useEffect(() => {
    const box = boxRef.current;
    const ctx = box.getContext("2d");
    ctx.scale(wRatio, hRatio);
  }, [wRatio, hRatio]);
  useEffect(() => {
    const box = boxRef.current;
    const ctx = box.getContext("2d");
    draw(ctx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  // Canvas draw function
  function draw(ctx) {
    const colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "cyan",
      "blue",
      "magenta",
      "purple",
      "white",
      "black",
      "gray",
      "silver",
      "pink",
      "maroon",
      "brown",
      "beige",
      "tan",
      "peachpuff",
      "lime",
      "olive",
      "turquoise",
      "teal",
      "navy",
      "indigo",
      "violet",
    ];
    ctx.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
    ctx.lineWidth = 2;
    ctx.font = "18px serif";
    for (let i = 0; i < boxes[boxIndex].length; i++) {
      ctx.strokeStyle = colors[ids[boxIndex][i] - 1];
      if (idCheck) {
        ctx.fillText(
          `${ids[boxIndex][i]}`,
          boxes[boxIndex][i][0],
          boxes[boxIndex][i][1] - 10
        );
      }
      if (boxCheck) {
        ctx.strokeRect(
          boxes[boxIndex][i][0],
          boxes[boxIndex][i][1],
          boxes[boxIndex][i][2],
          boxes[boxIndex][i][3]
        );
      }
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
      <p>
        <span id="fps-info">0</span>fps
      </p>
      <pre id="metadata-info"></pre>
    </>
  );
}
