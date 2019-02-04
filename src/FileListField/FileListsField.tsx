import * as React from "react";

import Dropzone from "react-dropzone";
import { IFieldProps } from "../fields/Interfaces";

import { fI18n } from "../lib";

import { Icon } from "../Icon";
import { SortEnd } from "react-sortable-hoc";
import { formatBytes, isImage, globalTransformFilePath, getViewer } from "./utils";
import { SortableImageList } from "./SortableImageList";
import { PreviewModal } from "./PreviewModal";

import "./FilesLists.sass";
import { download } from "../Downloader";
import { alertDialog } from "../AlertDialog";

export interface IFile {
    key: number;
    name: string;
    size: number;
    description: string;
    title: string;
    type: "image" | "document";
    uploaded: boolean;
    nativeObj?: File;
    path: string;
    data?: any;
}

export interface IFileListProps extends IFieldProps {
    name?: string;
    value: IFile[];
    type?: "gallery" | "filelist";
    editable: boolean;
    buttonTitle?: string;
    maxLength?: number;
    itemStyle?: any;
    transformFilePath?: (file: IFile) => string;
}

export interface IFileViewerProps {
    file: IFile;
}

export class FileListField extends React.Component<IFileListProps, any> {
    public static defaultProps: Partial<IFileListProps> = {
        type: "filelist",
        maxLength: null,
        editable: true,
        itemStyle: {},
        transformFilePath: (file: IFile) => file.path,
    };

    public constructor(props: IFileListProps) {
        super(props);

        this.state = {
            filesDeleted: [],
            preview: null,
            numPages: null,
        };
    }

    public handleFileAdd = (addedFiles: Array<File & { preview: string }>) => {
        const currFiles = this.props.value ? this.props.value.slice() : [];
        for (let i = 0; i < addedFiles.length; i++) {
            if (this.props.maxLength && i >= this.props.maxLength) {
                continue;
            }
            const el = addedFiles[i];
            /*if (this.props.type == "gallery" && !isImage(el.name)) {
                alertDialog(`"${el.name}" to nie plik graficzny`);
                continue;
            }*/
            const file: IFile = {
                key: null,
                name: el.name,
                title: el.name,
                description: "",
                path: el.preview,
                type: "image",
                uploaded: false,
                size: el.size,
                nativeObj: el,
                data: {},
            };
            currFiles.push(file);
        }

        this.handleChange(currFiles);
    };

    public handleFileClick(index: number) {
        this.handleViewRequest(index);
    }

    public handleMoveFile = (moveEvent: SortEnd) => {
        const { oldIndex, newIndex } = moveEvent;
        const currFiles = this.props.value ? this.props.value.slice() : [];
        currFiles.splice(newIndex, 0, currFiles.splice(oldIndex, 1)[0]);
        this.handleChange(currFiles);
    };

    public handleFileRemove = (index: number) => {
        const currFiles = this.props.value ? this.props.value.slice() : [];
        const deleted = this.state.filesDeleted;
        deleted.push(currFiles[index]);
        this.setState({ filesDeleted: deleted });
        currFiles.splice(index, 1);
        this.handleChange(currFiles);
    };

    public handleChange(currFiles: IFile[]) {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: "fileList",
                value: currFiles,
                event: null,
            });
        }
    }

    public handleViewRequest = (index: number) => {
        const file = this.props.value[index];
        const viewer = getViewer(file);
        if (viewer == null) {
            if (file.uploaded) {
                download(file.path);
            } else {
                alertDialog(fI18n.t("frontend:files.fileNotUploadedYet"));
            }
        } else {
            const el = { ...file };
            el.path = this.props.transformFilePath(el);
            el.path = globalTransformFilePath(el);
            this.setState({ preview: el });
        }
        return;
    };

    public render() {
        const { type, maxLength, transformFilePath, editable } = this.props;
        const { preview } = this.state;
        const value = this.props.value ? this.props.value : [];

        return (
            <div className="w-file-list">
                {(!maxLength || (value && value.length < maxLength) || !value) && editable && (
                    <Dropzone onDrop={this.handleFileAdd}>
                        {({ getRootProps, getInputProps, isDragActive }) => {
                            return (
                                <div {...getRootProps()} className="dropzone">
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <p>Drop files here...</p>
                                    ) : (
                                        <span>
                                            <Icon name={"Add"} />{" "}
                                            {this.props.buttonTitle
                                                ? this.props.buttonTitle
                                                : fI18n.t("frontend:file.add")}{" "}
                                        </span>
                                    )}
                                </div>
                            );
                        }}
                    </Dropzone>
                )}

                <div className={" " + (type == "gallery" ? "w-file-list-gallery" : "w-file-list-files")}>
                    {type == "filelist"
                        ? value.map((el, index) => (
                              <div className="w-file-list-element" key={el.name}>
                                  <div className="w-file-list-name">
                                      <a onClick={this.handleFileClick.bind(this, index)}>
                                          <Icon name={isImage(el.name) ? "Photo2" : "TextDocument"} />
                                          {el.name}
                                      </a>
                                      {!el.uploaded && (
                                          <div className="w-file-list-upload-info">
                                              Plik zostanie załadowany po zapisaniu formularza
                                          </div>
                                      )}
                                  </div>
                                  <div className="w-file-list-size">
                                      <a href={transformFilePath(el)} download={true}>
                                          <Icon name={"Download"} />
                                      </a>
                                  </div>
                                  <div className="w-file-list-size">{formatBytes(el.size)}</div>
                                  {editable && (
                                      <div className="w-file-list-remove">
                                          <a onClick={() => this.handleFileRemove(index)}>
                                              <Icon name={"Delete"} />{" "}
                                          </a>
                                      </div>
                                  )}
                              </div>
                          ))
                        : null}

                    {type == "gallery" && (
                        <SortableImageList
                            helperClass={"w-file-list-dragging"}
                            files={value}
                            onSortEnd={this.handleMoveFile}
                            axis={"xy"}
                            useDragHandle={true}
                            lockToContainerEdges={true}
                            onDelete={this.handleFileRemove}
                            onClick={this.handleViewRequest}
                            itemStyle={this.props.itemStyle}
                            editable={editable}
                        />
                    )}
                </div>

                {preview && <PreviewModal file={preview} onHide={() => this.setState({ preview: false })} />}
            </div>
        );
    }
}
