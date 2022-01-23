import { storiesOf } from "@storybook/react";

import React from "react";

import GridSwitchFilter, {
    IGridSwitchFilterConfig,
} from "../../../../src/DataGrid/plugins/filters/SelectionFilters/GridSwitchFilter";
import GridSelectFilter, {
    IGridSelectFilterConfig,
} from "../../../../src/DataGrid/plugins/filters/SelectionFilters/GridSelectFilter";
import GridRoot from "../../../../src/DataGrid/config/GridRoot";
import GridTextFilter from "../../../../src/DataGrid/plugins/filters/InputFilters/GridTextFilter";
import { IGridFilter } from "../../../../src/DataGrid/interfaces/IGridFilter";
import { useImmer } from "use-immer";
import { PrintJSON } from "../../../../src/PrintJSON";
import GridNumericFilter from "../../../../src/DataGrid/plugins/filters/InputFilters/GridNumericFilter";
import GridDateFilter from "../../../../src/DataGrid/plugins/filters/InputFilters/GridDateFilter";
import GridFiltersPanel from "../../../../src/DataGrid/parts/GridFiltersPanel";

const Container = ({ children, filter }: { children: JSX.Element; filter: IGridFilter | IGridFilter[] }) => (
    <div style={{ backgroundColor: "lightgray", paddingTop: 10 }}>
        <div style={{ width: 400, backgroundColor: "white", padding: 20, margin: 20 }}>{children}</div>
        <div style={{ marginTop: 20 }}>
            <PrintJSON json={filter} />
        </div>
    </div>
);
storiesOf("DataGrid/Plugins/Filters", module)
    .add("Text", () => {
        const [filter, setFilter] = useImmer<IGridFilter>({
            field: "gender",
            caption: "Gender",
            filterType: "text",
            label: "Gender",
            value: [],
        });
        return (
            <GridRoot>
                <Container filter={filter}>
                    <GridTextFilter
                        filter={filter}
                        onFilterChange={(filter) => {
                            setFilter(filter);
                        }}
                        onValueChange={(value) => {
                            setFilter((draft) => {
                                draft.value = value;
                            });
                        }}
                    />
                </Container>
            </GridRoot>
        );
    })

    .add("Number", () => {
        const [filter, setFilter] = useImmer<IGridFilter>({
            field: "gender",
            caption: "Gender",
            filterType: "numeric",
            label: "Gender",
            value: [],
        });
        return (
            <GridRoot>
                <Container filter={filter}>
                    <GridNumericFilter
                        filter={filter}
                        onFilterChange={(filter) => {
                            setFilter(filter);
                        }}
                        onValueChange={(value) => {
                            setFilter((draft) => {
                                draft.value = value;
                            });
                        }}
                    />
                </Container>
            </GridRoot>
        );
    })
    .add("Date", () => {
        const [filter, setFilter] = useImmer<IGridFilter>({
            field: "gender",
            caption: "Gender",
            filterType: "date",
            label: "Gender",
            value: [],
        });
        return (
            <GridRoot>
                <Container filter={filter}>
                    <GridDateFilter
                        filter={filter}
                        onFilterChange={(filter) => {
                            setFilter(filter);
                        }}
                        onValueChange={(value) => {
                            setFilter((draft) => {
                                draft.value = value;
                            });
                        }}
                    />
                </Container>
            </GridRoot>
        );
    })
    .add("Switch", () => {
        const [filter, setFilter] = useImmer<IGridFilter>({
            field: "gender",
            caption: "Gender",
            filterType: "numeric",
            label: "Gender",
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
                columns: 2,
            } as IGridSwitchFilterConfig,
        });
        return (
            <GridRoot>
                <Container filter={filter}>
                    <GridSwitchFilter
                        filter={filter}
                        onFilterChange={(filter) => {
                            setFilter(filter);
                        }}
                        onValueChange={(value) => {
                            setFilter((draft) => {
                                draft.value = value;
                            });
                        }}
                    />
                </Container>
            </GridRoot>
        );
    })
    .add("Select", () => {
        const [filter, setFilter] = useImmer<IGridFilter>({
            field: "gender",
            caption: "Gender",
            filterType: "numeric",
            label: "Gender",
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
            } as IGridSwitchFilterConfig,
        });
        return (
            <GridRoot>
                <Container filter={filter}>
                    <GridSelectFilter
                        filter={filter}
                        onFilterChange={(filter) => {
                            setFilter(filter);
                        }}
                        onValueChange={(value) => {
                            setFilter((draft) => {
                                draft.value = value;
                            });
                        }}
                    />
                </Container>
            </GridRoot>
        );
    })
    .add("Panel", () => {
        const [filters, setFilters] = useImmer<IGridFilter[]>([
            {
                field: "gender",
                caption: "Gender",
                filterType: "numeric",
                label: "Gender",
                isInAdvancedMode: true,
                value: [
                    {
                        value: "1",
                        condition: "LIKE",
                        labelCondition: "contains",
                        labelValue: null,
                    },
                    {
                        value: "2",
                        condition: "LIKE",
                        labelCondition: "contains",
                        labelValue: null,
                    },
                    {
                        value: "3",
                        condition: "LIKE",
                        labelCondition: "contains",
                        labelValue: null,
                    },
                ],
            },
            {
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
            },

            {
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
                    columns: 3,
                } as IGridSwitchFilterConfig,
            },
            {
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
            },
            {
                field: "gender",
                caption: "Gender",
                filterType: "date",
                label: "Gender",
                value: [
                    {
                        value: "2022-01-22 / 2022-01-29",
                        condition: "BETWEEN",
                        labelCondition: "between",
                        operator: "and",
                        labelValue: null,
                    },
                    {
                        value: "2022-01-22",
                        condition: "=",
                        labelCondition: "equals",
                        labelValue: null,
                    },
                ],
            },
        ]);
        return (
            <GridRoot>
                    <div style={{width: 400}}>
                    <GridFiltersPanel
                        filters={filters}
                        onFiltersChange={(changed) => {
                            setFilters(changed);
                        }}
                    />
                    </div>

            </GridRoot>
        );
    });
