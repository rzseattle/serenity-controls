import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { StoryAdvanced, StorySimple, StoryWithTitle } from "./GridAdvancedFilterContainer.stories";

test("Should render", () => {
    render(<StorySimple {...StorySimple.args} />);
    expect((screen.getByText("condition 1") as HTMLOptionElement).selected).toBeTruthy();
});

test("Render with title", () => {
    render(<StoryWithTitle {...StoryWithTitle.args} />);
    expect(screen.getByText(/Last name/)).toBeInTheDocument();
});

test("Render in advanced mode", () => {
    render(<StoryAdvanced {...StoryAdvanced.args} />);
    //add condition button
    expect(screen.getByTestId("add-condition-button")).toBeInTheDocument();

    //get lists with conditions select
    const lists = screen.getAllByTestId("conditions-list");
    expect(lists.length).toEqual(2);

    //different list selection
    expect((lists[0] as HTMLSelectElement).selectedIndex).toEqual(0);
    expect((lists[1] as HTMLSelectElement).selectedIndex).toEqual(1);

    //conditions operator
    expect(screen.getAllByText("and").length).toEqual(1);

    //remove value button
    expect(screen.getAllByText("-").length).toEqual(2);
});

test("Can change value", () => {
    const onValueChangeMock = jest.fn((values) => values);
    render(<StorySimple {...StorySimple.args} onValueChange={onValueChangeMock} />);
    fireEvent.change(screen.getByTestId("input"), { target: { value: "23" } });
    expect(onValueChangeMock.mock.results[0].value[0].value).toEqual("23");
});

test("Can remove condition", () => {
    const onValueChangeMock = jest.fn((values) => values);
    render(<StoryAdvanced {...StoryAdvanced.args} onValueChange={onValueChangeMock} />);

    fireEvent.click(screen.getAllByText("-")[0]);

    const lists = screen.getAllByTestId("conditions-list");
    expect(lists.length).toEqual(1);
    expect(onValueChangeMock.mock.results[0].value.length).toEqual(1);
});

test("Can add condition", () => {
    const onValueChangeMock = jest.fn((values) => values);
    render(<StoryAdvanced {...StoryAdvanced.args} onValueChange={onValueChangeMock} />);
    //add condition
    fireEvent.click(screen.getByText("+"));
    expect(onValueChangeMock.mock.results[0].value.length).toEqual(3);
    //checking if new operator is or
    expect(onValueChangeMock.mock.results[0].value[2].operator).toEqual("or");
});
