export interface IBackOfficestoreAPI {
    changeView: (path: string, input: any, callback: () => any) => any;
    onViewLoad: (callback: CallableFunction) => any;
    onViewLoaded: (callback: CallableFunction) => any;
}
