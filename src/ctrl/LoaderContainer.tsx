import * as React from "react";
import Comm from "frontend/src/lib/Comm";

interface ILoaderContainerProps {
    url: string;
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
        Comm._post(this.props.url, {}).then((result) => {
            this.setState({
                loaded: true,
                data: result
            })

        })
    }


    render() {

        return (
            <div>
                {!this.state.loaded ?
                    "Loading..." :
                    <div>
                        {this.props.children(this.state.data)}
                        {this.props.debug&&<pre>{JSON.stringify(this.state.data, null, 2)}</pre>}
                    </div>
                }
            </div>
        )
    }
}
