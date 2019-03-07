import * as React from "react";
import { Icon } from "../Icon";
import { render } from "react-dom";

interface ICopyableProps {
    toCopy?: string;
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
        icon: "Copy",
        copyInProgress: false,
    };

    public handleCopyClick = () => {
        this.setState({ copyInProgress: true }, () => {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(this.props.toCopy || this.props.hideContent ? this.nodeToCopy : this.node);
            selection.removeAllRanges();
            selection.addRange(range);
            try {
                document.execCommand("copy");
                selection.removeAllRanges();

                this.setState({ icon: "CheckMark", copyInProgress: false });

                setTimeout(() => {
                    this.setState({ icon: "Copy" });
                }, 500);
            } catch (e) {
                alert("Can't copy, hit Ctrl+C!");
            }
        });
    };

    public render() {
        const { icon, copyInProgress } = this.state;
        const { toCopy, hideContent, label } = this.props;

        return (
            <>
                {!hideContent && <span ref={(el) => (this.node = el)}>{this.props.children}</span>}
                {(toCopy || hideContent) && (
                    <span style={{ display: copyInProgress ? "block" : "none" }} ref={(el) => (this.nodeToCopy = el)}>
                        {toCopy}
                        {hideContent && <>{this.props.children}</>}
                    </span>
                )}

                <a
                    onClick={this.handleCopyClick}
                    style={{ cursor: "pointer", marginLeft: toCopy ? 0 : 10 }}
                    title={"Skopiuj"}
                >
                    {label} <Icon name={icon} />
                </a>
            </>
        );
    }
}
