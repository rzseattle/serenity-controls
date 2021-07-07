import * as React from "react";
import "./LoadingIndicator.sass";

interface ILoadingIndicatorProps {
    text?: string;
    size?: number;
}

const LoadingIndicator = ({ size = 1, text = null }: ILoadingIndicatorProps) => {
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

export { LoadingIndicator };
