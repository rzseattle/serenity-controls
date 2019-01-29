import React from "react";
import { storiesOf } from "@storybook/react";
import { Table, ColumnHelper as Col, IDataQuery, ITableDataInput } from "../../src/Table";
import { mockData } from "./MOCK_DATA";
import { FilterHelper } from "../../src/filters";

const baseColumns = [
    Col.id("id", "Id"),
    Col.email("email", "Email"),
    Col.text("first_name", "Name")
        .template((field, row) => (
            <div>
                {row.first_name} {row.last_name}
            </div>
        ))
        .onClick((row, column, event) => {
            // alert(row[column.field] + " Cell:" + (event as React.MouseEvent<HTMLTableCellElement>).target);
        })
        .noFilter()
        .addFilter(FilterHelper.text("first_name", "First name").get())
        .addFilter(FilterHelper.text("last_name", "Last name").get()),
    Col.hidden("last_name"),
    Col.text("gender", "Gender")
        .noFilter()
        .addFilter(
            FilterHelper.select("gender", "Gender", [
                { value: "0", label: "All" },
                { value: "Female", label: "Female" },
                { value: "Male", label: "Male" },
            ]).get(),
        ).headerTooltip("La gender machen"),
    Col.text("ip_address", "Ip").className("right"),
    Col.date("date", "Date"),
    Col.money("price", "Price")
        .append(" $")
        .prepend(" - ")
        .set({
            classTemplate: (row, column) => [parseFloat(row.price) < 100 ? "darkgreen" : "darkred"],
            styleTemplate: (row, column) => (parseFloat(row.price) < 100 ? { fontSize: "10px" } : { fontSize: "15px" }),
        }),
    ,
];

const provider = (query: IDataQuery) => {
    return new Promise<ITableDataInput>((resolve) => {
        resolve({
            data: mockData.slice((query.currentPage - 1) * query.onPage, query.currentPage * query.onPage) as any[],
            countAll: mockData.length,
            debug: false,
        });
    });
};

storiesOf("Table", module).add(
    "Base",

    () => (
        <div style={{ minHeight: 500 }}>
            <Table dataProvider={provider} columns={baseColumns} />
        </div>
    ),
);
