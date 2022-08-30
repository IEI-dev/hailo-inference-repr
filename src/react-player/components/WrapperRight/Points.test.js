import React from "react";
import Points, { strToNum, limitWidthHeight } from "./Points";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import CanvasContextProvider from "../../context/CanvasContext";
import DataContextProvider from "../../context/DataContext";
import "@testing-library/jest-dom/extend-expect";

afterAll(cleanup);

describe("render Points to test", () => {
  test("convert string to number", () => {
    expect(strToNum("3")).toEqual(3);
    expect(strToNum(3.14157)).toEqual(3);
    expect(strToNum("Steven")).toEqual(NaN);
  });

  test("limit value exceeds width height to maximum, and up to zero when num is negative", () => {
    expect(limitWidthHeight(3, 10)).toEqual(3);
    expect(limitWidthHeight(-1, 10)).toEqual(0);
    expect(limitWidthHeight(15, 10)).toEqual(10);
  });

  test("find reset button", () => {
    render(
      <DataContextProvider>
        <CanvasContextProvider>
          <Points width={1280} height={720} />
        </CanvasContextProvider>
      </DataContextProvider>
    );
    const resetButton = screen.getByRole("button", { name: /Reset/i });
    expect(resetButton).toBeInTheDocument();
  });
  test("click reset button to reset all points to zero", () => {
    render(
      <DataContextProvider>
        <CanvasContextProvider>
          <Points width={1280} height={720} />
        </CanvasContextProvider>
      </DataContextProvider>
    );
    const resetButton = screen.getByRole("button", { name: /Reset/i });
    const sx = screen.getByTestId("sx");
    const sy = screen.getByTestId("sy");
    const ex = screen.getByTestId("ex");
    const ey = screen.getByTestId("ey");
    // expect(screen.getByRole('input', { name: 'the-inputs-id' }).value).toBe('test');
    fireEvent.click(resetButton);
    expect(sx.value).toEqual("0");
    expect(sy.value).toEqual("0");
    expect(ex.value).toEqual("0");
    expect(ey.value).toEqual("0");
  });
});
