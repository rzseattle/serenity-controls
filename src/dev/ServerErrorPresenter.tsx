import * as React from "react";
import RouterException from "../backoffice/RouterException";
import {RouteVisualization} from "./RouteVisualization";

declare var PRODUCTION: boolean;

interface IProps {
    error: any;

}

interface IState {

}

export class ServerErrorPresenter extends React.Component<IProps, IState> {

    constructor(props) {
        super(props);

    }

    public render() {
        const {error} = this.props;

        return <div>
            {error !== null && (
                <div style={{margin: 10, padding: 10, backgroundColor: "white"}}>
                    {error.url !== undefined && (
                        <div>
                            <ShowStack input={error.response}/>
                            <pre>{error.url}</pre>
                            <pre style={{maxHeight: 200, overflow: "auto"}}>{JSON.stringify(error.input, null, 2)}</pre>

                        </div>
                    )}
                    {typeof error === "string" && <div>{error}</div>}

                    {!PRODUCTION && error instanceof RouterException && (
                        <div>
                            {error.message}
                            <hr/>
                            <RouteVisualization/>
                        </div>
                    )}

                </div>
            )}
        </div>;
    }

}

const ShowStack = (props) => {
    let stack;
    const error = props.input;

    if (typeof error == "string") {
        try {
            stack = JSON.parse(error);
        } catch (e) {
            return <div>{error}</div>;
        }
    } else {
        stack = error;
    }
    if (stack.__arrowException === undefined) {
        return <pre>{JSON.stringify(stack, null, 2)}</pre>;
    }

    stack = stack.__arrowException;

    return <div>
        <div><strong>[{stack.code}] {stack.msg}</strong></div>
        <hr/>
        <div>{stack.file}:{stack.line}</div>
        <hr/>
        <pre>{stack.trace}</pre>
    </div>;

};
