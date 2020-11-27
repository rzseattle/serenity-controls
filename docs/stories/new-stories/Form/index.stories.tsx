import React from "react";
import { storiesOf } from "@storybook/react";
import { Panel } from "../../../../src/Panel";
import {
    BForm,
    BText,
    BSwitch,
    BSelect,
    BCheckboxGroup,
    BTextarea,
    BDate,
    BFile,
    BWysiwig,
} from "../../../../src/BForm";
import { DataBinding } from "./DataBinding";
// import { FunctionRender } from "./FunctionRender";
// import FileUpload from "./FileUpload";
// import SurroundElements from "./SurroundElements";

storiesOf("Form/Forms", module)
    .add("Base", () => (
        <div style={{ maxWidth: "800px" }}>
            <Panel>
                <BForm
                    editable={true}
                    data={{
                        text: "xxx",
                        select: "2",
                        switch: "2",
                        checkboxGroup: [2, 3],
                        textarea: "Some lorem ipsum text",
                        date: "2008-11-11",
                    }}
                >
                    {(form) => {
                        return (
                            <>
                                <BText label="Text" {...form("text")} />
                                <BSelect
                                    label="Select"
                                    options={{ 1: "One", 2: "Two", 3: "Three" }}
                                    {...form("select")}
                                />
                                <BCheckboxGroup
                                    label="Checkbox group"
                                    options={{ 1: "One", 2: "Two", 3: "Three" }}
                                    {...form("checkboxGroup")}
                                />
                                <BSwitch
                                    label="Radio group"
                                    options={{ 1: "One", 2: "Two", 3: "Three" }}
                                    {...form("switch")}
                                />
                                <BTextarea label="Textarea" {...form("textarea")} />
                                <BDate label="Date" {...form("date")} />
                                <BFile label="File" {...form("file")} />
                                <BWysiwig label="Wysiwig" {...form("wysiwig")} />
                                <input type="submit" value="submit" className="btn btn-primary" />
                            </>
                        );
                    }}
                </BForm>
            </Panel>
        </div>
    ))
    .add("Disabled edition", () => (
        <div style={{ maxWidth: "800px" }}>
            <Panel>
                <BForm
                    editable={false}
                    data={{
                        text: "xxx",
                        select: "2",
                        switch: "2",
                        checkboxGroup: [2, 3],
                        textarea: "Some lorem ipsum text",
                        date: "2008-11-11",
                        wysiwig: "This is sparta"
                    }}
                >
                    {(form) => {
                        return (
                            <>
                                <BText label="Text" {...form("text")} />
                                <BSelect
                                    label="Select"
                                    options={{ 1: "One", 2: "Two", 3: "Three" }}
                                    {...form("select")}
                                />
                                <BCheckboxGroup
                                    label="Checkbox group"
                                    options={{ 1: "One", 2: "Two", 3: "Three" }}
                                    {...form("checkboxGroup")}
                                />
                                <BSwitch
                                    label="Radio group"
                                    options={{ 1: "One", 2: "Two", 3: "Three" }}
                                    {...form("switch")}
                                />
                                <BTextarea label="Textarea" {...form("textarea")} />
                                <BDate label="Date" {...form("date")} />
                                <BFile label="File" {...form("file")} />
                                <BWysiwig label="Wysiwig" {...form("wysiwig")} />

                            </>
                        );
                    }}
                </BForm>
            </Panel>
        </div>
    ))

    .add("Data Binding", () => (
        <div style={{ maxWidth: "800px" }}>
            <Panel>
                <DataBinding />
            </Panel>
        </div>
    ));
// .add("File upload", () => (
//     <div style={{ maxWidth: "800px" }}>
//         <Panel>
//             <FileUpload />
//         </Panel>
//     </div>
// ))
// .add("FunctionRender", () => (
//     <div style={{ maxWidth: "800px" }}>
//         <Panel>
//             <FunctionRender />
//         </Panel>
//     </div>
// ))
// .add("Surround elements", () => (
//     <div style={{ maxWidth: "800px" }}>
//         <Panel>
//             <SurroundElements />
//         </Panel>
//     </div>
// ));
