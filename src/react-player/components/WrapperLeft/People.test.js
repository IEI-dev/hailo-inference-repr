import React from "react";
import People from "./People";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataContextProvider from "../../context/DataContext";
import userEvent from "@testing-library/user-event";

describe("test People.js component", () => {
  it("render with frame set to 0", () => {
    render(
      <DataContextProvider>
        <People frame={0} />
      </DataContextProvider>
    );
  });

  it("Options length same as idAll's length, first frame attrs' length is 5", () => {
    render(
      <DataContextProvider>
        <People frame={0} />
      </DataContextProvider>
    );
    const options = screen.getAllByRole("option");
    const firstFrameAttrs = screen.getAllByTestId("all_attrs");
    expect(options.length).toEqual(35);
    expect(firstFrameAttrs.length).toEqual(5);
  });

  it("select id 1", () => {
    render(
      <DataContextProvider>
        <People frame={0} />
      </DataContextProvider>
    );
    const select = screen.getByRole("combobox", { name: /choose an id:/i });
    userEvent.selectOptions(select, "1");
    const gender = screen.getByText(/gender/i);
    const age = screen.getByText(/age/i);
    const objects = screen.getByText(/objects/i);
    const upper = screen.getByText(/upper/i);
    const lower = screen.getByText(/lower/i);
    expect(gender).toBeInTheDocument();
    expect(age).toBeInTheDocument();
    expect(objects).toBeInTheDocument();
    expect(upper).toBeInTheDocument();
    expect(lower).toBeInTheDocument();
  });

  it("render with frame set to -1", () => {
    render(
      <DataContextProvider>
        <People frame={-1} />
      </DataContextProvider>
    );
    screen.debug();
    const pElement = screen.getByText(/nothing here/i);
    const h5Element = screen.getByRole("heading");
    expect(h5Element).toHaveTextContent("People Attributes");
    expect(pElement).toBeInTheDocument();
  });
});
