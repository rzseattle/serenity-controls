export interface IRouteElement {
    _controller: string;
    _method: string;
    _package: string;
    _routePath: string;
    _baseRoutePath: string;
    _debug?: {
        file: string;
        line: number;
        template: string;
        componentExists: boolean;
        templateExists: boolean;
    };
    component: string;
    index: number;
    namespace: string;
    componentObject?: React.ComponentType;
}