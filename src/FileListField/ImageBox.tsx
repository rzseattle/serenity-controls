import { SortableElement, SortableHandle, SortEnd } from "react-sortable-hoc";
import { IFile } from "./FileListsField";
import * as React from "react";
import { Icon } from "../Icon";
import { isImage, formatBytes } from "./utils";
import Tooltip from "../Tooltip/Tooltip";
import { fI18n } from "../lib";
import { Placeholder } from "../Placeholder";

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

    // @ts-ignore
    const preview = file.nativeObj && file.nativeObj.preview ? file.nativeObj.preview : false;
    const isElImage = isImage(file.name);
    return (
        <div style={style}>
            <Tooltip
                content={file}
                template={(data) => {
                    return (
                        <>
                            <div>{file.name}</div>
                            <div>
                                <small>
                                    <div style={{ display: "inline-block", width: "50%" }}>
                                        {fI18n.t("frontend:file.size")}:
                                    </div>
                                    {formatBytes(file.size)}
                                </small>
                                {isElImage && (
                                    <div>
                                        <small>
                                            <div style={{ display: "inline-block", width: "50%" }}>
                                                {fI18n.t("frontend:file.dimensions")}:
                                            </div>
                                            <div style={{ display: "inline-block", width: "50%" }}>
                                                <Placeholder
                                                    promise={
                                                        new Promise<any>((resolve) => {
                                                            const img = new Image();
                                                            img.onload = (ev) => {
                                                                resolve({
                                                                    // @ts-ignore
                                                                    width: ev.currentTarget.width,
                                                                    // @ts-ignore
                                                                    height: ev.currentTarget.height,
                                                                });
                                                            };
                                                            img.src = file.path;
                                                        })
                                                    }
                                                >
                                                    {(imageData) => (
                                                        <>
                                                            {imageData.width} x {imageData.height}
                                                        </>
                                                    )}
                                                </Placeholder>
                                            </div>
                                        </small>
                                    </div>
                                )}
                            </div>
                        </>
                    );
                }}
            >
                <div onClick={() => props.onClick(props._index)} className={"w-image-box"}>
                    <span>
                        <span />
                        {file.uploaded ? (
                            isElImage ? (
                                <img src={file.path} alt="" />
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
            </Tooltip>
        </div>
    );
});
