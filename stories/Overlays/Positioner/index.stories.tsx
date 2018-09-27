import React from "react";
import { storiesOf } from "@storybook/react";

import { withKnobs, select } from "@storybook/addon-knobs";
import { Positioner, RelativePositionPresets } from "../../../src/ctrl/overlays/Positioner";
import { IPositionCalculatorOptions } from "../../../src/lib/PositionCalculator";

interface IPositionPairHelperProps {
    presetName: string;
    options?: IPositionCalculatorOptions;
}

const TargetStyle: React.CSSProperties = {
    backgroundColor: "darkgreen",
    width: 200,
    height: 40,
    textAlign: "center",
    lineHeight: "40px",
    color: "white",
    margin: "0 auto",
};
const LayerStyle: React.CSSProperties = {
    backgroundColor: "darkred",
    width: 100,
    height: 100,
    textAlign: "center",
    lineHeight: "100px",
    color: "white",
};

export class PositionPairHelper extends React.Component<IPositionPairHelperProps> {
    public relativeTo = React.createRef<HTMLDivElement>();
    constructor(props: IPositionPairHelperProps) {
        super(props);
        this.state = {
            opened: false,
        };
    }

    public render() {
        return (
            <>
                <div style={TargetStyle} ref={this.relativeTo}>
                    {this.props.presetName}
                </div>
                <Positioner relativeTo={() => this.relativeTo.current} relativeSettings={this.props.options}>
                    <div style={LayerStyle}>Layer</div>
                </Positioner>
            </>
        );
    }
}

const presets = Object.entries(RelativePositionPresets).map(([key, value]) => {
    return key;
});

storiesOf("Positioner", module)
    .addDecorator(withKnobs)
    .add("Relative", () => {
        console.log(select("preset", presets, presets[0]));
        return (
            <>
                <div style={{ margin: "100px auto", paddingBottom: 200 }}>
                    <PositionPairHelper
                        options={RelativePositionPresets[select("preset", presets, presets[0])]}
                        presetName={select("preset", presets, presets[0])}
                    />
                </div>
            </>
        );
    });
