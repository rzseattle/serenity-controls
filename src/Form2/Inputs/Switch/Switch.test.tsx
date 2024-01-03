import React from "react";
import { fireEvent, screen, render, renderHook, act } from "@testing-library/react";

import { useSerenityForm } from "../../useSerenityForm";
import { Switch } from "./Switch";

test("Should render", () => {
    const {
        result: {
            current: { field },
        },
    } = renderHook(() => useSerenityForm<{ test: boolean }>({ defaultValues: { test: false } }));
    const { container } = render(
        <Switch
            {...field("test")}
            options={[
                { value: false, label: "No" },
                { value: true, label: "Yes" },
            ]}
        />,
    );

    expect((container.getElementsByClassName("selected")[0] as HTMLButtonElement).innerHTML).toBe("No");
});
test("Should render in readonly", () => {
    const { result } = renderHook(() => useSerenityForm<any>({ defaultValues: { test: false } }));

    act(() => {
        result.current.setReadonly(true);
    });
    const { container } = render(
        <Switch
            {...result.current.field("test")}
            options={[
                { value: false, label: "No" },
                { value: true, label: "Yes" },
            ]}
        />,
    );
    const presenter = screen.getByTestId("read-only") as HTMLDivElement;

    expect(presenter).toBeInTheDocument();
    expect(presenter.innerHTML).toEqual("No");
});
//
test("Should upgrade form value", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: boolean }>({ defaultValues: { test: false } }));
    const { container } = render(
        <Switch
            {...result.current.field("test")}
            options={[
                { value: false, label: "No" },
                { value: true, label: "Yes" },
            ]}
        />,
    );
    fireEvent.click(screen.getByText("Yes"));
    expect(result.current.getValues("test")).toBe(true);
    expect(result.current.getFieldState("test").isDirty).toBe(true);
    expect((container.getElementsByClassName("selected")[0] as HTMLButtonElement).innerHTML).toBe("Yes");
});
