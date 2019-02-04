import { SortableElement, SortableHandle, SortEnd } from "react-sortable-hoc";
import { IFile } from "./FileListsField";
import * as React from "react";
import { Icon } from "../Icon";
import { isImage, formatBytes } from "./utils";
import Tooltip from "../Tooltip/Tooltip";
import { FileTooltip } from "./FileTooltip";
import { RelativePositionPresets } from "../Positioner";

interface IImageBoxProps {
    file: IFile;
    style: React.CSSProperties;
    onClick: (index: number) => any;
    _index: number;
    onDelete: (index: number) => any;
    editable: boolean;
}

const DragHandle = SortableHandle(() => (
    <a className="w-gallery-drag">
        <Icon name={"SIPMove"} />
    </a>
)); //

// @ts-ignore
const ImageBoxComponent: React.FunctionComponentElement<IImageBoxProps> = (props: IImageBoxProps) => {
    const file = props.file;

    const style = props.style || {};

    // @ts-ignore
    const preview = file.nativeObj && file.nativeObj.preview ? file.nativeObj.preview : false;
    const isElImage = isImage(file.name);
    return (
        <div style={style}>
            <Tooltip
                relativeSettings={{ ...RelativePositionPresets.bottomLeft, offsetX: -5, widthCalc: "min" }}
                content={file}
                template={(data) => <FileTooltip file={file} />}
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
                            {props.editable && (
                                <>
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
                                </>
                            )}
                        </div>
                    </span>
                    <div className="w-gallery-name">{file.name}</div>
                </div>
            </Tooltip>
        </div>
    );
};

// @ts-ignore
export const ImageBox = SortableElement(ImageBoxComponent);
