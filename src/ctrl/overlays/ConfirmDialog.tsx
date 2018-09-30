import { IModalProps, Modal } from "./Modal";
import * as React from "react";
import ReactDOM from "react-dom";
import { fI18n } from "../../utils/I18n";
import "./ConfirmDialog.sass";
import { RelativePositionPresets } from "./Positioner";

interface IConfirmModalProps extends IModalProps {
    showCancelLing?: boolean;
    onOk: () => any;
    cleanup: () => any;
}

class ConfirmDialog extends React.Component<IConfirmModalProps, any> {
    public promise: Promise<{}>;

    public static defaultProps: Partial<IConfirmModalProps> = {
        showCancelLing: true,
    };

    constructor(props: IConfirmModalProps) {
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
                <div
                    style={{ padding: 15 }}
                    className={this.props.target !== undefined ? "" : "w-modal-confirm-top-border"}
                >
                    {this.props.children}
                </div>
                <div style={{ padding: 10, paddingTop: 0, textAlign: "right" }}>
                    <button onClick={this.handleConfirm} className="btn btn-primary">
                        {fI18n.t("Tak")}
                    </button>
                    {this.props.showCancelLing && (
                        <button onClick={this.handleAbort} className="btn btn-default">
                            {fI18n.t("Anuluj")}
                        </button>
                    )}
                </div>
            </Modal>
        );
    }
}

export const confirmDialog = async (message: string, options: Partial<IConfirmModalProps> = {}) => {
    const props = { ...options };

    const parent = options.container ? options.container() : document.body;

    const wrapper = parent.appendChild(document.createElement("div"));

    let resolver: () => any;
    let rejector: () => any;

    const promise = new Promise((resolve, reject) => {
        resolver = resolve;
        rejector = reject;
    });

    const cleanup = () => {
        ReactDOM.unmountComponentAtNode(wrapper);
        wrapper.remove();
        rejector();
    };

    if (props.target !== undefined) {
        props.animation = props.animation || "from-up";
        props.shadow = props.shadow || false;
        props.relativePositionConf = props.relativePositionConf || RelativePositionPresets.bottomLeft;
    }

    const x: any = (
        <ConfirmDialog {...props} onOk={resolver} cleanup={cleanup}>
            <div>{message}</div>
        </ConfirmDialog>
    );

    ReactDOM.render(x, wrapper);

    return promise;
};

export const alertDialog = async (message: string, options: Partial<IConfirmModalProps> = {}) => {
    options.showCancelLing = false;
    return confirmDialog(message, options);
};
