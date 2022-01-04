import React from "react";
import { storiesOf } from "@storybook/react";


import { Positioner, RelativePositionPresets } from "../../../../../src/Positioner";
import { IPositionCalculatorOptions } from "../../../../../lib/lib";

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

export class PositionPairHelperBase extends React.Component<IPositionPairHelperProps> {
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
                    Target
                </div>
                <Positioner
                    relativeTo={() => this.relativeTo.current}
                    relativeSettings={RelativePositionPresets.topLeft}
                >
                    <div style={style}>Top Left</div>
                </Positioner>
                <Positioner
                    relativeTo={() => this.relativeTo.current}
                    relativeSettings={RelativePositionPresets.bottomRight}
                >
                    <div style={style}>bottom right</div>
                </Positioner>

                <Positioner
                    relativeTo={() => this.relativeTo.current}
                    relativeSettings={RelativePositionPresets.middleRight}
                >
                    <div style={{ ...style, backgroundColor: "grey" }}>middle right</div>
                </Positioner>

                <Positioner
                    relativeTo={() => this.relativeTo.current}
                    relativeSettings={RelativePositionPresets.bottomLeftCorner}
                >
                    <div style={{ ...style, backgroundColor: "grey" }}>bottom left corner</div>
                </Positioner>
            </>
        );
    }
}

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
                    {this.props.presetName ? this.props.presetName : "Target"}
                </div>
                <Positioner relativeTo={() => this.relativeTo.current} relativeSettings={this.props.options} trackPosition={false}>
                    <div style={style}>{this.props.layerContent ? this.props.layerContent : "Layer"}</div>
                </Positioner>
            </>
        );
    }
}

const presets = Object.entries(RelativePositionPresets).map(([key, value]) => {
    return key;
});

storiesOf("Overlays/Positioner", module)
    .add("Relative with presets", () => {
        return (
            <>
                <div style={{ margin: "100px auto", paddingBottom: 200 }}>
                    <PositionPairHelperBase options={RelativePositionPresets.bottomLeft} presetName={"preset"} />
                </div>
            </>
        );
    })
    // .add("Relative manual (to cursor)", () => {
    //     const positionsHorizontal = ["left", "middle", "right"];
    //     const positionsVertical = ["top", "middle", "bottom"];
    //
    //     return (
    //         <>
    //             <Positioner relativeTo={"cursor"}>
    //                 <div style={LayerStyle} />
    //             </Positioner>
    //         </>
    //     );
    // })
    .add("Layer width adjust", () => {
        const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum molestie nibh eget aliquet. Morbi a magna molestie, laoreet mi vitae, suscipit mi. Sed pulvinar massa eros, faucibus volutpat tellus placerat ut. Proin dictum mauris quis risus pretium varius. Donec porttitor ultricies urna eu elementum.
        Sed ullamcorper sapien mi, sed dignissim magna fermentum fringilla. Suspendisse consequat mauris tristique metus ullamcorper, sed ultricies magna tincidunt. Aenean sit amet enim vitae nisi
        placerat convallis vel id velit. Mauris placerat lacus ex, vel tincidunt mauris aliquet ut. Etiam molestie imperdiet est at hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae orci euismod, rhoncus libero nec, sollicitudin orci.

        `;
        return (
            <div style={{position: "relative"}}>
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
            </div>
        );
    });
