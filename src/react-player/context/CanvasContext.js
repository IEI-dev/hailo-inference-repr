import React, { createContext, useState } from "react";

export const CanvasContext = createContext();

const CanvasContextProvider = (props) => {
  const [canvas, setCanvas] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    wRatio: 1,
    hRatio: 1,
  });

  return (
    <CanvasContext.Provider
      value={{
        canvas,
        setCanvas,
      }}
    >
      {props.children}
    </CanvasContext.Provider>
  );
};

export default CanvasContextProvider;
