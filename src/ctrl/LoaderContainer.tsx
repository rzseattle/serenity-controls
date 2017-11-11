import * as React from "react";
import Comm from "frontend/src/lib/Comm";
import {Datasource} from "frontend/src/lib/Datasource";

interface ILoaderContainerProps {
    datasource: Datasource;
    children: { (result: any): any }
    debug: boolean
}


export class LoaderContainer extends React.Component<ILoaderContainerProps, any> {

    public static defaultProps: Partial<ILoaderContainerProps> = {
        debug: false
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            data: {}
        }

    }

    componentDidMount() {
        this.props.datasource.onReady((result) => {
            this.setState({
                loaded: true,
                data: result
            });
        });

        this.props.datasource.resolve();
    }


    render() {

        return (
            <div>
                {!this.state.loaded ?
                    "Loading..." :
                    <div>
                        {this.props.children(this.state.data)}
                        {this.props.debug && <pre>{JSON.stringify(this.state.data, null, 2)}</pre>}
                    </div>
                }
            </div>
        )
    }
}
