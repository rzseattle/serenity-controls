import { IFieldProps } from "./Interfaces";
import * as React from "react";
import Dropzone from "react-dropzone";
import { Icon } from "../Icon";
import { fI18n } from "../lib";

export interface IFileProps extends IFieldProps {
    value: FileList;
}

export class File extends React.Component<IFileProps, any> {
    public handleFileAdd = (e: any) => {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: "file",
                value: e,
                event: e,
            });
        }
    };

    public render() {
        const props = this.props;
        return (
            <div className="w-file-upload">
                <Dropzone onDrop={this.handleFileAdd}>
                    {({ getRootProps, getInputProps, isDragActive }) => {
                        return (
                            <div {...getRootProps()} className="dropzone">
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p>Drop files here...</p>
                                ) : (
                                    <span className="btn btn-default" style={{ cursor: "pointer" }}>
                                        <Icon name={"Add"} /> {fI18n.t("frontend:file.add")}
                                    </span>
                                )}
                            </div>
                        );
                    }}
                </Dropzone>

                {props.value && Array.isArray(props.value) && (
                    <div className="w-file-dropzone-up-list">
                        {props.value.map((el) => (
                            <div>
                                <div>
                                    <a href={el.preview || el.path} target="_blank">
                                        <div className="w-file-dropzone-up-list-icon">
                                            {el.type.indexOf("image") != -1 && (
                                                <img src={el.preview || el.path} alt="" />
                                            )}
                                            {el.type.indexOf("image") == -1 && <i className="fa fa-file" />}
                                        </div>
                                        <div className="w-file-dropzone-up-list-name">{el.name}</div>
                                        <div className="w-file-dropzone-up-list-status">
                                            <i className={"fa fa-" + (el.preview ? "upload" : "check")} />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}
