import React from "react";
import { fireEvent, render, act, renderHook } from "@testing-library/react";

import { useSerenityForm } from "../../useSerenityForm";
import { Textarea } from "./Textarea";

test("Should render", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
    const { container } = render(<Textarea {...result.current.field("test")} />);
    expect((container.getElementsByTagName("textarea")[0] as HTMLTextAreaElement).textContent).toBe("_string");
});
test("Should render in readonly", () => {
    const { result } = renderHook(() => useSerenityForm<any>());

    act(() => {
        result.current.setReadonly(true);
    });
    const { container } = render(<Textarea {...result.current.field("test")} />);

    expect(container.getElementsByClassName("w-read-only")[0]).toBeInTheDocument();
});

test("Should upgrade form value", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
    const { container } = render(<Textarea {...result.current.field("test")} />);
    fireEvent.change(container.getElementsByTagName("textarea")[0] as HTMLTextAreaElement, {
        target: { value: "_changed" },
    });
    expect(result.current.getValues("test")).toBe("_changed");
    expect(result.current.getFieldState("test").isDirty).toBe(true);
});

test("Should upgrade form touch", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
    const { container } = render(<Textarea {...result.current.field("test")} />);
    fireEvent.blur(container.getElementsByTagName("textarea")[0] as HTMLTextAreaElement);
    expect(result.current.getFieldState("test").isTouched).toBe(true);
});
