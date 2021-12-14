import { IMockUser, mockData } from "../Table/MOCK_DATA";
import { storiesOf } from "@storybook/react";

import React from "react";
import DataGrid from "../../../../src/DataGrid/DataGrid";
import { useGridColumns } from "../../../../src/DataGrid/helpers/useGridColumns";

storiesOf("DataGrid/DataGrid", module).add(
    "Base",

    () => {
        const columns = useGridColumns<IMockUser>((creator) => {

            return [
                creator.number("id", "Id")
                    .template((row) => row.price)
                    .width(30)
                ,
                creator.text( "first_name", "First name"),
                creator.text( "last_name", "Last  name"),
                creator.text( "email", "Email"),
                creator.money( "price", "Price"),
                creator.text( "ip_address", "IP"),
            ];
        });

        return (
            <div>
                <DataGrid columns={columns} data={{ rows: mockData.slice(0,40), rowCount: mockData.length }} />
            </div>
        );
    },
);
