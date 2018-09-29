import { IModalProps, Modal } from "./Modal";
import * as React from "react";
import ReactDOM from "react-dom";

interface IConfirmModalProps extends IModalProps {
    showCancelLing?: boolean;
}

class ConfirmDialog extends React.Component<IConfirmModalProps, any> {
    public promise: Promise<{}>;
    public promiseReject: any;
    public promiseResolve: any;
    public static defaultProps: Partial<IConfirmModalProps> = {
        showCancelLing: true,
    };

    constructor(props) {
        super(props);
    }

    public handleAbort = () => {
        this.props.cleanup();
    };

    public handleConfirm = () => {
        this.props.onOk();
        this.props.cleanup();
    };

    public render() {
        const modalProps: any = Object.assign({}, this.props);
        delete modalProps.cleanup;

        return (
            <Modal {...modalProps} className="w-modal-confirm" show={true}>
                <div style={{ padding: 15, borderTop: "solid #0078d7 10px" }}>{this.props.children}</div>
                <div style={{ padding: 10, paddingTop: 0, textAlign: "right" }}>
                    <button onClick={this.handleConfirm} className="btn btn-primary">
                        ok
                    </button>
                    {this.props.showCancelLing && (
                        <button onClick={this.handleAbort} className="btn btn-default">
                            anuluj
                        </button>
                    )}
                </div>
            </Modal>
        );
    }
}

export const confirmDialog = async (message, options: Partial<IConfirmModalProps> = {}) => {
    const props = { ...options };

    const parent = options.container ? options.container() : document.body;

    const wrapper = parent.appendChild(document.createElement("div"));

    let resolver, rejector;

    const promise = new Promise((resolve, reject) => {
        resolver = resolve;
        rejector = reject;
    });

    const cleanup = () => {
        ReactDOM.unmountComponentAtNode(wrapper);
        wrapper.remove();
        rejector();
    };

    const x: any = (
        <ConfirmDialog {...props} onOk={resolver} cleanup={cleanup}>
            <div>{message}</div>
        </ConfirmDialog>
    );

    ReactDOM.render(x, wrapper);

    return promise;
};
