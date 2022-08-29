import React, { createContext, useContext, useState } from "react";
import { DataContext } from "./DataContext";

export const CanvasContext = createContext();

const CanvasContextProvider = (props) => {
  const { data } = useContext(DataContext);
  const { entrance_line } = data;
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
  return (
    <CanvasContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </CanvasContext.Provider>
  );
};

export default CanvasContextProvider;
