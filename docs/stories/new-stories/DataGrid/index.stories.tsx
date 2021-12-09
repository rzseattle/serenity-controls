import { IMockUser, mockData } from "../Table/MOCK_DATA";
import { storiesOf } from "@storybook/react";

import React from "react";
import DataGrid from "../../../../src/DataGrid/DataGrid";
import { useGridColumns } from "../../../../src/DataGrid/helpers/GridColumnHelper";

storiesOf("DataGrid/DataGrid", module).add(
    "Base",

    () => {
        const columns = useGridColumns<IMockUser>((creator) => {
            return [creator.number("id", "Id").template((row) => row.price)];
        });
        return (
            <div>
                <DataGrid columns={columns} data={{ rows: mockData, rowCount: mockData.length }} />
            </div>
        );
    },
);
