import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import Modal from 'react-overlays/lib/Modal';
import Overlay from 'react-overlays/lib/Overlay';


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


class MyModal extends Component {

    static propTypes = {
        opened: PropTypes.bool,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
        showClose: PropTypes.bool,
        container: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        //containerElement: PropTypes.node
        positionOffset: PropTypes.integer
    }
    static defaultProps = {
        opened: false,
        showClose: true,
        positionOffset: 5
    }

    constructor(props) {
        super(props);
        this.state = {
            opened: props.opened,
            modalStyle: {}
        }
    }

    handleClose() {
        if (this.props.onHide) {
            this.props.onHide();
        }
    }

    componentDidMount() {
        this.calculatePos();
    }

    componentDidUpdate(prevProps, prevState) {
        this.calculatePos();
    }

    calculatePos() {
        const node = ReactDOM.findDOMNode(this.refs.modalBody);
        if (node) {
            let data = node.getBoundingClientRect();

            if (this.props.target) {
                const target = ReactDOM.findDOMNode(this.props.target())
                let targetData = target.getBoundingClientRect();
                node.style['top'] = targetData.top + targetData.height + this.props.positionOffset + "px";
                node.style['left'] = targetData.left + "px"
            } else {
                console.log("here");
                let x = Math.round(data.width / 2);
                let y = Math.round(data.height / 2);
                node.style['transform'] = `translate(-${x}px, -${y}px)`;
                node.style['top'] = "50%";
                node.style['left'] = "50%";
            }
        }
    }

    render() {
        let p = this.props;
        return (<Modal
            {...p}
            aria-labelledby='modal-label'
            className={'w-modal-container ' + p.className }
            backdropClassName="w-modal-shadow"
            onHide={this.handleClose.bind(this)}
        >
            <div className="w-modal" ref="modalBody">
                {p.showHideLink && <a className="w-modal-close" style={{}} onClick={this.handleClose.bind(this)}> <i className="fa fa-close"></i></a>}
                {p.title && <div className="w-modal-title">{p.title}</div>}
                {p.children}
            </div>
        </Modal>)
    }

}

class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.promiseResolve = this.promiseReject = null;
        this.promise = new Promise((resolve, reject) => {
            this.promiseResolve = resolve;
            this.promiseReject = reject;
        });
    }

    handleAbort() {
        this.promiseReject()
        this.props.cleanup();
    }

    handleConfirm() {
        this.promiseResolve();
        this.props.cleanup();
    }

    render() {
        return <MyModal {...this.props} className="w-modal-confirm" show={true}>
            <p style={{padding: 15, paddingBottom: 0}}>{this.props.children}</p>
            <div style={{padding: 10, paddingTop: 0, textAlign: 'right'}}>
                <button onClick={this.handleConfirm.bind(this)} className="btn btn-primary">ok</button>
                <button onClick={this.handleAbort.bind(this)} className="btn btn-default">anuluj</button>
            </div>
        </MyModal>
    }

}


const confirm = (message, options = {}) => {
    let props = {...options}

    const wrapper = document.body.appendChild(document.createElement('div'));
    let cleanup = () => {
        ReactDOM.unmountComponentAtNode(wrapper)
        setTimeout(wrapper.remove);
    }

    const component = ReactDOM.render(<ConfirmModal {...props} cleanup={cleanup}>
        <div>
            {message}
        </div>
    </ConfirmModal>, wrapper);


    return component.promise
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
            //ReactDOM.findDOMNode(this.refs.body).focus();
        }
    }

    handleBlur() {
        this.setState({opened: false});
    }

    render() {
        let p = this.props;
        return (
            <Overlay
                show={this.state.opened}
                onHide={() => this.setState({show: false})}
                placement={p.placement}
                container={p.container}
                shouldUpdatePosition={true}
                target={props => {
                    return ReactDOM.findDOMNode(p.target);
                }}
            >
                <div
                    tabIndex={1}
                    style={{display: this.state.opened ? 'block' : 'none', position: 'absolute'}}
                    className="w-tooltip"
                    autoFocus={true}
                    /*onBlur={this.handleBlur.bind(this)}*/
                    ref="body"
                >
                    {this.props.children}
                </div>
            </Overlay>
        )

    }
}


export {MyModal as Modal, Shadow, Tooltip, confirm}