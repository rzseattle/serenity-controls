import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

const withPortal = (ComponentToRender, styles = {}) => {

    return class Portal extends Component {
        portalElement = null;
        targetElement = null;
        static propTypes = {
            container: PropTypes.any
        }
        static defaultProps = {
            placement: 'center'
        }
        static counter = 0;

        constructor(props) {
            super(props);
            this.state = {}

            this.targetElement = document.querySelector(props.container) || document.body;



        }

        componentDidMount() {

            this.portalElement = document.createElement('div');
            //this.portalElement.classList.add('w-overlay')

            this.targetElement.appendChild(this.portalElement);
            this.componentDidUpdate();
            Portal.counter = Portal.counter + 1;
        }

        componentWillUnmount() {

            this.targetElement.removeChild(this.portalElement);
        }


        componentDidUpdate() {


            var tid = setInterval(() => {
                if (document.readyState !== 'complete') return;
                clearInterval(tid);


                let pass = {...this.props};
                ReactDOM.render(
                    <div className="w-overlay" id={'w-overlay-' + Portal.counter}>
                        <ComponentToRender
                            {...pass}
                            overlayClose={this.handleClose.bind(this)}
                            containerElement={this.targetElement}
                        />
                    </div>
                    , this.portalElement);

                let target = this.props.target || document.body;


                let targetPos;
                if (typeof target == 'function') {
                    targetPos = target().getBoundingClientRect();
                } else {
                    targetPos = target.getBoundingClientRect();
                }
                let element = document.getElementById('w-overlay-' + Portal.counter);
                let elementPos = element.firstChild.getBoundingClientRect();

                console.log('w-overlay-' + Portal.counter);
                const styles = {
                    top: ((targetPos.top + targetPos.height  + 5)  ) + 'px',
                    left: ( targetPos.left  + (targetPos.width - elementPos.width) / 2) + 'px',
                    position: 'absolute',
                    display: 'block'
                }
                console.log(styles);


                for (let i in styles) {
                    element.style[i] = styles[i];
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
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="w-shadow"/>

    }

}

const Shadow = withPortal(ShadowBody,);


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

    render() {

        if (!this.state.opened) {
            return <div></div>;
        }
        let p = this.props;
        return (<div className="w-modal" ref="body">
            {p.showClose && <a className="w-modal-close" style={{}} onClick={this.handleClose.bind(this)}> <i className="fa fa-close"></i></a>}
            {p.opened && <Shadow container={this.props.container}/>}
            {p.title && <div className="w-modal-title">{p.title}</div>}
            {p.children}

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


class TooltipBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }
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
    :
        null
    )

    }
}

const Modal = withPortal(ModalBody);
const Tooltip = withPortal(TooltipBody);
export {Modal, Shadow, Tooltip, withPortal}T