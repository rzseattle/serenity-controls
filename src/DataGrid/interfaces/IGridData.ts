export interface IGridData<T> {
    rowCount: number;
    rows: T;
    additional: Record<string, unknown>;
}
