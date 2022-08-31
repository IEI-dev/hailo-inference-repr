import React from "react";
import Controls from "../Controls";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("testing Controls", () => {
  test("easy test", () => {
    const sum = (a, b) => {
      return a + b;
    };
    expect(sum(2, 3)).toEqual(5);
  });
});
