import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { StoryBase } from "./GridDateFilter.stories";

afterEach(cleanup);
test("Should render", () => {
    render(<StoryBase {...StoryBase.StoryBase} />);
    expect(screen.getByTestId("input")).not.toHaveFocus();
});

test("Should render", () => {
    render(<StoryBase {...StoryBase.StoryBase} />);
    expect(screen.getByTestId("input")).not.toHaveFocus();
});

test("Modal with calendar should be opened after click", () => {
    render(
        <>
            <StoryBase {...StoryBase.args} />
            <div id="modal-root"></div>
        </>,
    );
    fireEvent.click(screen.getByTestId("input"));
    expect(screen.getByTestId("ok-button")).toBeVisible();
});
