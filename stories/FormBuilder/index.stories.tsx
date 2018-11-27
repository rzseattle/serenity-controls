import React from "react";
import { storiesOf } from "@storybook/react";

// @ts-ignore
import { Panel } from "../../src/Panel";
import { StateHelper } from "./StateHelper";
import { StateGeneratorHelper } from "./StateGeneratorHelper";

const fields = [
    {
        label: "First Name",
        type: "BText",
        name: "shippingNb",
    },
    {
        label: "Last Name",
        type: "BText",
        default: "xxx",
        name: "company",
    },
    {
        label: "Birth date",
        type: "BDate",
        name: "date",
    },
    {
        label: "Sex",
        type: "BSwitch",
        default: "male",
        name: "switch",
        options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }],
    },
    {
        label: "Nb. of cars",
        type: "BSelect",
        default: "1",
        name: "select",
        options: [{ label: "zero", value: 0 }, { label: "one", value: 1 }, { label: "two", value: 2 }],
    },
];

storiesOf("FormBuilder", module)
    .add("Base", () => (
        <Panel>
            <StateHelper fields={fields} />
        </Panel>
    ))
    .add("Generator", () => (
        <Panel>
            <StateGeneratorHelper fields={fields} />
        </Panel>
    ));
