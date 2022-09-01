import React from "react";
import { render, screen } from "@testing-library/react";
import Duration from "../Duration";
import "@testing-library/jest-dom";

it("render same text with / between props passed into", () => {
  render(<Duration time={20} duration={30} />);

  const currentTime = screen.getByTestId("current-time");
  const totalTime = screen.getByTestId("total-time");
  expect(currentTime).toHaveTextContent(20);
  expect(totalTime).toHaveTextContent(30);
});
