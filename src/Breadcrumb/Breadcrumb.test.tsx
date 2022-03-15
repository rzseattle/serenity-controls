import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { StoryBasic } from "./Breadcrumb.stories";

test("Should render", () => {
    render(<StoryBasic />);
    expect(screen.queryByText("Home")).toBeInTheDocument();
});
