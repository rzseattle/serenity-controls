import * as React from "react";

export class ErrorReporterLoader extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loaded: false,
            component: null,
        };
    }

    public componentDidMount() {
        import("./ErrorReporter").then((Reporter) => {
            this.setState({ loaded: true, component: Reporter.default });
        });
    }

    public render() {
        if (!this.state.loaded) {
            return <div>Loading ...</div>;
        } else {
            const Component = this.state.component;
            return <Component error={this.props.error} />;
        }
    }
}
