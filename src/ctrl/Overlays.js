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

        constructor(props) {
            super(props);
            this.state = {}

            this.targetElement = document.querySelector(props.container) || document.body;
            console.log(this.targetElement);

        }

        componentDidMount() {
            this.portalElement = document.createElement('div');
            //this.portalElement.classList.add('w-overlay')

            this.targetElement.appendChild(this.portalElement);
            this.componentDidUpdate();
        }

        componentWillUnmount() {

            this.targetElement.removeChild(this.portalElement);
        }


        componentDidUpdate() {

            ReactDOM.render(
                <div className="w-overlay">
                    <ComponentToRender
                        {...this.props}
                        overlayClose={this.handleClose.bind(this)}
                        containerElement={this.targetElement}
                    />
                </div>

                , this.portalElement);
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
        visible: PropTypes.bool,
        container: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        containerElement: PropTypes.node
    }
    static defaultProps = {
        visible: false
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {


        let p = this.props;
        return (<div className="w-modal" ref="body" style={{display: p.visible ? 'block' : 'none'}}>
            {p.visible ? <Shadow container={this.props.container}/> : null}
            {p.children}
        </div>)
    }

    componentDidUpdate() {


        let dim = this.props.containerElement.getBoundingClientRect();
        let x = dim.width;
        let y = dim.height;
        console.log(this.props.containerElement);
        console.log(dim);

        const body = ReactDOM.findDOMNode(this.refs.body);
        const dimentions = body.getBoundingClientRect();

        const styles = {
            top: ((y - dimentions.height) / 2 ) + 'px',
            left: ((x - dimentions.width) / 2) + 'px',

        }

        for (let i in styles) {
            body.style[i] = styles[i];
        }
    }

    componentDidMount() {

    }

}

const Modal = withPortal(ModalBody);
export {Modal, Shadow, withPortal}