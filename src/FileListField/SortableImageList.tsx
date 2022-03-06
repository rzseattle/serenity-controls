import * as React from "react";
import { ImageBox } from "./ImageBox";
import { IFile } from "./FileListsField";

interface ISortableImageList {
    files: IFile[];
    itemStyle: React.CSSProperties;
    onClick: (index: number) => any;
    onDelete: (index: number, el: HTMLAnchorElement) => any;
    editable: boolean;
    transformFilePath?: (file: IFile) => string;
}
export const SortableImageList = (props: ISortableImageList) => {
    return (
        <div className="w-gallery-list">
            {props.files &&
                props.files.map((file, index) => (
                    <ImageBox
                        // @ts-ignore
                        file={file}
                        key={file.key}
                        index={index}
                        _index={index}
                        onClick={props.onClick}
                        onDelete={props.onDelete}
                        style={props.itemStyle}
                        editable={props.editable}
                        transformFilePath={props.transformFilePath}
                    />
                ))}
        </div>
    );
};
