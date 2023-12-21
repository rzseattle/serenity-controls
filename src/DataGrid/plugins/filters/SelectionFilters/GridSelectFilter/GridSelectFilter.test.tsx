import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { StoryFocus, StorySelected, StorySimple } from "./GridSelectFilter.stories";

afterEach(cleanup);
test("Should render", async () => {
    render(<StorySimple {...StorySimple.args} />);
    expect(((await screen.findByTestId("select")) as HTMLSelectElement).selectedIndex).toBe(0);
});

test("Should render with focus", async () => {
    jest.useFakeTimers();
    render(<StoryFocus {...StoryFocus.args} />);
    //focusing after 20ms
    jest.advanceTimersByTime(25);

    expect(await screen.findByTestId("select")).toHaveFocus();
});

test("Should be selected", async () => {
    render(<StorySelected {...StorySelected.args} />);
    expect(((await screen.findByTestId("select")) as HTMLSelectElement).selectedIndex).toBe(6);
});
