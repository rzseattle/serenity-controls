import { ColumnTemplate } from "./ColumnTemplate";
import { IColumnTemplate } from "./IColumnTemplate";
import GridTextFilter from "../../filters/GridTextFilter";

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
                component: GridTextFilter,
                config: {
                    showFilterOptions: true,
                },
            },
        ];
        this.sort = { field, caption };
    }

    public static create = <Row>(field: Extract<keyof Row, string | number>): ColText<Row> => {
        return new ColText<Row>(field, "");
    };

    public specialsmth = () => {
        console.log("aa");
    };
}
