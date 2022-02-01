import { render, waitFor, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { StorySimple } from "./FullGrid.stories";

test("Should render", () => {
    render(<StorySimple {...StorySimple.args} />);
    waitFor(() => screen.getByText("cdimelow0@instagram.com"));
});
