import React from "react";
import Elapsed from "../Elapsed";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

it("render same text with / between props passed into", () => {
  render(<Elapsed elapsed={20} duration={30} />);
  const elapsedTime = screen.getByText("20/30");
  expect(elapsedTime).toBeInTheDocument();
});
