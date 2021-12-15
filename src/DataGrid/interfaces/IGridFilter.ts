import React from "react";
import { IFilterValue } from "../../Table/Interfaces";

export interface IGridFilter {
    field: string | number;
    label: string;
    caption?: string;
    component: React.ComponentClass<{onApply:(val: IFilterValue) => unknown}>
    description?: string;
    config?: any
}

export interface IGridFilterValue {
    field: string;
    labelValue: string;
    value: any;
    condition: string;
}
