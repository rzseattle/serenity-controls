import * as React from "react";

import BackOfficePanel from "frontend/src/backoffice/BackOfficePanel";
import { BackofficeStore } from "frontend/src/backoffice/BackofficeStore";

interface IBackOfficeContainerProps {
    route: string;
    input?: any;
    props?: any;
}

export class BackOfficeContainer extends React.Component<IBackOfficeContainerProps, null> {
    public store: any = null;
    public static defaultProps: Partial<IBackOfficeContainerProps> = {
        props: {},
    };

    constructor(props: IBackOfficeContainerProps) {
        super(props);

        this.store = new BackofficeStore();
        this.store.subStore = true;
        this.store.changeView(this.props.route);
        this.store.externalViewData = props.props;
    }

    public render() {
        return <BackOfficePanel onlyBody={true} isSub={true} store={this.store}  />;
    }
}
