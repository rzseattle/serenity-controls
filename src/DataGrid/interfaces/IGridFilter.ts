import React from "react";
import { IGridColumnAssignedElement } from "./IGridColumnAssignedElement";
import { IGridDataAssignedElement } from "./IGridDataAssignedElement";

export type IGridFilterContainer = React.ComponentType<{
    filter: IGridFilter;
    onChange: (filterValue: IGridFilterValue[]) => unknown;
}>;
export type IGridFilterComponent = React.ComponentType<{
    filter: IGridFilter;
    onValueChange: (filterValue: IGridFilterValue[]) => unknown;
    onFilterChange: (filter: IGridFilter) => unknown;
    showCaption?: boolean;
    autoFocus?: boolean;
    apply?: (value: IGridFilterValue[]) => any;
    cancel?: () => any;
}>;

interface IGridFilterBase extends IGridColumnAssignedElement, IGridDataAssignedElement {
    //label: string;
    caption?: string;
    description?: string;
    config?: any;
    isInAdvancedMode?: boolean;
    value?: IGridFilterValue[];
    selfManagedSubmission?: boolean;
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
    labelValue?: string | JSX.Element;
    labelCondition?: string | JSX.Element;
    group?: number;
    operator?: "and" | "or";
}
