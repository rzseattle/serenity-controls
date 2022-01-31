import { ColumnTemplate } from "./ColumnTemplate";
import { BsCalendar3 } from "react-icons/bs";
import React from "react";

export class ColDate<Row> extends ColumnTemplate<Row> {
    constructor(field: Extract<keyof Row, string | number>, caption: string) {
        super();
        this.column = {
            field,
            header: {
                caption,
                icon: (
                    <BsCalendar3
                        style={{
                            verticalAlign: "middle",
                            marginRight: 10,
                            marginLeft: 5,
                            float: "left",
                            height: "100%",
                        }}
                    />
                ),
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
                filterType: "date",
                config: {
                    showFilterOptions: true,
                },
            },
        ];
        this.order = [{ field, caption }];
    }

    public static create<Row>(field: Extract<keyof Row, string | number>, caption = ""): ColDate<Row> {
        return new ColDate<Row>(field, caption);
    }
}
