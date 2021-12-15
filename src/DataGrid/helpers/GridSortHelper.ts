import { IGridSorter } from "../interfaces/IGridSorter";

export class GridSortHelper {
    protected data: IGridSorter;

    public add = (field: string, caption: string, column: string = null): GridSortHelper => {
        this.data = {
            field,
            caption,
            column,
        };

        return this;
    };

    public get = () => {
        return this.data;
    };
}
