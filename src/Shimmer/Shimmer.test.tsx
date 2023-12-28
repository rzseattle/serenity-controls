import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { composeStory } from "@storybook/react";

import Meta, { Base as BaseStory } from "./Shimmer.stories";

const Shimmer = composeStory(BaseStory, Meta);

test("Should render", () => {
    render(
        <div data-testid={"shimmer"}>
            <Shimmer />
        </div>,
    );
    expect(screen.getByTestId("shimmer").firstChild).toBeInTheDocument();
    expect((screen.getByTestId("shimmer").firstChild as HTMLDivElement).style.width).toEqual("200px");
    expect((screen.getByTestId("shimmer").firstChild as HTMLDivElement).style.height).toEqual("200px");
});
