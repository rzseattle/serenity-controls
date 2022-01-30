import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { StoryFilter, StorySimple, StorySortable, StoryTemplate } from "./GridHeadColumn.stories";
import GridHeadColumn from "./GridHeadColumn";

test("Should render", () => {
    render(<StorySimple {...StorySimple.args} />);
});

test("Should render sorted", () => {
    const onOrderChange = jest.fn();
    render(<StorySortable {...StorySortable.args} onOrderChange={onOrderChange} />);
    fireEvent.click(screen.getByTestId("grid-column"));
    expect(onOrderChange.mock.calls[0]).toEqual(["desc"]);
});

test("Should work with filter", () => {
    const onFiltersChange = jest.fn();
    render(
        <>
            <StoryFilter {...StoryFilter.args} onFiltersChange={onFiltersChange} />
            <div id="modal-root" />
        </>,
    );

    fireEvent.click(screen.getByTestId("grid-head-filter-trigger"));
    fireEvent.change(screen.getByTestId("input"), { target: { value: "test" } });

    fireEvent.click(screen.getAllByTestId("apply-filter")[0]);
    expect(onFiltersChange.mock.calls[0][0][0].value[0].value).toEqual("test");
});

test("Should render template", () => {
    render(<StoryTemplate {...StoryTemplate.args} />);
    expect(screen.getByText("field_name template text")).toBeInTheDocument();
});

test("Should react for events", () => {
    const onClick = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseDown = jest.fn();
    const onDoubleClick = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseOut = jest.fn();
    render(
        <GridHeadColumn
            column={{
                field: "test_field",
                header: {
                    events: {
                        onClick: [onClick],
                        onMouseUp: [onMouseUp],
                        onMouseDown: [onMouseDown],
                        onDoubleClick: [onDoubleClick],
                        onMouseEnter: [onMouseEnter],
                        onMouseOut: [onMouseOut],
                    },
                },
            }}
            onOrderChange={() => {
                //empty
            }}
            onFiltersChange={() => {
                //empty
            }}
            filters={[]}
            orderDir={undefined}
            isOrderable={false}
        />,
    );
    const el = screen.getByTestId("grid-column");
    fireEvent.click(el);
    fireEvent.mouseUp(el);
    fireEvent.mouseDown(el);
    fireEvent.doubleClick(el);
    fireEvent.mouseEnter(el);
    fireEvent.mouseOut(el);

    expect(Object.keys(onClick.mock.calls[0][0])).toEqual(["column", "event"]);
    expect(Object.keys(onMouseUp.mock.calls[0][0])).toEqual(["column", "event"]);

    expect(Object.keys(onMouseDown.mock.calls[0][0])).toEqual(["column", "event"]);
    expect(Object.keys(onDoubleClick.mock.calls[0][0])).toEqual(["column", "event"]);
    expect(Object.keys(onMouseEnter.mock.calls[0][0])).toEqual(["column", "event"]);
    expect(Object.keys(onMouseOut.mock.calls[0][0])).toEqual(["column", "event"]);

    //expect(screen.getByText("field_name template text")).toBeInTheDocument();
});
