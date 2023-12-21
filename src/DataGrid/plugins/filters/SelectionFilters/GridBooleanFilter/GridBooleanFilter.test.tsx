import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import { Story1, StoryFocus } from "./GridBooleanFilter.stories";
afterEach(cleanup);
test("Should render", () => {
    jest.useFakeTimers();
    render(<Story1 {...Story1.args} />);
    jest.advanceTimersByTime(20);
});
test("Should render with focus", async () => {
    jest.useFakeTimers();
    const { container } = render(<StoryFocus {...StoryFocus.args} />);
    //focusing after 20ms
    jest.advanceTimersByTime(20);
    expect(container.querySelectorAll("button")[0]).toHaveFocus();
});

test("Should could change value", async () => {
    const onValueChangeMock = jest.fn((values) => values);
    const { container } = render(<StoryFocus {...StoryFocus.args} onValueChange={onValueChangeMock} />);

    fireEvent.click(container.querySelectorAll("button")[0]);
    fireEvent.click(container.querySelectorAll("button")[1]);

    expect(onValueChangeMock.mock.results[0].value[0].value).toBeFalsy();
    expect(onValueChangeMock.mock.results[1].value[0].value).toBeTruthy();
});
