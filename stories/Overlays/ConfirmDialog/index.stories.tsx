import React from "react";
import { storiesOf } from "@storybook/react";

import { withKnobs, select } from "@storybook/addon-knobs";
import { Positioner, RelativePositionPresets } from "../../../src/ctrl/overlays/Positioner";
import { IPositionCalculatorOptions } from "../../../src/lib/PositionCalculator";
import { confirmDialog } from "../../../src/ctrl/overlays/ConfirmDialog";

interface IConfirmHelperProps {
    presetName: string;
    options?: IPositionCalculatorOptions;
}

export class ConfirmHelper extends React.Component<IConfirmHelperProps> {
    public relativeTo = React.createRef<HTMLDivElement>();
    public render() {
        return (
            <>
                <div>
                    <a
                        className={"btn btn-primary"}
                        onClick={() => {
                            confirmDialog("Are you sure ?").then((result) => {
                                alert(result);
                            });
                        }}
                    >
                        Click to confirm
                    </a>
                </div>
            </>
        );
    }
}

const presets = Object.entries(RelativePositionPresets).map(([key, value]) => {
    return key;
});

storiesOf("Confirm Dialog", module)
    .addDecorator(withKnobs)
    .add("Default", () => {
        // @ts-ignore
        const options = RelativePositionPresets[select("preset", presets, presets[0])];
        return (
            <>
                <ConfirmHelper options={options} presetName={select("preset", presets, presets[0])} />
            </>
        );
    });
