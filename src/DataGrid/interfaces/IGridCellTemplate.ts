import { IGridCellEvents, IGridColumn } from "./IGridColumn";
import React from "react";

type ReturnType<T> =
    | string
    | number
    | JSX.Element
    | {
          content: string | number | JSX.Element;
          cellEvents: IGridCellEvents<T>;
      };

export type IGridCellTemplate<T> = ({
    row,
    column,
    coordinates,
    prevValue,
}: {
    row: T;
    column: IGridColumn<T>;
    coordinates: { row: number; column: number };
    prevValue: null | string | React.ReactNode;
}) => ReturnType<T>;
