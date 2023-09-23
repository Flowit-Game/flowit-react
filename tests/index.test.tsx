import Home from "../pages/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock('next/router', () => require('next-router-mock'));

describe("Home Screen", () => {
  it("Home screen starts with select pack", () => {
    render(<Home />);
    // This is a bit of a silly test, but it's just a proof of concept to make sure that jest works.
    expect(screen.getByTestId("Easy-pack-button")).toBeInTheDocument();
  });
});