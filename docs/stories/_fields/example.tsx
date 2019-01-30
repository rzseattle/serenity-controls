import * as React from "react";

interface IBaseXProps {
    base: string;
}

interface IBaseXState {
    bases: number;
}

export class BaseX extends React.Component<IBaseXProps, IBaseXState> {
    public render() {
        return <p>Base {this.props.base}</p>;
    }
}

interface IWithLoadingProps {
    loading: boolean;
}

const withLoading = <P extends object>(Component: React.ComponentType<P>) =>
    class WithLoading extends React.Component<P & IWithLoadingProps> {
        public render() {
            const { loading, ...props } = this.props as IWithLoadingProps;
            return loading ? <div>spinner</div> : <Component {...props} />;
        }
    };

export const Test2 = withLoading(BaseX);
