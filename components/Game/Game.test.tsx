import {Game} from "./Game";
import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import React from "react";
import {LevelContext, levelProgressDefault} from "@/pages";
import userEvent from '@testing-library/user-event'


jest.mock('next/router', () => require('next-router-mock'));

describe("First Level", () => {
  it("Solve the second level", async () => {
    // The solution to easy level 2 is probably not too much of a spoiler,
    // and it's a good initial test to check that we can click buttons
    // solve a level.

    // TODO https://github.com/jsdom/jsdom/issues/3363
    global.structuredClone = jest.fn(val => {
      return JSON.parse(JSON.stringify(val));
    });

    const user = userEvent.setup()
    render(
      <LevelContext.Provider value={{
        levelNumber: 1,
        changeLevelNumber: () => {},
        changeCurrentScreen: () => {},
        levelProgress: levelProgressDefault,
        changeLevelProgress: () => {},
        pack: "Easy",
        changePack: () => {},
      }}>
        <Game/>
      </LevelContext.Provider>
    )
    expect(screen.getByTestId("square-0-0")).toBeInTheDocument()
    await user.click(screen.getByTestId("square-4-0"));
    await user.click(screen.getByTestId("square-2-2"))
    expect(screen.getByTestId("message-modal")).toBeInTheDocument()
  });
});