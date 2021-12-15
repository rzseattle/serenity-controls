export interface IGridSorter {
    field: string;
    caption: string;
    column: string;
}

export interface IGridSorterValue {
    field: string;
    dir: "asc" | "desc";
}
