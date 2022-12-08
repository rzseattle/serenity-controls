import * as React from "react";
import { useState } from "react";

import "./DebugTool.sass";

import { Modal } from "../Modal";
// @ts-ignore
import { CgErase } from "react-icons/index";
// @ts-ignore
import { GiPlatform } from "react-icons/index";
// @ts-ignore
import { FaDropbox } from "react-icons/index";

const DebugTool = () => {
    return (
        <div className="w-debug-tool">
            <Cache />
            <StoryBookHelper />
            <JSON2TypescriptHelper />
        </div>
    );
};

const Cache = () => {
    return (
        <span
            onClick={() => {
                alert("todo");
                // Comm._post("/utils/developer/cache/remove").then(() => {
                //     console.log("Cache deleted");
                // });
            }}
        >
            <CgErase />
        </span>
    );
};

const StoryBookHelper = () => {
    const [opened, setOpened] = useState(false);
    return (
        <>
            <span onClick={() => setOpened(true)}>
                <GiPlatform />
            </span>
            <Modal show={opened} title="Storybook helper" showHideLink={true} onHide={() => setOpened(false)}>
                <div className="w-debug-tool-storybook">
                    <iframe src="https://rzseattle.github.io/serenity-controls" />
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
                <FaDropbox />
            </span>
            <Modal show={opened} title="Storybook helper" showHideLink={true} onHide={() => setOpened(false)}>
                <div className="w-debug-tool-storybook">
                    <iframe src="https://transform.tools/json-to-typescript" />
                </div>
            </Modal>
        </>
    );
};

export default DebugTool;
