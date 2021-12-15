import { IGridColumnData } from "../interfaces/IGridColumnData";
import GridColumnHelper from "./GridColumnHelper";
import { GridCreatorHelper } from "./GridCreatorHelper";
import { IGridFilter } from "../interfaces/IGridFilter";
import { IGridSorter } from "../interfaces/IGridSorter";

export const useGrid = <Row>(
    callback: (creator: GridCreatorHelper<Row>) => {
        columns: GridColumnHelper<Row>[];
        filters?: IGridFilter[];
        sorters?: IGridSorter[];
    },
): { columns: IGridColumnData<Row>[]; filters?: IGridFilter[]; sorters?: IGridSorter[] } => {
    console.log("coś się dzieje");
    const result = callback(new GridCreatorHelper<Row>());
    const columns = result.columns.map((column) => column.get());
    return { ...result, columns: [...columns] };
};
