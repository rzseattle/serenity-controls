import * as React from "react";

import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import {Modal, Shadow} from './Overlays'
import {BForm} from '../layout/BootstrapForm'
import Dropzone from 'react-dropzone'
import Comm from '../lib/Comm';
import {IFieldChangeEvent, IFieldProps} from "./fields/Interfaces";

interface IFile {
    name: string;
    size: number;
    description: string;
    title: string;
    type: "image" | "document";
    uploaded: boolean
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
    files: IFile[],

}

class FileList extends React.Component<IFileList, any> {
    public handleFileAdd(files) {

    }
    render() {
        return (
            <div>
                <Dropzone style={{}} className="w-gallery-add" activeClassName="w-gallery-add-active" onDrop={this.handleFileAdd.bind(this)}>
                    <span><i className="fa fa-plus-circle"></i> Dodaj</span>
                </Dropzone>
                file list
            </div>
        )
    }
}

export {Gallery, FileList};