import { ColumnTemplate } from "./ColumnTemplate";
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
                filterType: "text",
                config: {
                    showFilterOptions: true,
                },
            },
        ];
        this.order = [{ field, caption }];
    }

    public static create = <Row>(field: Extract<keyof Row, string | number>, caption = ""): ColText<Row> => {
        return new ColText<Row>(field, caption);
    };

    public specialsmth = () => {
        console.log("aa");
    };
}
