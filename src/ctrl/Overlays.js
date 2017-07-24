import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';


const withPortal = (ComponentToRender, settings = {}) => {


    return class Portal extends Component {

        static propTypes = {
            container: PropTypes.any
        }
        static defaultProps = {
            placement: 'center'
        }


        constructor(props) {
            super(props);
            this.state = {}
            this.portalElement = null;
            this.containerElement = null;

        }

        getContainer(container) {
            container = typeof container === 'function' ? container() : container;
            return ReactDOM.findDOMNode(container) || document.body;
        }


        componentWillMount() {

        }

        componentDidMount() {
            this.componentDidUpdate();
        }

        componentWillReceiveProps(nextProps) {
            this.componentDidUpdate();
        }

        componentWillUnmount() {
            console.log(ComponentToRender.name, "odmontowuje");
            this.containerElement.removeChild(this.portalElement);
        }

        componentWillUpdate() {

        }

        renderOverlay() {
            this.containerElement = this.getContainer(this.props.container);
            this.portalElement = document.createElement('div');
            this.containerElement.appendChild(this.portalElement);
            console.log(ComponentToRender.name, "montuje");
        }

        componentDidUpdate() {

            var tid = setInterval(() => {
                if (document.readyState !== 'complete') return;
                clearInterval(tid);

                if (!this.portalElement) {
                    this.renderOverlay()
                }


                let pass = {...this.props};
                ReactDOM.unstable_renderSubtreeIntoContainer(this, <div className="w-overlay">
                        <ComponentToRender
                            {...pass}
                            overlayClose={this.handleClose.bind(this)}
                            containerElement={this.containerElement}
                        />
                    </div>
                    , this.portalElement);


                let target = this.props.target || document.body;

                let placement = settings.placement || this.props.placement;

                if (placement == "none") {
                    return;
                }

                let targetPos;
                if (typeof target == 'function') {
                    targetPos = target().getBoundingClientRect();
                } else {
                    targetPos = target.getBoundingClientRect();
                }

                let element = this.portalElement;
                let elementPos = element.firstChild.getBoundingClientRect();

                let offset = 0;

                let top = targetPos.top + ( (targetPos.height - elementPos.height) / 2);
                if (this.props.placement.indexOf('top') != -1) {
                    top = targetPos.top - elementPos.height - offset;
                }
                if (this.props.placement.indexOf('bottom') != -1) {
                    top = targetPos.top + targetPos.height + offset;
                }

                let left = targetPos.left + (targetPos.width - elementPos.width) / 2;
                if (this.props.placement.indexOf('left') != -1) {
                    left = targetPos.left - elementPos.width - offset;
                }

                if (this.props.placement.indexOf('right') != -1) {
                    left = targetPos.left + targetPos.width + offset;
                }


                let styles = {
                    top: (this.props.top || top) + 'px',
                    left: (this.props.left || left) + 'px',
                    position: 'absolute',
                    display: 'block',
                }

                for (let i in styles) {
                    this.portalElement.style[i] = styles[i];
                }


            }, 30);


        }

        handleClose() {
            ReactDOM.unmountComponentAtNode(this.portalElement);
        }

        render() {
            return null
        }
    }

}


class ShadowBody extends Component {
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

const Shadow = withPortal(ShadowBody, {placement: 'none'});


class ModalBody extends Component {

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

    componentWillReceiveProps(props) {
        if (props.opened === false && this.state.opened == true) {
            this.handleClose()
        }
        if (props.opened === true && this.state.opened == false) {
            this.handleOpen();
        }
        this.setState({
            opened: props.opened
        });
    }

    handleOpen() {
        this.setState({opened: true});

    }

    handleClose() {
        this.setState({opened: false});

    }

    handleKeyDown(e) {
        if (e.keyCode == 27) {
            this.handleClose();
        }
    }

    componentDidMount() {
        this.focusDiv();
    }

    componentDidUpdate() {
        this.focusDiv();
    }

    focusDiv() {
        if (this.refs.modal) {
            ReactDOM.findDOMNode(this.refs.modal).focus();
        }
    }

    render() {

        if (!this.state.opened) {
            return <div></div>;
        }
        let p = this.props;
        let s = this.state;
        return (
            <div tabIndex={1} autoFocus onKeyDown={this.handleKeyDown.bind(this)} ref="modal">
                {s.opened && <div className="w-shadow w-shadow-fixed"></div>}
                <div className="w-modal">
                    {p.showClose && <a className="w-modal-close" style={{}} onClick={this.handleClose.bind(this)}> <i className="fa fa-close"></i></a>}
                    {p.title && <div className="w-modal-title">{p.title}</div>}
                    {p.children}
                </div>
            </div>)
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

class TooltipBody extends React.Component {

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

const Modal = withPortal(ModalBody);
const Tooltip = withPortal(TooltipBody);
export {Modal, Shadow, Tooltip, withPortal}