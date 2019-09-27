import customers_index_customers_index from "../../../../../app/views/crm/customers/index.component";
import { IArrowViewComponentProps } from "../PanelComponentLoader";

export interface IRouteElement {
    controller: string;
    method: string;
    package: string;
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
    index: number;
    namespace: string;
    componentObject?: React.ComponentType<IArrowViewComponentProps>;
}
