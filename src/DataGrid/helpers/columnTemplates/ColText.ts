import { ColumnTemplate } from "./ColumnTemplate";
import { TextFilter } from "../../../filters";

export class ColText<Row> extends ColumnTemplate<Row> {

    

    constructor(field: Extract<keyof Row, string | number>, caption: string) {
        super();
        this.column = {
            field,
            header: {
                caption,
            },
        };
        this.filters = [
            {
                caption,
                label: caption,
                field,
                component: TextFilter,
                config: {
                    showFilterOptions: true,
                },
            },
        ];
        this.sort = { field, caption, column: null };
    }
}
