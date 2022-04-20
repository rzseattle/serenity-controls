import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { act, renderHook } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import Date from "./Date";
import { useSerenityForm } from "../../useSerenityForm";

test("Should render", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "1982-11-20" } }));
    const { container } = render(<Date {...result.current.field("test")} />);
    expect((container.getElementsByTagName("input")[0] as HTMLInputElement).value).toBe("1982-11-20");
});
test("Should render in readonly", () => {
    const { result } = renderHook(() => useSerenityForm<any>());

    act(() => {
        result.current.setReadonly(true);
    });
    const { container } = render(<Date {...result.current.field("test")} />);

    expect(container.getElementsByClassName("w-read-only")[0]).toBeInTheDocument();
});

test("Should upgrade form value", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "1982-11-20" } }));
    const { container } = render(<Date {...result.current.field("test")} />);

    fireEvent.change(container.getElementsByTagName("input")[0] as HTMLInputElement, { target: { value: "_changed" } });
    expect(result.current.getValues("test")).toBe("_changed");
    expect(result.current.getFieldState("test").isDirty).toBe(true);
});

test("Should upgrade form value from calendar", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "1982-11-20" } }));
    const { container } = render(
        <>
            <Date {...result.current.field("test")} />
            <div id="modal-root"></div>
        </>,
    );

    act(() => {
        fireEvent.click(container.getElementsByTagName("input")[0] as HTMLInputElement);
    });
    fireEvent.mouseUp(screen.getByText(28));

    expect(result.current.getValues("test")).toBe("1982-11-28");
    expect(result.current.getFieldState("test").isDirty).toBe(true);
});

test("Should upgrade form touch", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
    const { container } = render(<Date {...result.current.field("test")} />);
    fireEvent.blur(container.getElementsByTagName("input")[0] as HTMLInputElement);
    expect(result.current.getFieldState("test").isTouched).toBe(true);
});
