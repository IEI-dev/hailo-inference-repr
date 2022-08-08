import React from "react";

import Points, { strToNum, limitWidth, limitHeight } from "./Points";
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
});
