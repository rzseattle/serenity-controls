import { IMockUser, mockData } from "../Table/MOCK_DATA";
import { storiesOf } from "@storybook/react";

import React, { useEffect, useState } from "react";
import DataGrid from "../../../../src/DataGrid/DataGrid";
import { IGridOrder } from "../../../../src/DataGrid/interfaces/IGridOrder";
import { IGridFilter } from "../../../../src/DataGrid/interfaces/IGridFilter";

storiesOf("DataGrid/Order & Filter", module)
    .add("Order", () => {
        const [order, setOrder] = useState<IGridOrder[]>([
            { field: "id", caption: "Sorted by Id" },
            { field: "date" },
            { field: "email" },
            { field: "price" },
            { field: "ip_address" },
        ]);
        const [data, setData] = useState(mockData.slice(0, 150));

        useEffect(() => {
            const orderElements = order.filter((el) => el.dir !== undefined);
            const data = mockData.slice(0, 150);
            if (orderElements.length > 0) {
                orderElements.reverse().forEach((orderElement) => {
                    const field = orderElement.field as keyof IMockUser;
                    data.sort(function (a, b) {
                        const one = orderElement.dir === "asc" ? a : b;
                        const two = orderElement.dir === "asc" ? b : a;

                        if (typeof a[field] === "string") {
                            return one[field].localeCompare(two[field]);
                        } else if (typeof a[field] === "number") {
                            return one[field] - two[field];
                        }
                    });
                });
                setData([...data]);
            } else {
                setData(data);
            }
        }, [order]);

        return (
            <>
                <DataGrid
                    showHeader={true}
                    onOrderChange={(order) => {
                        //console.log(order);
                        setOrder(order);
                    }}
                    order={order}
                    columns={[
                        {
                            field: "id",
                        },
                        {
                            field: "date",
                        },
                        {
                            field: "email",
                        },
                        { field: "price" },
                        { field: "ip_address" },
                    ]}
                    data={{ rows: data, rowCount: data.length }}
                />
            </>
        );
    })
    .add("Filters", () => {
        const [order, setOrder] = useState<IGridOrder[]>([
            { field: "id", caption: "Sorted by Id" },
            { field: "date" },
            { field: "email" },
            { field: "price" },
            { field: "ip_address" },
        ]);
        const [filters, setFilter] = useState<IGridFilter[]>([
            {
                field: "id",
                caption: "Id",
                label: "ZZ",
                description: "description",
                opened: true,
                component: ({ onApply }) => <div>dupa</div>,
            },
        ]);
        const [data, setData] = useState(mockData.slice(0, 150));

        useEffect(() => {
            const orderElements = order.filter((el) => el.dir !== undefined);
            const data = mockData.slice(0, 150);
            if (orderElements.length > 0) {
                orderElements.reverse().forEach((orderElement) => {
                    const field = orderElement.field as keyof IMockUser;
                    data.sort(function (a, b) {
                        const one = orderElement.dir === "asc" ? a : b;
                        const two = orderElement.dir === "asc" ? b : a;

                        if (typeof a[field] === "string") {
                            return one[field].localeCompare(two[field]);
                        } else if (typeof a[field] === "number") {
                            return one[field] - two[field];
                        }
                    });
                });
                setData([...data]);
            } else {
                setData(data);
            }
        }, [order]);

        return (
            <>
                <DataGrid
                    showHeader={true}
                    onOrderChange={(order) => {
                        //console.log(order);
                        setOrder(order);
                    }}
                    order={order}
                    filters={filters}
                    columns={[
                        {
                            field: "id",
                        },
                        {
                            field: "date",
                        },
                        {
                            field: "email",
                        },
                        { field: "price" },
                        { field: "ip_address" },
                    ]}
                    data={{ rows: data, rowCount: data.length }}
                />
            </>
        );
    });
