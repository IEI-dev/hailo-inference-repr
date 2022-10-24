import React from "react";
import { strToNum, limitWidthHeight } from "../Line";
// import { render, screen, cleanup, fireEvent } from "@testing-library/react";
// import CanvasContextProvider from "../../../context/CanvasContext";
// import DataContextProvider from "../../../context/DataContext";
import "@testing-library/jest-dom";

describe("render Line component to test", () => {
  it("function: convert string to number", () => {
    expect(strToNum("3")).toEqual(3);
    expect(strToNum(3.14157)).toEqual(3);
    expect(strToNum("Steven")).toEqual(NaN);
  });

  it("function: limit value exceeds width height to maximum, and up to zero when num is negative", () => {
    expect(limitWidthHeight(3, 10)).toEqual(3);
    expect(limitWidthHeight(-1, 10)).toEqual(0);
    expect(limitWidthHeight(15, 10)).toEqual(10);
  });
});
