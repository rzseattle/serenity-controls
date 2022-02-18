import { ColumnTemplate } from "./ColumnTemplate";
import { IGridCellTemplate } from "../../interfaces/IGridCellTemplate";

export class ColTemplate<Row> extends ColumnTemplate<Row> {
    static counter = 0;
    constructor(caption: string, template: IGridCellTemplate<Row>) {
        super();
        ColTemplate.counter++;
        this.column = {
            name: "tmp_template_column" + ColTemplate.counter,
            cell: {
                template,
            },
            header: {
                caption,
            },
        };
        this.filters = [];
        this.order = [];
    }

    public static create<Row>(caption = "", template: IGridCellTemplate<Row>): ColTemplate<Row> {
        return new ColTemplate<Row>(caption, template);
    }
}
