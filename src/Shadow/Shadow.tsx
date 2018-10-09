import { LoadingIndicator } from "../LoadingIndicator";
import * as React from "react";
import "./Shadow.sass";

interface IShadowProps {
    /**
     * Is visible
     */
    visible?: boolean;

    /**
     * Display loading indicator
     */
    showLoadingIndicator?: boolean;
    /**
     * Loading indicator text
     */
    showLoadingIndicatorText?: string;

    /**
     * Custom class name
     */
    customClass?: string;
}

export class Shadow extends React.PureComponent<IShadowProps> {
    public static defaultProps: Partial<IShadowProps> = {
        visible: true,
        showLoadingIndicator: false,
    };

    constructor(props: IShadowProps) {
        super(props);
    }

    public render() {
        return (
            <>
                {this.props.visible && (
                    <div className={"w-shadow " + (this.props.customClass ? this.props.customClass : "")}>
                        {this.props.showLoadingIndicator && (
                            <div className={"w-shadow-indicator"}>
                                <LoadingIndicator size={2} text={this.props.showLoadingIndicatorText} />
                            </div>
                        )}
                        {this.props.children}
                    </div>
                )}
            </>
        );
    }
}
