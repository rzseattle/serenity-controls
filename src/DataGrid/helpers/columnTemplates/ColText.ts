import { ColumnTemplate } from "./ColumnTemplate";
import { TextFilter } from "../../../filters";
import { IColumnTemplate } from "./IColumnTemplate";

export class ColText<Row> extends ColumnTemplate<Row> implements IColumnTemplate<Row> {
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

    public static create = <Row>(field: Extract<keyof Row, string | number>): ColText<Row> => {
        return new ColText<Row>(field, "");
    };

    public specialsmth = () => {
        console.log("aa");
    };
}
