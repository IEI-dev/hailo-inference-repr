import React, { useContext } from "react";
import { CanvasContext } from "../../context/CanvasContext";

export function strToNum(str) {
  return parseInt(str);
}

export default function Polygon() {
  const { clicks, setClicks } = useContext(CanvasContext);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="c1x">
        Click1 X:
        <input
          type="number"
          id="c1x"
          data-testid="c1x"
          min="1"
          step="1"
          onChange={(e) => {
            setClicks({
              ...clicks,
              firstClick: [e.target.value, clicks.firstClick[1]],
            });
          }}
          value={clicks.firstClick[0]}
        />
      </label>

      <label htmlFor="c1y">
        Click1 Y:
        <input
          type="number"
          id="c1y"
          data-testid="c1y"
          step="1"
          onChange={(e) => {
            setClicks({
              ...clicks,
              firstClick: [clicks.firstClick[0], e.target.value],
            });
          }}
          value={clicks.firstClick[1]}
        />
      </label>

      {clicks.secondClick ? (
        <>
          <label htmlFor="c2x">
            Click2 X:
            <input
              type="number"
              id="c2x"
              data-testid="c2x"
              step="1"
              onChange={(e) => {
                setClicks({
                  ...clicks,
                  secondClick: [e.target.value, clicks.secondClick[1]],
                });
              }}
              value={clicks.secondClick[0]}
            />
          </label>
          <label htmlFor="c2y">
            Click2 Y:
            <input
              type="number"
              id="c2y"
              data-testid="c2y"
              step="1"
              onChange={(e) => {
                setClicks({
                  ...clicks,
                  secondClick: [clicks.secondClick[0], e.target.value],
                });
              }}
              value={clicks.secondClick[1]}
            />
          </label>
        </>
      ) : null}

      {clicks.thirdClick ? (
        <>
          <label htmlFor="c3x">
            Click3 X:
            <input
              type="number"
              id="c3x"
              data-testid="c3x"
              step="1"
              onChange={(e) => {
                setClicks({
                  ...clicks,
                  thirdClick: [e.target.value, clicks.thirdClick[1]],
                });
              }}
              value={clicks.thirdClick[0]}
            />
          </label>
          <label htmlFor="c3y">
            Click3 Y:
            <input
              type="number"
              id="c3y"
              data-testid="c3y"
              step="1"
              onChange={(e) => {
                setClicks({
                  ...clicks,
                  thirdClick: [clicks.thirdClick[0], e.target.value],
                });
              }}
              value={clicks.thirdClick[1]}
            />
          </label>
        </>
      ) : null}

      {clicks.fourthClick ? (
        <>
          <label htmlFor="c4x">
            Click4 X:
            <input
              type="number"
              id="c4x"
              data-testid="c4x"
              step="1"
              onChange={(e) => {
                setClicks({
                  ...clicks,
                  fourthClick: [e.target.value, clicks.fourthClick[1]],
                });
              }}
              value={clicks.fourthClick[0]}
            />
          </label>
          <label htmlFor="c4y">
            Click4 Y:
            <input
              type="number"
              id="c4y"
              data-testid="c4y"
              step="1"
              onChange={(e) => {
                setClicks({
                  ...clicks,
                  fourthClick: [clicks.fourthClick[0], e.target.value],
                });
              }}
              value={clicks.fourthClick[1]}
            />
          </label>
        </>
      ) : null}
    </form>
  );
}
