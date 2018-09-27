import React from "react";

export class MoreTextHelper extends React.Component<{ text: string }> {
    public state = {
        opened: false,
    };

    public render() {
        return (
            <>
                <div>
                    <a className={"btn btn-primary"} onClick={() => this.setState({ opened: !this.state.opened })}>
                        Click to add more text
                    </a>
                </div>
                {this.state.opened && <>{this.props.text}</>}
            </>
        );
    }
}
