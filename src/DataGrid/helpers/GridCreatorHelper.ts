import { GridFilterHelper } from "./GridFilterHelper";
import { GridSortHelper } from "./GridSortHelper";
import { ColumnCreator } from "./GridColumnCreatorHelper";
import GridColumnHelper from "./GridColumnHelper";
import { IGridFilter } from "../interfaces/IGridFilter";
import { IGridSorter } from "../interfaces/IGridSorter";
import { IGridColumnData } from "../interfaces/IGridColumnData";

export class GridCreatorHelper<Row> {
    public column: ColumnCreator<Row> = new ColumnCreator<Row>();
    public filter: GridFilterHelper = new GridFilterHelper();
    public sorter: GridSortHelper = new GridSortHelper();




    public toProcess = (input: {
        columns: GridColumnHelper<Row>[];
        filters?: GridFilterHelper[];
        sorters?: GridSortHelper[];
    }): {
        columns: IGridColumnData<Row>[];
        filters?: IGridFilter[];
        sorters?: IGridSorter[];
    } => {
        const columns = input.columns.map((column) => column.get());
        let ret: {
            columns: IGridColumnData<Row>[];
            filters?: IGridFilter[];
            sorters?: IGridSorter[];
        } = { columns };

        if (typeof input.filters !== "undefined") {
            const filters = input.filters.map((filter) => filter.get());
            ret = { ...ret, filters };
        }

        if (typeof input.sorters !== "undefined") {
            const sorters = input.sorters.map((sorter) => sorter.get());
            ret = { ...ret, sorters };
        }

        return ret;
    };
}
