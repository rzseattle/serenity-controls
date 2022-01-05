import { IMockUser, mockData } from "../Table/MOCK_DATA";
import { storiesOf } from "@storybook/react";

import React, { useEffect, useState } from "react";
import DataGrid from "../../../../src/DataGrid/DataGrid";
import { IGridOrder } from "../../../../src/DataGrid/interfaces/IGridOrder";
import { IGridFilter, IGridFilterComponent } from "../../../../src/DataGrid/interfaces/IGridFilter";
import { PrintJSON } from "../../../../src/PrintJSON";

const Filter: IGridFilterComponent = ({ onApply, filter }) => {
    const [val, setVal] = useState(filter.value?.value);
    const apply = () => {
        onApply({ value: val, labelValue: "to jest 10", condition: "=" }, false);
    };
    return (
        <div>
            <input
                autoFocus={true}
                type="text"
                value={val}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        apply();
                    }
                }}
                onChange={(e) => setVal(e.currentTarget.value)}
            />
            <button onClick={() => apply()}>Apply</button>
        </div>
    );
};

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
                caption: "Id filter",
                label: "ZZ",
                description: "description",
                opened: true,
                filterType: "text",
                //component: Filter,
                value: [
                    {
                        value: 10,
                        condition: "=",
                        labelValue: "dziesięc",
                        labelCondition: "jest równe",
                    },

                    {
                        value: 20,
                        condition: "=",
                        labelValue: "dwadziescia",
                        labelCondition: "jest równe",
                    },
                ],
            },
            // {
            //     field: "date",
            //     caption: "Date",
            //     label: "in",
            //     description: "ups",
            //     opened: true,
            //     filterType: "date",
            //     value: [
            //         {
            //             value: 20,
            //             condition: "!=",
            //         },
            //         {
            //             value: 30,
            //             condition: "!=",
            //         },
            //     ],
            //     //component: Filter,
            // },
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
                {/*<div style={{ display: "flex" }}>*/}
                {/*    <PrintJSON json={filters} />*/}
                {/*    <PrintJSON json={order} />*/}
                {/*</div>*/}
                <div >
                    <DataGrid
                        showHeader={true}
                        onOrderChange={(order) => setOrder(order)}
                        order={order}
                        filters={filters}
                        onFiltersChange={(filter) => setFilter(filter)}
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
                </div>
            </>
        );
    });
