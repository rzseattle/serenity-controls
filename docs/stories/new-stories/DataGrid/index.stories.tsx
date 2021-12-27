import { IMockUser, mockData } from "../Table/MOCK_DATA";
import { storiesOf } from "@storybook/react";

import React from "react";
import DataGrid from "../../../../src/DataGrid/DataGrid";
import { IGridColumn } from "../../../../src/DataGrid/interfaces/IGridColumn";
import { getColumnsWidths } from "../../../../src/DataGrid/helpers/helpers";

storiesOf("DataGrid/Base", module)
    .add("Base", () => {
        // const gridData = useMemo(() => {
        //     const creator = new GridCreatorHelper<IMockUser>();
        //
        //     creator.addCol(ColText.create("price"));
        //     return creator.get();
        //
        // }, []);
        return (
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
                data={{ rows: mockData.slice(0, 5), rowCount: mockData.length }}
            />
        );
    })
    .add("Column widths", () => {
        return (
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
                data={{ rows: mockData.slice(0, 5), rowCount: mockData.length }}
            />
        );
    })
    .add("Headers", () => {
        return (
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
                data={{ rows: mockData.slice(0, 5), rowCount: mockData.length }}
            />
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
        return (
            <DataGrid
                columns={columns}
                showFooter={true}
                data={{ rows: mockData.slice(0, 25), rowCount: mockData.length }}
                footer={(props) => {
                    return (
                        <div style={{ backgroundColor: "white", paddingBottom: 10 }}>
                            <hr />
                            <DataGrid
                                columns={props.columns as IGridColumn<any>[]}
                                data={{
                                    rows: [
                                        {
                                            price:
                                                Math.round(
                                                    props.data.rows.reduce((p, row) => {
                                                        return p + parseFloat(row.price);
                                                    }, 0) * 100,
                                                ) / 100,
                                        },
                                    ],
                                }}
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
        );
    });
