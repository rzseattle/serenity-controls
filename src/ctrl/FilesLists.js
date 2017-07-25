import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import {Modal, Shadow} from './Overlays'
import {BForm} from '../layout/BootstrapForm'
import Dropzone from 'react-dropzone'
import Comm from '../lib/Comm';

const DragHandle = SortableHandle(() => <a className="w-gallery-drag"><i className="fa fa-arrows"></i></a>); //


const Progress = function (props) {


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
    if(file.type && file.type.indexOf('image') != -1)
        isImage = true;


    let icon = "fa-file";
    if(!isImage){

        if(file.path.indexOf(".pdf") != -1 || file.type == "application/pdf"){
            icon = 'fa-file-pdf-o'
        }
    }

    return ( <div>
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
            </div> }
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

class Gallery extends Component {

    static propsType = {
        files: PropTypes.array.isRequired,
        endpoint: PropTypes.string,
        onDelete: PropTypes.func,
        onSortEnd: PropTypes.func,
        onClick: PropTypes.func
    }
    static defaultProps = {
        files: [],
        filePreview: false,
        uploadData: []
    }

    constructor(props) {
        super(props);
        this.state = {
            files: props.files
        }

        this.uploadCount = 0;
    }


    componentWillReceiveProps(nextProps) {
        this.setState({files: nextProps.files});
    }

    handleFileAdd(files) {

        this.uploadCount += files.length;


        files.map(el => {
            let file = {path: el.preview, key: -1, name: el.name, uploaded: 0, type: el.type};

            this.state.files.push(file);
            let comm = new Comm(this.props.endpoint);
            comm.setData({file: el});
            comm.on("progress", (data) => {
                file.uploaded = data.percent;
                this.forceUpdate();
            });
            comm.on("success", () => {
                this.uploadCount--;
                delete file.uploaded
                if (this.uploadCount == 0) {
                    alert('all finiesh');
                    if (this.props.onSortEnd) {
                        this.props.onSortEnd(this.state.files, oldIndex, newIndex)
                    }
                }
                this.forceUpdate();
            })
            comm.send();
        })
        this.forceUpdate();

    }


    handleElementClick(file, e) {


        if (this.props.onClick) {
            this.props.onClick(file, e)
        } else {
            this.setState({filePreview: file})
        }
    }

    handleElementDelete(file, e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        if (this.props.onDelete) {
            this.props.onDelete(file, e)
        }

        return false;
    }


    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            files: arrayMove(this.state.files, oldIndex, newIndex),
        }, () => {
            if (this.props.onSortEnd) {
                this.props.onSortEnd(this.state.files, oldIndex, newIndex)
            }
        });
    };

    render() {
        return (
            <div className="w-gallery">
                {/*<Shadow/>*/}
                {!this.props.files && <div>-- Brak --</div>}
                <Dropzone style={{}} className="w-gallery-add" activeClassName="w-gallery-add-active" onDrop={this.handleFileAdd.bind(this)}>
                    <span><i className="fa fa-plus-circle"></i> Dodaj</span>
                </Dropzone>
                <SortableImageList
                    files={this.state.files}
                    onClick={this.handleElementClick.bind(this)}
                    onDelete={this.handleElementDelete.bind(this)}
                    onSortEnd={this.onSortEnd}
                    useDragHandle={true}
                    axis="yx"
                    helperClass="w-gallery-dragging"
                />
                {this.state.filePreview && <Modal
                    show={this.state.filePreview != false}
                    onHide={(e) => this.setState({filePreview: false})}
                    showHideLink={true}
                    top={100}
                >
                    <img style={{maxWidth: '800px'}} src={this.state.filePreview.path} alt=""/>
                </Modal>}
            </div>
        )
    }
}

class FileList extends Component {
    render() {
        return (
            <div>file list</div>
        )
    }
}

export {Gallery, FileList};