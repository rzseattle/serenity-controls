import React from "react";
import { IGridColumnAssignedElement } from "./IGridColumnAssignedElement";
import { IGridDataAssignedElement } from "./IGridDataAssignedElement";
import { IGridStore } from "../config/GridContext";

export type IGridFilterComponent = React.ComponentType<{
    filter: IGridFilter;
    onApply: (filterValue: IGridFilterValue, hide?: boolean) => unknown;
}>;

interface IGridFilterBase extends IGridColumnAssignedElement, IGridDataAssignedElement {
    label: string;
    caption?: string;
    description?: string;
    config?: any;
    value?: IGridFilterValue;
    opened?: boolean;
}

interface IGridFilterWithComponent extends IGridFilterBase {
    component: IGridFilterComponent;
    filterType?: never;
}
interface IGridFilterWithType extends IGridFilterBase {
    filterType: string;
    component?: never;
}

export type IGridFilter = IGridFilterWithComponent | IGridFilterWithType;

export interface IGridFilterValue {
    value: any;
    condition: string;

    labelValue?: string;
    labelCondition?: string;
}
