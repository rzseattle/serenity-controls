import { IGridFilter } from "../interfaces/IGridFilter";

export class GridFilterHelper {
    protected data: IGridFilter;

    public text(field: string, label: string): GridFilterHelper {
        this.data = {
            label,
            field,
        };
        return this;
    }

    public get = (): IGridFilter => {
        return this.data;
    };
}
