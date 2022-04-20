import * as React from "react";

import ReactDOM from "react-dom";

interface IPortalProps {
    container?: () => HTMLElement;
    children: React.ReactNode;
}

export class Portal extends React.Component<IPortalProps> {
    public el: HTMLElement;
    private modalRoot: HTMLElement;

    public static defaultProps = {};

    constructor(props: IPortalProps) {
        super(props);

        this.el = document.createElement("div");
    }

    public componentDidMount() {
        if (this.props.container != undefined) {
            this.modalRoot = this.props.container();
        } else {
            this.modalRoot = document.getElementById("modal-root");
            if (!this.modalRoot) {
                throw new Error("Modal root element not found");
            }
        }

        this.modalRoot.appendChild(this.el);
    }

    public componentWillUnmount() {
        this.modalRoot.removeChild(this.el);
    }

    public render() {
        return <>{ReactDOM.createPortal(this.props.children, this.el)}</>;
    }
}
