export interface IGridController<T> {
    reload: () => unknown;
    getData: () => T[]
    getRowsCount: () => number
}
