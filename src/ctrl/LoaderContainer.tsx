import * as React from "react";
import { Datasource } from "../lib/Datasource";
import { LoadingIndicator } from "./LoadingIndicator";
import { Shadow } from "./Overlays";
import PrintJSON from "../utils/PrintJSON";

interface ILoaderContainerProps {
    /**
     * Datasource object
     */
    datasource: Datasource;
    children: (result: any) => any;
    /**
     * Displays loaded data on bottom of container
     */
    debug?: boolean;
    /**
     * Text to show while loading
     */
    indicatorText?: string;

    /**
     * Displays content with not loaded data and refreshing it after data are loaded
     */
    prerender?: boolean;
}

export class LoaderContainer extends React.Component<ILoaderContainerProps, any> {
    public static defaultProps: Partial<ILoaderContainerProps> = {
        debug: false,
        prerender: false,
        indicatorText: null,
    };

    constructor(props: ILoaderContainerProps) {
        super(props);
        this.state = {
            loaded: false,
            data: null,
        };
    }

    public load = () => {
        this.setState(
            {
                loaded: false,
                data: null,
            },
            () => this.props.datasource.resolve(),
        );
    };

    public componentDidMount() {
        this.props.datasource.observe((result: any) => {
            this.setState({
                loaded: true,
                data: result,
            });
        });
        // setTimeout(() => this.props.datasource.resolve() , 200)
        this.props.datasource.resolve();
    }

    public render() {
        const { prerender, debug, indicatorText } = this.props;
        const { loaded } = this.state;

        return (
            <div style={{ position: "relative" }}>
                {!loaded && prerender && <Shadow loader={true} />}
                {!loaded && !prerender && <LoadingIndicator text={indicatorText} />}
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
