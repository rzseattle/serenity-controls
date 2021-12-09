export interface IFilter {
    field: string | number | symbol;
    caption?: string;
    config?: any;
    onChange?: (value: IFilterValue) => any;
    value?: IFilterValue;
    component: any;
}

export interface IFilterValue {
    field: string | number | symbol;
    value: any;
    condition: string;
    caption: string;
    labelCaptionSeparator: string;
    label: string;
}
