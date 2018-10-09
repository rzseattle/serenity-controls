import React from "react";
import { storiesOf } from "@storybook/react";
import {
    DateFilter,
    FilterHelper,
    FilterPanel,
    IFilterValue,
    NumericFilter,
    SelectFilter,
    SwitchFilter,
    TextFilter,
} from "../../src/filters";

const onApply = (input: IFilterValue) => alert(input.value + " " + input.condition);

const containerStyle: React.CSSProperties = { width: 300, backgroundColor: "white", padding: 10 };

storiesOf("Filters", module)
    .add(
        "Text",

        () => (
            <div style={containerStyle}>
                <TextFilter
                    caption={"Name"}
                    field="someFieldName"
                    showApply={true}
                    config={{ showFilterOptions: true }}
                    onApply={onApply}
                />
            </div>
        ),
    )
    .add(
        "Numeric",

        () => (
            <div style={containerStyle}>
                <NumericFilter
                    caption={"Name"}
                    field="someFieldName"
                    showApply={true}
                    config={{ showFilterOptions: true }}
                    onApply={onApply}
                />
            </div>
        ),
    )
    .add(
        "Switch",

        () => (
            <div style={containerStyle}>
                <SwitchFilter
                    caption={"Name"}
                    field="someFieldName"
                    showApply={true}
                    config={{
                        content: [
                            { value: "1", label: "Option 1" },
                            { value: "2", label: "Option 2" },
                            { value: "3", label: "Option 3" },
                        ],
                    }}
                    onApply={onApply}
                />
            </div>
        ),
    )
    .add(
        "Select",

        () => (
            <>
                <div style={containerStyle}>
                    <SelectFilter
                        caption={"Name"}
                        field="someFieldName"
                        showApply={true}
                        config={{
                            content: [
                                { value: "1", label: "Option 1" },
                                { value: "2", label: "Option 2" },
                                { value: "3", label: "Option 3" },
                                { value: "4", label: "Option 5" },
                            ],
                        }}
                        onApply={onApply}
                    />
                    <br />
                    <br />
                    <br />
                    <SelectFilter
                        caption={"Name (multiselect)"}
                        field="someFieldName"
                        showApply={true}
                        config={{
                            content: [
                                { value: "1", label: "Option 1" },
                                { value: "2", label: "Option 2" },
                                { value: "3", label: "Option 3" },
                                { value: "4", label: "Option 5" },
                            ],
                            multiselect: true,
                        }}
                        onApply={onApply}
                    />
                </div>
            </>
        ),
    )
    .add(
        "Date",

        () => (
            <div style={{ ...containerStyle, height: 500, width: 305 }}>
                <DateFilter
                    caption={"Name"}
                    field="someFieldName"
                    showApply={true}
                    config={{ showFilterOptions: true }}
                    onApply={onApply}
                />
            </div>
        ),
    )
    .add(
        "Filters panel",

        () => (
            <div style={{ ...containerStyle, height: 500, width: 355 }}>
                <FilterPanel
                    items={[
                        FilterHelper.text("test", "Field 2"),
                        FilterHelper.switch("test2", "Field 3", [
                            { value: "1", label: "Option 1" },
                            { value: "2", label: "Option 2" },
                            { value: "3", label: "Option 3" },
                        ]),

                        FilterHelper.date("test3", "Date filter"),
                        FilterHelper.select("test4", "Field 4", [
                            { value: "1", label: "Option 1" },
                            { value: "2", label: "Option 2" },
                            { value: "3", label: "Option 3" },
                        ]),
                    ]}
                    filters={[]}
                    onApply={(filters) => console.log(filters)}
                />
            </div>
        ),
    );
