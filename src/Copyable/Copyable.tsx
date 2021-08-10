import * as React from "react";

import { LoadingIndicator } from "../LoadingIndicator";
import "./Copyable.sass";
import { BiCopy, MdDone } from "react-icons/all";

interface ICopyableProps {
    toCopy?: string;
    getToCopyString?: Promise<string>;
    label?: string;
    hideContent?: boolean;
}

export class Copyable extends React.Component<ICopyableProps> {
    public node: HTMLSpanElement;
    public nodeToCopy: HTMLSpanElement;

    public static defaultProps = {
        hideContent: false,
        label: "",
    };

    public state = {
        icon: BiCopy,
        copyInProgress: false,
        resultOfPromise: "",
        isLoading: false,
    };

    public handleCopyClick = () => {
        const runSelection = () => {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(
                this.props.toCopy || this.props.hideContent || this.props.getToCopyString ? this.nodeToCopy : this.node,
            );
            selection.removeAllRanges();
            selection.addRange(range);
            try {
                document.execCommand("copy");
                selection.removeAllRanges();

                this.setState({ icon: MdDone, copyInProgress: false });

                setTimeout(() => {
                    this.setState({ icon: BiCopy });
                }, 500);
            } catch (e) {
                alert("Can't copy, hit Ctrl+C!");
            }
        };

        this.setState({ copyInProgress: true }, () => {
            if (this.props.getToCopyString) {
                this.setState({ isLoading: true });
                this.props.getToCopyString.then((result) => {
                    this.setState({ resultOfPromise: result, isLoading: false }, () => {
                        runSelection();
                    });
                });
            } else {
                runSelection();
            }
        });
    };

    public render() {
        const { icon, copyInProgress, resultOfPromise, isLoading } = this.state;
        const { toCopy, hideContent, label, getToCopyString } = this.props;

        const Icon = icon;
        return (
            <span className="w-copyable">
                {!hideContent && <span ref={(el) => (this.node = el)}>{this.props.children}</span>}
                {(toCopy || hideContent || getToCopyString !== null) && (
                    <span style={{ display: copyInProgress ? "block" : "none" }} ref={(el) => (this.nodeToCopy = el)}>
                        {toCopy}
                        {resultOfPromise}
                        {hideContent && <>{this.props.children}</>}
                    </span>
                )}{" "}
                {label ? label + " " : " "}
                <a onClick={this.handleCopyClick} style={{ cursor: "pointer", marginLeft: 10 }} title={"Skopiuj"}>
                    {isLoading ? (
                        <div className={"w-copyable-loading-container"}>
                            <LoadingIndicator />
                        </div>
                    ) : (
                        <Icon />
                    )}
                </a>
            </span>
        );
    }
}
