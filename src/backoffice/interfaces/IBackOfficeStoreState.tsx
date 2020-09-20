import { IRouteElement } from "./IRouteElement";

export default interface IBackOfficeStoreState {
    basePath: string;
    viewInput: object;
    view: IRouteElement;
    viewData: object;
    viewServerErrors: any;
    isViewLoading: boolean;
    isPackageCompiling: boolean;
}
