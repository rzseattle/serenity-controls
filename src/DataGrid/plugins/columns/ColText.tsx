import { get, Path } from "react-hook-form";
import { ColumnTemplate } from "./ColumnTemplate";
import { IGridCellTemplate } from "../../interfaces/IGridCellTemplate";

export class ColText<Row> extends ColumnTemplate<Row> {
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

    public static create<Row>(field: Path<Row>, caption = ""): ColText<Row> {
        return new ColText<Row>(field, caption);
    }
}
