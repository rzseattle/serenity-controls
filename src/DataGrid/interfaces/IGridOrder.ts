import { IGridColumnAssignedElement } from "./IGridColumnAssignedElement";
import { IGridDataAssignedElement } from "./IGridDataAssignedElement";

export type IGridOrderDirections = undefined | null | "asc" | "desc";

export interface IGridOrder extends IGridColumnAssignedElement, IGridDataAssignedElement {
    caption?: string;
    dir?: IGridOrderDirections;
}
