import React from "react";

import Points, { strToNum, limitWidthHeight } from "./Points";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("render Points to test", () => {
  render(
    <Points
      width={1280}
      height={720}
      startpoint={{ sx: 0, sy: 0 }}
      endpoint={{ ex: 0, ey: 0 }}
      setStartpoint={() => {}}
      setEndpoint={() => {}}
    />
  );
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
});
