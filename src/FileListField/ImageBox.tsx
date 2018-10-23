import { SortableContainer, SortableElement, SortableHandle, SortEnd } from "react-sortable-hoc";
import { IFile } from "./FileListsField";
import * as React from "react";
import { Icon } from "../Icon";
import { isImage, parsePath } from "./utils";

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

    const style = props.style || {};

    if (!file.uploaded) {
        /*let reader = new FileReader();
    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);
    reader.readAsDataURL(file.nativeObj);*/
    }

    // @ts-ignore
    const preview = file.nativeObj && file.nativeObj.preview ? file.nativeObj.preview : false;
    return (
        <div style={style}>
            <div onClick={() => props.onClick(props._index)} className={"w-image-box"}>
                <span>
                    <span />
                    {file.uploaded ? (
                        isImage(file.name) ? (
                            <img src={parsePath(file.path)} alt="" />
                        ) : (
                            <>
                                <Icon name={"TextDocument"} />
                            </>
                        )
                    ) : (
                        <>
                            <img src={preview} alt="" />
                            <Icon name={"Upload"} />
                        </>
                    )}

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
