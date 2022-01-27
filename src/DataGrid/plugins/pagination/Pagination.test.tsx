import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { StorySimple } from "./Pagination.stories";

test("Should render", () => {
    render(<StorySimple {...StorySimple.args} />);
});

test("Should run set current page", () => {
    const setCurrentPage = jest.fn((values) => values);
    render(<StorySimple {...StorySimple.args} setCurrentPage={setCurrentPage} />);
    fireEvent.click(screen.getByTestId("next-page"));
    expect(setCurrentPage.mock.results[0].value).toEqual(3);
});
test("Should run set last page", () => {
    const setCurrentPage = jest.fn((values) => values);
    render(<StorySimple {...StorySimple.args} setCurrentPage={setCurrentPage} />);
    fireEvent.click(screen.getByTestId("last-page"));
    expect(setCurrentPage.mock.results[0].value).toEqual(40);
});
test("Should run set prev page", () => {
    const setCurrentPage = jest.fn((values) => values);
    render(<StorySimple {...StorySimple.args} setCurrentPage={setCurrentPage} />);
    fireEvent.click(screen.getByTestId("prev-page"));
    expect(setCurrentPage.mock.results[0].value).toEqual(1);
});
test("Should run set first page", () => {
    const setCurrentPage = jest.fn((values) => values);
    render(<StorySimple {...StorySimple.args} setCurrentPage={setCurrentPage} />);
    fireEvent.click(screen.getByTestId("first-page"));
    expect(setCurrentPage.mock.results[0].value).toEqual(1);
});

test("Should change on page", () => {
    const setCurrentPage = jest.fn((values) => values);
    const setOnPage = jest.fn((values) => values);
    render(<StorySimple {...StorySimple.args} setOnPage={setOnPage} setCurrentPage={setCurrentPage} />);
    fireEvent.change(screen.getByTestId("change-on-page"), { target: { value: 50 } });
    expect(setOnPage.mock.results[0].value).toEqual(50);
    expect(setCurrentPage.mock.results[0].value).toEqual(1);
});
