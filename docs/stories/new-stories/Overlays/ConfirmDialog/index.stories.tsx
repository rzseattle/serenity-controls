import React from "react";
import { storiesOf } from "@storybook/react";

import { confirmDialog } from "../../../../../src/ConfirmDialog";

storiesOf("Overlays/Confirm Dialog", module)
    .add("Promise with confirm", () => {
        return (
            <>
                <a
                    className={"btn btn-primary"}
                    onClick={() => {
                        confirmDialog("Are you sure ?").then(() => {
                            alert("Ok clicked!!");
                        });
                    }}
                >
                    Click to confirm
                </a>
            </>
        );
    })
    .add("Attached to element", () => {
        return (
            <>
                <a
                    className={"btn btn-primary"}
                    onClick={(e) => {
                        e.persist();
                        confirmDialog("Are you sure ?", {
                            target: () => {
                                return e.currentTarget;
                            },
                        }).then(() => {
                            alert("Ok clicked!!");
                        });
                    }}
                >
                    Click to confirm
                </a>
            </>
        );
    });
