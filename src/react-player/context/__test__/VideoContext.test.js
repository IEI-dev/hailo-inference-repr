import { render, screen } from "@testing-library/react";
import React, { useContext } from "react";
import VideoContextProvider, { VideoContext } from "../VideoContext";
import "@testing-library/jest-dom";

describe("<VideoContextProvider/>", () => {
  const TestComponent = () => {
    const { state } = useContext(VideoContext);
    const { playing, muted, volume, playbackRate, url, key } = state;
    return (
      <div className="videoState">
        <p>playing: {playing ? "true" : "false"}</p>
        <p>muted: {muted ? "muted" : "unmuted"}</p>
        <p>volume: {volume}</p>
        <p>playbackRate: {playbackRate}</p>
        <p>url: {url}</p>
        <p>key: {key}</p>
      </div>
    );
  };
  function renderTestComponentHaveValue(text, value) {
    render(
      <VideoContextProvider>
        <TestComponent />
      </VideoContextProvider>
    );
    const target = screen.getByText(text);
    expect(target).toHaveTextContent(value);
  }
  it("playing is false", () => {
    renderTestComponentHaveValue(/playing/i, "false");
  });
  it("muted is false", () => {
    renderTestComponentHaveValue(/muted/i, "unmuted");
  });
  it("default volume is 0.1", () => {
    renderTestComponentHaveValue(/volume/i, 0.1);
  });
  it("default playbackRate is 1", () => {
    renderTestComponentHaveValue(/playbackrate/i, 1);
  });
  it("default url have retailrobery", () => {
    renderTestComponentHaveValue(/url/i, "retailrobery");
  });
  it("default key is 0", () => {
    renderTestComponentHaveValue(/key/i, 0);
  });
});
