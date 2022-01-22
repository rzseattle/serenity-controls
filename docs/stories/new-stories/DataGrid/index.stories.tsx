import { IMockUser, mockData } from "../Table/MOCK_DATA";
import { storiesOf } from "@storybook/react";

import React, { useMemo } from "react";
import DataGrid from "../../../../src/DataGrid/DataGrid";
import { IGridColumn } from "../../../../src/DataGrid/interfaces/IGridColumn";
import { getColumnsWidths } from "../../../../src/DataGrid/helpers/helpers";
import GridRoot from "../../../../src/DataGrid/config/GridRoot";

storiesOf("DataGrid/Base", module)
    .add("Base", () => {
        const data = useMemo(() => mockData.slice(0, 5), []);
        return (
            <GridRoot>
                <DataGrid
                    columns={[
                        { field: "id" },
                        { field: "date" },
                        { field: "email" },
                        { field: "price" },
                        { field: "ip_address" },
                    ]}
                    showFooter={false}
                    showHeader={false}
                    data={data}
                />
            </GridRoot>
        );
    })
    .add("Column widths", () => {
        const data = useMemo(() => mockData.slice(0, 5), []);
        return (
            <GridRoot>
                <DataGrid
                    columns={[
                        { field: "id", minWidth: "min-content", maxWidth: 30 },
                        { field: "date", width: "max-content" },
                        { field: "email", width: "min-content" },
                        { field: "price", minWidth: "auto", maxWidth: 110 },
                        { field: "ip_address", maxWidth: 150 },
                    ]}
                    showFooter={false}
                    showHeader={false}
                    data={data}
                />
            </GridRoot>
        );
    })
    .add("Headers", () => {
        const data = useMemo(() => mockData.slice(0, 5), []);
        return (
            <GridRoot>
                <DataGrid
                    columns={[
                        { field: "id" },
                        { field: "date", header: { caption: "This is date!!!" } },
                        { field: "email" },
                        { field: "price", header: { caption: "Caption for price column xxxxxxxxxxxxx" } },
                        { field: "ip_address" },
                    ]}
                    showFooter={false}
                    showHeader={true}
                    data={data}
                />
            </GridRoot>
        );
    })
    .add("Footer", () => {
        const columns: IGridColumn<IMockUser>[] = [
            { field: "id" },
            { field: "date" },
            { field: "email" },
            { field: "price" },
            { field: "ip_address" },
        ];
        const data = useMemo(() => mockData.slice(0, 5), []);
        return (
            <GridRoot>
                <DataGrid
                    columns={columns}
                    showFooter={true}
                    data={data}
                    footer={(props) => {
                        return (
                            <div style={{ backgroundColor: "white", paddingBottom: 10 }}>
                                <hr />
                                <DataGrid
                                    columns={props.columns as IGridColumn<any>[]}
                                    data={[
                                        {
                                            price:
                                                Math.round(
                                                    props.data.reduce((p, row) => {
                                                        return p + parseFloat(row.price);
                                                    }, 0) * 100,
                                                ) / 100,
                                        },
                                    ]}
                                />
                                <br />
                                <b>Another part of footer </b>: {props.columns.length}
                                <hr />
                                <div style={{ display: "grid", gridTemplateColumns: getColumnsWidths(props.columns) }}>
                                    {columns.map((col) => (
                                        <div key={col.field}>{col.field}</div>
                                    ))}
                                </div>
                            </div>
                        );
                    }}
                />
            </GridRoot>
        );
    });
