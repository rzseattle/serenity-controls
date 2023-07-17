import { get, Path } from "react-hook-form";
import { ColumnTemplate } from "./ColumnTemplate";
import styles from "./ColSelection.module.sass";

export type IOnSelectionChanged = (selection: Array<any>) => any;

export class ColSelection<Row = any> extends ColumnTemplate<Row> {
    private selection: any[] = [];

    constructor(field: Path<Row>, private onChange?: IOnSelectionChanged) {
        super();
        this.column = {
            header: {
                caption: "",

                template: ({ controller, forceRenderGrid }) => {
                    return (
                        <div className={styles.main}>
                            <input
                                type={"checkbox"}
                                onClick={(e) => {
                                    if (e.currentTarget.checked) {
                                        this.selection = controller.getData().map((el) => get(el, field));
                                    } else {
                                        this.selection = [];
                                    }
                                    this.onChange(this.selection);
                                    forceRenderGrid();
                                }}
                            />
                        </div>
                    );
                },
            },
            cell: {
                templates: [
                    ({ row, forceRender }) => {
                        const val = get(row, field);
                        const checked = this.selection.includes(val);

                        return (
                            <div>
                                <input
                                    type={"checkbox"}
                                    checked={checked}
                                    onClick={() => {
                                        this.click(val);
                                        this.onChange(this.selection);
                                        forceRender();
                                    }}
                                />
                            </div>
                        );
                    },
                ],
                class: [styles.main],
            },
        };

        this.filters = [];
    }

    private click = (val: any) => {
        const index = this.selection.lastIndexOf(val);
        if (index !== -1) {
            this.selection = this.selection.filter((el) => el != val);
        } else {
            this.selection = [...this.selection, val];
        }
    };

    public static create<Row extends object>(
        field: Path<Row>,
        onSelectionChange: IOnSelectionChanged,
    ): ColSelection<Row> {
        return new ColSelection<Row>(field, onSelectionChange);
    }
}
