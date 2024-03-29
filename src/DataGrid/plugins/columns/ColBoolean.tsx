import { get, Path } from "react-hook-form";
import { ColumnTemplate } from "./ColumnTemplate";
import { CommonIcons } from "../../../lib/CommonIcons";
import styles from "./ColBoolean.module.sass";

export type IOnBooleanChanged<Row> = (newVal: boolean, row: Row) => Promise<boolean>;

export class ColBoolean<Row = any> extends ColumnTemplate<Row> {
    constructor(field: Path<Row>, caption: string, onChange?: IOnBooleanChanged<Row>) {
        super();
        this.column = {
            field,

            header: {
                caption,
            },
            cell: {
                templates: [
                    ({ row }) => {
                        const val = get(row, field);
                        const ok = val === true || val === "1";
                        return (
                            <div className={ok ? styles.check : styles.uncheck}>
                                {ok ? <CommonIcons.check /> : <CommonIcons.close />}
                            </div>
                        );
                    },
                ],
                events: {
                    onClick: [
                        async ({ row, forceRender }) => {
                            const val = get(row, field);
                            const ok = val === true || val === "1";
                            const result = await onChange(!ok, row);
                            if (result === true) {
                                forceRender();
                            }
                        },
                    ],
                },
                class: [onChange !== undefined ? styles.clickable : ""],
            },
        };

        this.filters = [
            {
                caption,
                field,
                filterType: "boolean",
                isInAdvancedMode: false,
                selfManagedSubmission: true,
                config: {
                    showFilterOptions: false,
                },
            },
        ];
        this.order = [{ field, caption }];
    }

    public static create<Row extends object>(
        field: Path<Row>,
        caption = "",
        onChange?: IOnBooleanChanged<Row>,
    ): ColBoolean<Row> {
        return new ColBoolean<Row>(field, caption, onChange);
    }
}
