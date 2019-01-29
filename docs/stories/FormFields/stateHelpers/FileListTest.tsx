import * as React from "react";
import { ISelectProps, Select } from "../../../src/fields";
import { FileListField, IFileListProps } from "../../../src/FileListField";
import {PrintJSON} from "../../../src/PrintJSON";

export class FileListTest extends React.Component<IFileListProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    public render() {
        return (
            <>
                <FileListField
                    {...this.props}
                    value={this.state.value}
                    onChange={(e) => this.setState({ value: e.value })}
                />
                <PrintJSON json={this.state.value}/>
            </>
        );
    }
}
