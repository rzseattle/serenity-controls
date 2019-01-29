import React from "react";
import { storiesOf } from "@storybook/react";

import { withKnobs, select, number } from "@storybook/addon-knobs";
import { IPositionCalculatorOptions } from "../../../../src/lib";
import { Positioner, RelativePositionPresets } from "../../../../src/Positioner";

interface IPositionPairHelperProps {
    presetName: string;
    layerContent?: string;
    options?: IPositionCalculatorOptions;
    autoWidth?: boolean;
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
    minHeight: 100,
    textAlign: "center",
    //lineHeight: "100px",
    color: "white",
};

export class PositionPairHelper extends React.Component<IPositionPairHelperProps> {
    public relativeTo = React.createRef<HTMLDivElement>();
    public render() {
        let style;
        if (this.props.autoWidth) {
            style = { ...LayerStyle, width: "100%" };
        } else {
            style = LayerStyle;
        }
        return (
            <>
                <div style={TargetStyle} ref={this.relativeTo}>
                    {this.props.presetName}
                </div>
                <Positioner relativeTo={() => this.relativeTo.current} relativeSettings={this.props.options}>
                    <div style={style}>{this.props.layerContent ? this.props.layerContent : "Layer"}</div>
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
    })
    .add("Layer width adjust", () => {
        const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum molestie nibh eget aliquet. Morbi a magna molestie, laoreet mi vitae, suscipit mi. Sed pulvinar massa eros, faucibus volutpat tellus placerat ut. Proin dictum mauris quis risus pretium varius. Donec porttitor ultricies urna eu elementum.
        Sed ullamcorper sapien mi, sed dignissim magna fermentum fringilla. Suspendisse consequat mauris tristique metus ullamcorper, sed ultricies magna tincidunt. Aenean sit amet enim vitae nisi
        placerat convallis vel id velit. Mauris placerat lacus ex, vel tincidunt mauris aliquet ut. Etiam molestie imperdiet est at hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae orci euismod, rhoncus libero nec, sollicitudin orci.

        `;
        return (
            <>
                <div style={{ height: 300 }}>
                    <PositionPairHelper
                        options={RelativePositionPresets.bottomMiddle}
                        presetName={"Do not control width"}
                        autoWidth={true}
                    />
                </div>
                <div style={{ height: 300 }}>
                    <PositionPairHelper
                        options={{ ...RelativePositionPresets.bottomMiddle, widthCalc: "same" }}
                        presetName={"width calc: same"}
                        autoWidth={true}
                    />
                </div>
                <div style={{ height: 300 }}>
                    <PositionPairHelper
                        options={{ ...RelativePositionPresets.bottomMiddle, widthCalc: "min" }}
                        presetName={"width calc: min"}
                        autoWidth={true}
                    />
                </div>
                <div style={{ height: 300 }}>
                    <PositionPairHelper
                        options={{ ...RelativePositionPresets.bottomMiddle, widthCalc: "min" }}
                        presetName={"width calc: min "}
                        layerContent={text}
                        autoWidth={true}
                    />
                </div>
                <div style={{ height: 300 }}>
                    <PositionPairHelper
                        options={{ ...RelativePositionPresets.bottomMiddle, widthCalc: "max" }}
                        presetName={"width calc: max"}
                        autoWidth={true}
                    />
                </div>
                <div style={{ height: 300 }}>
                    <PositionPairHelper
                        options={{ ...RelativePositionPresets.bottomMiddle, widthCalc: "max" }}
                        presetName={"width calc: max "}
                        layerContent={text}
                        autoWidth={true}
                    />
                </div>
            </>
        );
    });
