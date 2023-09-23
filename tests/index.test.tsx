import Home from "../pages/index";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock('next/router', () => require('next-router-mock'));

describe("Home Screen", () => {
  it("Home screen starts with select pack", () => {
    render(<Home />);
    // Proof of concept to make sure that jest works.
    expect(screen.getByTestId("Easy-pack-button")).toBeInTheDocument();
  });
});