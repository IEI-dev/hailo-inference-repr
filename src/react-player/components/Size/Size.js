import React, { useEffect } from "react";

export default function Size({ getSize }) {
  const dimensions = {
    height: window.innerHeight,
    width: window.innerWidth,
  };
  useEffect(() => {
    window.addEventListener("resize", getSize);

    return () => {
      window.removeEventListener("resize", getSize);
    };
  });
  return (
    <div>
      <p>
        Rendered at {dimensions.width} x {dimensions.height}
      </p>
      <p>{/* Canvas at {width.toFixed(2)} x {height.toFixed(2)} */}</p>
    </div>
  );
}
