import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { StorySimple } from "./GridHead.stories";
import GridHead from "./GridHead";
import { IGridColumn } from "../../../interfaces/IGridColumn";
import GridRoot from "../../../config/GridRoot";

test("Should render", () => {
    render(<StorySimple {...StorySimple.args} />);
});

test("Should pass order change", () => {
    const onOrderChange = jest.fn((values) => values);
    render(
        <GridRoot>
            <GridHead
                columns={[{ field: "xxx" }] as IGridColumn<any>[]}
                filters={[]}
                order={[{ field: "xxx" }]}
                onFiltersChange={() => {
                    1 == 1;
                }}
                onOrderChange={onOrderChange}
            />
            ,
        </GridRoot>,
    );
    fireEvent.click(screen.getAllByTestId("grid-column")[0]);
    expect(onOrderChange.mock.results[0].value[0].dir).toEqual("asc");
});

test("Should pass filter change", () => {
    const onFiltersChange = jest.fn((values) => values);
    render(
        <GridRoot>
            <GridHead
                columns={[{ field: "xxx" }] as IGridColumn<any>[]}
                filters={[{ field: "xxx", value: [], filterType: "text" }]}
                order={[{ field: "xxx" }]}
                onOrderChange={() => {
                    1 == 1;
                }}
                onFiltersChange={onFiltersChange}
            />
            <div id="modal-root" />
        </GridRoot>,
    );

    fireEvent.click(screen.getAllByTestId("grid-head-filter-trigger")[0]);
    fireEvent.change(screen.getAllByTestId("input")[0], { target: { value: "test" } });

    fireEvent.click(screen.getAllByTestId("apply-filter")[0]);

    expect(onFiltersChange.mock.results[0].value[0].value[0].value).toEqual("test");
});
