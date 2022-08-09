// import React from "react";
// import { cleanup, fireEvent, render } from "@testing-library/react";
// import App from "./App";

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
// afterEach(cleanup);

// it("Check playpause button changes the text after click", () => {
//   const { queryByLabelText, getByLabelText } = render(<App />);
//   expect(queryByLabelText(/play/)).toBeTruthy();

//   fireEvent.click(getByLabelText(/play/));

//   expect(queryByLabelText(/pause/)).toBeTruthy();
// });

import React from "react";
import App from "./App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// jest.mock("./react-player/PlayerControls", () => () => {
//   return <mock-PlayerControls data-testid="playercontrols" />;
// });
// jest.mock("./react-player/Elapsed", () => () => {
//   return <mock-Elapsed data-testid="elapsed" />;
// });
// jest.mock("./react-player/Canvas", () => () => {
//   return <mock-Canvas data-testid="canvas" />;
// });
// jest.mock("./react-player/CanvasLine", () => () => {
//   return <mock-CanvasLine data-testid="canvasline" />;
// });
// jest.mock("./react-player/Data", () => () => {
//   return <mock-Data data-testid="data" />;
// });
// jest.mock("./react-player/Controls", () => () => {
//   return <mock-Controls data-testid="controls" />;
// });
// jest.mock("./react-player/Points", () => () => {
//   return <mock-Points data-testid="points" />;
// });
// jest.mock("./react-player/People", () => () => {
//   return <mock-People data-testid="people" />;
// });

// describe("testing Controls", () => {
//   render(<App basicFps={29.97} />);
// });

test("easy test", () => {
  const sum = (a, b) => {
    return a + b;
  };
  expect(sum(2, 3)).toEqual(5);
});
