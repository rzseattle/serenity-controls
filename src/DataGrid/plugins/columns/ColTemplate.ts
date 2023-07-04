import { ColumnTemplate } from "./ColumnTemplate";
import { IGridCellTemplate } from "../../interfaces/IGridCellTemplate";

export class ColTemplate<Row = any> extends ColumnTemplate<Row> {
    static counter = 0;
    constructor(caption: string, template: IGridCellTemplate<Row>) {
        super();
        ColTemplate.counter++;
        this.column = {
            name: "tmp_template_column" + ColTemplate.counter,
            cell: {
                templates: [template],
            },
            header: {
                caption,
            },
        };
        this.filters = [];
        this.order = [];
    }

    public static create<Row = any>(caption = "", template: IGridCellTemplate<Row>): ColTemplate<Row> {
        return new ColTemplate<Row>(caption, template);
    }
}
