import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { Story1, StoryFocus } from "./GridNumericFilter.stories";
import "@testing-library/jest-dom/extend-expect";


afterEach(cleanup);
test("Should render", () => {
    jest.useFakeTimers();
    render(<Story1 {...Story1.args} />);
    jest.advanceTimersByTime(20);
    expect( screen.getByTestId("input")).not.toHaveFocus();
});
test("Should render with focus",  () => {
    jest.useFakeTimers();
    render(<StoryFocus {...StoryFocus.args} />);
    //focusing after 20ms
    jest.advanceTimersByTime(20);
    expect( screen.getByTestId("input")).toHaveFocus();
});
test("Modal with calendar should be opened after click",  () => {
    jest.useFakeTimers();
    render(<StoryFocus {...StoryFocus.args} />);
    //focusing after 20ms
    jest.advanceTimersByTime(20);
    expect( screen.getByTestId("input")).toHaveFocus();
});
