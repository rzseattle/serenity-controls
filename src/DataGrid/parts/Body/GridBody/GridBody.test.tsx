import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { StoryBasic, StoryClassTemplate } from "./GridBody.stories";

test("Should render", () => {
    render(<StoryBasic {...StoryBasic.args} />);
});

test("Should render with class template", () => {
    render(<StoryClassTemplate {...StoryClassTemplate.args} />);

    expect(screen.getByText("hreye4@surveymonkey.com").parentElement).toHaveClass("red");
});
