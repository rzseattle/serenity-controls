import * as React from 'react'

import BackOfficePanel from 'frontend/src/backoffice/BackOfficePanel';
import {BackofficeStore} from 'frontend/src/backoffice/BackofficeStore';

interface IBackOfficeContainerProps {
    route: string;
    input?: any;
}

interface IBackOfficeContainerState {
}

export class BackOfficeContainer extends React.Component<IBackOfficeContainerProps, IBackOfficeContainerState> {

    store: any = null

    constructor(props: IBackOfficeContainerProps, context: any) {
        super(props, context);

        this.store = new BackofficeStore();
        this.store.subStore = true;
        this.store.changeView(this.props.route);
    }

    render() {
        return <BackOfficePanel onlyBody={true} isSub={true} store={this.store}/>
    }

}
