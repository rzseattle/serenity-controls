import React from "react";
import { storiesOf } from "@storybook/react";

import { Panel } from "../../src/Panel";

import { FileListField, IFile } from "../../src/FileListField";
import { FileListTest } from "./stateHelpers/FileListTest";

const testFiles: IFile[] = [
    {
        key: 5,
        name: "2018-02-19_07h51_11.wmv",
        title: "2018-02-19_07h51_11.wmv",
        description: "",
        path: "blob:http://localhost:6006/d72e9faa-aee9-42f6-bd4e-70d92e07997f",
        type: "image",
        uploaded: true,
        size: 4727291,
    },
];

storiesOf("Field: FileList", module).add("Base", () => {
    return (
        <Panel>
            <FileListTest value={testFiles} type="filelist" />
            <hr/>
            <FileListTest value={testFiles} type="gallery" />
        </Panel>
    );
});
