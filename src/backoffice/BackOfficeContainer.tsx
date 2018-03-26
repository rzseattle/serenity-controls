import * as React from 'react'
import * as StoreUtils from "./BackofficeStore";
import BackOfficePanel from 'frontend/src/backoffice/BackOfficePanel';

declare var window: any;


//const _store = newStore();

interface IBackOfficeContainerProps {
    route: string;
    input?: any;
}

interface IBackOfficeContainerState {
}

export class BackOfficeContainer extends React.Component<IBackOfficeContainerProps, IBackOfficeContainerState> {

    store: null

    constructor(props: IBackOfficeContainerProps, context: any) {
        super(props, context);


        this.store = StoreUtils.newStore();
        this.store.changeView(this.props.route);
    }

    componentDidMount() {



    }

    render() {
        //return "to jest container";
        return <div>

            <BackOfficePanel store={this.store} onlyBody={true} isSub={true}/>
        </div>
    }

}
