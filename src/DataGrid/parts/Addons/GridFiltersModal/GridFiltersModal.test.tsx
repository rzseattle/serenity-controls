import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { StoryBasic } from "./GridFilterModal.stories";

test("Should render on proper position", () => {
    render(
        <>
            <StoryBasic {...StoryBasic.args} />
            <div id="modal-root" data-testid="modalRoot"></div>
        </>,
    );
    expect(screen.getByTestId("apply-filter")).toBeInTheDocument();
});

test("Should hide on cancel", () => {
    const onHide = jest.fn();
    const onFiltersChange = jest.fn();
    render(
        <>
            <StoryBasic {...StoryBasic.args} onHide={onHide} onFiltersChange={onFiltersChange} />
            <div id="modal-root" data-testid="modalRoot"></div>
        </>,
    );
    fireEvent.click(screen.getByTestId("cancel-filter"));
    expect(onHide.mock.calls.length).toBe(1);
    expect(onFiltersChange.mock.calls.length).toBe(0);
});

test("Should hide on apply", () => {
    const onHide = jest.fn();
    const onFiltersChange = jest.fn();
    render(
        <>
            <StoryBasic {...StoryBasic.args} onHide={onHide} onFiltersChange={onFiltersChange} />
            <div id="modal-root" data-testid="modalRoot"></div>
        </>,
    );
    fireEvent.click(screen.getByTestId("apply-filter"));
    expect(onHide.mock.calls.length).toBe(1);
    expect(onFiltersChange.mock.calls.length).toBe(1);
    expect(onFiltersChange.mock.calls[0][0][0].field).toBe("age");
});
