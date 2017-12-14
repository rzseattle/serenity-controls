import * as React from "react";
import * as ReactDOM from 'react-dom';
import ResizeObserver from 'resize-observer-polyfill';
import {Icon} from "./Icon";

//import * as TweenLite from 'gsap/TweenLite'


interface IShadowProps {
    visible?: boolean,
    container?: { (): HTMLElement },
    loader?: boolean
}

class Shadow extends React.Component<IShadowProps, any> {
    public static defaultProps: IShadowProps = {
        visible: true,
        loader: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            {this.props.visible && <div className="w-shadow">
                {this.props.loader && <span className="loader loader-x3">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
            </span>}
            </div>}
        </div>;
    }

}


interface IModalProps {
    show: boolean,
    onShow?: { (): any },
    onHide?: { (): any },
    container?: { (): HTMLElement },
    target?: { (): HTMLElement },
    positionOffset?: number,
    recalculatePosition?: boolean,
    showHideLink?: boolean,
    title?: string,
    shadow?: boolean,
    layer?: boolean,
    top?: string | number,
    left?: string | number,
    bottom?: string | number,
    right?: string | number,
    className?: string,
    children: any,
    orientation?: string
    onOrientationChange?: { (type): any }

}

interface IModalState {
}

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component<IModalProps, IModalState> {
    el: HTMLDivElement;
    isObserved: boolean;
    modalBody: HTMLDivElement;


    static defaultProps = {
        show: false,
        positionOffset: 5,
        recalculatePosition: true,
        shadow: true,
        layer: true
    };

    constructor(props) {
        super(props);
        this.state = {
            opened: props.opened,
            modalStyle: {
                opacity: 0
            }
        };
        this.el = document.createElement('div');

    }


    handleClose() {

        if (this.props.onHide) {
            this.props.onHide();
        }
    }

    handleShow() {
        this.calculatePos();
        if (this.props.onShow) {
            this.props.onShow();
        }

        const ro = new ResizeObserver((entries, observer) => {
            for (const entry of entries) {
                const {left, top, width, height} = entry.contentRect;

                if (this.props.recalculatePosition) {
                    this.calculatePos();
                }
            }
        });

        ro.observe(ReactDOM.findDOMNode(this.modalBody));
        this.isObserved = true;
        /* if (false) {

             let s = {opacity: 1, top: 49};
             const node = ReactDOM.findDOMNode(this.modalBody);
             TweenLite.to(s, 0.2, {
                 opacity: 1,
                 top: 50,
                 ease: Power4.easeInOut,
                 onUpdate: () => {
                     node.style['opacity'] = s.opacity;
                     node.style['top'] = s.top + '%';


                 }
             });
         }*/

    }


    calculatePosition() {
        this.calculatePos();
    }

    componentWillReceiveProps(nextProps: IModalProps) {
        if (this.props.show == false && nextProps.show == true) {
            this.handleShow();
        }
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
        if (this.props.show) {
            this.handleShow();
        }
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    componentDidUpdate(){
        if (this.props.show) {
            this.calculatePos();
        }
    }

    calculatePos() {


        let container = this.props.container ? this.props.container() : document.body;
        let containerSize = container.getBoundingClientRect();

        const node = ReactDOM.findDOMNode(this.modalBody);

        if (node) {
            let data = node.getBoundingClientRect();

            if (this.props.target) {
                const target = ReactDOM.findDOMNode(this.props.target());
                let targetData = target.getBoundingClientRect();
                let left = targetData.left;
                if (left + data.width > containerSize.width) {
                    left = containerSize.width - data.width - this.props.positionOffset;
                }
                let top = targetData.top + targetData.height + this.props.positionOffset;
                if (top + data.height > containerSize.height || (this.props.orientation && this.props.orientation.indexOf("top") != -1)) {
                    //top = containerSize.height - data.height - this.props.positionOffset;
                    top = targetData.top - data.height - this.props.positionOffset;
                    if (this.props.onOrientationChange) {
                        this.props.onOrientationChange("top");
                    }
                }

                node.style['top'] = top + 'px';
                node.style['left'] = left + 'px';
            } else {

                let x: number = Math.round(Math.min(data.width / 2, (window.innerWidth) / 2 - 5));
                let y = Math.round(Math.min(data.height / 2, (window.innerHeight / 2) - 5));
                x = this.props.left != undefined || this.props.right != undefined ? 0 : x;
                y = this.props.top != undefined || this.props.bottom != undefined ? 0 : y;
                node.style['transform'] = `translate(-${x}px, -${y}px)`;


                if (this.props.left != undefined) {
                    node.style['left'] = this.props.left + (Number.isNaN(this.props.left as any) ? '' : 'px');
                }
                if (this.props.right != undefined) {
                    node.style['right'] = this.props.right + (Number.isNaN(this.props.right as any) ? '' : 'px');
                }
                if (this.props.left == undefined && this.props.right == undefined) {
                    node.style['left'] = '50%';
                }

                if (this.props.top != undefined) {
                    node.style['top'] = this.props.top + (Number.isNaN(this.props.top as any) ? '' : 'px');
                }
                if (this.props.bottom != undefined) {
                    node.style['bottom'] = this.props.bottom + (Number.isNaN(this.props.bottom as any) ? '' : 'px');
                }

                if (this.props.top == undefined && this.props.bottom == undefined) {
                    node.style['top'] = '50%';
                }
            }
        }

    }

    shouldComponentUpdate(nextProps: IModalProps) {
        //kiedy jest pokazany lub zmienia stan z pokazanego w schowany
        return nextProps.show || (this.props.show && !nextProps.show);
    }

    render() {

        let p = this.props;

        return ReactDOM.createPortal(<div
            className={(this.props.layer ? 'w-modal-container ' : '') + p.className || ""}
            style={{
                display: (this.props.show ? "block" : "none"),
                backgroundColor: (this.props.shadow ? "rgba(0, 0, 0, 0.15)" : "transparent"),
            }}
            onClick={this.handleClose.bind(this)}
        >

            <div className="w-modal" ref={el => this.modalBody = el} onClick={(e) => e.stopPropagation()}>
                {p.showHideLink &&
                <a className="w-modal-close" style={{}} onClick={this.handleClose.bind(this)}>
                    <Icon name="ChromeClose" />
                </a>}
                {p.title && <div className="w-modal-title">{p.title}</div>}
                {this.props.show ? p.children : null}
            </div>
        </div>, this.el);
    }

}


class ConfirmModal extends React.Component<any, any> {
    promise: Promise<{}>;
    promiseReject: any;
    promiseResolve: any;

    constructor(props) {
        super(props);
        this.promiseResolve = this.promiseReject = null;
        this.promise = new Promise((resolve, reject) => {
            this.promiseResolve = resolve;
            this.promiseReject = reject;
        });
    }

    handleAbort() {
        this.promiseReject();
        this.props.cleanup();
    }

    handleConfirm() {
        this.promiseResolve();

        this.props.cleanup();
    }

    render() {
        let modalProps: any = Object.assign({}, this.props);
        delete modalProps.cleanup;

        return <Modal {...modalProps} className="w-modal-confirm" show={true}>
            <div style={{padding: 15}}>{this.props.children}</div>
            <div style={{padding: 10, paddingTop: 0, textAlign: 'right'}}>
                <button onClick={this.handleConfirm.bind(this)} className="btn btn-primary">ok
                </button>
                <button onClick={this.handleAbort.bind(this)} className="btn btn-default">anuluj
                </button>
            </div>
        </Modal>;
    }

}


interface IConfirmConf {
    container?: { (): HTMLElement },
    target?: { (): HTMLElement },
}



export const tooltip = (content, options) => {
    let props = {...options};

    let parent =  document.body;

    const wrapper = parent.appendChild(document.createElement('div'));
    let cleanup = () => {
        ReactDOM.unmountComponentAtNode(wrapper);
        wrapper.remove();
    };

    const component = ReactDOM.render(<Tooltip {...props} >
        <div>
            {content}
        </div>
    </Tooltip>, wrapper);


    return cleanup;
};

const confirm = (message, options: IConfirmConf = {}) => {
    let props = {...options};

    let parent = options.container ? options.container() : document.body;

    const wrapper = parent.appendChild(document.createElement('div'));
    let cleanup = () => {
        ReactDOM.unmountComponentAtNode(wrapper);
        wrapper.remove();
    };

    const component = ReactDOM.render(<ConfirmModal {...props} cleanup={cleanup}>
        <div>
            {message}
        </div>
    </ConfirmModal>, wrapper);


    return component.promise;
};


class Tooltip extends React.Component<any, any> {

    public static defaultProps = {
        layer: true,
        orientation: 'bottom left edge'
    }


    constructor(props) {
        super(props);
        this.state = {
            brakeLeft: 0,
            orientation: this.props.orientation
        };
    }

    componentDidMount() {
        let targetPos = this.props.target().getBoundingClientRect();
        let center = Math.round(/*targetPos.left -*/ (targetPos.width / 2));
        this.setState({brakeLeft: center});
    }

    componentDidUpdate() {
        //let targetPos = this.props.target().getBoundingClientRect();
        //let center = Math.round(targetPos.left - ( targetPos.width / 2 ));
        //this.setState({brakeLeft: center});
    }

    handleBlur() {
        this.setState({opened: false});
    }

    orientationChange(type) {
        //this.setState({orientation: 'top left edge'})
    }

    render() {
        let p = this.props;
        return (<Modal
            show={true}
            target={this.props.target}
            shadow={false}
            layer={this.props.layer}
            onHide={this.props.onHide}
            className={"w-tooltip " + (this.state.orientation.indexOf("top") != -1 ? "w-tooltip-top" : "")}
            onOrientationChange={this.orientationChange.bind(this)}
            orientation={this.state.orientation}
        >
            <div className="w-toolbar-brake" style={{left: this.state.brakeLeft}}/>
            <div className="w-toolbar-content">
                {p.children}
            </div>


        </Modal>);
    }
}


export {Modal, Shadow, Tooltip, confirm};
