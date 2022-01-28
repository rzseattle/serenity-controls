import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { StoryAdvanced, StoryEmpty, StoryMultipleFilters, StorySimple } from "./GridFilterPanel.stories";
import userEvent from "@testing-library/user-event";

test("Should render empty", () => {
    render(<StoryEmpty {...StoryEmpty.args} />);
    expect(screen.getByText("No filters")).toBeInTheDocument();
});

test("Should render and change one filter on enter key", () => {
    const onFiltersChange = jest.fn();
    render(<StorySimple {...StorySimple.args} onFiltersChange={onFiltersChange} />);

    fireEvent.change(screen.getByTestId("input"), { target: { value: "test" } });
    userEvent.type(screen.getByTestId("input"), "{enter}");

    //fireEvent.click(screen.getByTestId("apply-filter"));
    expect(onFiltersChange.mock.calls[0][0][0].value[0].value).toBe("test");
});

test("Should render and change one filter", () => {
    const onFiltersChange = jest.fn();
    render(<StorySimple {...StorySimple.args} onFiltersChange={onFiltersChange} />);

    fireEvent.change(screen.getByTestId("input"), { target: { value: "test" } });

    fireEvent.click(screen.getByTestId("apply-filter"));
    expect(onFiltersChange.mock.calls[0][0][0].value[0].value).toBe("test");
});
test("Should be able to use advanced mode", () => {
    const onFiltersChange = jest.fn();
    render(<StoryAdvanced {...StoryAdvanced.args} onFiltersChange={onFiltersChange} />);

    fireEvent.click(screen.getByTestId("switch-to-advanced"));

    expect(screen.getByTestId("add-condition-button")).toBeInTheDocument();
});
test("Should render and change many filters", () => {
    const onFiltersChange = jest.fn();
    render(<StoryMultipleFilters {...StoryMultipleFilters.args} onFiltersChange={onFiltersChange} />);
    fireEvent.change(screen.getAllByTestId("input")[0], { target: { value: "test" } });
    fireEvent.click(screen.getByTestId("apply-filter"));
    expect(onFiltersChange.mock.calls[0][0][0].value.length).toBe(3);
});
