import { Path } from "react-hook-form";
import { ColumnTemplate } from "./ColumnTemplate";

export class ColText<Row = any> extends ColumnTemplate<Row> {
    constructor(field: Path<Row>, caption: string) {
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
                field,
                filterType: "text",
                isInAdvancedMode: false,
                config: {
                    showFilterOptions: true,
                },
            },
        ];
        this.order = [{ field, caption }];
    }

    public static create<Row extends object>(field: Path<Row>, caption = ""): ColText<Row> {
        return new ColText<Row>(field, caption);
    }
}
