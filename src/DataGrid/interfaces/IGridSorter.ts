export interface IGridSorter {
    field: string | number;

    caption: string;
    column: string;
}

export interface IGridSorterValue {
    field: string;
    dir: "asc" | "desc";
}
