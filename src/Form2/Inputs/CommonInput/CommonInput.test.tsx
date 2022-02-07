import React from "react";
import { fireEvent, screen, render } from "@testing-library/react";

import { act, renderHook } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";

import { useSerenityForm } from "../../useSerenityForm";
import CommonInput from "./CommonInput";

test("Should render", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
    render(
        <CommonInput
            label={"Curr label"}
            fieldState={result.current.getFieldState("test")}
            {...result.current.field("test")}
        >
            <div>child</div>
        </CommonInput>,
    );
    expect(screen.getByText("Curr label")).toBeInTheDocument();
});

test("Should render errors", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
    act(() => {
        result.current.setFieldErrors("test", ["Error message"]);
    });
    const { container } = render(
        <CommonInput
            label={"Curr label"}
            fieldState={result.current.getFieldState("test")}
            {...result.current.field("test")}
        >
            <div>child</div>
        </CommonInput>,
    );
    expect(screen.getByText("Error message")).toBeInTheDocument();
    expect(container.getElementsByClassName("w-common-input-invalid").length > 0);
});
