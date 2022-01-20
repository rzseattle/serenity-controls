import { IMockUser, mockData } from "../Table/MOCK_DATA";
import { storiesOf } from "@storybook/react";

import React, { useEffect, useState } from "react";
import DataGrid from "../../../../src/DataGrid/DataGrid";
import Pagination from "../../../../src/DataGrid/plugins/pagination/Pagination";
import { RiArrowUpDownLine } from "react-icons/ri";
import FullGrid, { IFullGridDataProvider } from "../../../../src/DataGrid/helpers/FullGrid";
import { ColText } from "../../../../src/DataGrid/helpers/columnTemplates/ColText";
import { ColumnTemplate } from "../../../../src/DataGrid/helpers/columnTemplates/ColumnTemplate";
import { ColDate } from "../../../../src/DataGrid/helpers/columnTemplates/ColDate";
import { ColNumber } from "../../../../src/DataGrid/helpers/columnTemplates/ColNumber";

storiesOf("DataGrid/Data Handling", module)
    .add("Drag", () => {
        const data = mockData.slice(0, 50);

        return (
            <>
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
            </>
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
            <>
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
            </>
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
            <>
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
            </>
        );
    })
    .add("Loading ( no data )", () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [onPage, setOnPage] = useState(10);

        const count = 0;

        return (
            <>
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
            </>
        );
    })
    .add("No data", () => {
        return (
            <>
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
            </>
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
            ColText.create<IMockUser>("gender", "Gender").noFilter().addFilter({
                field: "gender",
                filterType: "switch",
                label: "Gender",
                value: [],
                config: {
                    values: [

                    ]
                }
            }),
        ];

        return (
            <div>
                <FullGrid dataProvider={dataProvider} columns={columns} />
            </div>
        );
    });
