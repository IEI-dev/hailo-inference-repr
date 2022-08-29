import React from "react";
import Points, { strToNum, limitWidthHeight } from "./Points";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterAll(cleanup);

describe("render Points to test", () => {
  const mockSetStartPoint = jest.fn();

  const mockSetEndPoint = jest.fn();

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

  test("click reset btn trigger two function", () => {
    render(
      <Points
        width={1280}
        height={720}
        startpoint={{ sx: 0, sy: 0 }}
        endpoint={{ ex: 0, ey: 0 }}
        setStartpoint={mockSetStartPoint}
        setEndpoint={mockSetEndPoint}
      />
    );
    const resetButton = screen.getByRole("button", { name: /Reset/i });
    fireEvent.click(resetButton);
    expect(mockSetStartPoint).toBeCalled();
    expect(mockSetEndPoint).toBeCalled();
  });
  // test("click reset btn to reset sx, sy, ex, ey", () => {
  //   render(
  //     <Points
  //       width={1280}
  //       height={720}
  //       startpoint={{ sx: 0, sy: 0 }}
  //       endpoint={{ ex: 0, ey: 0 }}
  //       setStartpoint={mockSetStartPoint}
  //       setEndpoint={mockSetEndPoint}
  //     />
  //   );
  //   const resetButton = screen.getByRole("button", { name: /Reset/i });
  //   const sx = screen.getByRole('')
  //   fireEvent.click(resetButton);
  //   expect(sx.value).toBe(0);
  // });
});
