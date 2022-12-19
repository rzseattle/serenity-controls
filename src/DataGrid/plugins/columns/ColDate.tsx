import { ColumnTemplate } from "./ColumnTemplate";
import { BsCalendar3 } from "react-icons/bs";
import React from "react";
import { Path } from "react-hook-form";

export class ColDate<Row> extends ColumnTemplate<Row> {
    constructor(field: Path<Row>, caption: string) {
        super();
        this.column = {
            field,
        };
        this.header
            .caption(caption)
            .header.icon(
                <BsCalendar3
                    style={{
                        verticalAlign: "middle",
                        marginRight: 10,
                        marginLeft: 5,
                        float: "left",
                        height: "100%",
                    }}
                />,
            )
            .styleTemplate(() => ({ textAlign: "right" }));
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

    public static create<Row>(field: Path<Row>, caption = ""): ColDate<Row> {
        return new ColDate<Row>(field, caption);
    }
}
