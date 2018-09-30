import { IFilter } from "../filters/Intefaces";

import { IOption } from "../fields/Interfaces";
import DateFilter from "./DateFilter";
import NumericFilter from "./NumericFilter";
import TextFilter from "./TextFilter";
import ConnectionFilter from "./ConnectionFilter";
import SelectFilter from "./SelectFilter";
import SwitchFilter from "./SwitchFilter";

export class FilterHelper {
    private data: IFilter;

    constructor(initData: Partial<IFilter>) {
        this.data = {
            field: null,
            component: null,
            ...initData,
        };
    }

    public static date(field: string, caption: string) {
        return new FilterHelper({
            field,
            caption,
            component: DateFilter,
        });
    }

    public static number(field: string, caption: string) {
        return new FilterHelper({
            field,
            caption,
            component: NumericFilter,
        });
    }

    public static text(field: string, caption: string, showFilterOptions = true) {
        return new FilterHelper({
            field,
            caption,
            component: TextFilter,
            config: {
                showFilterOptions,
            },
        });
    }

    public static connection(field: string, caption: string, config: any) {
        return new FilterHelper({
            field,
            caption,
            component: ConnectionFilter,
            config,
        });
    }

    public static select(
        field: string,
        caption: string,
        content: IOption[],
        multi: boolean = false,
        defaultValue = "",
    ) {
        return new FilterHelper({
            field,
            caption,
            config: {
                multiselect: multi,
                content,
                default: defaultValue,
            },
            component: SelectFilter,
        });
    }

    public static switch(field: string, caption: string, content: IOption[]) {
        return new FilterHelper({
            field,
            caption,
            config: {
                content,
            },
            component: SwitchFilter,
        });
    }

    public get(): IFilter {
        return this.data;
    }
}
