import React from "react";
export type IGridRowStyleProvider<Row> = (row: Row, index: number) => React.CSSProperties;
