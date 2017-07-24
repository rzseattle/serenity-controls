import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import Modal from 'react-overlays/lib/Modal';


class Shadow extends Component {
    static defaultProps = {
        visible: true
    }

    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            {this.props.visible && <div className="w-shadow">
                {this.props.loader && <span className="loader">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
            </span>}
            </div>}
        </div>
    }

}


const modalStyle = {
    position: 'fixed',
    zIndex: 1040,
    top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
    ...modalStyle,
    zIndex: 'auto',
    backgroundColor: '#000',
    opacity: 0.15
};

const dialogStyle = function () {
    return {
        top: 50 + '%', left: 50 + '%',
        transform: `translate(-50%, -50%)`,
    };
};


class MyModal extends Component {

    static propTypes = {
        opened: PropTypes.bool,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
        showClose: PropTypes.bool,
        container: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        //containerElement: PropTypes.node
    }
    static defaultProps = {
        opened: false,
        showClose: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            opened: props.opened
        }
    }


    handleClose() {
        if (this.props.onHide) {
            this.props.onHide();
        }

    }

    render() {
        let p = this.props;


        return (<Modal
            {...p}

            aria-labelledby='modal-label'
            style={modalStyle}
            backdropStyle={backdropStyle}
            onHide={this.handleClose.bind(this)}
        >
            <div className="w-modal" style={dialogStyle()}>

                {p.showHideLink && <a className="w-modal-close" style={{}} onClick={this.handleClose.bind(this)}> <i className="fa fa-close"></i></a>}
                {p.title && <div className="w-modal-title">{p.title}</div>}
                {p.children}


            </div>
        </Modal>)


    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.opened == true && nextState.opened == false) {
            if (this.props.onClose) {
                this.props.onClose();
            }
        }
        else if (this.state.opened == false && nextState.opened == true) {
            if (this.props.onOpen) {
                this.props.onOpen()
            }
        }

    }

}

class Tooltip extends React.Component {

    static propTypes = {}

    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.target) {
            this.setState({opened: true});
        } else {
            this.setState({opened: false});
        }
        if (nextProps.opened) {
            this.setState({opened: nextProps.opened});
        }
    }


    componentDidUpdate() {
        if (this.state.opened) {
            ReactDOM.findDOMNode(this.refs.body).focus();
        }
    }

    handleBlur() {
        this.setState({opened: false});
    }

    render() {
        let p = this.props;
        return (
            <div
                tabIndex={1}
                style={{display: this.state.opened ? 'block' : 'none'}}
                className="w-tooltip"
                autoFocus={true}
                onBlur={this.handleBlur.bind(this)}
                ref="body"
            >
                {this.props.children}
            </div>

        )

    }
}


export {MyModal as Modal, Shadow, Tooltip}