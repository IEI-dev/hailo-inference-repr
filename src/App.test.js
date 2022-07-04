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

test("easy test", () => {
  const sum = (a, b) => {
    return a + b;
  };
  expect(sum(2, 3)).toEqual(5);
});
