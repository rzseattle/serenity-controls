import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { StoryBasic } from "./GridConditionsPresenter.stories";
import { IGridOrder } from "../../../interfaces/IGridOrder";
import { IGridFilter } from "../../../interfaces/IGridFilter";
import { IOrder } from "../../../../Table/Interfaces";

test("Should render with proper labels", () => {
    render(
        <>
            <StoryBasic {...StoryBasic.args} />
            <div id="modal-root" data-testid="modalRoot"></div>
        </>,
    );
    expect(screen.getByText("Sort field")).toBeInTheDocument();
    expect(screen.getByText("other_sort_field")).toBeInTheDocument();
    expect(screen.getByText("Age caption")).toBeInTheDocument();
    expect(screen.getByText("some_multi_field")).toBeInTheDocument();
    expect(screen.getByText("is equal")).toBeInTheDocument();
    expect(screen.getByText("=")).toBeInTheDocument();
});

test("Should change order", () => {
    const onOrderChange = jest.fn();
    render(<StoryBasic {...StoryBasic.args} onOrderChange={onOrderChange} />);
    fireEvent.click(screen.getByText("Sort field"));
    expect(onOrderChange.mock.calls[0][0][0].dir).toBe("desc");
});
test("Should delete order element", () => {
    const onOrderChange = jest.fn();
    render(<StoryBasic {...StoryBasic.args} onOrderChange={onOrderChange} />);
    fireEvent.click(screen.getAllByTestId("delete-order")[0]);
    expect(onOrderChange.mock.calls[0][0].filter((el: IGridOrder) => el.dir).length).toBe(1);
});

test("Should change filter", () => {
    const onFiltersChange = jest.fn();
    render(
        <>
            <StoryBasic {...StoryBasic.args} onFiltersChange={onFiltersChange} />
            <div id="modal-root" data-testid="modalRoot"></div>
        </>,
    );

    fireEvent.click(screen.getByText("Age caption"));
    fireEvent.change(screen.getAllByTestId("input")[0], { target: { value: 9999 } });

    fireEvent.click(screen.getByTestId("apply-filter"));
    expect(onFiltersChange.mock.calls[0][0].filter((el: IGridFilter) => el.field === "age")[0].value[0].value).toBe(
        "9999",
    );
});
test("Should delete filter 1", () => {
    const onFiltersChange = jest.fn();
    render(<StoryBasic {...StoryBasic.args} onFiltersChange={onFiltersChange} />);

    fireEvent.click(screen.getAllByTestId("delete-filter")[0]);
    expect(onFiltersChange.mock.calls[0][0].filter((el: IGridFilter) => el.field === "age")[0].value.length).toBe(0);

});

test("Should remove all conditions", () => {
    const onFiltersChange = jest.fn();
    const onOrderChange = jest.fn();
    render(<StoryBasic {...StoryBasic.args} onFiltersChange={onFiltersChange} onOrderChange={onOrderChange} />);
    fireEvent.click(screen.getByTestId("delete-all-conditions"));

    expect(
        onFiltersChange.mock.calls[0][0].reduce((p: number, c: IGridFilter) => {
            return p + c.value.length;
        }, 0),
    ).toBe(0);

    expect(
        onOrderChange.mock.calls[0][0].reduce((p: number, c: IOrder) => {
            return p + c.dir ? 1 : 0;
        }, 0),
    ).toBe(0);
});
