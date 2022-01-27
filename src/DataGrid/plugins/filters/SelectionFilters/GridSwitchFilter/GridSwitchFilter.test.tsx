import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { StoryColumns, StoryFocus, StoryMultipleChoice, StorySelected, StorySimple } from "./GridSwitchFilter.stories";

afterEach(cleanup);
test("Should render", () => {
    render(<StorySimple {...StorySimple.args} />);
});

test("Should render with focus", () => {
    jest.useFakeTimers();
    render(<StoryFocus {...StoryFocus.args} />);
    //focusing after 20ms
    jest.advanceTimersByTime(25);

    expect(screen.getByTestId("button-container").firstElementChild).toHaveFocus();
});

test("Should render with 3 columns", () => {
    render(<StoryColumns {...StoryColumns.args} />);
    expect(screen.getByTestId("button-container")).toHaveStyle({ "grid-template-columns": "1fr 1fr 1fr" });
});

test("Should be selected", () => {
    render(<StorySelected {...StorySelected.args} />);
    expect(screen.getByTestId("button-container").querySelectorAll('button[class]:not([class=""])').length).toBe(1);
});
test("Should be multi selected", () => {
    render(<StoryMultipleChoice {...StoryMultipleChoice.args} />);
    expect(screen.getByTestId("button-container").querySelectorAll('button[class]:not([class=""])').length).toBe(3);
});
