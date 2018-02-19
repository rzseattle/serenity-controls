import {IFilter} from "../filters/Intefaces";
import {ConnectionFilter, DateFilter, SelectFilter, SwitchFilter, TextFilter} from '../Filters';
import {Option} from "../fields/Interfaces";

export class FilterHelper {
    private data: IFilter;

    constructor(initData: Partial<IFilter>) {
        this.data = {
            field: null,
            component: null,
            ...initData
        };
    }

    static date(field, caption) {
        return new FilterHelper({
            field: field,
            caption: caption,
            component: DateFilter
        });
    }

    static number(field, caption) {
        return new FilterHelper({
            field: field,
            caption: caption,
            component: DateFilter
        });
    }

    static text(field, caption) {
        return new FilterHelper({
            field: field,
            caption: caption,
            component: TextFilter
        });
    }

    static connection(field, caption, config) {
        return new FilterHelper({
            field: field,
            caption: caption,
            component: ConnectionFilter,
            config: config,
        });
    }

    static select(field, caption, content: Option[], multi: boolean = false, _default = "") {
        return new FilterHelper({
            field: field,
            caption: caption,
            config: {
                multiselect: multi,
                content: content,
                _default: _default
            },
            component: SelectFilter
        });
    }

    static switch(field, caption, content: Option[],) {
        return new FilterHelper({
            field: field,
            caption: caption,
            config: {
                content: content
            },
            component: SwitchFilter
        });
    }

    public get(): IFilter {
        return this.data
    }

}
