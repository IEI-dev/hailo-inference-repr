import React, { useRef, useEffect } from "react";

export default function Canvas({ draw, playRatio }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    draw(context, playRatio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playRatio]);
  return (
    <>
      <div>Canvas</div>
      <canvas
        ref={canvasRef}
        width="150"
        height="150"
        style={{ border: "1px solid #000000" }}
      ></canvas>
    </>
  );
}
