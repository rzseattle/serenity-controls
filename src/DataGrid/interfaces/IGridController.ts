export interface IGridController<T extends  object = any> {
    reload: () => unknown;
    getData: () => T[];
    getRowsCount: () => number;
}
