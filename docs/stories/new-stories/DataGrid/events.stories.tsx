import { mockData } from "../Table/MOCK_DATA";
import { storiesOf } from "@storybook/react";

import React, { useMemo, useState } from "react";
import DataGrid from "../../../../src/DataGrid/DataGrid";

import { PrintJSON } from "../../../../src/PrintJSON";
import { useCellData } from "../../../../src/DataGrid/helpers/useCellData";

storiesOf("DataGrid/Events", module)
    .add("Basic", () => {
        const [text, setText] = useState("");
        const [get, set, getAll] = useCellData<boolean>();

        const data = useMemo(() => mockData.slice(0, 5), []);

        return (
            <>
                <DataGrid
                    showHeader={true}
                    columns={[
                        {
                            field: "id",
                            header: {
                                caption: "Double click",
                                events: {
                                    onClick: [
                                        () => {
                                            alert("clicked");
                                        },
                                    ],
                                },
                            },
                            cell: {
                                styleTemplate: (row, col, coords) => {
                                    return { color: get(coords) ? "red" : "black" };
                                },
                                events: {
                                    onDoubleClick: [
                                        ({ row, column, coordinates }) => {
                                            setText(row[column.field] as string);
                                            set(coordinates, (curr) => !curr);
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
                                        ({ row, column, event }) => {
                                            event.currentTarget.style.backgroundColor = "red";
                                            setText(row[column.field] as string);
                                        },
                                    ],
                                    onMouseOut: [
                                        ({ row, column, event }) => {
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
                                        ({ row, column, event }) => {
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
                    data={data}
                />
                <hr />
                {text}
                <hr />
                <PrintJSON json={getAll()} />
            </>
        );
    })
    .add("Data changed", () => {
        return <div>todo</div>;
    })
    .add("Filters changed", () => {
        return <div>todo</div>;
    })
    .add("Order changed", () => {
        return <div>todo</div>;
    });
