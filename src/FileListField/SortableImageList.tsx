import { SortableContainer, SortableElement, SortableHandle, SortEnd } from "react-sortable-hoc";
import * as React from "react";
import { ImageBox } from "./ImageBox";
import { IFile } from "./FileListsField";
interface ISortableImageList {
    files: IFile[];
    itemStyle: React.CSSProperties;
    onClick: (index: number) => any;
    onDelete: (index: number) => any;
}
export const SortableImageList = SortableContainer((props: ISortableImageList) => {
    return (
        <div className="w-gallery-list">
            {props.files &&
                props.files.map((file, index) => (
                    <ImageBox
                        file={file}
                        key={file.name}
                        index={index}
                        _index={index}
                        onClick={props.onClick}
                        onDelete={props.onDelete}
                        style={props.itemStyle}
                    />
                ))}
        </div>
    );
});
