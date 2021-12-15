export interface IGridFilter {
    field: string;
    label: string;
    caption?: string;
    description?: string;
}

export interface IGridFilterValue {
    field: string;
    labelValue: string;
    value: any;
    condition: string;
}
