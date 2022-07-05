import React, { useRef, useEffect } from "react";

export default function Canvas({
  playRatio,
  x,
  y,
  width,
  height,
  elapsed,
  duration,
}) {
  const rectRef = useRef(null);
  // Canvas draw function
  const draw = (ctx, x) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x + 25, 75, 25, 0, 1 * Math.PI);
    ctx.fill();
    ctx.strokeRect(x, 20, 50, 50);
    // animate(ctx);
  };
  useEffect(() => {
    const rect = rectRef.current;
    const context = rect.getContext("2d");
    let playRate = (playRatio * width) / 100;
    draw(context, playRate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playRatio]);

  // useEffect(() => {
  //   draw2();
  // }, [duration]);
  // useEffect(() => {
  //   const playButton = document.querySelector(".play");
  //   playButton.addEventListener("click", draw2);
  //   return (_) => {
  //     playButton.removeEventListener("click", draw2);
  //   };
  // }, []);

  function draw2() {
    const cvs = document.querySelector("#canvas2");
    const ctx = cvs.getContext("2d");
    animate(ctx);
  }
  function drawRect(ctx, x, y) {
    // 這就是很普通的畫一個方塊在指定座標的位置上
    // 假設長寬都是40
    const size = 20;
    // 設定填充色
    ctx.fillStyle = "#fff";
    ctx.fillRect(x, y, size * 2, size * 2);
  }
  const animate = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawRect(ctx, elapsed * 20, 100);

    if (elapsed < duration) {
      console.log("coming");
      requestAnimationFrame(() => {
        animate(ctx);
      });
    } else {
      return;
    }
  };
  return (
    <>
      <canvas
        className="rect"
        ref={rectRef}
        width={width}
        height={height}
        style={{ left: x, top: y, border: "2px solid red" }}
      ></canvas>
      <canvas
        className="rect"
        width="300"
        height="300"
        style={{ left: x, top: y }}
        id="canvas2"
      ></canvas>
    </>
  );
}
