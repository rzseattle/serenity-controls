export interface IFilter {
    field: string,
    caption?: string,
    config?: any,
    onChange?: (value: IFilterValue) => any
    component: any
}

export interface IFilterValue {
    field: string
    value: any,
    condition: string,
    caption: string,
    labelCaptionSeparator: string,
    label: string
}
