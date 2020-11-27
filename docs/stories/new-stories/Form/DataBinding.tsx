import React from "react";
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

class DataBinding extends React.Component<any, { data: Record<string, any>; submit: Record<string, any> }> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: {
                textarea: "initial data",
                other: "static value",
                checkboxGroup: [1],
            },
            submit: {},
        };
    }

    render() {
        return (
            <BForm
                data={this.state.data}
                onChange={(ev) => {
                    const data = ev.form.getData();
                    this.setState({ data });
                }}
                onSubmit={(ev) => {
                    this.setState({ submit: ev.form.getData() });
                }}
            >
                {(form) => {
                    return (
                        <>
                            <BText label="Text" name="text" disabled={true} />
                            <BSelect {...form("select")} label="Select" options={{ 1: "One", 2: "Two", 3: "Three" }} />
                            <BCheckboxGroup
                                {...form("checkboxGroup")}
                                label="Checkbox group"
                                options={{ 1: "One", 2: "Two", 3: "Three" }}
                            />
                            <BTextarea {...form("textarea")} label="Checkbox group" />
                            <BDate {...form("date")} label="Date" />

                            <input type="submit" value="submit" className="btn btn-primary" />
                            <div>
                                <b>External input</b>
                                <br />
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        this.setState({ data: { ...this.state.data, external: e.target.value } })
                                    }
                                />
                            </div>
                            <h5>Current data</h5>
                            <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
                            <h5>Submited data</h5>
                            <pre>{JSON.stringify(this.state.submit, null, 2)}</pre>
                        </>
                    );
                }}
            </BForm>
        );
    }
}

export { DataBinding };
