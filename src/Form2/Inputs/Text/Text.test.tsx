import React from "react";
import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSerenityForm } from "../../useSerenityForm";
import { Text } from "./Text";

test("Should render", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
    const { container } = render(<Text {...result.current.field("test")} />);
    expect((container.getElementsByTagName("input")[0] as HTMLInputElement).value).toBe("_string");
});
test("Should render in readonly", () => {
    const { result } = renderHook(() => useSerenityForm<any>());

    act(() => {
        result.current.setReadonly(true);
    });
    render(<Text {...result.current.field("test")} />);

    expect(screen.getByTestId("read-only")).toBeInTheDocument();
});

test("Should upgrade form value", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
    const { container } = render(<Text {...result.current.field("test")} />);
    fireEvent.change(container.getElementsByTagName("input")[0] as HTMLInputElement, { target: { value: "_changed" } });
    expect(result.current.getValues("test")).toBe("_changed");
    expect(result.current.getFieldState("test").isDirty).toBe(true);
});

test("Should upgrade form touch", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
    const { container } = render(<Text {...result.current.field("test")} />);
    fireEvent.blur(container.getElementsByTagName("input")[0] as HTMLInputElement);
    expect(result.current.getFieldState("test").isTouched).toBe(true);
});
