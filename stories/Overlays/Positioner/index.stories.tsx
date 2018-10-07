import React from "react";
import { storiesOf } from "@storybook/react";

import { withKnobs, select, number } from "@storybook/addon-knobs";
import {Positioner, RelativePositionPresets} from "../../../src/ctrl/overlays";
import {IPositionCalculatorOptions} from "../../../src/ctrl/lib";

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
    .add("Relative with presets", () => {
        const presetSelected = select("preset", presets, presets[0]);

        // @ts-ignore
        const options: IPositionCalculatorOptions = { ...RelativePositionPresets[presetSelected] };

        options.offsetX = number("Offset X", 0);
        options.offsetY = number("Offset Y", 0);

        return (
            <>
                <div style={{ margin: "100px auto", paddingBottom: 200 }}>
                    <PositionPairHelper options={options} presetName={presetSelected} />
                </div>
            </>
        );
    })
    .add("Relative manual", () => {
        const positionsHorizontal = ["left", "middle", "right"];
        const positionsVertical = ["top", "middle", "bottom"];

        // @ts-ignore
        const options: IPositionCalculatorOptions = {
            relativeToAt:
                select("Relative to element handle vertical", positionsVertical, "middle") +
                " " +
                select("Relative to element handle horizontal", positionsHorizontal, "middle"),
            itemAt:
                select("Layer handle vertical", positionsVertical, "middle") +
                " " +
                select("Layer handle horizontal", positionsHorizontal, "middle"),
            offsetX: number("Offset X", 0),
            offsetY: number("Offset Y", 0),
        };

        return (
            <>
                <div style={{ margin: "100px auto", paddingBottom: 200 }}>
                    <PositionPairHelper options={options} presetName={""} />
                </div>
            </>
        );
    })
    .add("Relative manual (to cursor)", () => {
        const positionsHorizontal = ["left", "middle", "right"];
        const positionsVertical = ["top", "middle", "bottom"];

        // @ts-ignore
        const options: IPositionCalculatorOptions = {
            relativeToAt: "middle middle",

            itemAt:
                select("Layer handle vertical", positionsVertical, "top") +
                " " +
                select("Layer handle horizontal", positionsHorizontal, "left"),
            offsetX: number("Offset X", 10),
            offsetY: number("Offset Y", 10),
        };

        return (
            <>
                <Positioner relativeTo={"cursor"} relativeSettings={options}>
                    <div style={LayerStyle} />
                </Positioner>
            </>
        );
    });
