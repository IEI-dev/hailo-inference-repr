import React from "react";
import Controls from "./Controls";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("testing Controls", () => {
  // const mockRef = {
  //   current: {
  //     classList: {
  //       add: jest.fn(),
  //       remove: jest.fn(),
  //     },
  //     dataset: {
  //       volumeLevel: jest.mock,
  //     },
  //   },
  // };
  // console.log(mockRef.current.dataset.volumeLevel);
  // const mockVideo = {
  //   addEventListener: jest.fn(),
  //   removeEventListener: jest.fn(),
  // };
  // render(<Controls playerContainerRef={mockRef} video={mockVideo} />);

  test("easy test", () => {
    screen.debug();
    fireEvent.click(screen.getByText("keyboard_double_arrow_up"));
    expect(screen.queryByTestId("video-controls")).toBeInTheDocument();
    const sum = (a, b) => {
      return a + b;
    };
    expect(sum(2, 3)).toEqual(5);
  });
});
