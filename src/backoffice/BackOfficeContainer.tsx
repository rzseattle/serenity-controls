import * as React from "react";

import { BackofficeStore } from "src/ctrl/backoffice/BackofficeStore";
import { LoadingIndicator } from "../common/LoadingIndicator";
import { BackOfficePanel } from "./BackOfficePanel";

interface IBackOfficeContainerProps {
    route: string;
    input?: any;
    props?: any;
}

export class BackOfficeContainer extends React.Component<IBackOfficeContainerProps, { isLoading: boolean }> {
    public store: any = null;
    public static defaultProps: Partial<IBackOfficeContainerProps> = {
        props: {},
    };

    constructor(props: IBackOfficeContainerProps) {
        super(props);
        this.state = {
            isLoading: true,
        };

        this.store = new BackofficeStore();
        this.store.subStore = true;
        this.store.changeView(this.props.route);
        this.store.externalViewData = props.props;
        this.store.onViewLoadedArr.push(() => this.setState({ isLoading: false }));
    }

    public componentWillUnmount() {
        BackofficeStore.unregisterDebugData(this.props.route);
    }

    public render() {
        return (
            <>
                {this.state.isLoading && <LoadingIndicator text={"Ładuje"} />}
                <BackOfficePanel onlyBody={true} isSub={true} store={this.store} />
            </>
        );
    }
}
