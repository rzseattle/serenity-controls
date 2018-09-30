import React from "react";
import { storiesOf } from "@storybook/react";
import TextFilter from "../../src/ctrl/filters/TextFilter";
import { IFilterValue } from "../../src/ctrl/Table/Interfaces";
import NumericFilter from "../../src/ctrl/filters/NumericFilter";
import { Switch } from "../../src/ctrl/Fields";
import SwitchFilter from "../../src/ctrl/filters/SwitchFilter";
import SelectFilter from "../../src/ctrl/filters/SelectFilter";
import DateFilter from "../../src/ctrl/filters/DateFilter";
import { FilterPanel } from "../../src/ctrl/filters/FilterPanel";
import { FilterHelper } from "../../src/ctrl/filters/FilterHelper";

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
            </div>
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
