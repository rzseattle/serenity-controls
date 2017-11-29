import * as React from "react";

import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import {Modal, Shadow, confirm} from './Overlays'
import {BForm} from '../layout/BootstrapForm'
import Dropzone from 'react-dropzone'
import Comm from '../lib/Comm';
import {IFieldChangeEvent, IFieldProps} from "./fields/Interfaces";
import {Icon} from "frontend/src/ctrl/Icon";

interface IFile {
    key: number,
    name: string;
    size: number;
    description: string;
    title: string;
    type: "image" | "document";
    uploaded: boolean;
    nativeObj?: File;
    path: string;

}


const DragHandle = SortableHandle(() => <a className="w-gallery-drag"><i className="fa fa-arrows"></i></a>); //


const Progress = (props) => {
    return (
        <div className="w-gallery-loader">
            <div style={{width: props.percent + "%"}}></div>
        </div>
    )
}

const ImageBox = SortableElement((props) => {
    const file = props.file;
    let isImage = false;
    if (file.path.match(/.(jpg|jpeg|png|gif)$/i))
        isImage = true;
    if (file.type && file.type.indexOf('image') != -1)
        isImage = true;


    let icon = "fa-file";
    if (!isImage) {

        if (file.path.indexOf(".pdf") != -1 || file.type == "application/pdf") {
            icon = 'fa-file-pdf-o'
        }
    }

    return (<div>
        <a onClick={props.onClick}>
            {file.uploaded == undefined && <span>
                <span></span>{isImage ? <img src={file.path} alt=""/> : <i className={'fa fa-icon ' + icon}></i>}

                <div className="w-gallery-on-hover">
                    <div>{file.name}</div>
                    <a onClick={props.onDelete} className="w-gallery-delete"><i className="fa fa-times"></i></a>
                    <DragHandle/>
                </div>
            </span>}
            {file.uploaded != undefined && <div>
                <Progress percent={file.uploaded}/>
                <div className="w-gallery-upload-name">{file.name}</div>
            </div>}
        </a>
    </div>)
});

const SortableImageList = SortableContainer((props) => {


    return (
        <div className="w-gallery-list">
            {props.files && props.files.map((file, index) =>
                <ImageBox
                    file={file}
                    key={'item-' + index}
                    index={index}
                    onClick={(e) => props.onClick(file, e)}
                    onDelete={(e) => props.onDelete(file, e)}

                />
            )}
        </div>
    )
});


interface IGalleryProps {
    files: IFile[]
}

const Gallery = (props) => <div>Gallery</div>


interface IFileList extends IFieldProps {
    value: IFile[],

}

class FileList extends React.Component<IFileList, any> {


    public handleFileAdd(addedFiles: (File & { preview: string })[]) {
        let currFiles = this.props.value ? this.props.value.slice() : [];
        for (let i = 0; i < addedFiles.length; i++) {
            let el = addedFiles[i];
            let file: IFile = {
                key: null,
                name: el.name,
                title: el.name,
                description: "",
                path: el.preview,
                type: 'image',
                uploaded: false,
                size: el.size,
                nativeObj: el
            }
            currFiles.push(file);
        }

        this.handleChange(currFiles);


    }

    handleFileClick(index) {
        alert("klikanie jeszcze nie");
    }

    handleFileRemove(index) {
        let currFiles = this.props.value ? this.props.value.slice() : [];
        confirm("Czy na pewno usun¹æ plik `" + currFiles[index].name + "` ?").then(() => {

            currFiles.splice(index, 1);
            this.handleChange(currFiles);
        })
    }

    handleChange(currFiles) {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: 'fileList',
                value: currFiles,
                event: null
            })
        }
    }

    formatBytes(bytes) {
        if (bytes < 1024) return bytes + " Bytes";
        else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
        else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + " MB";
        else return (bytes / 1073741824).toFixed(2) + " GB";
    };

    isImage(path) {
        return (path.match(/.(jpg|jpeg|png|gif)$/i))
    }

    render() {
        let {value} = this.props;

        return (
            <div className="w-file-list">
                <Dropzone className="dropzone" activeClassName="w-gallery-add-active" onDrop={this.handleFileAdd.bind(this)}>
                    <span><Icon name={"Add"}/> Dodaj </span>
                </Dropzone>
                <div className="w-file-list-files">
                    {value ? value.map((el, index) => <div className="w-file-list-element" key={el.name}>
                        <div className="w-file-list-name">
                            <a onClick={this.handleFileClick.bind(this, index)}><Icon name={this.isImage(el.path) ? "Photo2" : "TextDocument"}/>{el.name}</a>
                        </div>
                        <div className="w-file-list-size"><a href={el.path} download={true}><Icon name={"Download"}/></a></div>
                        <div className="w-file-list-size">{this.formatBytes(el.size)}</div>
                        <div className="w-file-list-remove"><a onClick={this.handleFileRemove.bind(this, index)}><Icon name={"Delete"}/> </a></div>
                    </div>) : "---"}
                </div>
                {/*<pre>
                    {JSON.stringify(value, null, 2)}
                </pre>*/}
            </div>
        )
    }
}

export {Gallery, FileList};