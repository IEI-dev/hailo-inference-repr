import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DataContext } from "../DataContext";
import DataContextProvider from "../DataContext";

describe("<DataContextProvider />", () => {
  const TestComponent = () => {
    const { data, setData } = useContext(DataContext);
    const {
      ids,
      boxes,
      attrs,
      width,
      height,
      allLength,
      idAll,
      fps,
      entrance,
      keys,
      action,
      length,
      frame_count,
      entrance_line,
      basicIndex,
    } = data;
    return (
      <div className="data">
        first frame data, action for the last frame data:
        <p>ids' length: {ids[0].length}</p>
        <p>boxes' length: {boxes[0].length}</p>
        <p>attrs' length: {attrs[0].length}</p>
        <p>width: {width}</p>
        <p>height: {height}</p>
        <p>allLength: {allLength}</p>
        <p>idAll: {idAll}</p>
        <p>fps: {fps}</p>
        <p>entrance in: {entrance[0].in.length}</p>
        <p>entrance out: {entrance[0].out.length}</p>
        <p>entrance all: {entrance[0].all.length}</p>
        <p>keys: {keys[0].length}</p>
        <p>lastFrame_action: {Object.keys(action[899]).length}</p>
        <p>frameData_length: {length}</p>
        <p>frame_count: {frame_count}</p>
        <p>entrance_line: {entrance_line.length}</p>
        <p>basicIndex: {basicIndex}</p>
      </div>
    );
  };
  describe("render TestComponent and check text", () => {
    function renderTestComponentTestCount(text, count) {
      render(
        <DataContextProvider>
          <TestComponent />
        </DataContextProvider>
      );
      const target = screen.getByText(text);
      expect(target).toHaveTextContent(count);
    }

    it("ids' length equals to 5", () => {
      renderTestComponentTestCount(/ids/i, 5);
    });
    it("boxes' length equals to 5", () => {
      renderTestComponentTestCount(/boxes/i, 5);
    });
    it("attrs length equals to 5", () => {
      renderTestComponentTestCount(/attrs/i, 5);
    });
    it("width equals to 1280", () => {
      renderTestComponentTestCount(/width/i, 1280);
    });
    it("height equals to 720", () => {
      renderTestComponentTestCount(/height/i, 720);
    });
    it("allLength means all counts occured in the video, equals to 32", () => {
      renderTestComponentTestCount(/allLength/i, 32);
    });

    it("idAll for the select's max id, equals to 34", () => {
      renderTestComponentTestCount(/idAll/i, 34);
    });
    it("fps equals to 25", () => {
      renderTestComponentTestCount(/fps/i, 25);
    });
    it("entrance in equals to 12", () => {
      renderTestComponentTestCount(/entrance in/i, 12);
    });
    it("entrance out equals to 10", () => {
      renderTestComponentTestCount(/entrance out/i, 10);
    });
    it("entrance all equals to 5", () => {
      renderTestComponentTestCount(/entrance all/i, 5);
    });
    it("keys equals to 5", () => {
      renderTestComponentTestCount(/keys/i, 5);
    });
    it("lastFrame_action equals to 27", () => {
      renderTestComponentTestCount(/lastframe_action/i, 27);
    });
    it("frameData_length means frame data counts, equals to 1188", () => {
      renderTestComponentTestCount(/framedata_length/i, 1188);
    });
    it("frame_count means video frames, equals to 1195", () => {
      renderTestComponentTestCount(/frame_count/i, 1195);
    });
    it("width equals to 1280", () => {
      renderTestComponentTestCount(/width/i, 1280);
    });
    it("entrance_line length equals to 4", () => {
      renderTestComponentTestCount(/entrance_line/i, 4);
    });
    it("basicIndex equals to -1", () => {
      renderTestComponentTestCount(/basicIndex/i, -1);
    });
  });
});
