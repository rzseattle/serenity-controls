import { mockData } from "../Table/MOCK_DATA";
import { storiesOf } from "@storybook/react";

import React, { useState } from "react";
import DataGrid from "../../../../src/DataGrid/DataGrid";
// @ts-ignore
import styles from "./classes.module.sass";

storiesOf("DataGrid/Events", module).add("Basic", () => {
    const [text, setText] = useState("");

    return (
        <>
            <DataGrid
                showHeader={true}
                columns={[
                    {
                        field: "id",
                        header: { caption: "Double click" },
                        cell: {
                            events: {
                                onDoubleClick: [
                                    (row, column, event) => {
                                        event.currentTarget.style.backgroundColor = "red";
                                        setText(row[column.field] as string);
                                    },
                                ],
                            },
                        },
                    },
                    {
                        field: "date",
                        header: { caption: "Mouse enter / out" },
                        cell: {
                            events: {
                                onMouseEnter: [
                                    (row, column, event) => {
                                        event.currentTarget.style.backgroundColor = "red";
                                        setText(row[column.field] as string);
                                    },
                                ],
                                onMouseOut: [
                                    (row, column, event) => {
                                        event.currentTarget.style.backgroundColor = null;
                                        setText(row[column.field] as string);
                                    },
                                ],
                            },
                        },
                    },
                    {
                        field: "email",
                        header: { caption: "Click" },
                        cell: {
                            events: {
                                onClick: [
                                    (row, column, event) => {
                                        event.currentTarget.style.backgroundColor = "red";
                                        setText(row[column.field] as string);
                                    },
                                ],
                            },
                        },
                    },
                    { field: "price" },
                    { field: "ip_address" },
                ]}
                data={{ rows: mockData.slice(0, 15), rowCount: mockData.length }}
            />
            <hr />
            {text}
        </>
    );
});
