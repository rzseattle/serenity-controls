import * as React from "react";
import { IFileViewerProps } from "../FileListField";

export class ImageViewer extends React.PureComponent<IFileViewerProps> {
    constructor(props: IFileViewerProps) {
        super(props);
    }

    public render() {
        return <img style={{ maxWidth: 1000, maxHeight: 800 }} src={this.props.file.path} />;
    }
}
