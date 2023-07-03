export interface IGridController<T = any> {
    reload: () => unknown;
    getData: () => T[]
    getRowsCount: () => number
}
