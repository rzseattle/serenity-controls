import { IGridColumnData } from "../interfaces/IGridColumnData";
import { useEffect, useState } from "react";
import GridColumnHelper from "./GridColumnHelper";
import { GridColumnCreator } from "./GridColumnCreator";

export const useGridColumns = <Row,>(
    callback: (list: GridColumnCreator<Row>) => GridColumnHelper<Row>[],
): IGridColumnData<Row>[] => {
    const [columns, setColumns] = useState<IGridColumnData<Row>[]>([]);

    useEffect(() => {
        const result = callback(new GridColumnCreator<Row>()).map((column) => column.get());
        setColumns(result);
    }, []);
    return columns;
};
