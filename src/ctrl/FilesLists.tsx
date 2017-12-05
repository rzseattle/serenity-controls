import * as React from "react";

import {arrayMove, SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import Dropzone from 'react-dropzone'
import {IFieldProps} from "./fields/Interfaces";
import {Icon} from "frontend/src/ctrl/Icon";
import {Modal} from "frontend/src/ctrl/Overlays";

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

    if (!file.uploaded) {
        /*let reader = new FileReader();
        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);
        reader.readAsDataURL(file.nativeObj);*/

    }


    return (<div>
        <a onClick={() => props.onClick(props._index)}>
            <span>
                <span></span>{file.uploaded ? <img src={file.path} alt=""/> : <Icon name={"Upload"} />}

                <div className="w-gallery-on-hover">
                    <a onClick={(e) => {
                        e.stopPropagation();
                        props.onDelete(props._index);
                    }} className="w-gallery-delete"><i className="fa fa-times"></i></a>
                    <DragHandle/>
                </div>
            </span>
            <div className="w-gallery-name">{file.name}</div>
        </a>
    </div>)
});

const SortableImageList = SortableContainer((props) => {


    return (
        <div className="w-gallery-list">
            {props.files && props.files.map((file, index) =>
                <ImageBox
                    file={file}
                    key={file.name}
                    index={index}
                    _index={index}
                    onClick={props.onClick}
                    onDelete={props.onDelete}

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
    value: IFile[];
    type?: "gallery" | "filelist";
    buttonTitle?: string;
    maxLength?: number;

}

class FileList extends React.Component<IFileList, any> {

    public static defaultProps: Partial<IFileList> = {
        type: "filelist",
        maxLength: null,
        buttonTitle: 'Dodaj'
    }

    public constructor(props) {
        super(props);
        this.state = {
            filesDeleted: [],
            preview: null
        }
    }

    public handleFileAdd(addedFiles: (File & { preview: string })[]) {
        let currFiles = this.props.value ? this.props.value.slice() : [];
        for (let i = 0; i < addedFiles.length; i++) {
            if (this.props.maxLength && i >= this.props.maxLength) {
                continue;
            }
            let el = addedFiles[i];
            if (this.props.type == "gallery" && !this.isImage(el.name)) {
                alert(`"${el.name}" to nie plik graficzny`);
                continue;
            }


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

    componentWillReceiveProps(nextProps) {

        //this.setState({filesDeleted: []});
        //console.log(nextProps);
    }

    handleFileClick(index) {
        const el = this.props.value[index];
        if (this.isImage(el.path)) {
            this.setState({preview: el});
        } else {
            alert("Brak podglądu do tego rodzaju plików");
        }
    }

    handleFileRemove(index) {
        let currFiles = this.props.value ? this.props.value.slice() : [];
        //confirm("Czy na pewno usun�� plik `" + currFiles[index].name + "` ?").then(() => {

        let deleted = this.state.filesDeleted;
        deleted.push(currFiles[index]);

        this.setState({filesDeleted: deleted});

        currFiles.splice(index, 1);
        this.handleChange(currFiles);
        //})
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
        let {value, type, maxLength} = this.props;
        let {preview} = this.state;
        let deleted = this.state.filesDeleted;

        return (
            <div className="w-file-list">
                {(!maxLength || (value && value.length < maxLength) || !value) && <Dropzone className="dropzone" activeClassName="w-gallery-add-active" onDrop={this.handleFileAdd.bind(this)}>
                    <span><Icon name={"Add"}/> {this.props.buttonTitle} </span>
                </Dropzone>}

                <div className={" " + (type == "gallery" ? "w-file-list-gallery" : "w-file-list-files")}>
                    {/*{deleted.map((el) => <div>Do usuni�cia: {el.name}</div>)}*/}
                    {value && type == "filelist" ? value.map((el, index) => <div className="w-file-list-element" key={el.name}>
                        <div className="w-file-list-name">
                            <a onClick={this.handleFileClick.bind(this, index)}><Icon name={this.isImage(el.path) ? "Photo2" : "TextDocument"}/>{el.name}</a>
                            {!el.uploaded && <div className="w-file-list-upload-info">Plik zostanie załadowany po zapisaniu formularza</div>}
                        </div>
                        <div className="w-file-list-size"><a href={el.path} download={true}><Icon name={"Download"}/></a></div>
                        <div className="w-file-list-size">{this.formatBytes(el.size)}</div>
                        <div className="w-file-list-remove"><a onClick={this.handleFileRemove.bind(this, index)}><Icon name={"Delete"}/> </a></div>
                    </div>) : null}
                    {/*  <pre>
                        {JSON.stringify(value, null, 2)}
                    </pre>*/}

                    {value && type == "gallery" && <SortableImageList
                        helperClass={"w-file-list-dragging"}
                        files={value}
                        onSortEnd={(oldIndex, newIndex, collection) => {
                            alert(oldIndex + " " + newIndex);
                        }}
                        useDragHandle={true}
                        lockToContainerEdges={true}
                        onDelete={this.handleFileRemove.bind(this)}
                        onClick={(index) => {
                            console.log(index);
                            this.setState({preview: value[index]});
                        }}

                    />}

                </div>
                {/*<pre>
                    {JSON.stringify(preview, null, 2)}
                </pre>*/}

                {preview && <Modal
                    show={true}
                    onHide={() => this.setState({preview: null})}
                    title={preview.name}
                    showHideLink={true}
                >
                    <img style={{maxWidth: 800, maxHeight: 600}} src={preview.path}/>

                </Modal>}
            </div>
        )
    }
}

export {Gallery, FileList};
