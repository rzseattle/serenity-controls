import { Modal } from "../Modal";
import { CommandBar } from "../CommandBar";
import { printFile } from "../FilePrinter";
import * as React from "react";
import { IFile, IFileViewerProps } from "./FileListsField";
import { parsePath } from "./utils";
import { ImageViewer } from "../viewers/ImageViewer";
import { PDFViewer } from "../viewers/PDFViewer";

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

interface IPreviewModalProps {
    preview: IFile;
}

export const PreviewModal = (props: IPreviewModalProps) => {
    const { preview } = props;
    let ViewerComponent: React.ComponentType<IFileViewerProps> = null;
    for (const element of viewerRegistry) {
        if ((preview.name && preview.name.match(element.filter)) || preview.path.match(element.filter)) {
            ViewerComponent = element.viewer;
            break;
        }
    }

    if (ViewerComponent === null) {
        return <div>Brak podglądu do tego rodzaju plików</div>;
    }

    return (
        <Modal
            show={true}
            onHide={() => this.setState({ preview: null })}
            title={preview.name}
            showHideLink={true}
            width={1000}
        >
            <CommandBar
                items={[
                    {
                        key: "f1",
                        label: "Drukuj",
                        icon: "Print",
                        onClick: () => {
                            // window.open(parsePath(this.props.downloadConnector(preview)));
                            printFile(preview);
                        },
                    },
                    {
                        key: "f2",
                        label: "Kopiuj link",
                        icon: "Copy",
                        onClick: () => {
                            this.clipurl.select();
                            document.execCommand("Copy");
                        },
                    },
                    {
                        key: "f3",
                        label: "Otwórz w nowym oknie",
                        icon: "OpenInNewWindow",
                        onClick: () => {
                            window.open(parsePath(this.props.downloadConnector(preview)));
                        },
                    },
                ]}
            />
            <div style={{ opacity: 0, height: 1, overflow: "hidden" }}>
                <input
                    className={"form-control"}
                    type="text"
                    value={parsePath(this.props.downloadConnector(preview))}
                    ref={(el) => (this.clipurl = el)}
                />
            </div>
            <ViewerComponent file={preview} />
        </Modal>
    );
};
