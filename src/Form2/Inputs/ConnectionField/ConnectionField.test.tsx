//
import { act, render, renderHook } from "@testing-library/react";
import { useSerenityForm } from "../../useSerenityForm";
import { ConnectionField } from "./ConnectionField";
import React from "react";

test("Should render", async () => {
    const { result } = renderHook(() =>
        useSerenityForm<{ test: string[] }>({ defaultValues: { test: ["value_token"] } }),
    );
    let container;
    await act(async () => {
        const { container: cont } = render(
            <ConnectionField
                ds={(_input) => {
                    return Promise.resolve({
                        more: false,
                        results: [{ value: "value_token", label: "Label" }],
                    });
                }}
                {...result.current.field("test")}
            />,
        );
        container = cont;
    });

    if (container !== undefined) {
        expect(
            // @ts-ignore
            (container.getElementsByClassName("selectedElement")[0] as HTMLInputElement).firstChild.textContent,
        ).toBe("Label");
    } else {
        expect(false).toBe(true);
    }
});
// test("Should render in readonly", () => {
//     const { result } = renderHook(() => useSerenityForm<any>());
//
//     act(() => {
//         result.current.setReadonly(true);
//     });
//     const { container } = render(<ConnectionField {...result.current.field("test")} />);
//
//     expect(screen.getByTestId("read-only")[0]).toBeInTheDocument();
// });
//
// test("Should upgrade form value", () => {
//     const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
//     const { container } = render(<ConnectionField {...result.current.field("test")} />);
//     fireEvent.change(container.getElementsByTagName("input")[0] as HTMLInputElement, { target: { value: "_changed" } });
//     expect(result.current.getValues("test")).toBe("_changed");
//     expect(result.current.getFieldState("test").isDirty).toBe(true);
// });
//
// test("Should upgrade form touch", () => {
//     const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
//     const { container } = render(<ConnectionField {...result.current.field("test")} />);
//     fireEvent.blur(container.getElementsByTagName("input")[0] as HTMLInputElement);
//     expect(result.current.getFieldState("test").isTouched).toBe(true);
// });
