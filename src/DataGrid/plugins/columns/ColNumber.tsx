import { ColumnTemplate } from "./ColumnTemplate";
import React from "react";

export class ColNumber<Row> extends ColumnTemplate<Row> {
    constructor(field: Extract<keyof Row, string | number>, caption: string) {
        super();
        this.column = {
            field,
            header: {
                caption,
            },
            cell: {
                styleTemplate: () => {
                    return { textAlign: "right" };
                },
            },
        };
        this.filters = [
            {
                caption,
                field,
                filterType: "numeric",
                isInAdvancedMode: false,
                config: {
                    showFilterOptions: true,
                },
            },
        ];
        this.order = [{ field, caption }];
    }

    public static create<Row>(field: Extract<keyof Row, string | number>, caption = ""): ColNumber<Row> {
        return new ColNumber<Row>(field, caption);
    }
}
