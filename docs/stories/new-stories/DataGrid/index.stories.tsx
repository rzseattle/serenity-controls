import { IMockUser, mockData } from "../Table/MOCK_DATA";
import { storiesOf } from "@storybook/react";

import React, { useMemo } from "react";
import DataGrid from "../../../../src/DataGrid/DataGrid";
import { PrintJSON } from "../../../../src/PrintJSON";
import { GridCreatorHelper } from "../../../../src/DataGrid/helpers/GridCreatorHelper";
import { ColText } from "../../../../src/DataGrid/helpers/columnTemplates/ColText";

storiesOf("DataGrid/DataGrid", module).add("Base", () => {
    const gridData = useMemo(() => {
        const creator = new GridCreatorHelper<IMockUser>();
        creator.addCol( new ColText("id", "id") )








        const c = creator.column;
        return creator.toProcess({
            columns: [
                c
                    .number("id", "Id")
                    .template((row) => row.price)
                    .width(30),
                c.text("first_name", "First name"),
                c.text("last_name", "Last  name"),
                c.text("email", "Email"),
                c.money("price", "Price"),
                c.text("ip_address", "IP"),
            ],
            filters: [creator.filter.text("id", "Id")],
            sorters: [creator.sorter.add("id", "Id")],
        });
    }, []);

    return (
        <div>
            <div style={{ display: "flex" }}>
                <PrintJSON json={gridData.columns} />
                <PrintJSON json={gridData.filters} />
                <PrintJSON json={gridData.sorters} />
            </div>
            <DataGrid
                {...gridData}
                showFooter={false}
                showHeader={true}
                data={{ rows: mockData.slice(0, 5), rowCount: mockData.length }}
            />
        </div>
    );
});
