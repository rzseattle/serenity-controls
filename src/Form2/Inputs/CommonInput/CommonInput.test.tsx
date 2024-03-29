import React from "react";
import { render, screen, act, renderHook } from "@testing-library/react";

import { useSerenityForm } from "../../useSerenityForm";
import CommonInput from "./CommonInput";

test("Should render", () => {
    const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
    render(
        <CommonInput
            label={"Curr label"}
            fieldState={result.current.getFieldState("test")}
            {...result.current.field("test")}
            readonly={false}
            valueForPresenter={() => ({ real: "", presented: "" })}
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
            readonly={false}
            valueForPresenter={() => ({ real: "", presented: "" })}
        >
            <div>child</div>
        </CommonInput>,
    );
    expect(screen.getByText("Error message")).toBeInTheDocument();
    expect(container.getElementsByClassName("w-common-input-invalid").length > 0);
});
