import React from "react";
import { IGridColumnAssignedElement } from "./IGridColumnAssignedElement";
import { IGridDataAssignedElement } from "./IGridDataAssignedElement";

export type IGridFilterComponent = React.ComponentType<{
    filter: IGridFilter;
    onApply: (filterValue: IGridFilterValue[]) => unknown;
    hide: () => unknown
}>;

interface IGridFilterBase extends IGridColumnAssignedElement, IGridDataAssignedElement {
    label: string;
    caption?: string;
    description?: string;
    config?: any;
    value?: IGridFilterValue[];
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
