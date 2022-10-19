import React, { useContext } from "react";
import { CanvasContext } from "../../context/CanvasContext";

export function strToNum(str) {
  return parseInt(str);
}

export function limitWidthHeight(value, limit) {
  if (value < 0) {
    return 0;
  } else if (value > limit) {
    return limit;
  }
  return value;
}

export default function Line({ width, height }) {
  const { startpoint, endpoint, setStartpoint, setEndpoint } = useContext(
    CanvasContext
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="sx">
        Start X:
        <input
          type="number"
          id="sx"
          data-testid="sx"
          min="1"
          step="1"
          onChange={(e) =>
            setStartpoint({
              ...startpoint,
              sx: limitWidthHeight(e.target.value, width),
            })
          }
          value={strToNum(startpoint.sx)}
          name="startX"
        />
      </label>

      <label htmlFor="sy">
        Start Y:
        <input
          type="number"
          id="sy"
          data-testid="sy"
          step="1"
          onChange={(e) =>
            setStartpoint({
              ...startpoint,
              sy: limitWidthHeight(e.target.value, height),
            })
          }
          value={strToNum(startpoint.sy)}
          name="startY"
        />
      </label>
      <label htmlFor="ex">
        End X:
        <input
          type="number"
          id="ex"
          data-testid="ex"
          step="1"
          onChange={(e) =>
            setEndpoint({
              ...endpoint,
              ex: limitWidthHeight(e.target.value, width),
            })
          }
          value={strToNum(endpoint.ex)}
          name="endX"
        />
      </label>
      <label htmlFor="ey">
        End Y:
        <input
          type="number"
          id="ey"
          data-testid="ey"
          step="1"
          onChange={(e) =>
            setEndpoint({
              ...endpoint,
              ey: limitWidthHeight(e.target.value, height),
            })
          }
          value={strToNum(endpoint.ey)}
          name="endY"
        />
      </label>
    </form>
  );
}
