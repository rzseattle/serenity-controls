import * as React from "react";

export class StateContainer extends React.Component<{ initialState: any; children: (set: any, state: any) => any },
    void
> {
    constructor(props) {
        super(props);
        this.state = props.initialState;
    }
    public set = (key: string, val: any) => {
        const state: any = this.state;
        //state[key] = val;

        console.log("here");
        console.log(state);
        this.setState(key);
    };

    public render() {
        const state = this.state;

        return this.props.children(this.set, state);
    }
}
