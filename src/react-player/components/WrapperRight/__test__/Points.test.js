import React from "react";
import Points, { strToNum, limitWidthHeight } from "../Points";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import CanvasContextProvider from "../../../context/CanvasContext";
import DataContextProvider from "../../../context/DataContext";
import "@testing-library/jest-dom";

afterAll(cleanup);

describe("render Points component to test", () => {
  it("find reset button", () => {
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
  it("click reset button to reset all points to zero", () => {
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
