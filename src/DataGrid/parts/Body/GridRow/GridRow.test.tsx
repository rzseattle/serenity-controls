import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
    StoryBasic,
    StoryCellCassTemplate,
    StoryCellCassTemplateByColumn,
    StoryCellStyleTemplate, StoryCellStyleTemplateByColumn, StoryCellTemplate,
} from "./GridRow.stories";
import GridRow from "./GridRow";

test("Should render", () => {
    render(<StoryBasic {...StoryBasic.args} />);
});

test("Should render with class template", () => {
    render(<StoryCellCassTemplate {...StoryCellCassTemplate.args} />);
    expect(screen.getByText("1")).toHaveClass("important");
});

test("Should render with cell template", () => {
    render(<StoryCellTemplate {...StoryCellTemplate.args} />);
    expect(screen.getByText("x 1 x")).toBeInTheDocument();
});

test("Should render with style template", () => {
    render(<StoryCellStyleTemplate {...StoryCellStyleTemplate.args} />);
    expect(screen.getByText("1")).toHaveStyle({ backgroundColor: "red" });
});

test("Should render with class template added by column", () => {
    render(<StoryCellCassTemplateByColumn {...StoryCellCassTemplateByColumn.args} />);
    expect(screen.getByText("1")).toHaveClass("important");
})

test("Should render with style template added by column", () => {
    render(<StoryCellStyleTemplateByColumn {...StoryCellStyleTemplateByColumn.args} />);
    expect(screen.getByText("1")).toHaveStyle({ backgroundColor: "red" });
})

test("Should react for events", () => {


    const onClick = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseDown = jest.fn();
    const onDoubleClick = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseOut = jest.fn();

    const onDragStart = jest.fn();
    const onDrag = jest.fn();
    const onDrop = jest.fn();
    const onDragOver = jest.fn();
    const onDragEnter = jest.fn();
    const onDragLeave = jest.fn();
    render(
        <GridRow
            rowProperties={{}}
            rowNumber={0}
            row={{ test_field: "test_value" }}
            columns={[
                {
                    field: "test_field",
                    cell: {
                        events: {
                            onClick: [onClick],
                            onMouseUp: [onMouseUp],
                            onMouseDown: [onMouseDown],
                            onDoubleClick: [onDoubleClick],
                            onMouseEnter: [onMouseEnter],
                            onMouseOut: [onMouseOut],
                            onDragStart: [onDragStart],
                            onDrag: [onDrag],
                            onDrop: [onDrop],
                            onDragOver: [onDragOver],
                            onDragEnter: [onDragEnter],
                            onDragLeave: [onDragLeave],
                        },
                    },
                },
            ]}
        />,
    );
    const el = screen.getByText("test_value");
    fireEvent.click(el);
    fireEvent.mouseUp(el);
    fireEvent.mouseDown(el);
    fireEvent.doubleClick(el);
    fireEvent.mouseEnter(el);
    fireEvent.mouseOut(el);
    fireEvent.dragStart(el);
    fireEvent.drag(el);
    fireEvent.drop(el);
    fireEvent.dragOver(el);
    fireEvent.dragEnter(el);
    fireEvent.dragLeave(el);

    const eventArguments = ["row", "column", "event", "coordinates"];
    expect(Object.keys(onClick.mock.calls[0][0])).toEqual(eventArguments);
    expect(Object.keys(onMouseUp.mock.calls[0][0])).toEqual(eventArguments);

    expect(Object.keys(onMouseDown.mock.calls[0][0])).toEqual(eventArguments);
    expect(Object.keys(onDoubleClick.mock.calls[0][0])).toEqual(eventArguments);
    expect(Object.keys(onMouseEnter.mock.calls[0][0])).toEqual(eventArguments);
    expect(Object.keys(onMouseOut.mock.calls[0][0])).toEqual(eventArguments);

    expect(Object.keys(onDragStart.mock.calls[0][0])).toEqual(eventArguments);
    expect(Object.keys(onDrag.mock.calls[0][0])).toEqual(eventArguments);
    expect(Object.keys(onDrop.mock.calls[0][0])).toEqual(eventArguments);
    expect(Object.keys(onDragOver.mock.calls[0][0])).toEqual(eventArguments);
    expect(Object.keys(onDragEnter.mock.calls[0][0])).toEqual(eventArguments);
    expect(Object.keys(onDragLeave.mock.calls[0][0])).toEqual(eventArguments);

    //expect(screen.getByText("field_name template text")).toBeInTheDocument();
});
