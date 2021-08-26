import * as React from "react";
import { LoadingIndicator } from "../LoadingIndicator";

import { PrintJSON } from "../PrintJSON";
import { Shadow } from "../Shadow";

export interface IPlaceholderProps {
    /**
     * Datasource object
     */
    promise: Promise<any>;
    children: (result: any) => any;
    /**
     * Displays loaded data on bottom of container
     */
    debug?: boolean;

    /**
     * Show loading indicator
     */
    loadingIndicator?: boolean;

    /**
     * Text to show while loading
     */
    indicatorText?: string;

    shadow?: boolean;

    /**
     * Displays content with not loaded data and refreshing it after data are loaded
     */
    prerender?: boolean;
}

export class Placeholder extends React.Component<IPlaceholderProps, any> {
    public static defaultProps: Partial<IPlaceholderProps> = {
        debug: false,
        prerender: false,
        loadingIndicator: false,
        indicatorText: null,
        shadow: false,
    };

    constructor(props: IPlaceholderProps) {
        super(props);
        this.state = {
            loaded: false,
            data: null,
        };
    }

    /*public load = () => {
        this.setState(
            {
                loaded: false,
                data: null,
            },
        );
    };*/

    public componentDidMount() {
        this.props.promise
            .then((result: any) => {
                this.setState({
                    loaded: true,
                    data: result,
                });
            })
            .catch((reason) => {
                alert(reason);
                this.setState({
                    loaded: true,
                    data: reason,
                });
            });
    }

    public render() {
        const { prerender, debug, indicatorText, loadingIndicator, shadow } = this.props;
        const { loaded } = this.state;
        //style={{ position: "relative", height: "100%" }}
        return (
            <div>
                {!loaded && !prerender && loadingIndicator && <LoadingIndicator text={indicatorText} />}
                {!loaded && prerender && (loadingIndicator || shadow) && (
                    <Shadow showLoadingIndicator={loadingIndicator} showLoadingIndicatorText={indicatorText} />
                )}
                {(loaded || (!loaded && prerender)) && this.props.children(this.state.data)}
                {debug && (
                    <div style={{ padding: 10, margin: 5, border: "solid 1px grey" }}>
                        <b>Debug:</b>
                        <br />
                        <PrintJSON json={this.state.data} />
                    </div>
                )}
            </div>
        );
    }
}
