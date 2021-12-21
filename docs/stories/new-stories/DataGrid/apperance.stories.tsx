import { mockData } from "../Table/MOCK_DATA";
import { storiesOf } from "@storybook/react";

import React from "react";
import DataGrid from "../../../../src/DataGrid/DataGrid";
// @ts-ignore
import styles from "./classes.module.sass";

storiesOf("DataGrid/Apperance", module)
    .add("Row", () => {
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
    .add("Cell", () => {
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
    });
