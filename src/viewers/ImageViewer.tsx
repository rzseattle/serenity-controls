import * as React from "react";
import { IFileViewerProps } from "../FileListField";

export const ImageViewer = (props: IFileViewerProps) => {
    // @ts-ignore
    const path = props.file.nativeObj.preview ? props.file.nativeObj.preview : props.file.path;

    return <img style={{ maxWidth: 1000, maxHeight: 800 }} src={path} />;
};
