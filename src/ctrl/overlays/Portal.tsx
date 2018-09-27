import * as React from "react";
import ReactDOM from "react-dom";

export class Portal extends React.PureComponent {
    public el: HTMLDivElement;
    private modalRoot: HTMLElement;

    public static defaultProps = {};

    constructor(props = {}) {
        super(props);
        this.el = document.createElement("div");
    }

    public componentDidMount() {
        this.modalRoot = document.getElementById("modal-root");
        this.modalRoot.appendChild(this.el);
    }

    public componentWillUnmount() {
        this.modalRoot.removeChild(this.el);
    }

    public render() {
        const p = this.props;
        return ReactDOM.createPortal(p.children, this.el);
    }
}
