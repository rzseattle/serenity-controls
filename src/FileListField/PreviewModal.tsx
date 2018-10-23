import { Modal } from "../Modal";
import { CommandBar } from "../CommandBar";
import { printFile } from "../FilePrinter";
import * as React from "react";
import { IFile, IFileViewerProps } from "./FileListsField";
import { parsePath } from "./utils";
import { ImageViewer } from "../viewers/ImageViewer";
import { PDFViewer } from "../viewers/PDFViewer";
import { download } from "../Downloader";

const viewerRegistry: Array<{ filter: RegExp; viewer: React.ComponentType<IFileViewerProps> }> = [
    {
        filter: /.(jpg|jpeg|png|gif)$/i,
        viewer: ImageViewer,
    },
    {
        filter: /.(pdf)$/i,
        viewer: PDFViewer,
    },
];

interface IPreviewModal extends IFileViewerProps {
    onHide: () => any;
}

export const PreviewModal = (props: IPreviewModal) => {
    const { file } = props;
    let ViewerComponent: React.ComponentType<IFileViewerProps> = null;
    for (const element of viewerRegistry) {
        if ((file.name && file.name.match(element.filter)) || file.path.match(element.filter)) {
            ViewerComponent = element.viewer;
            break;
        }
    }

    if (ViewerComponent === null) {
        download(parsePath(props.downloadConnector(file)));
        return null;
    }

    return (
        <Modal show={true} onHide={props.onHide} title={file.name} showHideLink={true} width={1000}>
            <CommandBar
                items={[
                    {
                        key: "f1",
                        label: "Drukuj",
                        icon: "Print",
                        onClick: () => {
                            // window.open(parsePath(this.props.downloadConnector(file)));
                            printFile(file);
                        },
                    },
                    {
                        key: "f2",
                        label: "Kopiuj link",
                        icon: "Copy",
                        onClick: () => {
                            (document.getElementsByClassName("w-file-preview-input")[0] as HTMLInputElement).select();
                            document.execCommand("Copy");
                        },
                    },
                    {
                        key: "f3",
                        label: "Otwórz w nowym oknie",
                        icon: "OpenInNewWindow",
                        onClick: () => {
                            window.open(parsePath(props.downloadConnector(file)));
                        },
                    },
                ]}
            />
            <div style={{ opacity: 0, height: 1, overflow: "hidden" }}>
                <input
                    className={"form-control w-file-preview-input"}
                    type="text"
                    value={parsePath(props.downloadConnector(file))}
                    /*ref={(el) => (this.clipurl = el)}*/
                />
            </div>
            <ViewerComponent file={file} downloadConnector={props.downloadConnector} />
        </Modal>
    );
};
