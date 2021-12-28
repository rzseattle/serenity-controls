export interface IGridOrder {
    field: string | number;
    applyTo?: string | number;
    caption?: string;
    dir?: "asc" | "desc";
}
