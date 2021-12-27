import { mockData } from "../Table/MOCK_DATA";
import { storiesOf } from "@storybook/react";

import React from "react";
import DataGrid from "../../../../src/DataGrid/DataGrid";
// @ts-ignore
import styles from "./classes.module.sass";

storiesOf("DataGrid/Apperance", module)
    .add("No default styling", () => {
        return (
            <DataGrid
                className=""
                columns={[
                    { field: "id" },
                    { field: "date" },
                    { field: "email" },
                    { field: "price" },
                    { field: "ip_address" },
                ]}
                data={{ rows: mockData.slice(0, 15), rowCount: mockData.length }}
                showHeader={true}
                rowClassTemplate={(row) => {
                    const price = parseFloat(row.price);
                    if (price > 200) {
                        return [styles.rowClassWarning];
                    }
                    if (price < 150) {
                        return [styles.rowClassGood];
                    }
                    return [];
                }}
                rowStyleTemplate={(row) => {
                    if (row.email.indexOf(".gov") !== -1) {
                        return { fontWeight: "bold" };
                    }
                    return {};
                }}
            />
        );
    })
    .add("Row styling", () => {
        return (
            <DataGrid
                columns={[
                    { field: "id" },
                    { field: "date" },
                    { field: "email" },
                    { field: "price" },
                    { field: "ip_address" },
                ]}
                data={{ rows: mockData.slice(0, 15), rowCount: mockData.length }}
                rowClassTemplate={(row) => {
                    const price = parseFloat(row.price);
                    if (price > 200) {
                        return [styles.rowClassWarning];
                    }
                    if (price < 150) {
                        return [styles.rowClassGood];
                    }
                    return [];
                }}
                rowStyleTemplate={(row) => {
                    if (row.email.indexOf(".gov") !== -1) {
                        return { fontWeight: "bold" };
                    }
                    return {};
                }}
            />
        );
    })
    .add("Cell styling", () => {
        return (
            <DataGrid
                columns={[
                    { field: "id" },
                    { field: "date" },
                    { field: "email" },
                    { field: "price" },
                    { field: "ip_address" },
                ]}
                data={{ rows: mockData.slice(0, 15), rowCount: mockData.length }}
                cellClassTemplate={(row, column) => {
                    if (column.field === "price") {
                        const price = parseFloat(row.price);

                        if (price > 200) {
                            return [styles.cellClassWarning];
                        }
                        if (price < 150) {
                            return [styles.cellClassGood];
                        }
                    }
                    return [];
                }}
                cellStyleTemplate={(row, column) => {
                    if (column.field && row[column.field] === 5) {
                        return { backgroundColor: "darkgray", color: "white" };
                    }

                    if (column.field && column.field === "email") {
                        const email = row[column.field];
                        return { color: "darkred", fontWeight: email.indexOf("gov") !== -1 ? "bold" : "normal" };
                    }

                    return {};
                }}
            />
        );
    })
    .add("Templates", () => {
        return (
            <DataGrid
                showHeader={true}
                columns={[
                    {
                        field: "id",
                        cell: {
                            template: ({ row }) => {
                                return <div> - {row.id} -</div>;
                            },
                        },
                    },
                    {
                        field: "date",
                        cell: {
                            styleTemplate: () => ({ padding: 0 }),
                            template: () => (
                                <div
                                    style={{
                                        backgroundColor: "darkgray",
                                        width: "100%",
                                        height: "100%",
                                        color: "white",
                                    }}
                                >
                                    :)
                                </div>
                            ),
                        },
                    },
                    {
                        field: "email",
                        header: {
                            template: ({ column }) => (
                                <div
                                    style={{
                                        backgroundColor: "darkgray",
                                        width: "100%",
                                        height: "100%",
                                        color: "white",
                                    }}
                                >
                                    Im so happy :) <br/> <br/> ( psss I'm {column.field} !!! )
                                </div>
                            ),
                        },
                    },
                    { field: "price" },
                    { field: "ip_address" },
                ]}
                data={{ rows: mockData.slice(0, 15), rowCount: mockData.length }}
            />
        );
    });
