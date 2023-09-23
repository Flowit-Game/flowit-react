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
  it("Broken test", () => {
    render(<Home />);
    // Intentionally broken test. To make sure that failed tests actually fail the PR.
    // It wouldn't be the first time I've seen pipelines that "ran successfully"
    // only to find in the output, everything failed. But for various reasons the
    // final exit code is 0, so it shows success.
    expect(screen.getByTestId("Intentionally broken test")).toBeInTheDocument();
  });
});