import { SortableContainer, SortableElement, SortableHandle, SortEnd } from "react-sortable-hoc";
import {IFile} from "./FileListsField";
import * as React from "react";
import {Icon} from "../Icon";
import {parsePath} from "./utils";

interface IImageBoxProps {
    file: IFile;
    style: React.CSSProperties;
    onClick: (index: number) => any;
    _index: number;
    onDelete: (index: number) => any;
}

const DragHandle = SortableHandle(() => (
    <a className="w-gallery-drag">
        <Icon name={"SIPMove"} />
    </a>
)); //

export const ImageBox = SortableElement((props: IImageBoxProps) => {
    const file = props.file;
    let isImage = false;
    if (file.path.match(/.(jpg|jpeg|png|gif)$/i)) {
        isImage = true;
    }
    if (file.type && file.type.indexOf("image") != -1) {
        isImage = true;
    }

    const style = props.style || {};

    if (!file.uploaded) {
        /*let reader = new FileReader();
    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);
    reader.readAsDataURL(file.nativeObj);*/
    }

    return (
        <div style={style}>
            <div onClick={() => props.onClick(props._index)} className={"w-image-box"}>
                <span>
                    <span />
                    {file.uploaded ? <img src={parsePath(file.path)} alt="" /> : <Icon name={"Upload"} />}

                    <div className="w-gallery-on-hover">
                        <a
                            onClick={(e) => {
                                e.stopPropagation();
                                props.onDelete(props._index);
                            }}
                            className="w-gallery-delete"
                        >
                            <Icon name={"Clear"} />{" "}
                        </a>
                        <DragHandle />
                    </div>
                </span>
                <div className="w-gallery-name">{file.name}</div>
            </div>
        </div>
    );
});
