import * as React from "react";
import { alertDialog } from "../ConfirmDialog";

interface ITooltipProps {
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

export default class Tooltip extends React.PureComponent<ITooltipProps> {
    public static defaultProps: ITooltipProps = {
        visible: true,
        showLoadingIndicator: false,
    };

    constructor(props: ITooltipProps) {
        super(props);
    }

    public render() {
        return <>in progress</>;
    }
}

export const tooltip = () => alertDialog("In implementation");
