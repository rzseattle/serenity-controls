import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { composeStory } from "@storybook/react";

import Meta, { Base as BaseStory } from "./ShimmerList.stories";

const ShimmerList = composeStory(BaseStory, Meta);

test("Should render", () => {
    render(
        <div data-testid={"shimmer"}>
            <ShimmerList items={6} />
        </div>,
    );

    expect((screen.getByTestId("shimmer").firstChild as HTMLDivElement).children.length).toEqual(6);
});

test("Should render column", () => {
    render(
        <div data-testid={"shimmer"}>
            <ShimmerList items={6} columns={3} />
        </div>,
    );
    expect((screen.getByTestId("shimmer").firstChild as HTMLDivElement).style.display).toEqual("grid");
    expect((screen.getByTestId("shimmer").firstChild as HTMLDivElement).style.gridTemplateColumns).toEqual(
        `repeat(3,1fr)`,
    );
});
