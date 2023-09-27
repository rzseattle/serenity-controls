import { get, Path } from "react-hook-form";
import { ColumnTemplate } from "./ColumnTemplate";
import styles from "./ColSelection.module.sass";

export type IOnSelectionChanged = (selection: Array<any>) => any;

export class ColSelection<Row = any> extends ColumnTemplate<Row> {
    constructor(
        private field: Path<Row>,
        private selection: Array<number | string>,
        private onChange?: IOnSelectionChanged,
    ) {
        super();

        this.column = {
            gridEventsListeners: {
                onDataChanged: [
                    (data) => {
                        console.log("data changed", "i to jest to");
                        this.selection = [];
                        console.log("data changed 2", "i to jest to");
                    },
                ],
            },
            width: "min-content",
            header: {
                caption: "",

                template: ({ controller, forceRenderGrid, defaultClassName }) => {
                    const data = controller.getData();
                    return (
                        <div className={styles.main + " " + defaultClassName}>
                            <input
                                type={"checkbox"}
                                onClick={(e) => {
                                    if (e.currentTarget.checked) {
                                        this.selection = data.map((el) => get(el, field));
                                    } else {
                                        this.selection = [];
                                    }
                                    this.onChange(this.selection);
                                    forceRenderGrid();
                                }}
                                onChange={() => {
                                    return null;
                                }}
                                checked={this.selection.length == data.length}
                            />
                        </div>
                    );
                },
            },
            cell: {
                templates: [
                    ({ row, forceRender, controller }) => {
                        const val = get(row, field);
                        const checked = this.selection.includes(val);

                        return (
                            <div>
                                <input
                                    type={"checkbox"}
                                    checked={checked}
                                    onChange={() => {
                                        return null;
                                    }}
                                    onClick={(e) => {
                                        this.click(val, e.shiftKey, e.shiftKey && controller.getData());
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

    private click = (val: any, shiftKeyPressed?: boolean, data?: Row[]) => {
        const index = this.selection.lastIndexOf(val);
        const last = this.selection[this.selection.length - 1];
        let checked = false;
        if (index !== -1) {
            this.selection = this.selection.filter((el) => el != val);
        } else {
            checked = true;
            // will be pressed in loop to place it at end
            if (!shiftKeyPressed) this.selection = [...this.selection, val];
        }

        if (shiftKeyPressed && last) {
            const list = data.map((el) => get(el, this.field));
            const currIndexOnData = list.lastIndexOf(val);
            const lastIndexOnData = list.lastIndexOf(last);

            const range = list.slice(
                Math.min(currIndexOnData, lastIndexOnData),
                Math.max(currIndexOnData, lastIndexOnData) + 1,
            );
            // console.log({
            //     sel: this.selection,
            //     last,
            //     checked,
            //     list,
            //     currIndexOnData,
            //     lastIndexOnData,
            //     range,
            // });
            range.forEach((el) => {
                const index = this.selection.lastIndexOf(el);
                if (checked) console.log(index);
                if (checked && index === -1) {
                    this.click(el);
                }

                if (!checked && index !== -1) {
                    this.click(el);
                }
            });
        }

        //console.log(this.selection, "selection");
    };

    public static create<Row extends object>(
        field: Path<Row>,
        selection: Array<number | string>,
        onSelectionChange: IOnSelectionChanged,
    ): ColSelection<Row> {
        return new ColSelection<Row>(field, [...selection], onSelectionChange);
    }
}
