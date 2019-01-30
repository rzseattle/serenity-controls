import React from "react";
import { storiesOf } from "@storybook/react";

import { Panel } from "../../../src/Panel";

import { IFile } from "../../../src/FileListField";
import { FileListTest } from "./stateHelpers/FileListTest";

const testFiles: IFile[] = [
    {
        key: null,
        name: "test_photo_3.jpeg",
        title: "test_photo_3.jpeg",
        description: "",
        path: "/test_photo_3.jpeg",
        type: "image",
        uploaded: true,
        size: 55106,
    },
    {
        key: null,
        name: "test_photo_1.jpeg",
        title: "test_photo_1.jpeg",
        description: "",
        path: "/test_photo_1.jpeg",
        type: "image",
        uploaded: true,
        size: 117825,
    },
    {
        key: null,
        name: "test_photo_2.jpeg",
        title: "test_photo_2.jpeg",
        description: "",
        path: "/test_photo_2.jpeg",
        type: "image",
        uploaded: true,
        size: 81582,
    },
    {
        key: null,
        name: "test_photo_4.jpeg",
        title: "test_photo_4.jpeg",
        description: "",
        path: "test_photo_4.jpeg",
        type: "image",
        uploaded: true,
        size: 47479,
    },

    {
        key: null,
        name: "pdf_document.pdf",
        title: "pdf_document.pdf",
        description: "",
        path: "./pdf_document.pdf",
        type: "image",
        uploaded: true,
        size: 1148,
        data: {
            tooltipItems: [
                { label: "Author", value: "John Strand" },
                { label: "Date", value: "2007" },
                { label: "xxx", value: "200720072007200720072007" },
            ],
        },
    },
];

storiesOf("Field: FileList", module)
    .add("Base - gallery style", () => {
        return (
            <Panel>
                <FileListTest value={testFiles} type="gallery" />
            </Panel>
        );
    })
    .add("Base - list style", () => {
        return (
            <Panel>
                <FileListTest value={testFiles} type="filelist" />
            </Panel>
        );
    })
    .add("Limit", () => {
        return (
            <Panel>
                <h3>Limit 1</h3>
                <FileListTest value={[]} type="gallery" maxLength={1} />
                <h3>Limit 2</h3>
                <FileListTest value={[]} type="gallery" maxLength={2} />
            </Panel>
        );
    });
