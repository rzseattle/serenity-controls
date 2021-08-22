import { IArrowViewComponentProps } from "../PanelComponentLoader";

export interface IRouteElement {
    path: string
    controller?: string;
    method?: string;
    package?: string;
    routePath: string;
    baseRoutePath: string;
    _debug?: {
        file: string;
        line: number;
        template: string;
        componentExists: boolean;
        templateExists: boolean;
    };
    componentName: string;
    index?: number;
    namespace?: string;
    componentObject?: React.ComponentType<IArrowViewComponentProps>;
    useAutoRequest?: boolean;
}
