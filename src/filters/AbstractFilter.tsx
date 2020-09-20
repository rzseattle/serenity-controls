import { IFilterValue } from "../Table/Interfaces";
import * as React from "react";

export interface IFilterProps {
    /**
     * Field name to apply filter
     */
    field: string;
    /**
     * Caption
     */
    caption: string;

    /**
     * On filter change
     * @param filterValue
     */
    onChange?: (filterValue: IFilterValue) => unknown;
    /**
     * On filter apply
     * @param filterValue
     */
    onApply?: (filterValue: IFilterValue) => unknown;
    /**
     * Some config values
     */
    config?: any;
    /**
     * Show apply button
     */
    showApply?: boolean;

    /**
     * Filter value
     */
    value: any;
}
export default class AbstractFilter<T> extends React.Component<T, unknown> {
    public static defaultProps: Partial<IFilterProps> = {
        config: {},
    };
}
