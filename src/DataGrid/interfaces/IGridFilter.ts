import React from "react";
import { IGridColumnAssignedElement } from "./IGridColumnAssignedElement";
import { IGridDataAssignedElement } from "./IGridDataAssignedElement";

export type IGridFilterComponent = React.ComponentType<{
    filter: IGridFilter;
    onApply: (filterValue: IGridFilterValue, hide?: boolean) => unknown;
}>;

export interface IGridFilter extends IGridColumnAssignedElement, IGridDataAssignedElement {
    label: string;
    caption?: string;
    component: IGridFilterComponent;
    description?: string;
    config?: any;
    value?: IGridFilterValue;
    opened?: boolean;
}

export interface IGridFilterValue {
    value: any;
    condition: string;

    labelValue?: string;
    labelCondition?: string;
}
