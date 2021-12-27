import { mockData } from "../Table/MOCK_DATA";
import { storiesOf } from "@storybook/react";

import React, { useState } from "react";
import DataGrid from "../../../../src/DataGrid/DataGrid";
// @ts-ignore
import styles from "./classes.module.sass";
import { PrintJSON } from "../../../../src/PrintJSON";
import { useCellData } from "../../../../src/DataGrid/helpers/useCellData";

storiesOf("DataGrid/Order & Filter", module).add("Order", () => {
    return (
        <>
            <DataGrid
                showHeader={true}
                order={[{ field: "id", caption: "By Id" }]}
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
                data={{ rows: mockData.slice(0, 150), rowCount: mockData.length }}
            />
        </>
    );
});
