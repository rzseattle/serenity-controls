import React from "react";
import { storiesOf } from "@storybook/react";

import { withKnobs, select } from "@storybook/addon-knobs";

import {confirmDialog, RelativePositionPresets} from "../../../src/ctrl/overlays";
import {IPositionCalculatorOptions} from "../../../src/ctrl/lib";

interface IConfirmHelperProps {
    presetName: string;
    options?: IPositionCalculatorOptions;
}

const presets = Object.entries(RelativePositionPresets).map(([key, value]) => {
    return key;
});

storiesOf("Confirm Dialog", module)
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
