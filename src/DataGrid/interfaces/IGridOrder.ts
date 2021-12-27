export interface IGridOrder {
    field: string | number;
    caption?: string;
    column?: string;
}

export interface IGridOrderValue {
    field: string;
    dir: "asc" | "desc";
}
