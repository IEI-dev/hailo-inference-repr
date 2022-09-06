import React, { useContext } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CanvasContext } from "../CanvasContext";
import CanvasContextProvider from "../CanvasContext";
import DataContextProvider from "../DataContext";
import "@testing-library/jest-dom";

describe("<CanvasContextProvider />", () => {
  const TestComponent = () => {
    const {
      boxCheck,
      idCheck,
      lineCheck,
      edgeCheck,
      setBoxCheck,
      setIdCheck,
      setLineCheck,
      setEdgeCheck,
    } = useContext(CanvasContext);
    return (
      <div className="buttons">
        <button
          onClick={() => {
            setBoxCheck(!boxCheck);
          }}
        >
          box: {boxCheck ? "true" : "false"}
        </button>
        <button
          onClick={() => {
            setIdCheck(!idCheck);
          }}
        >
          id: {idCheck ? "true" : "false"}
        </button>
        <button
          onClick={() => {
            setLineCheck(!lineCheck);
          }}
        >
          line: {lineCheck ? "true" : "false"}
        </button>
        <button
          onClick={() => {
            setEdgeCheck(!edgeCheck);
          }}
        >
          edge: {edgeCheck ? "true" : "false"}
        </button>
      </div>
    );
  };
  describe("render TestComponent and click buttons", () => {
    function renderTestComponent() {
      render(
        <DataContextProvider>
          <CanvasContextProvider>
            <TestComponent />
          </CanvasContextProvider>
        </DataContextProvider>
      );
    }

    it("click box button, from false to true", () => {
      renderTestComponent();
      const boxButton = screen.getByRole("button", { name: /box/i });
      expect(boxButton).toHaveTextContent("false");
      fireEvent.click(boxButton);
      expect(boxButton).toHaveTextContent("true");
    });
    it("click id button, from false to true", () => {
      renderTestComponent();
      const idButton = screen.getByRole("button", { name: /id/i });
      expect(idButton).toHaveTextContent("false");
      fireEvent.click(idButton);
      expect(idButton).toHaveTextContent("true");
    });
    it("click line button, from true to false", () => {
      renderTestComponent();
      const lineButton = screen.getByRole("button", { name: /line/i });
      expect(lineButton).toHaveTextContent("true");
      fireEvent.click(lineButton);
      expect(lineButton).toHaveTextContent("false");
    });
    it("click edge button, from false to true", () => {
      renderTestComponent();
      const edgeButton = screen.getByRole("button", { name: /edge/i });
      expect(edgeButton).toHaveTextContent("false");
      fireEvent.click(edgeButton);
      expect(edgeButton).toHaveTextContent("true");
    });
  });
});
