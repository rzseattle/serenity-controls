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


                if (this.props.target) {
                    let targetPos;
                    if (typeof this.props.target == 'function') {
                        targetPos = this.props.target().getBoundingClientRect();
                    } else {
                        targetPos = this.props.target.getBoundingClientRect();
                    }
                    let element = document.getElementById('w-overlay-' + Portal.counter);
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
                        top: top + 'px',
                        left: left + 'px',
                        position: 'absolute',
                        display: 'block',
                    }

                    for (let i in styles) {
                        element.style[i] = styles[i];
                    }
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

        this.setState({
            opened: props.opened
        });
    }

    render() {

        if (!this.state.opened) {
            return null;
        }
        let p = this.props;
        return (<div className="w-modal" ref="body">
            {p.showClose && <a className="w-modal-close" style={{}} onClick={(e) => this.setState({opened: !this.state.opened})}> <i className="fa fa-close"></i></a>}
            {p.opened && <Shadow container={this.props.container}/>}
            {p.title && <div className="w-modal-title">{p.title}</div>}
            {p.children}

        </div>)
    }


    componentDidUpdate() {

        if (!this.state.opened) {
            if (this.props.onClose) {
                this.props.onClose()
            }
            return null;
        } else {
            if (this.props.onOpen) {
                this.props.onOpen()
            }
        }


        let dim = this.props.containerElement.getBoundingClientRect();
        let x = dim.width;
        let y = dim.height;

        const body = ReactDOM.findDOMNode(this.refs.body);
        const dimentions = body.getBoundingClientRect();

        const styles = {
            top: ((y - dimentions.height) / 2 ) + 'px',
            left: ((x - dimentions.width) / 2) + 'px',
        }

        for (let i in styles) {
            body.style[i] = styles[i];
        }
        //});

    }

    componentDidMount() {

    }

}

class TooltipBody extends React.Component {

    static propTypes = {

    }

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
    :
        null
    )

    }
}

const Modal = withPortal(ModalBody);
const Tooltip = withPortal(TooltipBody);
export {Modal, Shadow, Tooltip, withPortal}