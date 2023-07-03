import { IGridCellEvents, IGridColumn } from "./IGridColumn";
import React from "react";
import { IGridController } from "./IGridController";

type ReturnType<T extends object> =
    | string
    | number
    | JSX.Element
    | {
          content: string | number | JSX.Element;
          cellEvents: IGridCellEvents<T>;
      };

export type IGridCellTemplate<T extends object> = ({
    row,
    column,
    coordinates,
    prevValue,
    controller,
}: {
    row: T;
    column: IGridColumn<T>;
    coordinates: { row: number; column: number };
    prevValue: null | string | React.ReactNode;
    controller: IGridController<T>;
}) => ReturnType<T>;
