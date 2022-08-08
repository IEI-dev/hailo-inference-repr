import React from "react";

export function strToNum(str) {
  return parseInt(str);
}

export function limitWidth(value, width) {
  if (value < 0) {
    return 0;
  } else if (value > width) {
    return width;
  }
  return value;
}
export function limitHeight(value, height) {
  if (value < 0) {
    return 0;
  } else if (value > height) {
    return height;
  }
  return value;
}

export default function Points({
  width,
  height,
  startpoint,
  endpoint,
  setStartpoint,
  setEndpoint,
}) {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="sx">Start X:</label>
        <input
          type="number"
          min="1"
          step="1"
          onChange={(e) =>
            setStartpoint({
              ...startpoint,
              sx: limitWidth(e.target.value, width),
            })
          }
          value={strToNum(startpoint.sx)}
          name="sx"
        />
        <label htmlFor="sy">Start Y:</label>
        <input
          type="number"
          step="1"
          onChange={(e) =>
            setStartpoint({
              ...startpoint,
              sy: limitHeight(e.target.value, height),
            })
          }
          value={strToNum(startpoint.sy)}
          name="sy"
        />
        <label htmlFor="ex">End X:</label>
        <input
          type="number"
          step="1"
          onChange={(e) =>
            setEndpoint({ ...endpoint, ex: limitWidth(e.target.value, width) })
          }
          value={strToNum(endpoint.ex)}
          name="ex"
        />
        <label htmlFor="ey">End Y:</label>
        <input
          type="number"
          step="1"
          onChange={(e) =>
            setEndpoint({
              ...endpoint,
              ey: limitHeight(e.target.value, height),
            })
          }
          value={strToNum(endpoint.ey)}
          name="ey"
        />
      </form>
      <button
        onClick={() => {
          setStartpoint({ sx: 0, sy: 0 });
          setEndpoint({ ex: 0, ey: 0 });
        }}
      >
        Reset
      </button>
    </>
  );
}
