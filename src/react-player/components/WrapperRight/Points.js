// wrapper-right form to set points
import React, { useContext } from "react";
import { CanvasContext } from "../../context/CanvasContext";
import Line from "./Line";
import Polygon from "./Polygon";

export default function Points({ width, height }) {
  const { setStartpoint, setEndpoint, type, setType, setClicks } = useContext(
    CanvasContext
  );

  const renderSwitch = (type) => {
    switch (type) {
      case "polygon":
        return <Polygon />;
      default:
        return <Line width={width} height={height} />;
    }
  };

  return (
    <div className="points">
      {renderSwitch(type)}
      <div className="buttons">
        <button
          onClick={() => {
            setStartpoint({ sx: 0, sy: 0 });
            setEndpoint({ ex: 0, ey: 0 });
            setClicks({
              firstClick: [0, 0],
              secondClick: [0, 0],
              thirdClick: [0, 0],
              fourthClick: [0, 0],
            });
          }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            setStartpoint({ sx: 0, sy: 0 });
            setEndpoint({ ex: 0, ey: 0 });
            setClicks({
              firstClick: [0, 0],
              secondClick: [0, 0],
              thirdClick: [0, 0],
              fourthClick: [0, 0],
            });
            type === "line" ? setType("polygon") : setType("line");
          }}
        >
          {type === "line" ? "line" : "polygon"}
        </button>
      </div>
    </div>
  );
}
