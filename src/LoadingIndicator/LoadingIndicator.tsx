import * as React from "react";
import "./LoadingIndicator.sass";

const LoadingIndicator = ({ size = 1, text = null }: { text?: string; size?: number }) => {
    return (
        <div className="w-loading-indicator">
            <div>
                <span className={"size" + size}>
                    <i />
                    <i />
                    <i />
                    <i />
                </span>
                {text && <div className="w-loading-indicator-text">{text}</div>}
            </div>
        </div>
    );
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoadingIndicatorDots = ({ size = 1, text = null }: { text?: string; size?: number }) => {
    return (
        <div className="w-loading-indicator-dots">
            <div className="lds-grid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export { LoadingIndicator, LoadingIndicatorDots };
