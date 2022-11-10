import React, { useRef, useEffect, useContext } from "react";
import { DataContext } from "../../context/DataContext";

// let EDGES = [
//   [0, 1],
//   [0, 2],
//   [1, 3],
//   [2, 4],
//   [3, 5],
//   [4, 6],
//   [5, 7],
//   [6, 8],
//   [7, 9],
//   [8, 10],
//   [5, 11],
//   [6, 12],
//   [11, 13],
//   [12, 14],
//   [13, 15],
//   [14, 16],
//   [11, 12],
// ];

// let colors = [
//   [255, 0, 0],
//   [255, 85, 0],
//   [255, 170, 0],
//   [255, 255, 0],
//   [170, 255, 0],
//   [85, 255, 0],
//   [0, 255, 0],
//   [0, 255, 85],
//   [0, 255, 170],
//   [0, 255, 255],
//   [0, 170, 255],
//   [0, 85, 255],
//   [0, 0, 255],
//   [85, 0, 255],
//   [170, 0, 255],
//   [255, 0, 255],
//   [255, 0, 170],
//   [255, 0, 85],
// ];

// const colorList = [
//   "#FF6347",
//   "#40E0D0",
//   "#EE82EE",
//   "#F5DEB3",
//   "#FFFF00",
//   "#9ACD32",
//   "#D8BFD8",
//   "#008080",
//   "#D2B48C",
//   "#4682B4",
//   "#00FF7F",
//   "#708090",
//   "#6A5ACD",
//   "#87CEEB",
//   "#C0C0C0",
//   "#A0522D",
//   "#2E8B57",
//   "#F4A460",
//   "#FA8072",
//   "#8B4513",
//   "#4169E1",
//   "#BC8F8F",
//   "#FF0000",
//   "#663399",
//   "#800080",
//   "#A020F0",
//   "#B0E0E6",
//   "#DDA0DD",
//   "#FFC0CB",
//   "#CD853F",
//   "#FFDAB9",
//   "#FFEFD5",
//   "#DB7093",
//   "#AFEEEE",
//   "#98FB98",
//   "#EEE8AA",
//   "#DA70D6",
//   "#FF4500",
//   "#FFA500",
//   "#6B8E23",
//   "#808000",
//   "#000080",
//   "#FFDEAD",
//   "#FFE4B5",
//   "#FFE4E1",
//   "#191970",
//   "#C71585",
//   "#48D1CC",
//   "#00FA9A",
//   "#7B68EE",
//   "#3CB371",
//   "#9370DB",
//   "#BA55D3",
//   "#0000CD",
//   "#66CDAA",
//   "#800000",
//   "#B03060",
//   "#FF00FF",
//   "#32CD32",
//   "#00FF00",
//   "#B0C4DE",
//   "#778899",
//   "#87CEFA",
//   "#20B2AA",
//   "#FFA07A",
//   "#FFB6C1",
//   "#90EE90",
//   "#D3D3D3",
//   "#FAFAD2",
//   "#E0FFFF",
//   "#F08080",
//   "#ADD8E6",
//   "#FFFACD",
//   "#7CFC00",
//   "#FFF0F5",
//   "#E6E6FA",
//   "#F0E68C",
//   "#4B0082",
//   "#CD5C5C",
//   "#FF69B4",
//   "#ADFF2F",
//   "#008000",
//   "#00FF00",
//   "#808080",
//   "#BEBEBE",
//   "#DAA520",
//   "#FFD700",
//   "#DCDCDC",
//   "#FF00FF",
//   "#228B22",
//   "#B22222",
//   "#1E90FF",
//   "#696969",
//   "#00BFFF",
//   "#FF1493",
//   "#9400D3",
//   "#00CED1",
//   "#2F4F4F",
//   "#483D8B",
//   "#8FBC8F",
//   "#E9967A",
//   "#8B0000",
//   "#9932CC",
//   "#FF8C00",
//   "#556B2F",
//   "#8B008B",
//   "#BDB76B",
//   "#006400",
//   "#A9A9A9",
//   "#B8860B",
//   "#008B8B",
//   "#00008B",
//   "#00FFFF",
//   "#DC143C",
//   "#6495ED",
//   "#FF7F50",
//   "#D2691E",
//   "#7FFF00",
//   "#5F9EA0",
//   "#DEB887",
//   "#A52A2A",
//   "#8A2BE2",
//   "#0000FF",
//   "#FFEBCD",
//   "#000000",
//   "#FFE4C4",
//   "#F5F5DC",
//   "#7FFFD4",
//   "#00FFFF",
//   "#FAEBD7",
// ];

export default function Canvas({ x, y, width, height, wRatio, hRatio, frame }) {
  const boxRef = useRef(null);
  const { data } = useContext(DataContext);
  const { boxes, lps, scores } = data;

  useEffect(() => {
    if (wRatio !== 1) {
      const box = boxRef.current;
      const ctx = box.getContext("2d");
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(wRatio, hRatio);
    }
    console.log("trigger");
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
        // ctx.strokeRect(
        //   boxes[frameIndex][i][0],
        //   boxes[frameIndex][i][1],
        //   boxes[frameIndex][i][2],
        //   boxes[frameIndex][i][3]
        // );
        // ctx.fillRect(
        //   boxes[frameIndex][i][0],
        //   boxes[frameIndex][i][1],
        //   boxes[frameIndex][i][2],
        //   boxes[frameIndex][i][3]
        // );
        ctx.strokeRect(
          boxes[frameIndex][i].xmin * 640,
          boxes[frameIndex][i].ymin * 960 - 150,
          boxes[frameIndex][i].width * 640,
          boxes[frameIndex][i].height * 960
        );
        ctx.fillRect(
          boxes[frameIndex][i].xmin * 640,
          boxes[frameIndex][i].ymin * 960 - 150,
          boxes[frameIndex][i].width * 640,
          boxes[frameIndex][i].height * 960
        );
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        // ctx.fillText(
        //   lps[frameIndex][i],
        //   boxes[frameIndex][i][0],
        //   boxes[frameIndex][i][1] - 5
        // );
        // ctx.fillText(
        //   `${scores[frameIndex][i]}`,
        //   boxes[frameIndex][i][0],
        //   boxes[frameIndex][i][1] + boxes[frameIndex][i][3] + 25
        // );
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
