import React from "react";

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
              sx: limitWidthHeight(e.target.value, width),
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
              sy: limitWidthHeight(e.target.value, height),
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
            setEndpoint({
              ...endpoint,
              ex: limitWidthHeight(e.target.value, width),
            })
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
              ey: limitWidthHeight(e.target.value, height),
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
