import { get, Path } from "react-hook-form";
import { ColumnTemplate } from "./ColumnTemplate";
import { IOption } from "../../../fields";
import { IGridSelectFilterConfig } from "../filters/SelectionFilters/GridSelectFilter/GridSelectFilter";

export class ColMap<Row> extends ColumnTemplate<Row> {
    private options: IOption[];
    constructor(field: Path<Row>, options: IOption[], caption: string) {
        super();
        this.options = options;
        this.column = {
            field,
            header: {
                caption,
            },
            cell: {
                templates: [
                    ({ row }) => {
                        const result = this.options.filter((el) => el.value === get(row, field));
                        if (result.length === 1) {
                            return result[0].label;
                        } else {
                            return "---";
                        }
                    },
                ],
            },
        };

        this.filters = [
            {
                caption,
                field,
                filterType: "select",
                isInAdvancedMode: false,
                value: undefined,
                config: {
                    values: this.options,
                } as IGridSelectFilterConfig,
            },
        ];
        this.order = [{ field, caption }];
    }

    public static create<Row>(field: Path<Row>, options: IOption[], caption = ""): ColMap<Row> {
        return new ColMap<Row>(field, options, caption);
    }
}
