import { SortableElement, SortableHandle } from "react-sortable-hoc";
import { IFile } from "./FileListsField";
import * as React from "react";
import { isImage } from "./utils";
import Tooltip from "../Tooltip/Tooltip";
import { FileTooltip } from "./FileTooltip";
import { RelativePositionPresets } from "../Positioner";
import { CloseOutlined, CloudUploadOutlined, ControlCameraOutlined, DescriptionOutlined } from "@material-ui/icons";

interface IImageBoxProps {
    file: IFile;
    style: React.CSSProperties;
    onClick: (index: number) => any;
    _index: number;
    onDelete: (index: number, el: HTMLAnchorElement) => any;
    editable: boolean;
    transformFilePath?: (file: IFile) => string;
}

const DragHandle = SortableHandle(() => (
    <a className="w-gallery-drag">
        <ControlCameraOutlined />
    </a>
)); //

// @ts-ignore
const ImageBoxComponent: React.FunctionComponentElement<IImageBoxProps> = (props: IImageBoxProps) => {
    const file = props.file;

    const style = props.style || {};

    // @ts-ignore
    const preview = file.nativeObj && file.nativeObj.preview ? file.nativeObj.preview : undefined;
    const isElImage = isImage(file.name) || isImage(file.path);
    return (
        <div style={style}>
            <Tooltip
                relativeSettings={{ ...RelativePositionPresets.bottomLeft, offsetX: -5, widthCalc: "min" }}
                content={file}
                template={(data) => <FileTooltip file={file} transformFilePath={props.transformFilePath} />}
            >
                <div onClick={() => props.onClick(props._index)} className={"w-image-box"}>
                    <span>
                        <span />
                        {file.uploaded ? (
                            isElImage ? (
                                <img src={props.transformFilePath(file)} alt="" />
                            ) : (
                                <>
                                    <DescriptionOutlined />
                                </>
                            )
                        ) : (
                            <>
                                <img src={preview} alt="" />
                                <CloudUploadOutlined />
                            </>
                        )}

                        <div className="w-gallery-on-hover">
                            {props.editable && (
                                <>
                                    <a
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.persist();
                                            props.onDelete(props._index, e.nativeEvent.target as HTMLAnchorElement);
                                        }}
                                        className="w-gallery-delete"
                                    >
                                        <CloseOutlined />{" "}
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
