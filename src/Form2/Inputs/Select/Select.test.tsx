import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { act, renderHook } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import { useSerenityForm } from "../../useSerenityForm";
import { Select } from "./Select";

test("Should render", () => {
    const {
        result: {
            current: { field },
        },
    } = renderHook(() => useSerenityForm<{ test: boolean }>({ defaultValues: { test: false } }));
    const { container } = render(
        <Select
            {...field("test")}
            options={[
                { value: false, label: "No" },
                { value: true, label: "Yes" },
            ]}
        />,
    );
    expect((container.getElementsByClassName("select")[0] as HTMLDivElement).textContent).toBe("No");
});
test("Should render in readonly", () => {
    const { result } = renderHook(() => useSerenityForm<any>({ defaultValues: { test: false } }));

    act(() => {
        result.current.setReadonly(true);
    });
    const { container } = render(
        <Select
            {...result.current.field("test")}
            options={[
                { value: false, label: "No" },
                { value: true, label: "Yes" },
            ]}
        />,
    );
    const presenter = container.getElementsByClassName("w-read-only")[0] as HTMLDivElement;

    expect(presenter).toBeInTheDocument();
    expect(presenter.innerHTML).toEqual("No");
});

test("Should upgrade form value", async () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};
    const { result } = renderHook(() => useSerenityForm<{ test: boolean }>({ defaultValues: { test: false } }));
    render(
        <>
            <Select
                {...result.current.field("test")}
                options={[
                    { value: false, label: "No" },
                    { value: true, label: "Yes" },
                ]}
            />
            <div id="modal-root"></div>
        </>,
    );
    act(() => {
        fireEvent.click(screen.getByTestId("select"));
    });

    const el = screen.getByPlaceholderText("Search") as HTMLElement;
    for (let i = 0; i < 2; i++) {
        fireEvent.keyDown(el, {
            key: "ArrowDown",
        });
        fireEvent.keyUp(el, {
            key: "ArrowDown",
        });
    }

    fireEvent.keyDown(el, {
        key: "Enter",
    });

    expect(result.current.getValues("test")).toBe(true);
    expect(result.current.getFieldState("test").isDirty).toBe(true);
    expect((screen.getByTestId("select") as HTMLButtonElement).textContent).toBe("Yes");
});

test("Should use filter field ", () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};
    const { result } = renderHook(() => useSerenityForm<{ test: number }>({ defaultValues: { test: 0 } }));
    const { container } = render(
        <>
            <Select
                {...result.current.field("test")}
                options={Array(50)
                    .fill(null)
                    .map((_, i) => ({ value: i, label: "Age " + i }))}
            />
            <div id="modal-root"></div>
        </>,
    );

    act(() => {
        fireEvent.click(screen.getByTestId("select") as HTMLDivElement);
    });
    const el = screen.getByPlaceholderText("Search");
    expect(container.querySelector(".list").childElementCount).toBe(50);

    fireEvent.change(el, { target: { value: "age 2" } });

    expect(container.querySelector(".list").childElementCount).toBe(11);

    for (let i = 0; i < 2; i++) {
        fireEvent.keyDown(el, {
            key: "ArrowDown",
        });
        fireEvent.keyUp(el, {
            key: "ArrowDown",
        });
    }

    fireEvent.keyDown(el, {
        key: "Enter",
    });

    expect(result.current.getValues("test")).toBe(20);
    expect((container.getElementsByClassName("select")[0] as HTMLButtonElement).textContent).toBe("Age 20");
});
