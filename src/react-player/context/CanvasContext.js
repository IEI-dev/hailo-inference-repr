import React, { createContext, useContext, useState } from "react";
import { DataContext } from "./DataContext";

export const CanvasContext = createContext();

const CanvasContextProvider = (props) => {
  const { data } = useContext(DataContext);
  const { entrance_line } = data;
  const [canvas, setCanvas] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    wRatio: 1,
    hRatio: 1,
  });
  const [startpoint, setStartpoint] = useState({
    sx: entrance_line[0],
    sy: entrance_line[1],
  });
  const [endpoint, setEndpoint] = useState({
    ex: entrance_line[2],
    ey: entrance_line[3],
  });
  const [boxCheck, setBoxCheck] = useState(false); // box and id props for PlayerControls callback and give to Canvas
  const [idCheck, setIdCheck] = useState(false);
  const [lineCheck, setLineCheck] = useState(true);
  const [edgeCheck, setEdgeCheck] = useState(false);
  const [startend, setStartend] = useState("start");
  const [type, setType] = useState("line");
  const [clicks, setClicks] = useState([]);

  return (
    <CanvasContext.Provider
      value={{
        canvas,
        setCanvas,
        startpoint,
        setStartpoint,
        endpoint,
        setEndpoint,
        boxCheck,
        setBoxCheck,
        idCheck,
        setIdCheck,
        lineCheck,
        setLineCheck,
        edgeCheck,
        setEdgeCheck,
        startend,
        setStartend,
        type,
        setType,
        clicks,
        setClicks,
      }}
    >
      {props.children}
    </CanvasContext.Provider>
  );
};

export default CanvasContextProvider;
