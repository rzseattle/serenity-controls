import { IFilter } from "../filters/Intefaces";

import { IOption } from "../fields/Interfaces";
import DateFilter from "./DateFilter";
import NumericFilter from "./NumericFilter";
import TextFilter from "./TextFilter";
import ConnectionFilter from "./ConnectionFilter";
import SelectFilter from "./SelectFilter";
import SwitchFilter from "./SwitchFilter";
import { IModalProps } from "../Modal";

export class FilterHelper {
    private data: IFilter;

    constructor(initData: Partial<IFilter>) {
        initData.config = { ...initData.config, modalProps: {} };
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

    public static number(field: string, caption: string, config = {}) {
        return new FilterHelper({
            field,
            caption,
            component: NumericFilter,
            config: {
                showFilterOptions: true,
                disableLikeFilter: false,
                ...config,
            },
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
        multi = false,
        defaultValue = "",
        mode = "list",
    ) {
        return new FilterHelper({
            field,
            caption,
            config: {
                multiselect: multi,
                content,
                default: defaultValue,
                mode: mode,
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

    public setModalProperties(props: Partial<IModalProps>) {
        this.data.config.modalProps = props;
        return this;
    }

    public get(): IFilter {
        return this.data;
    }
}
