import { ColumnTemplate } from "./ColumnTemplate";

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
                filterType: "text",
                isInAdvancedMode: false,
                config: {
                    showFilterOptions: true,
                },
            },
        ];
        this.order = [{ field, caption }];
    }

    public static create<Row>(field: Extract<keyof Row, string | number>, caption = ""): ColText<Row> {
        return new ColText<Row>(field, caption);
    }
}
