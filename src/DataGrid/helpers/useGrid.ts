import { IGridColumn } from "../interfaces/IGridColumn";
import GridColumnHelper from "./GridColumnHelper";
import { GridCreatorHelper } from "./GridCreatorHelper";
import { IGridFilter } from "../interfaces/IGridFilter";
import { IGridOrder } from "../interfaces/IGridOrder";

export const useGrid = <Row>(
    callback: (creator: GridCreatorHelper<Row>) => {
        columns: GridColumnHelper<Row>[];
        filters?: IGridFilter[];
        sorters?: IGridOrder[];
    },
): { columns: IGridColumn<Row>[]; filters?: IGridFilter[]; sorters?: IGridOrder[] } => {
    console.log("coś się dzieje");
    const result = callback(new GridCreatorHelper<Row>());
    const columns = result.columns.map((column) => column.get());
    return { ...result, columns: [...columns] };
};
