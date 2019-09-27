import * as React from "react";
import { Icon } from "../Icon";
import Tooltip from "../Tooltip/Tooltip";
import { PrintJSON } from "../PrintJSON";
import { BackofficeStore } from "./BackofficeStore";
import "./DebugTool.sass";
import { useState } from "react";


import { Modal } from "../Modal";
import { LoadingIndicator } from "../LoadingIndicator";
import { RouteVisualization } from "./RouteVisualization";
import { Comm } from "../lib";

const DebugTool = () => {
    return (
        <div className="w-debug-tool">
            <Cache />
            <StoryBookHelper />
            <JSON2TypescriptHelper />
            <RoutingVisualHelper />
            {/*<Tooltip template={() => <DebugToolBody />} theme="light" layerClass="w-debug-tool-tooltip">
                <Icon name={"Code"} />
            </Tooltip>*/}
        </div>
    );
};

const Cache = () => {
    return (
        <span
            onClick={() => {
                Comm._post("/utils/developer/cache/remove").then(() => {
                    console.log("Cache deleted");
                });
            }}
        >
            <Icon name={"EraseTool"} />
        </span>
    );
};


const StoryBookHelper = () => {
    const [opened, setOpened] = useState(false);
    return (
        <>
            <span onClick={() => setOpened(true)}>
                <Icon name={"DietPlanNotebook"} />
            </span>
            <Modal show={opened} title="Storybook helper" showHideLink={true} onHide={() => setOpened(false)}>
                <div className="w-debug-tool-storybook">
                    <iframe src="http://frontend-lib.org:3000/storybook/" />
                </div>
            </Modal>
        </>
    );
};

const JSON2TypescriptHelper = () => {
    const [opened, setOpened] = useState(false);
    return (
        <>
            <span onClick={() => setOpened(true)}>
                <Icon name={"TypeScriptLanguage"} />
            </span>
            <Modal show={opened} title="Storybook helper" showHideLink={true} onHide={() => setOpened(false)}>
                <div className="w-debug-tool-storybook">
                    <iframe src="https://transform.tools/json-to-typescript" />
                </div>
            </Modal>
        </>
    );
};

const RoutingVisualHelper = () => {
    const [opened, setOpened] = useState(false);
    return (
        <>
            <span onClick={() => setOpened(true)}>
                <Icon name={"NumberedList"} />
            </span>
            <Modal show={opened} title="Route List" showHideLink={true} onHide={() => setOpened(false)}>
                <div className="w-debug-tool-storybook">
                    <RouteVisualization />
                </div>
            </Modal>
        </>
    );
};

export default DebugTool;