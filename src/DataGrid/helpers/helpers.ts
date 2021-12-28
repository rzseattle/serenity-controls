import { IGridColumn } from "../interfaces/IGridColumn";

export const getColumnsWidths = (columns: IGridColumn<any>[]): string => {
    return columns
        .reduce((p, c) => {
            let minWidth: string = null;
            let maxWidth: string = null;
            let width: string = null;

            if (c.minWidth !== undefined && c.maxWidth !== null) {
                minWidth = Number.isInteger(c.minWidth) ? c.minWidth + "px" : (c.minWidth as string);
            }
            if (c.maxWidth !== undefined && c.maxWidth !== null) {
                maxWidth = Number.isInteger(c.maxWidth) ? c.maxWidth + "px" : (c.maxWidth as string);
            }
            if (c.width !== undefined && c.width !== null) {
                width = Number.isInteger(c.width) ? c.width + "px" : (c.width as string);
            } else {
                width = "1fr";
            }
            if (minWidth !== null || maxWidth !== null) {
                const min = minWidth ?? 0;
                const max = maxWidth ?? width;
                width = `minmax(${min}, ${max})`;
            }

            return p.concat(width);
        }, [])
        .join(" ");
};
