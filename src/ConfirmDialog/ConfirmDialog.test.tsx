import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { confirmDialog } from "./ConfirmDialog";

// test("Should render", async () => {
//     render(
//         <div>
//             <button
//                 data-testid="fire-alert"
//                 onClick={() => {
//                     confirmDialog("This is message").then(() => {});
//                 }}
//             >
//                 click
//             </button>
//             <div id="modal-root"></div>
//         </div>,
//     );
//
//     await act(async () => {
//         screen.getByTestId("fire-alert").click();
//     });
//     await waitFor(() => screen.getByText("This is message"));
//     expect(screen.getByText("This is message")).toBeInTheDocument();
// });
//
// test("Should hide after click", async () => {
//     const yesFn = jest.fn();
//     render(
//         <div>
//             <button
//                 data-testid="fire-alert"
//                 onClick={async () => {
//                     const result = await confirmDialog("This is message", { title: "Test title" });
//                     if (result === true) {
//                         yesFn();
//                     }
//                 }}
//             >
//                 click
//             </button>
//             <div id="modal-root"></div>
//         </div>,
//     );
//
//     await act(async () => {
//         screen.getByTestId("fire-alert").click();
//     });
//     await waitFor(() => screen.getByText("This is message"));
//
//     await act(async () => {
//         screen.getByText("yes").click();
//     });
//
//     expect(screen.queryByText("This is message")).not.toBeInTheDocument();
//     expect(yesFn).toBeCalledTimes(1);
// });

test("Should hide on abort", async () => {
    const abortFn = jest.fn();
    const { container } = render(
        <div>
            <button
                data-testid="fire-alert"
                onClick={async () => {
                    console.log("ustaiwam");
                    await confirmDialog("This is message", {
                        title: "Test title",
                        onAbort: () => {
                            abortFn();
                        },
                    });
                }}
            >
                click
            </button>
            <div id="modal-root"></div>
        </div>,
    );

    await act(async () => {
        screen.getByTestId("fire-alert").click();
    });

    fireEvent(
        container.querySelector("#modal-root>div>div"),
        new MouseEvent("click", {
            bubbles: false,
            cancelable: false,
        }),
    );

    expect(abortFn).toBeCalledTimes(1);
});

// test("Should render in readonly", () => {
//     const { result } = renderHook(() => useSerenityForm<any>());
//
//     act(() => {
//         result.current.setReadonly(true);
//     });
//     render(<Text {...result.current.field("test")} />);
//
//     expect(screen.getByTestId("read-only")).toBeInTheDocument();
// });
//
// test("Should upgrade form value", () => {
//     const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
//     const { container } = render(<Text {...result.current.field("test")} />);
//     fireEvent.change(container.getElementsByTagName("input")[0] as HTMLInputElement, { target: { value: "_changed" } });
//     expect(result.current.getValues("test")).toBe("_changed");
//     expect(result.current.getFieldState("test").isDirty).toBe(true);
// });
//
// test("Should upgrade form touch", () => {
//     const { result } = renderHook(() => useSerenityForm<{ test: string }>({ defaultValues: { test: "_string" } }));
//     const { container } = render(<Text {...result.current.field("test")} />);
//     fireEvent.blur(container.getElementsByTagName("input")[0] as HTMLInputElement);
//     expect(result.current.getFieldState("test").isTouched).toBe(true);
// });
