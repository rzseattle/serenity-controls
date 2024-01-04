import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { alertDialog } from "./AlertDialog";

test("Should render", async () => {
    render(
        <div>
            <button
                data-testid="fire-alert"
                onClick={() => {
                    alertDialog("This is message").then(() => {});
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
    await waitFor(() => screen.getByText("This is message"));
    expect(screen.getByText("This is message")).toBeInTheDocument();
});

test("Should hide after click", async () => {
    render(
        <div>
            <button
                data-testid="fire-alert"
                onClick={() => {
                    alertDialog("This is message", { title: "Test title" });
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
    await waitFor(() => screen.getByText("This is message"));

    await act(async () => {
        screen.getByText("ok").click();
    });

    expect(screen.queryByText("This is message")).not.toBeInTheDocument();
});
