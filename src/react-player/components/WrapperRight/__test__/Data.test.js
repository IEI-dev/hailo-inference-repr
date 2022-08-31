import React from "react";
import Data from "../Data";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataContextProvider from "../../../context/DataContext";
import userEvent from "@testing-library/user-event";

const MockData = () => {
  const mockHandleUrl = jest.fn();
  const mockSeekToStart = jest.fn();
  return (
    <DataContextProvider>
      <Data handleUrl={mockHandleUrl} seekToStart={mockSeekToStart} />
    </DataContextProvider>
  );
};

describe("test Data.js component", () => {
  it("should render Data.js with a h5 title: retailrobery", () => {
    render(<MockData />);
    const videoTitle = screen.getByRole("heading", { level: 5 });
    expect(videoTitle).toHaveTextContent("retailrobery");
  });

  it("should show retailrobery as selected and contain 4 options", () => {
    render(<MockData />);
    const videoSelect = screen.getByRole("combobox", { name: /choose video/i });
    expect(videoSelect.value).toBe("retailrobery");
    const videos = screen.getAllByRole("option");
    expect(videos.length).toBe(4);
  });

  it("should change text as selected option changed and trigger two function", () => {
    const mockHandleUrl = jest.fn();
    const mockSeekToStart = jest.fn();
    render(
      <DataContextProvider>
        <Data handleUrl={mockHandleUrl} seekToStart={mockSeekToStart} />
      </DataContextProvider>
    );
    const videoSelect = screen.getByRole("combobox", { name: /choose video/i });
    userEvent.selectOptions(videoSelect, "pwalk1");
    const pwalk1 = screen.getByRole("option", { name: "pwalk1" });
    expect(pwalk1.selected).toBe(true);
    expect(mockHandleUrl).toBeCalled();
    expect(mockSeekToStart).toBeCalled();
  });
});
