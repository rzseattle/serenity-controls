import { IFile } from "./FileListsField";
import { fI18n } from "../lib";
import * as React from "react";
import { formatBytes, isImage } from "./utils";
import { Placeholder } from "../Placeholder";
import { IOption } from "../fields";

export const FileTooltip = (props: { file: IFile }) => {
    const { file } = props;
    const isElImage = isImage(file.name);
    return (
        <div className={"w-file-list-tooltip"}>
            <div className="w-file-list-info-title">{file.name}</div>
            <div>
                <div className="w-file-list-info-element">
                    <div>{fI18n.t("frontend:file.size")}:</div>
                    <div>{formatBytes(file.size)}</div>
                </div>
                {isElImage && (
                    <div className="w-file-list-info-element">
                        <div>{fI18n.t("frontend:file.dimensions")}:</div>
                        <div>
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
                    </div>
                )}
                {file.data &&
                    file.data.tooltipItems &&
                    file.data.tooltipItems.map((el: IOption) => {
                        return (
                            <div key={el.label} className="w-file-list-info-element">
                                <div>{el.label}:</div>
                                <div>{el.value}</div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
