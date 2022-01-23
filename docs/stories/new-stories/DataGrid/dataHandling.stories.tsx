import { IMockUser, mockData } from "../Table/MOCK_DATA";
import { storiesOf } from "@storybook/react";

import React, { useEffect, useState } from "react";
import DataGrid from "../../../../src/DataGrid/DataGrid";
import Pagination from "../../../../src/DataGrid/plugins/pagination/Pagination";
import { RiArrowUpDownLine } from "react-icons/ri";
import FullGrid, { IFullGridDataProvider } from "../../../../src/DataGrid/plugins/FullGrid/FullGrid";
import { ColText } from "../../../../src/DataGrid/plugins/columns/ColText";
import { ColumnTemplate } from "../../../../src/DataGrid/plugins/columns/ColumnTemplate";
import { ColDate } from "../../../../src/DataGrid/plugins/columns/ColDate";
import { ColNumber } from "../../../../src/DataGrid/plugins/columns/ColNumber";
import { IGridSwitchFilterConfig } from "../../../../src/DataGrid/plugins/filters/SelectionFilters/GridSwitchFilter";
import { IGridSelectFilterConfig } from "../../../../src/DataGrid/plugins/filters/SelectionFilters/GridSelectFilter";
import GridRoot from "../../../../src/DataGrid/config/GridRoot";

storiesOf("DataGrid/Data Handling", module)
    .add("Drag", () => {
        const data = mockData.slice(0, 50);

        return (
            <GridRoot>
                <DataGrid
                    showHeader={true}
                    showFooter={true}
                    data={data}
                    columns={[
                        {
                            field: "id",
                            cell: {
                                template: ({ row }) => {
                                    return (
                                        <>
                                            {/* eslint-disable-next-line react/jsx-no-undef */}
                                            <RiArrowUpDownLine
                                                style={{ verticalAlign: "middle", height: "100%" }}
                                            />{" "}
                                            {row.id}
                                        </>
                                    );
                                },
                                styleTemplate: () => ({
                                    cursor: "move",
                                }),
                                events: {
                                    onDragStart: [
                                        ({ event, row }) => {
                                            event.dataTransfer.setData("id", row.id + "");
                                        },
                                    ],
                                    onDragEnter: [
                                        ({ event }) => {
                                            event.currentTarget.parentElement.classList.add(
                                                "w-grid-header-row-hovered-up",
                                            );
                                        },
                                    ],
                                    onDragLeave: [
                                        ({ event }) => {
                                            event.currentTarget.parentElement.classList.remove(
                                                "w-grid-header-row-hovered-up",
                                            );
                                        },
                                    ],

                                    onDragOver: [
                                        ({ event }) => {
                                            event.preventDefault();
                                        },
                                    ],
                                    onDrop: [
                                        ({ event, row }) => {
                                            event.currentTarget.parentElement.classList.remove(
                                                "w-grid-header-row-hovered-up",
                                            );
                                            alert("Moving " + event.dataTransfer.getData("id") + " over " + row.id);
                                        },
                                    ],
                                },
                            },
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
                />
            </GridRoot>
        );
    })

    .add("Pagination", () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [onPage, setOnPage] = useState(10);
        const count = mockData.length;
        const [data, setData] = useState(
            mockData.slice((currentPage - 1) * onPage, (currentPage - 1) * onPage + onPage),
        );

        useEffect(() => {
            setData(mockData.slice((currentPage - 1) * onPage, (currentPage - 1) * onPage + onPage));
        }, [onPage, currentPage]);

        return (
            <GridRoot>
                <DataGrid
                    showHeader={true}
                    showFooter={true}
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
                    data={data}
                    footer={() => {
                        return (
                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                onPage={onPage}
                                setOnPage={setOnPage}
                                all={count}
                            />
                        );
                    }}
                />
            </GridRoot>
        );
    })
    .add("Loading", () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [onPage, setOnPage] = useState(10);
        const [isInLoadingState, setLoadingState] = useState(true);
        const count = mockData.length;
        const [data, setData] = useState([]);

        useEffect(() => {
            setLoadingState(true);
            setTimeout(() => {
                setLoadingState(false);
                setData(mockData.slice((currentPage - 1) * onPage, (currentPage - 1) * onPage + onPage));
            }, 300);
        }, [onPage, currentPage]);

        return (
            <GridRoot>
                <DataGrid
                    isInLoadingState={isInLoadingState}
                    showHeader={true}
                    showFooter={true}
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
                    data={data}
                    footer={() => {
                        return (
                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                onPage={onPage}
                                setOnPage={setOnPage}
                                all={count}
                            />
                        );
                    }}
                />
            </GridRoot>
        );
    })
    .add("Loading ( no data )", () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [onPage, setOnPage] = useState(10);

        const count = 0;

        return (
            <GridRoot>
                <DataGrid
                    isInLoadingState={true}
                    showHeader={true}
                    showFooter={true}
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
                    data={[]}
                    footer={() => {
                        return (
                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                onPage={onPage}
                                setOnPage={setOnPage}
                                all={count}
                            />
                        );
                    }}
                />
            </GridRoot>
        );
    })
    .add("No data", () => {
        return (
            <GridRoot>
                <DataGrid
                    showHeader={true}
                    showFooter={true}
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
                    data={[]}
                />
            </GridRoot>
        );
    })
    .add("Fulll", () => {
        const dataProvider: IFullGridDataProvider<IMockUser> = ({ page }) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        rows: mockData.slice(
                            (page.current - 1) * page.onPage,
                            (page.current - 1) * page.onPage + page.onPage,
                        ),
                        count: mockData.length,
                    });
                }, 1000);
            });
        };
        const columns: ColumnTemplate<IMockUser>[] = [
            ColNumber.create<IMockUser>("id", "ID").width("auto"),
            ColDate.create<IMockUser>("date", "Date").width("auto"),
            ColText.create("email", "Email"),
            ColText.create("ip_address", "IP"),
            ColText.create("first_name", "Firstname"),
            ColText.create("last_name", "Lastname"),
            ColText.create<IMockUser>("gender", "Gender")
                .noFilter()
                .addFilter({
                    field: "gender",
                    caption: "Gender",
                    filterType: "switch",
                    label: "Gender",
                    value: [],
                    config: {
                        values: [
                            { value: "Female", label: "Female" },
                            { value: "Male", label: "Male" },
                        ],
                    } as IGridSwitchFilterConfig,
                })
                .addFilter({
                    field: "smth",
                    caption: "Gender multi",
                    applyTo: "gender",
                    filterType: "switch",
                    label: "Gender multi",
                    value: [],
                    config: {
                        multiselect: true,
                        values: [
                            { value: "Female", label: "Female" },
                            { value: "Male", label: "Male" },
                            { value: "lcatterick1@so-net.ne.jp", label: "lcatterick1@so-net.ne.jp" },
                            { value: "aschust2@i2i.jp", label: "aschust2@i2i.jp" },
                            { value: "2016-12-23", label: "2016-12-23" },
                            { value: "Adelind", label: "Adelind" },
                            { value: "119.229.150.501", label: "119.229.150.501" },
                        ],
                        columns: 3
                    } as IGridSwitchFilterConfig,
                })
                .addFilter({
                    field: "zzz",
                    caption: "Gender select",
                    applyTo: "gender",
                    filterType: "select",
                    label: "Gender multi",
                    value: [],
                    config: {
                        values: [
                            { value: "Female", label: "Female" },
                            { value: "Male", label: "Male" },
                        ],
                    } as IGridSelectFilterConfig,
                }),
        ];

        return (
            <GridRoot>
                <FullGrid dataProvider={dataProvider} columns={columns} />
            </GridRoot>
        );
    });
