import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import {Modal, Shadow} from './Overlays'
import {BForm} from '../layout/BootstrapForm'
import Dropzone from 'react-dropzone'

const DragHandle = SortableHandle(() => <a className="w-gallery-drag"><i className="fa fa-arrows"></i></a>); //

const ImageBox = SortableElement((props) => {
    const file = props.file;
    let isImage = true;
    if (!file.path.match(/.(jpg|jpeg|png|gif)$/i))
        isImage = false;

    return ( <div>
        <a onClick={props.onClick}>
            <span></span>{isImage?<img src={file.path} alt=""/>:<i className="fa fa-file"></i>}
            <div className="w-gallery-on-hover">
                <div>{file.name}</div>
                <a onClick={props.onDelete} className="w-gallery-delete"><i className="fa fa-times"></i></a>
                <DragHandle/>
            </div>
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
    }


    componentWillReceiveProps(nextProps) {
        this.setState({files: nextProps.files});
    }

    handleFileAdd(files) {
        console.log(files)
        files.map( el => this.state.files.push({ path: el.preview, key: -1, name: el.name }))
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
                    opened={this.state.filePreview != false}
                    onClose={(e) => this.setState({filePreview: false})}
                    showClose={true}
                    top={100}
                >
                    <img style={{maxWidth: '800px'}} src={this.state.filePreview.path} alt=""/>
                </Modal>}
                <BForm data={this.state.uploadData} >
                    <input type="submit" value="ok"/>
                </BForm>
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