import { IGridOrder } from "../interfaces/IGridOrder";

export class GridSortHelper {
    protected data: IGridOrder;

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
