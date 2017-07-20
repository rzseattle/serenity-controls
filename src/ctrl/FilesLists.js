import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import {Modal} from './Overlays'

const DragHandle = SortableHandle(() => <a className="w-gallery-drag"><i className="fa fa-arrows"></i></a>); //

const ImageBox = SortableElement((props) => {
    const file = props.file;
    return ( <div>
        <a onClick={props.onClick}>
            <span></span>{<img src={file.path} alt=""/>}
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
                    onDelete={props.onDelete}

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
        filePreview: false
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
                {!this.props.files && <div>-- Brak --</div>}
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