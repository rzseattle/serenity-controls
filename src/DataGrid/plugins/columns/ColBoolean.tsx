import { Path } from "react-hook-form";
import { ColumnTemplate } from "./ColumnTemplate";

export class ColBoolean<Row = any> extends ColumnTemplate<Row> {
    constructor(field: Path<Row>, caption: string) {
        super();
        this.column = {
            field,

            header: {
                caption,
            },
            cell: {
                templates: [ () => {
                    return <><input type="checkbox" /></>
                } ]
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

    public static create<Row extends object>(field: Path<Row>, caption = ""): ColBoolean<Row> {
        return new ColBoolean<Row>(field, caption);
    }
}
