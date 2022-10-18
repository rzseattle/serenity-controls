import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { act, renderHook } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import { useSerenityForm } from "../../useSerenityForm";
import { ConnectionField } from "./ConnectionField";

test("Should render", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
    const { container } = render(<ConnectionField {...result.current.field("test")} />);
    expect((container.getElementsByTagName("input")[0] as HTMLInputElement).value).toBe("_string");
});
test("Should render in readonly", () => {
    const { result } = renderHook(() => useSerenityForm<any>());

    act(() => {
        result.current.setReadonly(true);
    });
    const { container } = render(<ConnectionField {...result.current.field("test")} />);

    expect(container.getElementsByClassName("w-read-only")[0]).toBeInTheDocument();
});

test("Should upgrade form value", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
    const { container } = render(<ConnectionField {...result.current.field("test")} />);
    fireEvent.change(container.getElementsByTagName("input")[0] as HTMLInputElement, { target: { value: "_changed" } });
    expect(result.current.getValues("test")).toBe("_changed");
    expect(result.current.getFieldState("test").isDirty).toBe(true);
});

test("Should upgrade form touch", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
    const { container } = render(<ConnectionField {...result.current.field("test")} />);
    fireEvent.blur(container.getElementsByTagName("input")[0] as HTMLInputElement);
    expect(result.current.getFieldState("test").isTouched).toBe(true);
});
