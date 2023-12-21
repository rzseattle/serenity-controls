import { render, waitFor, screen } from "@testing-library/react";
import React from "react";
import { StorySimple } from "./FullGrid.stories";

test("Should render", async () => {
    render(<StorySimple {...StorySimple.args} />);
    await waitFor(() => screen.getByText("cdimelow0@instagram.com"));
});
