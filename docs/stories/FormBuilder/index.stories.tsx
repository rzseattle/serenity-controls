import React from "react";
import { storiesOf } from "@storybook/react";

// @ts-ignore
import { Panel } from "../../../src/Panel";
import { StateHelper } from "./StateHelper";
import { StateGeneratorHelper } from "./StateGeneratorHelper";
import { BForm } from "../../../src/BForm";
import { PrintJSON } from "../../../src/PrintJSON";

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

storiesOf("Form/FormBuilder", module)
    .add("Base", () => (
        <Panel>
            <StateHelper fields={fields} />
        </Panel>
    ))
    .add("Form connected", () => (
        <Panel>
            <BForm>
                {(form, data) => (
                    <>
                        <StateHelper fields={fields} form={form} />
                        <PrintJSON json={data} />
                    </>
                )}
            </BForm>
            <hr />
            <h4>With namespace</h4>
            <BForm>
                {(form, data) => (
                    <>
                        <StateHelper fields={fields} form={form} formNamespace="generatorData" />
                        <PrintJSON json={data} />
                    </>
                )}
            </BForm>
        </Panel>
    ))
    .add("Generator", () => (
        <Panel>
            <StateGeneratorHelper fields={fields} />
        </Panel>
    ));
