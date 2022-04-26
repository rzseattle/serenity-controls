import React from "react";
import { fireEvent, screen, render } from "@testing-library/react";

import { act, renderHook } from "@testing-library/react-hooks";

import { useSerenityForm } from "../../useSerenityForm";
import { CheckboxGroup } from "./CheckboxGroup";

test("Should render", () => {
    const {
        result: {
            current: { field },
        },
    } = renderHook(() => useSerenityForm<{ test: string[] }>({ defaultValues: { test: [] } }));
    const { container } = render(
        <CheckboxGroup
            {...field("test")}
            options={[
                { value: false, label: "No" },
                { value: true, label: "Yes" },
            ]}
            value={[false]}
        />,
    );
    screen.debug();
    expect(screen.getByText("No")).toBeInTheDocument();
});
test("Should render in readonly", () => {
    const { result } = renderHook(() => useSerenityForm<any>({ defaultValues: { test: [] } }));

    act(() => {
        result.current.setReadonly(true);
    });
    const { container } = render(
        <CheckboxGroup
            {...result.current.field("test")}
            options={[
                { value: "no", label: "No" },
                { value: "yes", label: "Yes" },
            ]}
        />,
    );
    const presenter = container.getElementsByClassName("w-read-only")[0] as HTMLDivElement;

    expect(presenter).toBeInTheDocument();
    expect(presenter.innerHTML).toEqual("No");
});
//
// test("Should upgrade form value", () => {
//     window.HTMLElement.prototype.scrollIntoView = function () {};
//     const { result } = renderHook(() => useSerenityForm<{ test: string[] }>({ defaultValues: { test: [] } }));
//     const { container } = render(
//         <>
//             <CheckboxGroup
//                 {...result.current.field("test")}
//                 options={[
//                     { value: false, label: "No" },
//                     { value: true, label: "Yes" },
//                 ]}
//             />
//             <div id="modal-root"></div>
//         </>,
//     );
//     act(() => {
//         fireEvent.click(container.getElementsByClassName("select")[0] as HTMLDivElement);
//         const el = screen.getByPlaceholderText("Search");
//         for (let i = 0; i < 2; i++) {
//             fireEvent.keyDown(el, {
//                 key: "ArrowDown",
//             });
//             fireEvent.keyUp(el, {
//                 key: "ArrowDown",
//             });
//         }
//
//         fireEvent.keyDown(el, {
//             key: "Enter",
//         });
//
//         expect(result.current.getValues("test")).toBe(true);
//         expect(result.current.getFieldState("test").isDirty).toBe(true);
//         expect((container.getElementsByClassName("select")[0] as HTMLButtonElement).textContent).toBe("Yes");
//     });
// });
//
// test("Should use filter field ", () => {
//     window.HTMLElement.prototype.scrollIntoView = function () {};
//     const { result } = renderHook(() => useSerenityForm<{ test: number }>({ defaultValues: { test: 0 } }));
//     const { container } = render(
//         <>
//             <CheckboxGroup
//                 {...result.current.field("test")}
//                 options={Array(50)
//                     .fill(null)
//                     .map((_, i) => ({ value: i, label: "Age " + i }))}
//             />
//             <div id="modal-root"></div>
//         </>,
//     );
//     act(() => {
//         fireEvent.click(container.getElementsByClassName("select")[0] as HTMLDivElement);
//         const el = screen.getByPlaceholderText("Search");
//         expect(container.querySelector(".list").childElementCount).toBe(50);
//
//         fireEvent.change(el, { target: { value: "age 2" } });
//
//         expect(container.querySelector(".list").childElementCount).toBe(11);
//
//         for (let i = 0; i < 2; i++) {
//             fireEvent.keyDown(el, {
//                 key: "ArrowDown",
//             });
//             fireEvent.keyUp(el, {
//                 key: "ArrowDown",
//             });
//         }
//
//         fireEvent.keyDown(el, {
//             key: "Enter",
//         });
//
//         expect(result.current.getValues("test")).toBe(20);
//         expect((container.getElementsByClassName("select")[0] as HTMLButtonElement).textContent).toBe("Age 20");
//     });
// });
