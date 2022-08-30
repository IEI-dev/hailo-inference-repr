import React from "react";
import FrameFps from "./FrameFps";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

it("render same text with frames and fps props", () => {
  render(<FrameFps frame={0} fps={29} />);
  const frameSpan = screen.getByText("1frames");
  const fpsSpan = screen.getByText("29fps");

  expect(frameSpan).toBeInTheDocument();
  expect(fpsSpan).toBeInTheDocument();
});
