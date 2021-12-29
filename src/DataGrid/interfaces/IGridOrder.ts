import { IGridColumnAssignedElement } from "./IGridColumnAssignedElement";
import { IGridDataAssignedElement } from "./IGridDataAssignedElement";

export interface IGridOrder extends IGridColumnAssignedElement, IGridDataAssignedElement {
    caption?: string;
    dir?: "asc" | "desc";
}
