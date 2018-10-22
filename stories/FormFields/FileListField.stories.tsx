import React from "react";
import { storiesOf } from "@storybook/react";

import { Panel } from "../../src/Panel";

import { FileListField, IFile } from "../../src/FileListField";
import {FileListTest} from "./stateHelpers/FileListTest";

const testFiles: IFile[] = [

];

storiesOf("Field: FileList", module).add("Base", () => {
    return (
        <Panel>
            <FileListTest value={testFiles} />
        </Panel>
    );
});
