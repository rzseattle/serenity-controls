import { get, Path } from "react-hook-form";
import { ColumnTemplate } from "./ColumnTemplate";
import { useGridContext } from "../../config/GridContext";

export class ColActive<Row> extends ColumnTemplate<Row> {
    constructor(field: Path<Row>, caption: string) {
        super();

        this.column = {
            field,

            header: {
                caption,
            },
            cell: {
                templates: [
                    ({ row }) => {
                        const config = useGridContext();
                        const val = get(row, field);
                        const checked = val === true || val === "1";
                        return (
                            <div
                                style={{
                                    textAlign: "center",
                                    color: checked ? "darkgreen" : "darkred",
                                    fontWeight: "bold",
                                }}
                            >
                                {config.filter.icons[checked ? "checked" : "unchecked"]}
                            </div>
                        );
                    },
                ],
            },
        };
        this.filters = [
            {
                caption,
                field,
                filterType: "boolean",
                isInAdvancedMode: false,
                // config: {
                //     showFilterOptions: true,
                // },
            },
        ];
        this.order = [{ field, caption }];
        this.width("min-content");
    }

    public static create<Row>(field: Path<Row>, caption = ""): ColActive<Row> {
        return new ColActive<Row>(field, caption);
    }
}
